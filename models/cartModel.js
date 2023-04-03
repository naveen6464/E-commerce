const { ObjectId } = require("mongodb");
const mongoose=require("mongoose");
const Schema = mongoose.Schema
const objectId=Schema.ObjectId

const cart_schema= new mongoose.Schema({

    userId:{
        type:objectId,
        require:true
    },
    cart:[
        {
            productId:{
                type:objectId,
                 require:true
          },
           quantity:{
            type: Number,
            required:true
        },
      }
        
    ]
})

const cart=mongoose.model("cart",cart_schema)
module.exports=cart
