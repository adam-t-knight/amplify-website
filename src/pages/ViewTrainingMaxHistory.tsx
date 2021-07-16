import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listTrainingMaxExerciseHistorys } from '../graphql/queries';
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import '../assets/css/ViewTrainingMaxHistory.css';

type trainingMaxWeight = {
    id: string,
    name: string,
    weight: number,
    createdOn: Date,
    updatedOn: Date
}

type trainingMaxWeights = Array<trainingMaxWeight>

function TrainingMaxHistory() {
    const [trainingMaxHistory, setTrainingMaxHistory] = useState<trainingMaxWeights>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        populateWeights();
    }, []);

    async function populateWeights() {
        const listTrainingMaxExerciseHistorysData: any = await API.graphql({ query: listTrainingMaxExerciseHistorys })
        const trainingMaxHistory: trainingMaxWeights = listTrainingMaxExerciseHistorysData.data.listTrainingMaxExerciseHistorys.items;

        trainingMaxHistory.sort(function(a, b) {
            return a.name.localeCompare(b.name) || +new Date(b.updatedOn) - +new Date(a.updatedOn); //+ symbol forces date to be interpreted as a number
        });

        setTrainingMaxHistory(trainingMaxHistory);

        setIsLoaded(true);
    }

    return (
        <div id="ViewTrainingMaxHistory">
            <h2>Update Training Max Exercise</h2>
            <Link to="/fitness-tracker">
                Back
            </Link>
            {isLoaded && trainingMaxHistory !== null ? (
                <div id="ViewTrainingMaxHistoryContainer">
                    <table id="ViewTrainingMaxHistoryTable">
                        <thead>
                            <tr>
                                <th scope="col">
                                    Exercise Name
                                </th>
                                <th scope="col">
                                    Weight (kg)
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
                            trainingMaxHistory.map((history) => (
                                <tr key={history.id}>
                                    <td>
                                        {history.name}
                                    </td>
                                    <td>
                                        {history.weight}
                                    </td>
                                    <td>
                                        {moment(history.createdOn).format('DD-MM-YYYY HH:mm:ss').toString()}
                                    </td>
                                    <td>
                                        {moment(history.updatedOn).format('DD-MM-YYYY HH:mm:ss').toString()}
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            ) : (
                <div id="ViewTrainingMaxHistoryContainer">
                    <h3>Loading! Please wait...</h3>
                </div>
            )}
        </div>
    );
}

export default TrainingMaxHistory;