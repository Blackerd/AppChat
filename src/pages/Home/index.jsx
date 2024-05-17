import { useParams, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Home() {
  const query = useQuery();
  const searchQuery = query.get("a");
  console.log(typeof searchQuery);
  return (
    <>
      <h1>HOME PAGE {searchQuery} </h1>
    </>
  );
}

export default Home;
