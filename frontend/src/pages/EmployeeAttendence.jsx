import { useState, useEffect, useCallback } from "react";
import { attendanceApi } from "../services/API";
import EmployeeAttendence from "../components/attendance/EmployeeAttendence";
import EmployeeAttendanceList from "../components/attendance/EmployeeAttendanceList";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import "./employeeAttendence.css";

export default function Attendance() {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const loadAttendances = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await attendanceApi.getAll();
      setAttendances(data || []);
    } catch (err) {
      setError(err.message || "Failed to load attendance records");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAttendances();
  }, [loadAttendances]);

  return (
    <section className="attendance-page">
      {/* Header */}
      <div className="attendance-header">
        <div>
          <h1>Attendance Management</h1>
          <p>Track and manage daily employee attendance records.</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "✕ Close Form" : "＋ Mark Attendance"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <EmployeeAttendence
          onAttendanceMarked={() => {
            loadAttendances();
            setShowForm(false);
          }}
        />
      )}

      {/* Content */}
      <div className="attendance-content">
        {loading ? (
          <div className="card">
            <Loading />
          </div>
        ) : error ? (
          <ErrorMessage message={error} onRetry={loadAttendances} />
        ) : (
          <EmployeeAttendanceList attendances={attendances} />
        )}
      </div>
    </section>
  );
}
