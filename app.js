const express = require('express');
const {v4: uuidv4} = require('uuid'); 
const morgan = require('morgan');
const ejs = require('ejs');

const app = express();
let port = 3000;
let host = 'localhost';

app.set('view engine', 'ejs'); 

let students = [
    {id: '1', name: "Nikhil", major: "Computer Science", gpa: 4}, 
    {id: '2', name: "Nithin", major: "Biology", gpa: 3.86}, 
    {id: '3', name:"Adithya", major: "Physics", gpa: 3.5}
];

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// The below middleware will be used by all the incoming requests because we are not specifying any path
// app.use((req, res, next) => {
//     console.log(req.method);
//     console.log(req.url);
//     next();
// });
// Instead of above middleware we have morgan middleware
app.use(morgan('tiny'));


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

app.get('/students', (req, res) => {
    res.json(students);
});

app.post('/students', (req, res) => {
    console.log(req.body);
    let student = req.body;
    student.id = uuidv4();
    students.push(student);
    res.redirect('/students');
});

app.get('/students/create', (req, res) => {
    res.sendFile('./views/new.html', {root: __dirname});
});

// Send student with particular id back to the client
app.get('/students/:sid', (req, res) => {
    console.log(req.params);
    let sid = req.params.sid;
    let student = students.find(element => element.id == sid);
    console.log(student);
    res.render('student', {student:student});
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

// For 404 page
app.use((req, res, next) => {
    res.status(400).send('Page cannot be found');
});

app.listen(port, host, () => {
    console.log('The server is running at port', port);
});