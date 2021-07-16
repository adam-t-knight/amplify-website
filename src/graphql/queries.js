/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTrainingMaxExercise = /* GraphQL */ `
  query GetTrainingMaxExercise($id: ID!) {
    getTrainingMaxExercise(id: $id) {
      id
      name
      weight
      createdOn
      updatedOn
    }
  }
`;
export const listTrainingMaxExercises = /* GraphQL */ `
  query ListTrainingMaxExercises(
    $filter: ModelTrainingMaxExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrainingMaxExercises(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        weight
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
export const getTrainingMaxExerciseHistory = /* GraphQL */ `
  query GetTrainingMaxExerciseHistory($id: ID!) {
    getTrainingMaxExerciseHistory(id: $id) {
      id
      name
      weight
      createdOn
      updatedOn
    }
  }
`;
export const listTrainingMaxExerciseHistorys = /* GraphQL */ `
  query ListTrainingMaxExerciseHistorys(
    $filter: ModelTrainingMaxExerciseHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrainingMaxExerciseHistorys(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        weight
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
export const getWeeklyExercise = /* GraphQL */ `
  query GetWeeklyExercise($id: ID!) {
    getWeeklyExercise(id: $id) {
      id
      dayOfWeekNum
      name
      exerciseNum
      setNum
      reps
      ratio
      createdOn
      updatedOn
    }
  }
`;
export const listWeeklyExercises = /* GraphQL */ `
  query ListWeeklyExercises(
    $filter: ModelWeeklyExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWeeklyExercises(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dayOfWeekNum
        name
        exerciseNum
        setNum
        reps
        ratio
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
