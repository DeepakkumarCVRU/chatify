import cloudinaryImage from "../lib/cloudinary.js";
import Message from "../models/Message.model.js";
import User from "../models/user.model.js";

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const filtereduser = await User.find({ _id: { $ne: loggedInUser } }).select(
            "-password",
        );
        console.log("this is fileteredUser", filtereduser);

        res.status(200).json(filtereduser);
    } catch (error) {
        console.log("this error in getAllContact controller", error);
        res.status(500).json({ message: error.message });
    }
};

export const getMessageByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: myId },
            ],
        });

        return res.status(200).json(messages);
    } catch (error) {
        console.log("error in GetMessageInUserID ", error.message);
        return res.status(500).json({ error: error });
    }
};

export const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: recieverID } = req.params;
        const senderId = req.user._id;

        let imageUrl;

        if (!text && !image) {
            return res.status(400).json({ error: "Message or image is required" })
        }

        if (!recieverID) {
            return res.status(400).json({ error: "Reciever ID is required" })
        }

        const recieverIdExist = await User.findById(recieverID)
        if (!recieverIdExist) {
            return res.status(400).json({ error: "Reciever ID does not exist" })
        }

        if (recieverID === senderId) {
            return res.status(400).json({ error: "You can't send message to yourself" })
        }


        if (image) {
            //upload base 64 image to cloudinary
            const uploadResponse = await cloudinaryImage.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessages = new Message({
            senderId,
            recieverId: recieverID,
            text,
            image: imageUrl,
        });

        // todo: send message in real time if user is online - socket.io

        await newMessages.save();
        res.status(201).json(newMessages);
    } catch (error) {
        console.log("error in sendMessage", error);
        res.status(500).json({ error: error });
    }
};

export const getChatPartner = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        //find all message where the loggedINUser is either sender or reciever

        const messages = await Message.find({
            $or: [{ senderId: loggedInUser }, { recieverId: loggedInUser }],
        }).select("-password");


        const chatPartner = [...new Set(messages.map((msg) => {
            return msg.senderId.toString() === loggedInUser.toString() ? msg.recieverId.toString() : msg.senderId.toString()
        }))]


        const chatPartners = await User.find({ _id: { $in: chatPartner } }).select("-password");

        console.log(chatPartners);
        res.status(200).json(chatPartners)


    } catch (error) {
        console.log("error in getChatPartner", error);
        res.status(500).json(error);
    }
};
