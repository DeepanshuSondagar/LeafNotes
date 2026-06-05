import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";


const UpdateNotesPage = () => {
      const [note, setNote] = useState(null);
      const [loading, setLoading] = useState(true);
      const [saving, setSaving] = useState(false);

        const navigate = useNavigate();

       const { id } = useParams();
       
       useEffect(()=> {
        const fetchNote = async() => {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data);
            } catch (error) {
            console.log("Error in fetch in note", error);
        toast.error("Failed to fetch the note ");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async() => {
    if(!window.confirm("Are you sure to delete this note")) return;

    try {
        await api.delete(`/notes/${id}`);
        toast.success("Note deleted");
        navigate("/notes");
    } catch (error) {
        console.log("Error deleting the note", error);
        toast.error("Failed to delete note");
    }
  };

  const handleSave =  async() => {
        if(!note.title.trim() || !note.content.trim()){
            toast.error("Please add a title or content");
            return;
        }
        setSaving(true)
        try {
            await api.put(`/notes/${id}`, note);
            toast.success("note updated successfully");
            navigate("/notes")
        } catch (error) {
            console.log("Error saving the note", error);
            toast.error("Failed to updated note")
        }finally{
            setSaving(false)
        }
  };

  if (loading || !note) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-black">
      <div className="text-white">Loading...</div>
    </div>
  );
}

  return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-black">
      <div className="container mx-auto px-4 py-8 mt-5">
        <div className="max-w-2xl mx-auto flex">
          <Link to={"/notes"} className="mb-6 text-white flex items-center gap-2  transition">
            <ArrowLeftIcon className="size-5"/>
            Back to notes
          </Link>
            <button className=" text-white flex ml-auto" onClick={handleDelete}>
                <Trash2Icon className="h-5 w-5 text-white"/>
                Delete Note
                </button>
              </div>
            
            
              <div className="bg-[#111827] py-8 px-8 shadow rounded-2xl">
            
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })} 

                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                 <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  rows={6}
                  className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full transition duration-300" onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
          </div>
            </div>
          </div>
)
}

export default UpdateNotesPage;