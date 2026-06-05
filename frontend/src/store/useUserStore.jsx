import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) =>({
    user: null,
    loading: false,


    signup: async({name, email, password}) =>{
        set({loading: true});

        try {
            const res = await axios.post("/auth/signup", {name, email, password});
             set({user: res.data, loading: false});
        } catch (error) {
            set({loading: false});
            toast.error(error.response?.data?.message || "Could not sign up. Check your server connection")
        }
    },

  login: async({ email, password}) =>{
        set({loading: true});

        try {
            const res = await axios.post("/auth/login", { email, password});
             set({user: res.data, loading: false});
        } catch (error) {
            set({loading: false});
            toast.error(error.response?.data?.message || "Could not sign up. Check your server connection")
        }
    },

      logout: async() =>{
        set({loading: true});

        try {
            const res = await axios.post("/auth/logout");
             set({user: null});
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during logout")
        }
    },
checkAuth: async () => {
  try {
    const res = await axios.get("/auth/profile");
    set({ user: res.data });
  } catch (error) {
    if (error.response?.status !== 401) {
      console.log(error.message); // only log real errors, not 401
    }
    set({ user: null });
  }
},

}))