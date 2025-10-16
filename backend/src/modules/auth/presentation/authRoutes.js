const express = require('express');

function authRoutes({ registerUseCase, loginUseCase, logoutUseCase, authMiddleware }) {
  const router = express.Router();

  router.post('/register', async (req, res) => {
    try {
      const user = await registerUseCase.execute(req.body);
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: user.toJSON()
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const ipAddress = req.ip || req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'];

      const result = await loginUseCase.execute({
        username,
        password,
        ipAddress,
        userAgent
      });

      res.json({
        success: true,
        message: 'Login successful',
        data: result
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error.message
      });
    }
  });

  router.post('/logout', authMiddleware.authenticate(), async (req, res) => {
    try {
      const result = await logoutUseCase.execute(req.token);
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  });

  router.get('/me', authMiddleware.authenticate(), (req, res) => {
    res.json({
      success: true,
      data: req.user
    });
  });

  return router;
}

module.exports = authRoutes;
