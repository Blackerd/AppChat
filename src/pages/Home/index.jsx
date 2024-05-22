import Styles from "./styles.module.css";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

const cx = classNames.bind(Styles);
function Home() {
  // const query = useQuery();
  // const searchQuery = query.get("a");
  // console.log(typeof searchQuery);
  const navi = useNavigate();
  return (
    <>
      <h1>HOME PAFE</h1>
      <button
        onClick={() => {
          navi(-1);
        }}
      >
        Return{" "}
      </button>
    </>
  );
}

export default Home;
