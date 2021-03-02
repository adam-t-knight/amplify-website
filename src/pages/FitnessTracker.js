import { useState, useEffect } from 'react';
import { API, Storage, Function } from 'aws-amplify';
import { listExercises } from '../graphql/queries';
import { createExercise as createExerciseMutation, deleteExercise as deleteExerciseMutation } from '../graphql/mutations';
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import '../assets/css/FitnessTracker.css';

function Home() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetchExercises();
  }, []);

  async function fetchExercises() {
    const apiData = await API.graphql({ query: listExercises });
    const exercisesFromAPI = apiData.data.listExercises.items;
    await Promise.all(exercisesFromAPI.map(async exercise => {
      if (exercise.image) {
        const image = await Storage.get(exercise.image);
        exercise.image = image;
      }
      return exercise;
    }))
    setExercises(apiData.data.listExercises.items);
  }

  return (
    <div id="FitnessTracker">
      <h1>Fitness Tracker</h1>
      <Link to="/fitness-tracker/update-exercise">
        Update Exercise
      </Link>
      <Link to="/fitness-tracker/add-exercise">
        Add Exercise
      </Link>
      <Link to="/fitness-tracker/delete-exercise">
        Delete Exercise
      </Link>
      <div style={{marginBottom: 30}}>
        {
          exercises.map(exercise => (
            <div key={exercise.id || exercise.name}>
              <h2>Name: {exercise.name}</h2>
              <p>Weight: {exercise.weight}</p>
              <p>Created on: {moment(exercise.createdOn).format('ddd, MMM Do YYYY').toString()}</p>
              <p>Last update on: {moment(exercise.updatedOn).format('ddd, MMM Do YYYY').toString()}</p>
              {
                exercise.image && <img src={exercise.image} style={{width: 400}} />
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default Home;