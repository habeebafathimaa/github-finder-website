import { ArrowUpRight, Heart, Github } from "lucide-react";
import { Link } from "react-router-dom";
import finderMark from "../assets/finder-mark.svg";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link to="/" className="footer-wordmark"><img src={finderMark} alt="" width="25" height="25" /> GitHub Finder</Link>
        <p>Made for curious minds. Powered by public GitHub data.</p>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <a href="https://docs.github.com/en/rest" target="_blank" rel="noreferrer">API docs <ArrowUpRight size={12} /></a>
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub <Github size={13} /></a>
        </div>
        <span className="footer-credit">Built with <Heart size={12} /> React</span>
      </div>
    </footer>
  );
}
