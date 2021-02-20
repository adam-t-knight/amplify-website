import '../assets/css/LeftSidebar.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar,Nav,Form} from 'react-bootstrap';
import Login from './LoginForm';

const LeftSidebar = () => {

    return (
        <div className="wrapper" >
            <Navbar id="LeftSidebar" bg="dark" variant="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Form>
                            <Login />
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default LeftSidebar;