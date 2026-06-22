import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useChatStore = create((set, get) => ({
    allContact: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        set({ isSoundEnabled: !get().isSoundEnabled })
    },

    setActiveTab: (tab) => {
        set({ activeTab: tab })
    },

    setSelectedUser: (selectedUser) => {
        set({ selectedUser: selectedUser })
    },

    getAllContacts: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axios.get("http://localhost:3000/api/contacts", { withCredentials: true })
            set({ allContact: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUserLoading: false })
        }
    },

    getChatPartner: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axios.get("http://localhost:3000/api/chats", { withCredentials: true })
            console.log("this is res", res)
            set({ chats: res.data })
        } catch (error) {
            console.log("error in getChatPartner", error)
            toast.error(error.response.data.message)
        } finally {
            set({ isUserLoading: false })
        }
    },

    getMessagesByUserID: async ({ userId }) => {
        set({ isMessageLoading: true })
        try {
            const res = await axios.get(`http://localhost:3000/api/${userId}`, { withCredentials: true })
            set({ messages: res.data })
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
        } finally {
            set({ isMessageLoading: false })
        }
    },

    sendMessages: async (message) => {
        const { selectedUser, messages } = get()
        try {
            console.log(message)
            const res = await axios.post(`http://localhost:3000/api/send/${selectedUser._id}`, message, { withCredentials: true })
            set({ messages: [...messages, res.data] })
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong || Error in sendMessage")
        }
    }
}))