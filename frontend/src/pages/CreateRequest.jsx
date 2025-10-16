import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { requestService } from '../services';

const CreateRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    codigo: '',
    descripcion: '',
    resumen: '',
    id_empleado: location.state?.employeeId || ''
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
      const data = await requestService.create({
        codigo: formData.codigo,
        descripcion: formData.descripcion,
        resumen: formData.resumen,
        id_empleado: parseInt(formData.id_empleado)
      });
      
      navigate(`/requests/${data.data.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="card-header">
        <h1 className="card-title">Nueva Solicitud</h1>
        <Link to="/requests" className="btn btn-secondary">
          ← Cancelar
        </Link>
      </div>

      <div className="card">
        {error && (
          <div className="alert alert-error">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Código *</label>
            <input
              type="text"
              name="codigo"
              className="form-input"
              value={formData.codigo}
              onChange={handleChange}
              required
              maxLength={50}
              placeholder="REQ-001"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descripción *</label>
            <input
              type="text"
              name="descripcion"
              className="form-input"
              value={formData.descripcion}
              onChange={handleChange}
              required
              maxLength={50}
              placeholder="Solicitud de vacaciones"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Resumen *</label>
            <input
              type="text"
              name="resumen"
              className="form-input"
              value={formData.resumen}
              onChange={handleChange}
              required
              maxLength={50}
              placeholder="15 días hábiles"
            />
          </div>

          <div className="form-group">
            <label className="form-label">ID del Empleado *</label>
            <input
              type="number"
              name="id_empleado"
              className="form-input"
              value={formData.id_empleado}
              onChange={handleChange}
              required
              min="1"
              placeholder="1"
            />
            <small style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', display: 'block' }}>
              Ingresa el ID del empleado para esta solicitud
            </small>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Solicitud'}
            </button>
            <Link to="/requests" className="btn btn-outline">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;
