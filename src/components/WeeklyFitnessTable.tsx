import { Link } from 'react-router-dom';
import { DisplayWeeklyExercises } from '../shared/types/FitnessTrackerTypes';
import '../assets/css/WeeklyFitnessTable.css';

/**
 * Component for showing weekly fitness exercises in a table. Populates table based on exercises passed to it.
 */
function WeeklyFitnessTable(props: {
  exercises: DisplayWeeklyExercises;
}) {
  const { exercises } = props;

  return (
    <div id="WeeklyContainer">
      <h2>Weekly Exercises</h2>
      <div id="WeeklyFitnessTableLinkBlock">
        <Link to="/fitness-tracker/update-weekly-exercise">
          Update Weekly Exercise
        </Link>
        <Link to="/fitness-tracker/create-weekly-exercise">
          Create Weekly Exercise
        </Link>
        <Link to="/fitness-tracker/delete-weekly-exercise">
          Delete Weekly Exercise
        </Link>
      </div>
      <div id="WeeklyFitnessTable" className="table-responsive">
        <table id="WeeklyTable" className="table">
          <thead>
            <tr>
              <th scope="col">Day of Week</th>
              <th scope="col">Name</th>
              <th scope="col">Reps</th>
              <th scope="col">Weight (kg)</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise) => (
              <tr key={exercise.id} className={exercise.dayOfWeek}>
                <td>{exercise.dayOfWeek}</td>
                <td>{exercise.name}</td>
                <td>{exercise.reps}</td>
                <td>{exercise.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WeeklyFitnessTable;
