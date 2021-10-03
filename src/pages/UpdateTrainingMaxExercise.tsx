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
  getIn,
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
  blankTrainingMaxExercise,
} from '../shared/types/FitnessTrackerTypes';
import { fetchTrainingMaxExercises } from '../shared/lib/FitnessTrackerFetch';

/* need to show confirmation of updating value. set button back to disabled? bug: not currently updating updated on value */

/**
 * Page to allow authenticated user to update a new training max exercise in the database
 */
const UpdateTrainingMaxExercise = () => {
  const [initialExerciseValues, setInitialExerciseValues] =
    useState<TrainingMaxWeights>([{ ...blankTrainingMaxExercise }]);
  const [exercises, setExercises] = useState<TrainingMaxWeights>([
    { ...blankTrainingMaxExercise },
  ]);
  const [authState, setAuthState] = useState<AuthState>();
  const [user, setUser] = useState<
    CognitoUserInterface | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);

  /* problems with require on this. breaks lots of stuff! */
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
    setInitialExerciseValues(
      JSON.parse(JSON.stringify(trainingMaxWeights)),
    ); // only the second needs to pass by value

    setIsLoading(false);
  }

  /**
   * Looks at the arrays of touched fields and fields with errors. Disables button if there are errors or if field hasn't been touched
   */
  function buttonDisabler(
    errors: any,
    values: any,
    exercise: TrainingMaxWeight,
  ) {
    if (!values) {
      return true;
    }

    if (errors) {
      return true;
    }

    if (values.name && values.name !== exercise.name) {
      return false;
    }

    if (values.weight && values.weight !== exercise.weight) {
      return false;
    }

    return true;
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
    values: any,
    exercise: TrainingMaxWeight,
  ) {
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
                initialValues={{ ...initialExerciseValues }}
                validationSchema={trainingMaxSchema}
                onSubmit={() => {}}
              >
                {({ errors }) => (
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
                                      getIn(
                                        errors,
                                        `exercises.${idx}`,
                                      ),
                                      getIn(
                                        values.form.values,
                                        `exercises.${idx}`,
                                      ),
                                      exercise,
                                    )}
                                    type="button"
                                    onClick={() =>
                                      updateExercise(
                                        getIn(
                                          values.form.values,
                                          `exercises.${idx}`,
                                        ),
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
