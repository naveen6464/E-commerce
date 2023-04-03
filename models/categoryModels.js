const mongoose = require('mongoose')

const category_typeSchema = new mongoose.Schema({

    Category:{
        type: String,
       required: true
    },
    Category_Meta:{
        type: String,
    required: true
    },
    Category_Image:{
        type: String,
        required:true
       
    },
    created_at: {type:Date, required:true, default:Date.now}
})

const CategoryModel = mongoose.model('Category', category_typeSchema)
module.exports =  CategoryModel;