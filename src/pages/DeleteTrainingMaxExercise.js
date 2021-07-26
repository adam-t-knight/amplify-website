import { useState, useEffect } from 'react';
/* import { onAuthUIStateChange } from '@aws-amplify/ui-components'; */
import { Auth, API } from 'aws-amplify';
import { Link } from 'react-router-dom';
import {
  AmplifyAuthenticator,
  AmplifySignIn,
} from '@aws-amplify/ui-react';
import moment from 'moment-timezone';
import { listTrainingMaxExercises } from '../graphql/queries';
import { deleteTrainingMaxExercise } from '../graphql/mutations';
import '../assets/css/DeleteTrainingMaxExercise.css';

/**
 * Page to allow authenticated user to delete a training max exercise from the database
 */
const DeleteTrainingMaxExercise = () => {
  const [exercises, setExercises] = useState([]);
  /*   const [authState, setAuthState] = useState();
  const [user, setUser] = useState(); */

  /**
   * Function to retrieve Exercises from the database
   */
  async function fetchExercises() {
    const apiData = await API.graphql({
      query: listTrainingMaxExercises,
    });
    const trainingMaxExercises =
      apiData.data.listTrainingMaxExercises.items;

    setExercises(trainingMaxExercises);
  }

  /**
   * Sets auth state and fetches on change
   */
  useEffect(() => {
    /*     onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    }); */
    fetchExercises();
  }, []);

  /**
   * Function to delete Exercises from the database
   * @param {string} id id key of exercise to be deleted
   */
  async function deleteExercise({ id }) {
    const newExercisesArray = exercises.filter(
      (exercise) => exercise.id !== id,
    );
    setExercises(newExercisesArray);
    await API.graphql({
      query: deleteTrainingMaxExercise,
      variables: { input: { id } },
    });
  }

  return Auth.user ? (
    <div id="DeleteTrainingMaxExercise">
      <h2>Delete Training Max Exercise</h2>
      <Link to="/fitness-tracker">Back</Link>
      <div id="DeleteTrainingMaxExerciseContainer">
        <table id="DeleteTrainingMaxExerciseTable">
          <thead>
            <tr>
              <th scope="col">Exercise Name</th>
              <th scope="col">Weight (kg)</th>
              <th scope="col">Created On</th>
              <th scope="col">Updated On</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise) => (
              <tr key={exercise.id}>
                <td>{exercise.name}</td>
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
                <td>
                  <button
                    type="button"
                    onClick={() => deleteExercise(exercise)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <AmplifyAuthenticator hideDefault>
      <AmplifySignIn slot="sign-in" hideSignUp />
    </AmplifyAuthenticator>
  );
};

export default DeleteTrainingMaxExercise;
