import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    access_token: "",
    id: "",
  },
  reducers: {
    updateUser: (state, action) => {
      const { name, email, access_token, _id } = action.payload;
      console.log("action", action);
      state.name = name;
      state.email = email;
      state.access_token = access_token;
      state.id = _id || "";
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.access_token = "";
      state.id = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
