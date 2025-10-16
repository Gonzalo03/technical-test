const { createContainer, asValue, asClass } = require('awilix');

const container = createContainer();

const connection = require('../database/connection');
const log = console;

const EmployeeRepository = require('../modules/employees/infrastructure/employeeRepository');
const CreateEmployeeUseCase = require('../modules/employees/application/usecases/CreateEmployeeUseCase');
const GetEmployeeByIdUseCase = require('../modules/employees/application/usecases/GetEmployeeByIdUseCase');

const RequestRepository = require('../modules/requests/infrastructure/requestRepository');
const GetRequestByIdUseCase = require('../modules/requests/application/usecases/GetRequestByIdUseCase');
const CreateRequestUseCase = require('../modules/requests/application/usecases/CreateRequestUseCase');
const DeleteRequestUseCase = require('../modules/requests/application/usecases/DeleteRequestUseCase');
const RequestService = require('../modules/requests/application/requestService');

const UserRepository = require('../modules/auth/infrastructure/userRepository');
const SessionRepository = require('../modules/auth/infrastructure/sessionRepository');
const JwtService = require('../modules/auth/infrastructure/jwtService');
const RegisterUseCase = require('../modules/auth/application/usecases/RegisterUseCase');
const LoginUseCase = require('../modules/auth/application/usecases/LoginUseCase');
const LogoutUseCase = require('../modules/auth/application/usecases/LogoutUseCase');
const ValidateTokenUseCase = require('../modules/auth/application/usecases/ValidateTokenUseCase');
const AuthMiddleware = require('../modules/auth/presentation/authMiddleware');

container.register({
  db: asValue(connection),
  log: asValue(log),
  
  employeeRepository: asClass(EmployeeRepository).singleton(),
  createEmployeeUseCase: asClass(CreateEmployeeUseCase).singleton(),
  getEmployeeByIdUseCase: asClass(GetEmployeeByIdUseCase).singleton(),
  
  requestRepository: asClass(RequestRepository).singleton(),
  getRequestByIdUseCase: asClass(GetRequestByIdUseCase).singleton(),
  createRequestUseCase: asClass(CreateRequestUseCase).singleton(),
  deleteRequestUseCase: asClass(DeleteRequestUseCase).singleton(),
  requestService: asClass(RequestService).singleton(),
  
  userRepository: asClass(UserRepository).singleton(),
  sessionRepository: asClass(SessionRepository).singleton(),
  jwtService: asClass(JwtService).singleton(),
  registerUseCase: asClass(RegisterUseCase).singleton(),
  loginUseCase: asClass(LoginUseCase).singleton(),
  logoutUseCase: asClass(LogoutUseCase).singleton(),
  validateTokenUseCase: asClass(ValidateTokenUseCase).singleton(),
  authMiddleware: asClass(AuthMiddleware).singleton(),
});

module.exports = container;

