import jwt from "jsonwebtoken"
import { User } from "./models/user";

const { JWT_SECRET } = process.env

const generateJwtHandler = (user: User) => {
    return jwt.sign(user, JWT_SECRET as string, { expiresIn: "3h" });
}

export default generateJwtHandler