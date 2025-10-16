import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { employeeService } from '../services';

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getById(id);
      setEmployee(data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cargar empleado');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Cargando empleado...</div>;
  }

  if (error) {
    return (
      <div className="card">
        <div className="alert alert-error">{error}</div>
        <Link to="/employees" className="btn btn-secondary">
          ← Volver
        </Link>
      </div>
    );
  }

  if (!employee) {
    return null;
  }

  return (
    <div>
      <div className="card-header">
        <h1 className="card-title">Detalles del Empleado</h1>
        <Link to="/employees" className="btn btn-secondary">
          ← Volver
        </Link>
      </div>

      <div className="card">
        <div className="grid grid-cols-2">
          <div className="info-item">
            <span className="info-label">ID</span>
            <span className="info-value">{employee.id}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Nombre</span>
            <span className="info-value">{employee.nombre}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Fecha de Ingreso</span>
            <span className="info-value">
              {new Date(employee.fechaIngreso).toLocaleDateString('es-MX')}
            </span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Salario</span>
            <span className="info-value">
              ${employee.salario?.toLocaleString('es-MX')}
            </span>
          </div>
        </div>

        {isAdmin() && (
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <Link to="/requests/new" state={{ employeeId: employee.id }} className="btn btn-primary">
              Crear Solicitud
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetail;
