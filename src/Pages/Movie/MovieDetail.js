import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Movie() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://phimapi.com/phim/${slug}`)
      .then((res) => {
        if (res.data.status) {
          setMovie(res.data.movie);
        } else {
          setError("Failed to fetch movie");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data");
        setLoading(false);
      });
  }, [slug]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return <div className="">{movie.name}</div>;
}

export default Movie;
