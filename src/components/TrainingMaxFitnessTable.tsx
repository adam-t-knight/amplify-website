import moment from 'moment-timezone';
import { Link } from 'react-router-dom';
import '../assets/css/TrainingMaxFitnessTable.css';

type TrainingMaxExercise = {
  id: string;
  name: string;
  weight: number;
  createdOn: Date;
  updatedOn: Date;
};

type TrainingMaxExercises = Array<TrainingMaxExercise>;

/**
 * Component for showing training max exercises in a table. Populates table based on exercises passed to it.
 */
function TrainingMaxFitnessTable(props: {
  exercises: TrainingMaxExercises;
}) {
  const { exercises } = props;

  return (
    <div id="TrainingMaxContainer">
      <h2>Training Max Weights</h2>
      <div id="TrainingMaxTableLinkBlock1">
        <Link to="/fitness-tracker/update-training-max-exercise">
          Update Training Max Exercise
        </Link>
        <Link to="/fitness-tracker/create-training-max-exercise">
          Create Training Max Exercise
        </Link>
        <Link to="/fitness-tracker/delete-training-max-exercise">
          Delete Training Max Exercise
        </Link>
      </div>
      <div id="TrainingMaxTableLinkBlock2">
        <Link to="/fitness-tracker/view-training-max-history">
          View Training Max History
        </Link>
      </div>
      <div id="TrainingMaxTable" className="table-responsive">
        <table id="TrainingTable" className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Weight (kg)</th>
              <th scope="col">Created On</th>
              <th scope="col">Updated On</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise) => (
              <tr key={exercise.id}>
                <td>
                  <Link
                    to={{
                      pathname:
                        '/fitness-tracker/view-training-max-history',
                      state: {
                        name: exercise.name,
                      },
                    }}
                  >
                    {exercise.name}
                  </Link>
                </td>
                <td>{exercise.weight}</td>
                <td>
                  {moment(exercise.createdOn)
                    .format('DD-MM-YYYY HH:mm:ss')
                    .toString()}
                </td>
                <td>
                  {moment(exercise.updatedOn)
                    .format('DD-MM-YYYY HH:mm:ss')
                    .toString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TrainingMaxFitnessTable;
