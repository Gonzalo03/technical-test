class RequestService {
  constructor({ getRequestByIdUseCase, createRequestUseCase, deleteRequestUseCase }) {
    this.getRequestByIdUseCase = getRequestByIdUseCase;
    this.createRequestUseCase = createRequestUseCase;
    this.deleteRequestUseCase = deleteRequestUseCase;
  }

  async getById(id) {
    return await this.getRequestByIdUseCase.execute(id);
  }

  async createRequest(requestData) {
    return await this.createRequestUseCase.execute(requestData);
  }

  async deleteRequest(id) {
    return await this.deleteRequestUseCase.execute(id);
  }
}

module.exports = RequestService;
