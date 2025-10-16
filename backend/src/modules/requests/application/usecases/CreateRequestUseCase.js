const Request = require('../../domain/request');

class CreateRequestUseCase {
  constructor({ requestRepository, employeeRepository, log }) {
    this.requestRepository = requestRepository;
    this.employeeRepository = employeeRepository;
    this.log = log;
  }

  async execute(requestData) {
    this.log.info('Creating new request');
    
    // Verify employee exists
    const employee = await this.employeeRepository.findById(requestData.id_empleado);
    if (!employee) {
      throw new Error(`Employee with id ${requestData.id_empleado} not found`);
    }

    const request = Request.create(requestData);
    const validation = request.validate();
    
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return await this.requestRepository.create(request);
  }
}

module.exports = CreateRequestUseCase;
