import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, CalendarDays, ExternalLink, GitFork, Globe2, MapPin, Users, UserRound, BookOpen, Code2, Link2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import FeedbackState from "../components/FeedbackState.jsx";
import ProfileAvatar from "../components/ProfileAvatar.jsx";
import RepositoryCard from "../components/RepositoryCard.jsx";
import { formatCount, formatDate } from "../utils/format.js";
import { fetchProfileWithRepos } from "../services/githubApi.js";

function safeExternalUrl(value) {
  const clean = String(value ?? "").trim();
  if (!clean) return "";
  try {
    const parsed = new URL(/^[a-z][a-z\d+.-]*:/i.test(clean) ? clean : `https://${clean}`);
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.href : "";
  } catch {
    return "";
  }
}

export default function Profile() {
  const { username = "" } = useParams();
  const [status, setStatus] = useState("loading");
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [repositoriesError, setRepositoriesError] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setProfile(null);
    setError(null);
    fetchProfileWithRepos(username, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setProfile(result.profile);
        setRepositories(Array.isArray(result.repositories) ? result.repositories : []);
        setRepositoriesError(result.repositoriesError);
        setStatus("ready");
      })
      .catch((nextError) => {
        if (controller.signal.aborted || nextError?.name === "AbortError") return;
        setError(nextError);
        setStatus("error");
      });
    return () => controller.abort();
  }, [username]);

  if (status === "loading") {
    return <div className="page-shell profile-page page-frame"><FeedbackState type="loading" title={`Finding @${username}.`} message="Gathering public profile details and recent repositories from GitHub." /></div>;
  }
  if (status === "error") {
    const missing = error?.code === "NOT_FOUND";
    const limited = error?.code === "RATE_LIMIT";
    return <div className="page-shell profile-page page-frame"><FeedbackState
      title={missing ? `No profile called “${username}”.` : limited ? "A pause in the paper trail." : "We lost the thread."}
      message={error?.message || "Something went wrong while contacting GitHub."}
    /></div>;
  }

  const website = safeExternalUrl(profile.blog);
  const profileFields = [
    profile.location && { icon: MapPin, text: profile.location },
    profile.company && { icon: BriefcaseBusiness, text: profile.company },
    profile.created_at && { icon: CalendarDays, text: `Joined ${formatDate(profile.created_at)}` },
  ].filter(Boolean);
  const stats = [
    { label: "Followers", value: profile.followers, icon: Users },
    { label: "Following", value: profile.following, icon: UserRound },
    { label: "Public repos", value: profile.public_repos, icon: BookOpen },
    { label: "Public gists", value: profile.public_gists, icon: Code2 },
  ];

  return (
    <div className="page-shell profile-page page-frame">
      <Link className="back-link" to="/"><ArrowLeft size={15} /> Back to search</Link>
      <p className="eyebrow profile-eyebrow"><span className="eyebrow-dot" /> Profile / Public record</p>
      <section className="profile-card" aria-labelledby="profile-name">
        <div className="profile-topline"><span>GITHUB PROFILE <i>·</i> OPEN DATA</span><span>NO. {String(profile.id).padStart(5, "0")}</span></div>
        <div className="profile-overview">
          <ProfileAvatar src={profile.avatar_url} name={profile.name} username={profile.login} className="profile-avatar" />
          <div className="profile-identity">
            <p className="profile-handle">@{profile.login}</p>
            <h1 id="profile-name">{profile.name || profile.login}</h1>
            {profile.bio
              ? <p className="profile-bio">{profile.bio}</p>
              : <p className="profile-bio profile-bio-muted">This profile keeps its bio short. Take a look at the work instead.</p>}
          </div>
          <a className="github-profile-button" href={profile.html_url} target="_blank" rel="noreferrer">Open on GitHub <ExternalLink size={15} /></a>
        </div>
        <div className="profile-details">
          <div className="profile-facts">
            {profileFields.map(({ icon: Icon, text }) => <span className="profile-fact" key={text}><Icon size={15} strokeWidth={1.6} />{text}</span>)}
            {website && <a className="profile-fact website-fact" href={website} target="_blank" rel="noreferrer"><Globe2 size={15} strokeWidth={1.6} />{profile.blog.replace(/^https?:\/\//, "").replace(/\/$/, "")}<ArrowUpRight size={12} /></a>}
            {profileFields.length === 0 && !website && <span className="profile-fact profile-fact-muted">A few details are kept off the public record.</span>}
          </div>
          {profile.twitter_username && <a className="social-link" href={`https://twitter.com/${encodeURIComponent(profile.twitter_username)}`} target="_blank" rel="noreferrer">𝕏 @{profile.twitter_username} <ArrowUpRight size={12} /></a>}
        </div>
        <div className="profile-stats" aria-label="Public profile statistics">
          {stats.map(({ label, value, icon: Icon }) => <div className="profile-stat" key={label}><span className="stat-icon"><Icon size={16} strokeWidth={1.6} /></span><span className="stat-value">{formatCount(value)}</span><span className="stat-label">{label}</span></div>)}
        </div>
      </section>

      <section className="repository-section" aria-labelledby="repositories-heading">
        <div className="section-heading repo-section-heading">
          <div><p className="eyebrow">The public work / {String(repositories.length).padStart(2, "0")} shown</p><h2 id="repositories-heading">Recent repositories<span className="heading-period">.</span></h2></div>
          <a className="subtle-link" href={`${profile.html_url}?tab=repositories`} target="_blank" rel="noreferrer">All repositories <ArrowUpRight size={14} /></a>
        </div>
        {repositoriesError && <p className="repo-limit-note" role="status"><Link2 size={14} /> The profile loaded. GitHub could not load repository details right now.</p>}
        {repositories.length > 0
          ? <div className="repository-grid">{repositories.map((repository) => <RepositoryCard repository={repository} key={repository.id} />)}</div>
          : <div className="empty-repositories"><GitFork size={18} /><span>No public repositories to show here just yet.</span></div>}
      </section>
      <div className="profile-source-note"><span className="source-mark">✳</span><p>These details are public data supplied by GitHub and may change over time.</p><a href={profile.html_url} target="_blank" rel="noreferrer">Source <ArrowUpRight size={13} /></a></div>
    </div>
  );
}
