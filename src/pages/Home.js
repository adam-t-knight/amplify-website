import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listNotes } from '../graphql/queries';

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