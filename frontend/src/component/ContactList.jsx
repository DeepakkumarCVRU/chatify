import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingScalatan from "./UsersLoadingScalatan";
import avatar from "../assets/avatar.png"


const ContactList = () => { 
  const {getAllContacts, isUserLoading, allContact, selectedUser , setSelectedUser} = useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUserLoading) return <UsersLoadingScalatan />;



  return (
      < div>
        {
          allContact.map((allcontact)=>(
            <div
            key={allcontact._id}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors  "
            onClick={() => setSelectedUser(allcontact)}
            >

            <div className="flex items-center gap-4">
              {/* Todo: fix this online status and make it dynamic with socket */}
              <div className="">
                  <div className="size-12 rounded-full">
                    <img src= {allcontact.profilePic || avatar} alt={allcontact.fullName} />
                  </div>
                  
              </div>
              <h4 className="text-slate-200 font-medium truncate">{allcontact.fullName}</h4>
            </div>

            </div>
          ))
        }
      </div>  

     
  );
}

export default ContactList