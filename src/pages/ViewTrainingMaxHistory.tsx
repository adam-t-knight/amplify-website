import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import moment from 'moment-timezone';
import { Link, useLocation } from 'react-router-dom';
import { listTrainingMaxExerciseHistorys } from '../graphql/queries';
import '../assets/css/ViewTrainingMaxHistory.css';

type TrainingMaxWeight = {
  id: string;
  name: string;
  weight: number;
  createdOn: Date;
  updatedOn: Date;
};

type TrainingMaxWeights = Array<TrainingMaxWeight>;

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

    if (location.state) {
      // const { name } = location.state;

      const weightArray: TrainingMaxWeights = [];

      console.log(`trainingMaxName: ${trainingMaxName}`);

      // if("".localeCompare(name) !== 0) {
      if (''.localeCompare(trainingMaxName) !== 0) {
        console.log('training max name is not empty');
        history.forEach((trainingMaxWeight) => {
          if (
            trainingMaxWeight.name.localeCompare(trainingMaxName) ===
            0
          ) {
            weightArray.push(trainingMaxWeight);
          }
        });
        /*         for (const trainingMaxWeight of trainingMaxHistory) {
          // if(trainingMaxWeight.name.localeCompare(name) === 0) {
          if (
            trainingMaxWeight.name.localeCompare(trainingMaxName) ===
            0
          ) {
            weightArray.push(trainingMaxWeight);
          }
        } */
      }

      weightArray.sort(
        (a, b) =>
          a.name.localeCompare(b.name) ||
          +new Date(b.updatedOn) - +new Date(a.updatedOn), // + symbol forces date to be interpreted as a number
      );

      setTrainingMaxHistory(weightArray);
    } else {
      console.log('no location.state');
      trainingMaxHistory.sort(
        (a, b) =>
          a.name.localeCompare(b.name) ||
          +new Date(b.updatedOn) - +new Date(a.updatedOn), // + symbol forces date to be interpreted as a number
      );
      setTrainingMaxHistory(trainingMaxHistory);
    }

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
      <h3>Selected Exercise: {location.state.name}</h3>
      <Link to="/fitness-tracker">Back</Link>
      {isLoaded && trainingMaxHistory !== null ? (
        <div id="ViewTrainingMaxHistoryContainer">
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
