import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Employees = () => {
  const { isAdmin } = useAuth();
  
  return (
    <div>
      <div className="card-header">
        <h1 className="card-title">Empleados</h1>
        {isAdmin() && (
          <Link to="/employees/new" className="btn btn-primary">
            ➕ Nuevo Empleado
          </Link>
        )}
      </div>

      <div className="card">
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <h3 className="empty-state-title">Buscar empleados</h3>
          <p>Ingresa el ID del empleado que deseas ver</p>
          <Link to="/employees/1" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Ver Empleado #1
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Employees;
