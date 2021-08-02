/* eslint-disable @typescript-eslint/no-unused-vars */
export type TrainingMaxWeight = {
  id: string;
  name: string;
  weight: number;
  createdOn: Date;
  updatedOn: Date;
};

export type TrainingMaxWeights = Array<TrainingMaxWeight>;

export type WeeklyExercise = {
  id: string;
  dayOfWeek: string;
  dayOfWeekNum: number;
  name: string;
  exerciseNum: number;
  setNum: number;
  reps: string;
  weight: number;
  ratio: number;
  createdOn: Date;
  updatedOn: Date;
};

export type WeeklyExercises = Array<WeeklyExercise>;

export const blankWeeklyExercise = {
  id: '',
  dayOfWeek: '',
  dayOfWeekNum: 0,
  name: '',
  exerciseNum: 0,
  setNum: 0,
  reps: '',
  weight: 0,
  ratio: 0,
  createdOn: new Date(),
  updatedOn: new Date(),
};

export const blankTrainingMaxExercise = {
  id: '',
  name: '',
  weight: 0,
  createdOn: new Date(),
  updatedOn: new Date(),
};
