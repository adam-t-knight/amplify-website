import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import {
  AuthState,
  onAuthUIStateChange,
  CognitoUserInterface,
} from '@aws-amplify/ui-components';
import { Link } from 'react-router-dom';
import {
  AmplifyAuthenticator,
  AmplifySignIn,
} from '@aws-amplify/ui-react';
import moment from 'moment-timezone';
import { fetchTrainingMaxExercises } from '../shared/lib/FitnessTrackerFetch';
import { TrainingMaxWeights } from '../shared/types/FitnessTrackerTypes';
import { deleteTrainingMaxExercise } from '../graphql/mutations';
import '../assets/css/DeleteTrainingMaxExercise.css';

/**
 * Page to allow authenticated user to delete a training max exercise from the database
 */
const DeleteTrainingMaxExercise = () => {
  const [exercises, setExercises] = useState<TrainingMaxWeights>([]);
  const [authState, setAuthState] = useState<AuthState>();
  const [user, setUser] = useState<
    CognitoUserInterface | undefined
  >();

  /**
   * Refreshes exercises from training max db
   */
  async function refreshTrainingMaxExercises() {
    setExercises(await fetchTrainingMaxExercises());
  }

  /**
   * Sets auth state and refreshes exercises on change
   */
  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData as CognitoUserInterface);
    });

    refreshTrainingMaxExercises();
  }, []);

  /**
   * Function to delete training max exercises from the database
   * @param {string} id id key of exercise to be deleted
   */
  async function deleteExercise(id: string) {
    const newExercisesArray = exercises.filter(
      (exercise) => exercise.id !== id,
    );
    setExercises(newExercisesArray);
    await API.graphql({
      query: deleteTrainingMaxExercise,
      variables: { input: { id } },
    });
  }

  return authState === AuthState.SignedIn && user ? (
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
                    onClick={() => deleteExercise(exercise.id)}
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
    <AmplifyAuthenticator>
      <AmplifySignIn slot="sign-in" hideSignUp />
    </AmplifyAuthenticator>
  );
};

export default DeleteTrainingMaxExercise;
