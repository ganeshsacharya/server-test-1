const express = require('express')
const mysql = require("mysql")
const database = require("./routes/db")
//MYSQL connection 
app.use("/database", database)
const db  = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    //database:<dbname> -if database already exist
    //port: <portnumber> - if mysql is insalled on different port
 })
db.connect(err=>{
    if(err){
        console.error(err);
        throw new Error(err);
    }
    console.log("MYSQL is connected....,")
})
const app= express()
app.get("/createDB", (req,res)=>{
    let sql="CREATE DATABASE nodesql"
    db.query(sql,(err)=>{
        if(err){
            throw new Error(err);
        }
        res.send("database created...")
    })
})
app.get("*",(req,res)=>{
    res.status(404).send("Page Not found.")
})
app.listen(3000,()=>{
    console.log("Server running on localhost:3000 ");
})