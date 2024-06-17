
import { useParams, useLocation } from "react-router-dom";
import Menu from "./menu/menu";
import List from "./list/list";
import './home.css';
import Chat from "./chat/chat";
function Home() {
  // const query = useQuery();
  // const searchQuery = query.get("a");
  // console.log(typeof searchQuery);
  return (

      <div className="container">
          <Menu></Menu>
         <List></List>
          <Chat></Chat>
        </div>

  );
}

export default Home;
