const API_ROOT = "https://api.github.com";

export class GitHubApiError extends Error {
  constructor(message, code, options = {}) {
    super(message);
    this.name = "GitHubApiError";
    this.code = code;
    this.status = options.status ?? null;
    this.retryAt = options.retryAt ?? null;
  }
}

export function normalizeSearchQuery(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  const candidate = raw.replace(/^@/, "");
  if (/^https?:\/\/(www\.)?github\.com\//i.test(candidate)) {
    try {
      const parsed = new URL(candidate);
      const segment = parsed.pathname.split("/").filter(Boolean)[0];
      return segment ?? "";
    } catch {
      return candidate;
    }
  }
  return candidate.replace(/^github\.com\//i, "").replace(/\/$/, "");
}

function isHandle(value) {
  return /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(value);
}

async function readErrorMessage(response) {
  try {
    const body = await response.json();
    return typeof body?.message === "string" ? body.message : "";
  } catch {
    return "";
  }
}

async function requestJson(path, signal) {
  let response;
  try {
    response = await fetch(`${API_ROOT}${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      signal,
    });
  } catch (error) {
    if (error?.name === "AbortError") throw error;
    throw new GitHubApiError(
      "We couldn’t reach GitHub. Check your connection and try again.",
      "NETWORK_ERROR",
    );
  }

  if (!response.ok) {
    const message = await readErrorMessage(response);
    const remaining = response.headers.get("x-ratelimit-remaining");
    const reset = response.headers.get("x-ratelimit-reset");
    const rateLimited = response.status === 403 &&
      (remaining === "0" || /rate limit/i.test(message));
    if (rateLimited) {
      throw new GitHubApiError(
        "GitHub’s public API limit has been reached. Please wait a little before searching again.",
        "RATE_LIMIT",
        { status: response.status, retryAt: reset ? Number(reset) * 1000 : null },
      );
    }
    if (response.status === 404) {
      throw new GitHubApiError("No GitHub account matched that exact profile address.", "NOT_FOUND", {
        status: response.status,
      });
    }
    if (response.status === 403) {
      throw new GitHubApiError(
        "GitHub declined this request. The public API may be temporarily restricted; try again later.",
        "FORBIDDEN",
        { status: response.status },
      );
    }
    throw new GitHubApiError(
      message || "GitHub returned an unexpected response. Please try again.",
      "API_ERROR",
      { status: response.status },
    );
  }

  return response.json();
}

export async function searchGitHubProfiles(input, signal) {
  const query = normalizeSearchQuery(input);
  if (!query) {
    throw new GitHubApiError("Enter a GitHub username or a person’s name to search.", "INVALID_INPUT");
  }
  if (query.length > 100) {
    throw new GitHubApiError("Keep your search under 100 characters.", "INVALID_INPUT");
  }

  if (isHandle(query)) {
    try {
      const profile = await requestJson(`/users/${encodeURIComponent(query)}`, signal);
      return { mode: "profile", profile };
    } catch (error) {
      if (error?.code !== "NOT_FOUND") throw error;
    }
  }

  const search = await requestJson(
    `/search/users?q=${encodeURIComponent(query)}&per_page=8`,
    signal,
  );
  return {
    mode: "results",
    items: Array.isArray(search.items) ? search.items : [],
    totalCount: Number(search.total_count) || 0,
    query,
  };
}

export async function fetchProfileWithRepos(username, signal) {
  const safeUsername = encodeURIComponent(username);
  const [profileResult, reposResult] = await Promise.allSettled([
    requestJson(`/users/${safeUsername}`, signal),
    requestJson(`/users/${safeUsername}/repos?sort=updated&per_page=6&type=owner`, signal),
  ]);

  if (profileResult.status === "rejected") throw profileResult.reason;
  if (reposResult.status === "rejected" && reposResult.reason?.name === "AbortError") {
    throw reposResult.reason;
  }
  return {
    profile: profileResult.value,
    repositories: reposResult.status === "fulfilled" ? reposResult.value : [],
    repositoriesError: reposResult.status === "rejected" ? reposResult.reason : null,
  };
}
