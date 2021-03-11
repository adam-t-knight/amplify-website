import { useState, useEffect } from 'react';
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify'
import { API } from 'aws-amplify';
import { listExercises } from '../graphql/queries';
import { deleteExercise as deleteExerciseMutation } from '../graphql/mutations';
import { Link } from "react-router-dom";
import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import moment from "moment-timezone";
import '../assets/css/DeleteExercise.css';

const DeleteExercise = () => {
    const [exercises, setExercises] = useState([]);
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
        setExercises(apiData.data.listExercises.items);
    }

    async function deleteExercise({ id }) {
        const newExercisesArray = exercises.filter(exercise => exercise.id !== id);
        setExercises(newExercisesArray);
        await API.graphql({ query: deleteExerciseMutation, variables: { input: { id } }});
    }

    return Auth.user ? (
        <div id="DeleteExercise">
            <h1>Delete Exercise</h1>
            <Link to="/fitness-tracker">
                Back
            </Link>
            <div id="DeleteExerciseContainer">
            <table id="DeleteExerciseTable">
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
                        exercises.map((exercise, idx) => (
                            <tr key={exercise.id}>
                                <td>
                                    {idx + 1}
                                </td>
                                <td>
                                    {exercise.name}
                                </td>
                                <td>
                                    {exercise.weight}
                                </td>
                                <td>
                                    {moment(exercise.createdOn).format('DD-MM-YYYY HH:mm:ss').toString()}
                                </td>
                                <td>
                                    {moment(exercise.updatedOn).format('DD-MM-YYYY HH:mm:ss').toString()}
                                </td>
                                <td>
                                    <button onClick={() => deleteExercise(exercise)}>Delete</button>
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

export default DeleteExercise;