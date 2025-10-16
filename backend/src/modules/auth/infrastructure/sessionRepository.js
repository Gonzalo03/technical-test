const Session = require('../domain/session');

class SessionRepository {
  constructor({ db }) {
    this.db = db;
    this.table = 'sessions';
  }

  async findByToken(token) {
    const row = await this.db(this.table)
      .where({ token, is_active: true })
      .first();
    if (!row) return null;
    return Session.fromDatabase(row);
  }

  async findByRefreshToken(refreshToken) {
    const row = await this.db(this.table)
      .where({ refresh_token: refreshToken, is_active: true })
      .first();
    if (!row) return null;
    return Session.fromDatabase(row);
  }

  async create(session) {
    const [result] = await this.db(this.table)
      .insert(session.toDatabase())
      .returning('id');
    
    return result.id;
  }

  async invalidate(token) {
    await this.db(this.table)
      .where({ token })
      .update({ is_active: false });
  }

  async invalidateAllUserSessions(userId) {
    await this.db(this.table)
      .where({ user_id: userId })
      .update({ is_active: false });
  }

  async cleanExpiredSessions() {
    await this.db(this.table)
      .where('expires_at', '<', new Date())
      .update({ is_active: false });
  }
}

module.exports = SessionRepository;
