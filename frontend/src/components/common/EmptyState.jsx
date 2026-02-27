import './emptystate.css'
export default function EmptyState({
  icon = "📭",
  title = "Nothing here yet",
  message = "There is no data to display"
}) {
  return (
    <div className="empty-state card">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
    </div>
  );
}