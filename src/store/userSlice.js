import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    infor: { name: "", email: "", friends: [], groups: [] },
    status: "",
  },
  reducers: {
    setName: (state, action) => {
      state.infor.name = action.payload;
      state.status = "Auth";
    },
    setEmail: (state, action) => {
      state.infor.email = action.payload;
      state.status = "Auth";
    },
    setFriends: (state, action) => {
      const { name, type, actionTime } = action.payload.item;
      const newFriend = {
        name,
        listmessage: [], // Initialize with an empty array for messages
        type,
        actionTime,
      };
      state.infor.friends.push(newFriend);
      state.status = "Auth";
    },
    saveMessage: (state, action) => {
      const { name, mess } = action.payload;
      const friendIndex = state.infor.friends.findIndex((f) => f.name === name);
      if (friendIndex !== -1) {
        const friend = state.infor.friends[friendIndex];
        if (Array.isArray(mess)) {
          mess.forEach(message => {
            if (message && message.text && message.sender) { // Kiểm tra message tồn tại và có đủ thuộc tính
              friend.listmessage.push({
                text: message.text,
                sender: message.sender,
              });
            }
          });
        } else {
          if (mess && mess.text && mess.sender) { // Kiểm tra mess tồn tại và có đủ thuộc tính
            friend.listmessage.push({
              text: mess.text,
              sender: mess.sender,
            });
          }
        }
        state.infor.friends[friendIndex] = { ...friend };
      }
    },




    clearMessage: (state, action) => {
      const { name } = action.payload;
      const friend = state.infor.friends.find((f) => f.name === name);
      if (friend) {
        friend.listmessage = []; // Clear messages for a specific friend
      }
    },
    setGroups: (state, action) => {
      const { name, type, actionTime } = action.payload.item;
      const newGroup = {
        nameGroup: name,
        listmessage: [], // Initialize with an empty array for group messages
        type: type || 1,
        actionTime: actionTime || "",
      };
      state.infor.groups.push(newGroup);
      state.status = "Auth";
    },
    saveGroupMess: (state, action) => {
      const { nameGroup, messGroup } = action.payload;
      const group = state.infor.groups.find((g) => g.nameGroup === nameGroup);
      if (group) {
        group.listmessage.push(...messGroup); // Append new messages to group's message list
      }
    },
    clearGroupMess: (state, action) => {
      const { nameGroup } = action.payload;
      const group = state.infor.groups.find((g) => g.nameGroup === nameGroup);
      if (group) {
        group.listmessage = []; // Clear messages for a specific group
      }
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
} = userSlice.actions;

export default userSlice.reducer;
