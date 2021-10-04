import { useState, useEffect } from 'react';
import moment from 'moment-timezone';

import TrainingMaxWeightsTable from '../components/TrainingMaxFitnessTable';
import WeeklyFitnessTable from '../components/WeeklyFitnessTable';
/* import CardioPRsTable from '../components/CardioPRsTable';
import CardioLogTable from '../components/CardioLogTable'; */
import '../assets/css/FitnessTracker.css';
import {
  TrainingMaxWeights,
  WeeklyExercises,
  DisplayWeeklyExercise,
  DisplayWeeklyExercises,
  /*   CardioLogEntries,
  CardioPRs, */
} from '../shared/types/FitnessTrackerTypes';

import {
  fetchTrainingMaxExercises,
  fetchWeeklyExercises,
  /*   fetchCardioPRs,
  fetchCardioLogEntries, */
} from '../shared/lib/FitnessTrackerFetch';

function FitnessTracker() {
  const [trainingMaxList, setTrainingMaxList] =
    useState<TrainingMaxWeights>([]);
  const [weeklyExerciseList, setWeeklyExerciseList] =
    useState<WeeklyExercises>([]);
  const [displayWeeklyExerciseList, setDisplayWeeklyExerciseList] =
    useState<DisplayWeeklyExercises>([]);
  /*   const [cardioLogEntriesList, setCardioLogEntriesList] =
    useState<CardioLogEntries>([]);
  const [cardioPRsList, setCardioPRsList] = useState<CardioPRs>([]); */
  const [isLoaded, setIsLoaded] = useState(false);

  const currentDayOfWeek = moment().format('dddd').toString();

  function roundToNearestFive(value: number) {
    return Math.round(value / 5) * 5;
  }

  function generateWeeklyDisplayExerciseList(
    trainingMaxExercises: { name: string; weight: number }[],
    weeklyExercises: {
      id: string;
      dayOfWeekNum: number;
      name: string;
      exerciseNum: number;
      setNum: number;
      reps: string;
      createdOn: Date;
      updatedOn: Date;
      ratio: number;
    }[],
  ) {
    const trainingMaxMap = new Map(
      trainingMaxExercises.map(
        (x: { name: string; weight: number }) =>
          [x.name, x.weight] as [string, number],
      ),
    );

    const displayWeeklyExercisesArray: DisplayWeeklyExercises = [];

    weeklyExercises.forEach((exercise) => {
      const newDisplayWeeklyExercise = {} as DisplayWeeklyExercise;

      newDisplayWeeklyExercise.id = exercise.id;
      newDisplayWeeklyExercise.dayOfWeekNum = exercise.dayOfWeekNum;
      newDisplayWeeklyExercise.name = exercise.name;
      newDisplayWeeklyExercise.exerciseNum = exercise.exerciseNum;
      newDisplayWeeklyExercise.setNum = exercise.setNum;
      newDisplayWeeklyExercise.reps = exercise.reps;
      newDisplayWeeklyExercise.createdOn = exercise.createdOn;
      newDisplayWeeklyExercise.updatedOn = exercise.updatedOn;

      const trainingMaxWeight = trainingMaxMap.get(
        newDisplayWeeklyExercise.name,
      ) as number;
      newDisplayWeeklyExercise.weight = roundToNearestFive(
        exercise.ratio * trainingMaxWeight,
      );

      switch (exercise.dayOfWeekNum) {
        case 1:
          newDisplayWeeklyExercise.dayOfWeek = 'Sunday';
          break;
        case 2:
          newDisplayWeeklyExercise.dayOfWeek = 'Monday';
          break;
        case 3:
          newDisplayWeeklyExercise.dayOfWeek = 'Tuesday';
          break;
        case 4:
          newDisplayWeeklyExercise.dayOfWeek = 'Wednesday';
          break;
        case 5:
          newDisplayWeeklyExercise.dayOfWeek = 'Thursday';
          break;
        case 6:
          newDisplayWeeklyExercise.dayOfWeek = 'Friday';
          break;
        case 7:
          newDisplayWeeklyExercise.dayOfWeek = 'Saturday';
          break;
        default:
          newDisplayWeeklyExercise.dayOfWeek = 'Doomsday';
      }

      if (
        newDisplayWeeklyExercise.weight &&
        newDisplayWeeklyExercise.dayOfWeek !== 'Doomsday'
      ) {
        displayWeeklyExercisesArray.push(newDisplayWeeklyExercise);
      }
    });

    return displayWeeklyExercisesArray;
  }

  async function populateWeights() {
    const trainingMaxExercises = await fetchTrainingMaxExercises();

    setTrainingMaxList(trainingMaxExercises);

    const weeklyExercises = await fetchWeeklyExercises();

    setWeeklyExerciseList(weeklyExercises);

    setDisplayWeeklyExerciseList(
      generateWeeklyDisplayExerciseList(
        trainingMaxExercises,
        weeklyExercises,
      ),
    );

    /*     const cardioLogEntries = await fetchCardioLogEntries();

    setCardioLogEntriesList(cardioLogEntries);

    const cardioPRs = await fetchCardioPRs();

    setCardioPRsList(cardioPRs); */

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
        <div className="FitnessTrackerContainer">
          <div id="LeftFitnessColumn">
            <TrainingMaxWeightsTable exercises={trainingMaxList} />
            {/* <CardioPRsTable exercises={cardioPRsList} /> */}
          </div>
          <div id="RightFitnessColumn">
            <WeeklyFitnessTable
              exercises={displayWeeklyExerciseList}
            />
            {/* <CardioLogTable exercises={cardioLogEntriesList} /> */}
          </div>
        </div>
      ) : (
        <div className="FitnessTrackerContainer">
          <h3>Loading! Please wait...</h3>
        </div>
      )}
    </div>
  );
}

export default FitnessTracker;
