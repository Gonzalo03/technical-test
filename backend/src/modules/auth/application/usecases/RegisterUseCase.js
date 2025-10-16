const bcrypt = require('bcrypt');
const User = require('../../domain/user');

class RegisterUseCase {
  constructor({ userRepository, log }) {
    this.userRepository = userRepository;
    this.log = log;
  }

  async execute({ username, email, password, role = 'user' }) {
    this.log.info(`Registering new user: ${username}`);

    // Check if username already exists
    if (await this.userRepository.existsByUsername(username)) {
      throw new Error('Username already exists');
    }

    // Check if email already exists
    if (await this.userRepository.existsByEmail(email)) {
      throw new Error('Email already exists');
    }

    // Create user
    const user = User.create({ username, email, password, role });
    
    // Validate
    const validation = user.validate();
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    // Hash password
    const saltRounds = 10;
    user.password = await bcrypt.hash(password, saltRounds);

    // Save user
    const createdUser = await this.userRepository.create(user);
    
    this.log.info(`User registered successfully: ${createdUser.id}`);
    return createdUser;
  }
}

module.exports = RegisterUseCase;
