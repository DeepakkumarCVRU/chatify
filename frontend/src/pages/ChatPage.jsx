import ActiveTabSwitch from "../component/ActiveTabSwitch"
import ChatContainer from "../component/ChatContainer.jsx"
import ChatList from "../component/ChatList"
import ContactList from "../component/ContactList"
import NoConversationPlaceholder from "../component/NoConversationPlaceholder.jsx"
import ProfileHeader from "../component/ProfileHeader"
import { useChatStore } from "../store/useChatStore.js"

const ChatPage = () => {

  const {activeTab, selectedUser} = useChatStore();
 

  return (
    <>
        <div className="relative w-full max-w-6xl h-200 flex">
          {/* LEFT SIDE */}
          <div className="w-80 bg-slate-900/50 backdrop-blur-sm flex flex-col ">
            <ProfileHeader/>
            <ActiveTabSwitch/>

            <div>
              {activeTab === "chat" ? <ChatList/> : <ContactList/>}
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="flex-1 flex flex-col bg-slate-700/50 backdrop-blur-sm ">

          {selectedUser ? <ChatContainer/> : <NoConversationPlaceholder/>}

          </div>

        </div>
    </>
  )
}

export default ChatPage