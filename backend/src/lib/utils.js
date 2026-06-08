import jwt from "jsonwebtoken"


const generateToken = async (UserId, res) => {
    const token = jwt.sign({ _id: UserId }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token,
        {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true
        })
    return token
}

export default generateToken