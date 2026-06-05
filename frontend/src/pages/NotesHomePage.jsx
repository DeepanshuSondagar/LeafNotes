import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast"
import api from "../lib/axios"
import NavBar from '../componentes/NavBar';
import NotesNotFound from "../componentes/NotesNotFound"
import NoteCard from '../componentes/NoteCard';

const NotesHomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {                       
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
      } catch (error) {
        toast.error("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);                                  

  return (                                 
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-black">
      <NavBar />
      <div className="max-w-7xl mx-auto p-4 mt-4">
        {loading && (
          <div className="text-center text-primary py-18">Loading...</div>
        )}
        {!loading && notes.length === 0 && <NotesNotFound />}
        {notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};                                        

export default NotesHomePage;