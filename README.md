Trước khi chạy dự án install các thư việc sau đây

npm i redux redux-persist @reduxjs/toolkit react-use-websocket

<!-- cách cách dùng các action api để gửi thông tin dữ liệu lên server -->

trước khi muốn tạo 1 đối tượng để gửi thông tin đi lên socket server
import { WebsocketContext } from "../../socket/WebsocketContent" ;
import { useContext } from 'react'

trong compoent sử dụng

tạo

const [isReady, respone, sender] = useContext(WebsocketContext);

trong đó isReady là trạng thái kết nối tới socket server nếu kết nối thành công => true ngược lại false
respone là 1 đối tượng chứa các thông tin trả về từ server
sender là 1 function gửi thông tin 1 object đi lên server ==> lưu ý các object phải có dạng được sử dụng trong file api/action .

cứ sử dụng serder là sẻ luôn có respone trả về dù là success hay fail

- Nếu muốn tìm user thì sử dụng CHECK_USER trong api/action
  còn nếu muốn muốn kết bạn thì bắt buộc phải gửi ít nhất 1 tin nhắn đến user cần kết thông qua SEND_CHAT của api/action

<!-- sử dụng redux store  -->

khi đăng kí đang nhập thành công nó sẽ trong redux store sẽ chứ thông tin user name = email và danh sách các người bạn
để lấy ra các giá trị trong redux
import {useSelector} from 'react-redux'

cách dùng
trong compopnent tạo :
const infor = useSelector(state => state.reducer)
--> lúc này infor chứ thông tin và trang thái người dùng .
