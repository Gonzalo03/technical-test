import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin()) {
    return (
      <div className="card">
        <div className="alert alert-error">
          ⚠️ No tienes permisos para acceder a esta página. Solo los administradores pueden realizar esta acción.
        </div>
        <button onClick={() => window.history.back()} className="btn btn-secondary">
          ← Volver
        </button>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
