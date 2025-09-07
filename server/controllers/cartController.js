import User from "../models/User.model.js"


// update the cart : /api/cart/update
export const updateCart = async (req,res)=>{
    try {
        const {userId, cartItems} = req.body
        await User.findByIdAndUpdate(userId,{cartItems})
        // console.log(cartItems)
        // console.log(userId)
        res.json({success: true, message:"Cart Updated"})
       
    } catch (error) {
        console.log(error.message)
        res.json({success:false ,message:error.message})
    }
}