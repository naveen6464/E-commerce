
const mongoose=require('mongoose');
const User=require("../models/users");
const categoryModel=require('../models/categoryModels');
const productModel=require("../models/productModels");
const wishlist=require("../models/favoritModel");
//const session = require("express-session");
 


module.exports={
    addwish:async(req,res)=>
    {  
       var session=req.session.userId;
      console.log("session:"+session) 
       var  pid=req.query.proid
       console.log("session:"+pid)
     //const objId = mongoose.Types.ObjectId(pid)
     let proObj = {
  productId :pid
  }
    
      const userData = await User.findOne({ email:session });
      const product = await productModel.findOne({ _id:pid });
      console.log("userData:"+userData)
      console.log("proInfo"+product)

      const userWishlist = await wishlist.findOne({ userId : userData._id})
     // console.log("alreadyin =user:"+userWishlist);
      if(userWishlist)
      {
           let proExist = userWishlist.product.findIndex((product)=> product.productId ==pid );//
           if(proExist !== -1){
              res.redirect('/viewfav')
            }
           else{
             wishlist.updateOne(
               { userId : userData._id},{ $push:{ product:proObj}}).then(()=>{
                     //res.send("add")
                     res.redirect('/viewfav/')
                })
              }
        }
      else{
      console.log('create collection');
      const newWishlist = new wishlist({
       userId : userData._id,
       product : [
        {
        productId:pid
       },
      ]
     });
  newWishlist.save().then(()=>{
 //  res.send(newWishlist)
   res.redirect('/viewfav/')
  })
    }
  },

 viewWishlist:async(req,res)=>{
try{
   const session = req.session.userId
   const userData = await User.findOne({email : session})
   const userId = userData._id
   const wishlistData = await wishlist
   .aggregate([
    {
      $match: { userId : userId}
    },
    {
      $unwind: "$product"
    },
     {
      $project : {
        productItem : "$product.productId",
      }
    },
    {
      $lookup : {
        from:"products",
        localField:"productItem",
        foreignField:"_id",
        as:"productDetail"
      }},
      {
      $project:{
        productItem:1,
        productDetail: { $arrayElemAt:["$productDetail",0]}
      }
    }
   ])
   
    countWishlist=await wishlist.findOne({userId : userData._id})
    console.log(wishlistData+"    "+countWishlist);
    const categories =await categoryModel.find()
   res.render('users/wishlist', {wishlistData,countWishlist,categories,sessname:session})
 }

 catch(e){
  console.log(e);
 }

 },
removeFromWishlist:async(req,res)=>{
  const data = req.body
  //const objId = mongoose.Types.ObjectId(data.productId)
     await wishlist.aggregate([
           {
            $unwind : "$product"
           },
     ]);
     await wishlist.updateOne(
      {_id : data.wishlistId,"product.productId" :data.productId},
      {$pull: { product: { productId : data.productId}}}
     )
     .then(()=>{
      res.json({ status : true})
     })
    }

}
