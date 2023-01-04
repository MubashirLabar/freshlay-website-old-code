exports.urlnotfound =  (req,res,next) => {
    const error = new Error(`Not found ${req.originalUrl}`);
    res.status(404);
    // we are passing this error to error handler/middleware
    next(error);
}

exports.errorHandler = (err,req,res,next) => {
    console.log('error handler reached')
    console.log(err)
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode);
   // console.log(process.env.NODE_ENV)
    res.json({
        errors :err.message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack
    })
}