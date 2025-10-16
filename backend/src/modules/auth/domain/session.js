class Session {
  constructor({ id, user_id, token, refresh_token, expires_at, is_active, ip_address, user_agent, created_at, updated_at }) {
    this.id = id;
    this.user_id = user_id;
    this.token = token;
    this.refresh_token = refresh_token;
    this.expires_at = expires_at;
    this.is_active = is_active;
    this.ip_address = ip_address;
    this.user_agent = user_agent;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromDatabase(data) {
    return new Session({
      id: data.id,
      user_id: data.user_id,
      token: data.token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at,
      is_active: data.is_active,
      ip_address: data.ip_address,
      user_agent: data.user_agent,
      created_at: data.created_at,
      updated_at: data.updated_at
    });
  }

  static create({ user_id, token, refresh_token, expires_at, ip_address, user_agent }) {
    return new Session({
      id: null,
      user_id,
      token,
      refresh_token,
      expires_at,
      is_active: true,
      ip_address,
      user_agent,
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  toDatabase() {
    return {
      user_id: this.user_id,
      token: this.token,
      refresh_token: this.refresh_token,
      expires_at: this.expires_at,
      is_active: this.is_active,
      ip_address: this.ip_address,
      user_agent: this.user_agent
    };
  }

  isExpired() {
    return new Date() > new Date(this.expires_at);
  }
}

module.exports = Session;
