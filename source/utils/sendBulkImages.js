const axios = require('axios')

const checkEligibility = (async(dogBreed)=>{
    let dogBreedImage=[]
    try {
        let subBreedData = await axios.get("https://dog.ceo/api/breed/"+dogBreed+"/list")
        if(subBreedData.data.message.length>1){
            let dogBreedImageData = await axios.get("https://dog.ceo/api/breed/"+dogBreed+"/images")
            dogBreedImage=await dogBreedImageData.data.message
        }
    } catch (error) {
        dogBreedImage.push(error.response.data.message);
    }
    
    
    return await dogBreedImage
})
module.exports = checkEligibility