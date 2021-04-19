import { Link } from "react-router-dom";
import '../assets/css/WeeklyFitnessTable.css';

type weeklyExercise = {
    id: string,
    dayOfWeek: string,
    dayOfWeekNum: number,
    name: string,
    exerciseNum: number,
    setNum: number,
    reps: string,
    weight: number,
    ratio: number
}

type weeklyExercises = Array<weeklyExercise>

/**
 * Component for showing weekly fitness exercises in a table. Populates table based on exercises passed to it.
 */
function WeeklyFitnessTable(props : {weeklyExercises : weeklyExercises}) {
    const { weeklyExercises } = props;

    return (
        <div id="WeeklyFitnessTable">
            <h2>Weekly Exercises</h2>
            <div id="WeeklyFitnessTableLinkBlock">
                <Link to="/fitness-tracker/update-weekly-exercise">
                    Update Weekly Exercise
                </Link>
                <Link to="/fitness-tracker/create-weekly-exercise">
                    Create Weekly Exercise
                </Link>
                <Link to="/fitness-tracker/delete-weekly-exercise">
                    Delete Weekly Exercise
                </Link>
            </div>
            <div id="WeeklyContainer" className="table-responsive">
                <table id="WeeklyTable" className="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                Day of Week
                            </th>
                            <th scope="col">
                                Name
                            </th>
                            <th scope="col">
                                Reps
                            </th>
                            <th scope="col">
                                Weight (kg)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            weeklyExercises.map((exercise, idx) => (
                                <tr key={idx} className={exercise.dayOfWeek}>
                                    <td>
                                        {exercise.dayOfWeek}
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