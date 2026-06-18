import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useChatStore = create((set, get) => ({
    allContact: [],
    chats: [],
    messages: [],
    activeTab: "chata",
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,
    isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        console.log("this is isSoundEnabled", get().isSoundEnabled)
        set({ isSoundEnabled: !get().isSoundEnabled })
        console.log("this is isSoundEnabled after", get().isSoundEnabled)
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
            const res = await axios.get("http://localhost:3000/api/contacts")
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
            const res = await axios.get("http://localhost:3000/api/chats")
            set({ chats: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUserLoading: false })
        }
    },
}))