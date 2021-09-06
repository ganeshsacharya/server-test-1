const express = require("express")
const {answer,sequelize, inventory, question}  = require("D:/Node/Inventory/models")
const userRouter = require("./routes/users")
const qna= require("./routes/qna")
const app= express()

app.use("/user",userRouter)
app.use("/question",qna)

app.post("*", (req,res)=>{
    return res.status(404).send({error:"Page not found"})
})
app.get("*", (req,res)=>{
    return res.status(404).send({error:"Page not found"})
})
app.listen(3000,async ()=>{
    await sequelize.authenticate()
    .then(async()=>{
        await sequelize.sync()
        console.log("connection success...");
    })
    .catch((error)=>{ 
        console.log(error)     
        console.log("unable to connect");
    })
})