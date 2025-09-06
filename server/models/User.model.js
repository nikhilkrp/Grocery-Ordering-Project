import mongoose from "mongoose"

// creting the user Schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cartItems:{
        type:Object,
        default:{}
    }

},{minimize:false})

const User =mongoose.models.user || mongoose.model('User',userSchema)
export default User