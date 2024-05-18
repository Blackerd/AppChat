import Styles from "./styles.module.css";
import classNames from "classnames/bind";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

const cx = classNames.bind(Styles);
function Home() {
  // const query = useQuery();
  // const searchQuery = query.get("a");
  // console.log(typeof searchQuery);
  return (
    <>
      <h1>HOME PAFE</h1>
    </>
  );
}

export default Home;
