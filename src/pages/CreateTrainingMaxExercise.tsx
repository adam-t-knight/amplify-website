import React, { useState, useEffect } from 'react';
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
  createTrainingMaxExercise,
  createTrainingMaxExerciseHistory,
} from '../graphql/mutations';
import '../assets/css/CreateTrainingMaxExercise.css';
import { TrainingMaxWeights } from '../shared/types/FitnessTrackerTypes';
import { fetchTrainingMaxExercises } from '../shared/lib/FitnessTrackerFetch';

/**
 * Page to allow authenticated user to write a new training max exercise to the database
 */
const CreateTrainingMaxExercise = () => {
  const [exercises, setExercises] = useState<TrainingMaxWeights>([]);
  const [authState, setAuthState] = useState<AuthState>();
  const [user, setUser] = useState<
    CognitoUserInterface | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);

  const trainingMaxSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too short')
      .max(20, 'Too long')
      .matches(
        new RegExp('^[a-zA-Z ]*$'),
        'Can only contain letters and spaces',
      )
      .required('Required'),
    weight: Yup.number()
      .positive('Must be positive')
      .required('Required'),
  });

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
   * Writes new exercise to db using form data
   */
  async function createExercise(values: {
    name: string;
    weight: number;
  }) {
    if (!values.name || !values.weight) return;
    await API.graphql({
      query: createTrainingMaxExercise,
      variables: { input: values },
    });
    await API.graphql({
      query: createTrainingMaxExerciseHistory,
      variables: { input: values },
    });
    refreshTrainingMaxExercises();
  }

  return (
    <div id="CreateTrainingMaxExercise">
      <h2>Create Training Max Exercise</h2>
      <Link to="/fitness-tracker">Back</Link>
      {authState === AuthState.SignedIn && user ? (
        <>
          <Formik
            initialValues={{
              name: '',
              weight: 200,
            }}
            validationSchema={trainingMaxSchema}
            onSubmit={(values) => {
              createExercise(values);
            }}
          >
            <Form>
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
              <label htmlFor="weight">
                Exercise Weight (kg)
                <Field id="weight" name="weight" type="number" />
                <ErrorMessage
                  name="weight"
                  component="span"
                  className="error"
                />
              </label>
              <button type="submit">Submit</button>
            </Form>
          </Formik>

          {!isLoading ? (
            <div className="CreateTrainingMaxExerciseContainer">
              <table className="CreateTrainingMaxExerciseTable">
                <thead>
                  <tr>
                    <th scope="col">Exercise Name</th>
                    <th scope="col">Exercise Weight (kg)</th>
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
          ) : (
            <div className="CreateTrainingMaxExerciseContainer">
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

export default CreateTrainingMaxExercise;
