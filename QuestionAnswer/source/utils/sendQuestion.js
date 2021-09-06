const { Op } = require("sequelize");
const {answer,sequelize,question ,User ,previousQuestion}= require("D:/Node/inventory/models")

const sendQuestion=(async(userID)=>{
    try{
        let  userData = await User.findOne({
            attribute:['currentLevel'],
            where:{
                user_ID:userID
            }
        })// For getting the current Level of the user
        if(userData.currentLevel%6==0){
            userData.currentLevel=1
            userData.save()
            return ({ message:"Max limit reached. Try again"})
        }
        else{    
            const getPrevQuestion= await previousQuestion.findAndCountAll({
                where:{
                    UserUserID:userID
                }
            })
            const questionData= await question.findAndCountAll()
            response=questionData.rows
            let questionsAsked=[]
            let options=[]
            if(getPrevQuestion.count==questionData.count){
                return ({
                    message:"Questions are done for the day"
                })
            }
            else{
                getPrevQuestion.rows.forEach(data => {
                    questionsAsked.push(data.questionQuestionID)
                });
                const getQuestions= await question.findAndCountAll({
                    where:{
                        questionID:{
                            [Op.not]:questionsAsked
                        }
                    },
                    include:[answer]
                })
                const questionIndex = Math.floor(Math.random()*(getQuestions.count))
                const qns= getQuestions.rows[questionIndex]
                const updatingPrevQn= await previousQuestion.create({questionQuestionID:qns.questionID,UserUserID:userID})
                let startIndex=0;
                let optionSetData= await answer.findAndCountAll({
                    where:{
                        id:{
                            [Op.not]:qns.answerId
                        }
                    }
                })
                let correctAnswer= await answer.findOne({
                    where:{ id:qns.answerId}
                })
                const range= Math.floor(optionSetData.count/3)-1
                let endIndex= range
                for(let index=0;index<3;index++){
                    let randomOptionIndex= Math.floor(Math.random()*(endIndex-startIndex)+startIndex)
                    options.push(optionSetData.rows[randomOptionIndex].option)
                    startIndex=endIndex
                    endIndex += range
                }
                options.push(`${correctAnswer.option} *`)

                // for randomizing the options
                for (let i = options.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [options[i], options[j]] = [options[j], options[i]];
                }
                const response={questionID:qns.questionID, question:qns.question,options}
                userData.currentLevel +=1
                userData.save()
                return(response)
            }
        }
    }
    catch(error){
        console.log(error);
        return("Please try again there was a fault")
    }
})
module.exports=sendQuestion