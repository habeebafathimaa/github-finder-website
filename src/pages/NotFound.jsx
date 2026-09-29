import { ArrowLeft, Compass } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page-shell not-found-page page-frame">
      <span className="not-found-number">404</span>
      <p className="eyebrow"><span className="eyebrow-dot" /> Off the map</p>
      <h1>This page slipped<br />the <em>paper trail.</em></h1>
      <p className="not-found-copy">We couldn't find the page you were looking for. Let's take you back to the beginning.</p>
      <Link className="not-found-link" to="/"><ArrowLeft size={16} /> Back to GitHub Finder</Link>
      <Compass className="not-found-compass" size={130} strokeWidth={0.5} aria-hidden="true" />
    </div>
  );
}
