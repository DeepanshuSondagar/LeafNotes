import React from 'react'
import NavBar from '../componentes/NavBar';
import { useNavigate } from 'react-router';
import { useUserStore } from '../store/useUserStore';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const handleGetStarted = () => {
      if (user) {
        navigate("/notes");
      } else {
        navigate("/login")
      }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-black">
      <NavBar />
      <main className="flex-1 w-full flex  justify-center mt-40">
        <div className="text-4xl font-bold text-white text-center"><p>The notes app for</p>
        <p>
          <span className="text-white-500">peolpe who </span>
          <span className="text-green-500">actually</span>
          </p>
          <p className="text-green-500 text-center">think</p></div>
        
      </main>

      <main className="flex-1 w-full flex flex-col items-center mb-24">
        <div className="text-2xl font-bold text-gray-400 text-center max-w-2xl px-4">
          <p className="text-center">Simple, fast, and distraction-free. Write your</p>
          <p>thoughts, capture ideas, and find them again --</p>
          <p className="text-center">always</p>
         </div>

        <div className="mt-6">
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300" onClick={handleGetStarted}>Get Started</button>
        </div>
      </main>
    </div>
  )
}

export default HomePage;