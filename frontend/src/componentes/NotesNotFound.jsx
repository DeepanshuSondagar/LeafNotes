import { NotebookIcon } from "lucide-react";
import { Link } from "react-router-dom";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center text-white">
      <div className="bg-primary/10 rounded-full p-8 ">
        <NotebookIcon className="size-10 text-primary text-white" />
      </div>
      <h3 className="text-6xl font-bold">No notes yet</h3>
      <p className="text-base-content/70 text-2xl">
        Ready to organize your thoughts? Create your first note to get started on your journey.
      </p>

      <Link
        to="/create"
        className="btn btn-primary rounded-full px-8 py-3 text-lg w-auto bg-green-500 shadow-md hover:shadow-lg transition-all"
      >
        Create Your First Note
      </Link>
    </div>
  );
};
export default NotesNotFound;