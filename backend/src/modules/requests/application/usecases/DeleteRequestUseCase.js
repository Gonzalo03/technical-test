class DeleteRequestUseCase {
  constructor({ requestRepository, log }) {
    this.requestRepository = requestRepository;
    this.log = log;
  }

  async execute(id) {
    this.log.info(`Deleting request with id: ${id}`);
    
    // Verify request exists
    const request = await this.requestRepository.findById(id);
    if (!request) {
      throw new Error(`Request with id ${id} not found`);
    }

    const deleted = await this.requestRepository.delete(id);
    
    if (!deleted) {
      throw new Error(`Failed to delete request with id ${id}`);
    }

    return request;
  }
}

module.exports = DeleteRequestUseCase;
