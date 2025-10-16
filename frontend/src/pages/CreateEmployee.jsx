import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { employeeService } from '../services';

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    fecha_ingreso: '',
    salario: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await employeeService.create({
        nombre: formData.nombre,
        fecha_ingreso: formData.fecha_ingreso,
        salario: parseFloat(formData.salario)
      });
      
      navigate(`/employees/${data.data.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear empleado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="card-header">
        <h1 className="card-title">Nuevo Empleado</h1>
        <Link to="/employees" className="btn btn-secondary">
          ← Cancelar
        </Link>
      </div>

      <div className="card">
        {error && (
          <div className="alert alert-error">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre *</label>
            <input
              type="text"
              name="nombre"
              className="form-input"
              value={formData.nombre}
              onChange={handleChange}
              required
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Fecha de Ingreso *</label>
            <input
              type="date"
              name="fecha_ingreso"
              className="form-input"
              value={formData.fecha_ingreso}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Salario *</label>
            <input
              type="number"
              name="salario"
              className="form-input"
              value={formData.salario}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Empleado'}
            </button>
            <Link to="/employees" className="btn btn-outline">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
