<<<<<<< HEAD
const request = require('postman-request')
const subBreed = ((mainBreed,callback)=>{
    let url = "https://dog.ceo/api/breed/"+encodeURIComponent(mainBreed)+"/list"
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
=======
const request = require('postman-request')
const subBreed = ((mainBreed,callback)=>{
    let url = "https://dog.ceo/api/breed/"+encodeURIComponent(mainBreed)+"/list"
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
>>>>>>> f0c3f867167ba4927515ea4a26425d848ef617e8
module.exports=subBreed