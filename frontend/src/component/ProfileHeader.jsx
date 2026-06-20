import { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";
import image from "../assets/signup.png";
import { IoLogOutOutline } from "react-icons/io5";
import { Volume2 } from 'lucide-react';
import { VolumeOff } from 'lucide-react';
import aAudio from "../assets/mouse-click.mp3"


// const mouseClickSound = new Audio("../assets/mouse-click.mp3");


const ProfileHeader = () => {
  const { Logout, authUser , UpdatProfile} = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const hangleUpload = (e) => { 
    const file = e.target.files[0]
    if(!file) return;
    
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = async() => {
      const base64 = reader.result;
      setSelectedImg(base64)
      await UpdatProfile({ profilePic: base64})
    }


  };

  const playSound = () => {
    const audio = new Audio(aAudio);
    audio.play();
  };

  return (
    <div className="border-b p-6 border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex  items-center  gap-4">
          {/* AVATAR */}

          <div className="avatar avatar-online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImg || authUser?.profilePic || image}
                alt="profile pic"
                className="size-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity group-hover:cursor-pointer">
                <span className="text-white text-sm">Change</span>
              </div>
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={hangleUpload}
              className="hidden"
            />
          </div>

          {/* USERNAME & ONLINE STATUS */}

          <div className="text-slate-200 font-medium text-base max-w-45 truncate">
            {authUser.fullName}
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>
        {/* LOGOUT */}

        <div className="flex gap-4 items-center">
          {/* LOGOUT btn */}

          <button
            className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            onClick={Logout}
          >
            <IoLogOutOutline className="size-6" />
          </button>

          {/* SOUND toggle btn */}

          <button className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            onClick={() => {
              playSound();
              toggleSound();
            }}>
            {
              isSoundEnabled ? <Volume2 className="size-6" /> : <VolumeOff className="size-6" />
            }
          </button>


        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
