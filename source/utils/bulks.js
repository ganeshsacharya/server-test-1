<<<<<<< HEAD
const subBreed = require('./subBreed')
const gettingDogImages= require('./dogImages')

const sendDogBreedImages = (async(dogBreedArray)=>{
    let dogBreedImageSet={}
    console.log("Sending data");
    dogBreedArray.forEach(async (dogBreeds)=>{
        console.log("inside for");
        subBreed(dogBreeds,async(error,subBreedData)=>{
            console.log("inside subBreed", dogBreeds);
            if(!error && subBreedData.length>1){
                let images=[]
                await gettingDogImages(dogBreeds,"none",async(error,dogBreedImages)=>{
                    console.log("inside dog Images",dogBreeds);
                    if(!error)
                    {
                        images.push(dogBreedImages)
                    }
                    dogBreedImageSet[dogBreeds]= await images
                })  
            }
        })
    })
    console.log("sent");
    return await {dogBreedImageSet}
})
=======
const subBreed = require('./subBreed')
const gettingDogImages= require('./dogImages')

const sendDogBreedImages = (async(dogBreedArray)=>{
    let dogBreedImageSet={}
    console.log("Sending data");
    dogBreedArray.forEach(async (dogBreeds)=>{
        console.log("inside for");
        subBreed(dogBreeds,async(error,subBreedData)=>{
            console.log("inside subBreed", dogBreeds);
            if(!error && subBreedData.length>1){
                let images=[]
                await gettingDogImages(dogBreeds,"none",async(error,dogBreedImages)=>{
                    console.log("inside dog Images",dogBreeds);
                    if(!error)
                    {
                        images.push(dogBreedImages)
                    }
                    dogBreedImageSet[dogBreeds]= await images
                })  
            }
        })
    })
    console.log("sent");
    return await {dogBreedImageSet}
})
>>>>>>> f0c3f867167ba4927515ea4a26425d848ef617e8
module.exports=sendDogBreedImages