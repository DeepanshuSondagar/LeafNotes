import { PenSquareIcon, Trash2 } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import api from "../lib/axios"; 
import toast from 'react-hot-toast';
import { formatDate } from "../lib/uitls.js";


const NoteCard = ({note, setNotes}) => {

    const handleDelete = async(e, id) => {
      e.preventDefault();

      if(!window.confirm("Are you shore for delete this note?")) return;
      try {
        await api.delete(`/notes/${id}`);
        setNotes((prev)=> prev.filter(note=> note._id !== id));
         toast.success("Note delete successfully");
      } catch (error) {
        console.log("Error to handleDelete", error);
        toast.error("Failed to delete note");
      }
    }

  return (

      <Link
      to={`/notes/${note._id}`}
      className="block bg-[#1a1f2e] hover:shadow-lg transition-all duration-200 border-t-4 border-[#00FF9D] rounded-xl p-5"
    >
      <div>
        <h3 className="text-white font-semibold text-lg mb-2">{note.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-3 mb-6">{note.content}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-2 ml-3">
            <PenSquareIcon className="size-4 text-gray-400 hover:text-white cursor-pointer"/>
            <button
              className="text-red-400 hover:text-red-300"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2 className="size-4"/>
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard