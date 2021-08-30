const express = require('express')
const axios = require('axios')
let router = express.Router()
app=express()
app.use(settingHeadder)
router.use((req, res, next) =>{
    console.log(req.url, "@", Date.now());
    next();
  });
  
router.route("/dogBreedList")// the url is breeds/dogBreedList. router.route method is used to get the url.
.get(async(req,res)=>{
    try {
        axios.get('https://dog.ceo/api/breeds/list/all')
        .then((response)=>{
            return res.status(202).send({dogBreedList:Object.keys(response.data.message)})
        })
    } catch (error) {
        return res.status(404).send({error:""})
    }
})
router.route("/dogBreedList/subBreedList")
.get((req,res)=>{
    try {
        if(req.query.dogBreed){
            axios.get("https://dog.ceo/api/breed/"+encodeURIComponent(req.query.dogBreed)+"/list")
            .then((response)=>{
                return res.status(202).send({dogSubBreedList:response.data.message})
            },(reject)=>{
                return res.status(404).send({error:"Breed Not found"})
            })
        }
        else{
            return res.status(404).send({error:"please enter breed of the dog"})
        }
    } catch (error) {
        return res.status(404).send({error:"connection is not establised correctly"})
    }
})
router.route("/dogBreedImages")
.get((req,res)=>{
    try {
        let url=""
        let message
        const subBreed= req.query.subBreed
        const dogBreed= req.query.dogBreed 
        if(dogBreed){
            message="Success"
            url = "https://dog.ceo/api/breed/"+encodeURIComponent(dogBreed)
            if(subBreed && subBreed !== "" && subBreed !== null){
                 url+= "/"+encodeURIComponent(subBreed)+"/images"
            }
            else{
                url +="/images"
            }
        }
        else{
            message="Please enter the dog Breed name."
            url="https://dog.ceo/api/breeds/image/random"
        }
        axios.get(url)
            .then(response=>{
                return res.status(202).send({message,dogImages:response.data.message})
            },error=>{
                return res.status(404).send({error:"Unknown Dog Breed Please send again "})
            })
    } catch (error) {
        return res.status(404).send({error})
    }
})
function settingHeadder(req,res,next){
    req.setHeader("Content-Type","application/json")

}
module.exports = router; //important 