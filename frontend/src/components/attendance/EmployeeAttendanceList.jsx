import { useState, useMemo } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from "date-fns";
import EmptyState from "../common/EmptyState";
import "./employeeattendence.css";

export default function EmployeeAttendanceList({ attendances }) {
  const [filterEmployee, setFilterEmployee] = useState("");
  const [filterDate, setFilterDate] = useState(null);

  const filteredAttendances = useMemo(() => {
    return attendances.filter((att) => {
      const matchesEmployee =
        !filterEmployee ||
        att.employee.full_name
          .toLowerCase()
          .includes(filterEmployee.toLowerCase());

      if (!filterDate) return matchesEmployee;

      const attDate = new Date(att.date);

      if (filterDate.type === "day") {
        return (
          matchesEmployee &&
          format(attDate, "yyyy-MM-dd") === filterDate.value
        );
      }

      return (
        matchesEmployee &&
        isWithinInterval(attDate, {
          start: filterDate.start,
          end: filterDate.end,
        })
      );
    });
  }, [attendances, filterEmployee, filterDate]);

  const setDateFilter = (type) => {
    const today = new Date();
    if (type === "today") {
      setFilterDate({ type: "day", value: format(today, "yyyy-MM-dd") });
    } else if (type === "week") {
      setFilterDate({
        type: "week",
        start: startOfWeek(today, { weekStartsOn: 1 }),
        end: endOfWeek(today, { weekStartsOn: 1 }),
      });
    } else if (type === "month") {
      setFilterDate({
        type: "month",
        start: startOfMonth(today),
        end: endOfMonth(today),
      });
    } else {
      setFilterDate(null);
    }
  };

  return (
    <div className="attendance-list-container">
      {/* Filters */}
      <div className="card filters">
        <input
          type="text"
          placeholder="🔍 Search employee..."
          value={filterEmployee}
          onChange={(e) => setFilterEmployee(e.target.value)}
          className="input filter-input"
        />

        <div className="date-filters">
          <button
            className={`filter-btn ${
              filterDate?.type === "day" ? "active" : ""
            }`}
            onClick={() => setDateFilter("today")}
          >
            Today
          </button>
          <button
            className={`filter-btn ${
              filterDate?.type === "week" ? "active" : ""
            }`}
            onClick={() => setDateFilter("week")}
          >
            This Week
          </button>
          <button
            className={`filter-btn ${
              filterDate?.type === "month" ? "active" : ""
            }`}
            onClick={() => setDateFilter("month")}
          >
            This Month
          </button>
          {(filterDate || filterEmployee) && (
            <button
              className="filter-btn clear"
              onClick={() => {
                setFilterEmployee("");
                setFilterDate(null);
              }}
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {filteredAttendances.length === 0 ? (
        <EmptyState
          icon="📅"
          title="No attendance found"
          message={
            filterEmployee || filterDate
              ? "Try adjusting filters"
              : "Attendance records will appear here"
          }
        />
      ) : (
        <div className="attendance-table-wrapper card">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Status</th>
                <th>Marked At</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendances.map((att) => (
                <tr key={att.id}>
                  <td className="employee-cell">
                    <div className="mini-avatar">
                      {att.employee.full_name[0].toUpperCase()}
                    </div>
                    {att.employee.full_name}
                  </td>
                  <td>{format(new Date(att.date), "MMM d, yyyy")}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        att.status === "P" ? "present" : "absent"
                      }`}
                    >
                      {att.status === "P" ? "✓" : "✗"} {att.status}
                    </span>
                  </td>
                  <td className="time-cell">
                    {format(new Date(att.created_at), "p")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredAttendances.length > 0 && (
        <div className="attendance-summary">
          Showing <strong>{filteredAttendances.length}</strong> record
          {filteredAttendances.length > 1 && "s"}
        </div>
      )}
    </div>
  );
}
