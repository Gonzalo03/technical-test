import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div>
      <div className="card-header">
        <h1 className="card-title">Mi Perfil</h1>
      </div>

      <div className="card">
        <div className="grid grid-cols-2">
          <div className="info-item">
            <span className="info-label">ID</span>
            <span className="info-value">{user?.id}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Usuario</span>
            <span className="info-value">{user?.username}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Email</span>
            <span className="info-value">{user?.email}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Rol</span>
            <span className="info-value">
              {isAdmin() ? (
                <span className="badge badge-warning">Administrador</span>
              ) : (
                <span className="badge badge-info">Usuario</span>
              )}
            </span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Estado</span>
            <span className="info-value">
              {user?.isActive ? (
                <span className="badge badge-success">Activo</span>
              ) : (
                <span className="badge badge-danger">Inactivo</span>
              )}
            </span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Fecha de Creación</span>
            <span className="info-value">
              {new Date(user?.createdAt).toLocaleDateString('es-MX')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
