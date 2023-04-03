const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId



const  favortSchema= new mongoose.Schema({
    userId : {
            type:ObjectId,
            required:true
        },
        product : [ 
            {
                productId: {
                    type :ObjectId,
                    required:true
                }
            }
        ]
})

const  wishModel= mongoose.model('wishlist',favortSchema)

module.exports= wishModel;