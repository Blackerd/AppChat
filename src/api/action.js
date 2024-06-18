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
// type = 1 la group
// => When CREATE_ROOM is success
// =>{event: 'CREATE_ROOM', status: 'success', data: {…}}
// data: {id: 1483, name: 'HauVaNhungNguoiBan', own: 'doxuanhau@gmail.com', userList: Array(0), chatData: Array(0)}
// event: "CREATE_ROOM"
// status: "success"
// => when CREATE_ROOM is fail
// {event: 'CREATE_ROOM', status: 'error', mes: 'Room Exist'}
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
// data:
// chatData: []
// id: 1496
// name: "thehostspot"
// own: "doxuanhau@gmail.com"
// userList: Array(1)
// 0: {id: 2757, name: 'jack@gmail.com'}
// length: 1
// [[Prototype]]: Array(0)
// [[Prototype]]: Object
// event: "JOIN_ROOM"
// status: "success"
// == > error
// event: "JOIN_ROOM";
// mes: "Room not found";
// status: "error";
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
// sucucess
// data:
// chatData: Array(5)
// 0:{id: 31810, name: 'doxuanhau@gmail.com', type: 1, to: 'hauvanhungnguoiban@gmail.com', mes: 'asdasdasdasd', yype:1}
// 1:{id: 31809, name: 'doxuanhau@gmail.com', type: 1, to: 'hauvanhungnguoiban@gmail.com', mes: 'asdasdasdasdasdasdasd', …}
// 2:{id: 31807, name: 'doxuanhau@gmail.com', type: 1, to: 'hauvanhungnguoiban@gmail.com', mes: 'asdasdasd', …}
// 3:{id: 31806, name: 'doxuanhau@gmail.com', type: 1, to: 'hauvanhungnguoiban@gmail.com', mes: '123123123123123123123123123', …}
// 4:{id: 31805, name: 'doxuanhau@gmail.com', type: 1, to: 'hauvanhungnguoiban@gmail.com', mes: '12312312312312312323', …}
// length:5
// [[Prototype]]
// :Array(0)
// id:1481
// name:"hauvanhungnguoiban@gmail.com"
// own:"doxuanhau@gmail.com"
// userList:[]

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
//{event: 'GET_PEOPLE_CHAT_MES', status: 'success', data: Array(50)}
// 0:createAt:"2024-06-15 14:51:56"
// id:31735
// mes:"asdasdasdasdasdasdasdas"
// name:"doxuanhau@gmail.com"
// to"jack@gmail.com"
// type:0

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
// type = 0 la user
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
//== > is online or not
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
