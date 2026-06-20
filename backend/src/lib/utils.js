import jwt from "jsonwebtoken"


const generateToken = async (UserId, fullName, res) => {
    const token = jwt.sign({ _id: UserId, fullName }, process.env.JWT_SECRET, { expiresIn: "1d" })


    res.cookie("token", token,
        {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "lax",
        })
    return token
}

export default generateToken