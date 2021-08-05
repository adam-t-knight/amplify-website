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
import { createWeeklyExercise } from '../graphql/mutations';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/CreateWeeklyExercise.css';
import { WeeklyExercises } from '../shared/types/FitnessTrackerTypes';
import { fetchWeeklyExercises } from '../shared/lib/FitnessTrackerFetch';

/**
 * Page to allow authenticated user to write a new weekly max exercise to the database
 */
const CreateWeeklyExercise = () => {
  const [exercises, setExercises] = useState<WeeklyExercises>([]);
  const [authState, setAuthState] = useState<AuthState>();
  const [user, setUser] = useState<
    CognitoUserInterface | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);

  const weeklyExerciseSchema = Yup.object().shape({
    dayOfWeekNum: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    exerciseNum: Yup.number().required('Required'),
    setNum: Yup.number().required('Required'),
    reps: Yup.string().required('Required'),
    ratio: Yup.number().required('Required'),
  });

  /**
   * Refreshes exercises from weekly exercise db
   */
  async function refreshWeeklyExercises() {
    setExercises(await fetchWeeklyExercises());
    setIsLoading(false);
  }

  /**
   * Sets auth state and refreshes exercises on change
   */
  useEffect(() => {
    refreshWeeklyExercises();

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
    dayOfWeekNum: number;
    name: string;
    exerciseNum: number;
    setNum: number;
    reps: string;
    ratio: number;
  }) {
    if (
      !values.dayOfWeekNum ||
      !values.name ||
      !values.exerciseNum ||
      !values.setNum ||
      !values.reps ||
      !values.ratio
    )
      return;
    await API.graphql({
      query: createWeeklyExercise,
      variables: { input: values },
    });
    refreshWeeklyExercises();
  }

  return (
    <div id="CreateWeeklyExercise">
      <h2>Create Weekly Exercise</h2>
      <Link to="/fitness-tracker">Back</Link>
      {authState === AuthState.SignedIn && user ? (
        <>
          <Formik
            initialValues={{
              dayOfWeekNum: 1,
              name: '',
              exerciseNum: 1,
              setNum: 1,
              reps: '',
              ratio: 0.5,
            }}
            validationSchema={weeklyExerciseSchema}
            onSubmit={(values) => {
              createExercise(values);
            }}
          >
            {({ isValid, dirty }) => (
              <Form>
                <label htmlFor="dayOfWeekNum">
                  Day Of Week Num
                  <Field
                    id="dayOfWeekNum"
                    name="dayOfWeekNum"
                    placeholder="1"
                    type="number"
                  />
                  <ErrorMessage
                    name="dayOfWeekNum"
                    component="span"
                    className="error"
                  />
                </label>

                <label htmlFor="name">
                  Exercise Name
                  <Field
                    id="name"
                    name="name"
                    placeholder="Squat"
                    type="text"
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="error"
                  />
                </label>

                <label htmlFor="exerciseNum">
                  Exercise Num
                  <Field
                    id="exerciseNum"
                    name="exerciseNum"
                    placeholder="1"
                    type="number"
                  />
                  <ErrorMessage
                    name="exerciseNum"
                    component="span"
                    className="error"
                  />
                </label>

                <label htmlFor="setNum">
                  Set Num
                  <Field
                    id="setNum"
                    name="setNum"
                    placeholder="1"
                    type="number"
                  />
                  <ErrorMessage
                    name="setNum"
                    component="span"
                    className="error"
                  />
                </label>

                <label htmlFor="reps">
                  Reps
                  <Field
                    id="reps"
                    name="reps"
                    placeholder="5"
                    type="text"
                  />
                  <ErrorMessage
                    name="reps"
                    component="span"
                    className="error"
                  />
                </label>

                <label htmlFor="ratio">
                  Ratio
                  <Field
                    id="ratio"
                    name="ratio"
                    placeholder="0.5"
                    type="number"
                    step="0.05"
                  />
                  <ErrorMessage
                    name="ratio"
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
          ) : (
            <div className="CreateWeeklyExerciseContainer">
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

export default CreateWeeklyExercise;
