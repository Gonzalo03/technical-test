const bcrypt = require('bcrypt');
const Session = require('../../domain/session');

class LoginUseCase {
  constructor({ userRepository, sessionRepository, jwtService, log }) {
    this.userRepository = userRepository;
    this.sessionRepository = sessionRepository;
    this.jwtService = jwtService;
    this.log = log;
  }

  async execute({ username, password, ipAddress, userAgent }) {
    this.log.info(`Login attempt for user: ${username}`);

    // Find user
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check if user is active
    if (!user.is_active) {
      throw new Error('User account is inactive');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate tokens
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    const token = this.jwtService.generateToken(payload);
    const refreshToken = this.jwtService.generateRefreshToken({ id: user.id });
    const expiresAt = new Date(this.jwtService.getTokenExpiration());

    // Create session
    const session = Session.create({
      user_id: user.id,
      token,
      refresh_token: refreshToken,
      expires_at: expiresAt,
      ip_address: ipAddress,
      user_agent: userAgent
    });

    await this.sessionRepository.create(session);

    this.log.info(`User logged in successfully: ${user.id}`);

    return {
      user: user.toJSON(),
      token,
      refreshToken,
      expiresAt
    };
  }
}

module.exports = LoginUseCase;
