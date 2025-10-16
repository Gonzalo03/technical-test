import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Requests = () => {
  const { isAdmin } = useAuth();
  
  return (
    <div>
      <div className="card-header">
        <h1 className="card-title">Solicitudes</h1>
        {isAdmin() && (
          <Link to="/requests/new" className="btn btn-primary">
            📝 Nueva Solicitud
          </Link>
        )}
      </div>

      <div className="card">
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h3 className="empty-state-title">Buscar solicitudes</h3>
          <p>Ingresa el ID de la solicitud que deseas ver</p>
          <Link to="/requests/1" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Ver Solicitud #1
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Requests;
