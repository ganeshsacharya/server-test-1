let select= document.getElementById('mainDogBreed')
console.log(select);
const errorDispaly=document.querySelector('#error')
fetch('http://localhost:3000/dogBreed').then((response)=>{
    response.json().then((data)=>{
        if(!data.success){
            errorDispaly.textContent=data.error
        }else{
            for(index in data.dogBreedList) {
                select.options[select.options.length] = new Option(data.dogBreedList[index], data.dogBreedList[index]);
            }
            
        }
    })
})
function subBreed(value){
fetch("http://localhost:3000/subBreed?dogBreed="+value).then((response)=>{
    let select = document.getElementById("subDogBreed");
    let length = select.options.length;
    for (i = length-1; i >= 0; i--) {
        select.options[i] = null;
    }
    response.json().then((data)=>{
        if(!data.success){
            errorDispaly.textContent=data.error
        }else{
            console.log(data);
            for(index in data.subBreedList) {
                select.options[select.options.length] = new Option(data.subBreedList[index], data.subBreedList[index]);
            }
            if(data.subBreedList.length==0){
                select.options[select.options.length] = new Option("Sub Breed Not Available", "undefined");
            }
            
        }
    })
})
}
const getImages =document.querySelector('form')
/*getImages.addEventListener('submit',(e)=>{
    e.preventDefault();
    let dogBreed = document.getElementById('mainDogBreed').selectedOptions[0].value
    let subDogBreed = document.getElementById('subDogBreed').selectedOptions[0].value
    console.log(subDogBreed);
    if(subDogBreed=="undefined"){
        subDogBreed=undefined
    }
    fetch('http://localhost:3000/pagination?dogBreed='+dogBreed+'&subBreed='+subDogBreed+'&page=10').then((response)=>{
        response.json().then((data)=>{
            if(!data.success){
                errorDispaly.textContent=data.error
            }else{
                let images=data.dogImages
                console.log(images);
            }
        })
    })

})*/