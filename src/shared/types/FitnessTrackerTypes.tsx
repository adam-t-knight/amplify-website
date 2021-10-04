/* eslint-disable @typescript-eslint/no-unused-vars */
export type TrainingMaxWeight = {
  id: string;
  name: string;
  weight: number;
  createdOn: Date;
  updatedOn: Date;
};

export type TrainingMaxWeights = Array<TrainingMaxWeight>;

export const blankTrainingMaxExercise = {
  id: '',
  name: '',
  weight: 0,
  createdOn: new Date(),
  updatedOn: new Date(),
};

export type WeeklyExercise = {
  id: string;
  dayOfWeekNum: number;
  name: string;
  exerciseNum: number;
  setNum: number;
  reps: string;
  ratio: number;
  createdOn: Date;
  updatedOn: Date;
};

export type WeeklyExercises = Array<WeeklyExercise>;

export const blankWeeklyExercise = {
  id: '',
  dayOfWeekNum: 0,
  name: '',
  exerciseNum: 0,
  setNum: 0,
  reps: '',
  ratio: 0,
  createdOn: new Date(),
  updatedOn: new Date(),
};

export type DisplayWeeklyExercise = {
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

export type DisplayWeeklyExercises = Array<DisplayWeeklyExercise>;

export type CardioLogEntry = {
  id: string;
  exerciseName: string;
  distance: number;
  time: number;
  elevationGain: number;
  createdOn: Date;
  updatedOn: Date;
};

export type CardioLogEntries = Array<CardioLogEntry>;

export type CardioPR = {
  id: string;
  exerciseName: string;
  category: string;
  value: number;
  createdOn: Date;
  updatedOn: Date;
};

export type CardioPRs = Array<CardioPR>;
