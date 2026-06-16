import { create } from "zustand"
import axios from "axios"
import toast from "react-hot-toast"


export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoginIn: false,


    checkAuth: async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/auth/check")
            set({ authUser: res.data })
        } catch (error) {
            console.log("error in checkAuth", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true })
        try {
            console.log("this is data ", data)
            const res = await axios.post("http://localhost:3000/api/auth/signup", data, {
                withCredentials: true,
            })
            console.log("this is authStore ", res)
            set({ authUser: res.data })
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isSigningUp: false })
        }
    },


    Login: async (data) => {
        set({ isLoginIn: true })
        try {
            console.log("this is data ", data)
            const res = await axios.post("http://localhost:3000/api/auth/login", data, {
                withCredentials: true,
            })
            console.log("this is authStore ", res)
            set({ authUser: res.data })
            toast.success(" Login successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isLoginIn: false })
        }
    }

}))