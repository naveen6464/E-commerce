const User=require("../models/users");
const categoryModel=require("../models/categoryModels")
const productModel=require("../models/productModels")
const wishlist=require("../models/favoritModel");
const cartlist=require("../models/cartModel")
const bcrypt = require('bcrypt');
const { count } = require("../models/users");


let countWishlist;
let cartcount;
module.exports={
  index:async(req,res)=>{
    try{
     console.log('index')
     const categories = await categoryModel.find()
     const products= await productModel.find().limit(3)
     const recent= await productModel.find({ created_at: { $gte: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) } }).sort({ _id: -1 })
    
     console.log(categories);
     console.log(products);
      

      console.log(recent);
     res.render("users/index",{sessname:"",categories,products,recent,countWishlist,cartcount});   
    }catch(e){
        console.log(e);
    }

  },
    signup: async (req, res) => {
    try {
      console.log('users singup')
      res.render("users/signup");
    } catch (error) {
      console.log(error);
    }
  },
  signuppost: async(req,res)=>{
     try{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.pwd, saltRounds);
      console.log('users singuppost')
    const user = new User({
      UserName: req.body.user,
      email: req.body.email,
      password: hashedPassword
    });
    await user.save();
    const categories = await categoryModel.find()
     const products= await productModel.find()
      res.redirect("/",{sessname:'',categories:categories,products:products})
  } catch(e) {
    console.log(e);
   res.redirect('/');
  }
},

  login: async(req,res)=>{
    try{
        console.log('login page');
        res.render("users/login");

    }catch(e){
        console.log(e);
    }
  },
 loginpost:async(req,res)=>{
  try{
      const {email,pwd}=req.body;
      const user = await User.findOne({ email:email });
   
      const isValidPassword = await bcrypt.compare(pwd, user.password);
          if (!isValidPassword) {
          res.status(401).send('Invalid email or password');
            }
        else{
          req.session.userId = user.email;
         console.log(req.session.userId);
         req.session.save()
          
          const categories = await categoryModel.find()
          const products= await productModel.find()
          const recent= await productModel.find({ created_at: { $gte: new Date(Date.now() - 7* 24 * 60 * 60 * 1000) } }).sort({ _id: -1 })

          const countWishlist = await wishlist.findOne({userId: user._id})
          const countInCart= await cartlist.findOne({userId: user._id})
          console.log(countInCart)
         // console.log(countWish)
         // console.log(`Product length: ${countWish.product.length}`);
        // if(countWish ){
        //  countWishlist=countWish.product.length 
         // console.log(countWishlist);
        // res.render('users/index',{sessname:email,categories,products,recent,countWishlist,countInCart});
       /// }else{
         // countWishlist=0; 
         // countInCart=0;
          res.render('users/index',{sessname:email,categories,products,recent,countWishlist,countInCart});
       // }
         }
        }
 catch(e){
     console.log(e);
}
   
 },

  logout: async (req, res) => {
    console.log('logout');
    req.session.destroy()
    res.redirect('/')

  },
 /* homepage:async(req,res)=>{
    console.log('logout');
    if(sessname){
    res.redirect('/loginpost')}
    else{
      res.redirect('/')
    }
  },*/
 
 }

