const vef= (req,res,next)=>{
    if(req.session.userId){
   next();

    }else{

        res.send("no")
    }
}


module.exports={
   vef: (req,res,next)=>{
    if(req.session.userId){
   next();

    }else{

        res.send("no")
    }
}
 
}