import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            📊 Sistema de Gestión
          </Link>
          
          <div className="navbar-menu">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/employees" className="nav-link">Empleados</Link>
            <Link to="/requests" className="nav-link">Solicitudes</Link>
          </div>

          <div className="navbar-user">
            <span className="user-info">
              {user?.username} 
              {isAdmin() && <span className="badge badge-warning ml-2">Admin</span>}
            </span>
            <Link to="/profile" className="nav-link">Perfil</Link>
            <button onClick={handleLogout} className="btn btn-sm btn-outline">
              Salir
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
