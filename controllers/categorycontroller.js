const category=require('../models/categoryModels');

module.exports={
    addcategory: async (req, res) => {
    try {
      console.log('add category')
      res.render("admin/add-category");
    } catch (error) {
      console.log(error);
    }
  },
  addcategorypost: async(req,res)=>{
    console.log(req.body);
     const result=req.file.filename;
    try{
      category.create({
        Category: req.body.Category,
        Category_Meta: req.body.Category_Meta,
        Category_Image: result
      })
    res.redirect("/admin/add-category");
  }catch(e){
    console.log(e);}   
   },
viewcategory: async(req,res)=>{
    console.log('view category')
    const categories= await category.find();
   // console.log(categories);
    res.render("admin/view-category",{categories});  
},
editcategory: async(req,res)=> {
 // console.log('edit category');
 
  try{
    //let id = req.params._id;
   let categories= await category.findById({
    _id:req.params._id
     })
  console.log(categories)
  res.render("admin/edit-category",{categories});
  } catch(e){
    next(e)
  }
},
  editcategorypost: async(req,res)=>{
     const result=req.file.filename;
  try{
    var id=req.params._id
     var Category=req.body.Category
     var Category_Meta=req.body.Category_Meta
     var Category_Image=result
     await category.findByIdAndUpdate({_id:id},{Category,Category_Meta,Category_Image},{new: true});
     console.log('8.view category')
     res.redirect("/admin/view-category/");
  }catch(e){
    console.log(e)
  }
},

deletecategory: async(req,res)=>{
    console.log(req.params._id);
     let id = req.params._id;
    await category.findByIdAndDelete(id);
     res.redirect("/admin/view-category/");
}
}
