const express = require('express');
  
function employeeRoutesWithService({ employeeController }) {
  const router = express.Router();

  router.get('/:id', (req, res) => employeeController.getById(req, res));
  router.post('/', (req, res) => employeeController.create(req, res));

  return router;
}

function employeeRoutesWithUseCases({ getEmployeeByIdUseCase, createEmployeeUseCase }) {
  const router = express.Router();

  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await getEmployeeByIdUseCase.execute(parseInt(id));
      res.json({
        success: true,
        data: employee.toJSON()
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
      const employee = await createEmployeeUseCase.execute(req.body);
      res.status(201).json({
        success: true,
        data: employee.toJSON()
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  });

  return router;
}

module.exports = employeeRoutesWithService;
module.exports.employeeRoutesWithUseCases = employeeRoutesWithUseCases;

