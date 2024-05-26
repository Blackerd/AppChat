import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: { infor: { name: "", friends: [] }, status: "" },
  reducers: {
    // các actions
    setName: (state, action) => {
      state.infor.name = action.payload;
      state.status = "Auth";
    },
    setFriends: (state, action) => {
      state.infor.friends = action.payload.friends;
      state.status = "Auth";
    },
    logout: (state, action) => {
      state.infor = action.payload;
      state.status = "UnAuth";
    },
  },
});
export const { setName, setFriends, logout } = userSlice.actions; // log các action từ userSlice
export default userSlice.reducer;
