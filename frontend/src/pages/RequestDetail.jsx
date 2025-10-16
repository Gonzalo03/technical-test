import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { requestService } from '../services';
import { useAuth } from '../context/AuthContext';

const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchRequest();
  }, [id]);

  const fetchRequest = async () => {
    try {
      setLoading(true);
      const data = await requestService.getById(id);
      setRequest(data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cargar solicitud');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de eliminar esta solicitud?')) {
      return;
    }

    try {
      setDeleting(true);
      await requestService.delete(id);
      navigate('/requests', { state: { message: 'Solicitud eliminada exitosamente' } });
    } catch (err) {
      setError(err.response?.data?.error || 'Error al eliminar solicitud');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <div className="loading">Cargando solicitud...</div>;
  }

  if (error) {
    return (
      <div className="card">
        <div className="alert alert-error">{error}</div>
        <Link to="/requests" className="btn btn-secondary">
          ← Volver
        </Link>
      </div>
    );
  }

  if (!request) {
    return null;
  }

  return (
    <div>
      <div className="card-header">
        <h1 className="card-title">Detalles de la Solicitud</h1>
        <Link to="/requests" className="btn btn-secondary">
          ← Volver
        </Link>
      </div>

      <div className="card">
        <div className="grid grid-cols-2">
          <div className="info-item">
            <span className="info-label">ID</span>
            <span className="info-value">{request.id}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Código</span>
            <span className="info-value">{request.codigo}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Descripción</span>
            <span className="info-value">{request.descripcion}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Resumen</span>
            <span className="info-value">{request.resumen}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">ID Empleado</span>
            <span className="info-value">
              <Link to={`/employees/${request.idEmpleado}`} className="text-primary">
                #{request.idEmpleado}
              </Link>
            </span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Fecha de Creación</span>
            <span className="info-value">
              {new Date(request.createdAt).toLocaleDateString('es-MX')}
            </span>
          </div>
        </div>

        {isAdmin() && (
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button
              onClick={handleDelete}
              className="btn btn-danger"
              disabled={deleting}
            >
              {deleting ? 'Eliminando...' : '🗑️ Eliminar Solicitud'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDetail;
