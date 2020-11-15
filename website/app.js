let key = '&appid=0689525a777d2bf7d8a9318e0459288d';
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const localhostURL = "http://localhost:8080";



let dd= new Date();

let newDate = dd.getMonth() + '.' + dd.getDate() + '.' + dd.getFullYear();



document.getElementById('generate').addEventListener('click', performAction);





const getWeather = async (baseURL, code,key)=>{
    const link =baseURL + code + ',us'+ key;
    const res = await fetch(link);
    
    try {
        const Weatherdata = await res.json();
        
     
        return Weatherdata;
    }
    catch(error) {
        console.log('error', error);
    }
}

const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        
        const newData = await res.json();
       
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}



function performAction(e){

    var feelings = document.getElementById('feelings').value;
    var zipCode = document.getElementById('zip').value;
  

 getWeather(baseURL, zipCode,key)
 
    .then(function (data){

       const Fulldata={ 
        temperature: data.main.temp,
        date: newDate,
        user_response: feelings  }

       postData(localhostURL+'/addWeatherData', Fulldata )
       .then(function() {
            UpdateInterface()
        })
    })



}







const UpdateInterface = async () => {
    const request = await fetch(localhostURL+'/allData');
    try {
       const result = await request.json();
        
       document.getElementById('temp').innerHTML = result[0].temperature;
       document.getElementById('date').innerHTML = result[0].date;
       document.getElementById('content').innerHTML = result[0].user_response;
    }
    catch (error) {
        console.log('error', error);
    }
}