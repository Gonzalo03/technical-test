const User = require('../domain/user');

class UserRepository {
  constructor({ db }) {
    this.db = db;
    this.table = 'users';
  }

  async findById(id) {
    const row = await this.db(this.table).where({ id }).first();
    if (!row) return null;
    return User.fromDatabase(row);
  }

  async findByUsername(username) {
    const row = await this.db(this.table).where({ username }).first();
    if (!row) return null;
    return User.fromDatabase(row);
  }

  async findByEmail(email) {
    const row = await this.db(this.table).where({ email }).first();
    if (!row) return null;
    return User.fromDatabase(row);
  }

  async create(user) {
    const [result] = await this.db(this.table)
      .insert(user.toDatabase())
      .returning('id');
    
    return await this.findById(result.id);
  }

  async existsByUsername(username) {
    const count = await this.db(this.table).where({ username }).count('* as count');
    return parseInt(count[0].count) > 0;
  }

  async existsByEmail(email) {
    const count = await this.db(this.table).where({ email }).count('* as count');
    return parseInt(count[0].count) > 0;
  }
}

module.exports = UserRepository;
