import { useChatStore } from "../store/useChatStore.js";
import avatar from "../assets/avatar.png"
import { RxCross1 } from "react-icons/rx";
import { useEffect } from "react";


const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore();
    
    useEffect(() => {
      
        const handleEscKey = (event) => {
          if (event.key === "Escape") {
            setSelectedUser(null);
          }
        };
    

        window.addEventListener("keydown", handleEscKey);

        //cleanup function
      return () => {
        window.removeEventListener("keydown", handleEscKey);
      }
    }, [selectedUser, setSelectedUser]);
    

    
  return (
    <>
        <div className="flex justify-between items-center border-b p-4 border-slate-700/50 shadow-md ">
            <div className="flex items-center space-x-3">
                <div className="avatar online">
                    <div className="size-12 rounded-full">
                    <img src={selectedUser?.profilePic || avatar} alt={selectedUser?.fullName} className="size-12 rounded-full" />
                    </div>
                </div>
                <div>
                    <h4 className="text-slate-200 font-medium">{selectedUser?.fullName}</h4>
                    <p className="text-slate-400">Online</p>
                </div>
            </div>
            <div>
                <button className="cursor-pointer " onClick={() => setSelectedUser(null)}>
                    <RxCross1 className="size-6 text-slate-400" />
                </button>
            </div>

        </div> 
    </>
  )
}

export default ChatHeader