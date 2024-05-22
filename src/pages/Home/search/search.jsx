import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import './search.css'
const Search = () => {
    return (
            <div className="search">
                <div className="searchForm">
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
    )
}
export default Search