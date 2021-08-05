import { useState, useEffect } from 'react';
import {
  AuthState,
  onAuthUIStateChange,
  CognitoUserInterface,
} from '@aws-amplify/ui-components';

import { API, Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import {
  AmplifyAuthenticator,
  AmplifySignIn,
} from '@aws-amplify/ui-react';
import moment from 'moment-timezone';
import {
  Formik,
  Field,
  FieldArray,
  Form,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import {
  updateTrainingMaxExercise,
  createTrainingMaxExerciseHistory,
} from '../graphql/mutations';
import '../assets/css/UpdateTrainingMaxExercise.css';
import {
  TrainingMaxWeight,
  TrainingMaxWeights,
} from '../shared/types/FitnessTrackerTypes';
import { fetchTrainingMaxExercises } from '../shared/lib/FitnessTrackerFetch';

/**
 * Page to allow authenticated user to update a new training max exercise in the database
 */
const UpdateTrainingMaxExercise = () => {
  const [exercises, setExercises] = useState<TrainingMaxWeights>([]);
  const [authState, setAuthState] = useState<AuthState>();
  const [user, setUser] = useState<
    CognitoUserInterface | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);

  /* problems */
  const trainingMaxSchema = Yup.object().shape({
    exercises: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .min(3, 'Too short')
          .max(20, 'Too long')
          .matches(
            new RegExp('^[a-zA-Z ]*$'),
            'Can only contain letters and spaces',
          ),
        /*           .required('Required'), */
        weight: Yup.number().positive('Must be positive'),
      }),
    ),
  });

  /**
   * Refreshes exercises from training max db. Creates a new array of only the newest weight values and then sets it
   */
  async function refreshTrainingMaxExercises() {
    const trainingMaxWeights = await fetchTrainingMaxExercises();

    setExercises(trainingMaxWeights);

    setIsLoading(false);
  }

  /**
   * Looks at the arrays of touched fields and fields with errors. Disables button if there are errors or if field hasn't been touched
   */
  function buttonDisabler(
    touched: any,
    errors: any,
    idx: number,
    values: any,
    exercise: TrainingMaxWeight,
  ) {
    if (errors && errors.exercises && errors.exercises[idx]) {
      console.log('idx: ', idx);
      console.log('errors.exercises[idx]: ', errors.exercises[idx]);
      return true;
    }
    if (!touched || !touched.exercises || !touched.exercises[idx]) {
      return true;
    }

    /*     console.log('values: ', values);
    console.log('exercise: ', exercise);
    if (!values[idx]) {
      return true;
    } */

    console.log(
      'values.form.values[idx].name: ',
      values.form.values[idx].name,
    );
    console.log(
      'values.form.values[idx].weight: ',
      values.form.values[idx].weight,
    );
    console.log('exercise.name: ', exercise.name);
    console.log('exercise.weight: ', exercise.weight);

    if (
      values.form.values[idx].name === exercise.name &&
      values.form.values[idx].weight === exercise.weight
    ) {
      return true;
    }

    return false;
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
   * Updates exercise to db using values from form row
   * @param {values} values to be used to update
   * @param {exercise} exercise for the original values
   */
  async function updateExercise(
    touched: any,
    errors: any,
    values: any,
    exercise: TrainingMaxWeight,
  ) {
    console.log('touched: ', touched);
    console.log('errors: ', errors);

    const updatedExercise = JSON.parse(
      JSON.stringify(exercise),
    ) as TrainingMaxWeight;

    if (values.name) {
      updatedExercise.name = values.name;
    }
    if (values.weight) {
      updatedExercise.weight = values.weight;
    }

    await API.graphql({
      query: updateTrainingMaxExercise,
      variables: { input: updatedExercise },
    });
    await API.graphql({
      query: createTrainingMaxExerciseHistory,
      variables: {
        input: {
          name: updatedExercise.name,
          weight: updatedExercise.weight,
        },
      },
    });
  }

  return (
    <div id="UpdateTrainingMaxExercise">
      <h2>Update Training Max Exercise</h2>
      <Link to="/fitness-tracker">Back</Link>
      {authState === AuthState.SignedIn && user ? (
        <>
          {!isLoading ? (
            <div id="UpdateTrainingMaxExerciseContainer">
              <Formik
                initialValues={{ ...exercises }}
                validationSchema={trainingMaxSchema}
                onSubmit={() => {}}
              >
                {({ touched, errors }) => (
                  <Form>
                    <FieldArray name="TrainingMaxFieldArray">
                      {(values) => (
                        <table id="UpdateTrainingMaxExerciseTable">
                          <thead>
                            <tr>
                              <th scope="col">Exercise Name</th>
                              <th scope="col">Weight (kg)</th>
                              <th scope="col">Created On</th>
                              <th scope="col">Updated On</th>
                            </tr>
                          </thead>
                          <tbody>
                            {exercises.map((exercise, idx) => (
                              <tr key={exercise.id}>
                                <td>
                                  <Field
                                    name={`exercises.${idx}.name`}
                                    defaultValue={exercise.name}
                                    type="text"
                                  />
                                  <ErrorMessage
                                    name={`exercises.${idx}.name`}
                                    component="span"
                                    className="error"
                                  />
                                </td>
                                <td>
                                  <Field
                                    name={`exercises.${idx}.weight`}
                                    defaultValue={exercise.weight}
                                    type="number"
                                  />
                                  <ErrorMessage
                                    name={`exercises.${idx}.weight`}
                                    component="span"
                                    className="error"
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
                                    disabled={buttonDisabler(
                                      touched,
                                      errors,
                                      idx,
                                      values,
                                      exercise,
                                    )}
                                    type="button"
                                    onClick={() =>
                                      updateExercise(
                                        touched,
                                        errors,
                                        values.form.values.exercises[
                                          idx
                                        ],
                                        exercise,
                                      )
                                    }
                                  >
                                    Save
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </FieldArray>
                  </Form>
                )}
              </Formik>
            </div>
          ) : (
            <div className="UpdateWeeklyExerciseContainer">
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

export default UpdateTrainingMaxExercise;
