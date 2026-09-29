import { ArrowRight, Search, X } from "lucide-react";

export default function ProfileSearchForm({ value, onChange, onSubmit, placeholder = "Try a username or a person's name", buttonLabel = "Find profile", autoFocus = false }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit?.(value.trim());
  }

  return (
    <form className="profile-search-form" onSubmit={handleSubmit} role="search">
      <label className="sr-only" htmlFor="profile-query">GitHub username or name</label>
      <Search className="form-search-icon" size={20} strokeWidth={1.7} aria-hidden="true" />
      <input
        id="profile-query"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        autoCapitalize="none"
        spellCheck="false"
        autoFocus={autoFocus}
        maxLength={100}
      />
      {value && <button className="clear-search" type="button" aria-label="Clear search" onClick={() => onChange("")}><X size={17} /></button>}
      <button className="search-submit" type="submit" disabled={!value.trim()}>
        <span>{buttonLabel}</span><ArrowRight size={17} aria-hidden="true" />
      </button>
    </form>
  );
}
