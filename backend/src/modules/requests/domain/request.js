class Request {
  constructor({ id, codigo, descripcion, resumen, id_empleado, created_at, updated_at }) {
    this.id = id;
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.resumen = resumen;
    this.id_empleado = id_empleado;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromDatabase(data) {
    return new Request({
      id: data.id,
      codigo: data.codigo,
      descripcion: data.descripcion,
      resumen: data.resumen,
      id_empleado: data.id_empleado,
      created_at: data.created_at,
      updated_at: data.updated_at
    });
  }

  static create({ codigo, descripcion, resumen, id_empleado }) {
    return new Request({
      id: null,
      codigo,
      descripcion,
      resumen,
      id_empleado: parseInt(id_empleado),
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  toDatabase() {
    return {
      codigo: this.codigo,
      descripcion: this.descripcion,
      resumen: this.resumen,
      id_empleado: this.id_empleado
    };
  }

  toJSON() {
    return {
      id: this.id,
      codigo: this.codigo,
      descripcion: this.descripcion,
      resumen: this.resumen,
      idEmpleado: this.id_empleado,
      createdAt: this.created_at,
      updatedAt: this.updated_at
    };
  }

  validate() {
    const errors = [];

    if (!this.codigo || this.codigo.trim().length === 0) {
      errors.push('Code is required');
    }

    if (this.codigo && this.codigo.length > 50) {
      errors.push('Code cannot exceed 50 characters');
    }

    if (!this.descripcion || this.descripcion.trim().length === 0) {
      errors.push('Description is required');
    }

    if (this.descripcion && this.descripcion.length > 50) {
      errors.push('Description cannot exceed 50 characters');
    }

    if (!this.resumen || this.resumen.trim().length === 0) {
      errors.push('Summary is required');
    }

    if (this.resumen && this.resumen.length > 50) {
      errors.push('Summary cannot exceed 50 characters');
    }

    if (!this.id_empleado || this.id_empleado <= 0) {
      errors.push('Employee ID is required and must be greater than 0');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = Request;
