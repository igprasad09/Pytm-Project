const express = require('express');
const {User, Account} = require('../db.js');
const jwt = require('jsonwebtoken');
const zod = require('zod')
const {JWT_SECRET }= require('../config.js')
const routes = express.Router();
const {userSignupChecker, userSigninChecker, authMiddleware } = require('../middlewares/usermiddleware');

const updateReq = zod.object({
        password:zod.string().optional(),
        firstName:zod.string().optional(),
        lastName:zod.string().optional()
})

routes.post('/user/signup',userSignupChecker,async(req,res)=>{
       const user = await User.create(req.body);
       const userId = user._id;
       try{
            await Account.create({
                               userId,
                               balance: 1 + Math.random() * 10000
              });
         
       }catch(err){
          console.log(err);
       }

       const token = jwt.sign({userId},JWT_SECRET);
       res.json({
	message: "User created successfully",
	token: token
       })
})

routes.post('/user/signin', userSigninChecker, (req, res) => {
    const user = req.body;
    const token = jwt.sign(
        { userId: user._id, username: user.username },
        JWT_SECRET
    );
    res.json({ token });
});


routes.patch('/user',async(req,res)=>{
        const body = req.body;
        const {success} = updateReq.safeParse(body);
        if(!success){
             return res.status(200).json({
              	message: "Error while updating information"
              })
        }
        
       await User.updateOne({ _id: req.userId }, req.body); 

       return res.json({
	         message: "Updated successfully"
           })
})

routes.get("/username",authMiddleware,async(req,res)=>{
          const userId = req.userId;
          const user = await User.findById(userId);
          const name = user.firstName + ' ' + user.lastName;
          res.json({
              name
          })
})

routes.get('/user/bulk',authMiddleware,async(req,res)=>{
        const filter = req.query.filter || "";
        const userId = req.userId;
 
         const users = await User.find({
            _id: { $ne: userId }, 
            $or: [
                { firstName: { "$regex": filter, "$options": "i" } }, 
                { lastName: { "$regex": filter, "$options": "i" } }
            ]
        });

        res.json({
              user:users.map(user=>({
                     username:user.username,
                     firstName:user.firstName,
                     lastName:user.lastName,
                     _id:user._id
              }))
       })
})

module.exports = routes;