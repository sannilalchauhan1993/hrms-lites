import "./errormessage.css";
export default function ErrorMessage({ message, onRetry }) {
    return (
        <div className="error-message">
            <p style={{ marginBottom: onRetry ? '1rem' : '0' }}>
                ❌ {message}
            </p>
            {onRetry && (
                <button onClick={onRetry} className="btn btn-secondary" style={{ marginTop: '0.5rem' }}>
                    Try Again
                </button>
            )}
        </div>
    );
}
