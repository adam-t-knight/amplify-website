import { useState, useEffect } from 'react';
/* import { onAuthUIStateChange } from '@aws-amplify/ui-components'; */
import { Auth, API } from 'aws-amplify';

import { Link } from 'react-router-dom';
import {
  AmplifyAuthenticator,
  AmplifySignIn,
} from '@aws-amplify/ui-react';
import moment from 'moment-timezone';
import {
  createTrainingMaxExercise,
  createTrainingMaxExerciseHistory,
} from '../graphql/mutations';
import { listTrainingMaxExercises } from '../graphql/queries';
import '../assets/css/CreateTrainingMaxExercise.css';

const initialFormState = { name: '', weight: '' };

/**
 * Page to allow authenticated user to write a new training max exercise to the database
 */
const CreateTrainingMaxExercise = () => {
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  /*   const [authState, setAuthState] = useState();
  const [user, setUser] = useState(); */

  /**
   * Fetches exercises from training max db
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
   * Writes new exercise to db using form data
   */
  async function createExercise() {
    if (!formData.name || !formData.weight) return;
    await API.graphql({
      query: createTrainingMaxExercise,
      variables: { input: formData },
    });
    await API.graphql({
      query: createTrainingMaxExerciseHistory,
      variables: { input: formData },
    });
    setExercises([...exercises, formData]);
    setFormData(initialFormState);
  }

  return Auth.user ? (
    <div id="CreateTrainingMaxExercise">
      <h2>Create Training Max Exercise</h2>
      <Link to="/fitness-tracker">Back</Link>
      <table className="CreateTrainingMaxExerciseTable">
        <thead>
          <tr>
            <th scope="col">Exercise Name</th>
            <th scope="col">Weight (kg)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                id="nameInput"
                name="nameInput"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Exercise Name"
                value={formData.name}
              />
            </td>
            <td>
              <input
                id="weightInput"
                name="weightInput"
                type="number"
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                placeholder="Weight"
                value={formData.weight}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" onClick={createExercise}>
        Create Training Max Exercise
      </button>
      <div id="CreateTrainingMaxExerciseContainer">
        <table className="CreateTrainingMaxExerciseTable">
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

export default CreateTrainingMaxExercise;
