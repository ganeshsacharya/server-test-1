const express = require("express")
const { Op } = require("sequelize");
const {answer,sequelize,question,User  ,previousQuestion}= require("D:/Node/inventory/models")
const router= express.Router()
const sendQuestion = require("../utils/sendQuestion")

router.route("/send").get(async(req,res)=>{
    let response=""
    try {
        if(req.query){
            const userID= req.query.userID
            response=await sendQuestion(userID)
            return res.json(response) 
        }
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
})
router.route("/checkAnswer").get(async(req,res)=>{
    if(req.query){
        let message=""
        let response={}
        let nextQuestion
        try {
            const {questionID, userID, option}= req.query
            const questionData = await question.findOne({
                attribute:['questionID', "answerId"], 
                where:{questionID:questionID},
                include:answer
            })  
            if(option==questionData.answer.option){
                message="Correct Answer. Next Question is"
                nextQuestion=await sendQuestion(userID)
            }else{
                message="Sorry Wrong answer.. Please Try again"
                let  userData = await User.findOne({
                    attribute:['currentLevel'],
                    where:{
                        user_ID:userID
                    }
                })
                userData.currentLevel=1;
                userData.save()
            }
            response={message,nextQuestion}
            return res.json(response)
        } catch (error) {
            console.log(error);
            return res.status(400).json({error:"some problem"})
        }
    }
})
module.exports= router