import { AlertCircle, SearchX, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeedbackState({ type = "error", title, message, actionLabel = "Back to search", actionTo = "/", onAction }) {
  const Icon = type === "empty" ? SearchX : type === "loading" ? Sparkles : AlertCircle;
  return (
    <section className={`feedback-state feedback-${type}`} role={type === "loading" ? "status" : "alert"} aria-live={type === "loading" ? "polite" : "assertive"}>
      <span className={`feedback-icon ${type === "loading" ? "is-spinning" : ""}`}><Icon size={25} strokeWidth={1.6} aria-hidden="true" /></span>
      <p className="eyebrow feedback-kicker">{type === "loading" ? "Connecting to GitHub" : type === "empty" ? "No matches this time" : "A small detour"}</p>
      <h1>{title}</h1>
      <p className="feedback-message">{message}</p>
      {onAction
        ? <button className="text-button" type="button" onClick={onAction}>{actionLabel} <span aria-hidden="true">→</span></button>
        : <Link className="text-button" to={actionTo}>{actionLabel} <span aria-hidden="true">→</span></Link>}
    </section>
  );
}
