import { useEffect, useState } from "react";
import { ArrowRight, Search, UserRound } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FeedbackState from "../components/FeedbackState.jsx";
import ProfileAvatar from "../components/ProfileAvatar.jsx";
import ProfileSearchForm from "../components/ProfileSearchForm.jsx";
import { searchGitHubProfiles } from "../services/githubApi.js";
import { formatCount } from "../utils/format.js";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [input, setInput] = useState(query);
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setInput(query);
    const controller = new AbortController();
    setStatus("loading");
    setData(null);
    setError(null);

    searchGitHubProfiles(query, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        if (result.mode === "profile") {
          navigate(`/profile/${encodeURIComponent(result.profile.login)}`, { replace: true });
          return;
        }
        setData(result);
        setStatus("ready");
      })
      .catch((nextError) => {
        if (controller.signal.aborted || nextError?.name === "AbortError") return;
        setError(nextError);
        setStatus("error");
      });

    return () => controller.abort();
  }, [query, navigate]);

  function handleSearch(value) {
    const clean = value.trim();
    if (clean) navigate(`/search?q=${encodeURIComponent(clean)}`);
  }

  if (status === "loading") {
    return <div className="page-shell results-page page-frame"><FeedbackState type="loading" title="Turning over the right stones." message={`Looking across public GitHub profiles for “${query || "your search"}”.`} /></div>;
  }

  if (status === "error") {
    const isInputError = error?.code === "INVALID_INPUT";
    const isRateLimit = error?.code === "RATE_LIMIT";
    return <div className="page-shell results-page page-frame"><FeedbackState
      title={isInputError ? "Give us a little more to go on." : isRateLimit ? "A pause in the paper trail." : "We lost the thread."}
      message={error?.message || "Something went wrong while contacting GitHub."}
    /></div>;
  }

  if (!data?.items?.length) {
    return <div className="page-shell results-page page-frame"><FeedbackState type="empty" title="No matching profiles yet." message={`We could not find public GitHub accounts for “${query}”. Try another spelling or search by username.`} /></div>;
  }

  return (
    <div className="page-shell results-page page-frame">
      <div className="results-heading">
        <p className="eyebrow"><span className="eyebrow-dot" /> Search / Results</p>
        <h1>People named<br /><em>“{query}”</em></h1>
        <p className="results-description">A few open profiles to help you find the right person. Pick one to see their public work.</p>
      </div>
      <div className="results-search-wrap">
        <ProfileSearchForm value={input} onChange={setInput} onSubmit={handleSearch} placeholder="Search by username or name" buttonLabel="Search again" />
      </div>
      <div className="results-meta"><span><Search size={14} /> {formatCount(data.totalCount)} public {data.totalCount === 1 ? "account" : "accounts"}</span><span>Showing {data.items.length} of up to {formatCount(data.totalCount)}</span></div>
      <div className="people-list">
        {data.items.map((person, index) => (
          <Link className="person-row" to={`/profile/${encodeURIComponent(person.login)}`} key={person.id}>
            <span className="person-index">{String(index + 1).padStart(2, "0")}</span>
            <ProfileAvatar src={person.avatar_url} name={person.login} username={person.login} className="person-avatar" />
            <span className="person-copy"><strong>{person.login}</strong><small><UserRound size={13} /> GitHub member</small></span>
            <span className="person-id">#{person.id}</span>
            <span className="person-action">View profile <ArrowRight size={15} /></span>
          </Link>
        ))}
      </div>
      <div className="results-back"><Link className="text-button" to="/">← Back to the field guide</Link></div>
    </div>
  );
}
