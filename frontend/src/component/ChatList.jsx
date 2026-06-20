import { useEffect } from "react";
import NoConversationPlaceholder from "./NoConversationPlaceholder";
import UsersLoadingScalatan from "./UsersLoadingScalatan";
import { useChatStore } from "../store/useChatStore.js";
import avatar from "../assets/avatar.png"

const ChatList = () => {
  const { chats, getChatPartner, isUserLoading, selectedUser , setSelectedUser} = useChatStore();

  useEffect(() => {
    getChatPartner();
  }, [getChatPartner]);

  if (isUserLoading) return <UsersLoadingScalatan />;
  if (chats.length === 0) return <NoConversationPlaceholder />;
  console.log("this is chats", chats.length)

  console.log( "this is chats", chats , selectedUser)


  return (
      <>
        {
          chats.map((chats)=>(
            <div
            key={chats._id}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
            onClick={() => setSelectedUser(chats)}
            >

            <div className="flex items-center gap-4">
              {/* Todo: fix this online status and make it dynamic with socket */}
              <div className="">
                  <div className="size-12 rounded-full">
                    <img src= {chats.profilePic || avatar} alt={chats.fullName} />
                  </div>
                  
              </div>
              <h4 className="text-slate-200 font-medium truncate">{chats.fullName}</h4>
            </div>

            </div>
          ))
        }
      </>  

     
  );
};

export default ChatList;
