const express = require('express')
const path = require('path')
const breeds= require('./routes/breeds.js')

const app =  express()
const staticPath = path.join(__dirname,'../public')//creating the static path for browser JS
const viewsPath = path.join(__dirname,"../views")

app.use("/breed",breeds) //Used for routing.
app.set('view engine','hbs')
app.set("views",viewsPath)
app.use(express.static(staticPath))

app.get("",(req,res)=>{
    res.render('index.hbs')
})
app.get('*',  (req,res)=>{
    res.status(404).send({errorMessage:"404.. Requested page didn't found"})
})
app.listen(3000,()=>{
    console.log("server started on localhost:3000...");
})
