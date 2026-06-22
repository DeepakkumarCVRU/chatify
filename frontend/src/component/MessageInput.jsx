import { useRef, useState } from "react";
import useKeyBoardSound from "../hook/useKeyboardSound.js";
import { useChatStore } from "../store/useChatStore.js";
import { SendIcon } from "lucide-react";

const MessageInput = () => {

    const {playRandomKeyStrokeSound} = useKeyBoardSound();
    const [text, setText] = useState("");
    const [imagePreview , setImagePreview] = useState(null)
    
    const fileInputRef = useRef(null);

    const {sendMessages , isSoundEnabled} = useChatStore();

    const handleSendMessage = async (e)=>{
        e.preventDefault();
        if(!text.trim() && !imagePreview) return;
        if(isSoundEnabled) playRandomKeyStrokeSound();

        await sendMessages({text , imagePreview});
        setText("");
        setImagePreview("");

        if(fileInputRef.current) fileInputRef.current.value = "";
    }

    // const handleImageChagne = ()=>{

    // }

    // const removeIMage  = ()=>{
    //     setImagePreview(null);
    //     if(fileInputRef.current) fileInputRef.current.value = "";
    // }


  return (
    <div>
        <form 
        onSubmit={handleSendMessage}
        className="max-w-3xl mx-auto flex space-x-4 ">
            <input 
            type="text" 
            placeholder="Type a message"
            value={text}
            onChange={(e)=>{
                setText(e.target.value)
                isSoundEnabled && playRandomKeyStrokeSound();
        }}
            className="input input-sm w-full bg-slate-800/50 text-slate-200 placeholder:text-slate-400"
            />


<button
    type="submit"
    disabled = {!text.trim() && !imagePreview}
    className="btn btn-sm btn-circle bg-cyan-500/20 text-cyan-400 disabled:bg-cyan-500/10 disabled:text-slate-400"
>
        <SendIcon/>
</button>

        </form>
    </div>
  )
}

export default MessageInput