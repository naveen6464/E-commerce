const productModel= require("../models/productModels")

const CategoryModel = require("../models/categoryModels");

module.exports={
    addproduct: async (req, res) => {
      
    try {
     const categories= await CategoryModel.find();
     // console.log(categories)
      res.render("product/add-product",{categories:categories});
    } catch (error) {
      console.log(error);
    }
  },
  addproductpost: async(req,res)=>{
     console.log("add product");
     console.log(req.body);
     const result=req.file.filename;
     try{
       productModel.create({
        Category:req.body.Category,
        product_name:req.body.product_name,
        price:req.body.price,
        stock:req.body.stock,
        description:req.body.description,
        product_Image:result
     })
      res.redirect('/admin/add-product');
     }catch(e){
      console.log(e)
     }
  },
   allproducts: async (req,res)=>{
    try{
        const categories= await productModel.find();
        res.render("product/view-product",{categories});
    }
    catch(error){
       console.log(error)
    }
},
deleteproduct: async(req,res)=>{
  try{
     console.log(req.params._id);
     let id = req.params._id;
    await productModel.findByIdAndDelete(id);
     res.redirect("/admin/view-product/");
  }catch(e){
    console.log(e)
  }
}
}