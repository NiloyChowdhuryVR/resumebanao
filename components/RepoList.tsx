"use client";   // ✅ Client component

import { useEffect, useState } from "react";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
}

const RepoList = ({ username }: { username: string }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) throw new Error("Failed to fetch repos");

        const data = await response.json();
        setRepos(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{username}'s Repositories</h2>
      <ul className="space-y-4">
        {repos.map((repo) => (
          <li key={repo.id} className="border p-4 rounded-lg shadow-md">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xl font-semibold">
              {repo.name}
            </a>
            <p className="text-gray-600">{repo.description || "No description available"}</p>
            <p>⭐ {repo.stargazers_count} | 🛠️ {repo.language || "Unknown"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
