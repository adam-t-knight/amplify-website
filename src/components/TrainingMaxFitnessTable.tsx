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

function TrainingMaxFitnessTable(props : {exercises : exercises}) {
    const { exercises } = props;

    return (
        <div className="FitnessTracker">
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
        </div>
    )
}

export default TrainingMaxFitnessTable;