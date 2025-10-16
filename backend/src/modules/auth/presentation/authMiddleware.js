class AuthMiddleware {
  constructor({ validateTokenUseCase, log }) {
    this.validateTokenUseCase = validateTokenUseCase;
    this.log = log;
  }

  authenticate() {
    return async (req, res, next) => {
      try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({
            success: false,
            error: 'No token provided'
          });
        }

        const token = authHeader.substring(7);

        const user = await this.validateTokenUseCase.execute(token);
        
        req.user = user.toJSON();
        req.token = token;
        
        next();
      } catch (error) {
        this.log.error('Authentication failed:', error.message);
        return res.status(401).json({
          success: false,
          error: 'Invalid or expired token'
        });
      }
    };
  }

  requireAdmin() {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Admin access required'
        });
      }

      next();
    };
  }

  requireRole(roles) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          error: 'Insufficient permissions'
        });
      }

      next();
    };
  }
}

module.exports = AuthMiddleware;
