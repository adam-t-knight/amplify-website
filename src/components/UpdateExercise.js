import { useState, useEffect } from 'react';
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify'
import { API, Storage } from 'aws-amplify';
import { listExercises } from '../graphql/queries';
import { updateExercise as updateExerciseMutation } from '../graphql/mutations';
import { Link } from "react-router-dom";
import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import moment from "moment-timezone";

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

    async function updateExercise(idx, { id, name, weight, updatedOn, createdOn }) {
        console.log("inside update exercise");
        console.log("idx: " + idx);
        console.log("id: " + id);
        console.log("name: " + name);
        console.log("weight: " + weight);
        console.log("createdOn: " + createdOn);
        console.log("updatedOn: " + updatedOn);
        
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

        setExerciseState(newArr);
    }

    return Auth.user ? (
        <div id="UpdateExercise">
            <h1>Update Exercise</h1>
            <Link to="/fitness-tracker">
                Back
            </Link>
            <div style={{marginBottom: 30}}>
            {
                exerciseState.map((exercise, idx) => (
                <div key={exercise.id}>
                    <label>Exercise Name: </label>
                    <input
                        type="text"
                        name="name"
                        value={exercise.name}
                        onChange={updateFieldChanged(idx)}
                    />
                    <label>Exercise Weight: </label>
                    <input
                        type="text"
                        name="weight"
                        value={exercise.weight}
                        onChange={updateFieldChanged(idx)}
                    />
                    <p>Created on: {moment(exercise.createdOn).format('ddd, MMM Do YYYY').toString()}</p>
                    <p>Last update on: {moment(exercise.updatedOn).format('ddd, MMM Do YYYY').toString()}</p>
                    <button onClick={() => updateExercise(idx, exercise)}>Update exercise</button>
                </div>
                ))
            }
            </div>
        </div>
    ) : (
        <AmplifyAuthenticator hideDefault={true}>
            <AmplifySignIn slot="sign-in" hideSignUp />
        </AmplifyAuthenticator>
    );
}

export default UpdateExercise;