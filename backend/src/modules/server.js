const express = require('express');
const { scopePerRequest } = require('awilix-express');
const container = require('../common/container');
const { employeeRoutesWithUseCases } = require('./employees/presentation/employeeRoutes');
const requestRoutes = require('./requests/presentation/requestRoutes');
const authRoutes = require('./auth/presentation/authRoutes');

class ExpressServer {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.setupMiddlewares();
        this.setupRoutes();
    }

    setupMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(scopePerRequest(container));
    }

    setupRoutes() {
        this.app.get('/health', (req, res) => {
            res.json({ status: 'OK', message: 'Server is running' });
        });

        this.app.use('/auth', (req, res, next) => {
            const router = authRoutes({
                registerUseCase: req.container.resolve('registerUseCase'),
                loginUseCase: req.container.resolve('loginUseCase'),
                logoutUseCase: req.container.resolve('logoutUseCase'),
                authMiddleware: req.container.resolve('authMiddleware')
            });
            router(req, res, next);
        });

        const getAuthMiddleware = (req) => req.container.resolve('authMiddleware');

        this.app.use('/employees', (req, res, next) => {
            const authMiddleware = getAuthMiddleware(req);
            const authenticate = authMiddleware.authenticate();
            
            authenticate(req, res, () => {
                const router = employeeRoutesWithUseCases({
                    getEmployeeByIdUseCase: req.container.resolve('getEmployeeByIdUseCase'),
                    createEmployeeUseCase: req.container.resolve('createEmployeeUseCase')
                });
                router(req, res, next);
            });
        });

        this.app.use('/requests', (req, res, next) => {
            const authMiddleware = getAuthMiddleware(req);
            const authenticate = authMiddleware.authenticate();
            
            authenticate(req, res, () => {
                if (req.method === 'DELETE') {
                    const requireAdmin = authMiddleware.requireAdmin();
                    return requireAdmin(req, res, () => {
                        const router = requestRoutes({
                            getRequestByIdUseCase: req.container.resolve('getRequestByIdUseCase'),
                            createRequestUseCase: req.container.resolve('createRequestUseCase'),
                            deleteRequestUseCase: req.container.resolve('deleteRequestUseCase')
                        });
                        router(req, res, next);
                    });
                }
                
                const router = requestRoutes({
                    getRequestByIdUseCase: req.container.resolve('getRequestByIdUseCase'),
                    createRequestUseCase: req.container.resolve('createRequestUseCase'),
                    deleteRequestUseCase: req.container.resolve('deleteRequestUseCase')
                });
                router(req, res, next);
            });
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

module.exports = ExpressServer;
