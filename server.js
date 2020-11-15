
projectData = [];

const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const cors = require('cors');
app.use(cors());


app.use(express.static('website'));
const port = 8080;


const server = app.listen(port, listening);

function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};


app.get('/allData', getData)
function getData (request, response) {
    response.send(projectData);

    projectData = [];

}


app.post('/addWeatherData', addData)

function addData(request, response) {

    console.log(request.body);

    newData = {

        temperature:request.body.temperature,
        date: request.body.date,
        user_response:request.body.user_response

    }
    projectData.push(newData);
    response.send(projectData);

    console.log(projectData);
}


