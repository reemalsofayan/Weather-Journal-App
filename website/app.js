let key = '0689525a777d2bf7d8a9318e0459288d';
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';



let date = new Date();

let newDate = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    e.preventDefault();

    const feelings = document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;
    
    console.log(newDate);

    getWeather(baseURL, zipCode, key)
    .then(function (data){
       postData('http://localhost:8080/addWeatherData', {temperature: data.main.temp, date: newDate, user_response: feelings } )
       .then(function() {
            UpdateInterface()
        })
    })
}


const getWeather = async (baseURL, code, key)=>{
    const res = await fetch(baseURL + code + ',us' + '&APPID=' + key);
    console.log(res);
    try {
        const Weatherdata = await res.json();
        console.log(Weatherdata);
     
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


const UpdateInterface = async () => {
    const request = await fetch('http://localhost:8080/allData');
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