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
            const res = await axios.get("http://localhost:3000/api/auth/check", {
                withCredentials: true,
            })

            console.log("this is req.data", res.data.user, "this is user", res)

            set({ authUser: res.data.user })

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
    },

    Logout: async () => {
        try {
            await axios.post("http://localhost:3000/api/auth/logout", { withCredentials: true });
            set({ authUser: null })
            toast.success("Logout successfully")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("logOut error", error)
        }
    },

    UpdatProfile: async (data) => {
        try {
            await axios.put("http://localhost:3000/api/auth/updat-profile", data, { withCredentials: true });
        } catch (error) {
            console.log(" update profile error", error)
            toast.error(error.response.data.message)
        }
    }


}))