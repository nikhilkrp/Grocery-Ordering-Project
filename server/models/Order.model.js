import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId :{type:String, required:true,ref:"user"},
    items:[{
        product:{
            type:String,
            required:true,
            ref:'Product',
        },
        quantity:{
            type:String,
            required:true,
        }
    }],
    amount:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        ref:'Address'
    },
    status:{
        type:String,
        default:'Order Placed',
    },
    paymentType:{
        type:String,
        required:true
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:"false"
    }
},{timestamps:true})

const Order  = mongoose.model.Order || mongoose.model('Order',orderSchema)
export default Order