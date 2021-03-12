import moment from "moment-timezone";
import '../assets/css/TrainingMaxFitnessTable.css';

type trainingMaxExercise = {
    id: string,
    name: string,
    weight: number,
    createdOn: Date,
    updatedOn: Date
}

type trainingMaxExercises = Array<trainingMaxExercise>

function TrainingMaxFitnessTable(props : {trainingMaxExercises : trainingMaxExercises}) {
    const { trainingMaxExercises } = props;

    return (
        <div className="TrainingMaxContainer">
            <table id="TrainingMaxTable">
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
                        trainingMaxExercises.map((exercise, idx) => (
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
    )
}

export default TrainingMaxFitnessTable;