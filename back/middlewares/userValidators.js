const { body, validationResult ,check} = require("express-validator");

const registerRules=()=>[
    body('firstName',"firstName is required").notEmpty(),
    body('lastName',"lastName is required").notEmpty(),
    body('email',"it should an Email").isEmail(),
    body('password',"password should contain at least 6 caracteres").isLength({min:6})
]
const loginRules = () =>  [
      check('email','username or email is required').notEmpty(),
      check('password','password is required').notEmpty()
    ]
  

const validator=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
}else{
    next()
}
} 









module.exports={registerRules,loginRules,validator}