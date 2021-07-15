import { useState, useEffect } from 'react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { CognitoUserInterface } from '@aws-amplify/ui-components';
import { API } from 'aws-amplify';
import { listTrainingMaxExercises } from '../graphql/queries';
import { createTrainingMaxExercise } from '../graphql/mutations';
import { Link } from "react-router-dom";
import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import moment from "moment-timezone";
import '../assets/css/UpdateTrainingMaxExercise.css';

type trainingMaxWeight = {
    id: string,
    name: string,
    weight: number,
    createdOn: Date,
    updatedOn: Date
}

type trainingMaxWeights = Array<trainingMaxWeight>

/**
 * Page to allow authenticated user to update a new training max exercise in the database
 */
const UpdateTrainingMaxExercise = () => {
    const [oldExerciseValues, setOldExerciseValues] = useState<trainingMaxWeights>([]);
    const [newExerciseValues, setNewExerciseValues] = useState<trainingMaxWeights>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const [authState, setAuthState] = useState<AuthState>();
    const [user, setUser] = useState<CognitoUserInterface | undefined>();

    //not always loading for some reason :(

    /**
     * Sets auth state and fetches on change
     */
     useEffect(() => {
        onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData as CognitoUserInterface);
        });
        
        fetchExercises();
    }, []);

    /**
     * Fetches exercises from training max db. Sorts by updatedOn and then by name. Creates a new array of only the newest weight values and then sets it
     */    
    async function fetchExercises() {
        const listTrainingMaxExercisesData: any = await API.graphql({ query: listTrainingMaxExercises })
        const trainingMaxWeights: trainingMaxWeights = listTrainingMaxExercisesData.data.listTrainingMaxExercises.items;

        trainingMaxWeights.sort(function(a, b) {
            return a.name.localeCompare(b.name) || +new Date(b.updatedOn) - +new Date(a.updatedOn); //+ symbol forces date to be interpreted as a number
        });

        let weightArray: trainingMaxWeights = [];
        let currentExerciseName = "";

        for(let trainingMaxWeight of trainingMaxWeights) {
            if(currentExerciseName !== trainingMaxWeight.name) {
                weightArray.push(trainingMaxWeight);
                currentExerciseName = trainingMaxWeight.name
            }
        }

        setOldExerciseValues(weightArray);
        setNewExerciseValues(JSON.parse(JSON.stringify(weightArray))); //only the second needs to pass by value

        setIsLoaded(true);
    }

    /**
     * Updates exercise to db using form data
     * @param {number} idx id key of exercise to be updated
     */  
    async function updateExercise(idx: number) {
        if( oldExerciseValues[idx].weight !== newExerciseValues[idx].weight) {
            console.log("Setting exercise values for row " + idx + 1);
            await API.graphql({ query: createTrainingMaxExercise, variables: { input: { name: newExerciseValues[idx].name, weight: newExerciseValues[idx].weight } } });
            setOldExerciseValues(JSON.parse(JSON.stringify([...newExerciseValues]))); //have to update in case multiple changes on the same page
            console.log("New exercise values have been set for row " + idx + 1);
        } else {
            console.log("No exercise values to change on this row.");
        }
        
    }

    /**
     * Updates exercise function variable using form data
     */  
    const updateFieldChanged = (index: number) => (e: any) => {
        console.log("Detected field change!");
        let newArr = [...newExerciseValues];

        newArr[index].weight = e.target.value;
        newArr[index].updatedOn = new Date (moment().toISOString());

        setNewExerciseValues(newArr);
    }

    return authState === AuthState.SignedIn && user ? (
        <div id="UpdateTrainingMaxExercise">
            <h2>Update Training Max Exercise</h2>
            <Link to="/fitness-tracker">
                Back
            </Link>
            {isLoaded && oldExerciseValues !== null && newExerciseValues !== null ? (
                <div id="UpdateTrainingMaxExerciseContainer">
                    <table id="UpdateTrainingMaxExerciseTable">
                        <thead>
                            <tr>
                                <th scope="col">
                                    Exercise Name
                                </th>
                                <th scope="col">
                                    Weight (kg)
                                </th>
                                <th scope="col">
                                    Created On
                                </th>
                                <th scope="col">
                                    Updated On
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                newExerciseValues.map((exercise, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            {exercise.name}
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="weight"
                                                value={exercise.weight}
                                                onChange={updateFieldChanged(idx)}
                                            />
                                        </td>
                                        <td>
                                            {moment(exercise.createdOn).format('DD-MM-YYYY HH:mm:ss').toString()}
                                        </td>
                                        <td>
                                            {moment(exercise.updatedOn).format('DD-MM-YYYY HH:mm:ss').toString()}
                                        </td>
                                        <td>
                                            <button onClick={() => updateExercise(idx)}>Save</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            ) : (
                <div id="UpdateTrainingMaxExerciseContainer">
                    <h3>Loading! Please wait...</h3>
                </div>
            )}
        </div>
    ) : (
        <AmplifyAuthenticator>
            <AmplifySignIn slot="sign-in" hideSignUp />
        </AmplifyAuthenticator>
    );
}

export default UpdateTrainingMaxExercise;