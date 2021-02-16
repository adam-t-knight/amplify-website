import React, { useState, useEffect } from 'react';
import Amplify from 'aws-amplify';
import { AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { API } from 'aws-amplify';
import { Link } from "react-router-dom";
import { listNotes } from '../graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from '../graphql/mutations';

function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(notesFromAPI.map(async note => {
      if (note.image) {
        const image = await Storage.get(note.image);
        note.image = image;
      }
      return note;
    }))
    setNotes(apiData.data.listNotes.items);
  }
  return (
    <div style={{marginBottom: 30}}>
    {
      notes.map(note => (
        <div key={note.id || note.name}>
          <h2>{note.name}</h2>
          <p>{note.description}</p>
          {
            note.image && <img src={note.image} style={{width: 400}} />
          }
        </div>
      ))
    }
    </div>
  )
}

export default Home;