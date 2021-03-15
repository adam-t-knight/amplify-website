import { Fragment } from "react";
import '../assets/css/WeeklyFitnessTable.css';

type weeklyExercise = {
    day: string,
    name: string,
    reps: string,
    weight: number
}

type weeklyExercises = Array<weeklyExercise>

function WeeklyFitnessTable(props : {weeklyExercises : weeklyExercises}) {
    const { weeklyExercises } = props;

    return (
        <div id="WeeklyFitnessTable">
            <h2>Weekly Exercises</h2>
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
                            weeklyExercises.map((exercise, idx) => (
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
        </div>
    )
}

export default WeeklyFitnessTable;