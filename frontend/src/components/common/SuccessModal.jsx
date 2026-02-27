import "./successmodal.css";

export default function SuccessModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={`modal-icon ${isDestructive ? "danger" : "info"}`}>
          {isDestructive ? "⚠️" : "ℹ️"}
        </div>

        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>

        <div className="modal-actions">
          <button onClick={onCancel} className="btn btn-secondary">
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`btn ${isDestructive ? "btn-danger" : "btn-primary"}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
