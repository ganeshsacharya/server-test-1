const express = require('express')
const hbs = require('hbs')
const path = require('path')
const dogBreed = require('./utils/dogBreed')

const app =  express()
const staticPath = path.join(__dirname,'../public')//creating the static path for browser JS
const viewsPath = path.join(__dirname,"../views")

app.set('view engine','hbs')
app.set("views",viewsPath)
app.use(express.static(staticPath))

app.get("",(req,res)=>{
    res.render('index.hbs')
})
app.get('/dogBreed',(req,res)=>{
    dogBreed((error, dogBreedList)=>{
        if(error){
            return res.send({success:false,error})
        }
        else{
            return res.send({success:true,dogBreedList})
        }
    })        
})
app.get('*',  (req,res)=>{
    res.send('404',{errorMessage:"404.. Requested page didn't found"})
})
app.listen(3000,()=>{
    console.log("server started on localhost:3000...");
})