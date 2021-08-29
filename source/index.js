const express = require('express')
const path = require('path')
const axios=require('axios')

const subBreed = require('./utils/subBreed')
const dogImages = require('./utils/dogImages')
const bulkImages = require('./utils/sendBulkImages')
const breeds= require('./routes/breeds.js')

const app =  express()
const staticPath = path.join(__dirname,'../public')//creating the static path for browser JS
const viewsPath = path.join(__dirname,"../views")
app.use("/breed",breeds)
app.set('view engine','hbs')
app.set("views",viewsPath)
app.use(express.static(staticPath))

app.get("",(req,res)=>{
    res.render('index.hbs')
})
app.get('/dogBreed',async (req,res)=>{
    let dogBreedData
    try {
        dogBreedData = await axios.get('https://dog.ceo/api/breeds/list/all')
        res.statusCode=200
        res.setHeader("content-type","application/json")
        let dogBreeds={dogBreedList:Object.keys(dogBreedData.data.message)}
        return res.status(202).send(dogBreeds)

    } catch (error) {
        res.statusCode=404
        console.log(error);
        res.setHeader("content-type","application/json")
        return res.send({"Error":error}) 
    }
           
})
app.get('/subBreed',(req,res)=>{
    subBreed(req.query.dogBreed,(error, subBreedList)=>{
        if(error){
            res.statusCode=404
            res.setHeader("content-type","application/json")
            return res.send({success:false,error})
        }
        else{
            res.statusCode=200
            res.setHeader("content-type","application/json")
            return res.send({success:true,subBreedList})
        }
    })        
})
app.get('/pagination',(req,res)=>{
    const page= parseInt(req.query.page)
    const dogBreed= req.query.dogBreed
    const subBreed= req.query.subBreed
    dogImages(dogBreed,subBreed,(error, dogImageList)=>{
        if(error){
            res.statusCode=404
            res.setHeader("content-type","application/json")
            return res.send({success:false,error})
        }
        else{
            const startIndex=(page-1)*5
            const endIndex=page*5
            
            let resultingImages= dogImageList.slice(startIndex,endIndex)
            if(resultingImages.length==0){
                resultingImages="No more Images to show"
            }
            res.statusCode=200
            console.log(resultingImages);
            res.setHeader("content-type","application/json")
            return res.send({success:true,dogImages:resultingImages})
        }
        
    }) 
})

app.post('/getImagesByBreed/bulk', async(req,res)=>{
    let dogBreedInput = req.query.breed
    console.log(dogBreedInput);
    let images={}
    let dogBreedImage =  dogBreedInput.map((dogBreedName)=>{
       return bulkImages(dogBreedName)
    })
    let dogBreedImageData= await Promise.all(dogBreedImage)
    dogBreedImageData.map((dogBreedImages,index)=>{
        images[dogBreedInput[index]]=dogBreedImageData[index]
    })
    return res.send(images)
})

app.get('*',  (req,res)=>{
    res.status(404).send({errorMessage:"404.. Requested page didn't found"})
})
app.listen(3000,()=>{
    console.log("server started on localhost:3000...");
})
