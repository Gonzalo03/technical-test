class GetEmployeeByIdUseCase {
  constructor({ employeeRepository, log }) {
    this.employeeRepository = employeeRepository;
    this.log = log;
  }

  async execute(id) {
    this.log.info(`Getting employee with id: ${id}`);
    
    const employee = await this.employeeRepository.findById(id);
    
    if (!employee) {
      throw new Error(`Employee with id ${id} not found`);
    }
    
    return employee;
  }
}

module.exports = GetEmployeeByIdUseCase;
