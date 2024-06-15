import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        infor: {name: "", email: "", friends: [], groups: []},
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
            state.infor = {
                ...state.infor,
                friends: state.infor.friends.map((f) => {
                    if (f.name === action.payload.name) {
                        return {
                            ...f,
                            listmessage: [...f.listmessage, action.payload.mess],
                        };
                    }
                    return f;
                }),
            };
        },
        clearMessage:(state ,action) =>{
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
                type: action.payload.item.type,
                actionTime: action.payload.item.actionTime,
            };
            state.infor.groups = [...state.infor.groups, group];
            state.status = "Auth";
        },
        logout: (state, action) => {
            state.infor = action.payload;
            state.status = "UnAuth";
        },
    },
});
export const {setName, setEmail, setFriends, setGroups, saveMessage,clearMessage, logout} =
    userSlice.actions; // log các action từ userSlice
export default userSlice.reducer;
