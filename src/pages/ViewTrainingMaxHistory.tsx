import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import moment from 'moment-timezone';
import { Link, useLocation } from 'react-router-dom';
import { listTrainingMaxExerciseHistorys } from '../graphql/queries';
import '../assets/css/ViewTrainingMaxHistory.css';
import { TrainingMaxWeights } from '../shared/types/FitnessTrackerTypes';

interface LocationState {
  name: string;
}

const TrainingMaxHistory = () => {
  const location = useLocation<LocationState>();
  const [trainingMaxHistory, setTrainingMaxHistory] =
    useState<TrainingMaxWeights>([]);

  // don't put this in a hook! the delay is messing things up
  const [trainingMaxName, setTrainingMaxName] = useState('None');
  const [isLoaded, setIsLoaded] = useState(false);

  async function populateWeights() {
    const listTrainingMaxExerciseHistorysData: any =
      await API.graphql({
        query: listTrainingMaxExerciseHistorys,
      });
    const history: TrainingMaxWeights =
      listTrainingMaxExerciseHistorysData.data
        .listTrainingMaxExerciseHistorys.items;

    let weightArray: TrainingMaxWeights = [];

    if (location.state) {
      const selectedName = location.state.name;
      setTrainingMaxName(selectedName);

      history.forEach((trainingMaxWeight) => {
        if (
          trainingMaxWeight.name.localeCompare(selectedName) === 0
        ) {
          weightArray.push(trainingMaxWeight);
        }
      });
    } else {
      weightArray = history;
    }

    weightArray.sort(
      (a, b) =>
        a.name.localeCompare(b.name) ||
        +new Date(b.updatedOn) - +new Date(a.updatedOn), // + symbol forces date to be interpreted as a number
    );
    setTrainingMaxHistory(weightArray);

    setIsLoaded(true);
  }

  useEffect(() => {
    if (location.state) {
      setTrainingMaxName(location.state.name);
    }
    populateWeights();
  }, []);

  return (
    <div id="ViewTrainingMaxHistory">
      <h2>View Training Max Exercise History</h2>
      <Link to="/fitness-tracker">Back</Link>
      {isLoaded ? (
        <div id="ViewTrainingMaxHistoryContainer">
          <h3>Selected Exercise: {trainingMaxName}</h3>
          <table id="ViewTrainingMaxHistoryTable">
            <thead>
              <tr>
                <th scope="col">Exercise Name</th>
                <th scope="col">Weight (kg)</th>
                <th scope="col">Created On</th>
                <th scope="col">Updated On</th>
              </tr>
            </thead>
            <tbody>
              {trainingMaxHistory.map((history) => (
                <tr key={history.id}>
                  <td>{history.name}</td>
                  <td>{history.weight}</td>
                  <td>
                    {moment(history.createdOn)
                      .format('DD-MM-YYYY HH:mm:ss')
                      .toString()}
                  </td>
                  <td>
                    {moment(history.updatedOn)
                      .format('DD-MM-YYYY HH:mm:ss')
                      .toString()}
                  </td>
                </tr>
              ))}
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
};

export default TrainingMaxHistory;
