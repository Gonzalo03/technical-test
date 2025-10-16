class GetRequestByIdUseCase {
  constructor({ requestRepository, log }) {
    this.requestRepository = requestRepository;
    this.log = log;
  }

  async execute(id) {
    this.log.info(`Getting request with id: ${id}`);
    
    const request = await this.requestRepository.findById(id);
    
    if (!request) {
      throw new Error(`Request with id ${id} not found`);
    }
    
    return request;
  }
}

module.exports = GetRequestByIdUseCase;
