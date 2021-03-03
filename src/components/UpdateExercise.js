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
    const [exerciseState, setExerciseState] = useState([{ ...blankExercise }]);
    
    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData);
        });
        fetchExercises();
    }, []);

    async function fetchExercises() {
        const apiData = await API.graphql({ query: listExercises });
        setExerciseState(apiData.data.listExercises.items);
    }

    async function updateExercise(idx) {      
        await API.graphql({ query: updateExerciseMutation, variables: { input: exerciseState[idx] } });
    }

    const updateFieldChanged = index => e => {
        let newArr = [...exerciseState];

        if(e.target.name == "weight") {
            newArr[index].weight = e.target.value;
        } 
        
        if(e.target.name == "name") {
            newArr[index].name = e.target.value;
        }

        newArr[index].updatedOn = moment().toISOString();

        setExerciseState(newArr);
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
                                Name
                            </th>
                            <th scope="col">
                                Weight
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
                            exerciseState.map((exercise, idx) => (
                                <tr key={exercise.id}>
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
                                            type="text"
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