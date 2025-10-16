class LogoutUseCase {
  constructor({ sessionRepository, log }) {
    this.sessionRepository = sessionRepository;
    this.log = log;
  }

  async execute(token) {
    this.log.info('Logging out user');

    await this.sessionRepository.invalidate(token);

    this.log.info('User logged out successfully');
    return { message: 'Logged out successfully' };
  }
}

module.exports = LogoutUseCase;
