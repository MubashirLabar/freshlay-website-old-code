const {
    check
} = require('express-validator');
exports.validSignup = [
  
    check('username', 'Name is required').notEmpty()
    .isLength({
        min: 4,
        max: 32
    }).withMessage('username must be between 4 to 32 characters'),

   // check('email').notEmpty()
   // .isEmail()
   // .withMessage('Must be a valid email address'),

   // check('phoneno', 'Phone no is required').optional().isNumeric().isLength({
    //    min: 12,
    //    max: 12
   // }).withMessage('phone no must contain 10 digit'),
   
    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Password must contain at least 6 characters')
]

exports.validLogin = [


    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Password must contain at least 6 characters')
]

exports.resetpassvalidmessage = [
  

    check('phoneno', 'Phone no is required').isNumeric().isLength({
        min: 10,
        max: 10
    }).withMessage('phone no must contain 10 digit'),

  
]

exports.forgetemailpassvalid = [
    check('email')
     .isEmail()
   .withMessage('Must be a valid email address')
]



exports.forgotPasswordValidator = [
    check('email')
      //  .not()
        .notEmpty()
        .isEmail()
        .withMessage('Must be a valid email address')
];

exports.resetPasswordValidator = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must be at least  6 characters long')
];