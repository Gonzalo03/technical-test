class User {
  constructor({ id, username, email, password, role, is_active, created_at, updated_at }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.is_active = is_active;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromDatabase(data) {
    return new User({
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role,
      is_active: data.is_active,
      created_at: data.created_at,
      updated_at: data.updated_at
    });
  }

  static create({ username, email, password, role = 'user' }) {
    return new User({
      id: null,
      username,
      email,
      password,
      role,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  toDatabase() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      is_active: this.is_active
    };
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      role: this.role,
      isActive: this.is_active,
      createdAt: this.created_at,
      updatedAt: this.updated_at
    };
  }

  validate() {
    const errors = [];

    if (!this.username || this.username.trim().length === 0) {
      errors.push('Username is required');
    }

    if (this.username && this.username.length > 50) {
      errors.push('Username cannot exceed 50 characters');
    }

    if (!this.email || this.email.trim().length === 0) {
      errors.push('Email is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.email && !emailRegex.test(this.email)) {
      errors.push('Email format is invalid');
    }

    if (!this.password || this.password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }

    if (!['admin', 'user'].includes(this.role)) {
      errors.push('Role must be admin or user');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  isAdmin() {
    return this.role === 'admin';
  }
}

module.exports = User;
