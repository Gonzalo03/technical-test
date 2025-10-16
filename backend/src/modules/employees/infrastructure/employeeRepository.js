const Employee = require('../domain/employee');

class EmployeeRepository {
  constructor({ db }) {
    this.db = db;
    this.table = 'empleado';
  }

  async findById(id) {
    const row = await this.db(this.table).where({ id }).first();
    if (!row) return null;
    return Employee.fromDatabase(row);
  }

  async findAll({ page = 1, limit = 10, search = '', sortBy = 'id', sortOrder = 'asc' } = {}) {
    const offset = (page - 1) * limit;
    
    // Base query with filters
    let query = this.db(this.table);
    
    // Search filter (parametrized - SQL injection safe)
    if (search) {
      query = query.where('nombre', 'ilike', `%${search}%`);
    }
    
    // Count total (before pagination)
    const countQuery = query.clone();
    const [{ count }] = await countQuery.count('* as count');
    
    // Apply pagination and sorting (parametrized)
    const rows = await query
      .orderBy(sortBy, sortOrder)
      .limit(limit)
      .offset(offset);
    
    return {
      data: rows.map(row => Employee.fromDatabase(row)),
      pagination: {
        page,
        limit,
        total: parseInt(count),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async create(employee) {
    const [result] = await this.db(this.table)
      .insert(employee.toDatabase())
      .returning('id');
    
    return await this.findById(result.id);
  }
}

module.exports = EmployeeRepository;
