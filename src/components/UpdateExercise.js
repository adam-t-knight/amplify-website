import React, { useState, useEffect } from 'react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify'
import { API, Storage, Function } from 'aws-amplify';
import { listExercises } from '../graphql/queries';
import { updateExercise as updateExerciseMutation } from '../graphql/mutations';
import { Link } from "react-router-dom";
import { withAuthenticator, AmplifySignOut, AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import moment from "moment-timezone";

const initialFormState = { name: '', weight: '' }

const UpdateExercise = () => {
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
      onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
          setUser(authData);
      });
      fetchExercises();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchExercises();
  }

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

  async function updateExercise() {
    if (!formData.name || !formData.weight) return;
    await API.graphql({ query: updateExerciseMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setExercises([ ...exercises, formData ]);
    setFormData(initialFormState);
  }

  return Auth.user ? (
    <div id="UpdateExercise">
      <h1>Update Exercise</h1>
      <Link to="/fitness-tracker">
        Back
      </Link>
      <div style={{marginBottom: 30}}>
      {
        exercises.map(exercise => (
          <div key={exercise.id || exercise.name}>
            <h2>Name: {exercise.name}</h2>
            <p>Weight: {exercise.weight}</p>
            <p>Created on: {moment(exercise.createdOn).format('ddd, MMM Do YYYY').toString()}</p>
            <p>Last update on: {moment(exercise.updatedOn).format('ddd, MMM Do YYYY').toString()}</p>
            <button onClick={() => updateExercise(exercise)}>Update exercise</button>
          </div>
        ))
      }
      </div>
    </div>
  ) : (
    <AmplifyAuthenticator hideDefault={true}>
      <AmplifySignIn slot="sign-in" hideSignUp />
    </AmplifyAuthenticator>
  );
}

export default UpdateExercise;