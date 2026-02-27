import { useState, useEffect } from "react";
import { attendanceApi, employeeApi } from "../../services/API";
import "./employeeattendancelist.css";

export default function AttendanceForm({ onAttendanceMarked }) {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employee: "",
    date: new Date().toISOString().split("T")[0],
    status: "P",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    employeeApi
      .getAll()
      .then(setEmployees)
      .catch(() => setError("Failed to load employees"));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await attendanceApi.markAttendance({
        ...formData,
        employee_id: Number(formData.employee),
      });

      setSuccess("✅ Attendance marked successfully");

      setTimeout(() => {
        setFormData({
          employee_id: "",
          date: new Date().toISOString().split("T")[0],
          status: "Present",
        });
        setSuccess("");
        onAttendanceMarked?.();
      }, 1500);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card attendance-form">
      <h3 className="form-title">🕒 Mark Attendance</h3>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Employee */}
          <div className="form-group">
            <label>Employee *</label>
            <select
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select employee</option>
              {employees.map((emp) => (
                <option key={emp.employee_id} value={emp.employee_id}>
                  {emp.full_name} ({emp.employee_id})
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input"
              max={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          {/* Status */}
          <div className="form-group full-width">
            <label>Status *</label>
            <div className="status-buttons">
              <button
                type="button"
                className={`status-btn present ${
                  formData.status === "P" ? "active" : ""
                }`}
                onClick={() =>
                  setFormData({ ...formData, status: "P" })
                }
              >
                ✓ Present
              </button>

              <button
                type="button"
                className={`status-btn absent ${
                  formData.status === "A" ? "active" : ""
                }`}
                onClick={() =>
                  setFormData({ ...formData, status: "A" })
                }
              >
                ✗ Absent
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary submit-btn"
          disabled={loading || !formData.employee}
        >
          {loading ? "Saving..." : "📌 Submit Attendance"}
        </button>
      </form>
    </div>
  );
}
