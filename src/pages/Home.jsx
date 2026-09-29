import { useState } from "react";
import { ArrowDownRight, ArrowRight, Check, Code2, Compass, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ProfileSearchForm from "../components/ProfileSearchForm.jsx";
import useRecentSearches from "../hooks/useRecentSearches.js";

const EXAMPLES = ["torvalds", "sindresorhus", "yyx990803"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const { searches, addSearch } = useRecentSearches();
  const navigate = useNavigate();

  function search(value) {
    const clean = String(value ?? "").trim();
    if (!clean) {
      setValidationMessage("Add a username or name to start your search.");
      return;
    }
    setValidationMessage("");
    addSearch(clean);
    navigate(`/search?q=${encodeURIComponent(clean)}`);
  }

  return (
    <div className="page-shell home-page">
      <section className="home-hero page-frame" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> An open-source field guide <span className="eyebrow-rule" /> No. 01 / Discover</p>
          <h1 id="home-title">Find the person<br />behind the <em>code.</em></h1>
          <p className="hero-deck">Every great project begins with someone curious. Find the people building the tools, ideas, and communities you love.</p>
          <div className="hero-search-area">
            <ProfileSearchForm
              value={query}
              onChange={(value) => { setQuery(value); setValidationMessage(""); }}
              onSubmit={search}
            />
            {validationMessage
              ? <p className="form-note validation-note" role="alert">{validationMessage}</p>
              : <p className="form-note"><span className="key-hint">↵</span> Enter a username, @handle, or profile URL — names work too.</p>}
          </div>
          <div className="popular-searches">
            <span className="micro-label">A few good places to start</span>
            <div className="search-chips">
              {EXAMPLES.map((example) => <button type="button" className="search-chip" key={example} onClick={() => search(example)}>@{example}<ArrowRight size={12} aria-hidden="true" /></button>)}
            </div>
          </div>
          {searches.length > 0 && (
            <div className="recent-searches" aria-label="Recent searches">
              <span className="micro-label">Recently viewed</span>
              {searches.slice(0, 3).map((item) => <button className="recent-link" type="button" key={item} onClick={() => search(item)}>{item}</button>)}
            </div>
          )}
        </div>

        <aside className="hero-art" aria-label="A small field note about public GitHub profiles">
          <div className="hero-art-stamp"><span>FIELD</span><span>NOTE</span><i aria-hidden="true">✳</i></div>
          <div className="orbit orbit-outer" aria-hidden="true" />
          <div className="orbit orbit-inner" aria-hidden="true" />
          <div className="hero-art-mark"><img src="/app-icon.png" alt="" width="152" height="152" /></div>
          <span className="hero-art-spark spark-one" aria-hidden="true">✳</span>
          <span className="hero-art-spark spark-two" aria-hidden="true">✦</span>
          <div className="hero-note-card">
            <span className="note-label"><span className="live-dot" /> A note on access</span>
            <p>Good work leaves a trail.</p>
            <span className="note-caption">Public profiles · Open-source work · Real people</span>
          </div>
          <span className="hero-side-caption">PEOPLE<br />MAKE THE<br />OPEN WEB.</span>
          <span className="hero-figure-index">I — III</span>
        </aside>

        <div className="hero-footnote"><span>01 / A tool for the curious</span><span className="scroll-prompt">Scroll to explore <ArrowDownRight size={14} /></span><span>100% public information</span></div>
      </section>

      <section className="intro-strip page-frame" aria-label="What this tool does">
        <div className="intro-title"><p className="eyebrow">A better way to look closer</p><h2>People, not just profiles.</h2></div>
        <p className="intro-text">A username is only the beginning. Follow the work, find a new library, or meet the person whose code just made your day easier.</p>
        <Link className="subtle-link" to="/about">A little more about this tool <ArrowRight size={15} /></Link>
      </section>

      <section className="steps-section page-frame" aria-labelledby="steps-heading">
        <div className="section-heading">
          <div><p className="eyebrow">The short version / 03 steps</p><h2 id="steps-heading">A little less digging.</h2></div>
          <span className="section-aside">One search. A world of good work.</span>
        </div>
        <div className="steps-grid">
          <article className="step-card"><span className="step-number">01</span><Compass size={20} strokeWidth={1.4} aria-hidden="true" /><h3>Look them up</h3><p>Start with a handle, a profile URL, or the name you remember.</p></article>
          <article className="step-card"><span className="step-number">02</span><Code2 size={20} strokeWidth={1.4} aria-hidden="true" /><h3>Follow the work</h3><p>See public profile details and the repositories they have been shaping.</p></article>
          <article className="step-card"><span className="step-number">03</span><Sparkles size={20} strokeWidth={1.4} aria-hidden="true" /><h3>Keep exploring</h3><p>Open any profile or project right where it lives: on GitHub.</p></article>
        </div>
      </section>

      <section className="closing-note page-frame">
        <div className="closing-symbol" aria-hidden="true">✳</div>
        <div><p className="eyebrow">A little room to wander</p><h2>Follow what<br />makes you <em>curious.</em></h2></div>
        <button type="button" className="closing-cta" onClick={() => document.getElementById("profile-query")?.focus()}>Start a new search <ArrowRight size={16} /></button>
        <div className="closing-assurance"><Check size={14} /> No sign-up. No API key. Just public information.</div>
      </section>
    </div>
  );
}
