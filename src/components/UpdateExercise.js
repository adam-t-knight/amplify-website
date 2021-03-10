import { useState, useEffect } from 'react';
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify'
import { API } from 'aws-amplify';
import { listExercises } from '../graphql/queries';
import { updateExercise as updateExerciseMutation } from '../graphql/mutations';
import { Link } from "react-router-dom";
import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import moment from "moment-timezone";
import '../assets/css/UpdateExercise.css';

const UpdateExercise = () => {
    const blankExercise = { name: '', weight: ''}
    const [oldExerciseValues, setOldExerciseValues] = useState([{ ...blankExercise }]);
    const [newExerciseValues, setNewExerciseValues] = useState([{ ...blankExercise }]);
    
    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        console.log("in use effect!");
        onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData);
        });
        fetchExercises();
    }, []);

    async function fetchExercises() {
        const apiData = await API.graphql({ query: listExercises }); 
        setOldExerciseValues(apiData.data.listExercises.items);
        setNewExerciseValues(JSON.parse(JSON.stringify(apiData.data.listExercises.items))); //only the second needs to pass by value
    }

    //this needs regex to check for values eventually. not secure because im directly hitting the DB from javascript! move calls to lambdas?
    async function updateExercise(idx) {
        if( oldExerciseValues[idx].name !== newExerciseValues[idx].name ||
            oldExerciseValues[idx].weight !== newExerciseValues[idx].weight) {
            await API.graphql({ query: updateExerciseMutation, variables: { input: newExerciseValues[idx] } });
            setOldExerciseValues(JSON.parse(JSON.stringify([...newExerciseValues]))); //have to update in case multiple changes on the same page
            console.log("New exercise values have been set for row " + idx + 1);
        } else {
            console.log("No exercise values to change on this row.");
        }
        
    }

    const updateFieldChanged = index => e => {
        let newArr = [...newExerciseValues];

        newArr[index][e.target.name] = e.target.value; //[e.target.name] is like newArr[index].name or .weight but as a variable
        newArr[index].updatedOn = moment().toISOString();

        setNewExerciseValues(newArr);
    }

    return Auth.user ? (
        <div id="UpdateExercise">
            <h1>Update Exercise</h1>
            <Link to="/fitness-tracker">
                Back
            </Link>
            <div id="UpdateExerciseContainer">
                <table id="UpdateExerciseTable">
                    <thead>
                        <tr>
                            <th scope="col">
                                Number
                            </th>
                            <th scope="col">
                                Name
                            </th>
                            <th scope="col">
                                Weight (lbs)
                            </th>
                            <th scope="col">
                                Created On
                            </th>
                            <th scope="col">
                                Updated On
                            </th>
                            <th scope="col" />
                        </tr>
                    </thead>
                    <tbody>
                        {
                            newExerciseValues.map((exercise, idx) => (
                                <tr key={exercise.id}>
                                    <td>
                                        {idx + 1}
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

export default UpdateExercise;