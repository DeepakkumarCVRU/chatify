import { Router } from "express"
import { getAllContacts, getChatPartner, getMessageByUserId, sendMessages } from "../controllers/Message.controller.js"
import { protectedRoute } from "../middleware/auth.middleware.js"


const router = Router()
router.use(protectedRoute)

router.get("/contacts", getAllContacts)
router.get("/chats", getChatPartner)
router.get("/:id", getMessageByUserId)
router.post("/send/:id", sendMessages)




router.post("/send-message", (req, res) => {
    res.send("Message")
})

export default router