import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listNotes } from '../graphql/queries';
import { Link } from "react-router-dom";

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
    <div className="App">
      <h1>Home</h1>
      <Link to="/update-training-max">
        Update Training Max
      </Link>
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
  </div>
  )
}

export default Home;