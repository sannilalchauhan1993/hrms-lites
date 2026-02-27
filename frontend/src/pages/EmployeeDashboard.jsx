import { useState, useEffect, useCallback } from "react";
import { employeeApi, attendanceApi } from "../services/API";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import "./employeedashboard.css";

const INITIAL_STATS = {
  totalEmployees: 0,
  todayAttendance: 0,
  presentToday: 0,
  absentToday: 0,
};

export default function EmployeeDashboard() {
  const [stats, setStats] = useState(INITIAL_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEmployeeDashboardData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const today = new Date().toISOString().split("T")[0];

      const [employees, todayAttendance] = await Promise.all([
        employeeApi.getAll(),
        attendanceApi.getAll(today),
      ]);

      const presentToday = todayAttendance.filter(
        (a) => a.status === "P"
      ).length;

      const absentToday = todayAttendance.filter(
        (a) => a.status === "A"
      ).length;

      setStats({
        totalEmployees: employees.length,
        todayAttendance: todayAttendance.length,
        presentToday,
        absentToday,
      });
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEmployeeDashboardData();
  }, [loadEmployeeDashboardData]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={loadEmployeeDashboardData} />;

  return (
    <section className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>📊 Dashboard Main</h1>
        <p>Overview of your HRMS system</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard
          icon="👥"
          value={stats.totalEmployees}
          label="Total Employees"
          variant="primary"
        />
        <StatCard
          icon="✓"
          value={stats.presentToday}
          label="Present Today"
          variant="success"
        />
        <StatCard
          icon="✗"
          value={stats.absentToday}
          label="Absent Today"
          variant="danger"
        />
        <StatCard
          icon="📅"
          value={stats.todayAttendance}
          label="Today's Records"
          variant="warning"
        />
      </div>

      {/* Info */}
      <div className="dashboard-info card">
        <h3>Welcome to Your HRMS Lite Dashboard</h3>
        <p>
          This is your central hub for managing all HR-related activities.
          From here, you can seamlessly navigate to different sections of the
          application.
        </p>

       

        <ul>
          <li>
            <strong>Employee Management:</strong> Add, view, and manage employee
            records.
          </li>
          <li>
            <strong>Attendance Tracking:</strong> Mark and monitor daily
            attendance.
          </li>
          <li>
            <strong>Dashboard Overview:</strong> Quick snapshot of key HR metrics.
          </li>
        </ul>

        <p className="hint">Use the navigation menu to get started.</p>
      </div>
    </section>
  );
}

/* Reusable stat card */
function StatCard({ icon, value, label, variant }) {
  return (
    <div className="stat-card card">
      <div className={`stat-icon ${variant}`}>{icon}</div>
      <div className="stat-content">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-label">{label}</p>
      </div>
    </div>
  );
}
