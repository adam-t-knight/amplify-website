import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listExercises } from '../graphql/queries';
import { Link } from "react-router-dom";
import TrainingMaxFitnessTable from "../components/TrainingMaxFitnessTable";
import WeeklyFitnessTable from "../components/WeeklyFitnessTable";
import moment from "moment-timezone";
import '../assets/css/FitnessTracker.css';

function FitnessTracker() {
    const [exercises, setExercises] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const currentDayOfWeek = moment().format('dddd').toString();

    useEffect(() => {
        fetchExercises();
    }, []);

    async function fetchExercises() {
        const apiData: any = await API.graphql({ query: listExercises })
        if(apiData) {
            setExercises(apiData.data.listExercises.items);
            setIsLoaded(true);
        }
    }

    return isLoaded && exercises !== null ? (
        <div className="FitnessTracker">
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
            <div id="CurrentDayOfWeek">
                Current day of the week: {currentDayOfWeek}
            </div>
            <TrainingMaxFitnessTable exercises={exercises} />
            <WeeklyFitnessTable exercises={exercises} />
        </div>
    ) : (
        <div className="FitnessTracker">
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
            <div className="FitnessTrackerContainer">
                <h2>Loading! Please wait...</h2>
            </div>
        </div>
    );
}

export default FitnessTracker;