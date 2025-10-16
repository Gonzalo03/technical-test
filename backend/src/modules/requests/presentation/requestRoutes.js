const express = require('express');

function requestRoutes({ getRequestByIdUseCase, createRequestUseCase, deleteRequestUseCase }) {
  const router = express.Router();

  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const request = await getRequestByIdUseCase.execute(parseInt(id));
      res.json({
        success: true,
        data: request.toJSON()
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const request = await createRequestUseCase.execute(req.body);
      res.status(201).json({
        success: true,
        data: request.toJSON()
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const request = await deleteRequestUseCase.execute(parseInt(id));
      res.json({
        success: true,
        message: 'Request deleted successfully',
        data: request.toJSON()
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  });

  return router;
}

module.exports = requestRoutes;
