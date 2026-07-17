import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HoverCard({ movie, theme }) {
  const [visible, setVisible] = useState(false);
  const imdb = movie.imdb || null;
  const tmdb = movie.tmdb || null;
  const useImdb = imdb && imdb.id != null && Number(imdb.vote_average || 0) !== 0 && Number(imdb.vote_count || 0) !== 0;
  const voteAverage = useImdb
    ? (imdb.vote_average ?? null)
    : (tmdb && tmdb.vote_average !== undefined ? tmdb.vote_average : null);
  const voteCount = useImdb
    ? (imdb.vote_count ?? null)
    : (tmdb && tmdb.vote_count !== undefined ? tmdb.vote_count : null);

  useEffect(() => {
    // trigger mount animation
    const id = requestAnimationFrame(() => setVisible(true));
    return () => {
      cancelAnimationFrame(id);
      setVisible(false);
    };
  }, []);
  const normalizeImage = (url) => {
    if (!url) return "";
    // if already contains phimimg.com, keep as-is
    if (url.includes("phimimg.com")) return url;
    // if absolute URL (other domain), keep as-is
    if (/^https?:\/\//i.test(url)) return url;
    // otherwise prefix with phimimg domain
    return `https://phimimg.com/${String(url).replace(/^\/+/, "")}`;
  };

  const posterSrc = normalizeImage(movie.poster_url) || normalizeImage(movie.thumb_url) || "";

  return (
    <div
      className={`hidden md:block z-[9999] w-80 rounded-lg shadow-xl p-3 text-sm transform transition-opacity transition-transform duration-150 ease-out ${
        theme === "tolight" ? "bg-slate-800/95 text-white" : "bg-white/95 text-slate-800"
      }`}
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(6px)' }}
    >
      <div className="flex gap-3">
        <img
          src={posterSrc}
          alt={movie.name}
          className="w-24 h-32 object-cover rounded-md flex-shrink-0"
        />
        <div className="flex-1">
          <div className="font-semibold text-base leading-tight">{movie.name}</div>
          {movie.origin_name && (
            <div className="text-xs text-gray-400 mt-1">{movie.origin_name}</div>
          )}
          <div className="mt-2 text-xs">
            <div>Year: {movie.year || "--"}</div>
            {movie.time && <div>Duration: {movie.time}</div>}
            {movie.episode_current && <div>Episode: {movie.episode_current}</div>}
            {movie.quality && <div>Quality: {movie.quality}</div>}
            {movie.lang && <div>Lang: {movie.lang}</div>}
            {tmdb && tmdb.type && <div>Type: {tmdb.type}</div>}
            {tmdb && tmdb.season && <div>Season: {tmdb.season}</div>}
            {voteAverage !== null && (
              <div>Rating: ★ {voteAverage}{voteCount != null ? ` (${voteCount})` : ""}</div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <Link
          to={`/movie/${movie.slug}`}
          className={`px-3 py-1 rounded-md font-semibold ${
            theme === "tolight" ? "bg-cyan-500 text-slate-900" : "bg-medium-blue text-white"
          }`}
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}
