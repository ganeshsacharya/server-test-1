const request = require('postman-request')
const axios = require('axios')
const { response } = require('express')
const dogBreeda= (callback)=>{
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

const dogBreed=(aync)=>{
    const url='https://dog.ceo/api/breeds/list/all'
    let error=false
    try {
        let getDogBreed= await axios.get(url)
        
        } catch (error) {
        return(error)
    }
}
module.exports=dogBreed