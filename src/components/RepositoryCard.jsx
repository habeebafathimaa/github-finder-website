import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { formatCount, formatRelativeDate } from "../utils/format.js";

export default function RepositoryCard({ repository }) {
  return (
    <article className="repo-card">
      <div className="repo-card-top">
        <div className="repo-title-group">
          <span className="repo-index">/</span>
          <h3><a href={repository.html_url} target="_blank" rel="noreferrer">{repository.name}</a></h3>
        </div>
        <a className="repo-open" href={repository.html_url} target="_blank" rel="noreferrer" aria-label={`Open ${repository.name} on GitHub`}><ArrowUpRight size={16} /></a>
      </div>
      <p className="repo-description">{repository.description || "A public project without a description—open the repository to explore."}</p>
      <div className="repo-meta">
        {repository.language && <span className="repo-language"><i aria-hidden="true" />{repository.language}</span>}
        <span><Star size={13} aria-hidden="true" />{formatCount(repository.stargazers_count)}</span>
        <span><GitFork size={13} aria-hidden="true" />{formatCount(repository.forks_count)}</span>
        <span className="repo-updated">{formatRelativeDate(repository.updated_at)}</span>
      </div>
    </article>
  );
}
