class ValidateTokenUseCase {
  constructor({ sessionRepository, jwtService, userRepository, log }) {
    this.sessionRepository = sessionRepository;
    this.jwtService = jwtService;
    this.userRepository = userRepository;
    this.log = log;
  }

  async execute(token) {
    // Verify JWT
    const decoded = this.jwtService.verifyToken(token);

    // Check if session exists and is active
    const session = await this.sessionRepository.findByToken(token);
    if (!session) {
      throw new Error('Invalid session');
    }

    // Check if session is expired
    if (session.isExpired()) {
      await this.sessionRepository.invalidate(token);
      throw new Error('Session expired');
    }

    // Get user
    const user = await this.userRepository.findById(decoded.id);
    if (!user || !user.is_active) {
      throw new Error('User not found or inactive');
    }

    return user;
  }
}

module.exports = ValidateTokenUseCase;
