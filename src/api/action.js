const REGISTER = (user, pass) => {
  return {
    action: "onchat",
    data: {
      event: "REGISTER",
      data: {
        user,
        pass,
      },
    },
  };
};
// lúa này respone gửi về có 2 dạng
// 1 nếu thành công
// {event: 'REGISTER', status: 'success', data: 'Creating a successful account'}
// 2 nếu trùng email user
// {event: 'REGISTER', status: 'error', mes: 'Creating account error, Duplicate Username'}
const Login = (user, pass) => {
  return {
    action: "onchat",
    data: {
      event: "LOGIN",
      data: {
        user,
        pass,
      },
    },
  };
};
// lúa này respone gửi về có 3 dạng
// 1 nếu thành công
// {event: 'LOGIN', status: 'success', data: {RE_LOGIN_CODE: 'nlu_1796764489'}}
// 2 nếu trùng email user
// {event: 'LOGIN', status: 'error', mes: 'Login error, Wrong Username or Password'}
// 3 nếu nhấn quá nhiều
// {event: 'LOGIN', status: 'error', mes: 'You are already logged in'}
const RE_LOGIN = (user) => {
  return {
    action: "onchat",
    data: {
      event: "RE_LOGIN",
      data: {
        user,
        code: "nlu_2055829137",
      },
    },
  };
};
const Logout = () => {
  return {
    action: "onchat",
    data: {
      event: "LOGOUT",
    },
  };
};
const CREATE_ROOM = (nameRoom) => {
  return {
    action: "onchat",
    data: {
      event: "CREATE_ROOM",
      data: {
        name: nameRoom,
      },
    },
  };
};
const JOIN_ROOM = (nameRoom) => {
  return {
    action: "onchat",
    data: {
      event: "JOIN_ROOM",
      data: {
        name: nameRoom,
      },
    },
  };
};
const GET_ROOM_CHAT_MES = (nameRoom) => {
  return {
    action: "onchat",
    data: {
      event: "GET_ROOM_CHAT_MES",
      data: {
        name: nameRoom,
        page: 1,
      },
    },
  };
};
const GET_PEOPLE_CHAT_MES = (namePeople) => {
  return {
    action: "onchat",
    data: {
      event: "GET_PEOPLE_CHAT_MES",
      data: {
        name: namePeople,
        page: 1,
      },
    },
  };
};
// {event: 'GET_PEOPLE_CHAT_MES', status: 'error', mes: 'User not exist or page parameter error!'}
const SEND_CHAT_TO_ROOM = (nameRoom, mess) => {
  return {
    action: "onchat",
    data: {
      event: "SEND_CHAT",
      data: {
        type: "room",
        to: nameRoom,
        mes: mess,
      },
    },
  };
};
const SEND_CHAT = (people, mess) => {
  return {
    action: "onchat",
    data: {
      event: "SEND_CHAT",
      data: {
        type: "people",
        to: people,
        mes: mess,
      },
    },
  };
};
// success
// {event: 'SEND_CHAT', status: 'success', data: {id: 0, name: 'from', type: 0, to: 'to', mes: 'ddddddd'}}
// fail
// {event: 'AUTH', status: 'error', mes: 'User not Login'}
const CHECK_USER = (userName) => {
  return {
    action: "onchat",
    data: {
      event: "CHECK_USER",
      data: {
        user: userName,
      },
    },
  };
};
const GET_USER_LIST = () => {
  return {
    action: "onchat",
    data: {
      event: "GET_USER_LIST",
    },
  };
};
// {event: 'GET_USER_LIST', status: 'success', data: Array(2) [{...},{...}]}
// 0: {name: 'ak@gmail.com', type: 0, actionTime: '2024-05-26 07:38:25'}
// 1: {name: 'ka@gmail.com', type: 0, actionTime: '2024-05-26 07:38:17'}

export {
  REGISTER,
  Login,
  RE_LOGIN,
  Logout,
  CREATE_ROOM,
  JOIN_ROOM,
  GET_ROOM_CHAT_MES,
  GET_PEOPLE_CHAT_MES,
  SEND_CHAT_TO_ROOM,
  SEND_CHAT,
  CHECK_USER,
  GET_USER_LIST,
};
