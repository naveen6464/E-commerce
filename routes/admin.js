var express = require('express');
var router = express.Router();


//GET admin listing. 
router.get('/', function(req, res, next) {
 res.render('admin/admin-login');
});
router.get('/dashboard', function(req, res, next) {
 res.render('admin/admin-login');
});

router.post('/login', function(req, res, next) {
    if(req.body.email=="" && req.body.pwd=="")
    {
    //res.send("Admin MainPage")
    res.render('admin/dashboard', { title: 'Express' });
    }
    else{
        res.send("Error")    
    }
    //db Connection
   
  });


const category=require("../controllers/categorycontroller")
router.get('/add-category',category.addcategory);
  const multer = require('multer');
   const path = require("path");
   const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/categories');
  },
  filename: function(req, file, cb) {
     cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
const upload = multer({ storage: storage }).single('Category_Image');
  router.post('/add-category',upload,category.addcategorypost); 
  router.get('/view-category',category.viewcategory);
   router.get('/edit-category/:_id',category.editcategory)
   router.post('/edit-category/:_id',upload,category.editcategorypost);
  router.get('/delete-category/:_id',category.deletecategory);

  var product=require("../controllers/product-controller")
  var pupload=require("../middlewears/multer")
  router.get('/add-product',product.addproduct);
  router.post('/add-product',pupload,product.addproductpost);
  router.get('/view-product',product.allproducts);
  router.get('/delete-product/:_id',product.deleteproduct);




//router.get('/:id',getProductById);
//router.post('/',createProduct);
//router.patch('/:id',updateProduct);
//router.delete('/:id',deleteProduct);
module.exports = router;