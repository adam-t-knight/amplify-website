import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listExercises } from '../graphql/queries';
import { Link } from "react-router-dom";
import TrainingMaxFitnessTable from "../components/TrainingMaxFitnessTable";
import WeeklyFitnessTable from "../components/WeeklyFitnessTable";
import moment from "moment-timezone";
import '../assets/css/FitnessTracker.css';

type exercise = {
    id: string,
    name: string,
    weight: number,
    createdOn: Date,
    updatedOn: Date
}

type exercises = Array<exercise>

function FitnessTracker() {
    const [exerciseList, setExerciseList] = useState<exercises>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const currentDayOfWeek = moment().format('dddd').toString();

    useEffect(() => {
        fetchExercises();
    }, []);

    async function fetchExercises() {
        const apiData: any = await API.graphql({ query: listExercises })
        if(apiData) {
            setExerciseList(apiData.data.listExercises.items);
            setIsLoaded(true);
        }
    }

    return (
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
            {isLoaded && exerciseList !== null ? (
                <div id="FitnessTrackerContainer">
                    <TrainingMaxFitnessTable trainingMaxExercises={exerciseList} />
                    <WeeklyFitnessTable trainingMaxExercises={exerciseList} />
                </div>
            ) : (
                <div id="FitnessTrackerContainer">
                    <h2>Loading! Please wait...</h2>
                </div>
            )}
        </div>
    );
}

export default FitnessTracker;