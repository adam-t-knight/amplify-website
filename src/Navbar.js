import './Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <div id="Navbar">
            <Link to="/">
                Home
            </Link>
            <Link to="/cat-facts">
                Cat Facts
            </Link>
            <Link to="/random-joke">
                Random Joke
            </Link>
            <Link to="/stock-ticker">
                Stock Ticker
            </Link>
            <Link to="/weather">
                Weather
            </Link>
            <Link to="/world-clock">
                World Clock
            </Link>
            <Link to="/xkcd-comic">
                XKCD Comic
            </Link>
        </div>
    );
}

export default Navbar;