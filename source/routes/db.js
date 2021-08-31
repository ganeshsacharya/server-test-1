const express = require('express')
const mysql = require('mysql')
let router= express.Router()

let db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nodesql"
})
db.connect(err=>{
    if(err){
        console.error(err);
        return res.status(400).send(err)
    }
    console.log("MYSQL is connected....,")
})
router.route("/createTable").get((req,res)=>{
    let sql = "CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))"
    db.query(sql,(err)=>{
        if(err){
            return res.status(400).send(err)
        }
        res.send("Table created...")
    })
})
router.route("/insert").get((req,res)=>{
    const post={name: req.query.name,designation :req.query.designation }
    const sql=" INSERT INTO employee SET ?"
    let query = db.query(sql, post, err=>{
        if(err){
            return res.status(400).send(err)
        }
        return res.send("Inserted successfully")
    })
})
router.route("/fetchData").get((req,res)=>{
    const sql="SELECT * from employee"
    let query = db.query(sql, (err, result)=>{
        if(err){
            return res.status(400).send(err)
        }
        return res.send({result})
    })
})
router.route("/update").get((req,res)=>{
    if(req.query.name && req.query.id){
        const sql=`UPDATE employee SET name = '${req.query.name}' where id='${req.query.id}'`
        db.query(sql, (err)=>{
            if(err){
                return res.status(400).send(err)
            }
            return res.send("Updated successfully")
        })
    }else{
        return res.status(400).send({message:"Name and ID is required"})
    }
})
router.route("/delete").get((req,res)=>{
    if(req.query.id){
        const sql=`DELETE from employee where id='${req.query.id}'`
        db.query(sql, (err)=>{
            if(err){
                return res.status(400).send(err)
            }
            return res.send("Deleted successfully")
        })
    }else{
        return res.status(400).send({message:"ID is required"})
    }
})

module.exports=router