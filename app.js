const express = require('express');

const app = express();
let port = 3000;
let host = 'localhost';

let students = [{id: 1, name: "Nikhil"}, {id: 2, name: "Nithin"}, {id: 3, name:"Adithya"}];

app.get('/', (req, res) => {
    // res.statusCode = 200;
    // res.end('Home page');
    // Instead of doing like above there is a simple way in express
    // res.send('Home Page');
    // console.log(__dirname);
    // dirname gives the abosolute path to the directory where the app.js is located
    console.log(req.url);
    console.log(req.query);

    res.sendFile('./views/index.html',{root: __dirname});
});

// Send student with particular id back to the client
app.get('/students/:sid', (req, res) => {
    console.log(req.params);
    let sid = req.params.sid;
    let student = students.find(element => element.id == parseInt(sid));
    console.log(student);
    res.json(student);
    // sends empty body when student object is undefined
});


// Redirect
app.get('/contact-us', (req, res) => {
    res.redirect('/contact');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/contact', (req, res) => {
    res.send('Contact Page');
});

app.listen(port, host, () => {
    console.log('The server is running at port', port);
});