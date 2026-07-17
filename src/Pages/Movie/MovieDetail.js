import React, { useEffect, useState, useContext, useRef, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../../Context/ThemeContext";
import {
  FaSquareFacebook,
  FaSquareShareNodes,
  FaSquareReddit,
} from "react-icons/fa6";
import LoadingGif from "../../assets/loading.gif";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";
import { useSelector, useDispatch } from "react-redux";
import * as FavMovieService from "../../service/FavMovieService";
import * as MovieHistoryService from "../../service/MovieHistoryService";
import { addMovie } from "../../redux/slices/movieHistorySlice";
import { addFavMovie } from "../../redux/slices/favMovieSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Comments({ movieSlug, theme }) {
  const storageKey = `comments:${movieSlug}`;
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setComments(JSON.parse(saved));
    } catch (e) {
      // ignore
    }
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(comments));
    } catch (e) {
      // ignore
    }
  }, [comments, storageKey]);

  const addComment = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const c = {
      id: Date.now(),
      name: name.trim() || "Khách",
      text: text.trim(),
      time: new Date().toISOString(),
    };
    setComments((prev) => [c, ...prev]);
    setName("");
    setText("");
  };

  const formatTime = (iso) => {
    try {
      return new Date(iso).toLocaleString();
    } catch (e) {
      return iso;
    }
  };

  return (
    <div className={`mt-6 ${theme === "tolight" ? "" : "p-4"}`}>
      <div
        className={`w-full rounded-lg ${
          theme === "tolight"
            ? "bg-slate-800/90 text-white"
            : "bg-white/95 text-slate-800"
        } p-4 shadow-sm`}
      >
        <h4 className="text-lg font-semibold mb-3">Bình luận phim</h4>
        <form onSubmit={addComment} className="space-y-3">
          <div>
            <input
              className="w-full px-3 py-2 rounded-md border border-gray-300 bg-transparent"
              placeholder="Tên (không bắt buộc)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <textarea
              className="w-full px-3 py-2 rounded-md border border-gray-300 resize-none h-24 bg-transparent"
              placeholder="Viết bình luận..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-4 py-2 rounded-md font-semibold ${
                theme === "tolight" ? "bg-cyan-500 text-slate-900" : "bg-medium-blue text-white"
              }`}
            >
              Gửi
            </button>
          </div>
        </form>

        <div className="mt-4 space-y-4 max-h-96 overflow-y-auto">
          {comments.length === 0 && (
            <div className="text-sm text-gray-500">Chưa có bình luận nào.</div>
          )}
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-sm">
                {c.name ? c.name.charAt(0).toUpperCase() : "K"}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-gray-500 ml-2">{formatTime(c.time)}</div>
                </div>
                <div className="mt-1 text-sm leading-relaxed">{c.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Movie() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [movieLoaded, setMovieLoaded] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [servers, setServers] = useState([]);

  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [resumeTime, setResumeTime] = useState(0);
  const [pendingSeekTime, setPendingSeekTime] = useState(0);
  const [shouldLoadPlayer, setShouldLoadPlayer] = useState(false);
  const playerRef = useRef(null);

  const progressStorageKey = useMemo(() => {
    if (!slug || !selectedEpisode) return "";
    const episodeIdentity =
      selectedEpisode.slug || selectedEpisode.name || selectedEpisode.link_m3u8;

    return `movie_progress:${slug}:${episodeIdentity}`;
  }, [slug, selectedEpisode]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const res = await axios.get(`https://phimapi.com/phim/${slug}`);
        if (res.data.status) {
          const fetchedMovie = res.data.movie;
          setMovie(fetchedMovie);
          setServers(res.data.episodes);
          setSelectedEpisode(res.data.episodes[0]?.server_data[0] || null);
          setMovieLoaded(true);

          // Thêm phim vào lịch sử ngay khi dữ liệu được tải
          if (user?.id) {
            const historyData = {
              name: fetchedMovie.name,
              slug: fetchedMovie.slug,
              poster_url: fetchedMovie.poster_url,
              thumb_url: fetchedMovie.thumb_url,
              user_id: user.id,
            };
            await MovieHistoryService.addMovie(user.access_token, historyData);
            dispatch(addMovie(fetchedMovie));
          }
        } else {
          setError("Phim sẽ được cập nhập sớm nhất");
        }
      } catch (error) {
        setError("Phim sẽ được cập nhập sớm nhất");
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [slug, user.id, user.access_token, dispatch]);

  const handleAddFavMovie = async () => {
    if (user?.id) {
      try {
        const movieData = {
          name: movie.name,
          slug: movie.slug,
          poster_url: movie.poster_url,
          thumb_url: movie.thumb_url,
          user_id: user.id,
        };
        const res = await FavMovieService.addMovie(
          user.access_token,
          movieData,
        );
        dispatch(addFavMovie(res));
        toast.success("Đã thêm vào danh sách yêu thích!");
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi thêm phim vào danh sách yêu thích!");
      }
    } else {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    if (movieLoaded) {
      let type = "phim-moi-cap-nhat";
      if (movie && movie.type === "hoathinh") {
        type = "hoat-hinh";
      } else if (movie && movie.type === "single") {
        type = "phim-le";
      } else if (movie && movie.type === "series") {
        type = "phim-bo";
      } else if (movie && movie.type === "tvshows") {
        type = "tv-shows";
      } else {
        type = "phim-moi-cap-nhat";
      }
      axios
        .get(`https://phimapi.com/v1/api/danh-sach/${type}`)
        .then((res) => {
          if (res.data.status) {
            const limitedMovies = res.data.data.items.slice(0, 6);
            setMovies(limitedMovies);
          } else {
            setError("Failed to fetch movies");
          }
          setLoading(false);
        })
        .catch((error) => {
          setError("Error fetching data");
          setLoading(false);
        });
    }
  }, [movieLoaded, movie]);

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
  };

  const formatSeconds = (seconds) => {
    const safeSeconds = Math.max(Math.floor(seconds), 0);
    const hour = Math.floor(safeSeconds / 3600);
    const minute = Math.floor((safeSeconds % 3600) / 60);
    const second = safeSeconds % 60;

    if (hour > 0) {
      return `${hour}:${String(minute).padStart(2, "0")}:${String(
        second,
      ).padStart(2, "0")}`;
    }

    return `${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
  };

  useEffect(() => {
    setResumeModalOpen(false);
    setResumeTime(0);
    setPendingSeekTime(0);

    if (!progressStorageKey) {
      setShouldLoadPlayer(false);
      return;
    }

    const savedTime = Number(localStorage.getItem(progressStorageKey));
    if (!Number.isNaN(savedTime) && savedTime > 15) {
      setResumeTime(savedTime);
      setResumeModalOpen(true);
      setShouldLoadPlayer(false);
      return;
    }

    setShouldLoadPlayer(true);
  }, [progressStorageKey]);

  const saveProgress = () => {
    if (!progressStorageKey || !playerRef.current) return;

    const currentTime = playerRef.current.currentTime;
    const duration = playerRef.current.duration;

    if (!currentTime || Number.isNaN(currentTime) || currentTime < 2) return;

    if (duration && duration - currentTime < 10) {
      localStorage.removeItem(progressStorageKey);
      return;
    }

    localStorage.setItem(progressStorageKey, String(Math.floor(currentTime)));
  };

  const handleResumeConfirm = () => {
    setPendingSeekTime(resumeTime);
    setResumeModalOpen(false);
    setShouldLoadPlayer(true);
  };

  const handleResumeCancel = () => {
    if (progressStorageKey) {
      localStorage.removeItem(progressStorageKey);
    }
    setResumeModalOpen(false);
    setResumeTime(0);
    setShouldLoadPlayer(true);
  };

  const handleMediaCanPlay = () => {
    if (!pendingSeekTime || !playerRef.current) return;

    const safeSeekTime = Math.min(
      pendingSeekTime,
      playerRef.current.duration || pendingSeekTime,
    );
    playerRef.current.currentTime = safeSeekTime;
    setPendingSeekTime(0);
  };

  

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      {loading && (
        <div className="flex-grow flex justify-center items-center">
          <img
            src={LoadingGif}
            alt="Loading..."
            className="w-[100px] h-[100px]"
          />
        </div>
      )}
      {error && <div className="flex-grow">{error}</div>}
      {!loading && !error && movie && (
        <div className="my-3 md:mt-6 flex flex-col md:flex-row">
          <div
            className={`w-full md:w-3/12 px-2 md:ml-6 md:px-0 ${
              theme === "tolight"
                ? "text-light-text"
                : "bg-white shadow-bigFull text-gray-900"
            }`}
          >
            <img src={movie.poster_url} alt={movie.name} className="w-full" />
            <div className={`${theme === "tolight" ? "" : "p-2"}`}>
              <div
                className={`mt-3 line-clamp-1 text-2xl font-semibold
              ${theme === "tolight" ? "text-white" : ""}
              `}
              >
                {movie.name}
              </div>
              <div className="">
                <div className=" mt-1">
                  Cập nhập: {movie.modified.time.slice(0, 10)}
                </div>
                <div className=" mt-1">Thời lượng: {movie.time}</div>
                <div
                  className={`w-full h-[76px] my-4 bg-medium-blue flex justify-around items-center 
                ${theme === "tolight" ? "" : "bg-custom-gray"}
                `}
                >
                  <button
                    className="text-xl font-semibold"
                    onClick={handleAddFavMovie}
                  >
                    Thêm vào yêu thích
                  </button>
                </div>
                <div className="line-clamp-12  text-sm text-justify">
                  {movie.content}
                </div>
                <hr
                  className={`my-6 border-0 h-[1px] bg-gray-400 opacity-[0.2] ${
                    theme === "tolight" ? "" : "opacity-80"
                  }`}
                />
                <div className="grid grid-cols-2">
                  <div className="">Tên đầy đủ:</div>
                  <div className="">{movie.name}</div>
                  <div className="">Thể loại:</div>
                  <div className="">
                    {movie.category.map((category) => (
                      <span key={category.id}>{category.name}, </span>
                    ))}
                  </div>
                  <div className="">Trạng thái:</div>
                  <div className="">{movie.status}</div>
                  <div className="">Năm:</div>
                  <div className="">{movie.year}</div>
                  <div className="">Đạo diễn:</div>
                  <div className="">{movie.director}</div>
                  <div className=" ">Diễn viên:</div>
                  <div className=" line-clamp-6">{movie.actor}</div>
                </div>
                <hr
                  className={`my-6 border-0 h-[1px] bg-gray-400 opacity-[0.2] ${
                    theme === "tolight" ? "" : "opacity-80"
                  }`}
                />
                <div className="mt-6 flex justify-center text-4xl">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://duythai03.github.io/free-movie/#/movie/${movie.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-2 text-[#4165af] flex items-center"
                  >
                    <FaSquareFacebook />
                  </a>
                  <i className="mr-2 text-[#ff4500]">
                    <FaSquareReddit />
                  </i>
                  <i className="mr-2 text-[#0173f8]">
                    <FaSquareShareNodes />
                  </i>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`w-full md:w-9/12 md:ml-6 md:mr-8 md:px-0 mt-6 md:mt-0 px-2 
            ${
              theme === "tolight" ? "" : "bg-white shadow-bigFull text-gray-900"
            }
          `}
          >
            {shouldLoadPlayer && selectedEpisode ? (
              <MediaPlayer
                ref={playerRef}
                src={selectedEpisode.link_m3u8}
                viewType="video"
                streamType="on-demand"
                logLevel="warn"
                crossOrigin
                playsInline
                title={movie.name}
                poster={movie.poster_url}
                className="mt-2 sm:mt-0"
                onTimeUpdate={saveProgress}
                onPause={saveProgress}
                onEnded={handleResumeCancel}
                onCanPlay={handleMediaCanPlay}
              >
                <MediaProvider>
                  <Poster className="vds-poster" />
                </MediaProvider>
                <DefaultVideoLayout
                  thumbnails={movie.thumb_url}
                  icons={defaultLayoutIcons}
                />
              </MediaPlayer>
            ) : (
              <div
                className={`mt-2 sm:mt-0 min-h-[220px] md:min-h-[400px] rounded-lg border flex items-center justify-center ${
                  theme === "tolight"
                    ? "bg-slate-900/70 border-slate-700 text-slate-200"
                    : "bg-slate-100 border-slate-200 text-slate-600"
                }`}
              >
                Đang chuẩn bị phát phim...
              </div>
            )}

            <div className={`${theme === "tolight" ? "" : "p-4"}`}>
              {servers.length >= 1 && (
                <div className="mt-4">
                  <div className="space-y-6">
                    {servers.map((server, serverIndex) => (
                      <div
                        key={serverIndex}
                        className="border-b border-gray-700 pb-4"
                      >
                        <div
                          className={`text-lg font-medium mb-3 ${
                            theme === "todark" ? "text-black" : "text-white"
                          }`}
                        >
                          {server.server_name}
                        </div>
                        <ul
                          className={`${
                            server.server_data.length > 30
                              ? "h-96 overflow-y-scroll scrollbar-hide"
                              : ""
                          } grid grid-cols-4 gap-3 xl:grid-cols-10 lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4`}
                        >
                          {server.server_data.map((episode, episodeIndex) => (
                            <li
                              key={episodeIndex}
                              className={`cursor-pointer p-4 flex justify-center items-center text-center bg-medium-blue ${
                                episode === selectedEpisode
                                  ? "text-blue-500 border-2 border-blue-500"
                                  : "text-[#d3d3d3]"
                              }`}
                              onClick={() => handleEpisodeClick(episode)}
                            >
                              {episode.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12">
                <div className="text-xl font-semibold">Có thể bạn sẽ thích</div>
                <ul className="grid grid-cols-2 gap-y-9 justify-items-center xl:flex xl:justify-around mt-8 xl:ml-0 sm:grid-cols-3">
                  {movies.map((movie) => (
                    <li
                      className={`w-[150px] xl:h-[210px] relative transition-transform duration-300 ease-in-out hover:scale-110 
                        ${theme === "tolight" ? "" : "shadow-bigFull"}
                      `}
                      key={movie._id}
                    >
                      <Link to={`/movie/${movie.slug}`}>
                        <img
                          src={`https://img.phimapi.com/${movie.poster_url}`}
                          alt={movie.name}
                          className="w-[150px] h-[210px] object-cover"
                        />
                        <p
                          className={`absolute bottom-0 leading-[42px]  w-full h-[42px] bg-black bg-opacity-70 text-sm font-semibold mt-2 text-center line-clamp-1 xl:mb-0
                        ${theme === "tolight" ? "" : "text-white"}
                        `}
                        >
                          {movie.name}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <Comments movieSlug={movie.slug} theme={theme} />
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white p-4 rounded-lg text-gray-700">
            <p className="text-xl font-semibold">
              Bạn chưa đăng nhập, vui lòng đăng nhập để thêm phim yêu thích
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="text-base rounded-lg border border-gray-500 p-2 font-semibold"
                onClick={handleModal}
              >
                Hủy
              </button>
              <Link
                to="/login"
                className="text-base rounded-lg bg-blue-500 text-white p-2 font-semibold ml-4"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      )}
      {resumeModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-40 px-4">
          <div
            className={`w-full max-w-md rounded-2xl shadow-2xl p-6 border backdrop-blur-sm ${
              theme === "tolight"
                ? "bg-slate-800/95 text-white border-slate-600"
                : "bg-white/95 text-slate-800 border-slate-200"
            }`}
          >
            <h3 className="text-xl font-bold">Tiếp tục xem phim?</h3>
            <p
              className={`mt-3 leading-6 ${
                theme === "tolight" ? "text-slate-200" : "text-slate-600"
              }`}
            >
              Bạn đã xem đến mốc{" "}
              <span className="font-semibold">{formatSeconds(resumeTime)}</span>
              . Bạn có muốn tua đến đoạn đang xem dở không?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  theme === "tolight"
                    ? "bg-slate-700 text-white hover:bg-slate-600"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
                onClick={handleResumeCancel}
              >
                Xem từ đầu
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  theme === "tolight"
                    ? "bg-cyan-500 text-slate-900 hover:bg-cyan-400"
                    : "bg-medium-blue text-white hover:opacity-90"
                }`}
                onClick={handleResumeConfirm}
              >
                Tiếp tục xem
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Movie;
