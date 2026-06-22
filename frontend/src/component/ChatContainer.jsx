import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder.jsx";
import MessageInput from "./MessageInput.jsx";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton.jsx";

const ChatContainer = () => {

  const {selectedUser, messages , isMessageLoading, getMessagesByUserID} = useChatStore();
  const {authUser}  = useAuthStore();
  const messageEndRef = useRef(null);


  useEffect(() => {
    if(selectedUser) getMessagesByUserID({ userId:selectedUser._id })
  }, [selectedUser, getMessagesByUserID])

  useEffect(()=>{
    if(messageEndRef.current){
      messageEndRef.current?.scrollIntoView({behavior:"smooth"})
    }
  } , [messages])

  return (
    <>
        <ChatHeader/>
        <div className="flex-1 px-6 overflow-y-auto py-8">
          {messages.length >0 && !isMessageLoading  ? (
            <div className="max-w-3xl mx-auto space-x-6 ">
              {
                messages.map((msg)=>(
                  <div key={msg._id}
                    className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                  >
                    <div className={` chat-bubble relative ${msg.senderId === authUser._id ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-200"}`}>
                        {msg.image && (
                          <img src={msg.image} alt={msg.message} className="rounded-lg h-48 object-cover" />
                        )}

                        {msg.text && (
                          <p className="mt-2">{msg.text}</p>
                        )}
                        <p>
                          {new Date(msg.createdAt).toLocaleString([] , {hour:"2-digit" , minute:"2-digit"})}
                        </p>
                    </div>
                  </div>
                ))
              }

              <div ref={messageEndRef}/>

            </div>
          ): isMessageLoading ? (
            <MessagesLoadingSkeleton/>
          ) : (
            <NoChatHistoryPlaceHolder name = {selectedUser.fullName}/>
          )}
        </div>

        <MessageInput/>
    </>
  )
}

export default ChatContainer