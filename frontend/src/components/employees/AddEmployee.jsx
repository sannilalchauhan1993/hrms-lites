import { useState, useEffect, useCallback } from "react";
import { employeeApi } from "../../services/API";
import "./addemployee.css";

const INITIAL_FORM = {
  employee_id: "",
  full_name: "",
  email: "",
  department: "",
};

const FALLBACK_DEPARTMENTS = [
  "Human Resources",
  "Engineering",
  "Marketing",
  "Sales",
  "Finance",
  "IT",
];

export default function AddEmployeeForm({ onEmployeeAdded }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  /* ---------------- Fetch Departments ---------------- */
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await employeeApi.getDepartments();
        setDepartments(data?.length ? data : FALLBACK_DEPARTMENTS);
      } catch (err) {
        console.error("Failed to fetch departments", err);
        setDepartments(FALLBACK_DEPARTMENTS);
      }
    };
    fetchDepartments();
  }, []);

  /* ---------------- Handlers ---------------- */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!formData.employee_id.trim())
      newErrors.employee_id = "Employee ID is required";

    if (!formData.full_name.trim())
      newErrors.full_name = "Full name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.department)
      newErrors.department = "Select a department";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || !validate()) return;

    setLoading(true);
    setSuccess("");
    setErrors({});

    try {
      await employeeApi.create(formData);
      setSuccess("✅ Employee added successfully");

      setTimeout(() => {
        setFormData(INITIAL_FORM);
        setSuccess("");
        onEmployeeAdded?.();
      }, 1200);
    } catch (err) {
      setErrors({
        form:
          err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to add employee",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card employee-form">
      {errors.form && <div className="error-message">{errors.form}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          {/* Employee ID */}
          <div className="form-group">
            <label>Employee ID *</label>
            <input
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              className={`input ${errors.employee_id ? "input-error" : ""}`}
              placeholder="EMP001"
              autoComplete="off"
            />
            {errors.employee_id && (
              <small className="field-error">{errors.employee_id}</small>
            )}
          </div>

          {/* Full Name */}
          <div className="form-group">
            <label>Full Name *</label>
            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={`input ${errors.full_name ? "input-error" : ""}`}
              placeholder="John Doe"
            />
            {errors.full_name && (
              <small className="field-error">{errors.full_name}</small>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input ${errors.email ? "input-error" : ""}`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <small className="field-error">{errors.email}</small>
            )}
          </div>

          {/* Department */}
          <div className="form-group">
            <label>Department *</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`input ${errors.department ? "input-error" : ""}`}
            >
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <small className="field-error">{errors.department}</small>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Saving..." : "➕ Add Employee"}
        </button>
      </form>
    </div>
  );
}
