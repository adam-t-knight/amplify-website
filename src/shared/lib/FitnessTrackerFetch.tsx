import { API } from 'aws-amplify';
import {
  listTrainingMaxExercises,
  listWeeklyExercises,
  listCardioPRsHistorys,
  listCardioLogs,
} from '../../graphql/queries';
import { WeeklyExercises } from '../types/FitnessTrackerTypes';

/**
 * Sorts the inputted weekly exercise array by set number, exercise number, and then day of the week number
 * @param weeklyExercises
 * @returns weeklyExercises
 */
export function sortWeeklyExercises(
  weeklyExercises: WeeklyExercises,
) {
  weeklyExercises.sort(
    (a, b) =>
      a.dayOfWeekNum - b.dayOfWeekNum ||
      a.exerciseNum - b.exerciseNum ||
      a.setNum - b.setNum,
  );
  return weeklyExercises;
}

/**
 * Fetches exercises from training max db
 */
export async function fetchTrainingMaxExercises() {
  const listTrainingMaxExercisesData: any = await API.graphql({
    query: listTrainingMaxExercises,
  });

  return listTrainingMaxExercisesData.data.listTrainingMaxExercises
    .items;
}

/**
 * Fetches exercises from weekly exercise db
 */
export async function fetchWeeklyExercises() {
  const listWeeklyExercisesData: any = await API.graphql({
    query: listWeeklyExercises,
  });

  return sortWeeklyExercises(
    listWeeklyExercisesData.data.listWeeklyExercises.items,
  );
}

/**
 * Fetches exercises from training max db
 */
export async function fetchCardioPRs() {
  const listTrainingMaxExercisesData: any = await API.graphql({
    query: listCardioPRsHistorys,
  });

  return listTrainingMaxExercisesData.data.listCardioPRsHistorys
    .items;
}

/**
 * Fetches exercises from training max db
 */
export async function fetchCardioLogEntries() {
  const listCardioLogsData: any = await API.graphql({
    query: listCardioLogs,
  });

  return listCardioLogsData.data.listCardioLogs.items;
}
