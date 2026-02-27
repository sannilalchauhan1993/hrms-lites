import { useState } from 'react';
import { employeeApi } from '../../services/API';
import EmptyState from '../common/EmptyState';
import ConfirmModal from '../common/SuccessModal';
import './employeelist.css';

/* Generate consistent color per employee */
const getAvatarColor = (text) => {
  const colors = [
    '#6366f1', '#10b981', '#f59e0b',
    '#ef4444', '#8b5cf6', '#06b6d4',
    '#ec4899'
  ];
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export default function EmployeeList({ employees, onEmployeeDeleted }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const handleDelete = async () => {
    if (!employeeToDelete) return;
    setDeletingId(employeeToDelete.employee_id);

    try {
      await employeeApi.delete(employeeToDelete.employee_id);
      onEmployeeDeleted?.();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
      setEmployeeToDelete(null);
    }
  };

  const filteredEmployees = employees.filter(emp =>
    `${emp.full_name} ${emp.employee_id} ${emp.email} ${emp.department}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="employee-list-container">
        <input
          className="input search-input"
          placeholder="🔍 Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredEmployees.length === 0 ? (
          <EmptyState
            icon="👥"
            title="No employees found"
            message={searchTerm ? "Try adjusting your search" : "Add your first employee"}
          />
        ) : (
          <div className="employee-grid">
            {filteredEmployees.map((emp) => {
              const accentColor = getAvatarColor(emp.full_name);

              return (
                <div
                  key={emp.id}
                  className="card employee-card"
                  style={{ borderLeft: `5px solid ${accentColor}` }}
                >
                  <div className="employee-header">
                    <div
                      className="employee-avatar"
                      style={{ background: accentColor }}
                    >
                      {emp.full_name.charAt(0).toUpperCase()}
                    </div>

                    <div className="employee-info">
                      <h4>{emp.full_name}</h4>
                      <p className="employee-id">{emp.employee_id}</p>
                    </div>
                  </div>

                  <div className="employee-details">
                    <p><strong>📧</strong> {emp.email}</p>
                    <p><strong>🏢</strong> {emp.department}</p>
                  </div>

                  <button
                    className="btn btn-danger delete-btn"
                    disabled={deletingId === emp.employee_id}
                    onClick={() => setEmployeeToDelete(emp)}
                  >
                    {deletingId === emp.employee_id ? 'Deleting…' : '🗑 Delete'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!employeeToDelete}
        title="Confirm Deletion"
        message={`Delete ${employeeToDelete?.full_name}? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setEmployeeToDelete(null)}
        confirmText="Delete"
        isDestructive
      />
    </>
  );
}
