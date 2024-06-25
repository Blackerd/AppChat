import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    infor: { name: "", email: "", friends: [], groups: [] },
    status: "",
  },
  reducers: {
    // các actions
    setName: (state, action) => {
      state.infor.name = action.payload;
      state.status = "Auth";
    },
    setEmail: (state, action) => {
      state.infor.email = action.payload;
      state.status = "Auth";
    },
    setFriends: (state, action) => {
      const friend = {
        name: action.payload.item.name,
        listmessage: [],
        type: action.payload.item.type,
        actionTime: action.payload.item.actionTime,
      };
      state.infor.friends = [...state.infor.friends, friend];

      state.status = "Auth";
    },
    saveMessage: (state, action) => {
      const { name, mess } = action.payload;
      const friendIndex = state.infor.friends.findIndex((f) => f.name === name);
      if (friendIndex !== -1) {
        const friend = state.infor.friends[friendIndex];
        friend.messages = friend.messages ? [...friend.messages, mess] : [mess];
        state.infor.friends[friendIndex] = { ...friend };
      }
    },

    clearMessage: (state, action) => {
      state.infor = {
        ...state.infor,
        friends: state.infor.friends.map((f) => {
          if (f.name === action.payload.name) {
            return {
              ...f,
              listmessage: [],
            };
          }
          return f;
        }),
      };
    },
    setGroups: (state, action) => {
      const group = {
        nameGroup: action.payload.item.name,
        listmessage: [],
        type: action.payload.item.type || 1,
        actionTime: action.payload.item.actionTime || "",
      };
      state.infor.groups = [...state.infor.groups, group];
      state.status = "Auth";
    },
    saveGroupMess: (state, action) => {
      const { nameGroup, messGroup } = action.payload;
      const groupIndex = state.infor.groups.findIndex(
        (g) => g.nameGroup === nameGroup
      );
      if (groupIndex !== -1) {
        const group = state.infor.groups[groupIndex];
        group.messages = group.messages
          ? [...group.messages, messGroup]
          : [messGroup];
        state.infor.groups[groupIndex] = { ...group };
      }
    },
    clearGroupMess: (state, action) => {
      state.infor = {
        ...state.infor,
        groups: state.infor.groups.map((item) => {
          if (item.nameGroup === action.payload.nameGroup) {
            return { ...item, listmessage: [] };
          }
          return item;
        }),
      };
    },
    logout: (state, action) => {
      state.infor = { name: "", email: "", friends: [], groups: [] };
      state.status = "UnAuth";
    },
  },
});
export const {
  setName,
  setEmail,
  setFriends,
  setGroups,
  saveMessage,
  clearMessage,
  saveGroupMess,
  clearGroupMess,
  logout,
} = userSlice.actions; // log các action từ userSlice
export default userSlice.reducer;
