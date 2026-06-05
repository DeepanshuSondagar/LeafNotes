import React from 'react';
 import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../lib/axios';
import { useUserStore } from '../store/useUserStore';
 
const NavBar = () => {

    const navigate = useNavigate();
    const { user, logout } = useUserStore();

      const handleLogout = async () => {
            await logout();
            navigate("/");
        };
    //todop make useUserStore in frontend 

  return (
    <header className="w-full sticky top-0 z-50 bg-slate-800 border-b border-slate-700 shadow-sm">
        <div className="w-full mx-auto max-w-6xl p-4">
            <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold font-mono tracking-tight" >
                <Link to="/" className="inline-flex items-center space-x-1 text-2xl">
                    <span className="text-white">Leaf</span>
                    <span className="text-green-500">Notes</span>
                </Link>
            </h1>
                        <div className="flex items-center space-x-4">
                           {user ? (
                            <>
                            <Link to="/create" className="text-white px-3 py-2 rounded hover:bg-white/10 transition duration-300">
                                Create Note
                            </Link>
                            <button onClick={handleLogout} className="text-white px-3 py-2 rounded hover:bg-white/10 transition duration-300">
                                Logout
                            </button>
                            </>
                        ) : (
                            <>
                            <Link to="/signup" className="text-white px-3 py-2 rounded hover:bg-white/10 transition duration-300">
                                Sign Up
                            </Link>
                            <Link to="/login" className="text-white px-3 py-2 rounded hover:bg-white/10 transition duration-300">
                                Log In
                            </Link>
                            </>
                        )}
                        </div>
            </div>
        </div>
        </header>
  )
}

export default NavBar