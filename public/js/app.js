

let select= document.getElementById('mainDogBreed')
console.log(select);
const errorDispaly=document.querySelector('#error')
fetch('http://localhost:3000/dogBreed').then((response)=>{
    response.json().then((data)=>{
        if(!data.success){
            errorDispaly.textContent=data.error
        }else{
            for(index in data.dogBreedList) {
                select.options[select.options.length] = new Option(data.dogBreedList[index], index);
            }
        }
    })
})