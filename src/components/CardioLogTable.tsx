import { Link } from 'react-router-dom';
import { CardioLogEntries } from '../shared/types/FitnessTrackerTypes';
import '../assets/css/CardioLogTable.css';

/**
 * Component for showing weekly cardio exercises in a table. Populates table based on exercises passed to it.
 */
function CardioLogTable(props: { exercises: CardioLogEntries }) {
  const { exercises } = props;

  return (
    <div id="CardioLogContainer">
      <h2>Cardio Log</h2>
      <div id="CardioLogTableLinkBlock">
        <Link to="/fitness-tracker/update-cardio-log-entry">
          Update Cardio Entry
        </Link>
        <Link to="/fitness-tracker/create-cardio-log-entry">
          Create Cardio Entry
        </Link>
        <Link to="/fitness-tracker/delete-cardio-log-entry">
          Delete Cardio Entry
        </Link>
      </div>
      <div id="CardioLog" className="table-responsive">
        <table id="CardioLogTable" className="table">
          <thead>
            <tr>
              <th scope="col">Exercise Name</th>
              <th scope="col">Distance</th>
              <th scope="col">Time</th>
              <th scope="col">Elevation Gain</th>
              <th scope="col">Created On</th>
              <th scope="col">Updated On</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise) => (
              <tr key={exercise.id}>
                <td>{exercise.exerciseName}</td>
                <td>{exercise.distance}</td>
                <td>{exercise.time}</td>
                <td>{exercise.elevationGain}</td>
                <td>{exercise.createdOn}</td>
                <td>{exercise.updatedOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CardioLogTable;
