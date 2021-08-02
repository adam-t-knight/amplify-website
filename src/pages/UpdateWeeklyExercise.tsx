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
import { updateWeeklyExercise } from '../graphql/mutations';
import { fetchWeeklyExercises } from '../shared/lib/FitnessTrackerFetch';
import '../assets/css/UpdateWeeklyExercise.css';
import { blankWeeklyExercise } from '../shared/types/FitnessTrackerTypes';

/**
 * Page to allow authenticated user to update a new weekly exercise in the database
 */
const UpdateWeeklyExercise = () => {
  const [oldExerciseValues, setOldExerciseValues] = useState([
    { ...blankWeeklyExercise },
  ]);
  const [newExerciseValues, setNewExerciseValues] = useState([
    { ...blankWeeklyExercise },
  ]);

  const [authState, setAuthState] = useState<AuthState>();
  const [user, setUser] = useState<
    CognitoUserInterface | undefined
  >();

  /**
   * Fetches exercises from weekly exercise table
   */
  async function refreshWeeklyExercises() {
    const weeklyExercises = await fetchWeeklyExercises();

    setOldExerciseValues(weeklyExercises);
    setNewExerciseValues(JSON.parse(JSON.stringify(weeklyExercises))); // only the second needs to pass by value
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
   * Updates exercise to db using form data
   * @param {string} idx id key of exercise to be updated
   */
  async function updateExercise(idx: number) {
    if (
      oldExerciseValues[idx].dayOfWeekNum !==
        newExerciseValues[idx].dayOfWeekNum ||
      oldExerciseValues[idx].name !== newExerciseValues[idx].name ||
      oldExerciseValues[idx].exerciseNum !==
        newExerciseValues[idx].exerciseNum ||
      oldExerciseValues[idx].setNum !==
        newExerciseValues[idx].setNum ||
      oldExerciseValues[idx].reps !== newExerciseValues[idx].reps ||
      oldExerciseValues[idx].ratio !== newExerciseValues[idx].ratio
    ) {
      await API.graphql({
        query: updateWeeklyExercise,
        variables: { input: newExerciseValues[idx] },
      });
      setOldExerciseValues(
        JSON.parse(JSON.stringify([...newExerciseValues])),
      ); // have to update in case multiple changes on the same page
      console.log(
        `New exercise values have been set for row ${idx}${1}`,
      );
    } else {
      console.log('No exercise values to change on this row.');
    }
  }

  /**
   * Updates exercise function variable using form data
   */
  const updateFieldChanged =
    (index: number) =>
    (e: { target: { name: string | number; value: any } }) => {
      if (e.target.name === 'name') {
        const newArr = [...newExerciseValues];
        newArr[index].name = e.target.value;
        newArr[index].updatedOn = moment().toDate();
        setNewExerciseValues(newArr);
      } else if (e.target.name === 'weight') {
        const newArr = [...newExerciseValues];
        newArr[index].weight = e.target.value;
        newArr[index].updatedOn = moment().toDate();
        setNewExerciseValues(newArr);
      }
    };

  return authState === AuthState.SignedIn && user ? (
    <div id="UpdateWeeklyExercise">
      <h2>Update Weekly Exercise</h2>
      <Link to="/fitness-tracker">Back</Link>
      <div id="UpdateWeeklyExerciseContainer">
        <table id="UpdateWeeklyExerciseTable">
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
            {newExerciseValues.map((exercise, idx) => (
              <tr key={exercise.id}>
                <td>
                  <input
                    type="number"
                    name="dayOfWeekNum"
                    value={exercise.dayOfWeekNum}
                    onChange={updateFieldChanged(idx)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={exercise.name}
                    onChange={updateFieldChanged(idx)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="exerciseNum"
                    value={exercise.exerciseNum}
                    onChange={updateFieldChanged(idx)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="setNum"
                    value={exercise.setNum}
                    onChange={updateFieldChanged(idx)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="reps"
                    value={exercise.reps}
                    onChange={updateFieldChanged(idx)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="ratio"
                    value={exercise.ratio}
                    onChange={updateFieldChanged(idx)}
                  />
                </td>
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
                    onClick={() => updateExercise(idx)}
                  >
                    Save
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

export default UpdateWeeklyExercise;
