class Employee {
  constructor({ id, fecha_ingreso, nombre, salario, created_at, updated_at }) {
    this.id = id;
    this.fecha_ingreso = fecha_ingreso;
    this.nombre = nombre;
    this.salario = salario;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromDatabase(data) {
    return new Employee({
      id: data.id,
      fecha_ingreso: data.fecha_ingreso,
      nombre: data.nombre,
      salario: parseFloat(data.salario),
      created_at: data.created_at,
      updated_at: data.updated_at
    });
  }

  static create({ fecha_ingreso, nombre, salario }) {
    return new Employee({
      id: null,
      fecha_ingreso: new Date(fecha_ingreso),
      nombre,
      salario: parseFloat(salario),
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  toDatabase() {
    return {
      fecha_ingreso: this.fecha_ingreso,
      nombre: this.nombre,
      salario: this.salario
    };
  }

  toJSON() {
    return {
      id: this.id,
      fechaIngreso: this.fecha_ingreso,
      nombre: this.nombre,
      salario: this.salario,
      createdAt: this.created_at,
      updatedAt: this.updated_at
    };
  }

  validate() {
    const errors = [];

    if (!this.nombre || this.nombre.trim().length === 0) {
      errors.push('Name is required');
    }

    if (this.nombre && this.nombre.length > 50) {
      errors.push('Name cannot exceed 50 characters');
    }

    if (!this.salario || this.salario <= 0) {
      errors.push('Salary must be greater than 0');
    }

    if (!this.fecha_ingreso) {
      errors.push('Entry date is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = Employee;

