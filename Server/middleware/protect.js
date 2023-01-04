const jwt = require('jsonwebtoken')
module.exports = (req,res,next) => {
    //console.log('reached');
   let token = req.header('myjwttoken');
  if(!token){
      //
     return res.status(422).json({
        errors: "No token, authorization denied"
      });
  }
  try {
      const decoded= jwt.verify(token,process.env.myjwt42);
      req.user= decoded
      next()
  } catch (error) {
   //console.log(error)
   return res.status(422).json({
    errors: "Token is not valid,Please Retry"
  });
  }
}