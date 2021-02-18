import '../assets/css/LeftSidebar.css';
import Navbar from '../components/Navbar';
import Authbar from '../components/Authbar';

const LeftSidebar = () => {

    return (
        <div id="LeftSidebar">
            <Navbar />
            <Authbar />
        </div>
    );
}

export default LeftSidebar;