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
import { createCardioLog } from '../graphql/mutations';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/CreateCardioLogEntry.css';
import { CardioLogEntries } from '../shared/types/FitnessTrackerTypes';
import { fetchCardioLogEntries } from '../shared/lib/FitnessTrackerFetch';

/**
 * Page to allow authenticated user to write a new cardio log entry to the database
 */
const CreateCardioLogEntry = () => {
  const [exercises, setExercises] = useState<CardioLogEntries>([]);
  const [authState, setAuthState] = useState<AuthState>();
  const [user, setUser] = useState<
    CognitoUserInterface | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);

  const cardioLogEntrySchema = Yup.object().shape({
    exerciseName: Yup.string().required('Required'),
    distance: Yup.string().required('Required'),
    time: Yup.number().required('Required'),
    elevationGain: Yup.number().required('Required'),
  });

  /**
   * Refreshes exercises from cardio log db
   */
  async function refreshCardioLog() {
    setExercises(await fetchCardioLogEntries());
    setIsLoading(false);
  }

  /**
   * Sets auth state and refreshes exercises on change
   */
  useEffect(() => {
    refreshCardioLog();

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
    distance: number;
    time: number;
    elevationGain: number;
  }) {
    if (
      !values.exerciseName ||
      !values.distance ||
      !values.time ||
      !values.elevationGain
    )
      return;
    await API.graphql({
      query: createCardioLog,
      variables: { input: values },
    });
    refreshCardioLog();
  }

  return (
    <div id="CreateCardioLogEntry">
      <h2>Create Cardio Log Entry</h2>
      <Link to="/fitness-tracker">Back</Link>
      {authState === AuthState.SignedIn && user ? (
        <>
          <Formik
            initialValues={{
              exerciseName: 'Run',
              distance: 1,
              time: 1,
              elevationGain: 1,
            }}
            validationSchema={cardioLogEntrySchema}
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

                <label htmlFor="distance">
                  Distance
                  <Field
                    id="distance"
                    name="distance"
                    placeholder="1"
                    type="number"
                    step="1"
                  />
                  <ErrorMessage
                    name="distance"
                    component="span"
                    className="error"
                  />
                </label>

                <label htmlFor="time">
                  Time
                  <Field
                    id="time"
                    name="time"
                    placeholder="1"
                    type="number"
                    step="1"
                  />
                  <ErrorMessage
                    name="time"
                    component="span"
                    className="error"
                  />
                </label>

                <label htmlFor="elevationGain">
                  Elevation Gain
                  <Field
                    id="elevationGain"
                    name="elevationGain"
                    placeholder="1"
                    type="number"
                    step="1"
                  />
                  <ErrorMessage
                    name="elevationGain"
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
            <div id="CreateCardioLogEntryContainer">
              <table className="CreateCardioLogEntryTable">
                <thead>
                  <tr>
                    <th scope="col">Exercise Name</th>
                    <th scope="col">Distance</th>
                    <th scope="col">Time</th>
                    <th scope="col">Elevation Gain</th>
                    <th scope="col">Created On</th>
                    <th scope="col">Updated On</th>
                  </tr>
                </thead>
                <tbody>
                  {exercises.map((exercise) => (
                    <tr key={exercise.id}>
                      <td>{exercise.exerciseName}</td>
                      <td>{exercise.distance}</td>
                      <td>{exercise.time}</td>
                      <td>{exercise.elevationGain}</td>
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
            <div className="CreateCardioLogEntryContainer">
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

export default CreateCardioLogEntry;
