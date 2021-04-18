import { useState, useEffect } from 'react';
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify'
import { API } from 'aws-amplify';
import { listTrainingMaxExercises } from '../graphql/queries';
import { updateTrainingMaxExercise } from '../graphql/mutations';
import { Link } from "react-router-dom";
import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import moment from "moment-timezone";
import '../assets/css/UpdateTrainingMaxExercise.css';

/**
 * Page to allow authenticated user to update a new training max exercise in the database
 */
const UpdateTrainingMaxExercise = () => {
    const blankExercise = { name: '', weight: ''}
    const [oldExerciseValues, setOldExerciseValues] = useState([{ ...blankExercise }]);
    const [newExerciseValues, setNewExerciseValues] = useState([{ ...blankExercise }]);
    
    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();

    /**
     * Sets auth state and fetches on change
     */
    useEffect(() => {
        onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData);
        });
        fetchExercises();
    }, []);

    /**
     * Fetches exercises from training max db
     */    
    async function fetchExercises() {
        const apiData = await API.graphql({ query: listTrainingMaxExercises }); 
        const trainingMaxExercises = apiData.data.listTrainingMaxExercises.items;

        setOldExerciseValues(trainingMaxExercises);
        setNewExerciseValues(JSON.parse(JSON.stringify(trainingMaxExercises))); //only the second needs to pass by value
    }

    /**
     * Updates exercise to db using form data
     * @param {string} idx id key of exercise to be updated
     */  
    async function updateExercise(idx) {
        if( oldExerciseValues[idx].name !== newExerciseValues[idx].name ||
            oldExerciseValues[idx].weight !== newExerciseValues[idx].weight) {
            await API.graphql({ query: updateTrainingMaxExercise, variables: { input: newExerciseValues[idx] } });
            setOldExerciseValues(JSON.parse(JSON.stringify([...newExerciseValues]))); //have to update in case multiple changes on the same page
            console.log("New exercise values have been set for row " + idx + 1);
        } else {
            console.log("No exercise values to change on this row.");
        }
        
    }

    /**
     * Updates exercise function variable using form data
     */  
    const updateFieldChanged = index => e => {
        let newArr = [...newExerciseValues];

        newArr[index][e.target.name] = e.target.value; //[e.target.name] is like newArr[index].name or .weight but as a variable
        newArr[index].updatedOn = moment().toISOString();

        setNewExerciseValues(newArr);
    }

    return Auth.user ? (
        <div id="UpdateTrainingMaxExercise">
            <h2>Update Training Max Exercise</h2>
            <Link to="/fitness-tracker">
                Back
            </Link>
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
        </div>
    ) : (
        <AmplifyAuthenticator hideDefault={true}>
            <AmplifySignIn slot="sign-in" hideSignUp />
        </AmplifyAuthenticator>
    );
}

export default UpdateTrainingMaxExercise;