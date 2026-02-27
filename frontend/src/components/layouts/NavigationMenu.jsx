import { Link, useLocation } from "react-router-dom";
import "./navigationmenu.css";

export default function Navigation() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  return (
    <header className="header">
      {/* Top Title Section */}
      <div className="header-top">
        <Link to="/">
          <h1>HRMS Lite</h1>
        <p>Human Resource Management System</p>
        </Link>
      </div>

      {/* Navigation Tabs */}
      <nav className="header-nav">
        <Link
          to="/employees"
          className={`nav-tab ${isActive("/employees") ? "active" : ""}`}
        >
          <span className="nav-icon">👥</span>
          Employees
        </Link>

        <Link
          to="/attendance"
          className={`nav-tab ${isActive("/attendance") ? "active" : ""}`}
        >
          <span className="nav-icon">📅</span>
          Attendance
        </Link>
      </nav>
    </header>
  );
}
