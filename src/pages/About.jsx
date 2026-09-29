import { ArrowUpRight, Braces, Compass, Radio, Smartphone } from "lucide-react";

const CONCEPTS = [
  { number: "01", icon: Braces, title: "React Hooks", copy: "useState manages the search field, recent queries, and loading/error/data states. useEffect fetches route data and aborts obsolete requests when a page changes." },
  { number: "02", icon: Compass, title: "Client-side routing", copy: "React Router connects the discovery page, profile-name results, profile details, the About page, and a thoughtful not-found screen." },
  { number: "03", icon: Radio, title: "Public API + Fetch", copy: "A reusable service calls GitHub's REST API for profile data and repositories, then translates common API responses into helpful messages." },
  { number: "04", icon: Smartphone, title: "Responsive UI", copy: "A small set of reusable components and responsive CSS supports comfortable reading and search on phones, tablets, and desktops." },
];

export default function About() {
  return (
    <div className="page-shell about-page page-frame">
      <section className="about-hero">
        <p className="eyebrow"><span className="eyebrow-dot" /> About this field guide / 2026</p>
        <h1>A little curiosity<br />goes a <em>long way.</em></h1>
        <p className="about-intro">GitHub Finder is a small window into the people making the open web. Search for a handle or a name, learn a little about the person, and follow the work back to its source.</p>
      </section>
      <section className="about-principles" aria-labelledby="principles-title">
        <div className="about-section-head"><div><p className="eyebrow">What powers the page / 04 notes</p><h2 id="principles-title">Built with intention.</h2></div><span className="about-side-note">A learning project.<br />A useful little tool.</span></div>
        <div className="concept-list">
          {CONCEPTS.map(({ number, icon: Icon, title, copy }) => <article className="concept-row" key={number}><span className="concept-number">{number}</span><span className="concept-icon"><Icon size={18} strokeWidth={1.5} /></span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>
      <section className="about-data-note">
        <div className="about-note-mark">✳</div>
        <div><p className="eyebrow">A note on the source</p><h2>Public by design.</h2><p>All profile and repository information comes from GitHub's unauthenticated public REST API. No account, token, or private data is requested. GitHub applies rate limits to unauthenticated requests, so a short pause may be needed after many searches.</p></div>
        <a className="subtle-link" href="https://docs.github.com/en/rest" target="_blank" rel="noreferrer">Read the API docs <ArrowUpRight size={14} /></a>
      </section>
      <div className="about-signoff"><span>GITHUB FINDER</span><span>Find the person behind the code. <span className="signoff-star">✳</span></span></div>
    </div>
  );
}
