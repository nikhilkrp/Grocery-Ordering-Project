import Product from "../models/Product.model.js"
import Order from "../models/Order.model.js"


// PLace Order COD :/api/order/cod
export const placeOrderCOD = async(req,res)=>{
    try {
        const {userId, items, address} = req.body
        if(!address || items.lenght==0){
            return res.json({success:false , message:"No Items In Cart"})
        }
        // Calculate Amount Using Items
        let amount = await items.reduce(async (acc,items)=>{
            const product  = await Product.findById(items.product);
            return (await acc)+product.offerPrice * items.quantity;
        },0)

        // Addd charges in product tax(2%) 
        amount +=Math.floor(amount*0.02)

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:"COd"
        });
        return res.json({success:true ,message:"Order Placed SuccessFully"})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}


// Get Orders by user ID :/api/order/user
export const getUserOrders = async(req,res) =>{
    try {
        const {userId} = req.body;
        const orders  = await Order.find({
            userId,
            $or:[{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({createdAt:-1})
        res.json ({success:true , orders})

    } catch (error) {
                return res.json({success:false,message:error.message})
    }
}


// GetAll Orders (for Seller / admin) : /api/order/seller
export const getAllOrders = async(req,res) =>{
    try {
      
        const orders  = await Order.find({
            $or:[{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({createdAt:-1})
        res.json ({success:true , orders})

    } catch (error) {
                return res.json({success:false,message:error.message})
    }
}