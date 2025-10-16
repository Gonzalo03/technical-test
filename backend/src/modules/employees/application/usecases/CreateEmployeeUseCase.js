const Employee = require('../../domain/employee');

class CreateEmployeeUseCase {
  constructor({ employeeRepository, log }) {
    this.employeeRepository = employeeRepository;
    this.log = log;
  }

  async execute(employeeData) {
    this.log.info('Creating new employee');
    
    const employee = Employee.create(employeeData);
    const validation = employee.validate();
    
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return await this.employeeRepository.create(employee);
  }
}

module.exports = CreateEmployeeUseCase;
