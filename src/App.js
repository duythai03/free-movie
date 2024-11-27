import React, { useContext, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeContext } from "./Context/ThemeContext";
import { routes } from "./routes/index.js";
import DefaultLayout from "./Components/DefaultLayout.js";
// import { isJsonString } from "./utils/isJsonString";
// import { jwtDecode } from "jwt-decode";
// import * as UserService from "./service/UserService";
// import { updateUser } from "./redux/slices/userSlice";
// import { useDispatch } from "react-redux";

function App() {
  // const dispatch = useDispatch();

  // const handleDecoded = () => {
  //   let storageData = localStorage.getItem("access_token");
  //   let user = {};
  //   if (storageData && isJsonString(storageData)) {
  //     storageData = JSON.parse(storageData);
  //     user = jwtDecode(storageData);
  //   }
  //   return { user, storageData };
  // };

  // const handleGetUserDetail = useCallback(
  //   async (id, token) => {
  //     try {
  //       const res = await UserService.getUserDetail(id, token);
  //       console.log("res", res);
  //       dispatch(updateUser({ ...res.data, access_token: token }));
  //     } catch (error) {
  //       console.log("Failed to fetch user details:", error);
  //     }
  //   },
  //   [dispatch]
  // );

  // useEffect(() => {
  //   let { user, storageData } = handleDecoded();
  //   if (user?.id) {
  //     handleGetUserDetail(user?.id, storageData);
  //   }
  // }, [handleGetUserDetail]);

  // UserService.axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     const currentTime = new Date();
  //     let { user } = handleDecoded();
  //     if (user?.exp < currentTime.getTime() / 1000) {
  //       const data = await UserService.refreshToken();
  //       config.headers["token"] = `Bearer ${data.access_token}`;
  //     }
  //     return config;
  //   },
  //   function (error) {
  //     return Promise.reject(error);
  //   }
  // );
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${
        theme === "tolight" ? "" : "bg-light-bg text-light-text-light"
      }`}
    >
      <Routes>
        {routes.map((route) => {
          const Page = route.page;
          const Layout = route.showLayout ? DefaultLayout : React.Fragment;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
