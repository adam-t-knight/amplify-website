import { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import {
  AmplifyAuthenticator,
  AmplifySignIn,
} from '@aws-amplify/ui-react';
import {
  AuthState,
  onAuthUIStateChange,
  CognitoUserInterface,
} from '@aws-amplify/ui-components';
import moment from 'moment-timezone';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  createCardioPRs,
  createCardioPRsHistory,
} from '../graphql/mutations';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/CreateCardioPR.css';
import { CardioPRs } from '../shared/types/FitnessTrackerTypes';
import { fetchCardioPRs } from '../shared/lib/FitnessTrackerFetch';

/**
 * Page to allow authenticated user to write a new cardio PR to the database
 */
const CreateCardioPR = () => {
  const [exercises, setExercises] = useState<CardioPRs>([]);
  const [authState, setAuthState] = useState<AuthState>();
  const [user, setUser] = useState<
    CognitoUserInterface | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);

  const cardioPRSchema = Yup.object().shape({
    exerciseName: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    value: Yup.number().required('Required'),
  });

  /**
   * Refreshes exercises from cardio PR db
   */
  async function refreshCardioPRs() {
    setExercises(await fetchCardioPRs());
    setIsLoading(false);
  }

  /**
   * Sets auth state and refreshes exercises on change
   */
  useEffect(() => {
    refreshCardioPRs();

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
   * Writes new exercise to db using form data
   */
  async function createExercise(values: {
    exerciseName: string;
    category: string;
    value: number;
  }) {
    if (!values.exerciseName || !values.category || !values.value)
      return;
    await API.graphql({
      query: createCardioPRs,
      variables: { input: values },
    });
    await API.graphql({
      query: createCardioPRsHistory,
      variables: { input: values },
    });
    refreshCardioPRs();
  }

  return (
    <div id="CreateCardioPR">
      <h2>Create Cardio PR</h2>
      <Link to="/fitness-tracker">Back</Link>
      {authState === AuthState.SignedIn && user ? (
        <>
          <Formik
            initialValues={{
              exerciseName: 'Run',
              category: 'Distance',
              value: 1,
            }}
            validationSchema={cardioPRSchema}
            onSubmit={(values) => {
              createExercise(values);
            }}
          >
            {({ isValid, dirty }) => (
              <Form>
                <label htmlFor="exerciseName">
                  Exercise Name
                  <Field
                    id="exerciseName"
                    name="exerciseName"
                    placeholder="Run"
                    type="text"
                  />
                  <ErrorMessage
                    name="exerciseName"
                    component="span"
                    className="error"
                  />
                </label>

                <label htmlFor="category">
                  Category
                  <Field
                    id="category"
                    name="category"
                    placeholder="Distance"
                    type="text"
                  />
                  <ErrorMessage
                    name="category"
                    component="span"
                    className="error"
                  />
                </label>

                <label htmlFor="value">
                  Value
                  <Field
                    id="value"
                    name="value"
                    placeholder="1"
                    type="number"
                    step="1"
                  />
                  <ErrorMessage
                    name="value"
                    component="span"
                    className="error"
                  />
                </label>

                <button disabled={!isValid || !dirty} type="submit">
                  Submit
                </button>
              </Form>
            )}
          </Formik>

          {!isLoading ? (
            <div id="CreateCardioPRContainer">
              <table className="CreateCardioPRTable">
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
          ) : (
            <div className="CreateCardioPRContainer">
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

export default CreateCardioPR;
