import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {   // this is for message which send by sender to reciever
        type: String,
        trim: true,
        maxLength: 500
    },
    image: {
        type: String
    }
}, { timestamps: true })


const Message = mongoose.model("Message", messageSchema)
export default Message