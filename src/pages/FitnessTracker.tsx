import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listExercises } from '../graphql/queries';
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import '../assets/css/FitnessTracker.css';

const initialExerciseData = {   name: '', 
                                weight: 0,
                                createdOn: new Date(),
                                updatedOn: new Date()
                            }

const initialExercises = {  id: '',
                            name: '', 
                            weight: 0,
                            createdOn: new Date(),
                            updatedOn: new Date()
}

interface exercise {
                        id: string;
                        name: string;
                        weight: number;
                        createdOn: string;
                        updatedOn: string;
}

function FitnessTracker() {
    const BACK_SQUAT = "Back Squat";
    const CHEST_PRESS = "Chest Press";
    const BENCH_PRESS = "Bench Press";
    const DEADLIFT = "Deadlift";
    const OVERHEAD_PRESS = "Overhead Press";

    const [exercises, setExercises] = useState([initialExercises]);
    const [backSquatWeight, setBackSquatWeight] = useState(0);
    const [chestPressWeight, setChestPressWeight] = useState(0);
    const [benchPressWeight, setBenchPressWeight] = useState(0);
    const [deadliftWeight, setDeadliftWeight] = useState(0);
    const [overheadPressWeight, setOverheadPressWeight] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const SUNDAY_CHEST_PRESS = [
        { reps: "5", ratio: .75 },
        { reps: "3", ratio: .85 },
        { reps: "1+", ratio: .95 },
        { reps: "3", ratio: .9 },
        { reps: "5", ratio: .85 },
        { reps: "3", ratio: .8 },
        { reps: "5", ratio: .75 },
        { reps: "3", ratio: .7 },
        { reps: "5", ratio: .65 }
    ];

    const SUNDAY_OVERHEAD_PRESS = [
        { reps: "6", ratio: .5 },
        { reps: "5", ratio: .6 },
        { reps: "3", ratio: .7 },
        { reps: "5", ratio: .7 },
        { reps: "7", ratio: .7 },
        { reps: "4", ratio: .7 },
        { reps: "6", ratio: .7 },
        { reps: "8", ratio: .7 }
    ];

    const MONDAY_BACK_SQUAT = [
        { reps: "5", ratio: .75 },
        { reps: "3", ratio: .85 },
        { reps: "1+", ratio: .95 },
        { reps: "3", ratio: .9 },
        { reps: "3", ratio: .85 },
        { reps: "3", ratio: .8 },
        { reps: "5", ratio: .75 },
        { reps: "5", ratio: .7 },
        { reps: "5", ratio: .65 }
    ];

    const MONDAY_SUMO_DEADLIFT = [
        { reps: "6", ratio: .5 },
        { reps: "5", ratio: .6 },
        { reps: "3", ratio: .7 },
        { reps: "5", ratio: .7 },
        { reps: "7", ratio: .7 },
        { reps: "4", ratio: .7 },
        { reps: "6", ratio: .7 },
        { reps: "8", ratio: .7 }
    ];

    const WEDNESDAY_OVERHEAD_PRESS = [
        { reps: "5", ratio: .75 },
        { reps: "3", ratio: .85 },
        { reps: "1+", ratio: .95 },
        { reps: "3", ratio: .9 },
        { reps: "3", ratio: .85 },
        { reps: "3", ratio: .8 },
        { reps: "5", ratio: .75 },
        { reps: "5", ratio: .7 },
        { reps: "5", ratio: .65 }
    ];

    const WEDNESDAY_INCLINE_BENCH_PRESS = [
        { reps: "6", ratio: .4 },
        { reps: "5", ratio: .5 },
        { reps: "3", ratio: .6 },
        { reps: "5", ratio: .6 },
        { reps: "7", ratio: .6 },
        { reps: "4", ratio: .6 },
        { reps: "6", ratio: .6 },
        { reps: "8", ratio: .6 }
    ];

    const THURSDAY_DEADLIFT = [
        { reps: "5", ratio: .75 },
        { reps: "3", ratio: .85 },
        { reps: "1+", ratio: .95 },
        { reps: "3", ratio: .9 },
        { reps: "3", ratio: .85 },
        { reps: "3", ratio: .8 },
        { reps: "5", ratio: .75 },
        { reps: "5", ratio: .7 },
        { reps: "5", ratio: .65 }
    ];

    const THURSDAY_FRONT_SQUAT = [
        { reps: "6", ratio: .35 },
        { reps: "5", ratio: .45 },
        { reps: "3", ratio: .55 },
        { reps: "5", ratio: .55 },
        { reps: "7", ratio: .55 },
        { reps: "4", ratio: .55 },
        { reps: "6", ratio: .55 },
        { reps: "8", ratio: .55 }
    ];

    const FRIDAY_BENCH_PRESS = [
        { reps: "8", ratio: .65 },
        { reps: "6", ratio: .75 },
        { reps: "4", ratio: .85 },
        { reps: "4", ratio: .85 },
        { reps: "4", ratio: .85 },
        { reps: "5", ratio: .8 },
        { reps: "6", ratio: .75 },
        { reps: "7", ratio: .7 },
        { reps: "8+", ratio: .6 }
    ];

    const FRIDAY_CLOSE_GRIP_BENCH_PRESS = [
        { reps: "6", ratio: .4 },
        { reps: "5", ratio: .5 },
        { reps: "3", ratio: .6 },
        { reps: "5", ratio: .6 },
        { reps: "7", ratio: .6 },
        { reps: "4", ratio: .6 },
        { reps: "6", ratio: .6 },
        { reps: "8", ratio: .6 }
    ];

    useEffect(() => {
        fetchExercises();
    }, []);

    async function fetchExercises() {
        const apiData: any = await API.graphql({ query: listExercises })
        if(apiData) {
            const exerciseItems = apiData.data.listExercises.items;
            for(let exercise of exerciseItems) {
                console.log("inside fetch. exercise.name: " + exercise.name);
            }
            //console.log("got data: " + apiData?.data?.listExercises?.items)
            setExercises(apiData.data.listExercises.items);
            setWeeklyTable();
            setIsLoaded(true);
        }
    }

    function setWeeklyTable() {
        exercises.map((exercise) => {
            console.log("inside set weekly table. exercise.name: " + exercise.name);
            switch (exercise.name) {
                case BACK_SQUAT:
                    setBackSquatWeight(exercise.weight);
                    break;
                case CHEST_PRESS:
                    setChestPressWeight(exercise.weight);
                    break;
                case BENCH_PRESS:
                    setBenchPressWeight(exercise.weight);
                    break;
                case DEADLIFT:
                    setDeadliftWeight(exercise.weight);
                    break;
                case OVERHEAD_PRESS:
                    setOverheadPressWeight(exercise.weight);
                    break;
            }
        });
    }

    function roundUpToNearestFive(value: number) {
        
        console.log("value: " + value);
        return Math.round(value / 5) * 5;

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
            <div className="FitnessTrackerContainer">
                <table id="FitnessTrackerTable">
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
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div id="WeeklyContainer" className="table-responsive">
                <table id="WeeklyTable">
                    <thead>
                        <tr>
                            <th scope="col">
                                Day
                            </th>
                            <th scope="col">
                                Exercise
                            </th>
                            <th scope="col">
                                Reps
                            </th>
                            <th scope="col">
                                Weight
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            SUNDAY_CHEST_PRESS.map((chestPress, idx) => (
                                <tr key={"SundayChestPress" + idx}>
                                    <td>
                                        Sunday
                                    </td>
                                    <td>
                                        Chest Press
                                    </td>
                                    <td>
                                        {chestPress.reps}
                                    </td>
                                    <td>
                                        {roundUpToNearestFive(chestPress.ratio * chestPressWeight)}
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            SUNDAY_OVERHEAD_PRESS.map((overheadPress, idx) => (
                                <tr key={"SundayOverheadPress" + idx}>
                                    <td>
                                        Sunday
                                    </td>
                                    <td>
                                        Overhead Press
                                    </td>
                                    <td>
                                        {overheadPress.reps}
                                    </td>
                                    <td>
                                        {roundUpToNearestFive(overheadPress.ratio * overheadPressWeight)}
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            MONDAY_BACK_SQUAT.map((backSquat, idx) => (
                                <tr key={"MondayBackSquat" + idx}>
                                    <td>
                                        Monday
                                    </td>
                                    <td>
                                        Back Squat
                                    </td>
                                    <td>
                                        {backSquat.reps}
                                    </td>
                                    <td>
                                        {roundUpToNearestFive(backSquat.ratio * backSquatWeight)}
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            MONDAY_SUMO_DEADLIFT.map((sumoDeadlift, idx) => (
                                <tr key={"SundayOverheadPress" + idx}>
                                    <td>
                                        Monday
                                    </td>
                                    <td>
                                        Sumo Deadlift
                                    </td>
                                    <td>
                                        {sumoDeadlift.reps}
                                    </td>
                                    <td>
                                        {roundUpToNearestFive(sumoDeadlift.ratio * deadliftWeight)}
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            WEDNESDAY_OVERHEAD_PRESS.map((overheadPress, idx) => (
                                <tr key={"WednesdayOverheadPress" + idx}>
                                    <td>
                                        Wednesday
                                    </td>
                                    <td>
                                        Overhead Press
                                    </td>
                                    <td>
                                        {overheadPress.reps}
                                    </td>
                                    <td>
                                        {roundUpToNearestFive(overheadPress.ratio * overheadPressWeight)}
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            WEDNESDAY_INCLINE_BENCH_PRESS.map((inclineBenchPress, idx) => (
                                <tr key={"SundayOverheadPress" + idx}>
                                    <td>
                                        Wednesday
                                    </td>
                                    <td>
                                        Incline Bench Press
                                    </td>
                                    <td>
                                        {inclineBenchPress.reps}
                                    </td>
                                    <td>
                                        {roundUpToNearestFive(inclineBenchPress.ratio * benchPressWeight)}
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            THURSDAY_DEADLIFT.map((deadlift, idx) => (
                                <tr key={"ThurdayDeadlift" + idx}>
                                    <td>
                                        Thursday
                                    </td>
                                    <td>
                                        Deadlift
                                    </td>
                                    <td>
                                        {deadlift.reps}
                                    </td>
                                    <td>
                                        {roundUpToNearestFive(deadlift.ratio * deadliftWeight)}
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            THURSDAY_FRONT_SQUAT.map((frontSquat, idx) => (
                                <tr key={"ThurdayFrontSquat" + idx}>
                                    <td>
                                        Thursday
                                    </td>
                                    <td>
                                        Front Squat
                                    </td>
                                    <td>
                                        {frontSquat.reps}
                                    </td>
                                    <td>
                                        {roundUpToNearestFive(frontSquat.ratio * backSquatWeight)}
                                    </td>
                                </tr>
                            ))
                        }
                                                {
                            FRIDAY_BENCH_PRESS.map((benchPress, idx) => (
                                <tr key={"FridayBenchPress" + idx}>
                                    <td>
                                        Friday
                                    </td>
                                    <td>
                                        Bench Press
                                    </td>
                                    <td>
                                        {benchPress.reps}
                                    </td>
                                    <td>
                                        {roundUpToNearestFive(benchPress.ratio * benchPressWeight)}
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            FRIDAY_CLOSE_GRIP_BENCH_PRESS.map((closeGripBenchPress, idx) => (
                                <tr key={"FridayCloseGripBenchPress" + idx}>
                                    <td>
                                        Friday
                                    </td>
                                    <td>
                                        Close Grip Bench Press
                                    </td>
                                    <td>
                                        {closeGripBenchPress.reps}
                                    </td>
                                    <td>
                                        {roundUpToNearestFive(closeGripBenchPress.ratio * benchPressWeight)}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
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