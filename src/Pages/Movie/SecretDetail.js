import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaStar,
  FaSquareFacebook,
  FaSquareXTwitter,
  FaSquareShareNodes,
  FaSquareReddit,
} from "react-icons/fa6";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import LoadingGif from "../../assets/loading.gif";

function SecretDetail() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [servers, setServers] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);

  useEffect(() => {
    axios
      .get(`https://xxvnapi.com/api/phim/${slug}`)
      .then((res) => {
        if (res.data.status) {
          const fetchedMovie = res.data.movie;
          setMovie(fetchedMovie);
          const allServers = fetchedMovie.episodes.flatMap(
            (episode) => episode.server_data
          );
          setServers(allServers);
          setSelectedServer(allServers[0]); // Sử dụng allServers thay vì servers
        } else {
          setError("Phim sẽ được cập nhật sớm nhất");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    if (selectedServer) {
      console.log(selectedServer.link);
    }
  }, [selectedServer]);

  const handleServerClick = (server) => {
    setSelectedServer(server);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
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
          <div className="w-full md:w-3/12 px-2 md:ml-6 md:px-0">
            <img src={movie.thumb_url} alt={movie.name} className="w-full" />
            <div className="mt-3 line-clamp-1 text-2xl font-semibold">
              {movie.name}
            </div>
            <div className="text-light-text mt-1">Thời lượng: {movie.time}</div>
            <div className="w-full h-[76px] my-4 bg-medium-blue flex justify-around items-center text-light-text">
              <div className="flex text-2xl">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className="text-xl">../10</div>
              <div className="text-xl">(no review)</div>
            </div>
            <div className="line-clamp-8 text-light-text text-sm">
              {movie.content}
            </div>
            <hr className="my-6 bg-gray-400 opacity-[0.2]" />
            <div className="grid grid-cols-2">
              <div className="text-light-text">Tên đầy đủ:</div>
              <div className="text-light-text">{movie.name}</div>
              <div className="text-light-text">Thể loại:</div>
              <div className="text-light-text">
                {movie.categories.map((category) => (
                  <span key={category.id}>{category.name}, </span>
                ))}
              </div>
              <div className="text-light-text">Trạng thái:</div>
              <div className="text-light-text">{movie.status}</div>
              <div className="text-light-text">Diễn viên:</div>
              <div className="text-light-text line-clamp-6">{movie.actor}</div>
            </div>
            <hr className="my-6 bg-gray-400 opacity-[0.2]" />
            <div className="mt-6 flex justify-center text-4xl">
              <i className="mr-2 text-[#4165af]">
                <FaSquareFacebook />
              </i>
              <i className="mr-2 text-white">
                <FaSquareXTwitter />
              </i>
              <i className="mr-2 text-[#ff4500]">
                <FaSquareReddit />
              </i>
              <i className="mr-2 text-[#0173f8]">
                <FaSquareShareNodes />
              </i>
            </div>
          </div>
          <div className="w-full md:w-9/12 md:ml-6 md:mr-8 md:px-0 mt-6 md:mt-0 px-2">
            {selectedServer && (
              <div className="relative w-full pb-[56.25%]">
                <iframe
                  src={selectedServer.link}
                  title={movie.name}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {servers.length > 1 && (
              <div className="mt-4">
                <div className="text-xl font-semibold mb-2">Đổi Server:</div>
                <ul className="grid grid-cols-4 gap-3 xl:grid-cols-10 lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4">
                  {servers.map((server, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer p-4 flex justify-center items-center text-center bg-medium-blue ${
                        server === selectedServer
                          ? "text-blue-500"
                          : "text-gray-700"
                      }`}
                      onClick={() => handleServerClick(server)}
                    >
                      Link {index + 1}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default SecretDetail;
