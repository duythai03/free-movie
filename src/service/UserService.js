import axios from "axios";

export const axiosJWT = axios.create({
  withCredentials: true, // Đảm bảo cookie được gửi cùng với yêu cầu
});

export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/login`,
    data,
    { withCredentials: true } // Đảm bảo gửi cookie
  );
  return res.data;
};

export const signUpUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-up`,
    data
  );
  return res.data;
};

export const getUserDetail = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/user/get-details-user/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/log-out`,
    {},
    {
      withCredentials: true, // Đảm bảo gửi cookie
    }
  );
  return res.data;
};

export const refreshToken = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/refresh-token`,
    {},
    {
      withCredentials: true, // Đảm bảo gửi cookie
    }
  );
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/user/update-user/${id}`,
    data
  );
  return res.data;
};
