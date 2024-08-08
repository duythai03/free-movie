import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginImg from "../../assets/login-img.jpg";
import { validateSignUp } from "../../utils/validation";
import * as UserService from "../../service/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutationHook((data) => UserService.signUpUser(data));
  const { data, isPending } = mutation;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateSignUp(name, email, password, confirmPassword);
    if (error) {
      setError(error);
      return;
    }
    mutation.mutate({ name, email, password, confirmPassword });
    setError("");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-login-bg bg-no-repeat bg-cover relative">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="w-full md:w-6/12 mx-3 bg-cover bg-center bg-white z-10 rounded-3xl flex text-black-text">
        <div className="w-full md:w-8/12">
          <div className="p-[40px]">
            <h4 className="text-2xl font-medium mb-3">FreeMovie xin chào,</h4>
            <p className="text-lg text-gray-800 mb-5">Đăng ký để tiếp tục</p>
            <form onSubmit={handleSubmit}>
              <label className="input input-bordered flex items-center gap-2 bg-[#e8f1fe] h-[50px] mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-6 w-6 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className="grow text-xl"
                  placeholder="Nhập tên tài khoản"
                  value={name}
                  onChange={handleNameChange}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 bg-[#e8f1fe] h-[50px] mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-6 w-6 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className="grow text-xl"
                  placeholder="Nhập email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 bg-[#e8f1fe] h-[50px] mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-6 w-6 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow text-xl"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 bg-[#e8f1fe] h-[50px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-6 w-6 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow text-xl"
                  placeholder="Xác nhận mật khẩu"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </label>
              {error && <p className="text-red-500 text-md mt-4">{error}</p>}
              {isPending && (
                <div className="text-center mt-6 delay-200">
                  <span className="loading loading-spinner text-info scale-125"></span>
                </div>
              )}
              {data?.status === "ERR" && (
                <p className="text-red-500 text-md mt-4">{data?.message}</p>
              )}
              {data?.status === "OK" && (
                <p className="text-blue-600 text-md mt-4">{data?.message}</p>
              )}
              <button
                type="submit"
                className="btn btn-outline btn-primary w-full h-[50px] text-xl mt-8"
              >
                Đăng ký
              </button>
            </form>
            <div className="mt-5">
              <Link to="/" className="text-[#3180ff] text-lg cursor-pointer">
                Về trang chủ
              </Link>
            </div>
            <div className="text-lg mt-2">
              <span>Đã có tài khoản?</span>
              <Link to="/login" className=" text-[#3180ff] ml-2">
                Tới trang đăng nhập
              </Link>
            </div>
          </div>
        </div>
        <div className="w-4/12 hidden md:flex bg-[#ecf6ff] rounded-3xl justify-center items-center">
          <div className="p-8">
            <img src={loginImg} alt="sign in img" className="mb-4 rounded-md" />
            <div className="text-sm flex flex-col justify-center items-center text-mainBlue">
              <p className="font-medium">Xem phim tại FreeMovie</p>
              <p>Cập nhập phim mới mỗi ngày</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
