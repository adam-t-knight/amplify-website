import { useState, useEffect } from 'react';
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify'
import { API } from 'aws-amplify';
import { listWeeklyExercises } from '../graphql/queries';
import { updateWeeklyExercise } from '../graphql/mutations';
import { Link } from "react-router-dom";
import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import moment from "moment-timezone";
import '../assets/css/UpdateWeeklyExercise.css';

/**
 * Page to allow authenticated user to update a new weekly exercise in the database
 */
const UpdateWeeklyExercise = () => {
    const blankExercise = { dayOfWeekNum: '', name: '', exerciseNum: '', setNum: '', reps: '', ratio: '' }
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
     * Fetches exercises from weekly exercise table
     */    
    async function fetchExercises() {
        const apiData = await API.graphql({ query: listWeeklyExercises }); 
        const weeklyExercises = apiData.data.listWeeklyExercises.items;

        weeklyExercises.sort(function(a, b) {
            return a.dayOfWeekNum - b.dayOfWeekNum || a.exerciseNum - b.exerciseNum || a.setNum - b.setNum;
        });

        setOldExerciseValues(weeklyExercises);
        setNewExerciseValues(JSON.parse(JSON.stringify(weeklyExercises))); //only the second needs to pass by value
    }

    /**
     * Updates exercise to db using form data
     * @param {string} idx id key of exercise to be updated
     */ 
    async function updateExercise(idx) {
        if( oldExerciseValues[idx].dayOfWeekNum !== newExerciseValues[idx].dayOfWeekNum ||
            oldExerciseValues[idx].name !== newExerciseValues[idx].name ||
            oldExerciseValues[idx].exerciseNum !== newExerciseValues[idx].exerciseNum ||
            oldExerciseValues[idx].setNum !== newExerciseValues[idx].setNum ||
            oldExerciseValues[idx].reps !== newExerciseValues[idx].reps ||
            oldExerciseValues[idx].ratio !== newExerciseValues[idx].ratio) {
            await API.graphql({ query: updateWeeklyExercise, variables: { input: newExerciseValues[idx] } });
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
        <div id="UpdateWeeklyExercise">
            <h2>Update Weekly Exercise</h2>
            <Link to="/fitness-tracker">
                Back
            </Link>
            <div id="UpdateWeeklyExerciseContainer">
                <table id="UpdateWeeklyExerciseTable">
                    <thead>
                        <tr>
                            <th scope="col">
                                Day of Week Number
                            </th>
                            <th scope="col">
                                Exercise Name
                            </th>
                            <th scope="col">
                                Exercise Number
                            </th>
                            <th scope="col">
                                Set Number
                            </th>
                            <th scope="col">
                                Reps
                            </th>
                            <th scope="col">
                                Ratio
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
                                            type="number"
                                            name="dayOfWeekNum"
                                            value={exercise.dayOfWeekNum}
                                            onChange={updateFieldChanged(idx)}
                                        />
                                    </td>
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
                                            name="exerciseNum"
                                            value={exercise.exerciseNum}
                                            onChange={updateFieldChanged(idx)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="setNum"
                                            value={exercise.setNum}
                                            onChange={updateFieldChanged(idx)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="reps"
                                            value={exercise.reps}
                                            onChange={updateFieldChanged(idx)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="ratio"
                                            value={exercise.ratio}
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

export default UpdateWeeklyExercise;