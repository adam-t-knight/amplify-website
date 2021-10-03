import { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';
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
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Refreshes exercises from training max db
   */
  async function refreshTrainingMaxExercises() {
    setExercises(await fetchTrainingMaxExercises());
    setIsLoading(false);
  }

  /**
   * Sets auth state and refreshes exercises on change
   */
  useEffect(() => {
    refreshTrainingMaxExercises();

    if (authState === undefined) {
      Auth.currentAuthenticatedUser()
        .then((authData) => {
          setAuthState(AuthState.SignedIn);
          setUser(authData as CognitoUserInterface);
        })
        .catch(() => {});
    }

    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData as CognitoUserInterface);
    });
  }, [authState]);

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

  return (
    <div id="DeleteTrainingMaxExercise">
      <h2>Delete Training Max Exercise</h2>
      <Link to="/fitness-tracker">Back</Link>
      {authState === AuthState.SignedIn && user ? (
        <>
          {!isLoading ? (
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
          ) : (
            <div className="DeleteTrainingMaxExerciseContainer">
              <h3>Loading! Please wait...</h3>
            </div>
          )}
        </>
      ) : (
        <div>
          <AmplifyAuthenticator>
            <AmplifySignIn slot="sign-in" hideSignUp />
          </AmplifyAuthenticator>
        </div>
      )}
    </div>
  );
};

export default DeleteTrainingMaxExercise;
