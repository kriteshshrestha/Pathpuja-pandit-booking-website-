const authorizeroles=(...allowedroles)=>{
  return (req,res,next)=>{
    if(!allowedroles.includes(req.user.usertype)){
      return res.status(403).send({
        success:false,
        message:"Access Denied"
      });
    }
    next();
  };
};

module.exports={authorizeroles};