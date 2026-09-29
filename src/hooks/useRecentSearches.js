import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "github-finder:recent-searches";
const MAX_RECENTS = 4;

function readInitialSearches() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(saved)
      ? saved.filter((item) => typeof item === "string").slice(0, MAX_RECENTS)
      : [];
  } catch {
    return [];
  }
}

export default function useRecentSearches() {
  const [searches, setSearches] = useState(readInitialSearches);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
    } catch {
      // Storage can be unavailable in private browsing; the current session still works.
    }
  }, [searches]);

  const addSearch = useCallback((value) => {
    const clean = String(value ?? "").trim();
    if (!clean) return;
    setSearches((current) => [
      clean,
      ...current.filter((item) => item.toLowerCase() !== clean.toLowerCase()),
    ].slice(0, MAX_RECENTS));
  }, []);

  return { searches, addSearch };
}
