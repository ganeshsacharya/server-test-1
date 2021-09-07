
const express = require("express")
const {sequelize, User, inventory}= require("D:/Node/inventory/models")
const router= express.Router()

router.route("/add").post(async(req,res)=>{
    if(req.body){
        try{
            const {userName, coin, life}= req.body
            const users= await User.create({userName})
            const invent= await inventory.create({coin, life, UserUserID:users.user_ID})
            return res.status(200).send({users:users,invent})
            
        }catch(err){
            console.log(err);
            return res.status(404).send({error:err})
        }
    }else return res.status(400).send({error:"some error"})
})

router.route("/findByID").get(async(req,res)=>{
    try {
        const findUser= await User.findOne({
            include: [inventory],
             where: {user_ID: req.query.ID}
        })
        return res.status(200).json({findUser})
    } catch (error) {
        console.log(error);
        return res.status(404).json(error)
    }
})

module.exports= router
