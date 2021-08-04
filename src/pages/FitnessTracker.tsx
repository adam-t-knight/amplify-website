import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import moment from 'moment-timezone';
import {
  listTrainingMaxExercises,
  listWeeklyExercises,
} from '../graphql/queries';

import TrainingMaxWeightsTable from '../components/TrainingMaxFitnessTable';
import WeeklyFitnessTable from '../components/WeeklyFitnessTable';
import '../assets/css/FitnessTracker.css';
import {
  TrainingMaxWeights,
  WeeklyExercise,
  WeeklyExercises,
} from '../shared/types/FitnessTrackerTypes';

function FitnessTracker() {
  const [trainingMaxList, setTrainingMaxList] =
    useState<TrainingMaxWeights>([]);
  const [weeklyExerciseList, setWeeklyExerciseList] =
    useState<WeeklyExercises>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const currentDayOfWeek = moment().format('dddd').toString();

  function roundToNearestFive(value: number) {
    return Math.round(value / 5) * 5;
  }

  async function populateWeights() {
    const listTrainingMaxExercisesData: any = await API.graphql({
      query: listTrainingMaxExercises,
    });
    const weights =
      listTrainingMaxExercisesData.data.listTrainingMaxExercises
        .items;

    setTrainingMaxList(weights);

    const trainingMaxMap = new Map(
      weights.map(
        (x: { name: string; weight: number }) =>
          [x.name, x.weight] as [string, number],
      ),
    );

    const listWeeklyExercisesData: any = await API.graphql({
      query: listWeeklyExercises,
    });
    const exercises: WeeklyExercises =
      listWeeklyExercisesData.data.listWeeklyExercises.items;

    const exerciseArray: WeeklyExercises = [];

    exercises.forEach((exercise) => {
      const newWeeklyExercise = {} as WeeklyExercise;

      newWeeklyExercise.id = exercise.id;
      newWeeklyExercise.dayOfWeekNum = exercise.dayOfWeekNum;
      newWeeklyExercise.name = exercise.name;
      newWeeklyExercise.exerciseNum = exercise.exerciseNum;
      newWeeklyExercise.setNum = exercise.setNum;
      newWeeklyExercise.reps = exercise.reps;
      newWeeklyExercise.createdOn = exercise.createdOn;
      newWeeklyExercise.updatedOn = exercise.updatedOn;

      const trainingMaxWeight = trainingMaxMap.get(
        newWeeklyExercise.name,
      ) as number;
      newWeeklyExercise.weight = roundToNearestFive(
        exercise.ratio * trainingMaxWeight,
      );

      switch (exercise.dayOfWeekNum) {
        case 1:
          newWeeklyExercise.dayOfWeek = 'Sunday';
          break;
        case 2:
          newWeeklyExercise.dayOfWeek = 'Monday';
          break;
        case 3:
          newWeeklyExercise.dayOfWeek = 'Tuesday';
          break;
        case 4:
          newWeeklyExercise.dayOfWeek = 'Wednesday';
          break;
        case 5:
          newWeeklyExercise.dayOfWeek = 'Thursday';
          break;
        case 6:
          newWeeklyExercise.dayOfWeek = 'Friday';
          break;
        case 7:
          newWeeklyExercise.dayOfWeek = 'Saturday';
          break;
        default:
          newWeeklyExercise.dayOfWeek = 'Doomsday';
      }

      exerciseArray.push(newWeeklyExercise);
    });

    exerciseArray.sort(
      (a, b) =>
        a.dayOfWeekNum - b.dayOfWeekNum ||
        a.exerciseNum - b.exerciseNum ||
        a.setNum - b.setNum,
    );

    setWeeklyExerciseList(exerciseArray);

    setIsLoaded(true);
  }

  useEffect(() => {
    populateWeights();
  }, []);

  return (
    <div id="FitnessTracker">
      <h1>Fitness Tracker</h1>
      <div id="CurrentDayOfWeek">
        Current day of the week: <strong>{currentDayOfWeek}</strong>
      </div>
      {isLoaded &&
      trainingMaxList !== null &&
      weeklyExerciseList !== null ? (
        <div id="FitnessTrackerContainer">
          <div id="LeftFitnessColumn">
            <TrainingMaxWeightsTable exercises={trainingMaxList} />
          </div>
          <div id="RightFitnessColumn">
            <WeeklyFitnessTable exercises={weeklyExerciseList} />
          </div>
        </div>
      ) : (
        <div id="FitnessTrackerContainer">
          <h3>Loading! Please wait...</h3>
        </div>
      )}
    </div>
  );
}

export default FitnessTracker;
