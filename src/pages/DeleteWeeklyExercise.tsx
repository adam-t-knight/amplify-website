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
import { WeeklyExercises } from '../shared/types/FitnessTrackerTypes';
import { fetchWeeklyExercises } from '../shared/lib/FitnessTrackerFetch';
import { deleteWeeklyExercise } from '../graphql/mutations';
import '../assets/css/DeleteWeeklyExercise.css';

/**
 * Page to allow authenticated user to delete a training max exercise from the database
 */
const DeleteWeeklyExercise = () => {
  const [exercises, setExercises] = useState<WeeklyExercises>([]);
  const [authState, setAuthState] = useState<AuthState>();
  const [user, setUser] = useState<
    CognitoUserInterface | undefined
  >();

  /**
   * Refreshes exercises from weekly exercise db
   */
  async function refreshWeeklyExercises() {
    setExercises(await fetchWeeklyExercises());
  }

  /**
   * Sets auth state and refreshes exercises on change
   */
  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData as CognitoUserInterface);
    });
    refreshWeeklyExercises();
  }, []);

  /**
   * Function to delete Exercises from the database
   * @param {string} id id key of exercise to be deleted
   */
  async function deleteExercise(id: string) {
    const newExercisesArray = exercises.filter(
      (exercise) => exercise.id !== id,
    );
    setExercises(newExercisesArray);
    await API.graphql({
      query: deleteWeeklyExercise,
      variables: { input: { id } },
    });
  }

  return authState === AuthState.SignedIn && user ? (
    <div id="DeleteWeeklyExercise">
      <h2>Delete Weekly Exercise</h2>
      <Link to="/fitness-tracker">Back</Link>
      <div id="DeleteWeeklyExerciseContainer">
        <table id="DeleteWeeklyExerciseTable">
          <thead>
            <tr>
              <th scope="col">Day of Week Number</th>
              <th scope="col">Exercise Name</th>
              <th scope="col">Exercise Number</th>
              <th scope="col">Set Number</th>
              <th scope="col">Reps</th>
              <th scope="col">Ratio</th>
              <th scope="col">Created On</th>
              <th scope="col">Updated On</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise) => (
              <tr key={exercise.id}>
                <td>{exercise.dayOfWeekNum}</td>
                <td>{exercise.name}</td>
                <td>{exercise.exerciseNum}</td>
                <td>{exercise.setNum}</td>
                <td>{exercise.reps}</td>
                <td>{exercise.ratio}</td>
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

export default DeleteWeeklyExercise;
