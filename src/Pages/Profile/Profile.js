import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import * as UserService from "../../service/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import { updateUser } from "../../redux/slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const mutation = useMutationHook((data) => {
    const { id, ...rests } = data;
    UserService.updateUser(id, rests);
  });
  const { data, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      handleGetUserDetail(user?.id, user?.access_token);
    }
    if (isError) {
      console.log("error", isError);
    }
  }, [isSuccess, isError]);

  const handleGetUserDetail = async (id, token) => {
    const res = await UserService.getUserDetail(id, token);
    dispatch(updateUser({ ...res.data, access_token: token }));
  };

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
  }, [user]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleUpdateUser = () => {
    mutation.mutate({ id: user?.id, name });
    toast.success("Cập nhật thành công!");
    setIsOpenModal(false);
  };
  return (
    <div className="">
      <Header />
      <div className="min-h-[400px]">
        <div className="max-w-screen-xl mx-auto bg-medium-blue rounded-md text-gray-400 mt-12">
          <div className="p-8">
            <div className="flex flex-col md:justify-around md:flex-row md:my-8 mb-2">
              <h1 className="text-xl font-semibold w-full md:w-2/12 md:mt-4 my-4">
                Thông tin người dùng
              </h1>
              <div className="w-full  md:w-8/12 border rounded-xl border-gray-300 text-base md:text-lg">
                <div className="flex justify-between items-center p-4 border-b border-gray-300">
                  <label
                    htmlFor="name"
                    className="text-lg md:text-xl font-semibold"
                  >
                    Tên người dùng
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    className="w-8/12 p-2 border border-gray-300 rounded-md bg-gray-100 text-black"
                  />
                </div>
                <div className="flex justify-between items-center p-4 border-b border-gray-300">
                  <label
                    htmlFor="email"
                    className="text-lg md:text-xl font-semibold"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    disabled
                    value={email}
                    className="w-8/12 p-2 border border-gray-300 rounded-md bg-gray-100 text-black"
                  />
                </div>
                <div className="flex justify-end items-center p-4">
                  <button
                    className="bg-mainBlue text-white p-2 rounded-md w-30 md:w-40 font-medium"
                    onClick={handleOpenModal}
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
        {isOpenModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-md w-full mx-4 md:w-6/12 text-black">
              <h2 className="text-2xl font-semibold mb-4">Xác nhận thay đổi</h2>
              <div className="text-xl">
                <p>Tên người dùng: {name}</p>
                <p className="mb-4 mt-4 text-lg italic">
                  **Để cập nhập thông tin người dùng, nhấn nút đồng ý
                </p>
                <div className="flex justify-end">
                  <button
                    className="bg-gray-400 text-white p-2 rounded-md mr-4 w-36"
                    onClick={() => setIsOpenModal(false)}
                  >
                    Đóng
                  </button>
                  <button
                    className="bg-mainBlue text-white p-2 rounded-md w-36"
                    onClick={handleUpdateUser}
                  >
                    Đồng ý
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
