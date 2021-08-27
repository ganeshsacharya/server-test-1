const request = require('postman-request')
const subBreed = require('./subBreed')
const imagesOfDog=((dogBreed,subBreed="none",callback)=>{
    let url="https://dog.ceo/api/breed/"+encodeURIComponent(dogBreed)
   
    
    if(!subBreed&& subBreed.length>0){
        url +="/"+encodeURIComponent(subBreed)
    }
    url +="/images"
    console.log("dog Images",url);
    request({url,json:true},(error,response,body) =>{
        if(error){
            callback("Can't connect to Server please try again", undefined)
        }
        else if(body.status=="error"){
            callback("The breed you are looking for is not found.. ",undefined)
        }
        else{
            callback(undefined,body.message)
        }
    })
})
module.exports=imagesOfDog