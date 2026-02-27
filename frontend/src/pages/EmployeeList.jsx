import { useState, useEffect, useCallback } from "react";
import { employeeApi } from "../services/API";
import AddEmployee from "../components/employees/AddEmployee";
import EmployeeList from "../components/employees/EmployeeList";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import "./employeelist.css";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await employeeApi.getAll();
      setEmployees(data || []);
    } catch (err) {
      setError(err.message || "Failed to load employees");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  return (
    <section className="employees-page">
      {/* Header */}
      <div className="employees-header">
        <div>
          <h1>Employee Management</h1>
          <p>Add, view, and manage your organization's employees.</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "✕ Close Form" : "＋ Add Employee"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <AddEmployee
          onEmployeeAdded={() => {
            loadEmployees();
            setShowForm(false);
          }}
        />
      )}

      {/* List */}
      <div className="card employees-list">
        <h2>
          All Employees <span>({employees.length})</span>
        </h2>

        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} onRetry={loadEmployees} />
        ) : (
          <EmployeeList
            employees={employees}
            onEmployeeDeleted={loadEmployees}
          />
        )}
      </div>
    </section>
  );
}
