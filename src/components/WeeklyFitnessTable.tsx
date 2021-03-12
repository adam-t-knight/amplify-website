import { useState, useEffect } from 'react';
import '../assets/css/WeeklyFitnessTable.css';

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

const BACK_SQUAT = "Back Squat";
const CHEST_PRESS = "Chest Press";
const BENCH_PRESS = "Bench Press";
const DEADLIFT = "Deadlift";
const OVERHEAD_PRESS = "Overhead Press";

type weeklyExercise = {
    day: string,
    name: string,
    reps: string,
    weight: number
}

type weeklyExercises = Array<weeklyExercise>

type trainingMaxExercise = {
    id: string,
    name: string,
    weight: number,
    createdOn: Date,
    updatedOn: Date
}

type trainingMaxExercises = Array<trainingMaxExercise>

function WeeklyFitnessTable(props : {trainingMaxExercises : trainingMaxExercises}) {
    const { trainingMaxExercises } = props;

    const [backSquatWeight, setBackSquatWeight] = useState(0);
    const [chestPressWeight, setChestPressWeight] = useState(0);
    const [benchPressWeight, setBenchPressWeight] = useState(0);
    const [deadliftWeight, setDeadliftWeight] = useState(0);
    const [overheadPressWeight, setOverheadPressWeight] = useState(0);
    const [tableData, setTableData] = useState<weeklyExercises>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(false);
        populateWeights();
        populateTableData();
        setIsLoaded(true);
    }, []);

    function populateWeights() {
        trainingMaxExercises.map((exercise) => {
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

    function populateTableData() {
        let exerciseArray: weeklyExercises = [];      

        for(let chestPress of SUNDAY_CHEST_PRESS) {
            const newWeeklyExercise = {} as weeklyExercise;
            
            newWeeklyExercise.day = "Sunday";
            newWeeklyExercise.name = "Chest Press";
            newWeeklyExercise.reps = chestPress.reps;
            newWeeklyExercise.weight = roundToNearestFive(chestPress.ratio * chestPressWeight);
            
            exerciseArray.push(newWeeklyExercise);
        }

        for(let overheadPress of SUNDAY_OVERHEAD_PRESS) {
            const newWeeklyExercise = {} as weeklyExercise;

            newWeeklyExercise.day = "Sunday";
            newWeeklyExercise.name = "Overhead Press";
            newWeeklyExercise.reps = overheadPress.reps;
            newWeeklyExercise.weight = roundToNearestFive(overheadPress.ratio * overheadPressWeight);
            
            exerciseArray.push(newWeeklyExercise);
        }

        for(let backSquat of MONDAY_BACK_SQUAT) {
            const newWeeklyExercise = {} as weeklyExercise;

            newWeeklyExercise.day = "Monday";
            newWeeklyExercise.name = "Back Squat";
            newWeeklyExercise.reps = backSquat.reps;
            newWeeklyExercise.weight = roundToNearestFive(backSquat.ratio * backSquatWeight);
            
            exerciseArray.push(newWeeklyExercise);
        }

        for(let sumoDeadlift of MONDAY_SUMO_DEADLIFT) {
            const newWeeklyExercise = {} as weeklyExercise;

            newWeeklyExercise.day = "Monday";
            newWeeklyExercise.name = "Sumo Deadlift";
            newWeeklyExercise.reps = sumoDeadlift.reps;
            newWeeklyExercise.weight = roundToNearestFive(sumoDeadlift.ratio * deadliftWeight);
            
            exerciseArray.push(newWeeklyExercise);
        }

        for(let overheadPress of WEDNESDAY_OVERHEAD_PRESS) {
            const newWeeklyExercise = {} as weeklyExercise;

            newWeeklyExercise.day = "Wednesday";
            newWeeklyExercise.name = "Overhead Press";
            newWeeklyExercise.reps = overheadPress.reps;
            newWeeklyExercise.weight = roundToNearestFive(overheadPress.ratio * overheadPressWeight);
            
            exerciseArray.push(newWeeklyExercise);
        }

        for(let inclineBenchPress of WEDNESDAY_INCLINE_BENCH_PRESS) {
            const newWeeklyExercise = {} as weeklyExercise;

            newWeeklyExercise.day = "Wednesday";
            newWeeklyExercise.name = "Incline Bench Press";
            newWeeklyExercise.reps = inclineBenchPress.reps;
            newWeeklyExercise.weight = roundToNearestFive(inclineBenchPress.ratio * benchPressWeight);
            
            exerciseArray.push(newWeeklyExercise);
        }

        for(let deadlift of THURSDAY_DEADLIFT) {
            const newWeeklyExercise = {} as weeklyExercise;

            newWeeklyExercise.day = "Thursday";
            newWeeklyExercise.name = "Deadlift";
            newWeeklyExercise.reps = deadlift.reps;
            newWeeklyExercise.weight = roundToNearestFive(deadlift.ratio * deadliftWeight);
            
            exerciseArray.push(newWeeklyExercise);
        }

        for(let frontSquat of THURSDAY_FRONT_SQUAT) {
            const newWeeklyExercise = {} as weeklyExercise;

            newWeeklyExercise.day = "Thursday";
            newWeeklyExercise.name = "Front Squat";
            newWeeklyExercise.reps = frontSquat.reps;
            newWeeklyExercise.weight = roundToNearestFive(frontSquat.ratio * benchPressWeight);
            
            exerciseArray.push(newWeeklyExercise);
        }

        for(let benchPress of FRIDAY_BENCH_PRESS) {
            const newWeeklyExercise = {} as weeklyExercise;

            newWeeklyExercise.day = "Friday";
            newWeeklyExercise.name = "Bench Press";
            newWeeklyExercise.reps = benchPress.reps;
            newWeeklyExercise.weight = roundToNearestFive(benchPress.ratio * benchPressWeight);
            
            exerciseArray.push(newWeeklyExercise);
        }

        for(let closeGripBenchPress of FRIDAY_CLOSE_GRIP_BENCH_PRESS) {
            const newWeeklyExercise = {} as weeklyExercise;

            newWeeklyExercise.day = "Friday";
            newWeeklyExercise.name = "Close Grip Bench Press";
            newWeeklyExercise.reps = closeGripBenchPress.reps;
            newWeeklyExercise.weight = roundToNearestFive(closeGripBenchPress.ratio * benchPressWeight);
            
            exerciseArray.push(newWeeklyExercise);
        }

        setTableData(exerciseArray);
    }

    function roundToNearestFive(value: number) {
        
        return Math.round(value / 5) * 5;

    }

    return isLoaded ? (

        <div id="WeeklyContainer" className="table-responsive">
            <table id="WeeklyTable" className="table">
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
                            Weight (lbs)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((exercise, idx) => (
                            <tr key={"WeeklyTableRow" + idx}>
                                <td>
                                    {exercise.day}
                                </td>
                                <td>
                                    {exercise.name}
                                </td>
                                <td>
                                    {exercise.reps}
                                </td>
                                <td>
                                    {exercise.weight}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    ) : (
        <h2>Loading! Please wait...</h2>
    );
}

export default WeeklyFitnessTable;