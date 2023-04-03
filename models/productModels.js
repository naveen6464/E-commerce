const mongoose= require('mongoose')
const productSchema=  new mongoose.Schema({
     Category:{
        type: String,
       required: true
    },
     product_name:{
        type: String,
       required: true
    },
    
    price:{
        type: String,
        required: true
    },
    stock:{
        type:Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    product_Image:{
        type: String,
        required:true    
    },
    created_at: {type:Date, required:true, default:Date.now}
});

const  productModel= mongoose.model('products',productSchema)

module.exports= productModel;