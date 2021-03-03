import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listExercises } from '../graphql/queries';
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import '../assets/css/FitnessTracker.css';

function FitnessTracker() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetchExercises();
    }, []);

    async function fetchExercises() {
        const apiData = await API.graphql({ query: listExercises });
        setExercises(apiData.data.listExercises.items);
    }

    return (
        <div id="FitnessTracker">
            <h1>Fitness Tracker</h1>
            <Link to="/fitness-tracker/update-exercise">
                Update Exercise
            </Link>
            <Link to="/fitness-tracker/create-exercise">
                Create Exercise
            </Link>
            <Link to="/fitness-tracker/delete-exercise">
                Delete Exercise
            </Link>
            <div id="FitnessTrackerContainer">
                <table id="FitnessTrackerTable">
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            exercises.map((exercise) => (
                                <tr key={exercise.id}>
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
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FitnessTracker;