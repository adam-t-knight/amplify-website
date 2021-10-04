import { Link } from 'react-router-dom';
import { CardioPRs } from '../shared/types/FitnessTrackerTypes';
import '../assets/css/CardioPRsTable.css';

/**
 * Component for showing weekly cardio exercises in a table. Populates table based on exercises passed to it.
 */
function CardioPRsTable(props: { exercises: CardioPRs }) {
  const { exercises } = props;

  return (
    <div id="CardioPRsContainer">
      <h2>Cardio PRs</h2>
      <div id="CardioPRsTableLinkBlock1">
        <Link to="/fitness-tracker/update-cardio-pr">
          Update Cardio PR
        </Link>
        <Link to="/fitness-tracker/create-cardio-pr">
          Create Cardio PR
        </Link>
        <Link to="/fitness-tracker/delete-cardio-pr">
          Delete Cardio PR
        </Link>
      </div>
      <div id="CardioPRsTableLinkBlock2">
        <Link to="/fitness-tracker/view-cardio-pr-history">
          View Cardio PR History
        </Link>
      </div>
      <div id="CardioPRs" className="table-responsive">
        <table id="CardioPRsTable" className="table">
          <thead>
            <tr>
              <th scope="col">Exercise Name</th>
              <th scope="col">Category</th>
              <th scope="col">Value</th>
              <th scope="col">Created On</th>
              <th scope="col">Updated On</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise) => (
              <tr key={exercise.id}>
                <td>{exercise.exerciseName}</td>
                <td>{exercise.category}</td>
                <td>{exercise.value}</td>
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

export default CardioPRsTable;
