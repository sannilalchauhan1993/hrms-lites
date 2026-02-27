import './loading.css'
export default function Loading({ text = "Loading..." }) {
    return (
        <div className="loading-container card">
            <div className="spinner"></div>
            <p className="loading-text">{text}</p>
        </div>
    );
}
