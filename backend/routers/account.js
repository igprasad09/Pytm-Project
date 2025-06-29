const express = require('express');
const {authMiddleware} = require('../middlewares/usermiddleware');
const {Account} = require('../db.js');
const { default: mongoose } = require('mongoose');
const routes = express.Router();

routes.get('/account',(req,res)=>{
      res.send("account")
});

routes.get('/account/balance', authMiddleware, async(req, res) => {
    try{
       const {balance} = await Account.findOne({userId:req.userId});
       return  res.json({
        balance
       });
    }catch(error){
       return res.json({
          message:"no user exists"
       })
    }
});

routes.post('/account/transfer',authMiddleware,async(req,res)=>{
      const {to, amount} = req.body;
      const userId = req.userId;
      const session = await mongoose.startSession();
      
      session.startTransaction();

      const {balance} = await Account.findOne({
            userId: userId
      }).session(session);
      
      if(!amount || balance < amount){
          return res.status(422).json({       
	               message: "Insufficient balance"
           })
      }

      try{
         const toUser = await Account.findOne({
              userId: to
         }).session(session);

         if(!toUser){
             return res.status(422).json({
	              message: "Invalid account"
             })
         }
      }catch(err){
          return res.status(422).json({
	              message: "Invalid account"
             })
      }

      //transfer the amount increase and decrease amount
      await Account.findOneAndUpdate({
           userId
      },{
        $inc:{
             balance: -amount,
        }
      }).session(session);
      
      await Account.findOneAndUpdate({
           userId:to
      },{
        $inc:{
             balance: amount,
        }
      }).session(session);
      
    await session.commitTransaction();
     return res.json({
           	message: "Transfer successful"
       })
})

module.exports = routes;