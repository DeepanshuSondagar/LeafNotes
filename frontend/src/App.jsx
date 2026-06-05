 import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
 import SignUpPage from "./pages/SignUpPage"
import LogInPage from "./pages/LoginPage"
import NotesHomePage from "./pages/NotesHomePage"
import CreateNotesPage from "./pages/CreateNotesPage"
import { useUserStore } from "./store/useUserStore"
import { useEffect } from "react"
import UpdateNotesPagee from "./pages/UpdateNotesPage"
import { Toaster } from "react-hot-toast"

function App() {

  const { checkAuth } = useUserStore();

  useEffect(()=> {
      checkAuth();
  }, [])

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={< SignUpPage />} />
        <Route path="/login" element={< LogInPage />} />
        <Route path="/notes" element={< NotesHomePage />} />
        <Route path="/create" element={< CreateNotesPage />} />
        <Route path="/notes/:id" element={< UpdateNotesPagee />} />


      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
