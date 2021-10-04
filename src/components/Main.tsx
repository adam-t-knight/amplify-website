import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/Main.css';
import { Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoginToggle from './LoginToggle';
import Home from '../pages/Home';
import FitnessTracker from '../pages/FitnessTracker';
import CreateTrainingMaxExercise from '../pages/CreateTrainingMaxExercise';
import DeleteTrainingMaxExercise from '../pages/DeleteTrainingMaxExercise';
import UpdateTrainingMaxExercise from '../pages/UpdateTrainingMaxExercise';
import ViewTrainingMaxHistory from '../pages/ViewTrainingMaxHistory';
import CreateWeeklyExercise from '../pages/CreateWeeklyExercise';
import DeleteWeeklyExercise from '../pages/DeleteWeeklyExercise';
import UpdateWeeklyExercise from '../pages/UpdateWeeklyExercise';
import CreateCardioPR from '../pages/CreateCardioPR';
import CreateCardioLogEntry from '../pages/CreateCardioLogEntry';

const Main = () => (
  <div id="Main">
    <div className="row">
      <div className="col-md-12">
        <Router>
          <Navbar
            id="NavTitlebar"
            bg="dark"
            variant="dark"
            expand="sm"
            fixed="top"
          >
            <Navbar.Brand href="/">adam-knight.co</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Pages" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/fitness-tracker">
                    Fitness Tracker
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form inline>
                <LoginToggle />
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/fitness-tracker"
              component={FitnessTracker}
            />
            <Route
              exact
              path="/fitness-tracker/create-training-max-exercise"
              component={CreateTrainingMaxExercise}
            />
            <Route
              exact
              path="/fitness-tracker/delete-training-max-exercise"
              component={DeleteTrainingMaxExercise}
            />
            <Route
              exact
              path="/fitness-tracker/update-training-max-exercise"
              component={UpdateTrainingMaxExercise}
            />
            <Route
              exact
              path="/fitness-tracker/view-training-max-history"
              component={ViewTrainingMaxHistory}
            />
            <Route
              exact
              path="/fitness-tracker/create-weekly-exercise"
              component={CreateWeeklyExercise}
            />
            <Route
              exact
              path="/fitness-tracker/delete-weekly-exercise"
              component={DeleteWeeklyExercise}
            />
            <Route
              exact
              path="/fitness-tracker/update-weekly-exercise"
              component={UpdateWeeklyExercise}
            />
            <Route
              exact
              path="/fitness-tracker/create-cardio-pr"
              component={CreateCardioPR}
            />
            <Route
              exact
              path="/fitness-tracker/create-cardio-log-entry"
              component={CreateCardioLogEntry}
            />
          </Switch>
        </Router>
      </div>
    </div>
  </div>
);

export default Main;
