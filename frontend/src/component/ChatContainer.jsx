import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder.jsx";

const ChatContainer = () => {

  const {selectedUser, messages , isUserLoading, getMessagesByUserID} = useChatStore();
  const {authUser}  = useAuthStore();


  useEffect(() => {
    if(selectedUser) getMessagesByUserID({ userId: selectedUser._id })
  }, [selectedUser, getMessagesByUserID])

  return (
    <>
        <ChatHeader/>
        <div className="flex-1 px-6 overflow-y-auto py-8">
          {messages.length >0 ? (
            <p>some message</p>
          ): (
            <NoChatHistoryPlaceHolder name = {selectedUser.fullName}/>
          )}
        </div>
    </>
  )
}

export default ChatContainer