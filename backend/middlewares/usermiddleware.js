const zod = require('zod');
const {User} = require('../db.js')
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config.js')

const signupBody = zod.object({
     username:zod.string().email(),
     firstName:zod.string(),
     lastName:zod.string(),
     password:zod.string()
})

const signinBody = zod.object({
     username:zod.string().email(),
     password:zod.string(),
})

async function userSignupChecker(req,res,next){
        const {success}= signupBody.safeParse(req.body);
        if(!success){
            return res.status(411).json({
                 message: "Email already taken / Incorrect inputs"
            })
        }

        const userExists = await User.findOne({username:req.body.username});
        if(userExists){
            const userid = userExists._id;
            const token = jwt.sign({userid},JWT_SECRET);
            console.log(token)
            return res.status(411).json({
                message:"User Already Exists",
                token
            })
        }
        
        next()
}

async function userSigninChecker(req,res,next){
        const {success}= signinBody.safeParse(req.body);
        if(!success){
            return res.status(411).json({
                 message: "Email already taken / Incorrect inputs"
            })
        }

        const userExists = await User.findOne({
            username:req.body.username,
            password:req.body.password                  
        });
        
        if(userExists){
             req.body = userExists;
             return next();
        }
        
      return res.status(411).json({
	       message: "Error while logging in"
       })

}

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};



module.exports = {userSignupChecker, userSigninChecker, authMiddleware }