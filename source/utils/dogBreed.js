const request = require('postman-request')

const dogBreed= (callback)=>{
    const url='https://dog.ceo/api/breeds/list/all'
    request({url,json:true},(error,response,body) =>{
        if(error){
            callback("Can't connect to Server please try again", undefined)
        }
        else{
            callback(undefined,Object.keys(body.message))
        }
    })
}
module.exports=dogBreed