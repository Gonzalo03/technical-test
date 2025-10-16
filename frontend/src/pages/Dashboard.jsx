import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Bienvenido, {user?.username}!</h1>
        <p>Gestiona empleados y solicitudes desde aquí</p>
      </div>

      <div className="dashboard-grid">
        <Link to="/employees" className="dashboard-card">
          <div className="card-icon">👥</div>
          <h3>Empleados</h3>
          <p>Ver empleados</p>
        </Link>

        {isAdmin() && (
          <Link to="/employees/new" className="dashboard-card">
            <div className="card-icon">➕</div>
            <h3>Nuevo Empleado</h3>
            <p>Agregar un empleado</p>
          </Link>
        )}

        <Link to="/requests" className="dashboard-card">
          <div className="card-icon">📋</div>
          <h3>Solicitudes</h3>
          <p>Ver solicitudes</p>
        </Link>

        {isAdmin() && (
          <Link to="/requests/new" className="dashboard-card">
            <div className="card-icon">📝</div>
            <h3>Nueva Solicitud</h3>
            <p>Crear una solicitud</p>
          </Link>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Información de Usuario</h2>
        </div>
        <div className="user-info-grid">
          <div className="info-item">
            <span className="info-label">Usuario:</span>
            <span className="info-value">{user?.username}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{user?.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Rol:</span>
            <span className="info-value">
              {isAdmin() ? (
                <span className="badge badge-warning">Administrador</span>
              ) : (
                <span className="badge badge-info">Usuario</span>
              )}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Estado:</span>
            <span className="info-value">
              <span className="badge badge-success">Activo</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
