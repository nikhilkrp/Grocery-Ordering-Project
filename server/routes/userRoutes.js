import express from "express"
import { register, login, isAuth, logout } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";



// creating router
const userRouter = express.Router();
// route
userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/is-auth', authUser, isAuth)
userRouter.get('/logout', authUser, logout)


export default userRouter