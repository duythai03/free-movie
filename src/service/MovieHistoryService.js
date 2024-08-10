import axios from "axios";
export const axiosJWT = axios.create();

export const getAllMovies = async (access_token, currentPage) => {
  console.log("service access_token", access_token);
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/movie-history/get-all-movies?page=${currentPage}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const addMovie = async (access_token, data) => {
  console.log("service access_token", access_token);
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/movie-history/add`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const removeAllMovies = async (access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/movie-history/delete-history`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
