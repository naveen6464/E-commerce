var express = require('express');
var router = express.Router();

/* GET home page. */
const users=require("../controllers/userscontroller");


 router.get('/',users.index);
 router.get('/signup',users.signup);
 router.post('/signup',users.signuppost);
 router.get('/login',users.login);
 router.post('/loginpost',users.loginpost);
 //router.get('/loginpost',users.homepage)
 router.get("/logout",users.logout);

 var wishlist=require("../controllers/wishlistcontrollers")
 //var {vef}=require("../middlewears/session")

const vef= (req,res,next)=>{
    if(req.session.userId){
   next();
    }else{
     res.redirect('/login/')
    }
}
 router.get("/favproduct",vef,wishlist.addwish)
 router.get("/viewfav",vef,wishlist.viewWishlist)
 router.post('/wishlist-remove',vef,wishlist.removeFromWishlist)


const cart=require("../controllers/cartcontroller")
router.get('/cart',vef,cart.addToCart)
router.get('/viewcart',vef,cart.viewCart)
router.post("/removeCart",vef,cart.removeCart)
module.exports = router;
