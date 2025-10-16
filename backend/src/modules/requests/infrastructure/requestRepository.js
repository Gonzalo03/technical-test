const Request = require('../domain/request');

class RequestRepository {
  constructor({ db }) {
    this.db = db;
    this.table = 'solicitud';
  }

  async findById(id) {
    const row = await this.db(this.table).where({ id }).first();
    if (!row) return null;
    return Request.fromDatabase(row);
  }

  async findAll({ page = 1, limit = 10, id_empleado = null, search = '', sortBy = 'id', sortOrder = 'desc' } = {}) {
    const offset = (page - 1) * limit;
    
    // Base query with filters
    let query = this.db(this.table);
    
    // Filter by employee (parametrized - SQL injection safe)
    if (id_empleado) {
      query = query.where('id_empleado', id_empleado);
    }
    
    // Search filter (parametrized - SQL injection safe)
    if (search) {
      query = query.where(function() {
        this.where('codigo', 'ilike', `%${search}%`)
          .orWhere('descripcion', 'ilike', `%${search}%`)
          .orWhere('resumen', 'ilike', `%${search}%`);
      });
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
      data: rows.map(row => Request.fromDatabase(row)),
      pagination: {
        page,
        limit,
        total: parseInt(count),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async create(request) {
    const [result] = await this.db(this.table)
      .insert(request.toDatabase())
      .returning('id');
    
    return await this.findById(result.id);
  }

  async delete(id) {
    const deleted = await this.db(this.table)
      .where({ id })
      .del();
    
    return deleted > 0;
  }
}

module.exports = RequestRepository;
