export default function ProfileAvatar({ src, name, username, className = "" }) {
  const label = name || username || "GitHub profile";
  const initials = (name || username || "?")
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <span className={`avatar-frame ${className}`}>
      <span className="avatar-fallback" aria-hidden="true">{initials}</span>
      {src && <img src={src} alt={`${label} avatar`} loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} />}
    </span>
  );
}
