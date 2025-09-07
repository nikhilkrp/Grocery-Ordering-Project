import mongoose from "mongoose"

// creting the user Schema
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:Array,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    offerPrice:{
        type:Number,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    inStock:{
        type:Boolean,
    }

},{timestamps:true})

const Product =mongoose.models.Product || mongoose.model('Product', productSchema)
export default Product