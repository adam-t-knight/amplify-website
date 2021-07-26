import { useState, useEffect } from 'react';
/* import { onAuthUIStateChange } from '@aws-amplify/ui-components'; */
import { Auth, API } from 'aws-amplify';
import { Link } from 'react-router-dom';
import {
  AmplifyAuthenticator,
  AmplifySignIn,
} from '@aws-amplify/ui-react';
import moment from 'moment-timezone';
import { listWeeklyExercises } from '../graphql/queries';
import { createWeeklyExercise } from '../graphql/mutations';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/CreateWeeklyExercise.css';

const initialFormState = {
  dayOfWeekNum: '',
  name: '',
  exerciseNum: '',
  setNum: '',
  reps: '',
  ratio: '',
};

/**
 * Page to allow authenticated user to write a new weekly max exercise to the database
 */
const CreateWeeklyExercise = () => {
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  /*   const [authState, setAuthState] = useState();
  const [user, setUser] = useState(); */

  /**
   * Fetches exercises from weekly exercise db
   */
  async function fetchExercises() {
    const apiData = await API.graphql({ query: listWeeklyExercises });
    const weeklyExercises = apiData.data.listWeeklyExercises.items;

    weeklyExercises.sort(
      (a, b) =>
        a.dayOfWeekNum - b.dayOfWeekNum ||
        a.exerciseNum - b.exerciseNum ||
        a.setNum - b.setNum,
    );

    setExercises(weeklyExercises);
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
    if (
      !formData.dayOfWeekNum ||
      !formData.name ||
      !formData.exerciseNum ||
      !formData.setNum ||
      !formData.reps ||
      !formData.ratio
    ) {
      return;
    }
    await API.graphql({
      query: createWeeklyExercise,
      variables: { input: formData },
    });
    setExercises([...exercises, formData]);
    setFormData(initialFormState);
  }

  return Auth.user ? (
    <div id="CreateWeeklyExercise">
      <h2>Create Weekly Exercise</h2>
      <Link to="/fitness-tracker">Back</Link>
      <table className="CreateWeeklyExerciseTable">
        <thead>
          <tr>
            <th scope="col">Day of Week Number</th>
            <th scope="col">Exercise Name</th>
            <th scope="col">Exercise Number</th>
            <th scope="col">Set Number</th>
            <th scope="col">Reps</th>
            <th scope="col">Ratio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                id="dayOfWeekNumInput"
                name="dayOfWeekNumInput"
                type="number"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dayOfWeekNum: e.target.value,
                  })
                }
                placeholder="Day of Week Number"
                value={formData.dayOfWeekNum}
              />
            </td>
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
                id="exerciseNumInput"
                name="exerciseNumInput"
                type="number"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    exerciseNum: e.target.value,
                  })
                }
                placeholder="Exercise Number"
                value={formData.exerciseNum}
              />
            </td>
            <td>
              <input
                id="setNumInput"
                name="setNumInput"
                type="number"
                onChange={(e) =>
                  setFormData({ ...formData, setNum: e.target.value })
                }
                placeholder="Set Number"
                value={formData.setNum}
              />
            </td>
            <td>
              <input
                id="repsInput"
                name="repsInput"
                onChange={(e) =>
                  setFormData({ ...formData, reps: e.target.value })
                }
                placeholder="Reps"
                value={formData.reps}
              />
            </td>
            <td>
              <input
                id="ratioInput"
                name="ratioInput"
                type="number"
                onChange={(e) =>
                  setFormData({ ...formData, ratio: e.target.value })
                }
                placeholder="Ratio"
                value={formData.ratio}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" onClick={createExercise}>
        Create Weekly Exercise
      </button>
      <div id="CreateWeeklyExerciseContainer">
        <table className="CreateWeeklyExerciseTable">
          <thead>
            <tr>
              <th scope="col">Day of Week Number</th>
              <th scope="col">Name</th>
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

export default CreateWeeklyExercise;
