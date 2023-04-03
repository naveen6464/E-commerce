const Swal = require('sweetalert');
const cartModel=require("../models/cartModel")
const User=require("../models/users");
const categoryModel=require('../models/categoryModels');
const productModel=require("../models/productModels");
const wishlist=require("../models/favoritModel");
let countWishlist;
module.exports={
  addToCart:async(req,res)=>{
    console.log("add to cart")
    const pid=req.query.proid;
    const sessname=req.session.userId;

     let proObj = {
        productId : pid,
        quantity : 1,
    };
    const userData = await User.findOne({ email:sessname });
    const cartData = await cartModel.findOne({ userId:userData._id});
    console.log("userData:"+userData)
    //console.log("proInfo"+cartData)
   if(cartData){
     let avoid= cartData.cart.findIndex((product)=>product.productId==pid)
          if(avoid  !== -1){
         res.redirect('/viewcart')
          }else
          {
             cartModel.findOneAndUpdate({userId:userData._id},{$push:{cart:proObj}}).then(()=>{
              res.redirect('/viewcart')
             })
          }
   }
   else{
           console.log('create collection');
      const newWishlist = new cartModel({
       userId : userData._id,
       cart : [
        {
        productId:pid,
        quantity: 1
       },
      ]
     });
  newWishlist.save().then(()=>{
  res.redirect('/viewcart')
  })

   }
  
  },
   viewCart :async(req,res)=>{

    const sessname = req.session.userId
    const userData = await User.findOne({ email : sessname })
    const productData = await cartModel
    .aggregate([
      {
          $match: { userId : userData._id}
      },
      {
          $unwind: "$cart"
      },
      {
          $project: {
              productItem: "$cart.productId",
              productQuantity: "$cart.quantity"
            }
      },
      {
          $lookup: {
              from: "products",
              localField: "productItem",
              foreignField: "_id",
              as: "productDetail",
            },
      },
      {
          $project: {
              productItem: 1,
              productQuantity: 1,
              productDetail: { $arrayElemAt: ["$productDetail", 0] },
            }
      }
    ])
    .exec();
   // const sum = productData.reduce((accumulator, object )=>{
   //   return accumulator + object.productPrice;
  //  },0)
console.log(productData.productDetail)
//countInCart = productData.length
countInCart = await cartModel.findOne({userId : userData._id})
countWishlist=await wishlist.findOne({userId : userData._id})
const categories = await categoryModel.find({userId : userData._id})
res.render('users/cart',{productData,countInCart,countWishlist,sessname,categories})
 
},

removeCart: async(req,res)=>{
console.log("removeCart");
const cartId=req.body.cartId;
const product=req.body.productId
console.log(cartId+"  "+product);
await cartModel.updateOne({_id:cartId,"cart.productId":product},
    {$pull: {cart: {productId:product} } }).then(()=>{
      res.json({ status : true})
     })
},
  
}
  
