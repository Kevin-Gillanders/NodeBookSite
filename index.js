const http = require('http');
const express = require('express');
var app = express();
const bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 3000;

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.json());

app.set('views', 'views');
app.set('view engine', 'pug')


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


/*
===========================================
Index
===========================================
*/
app.get('/', (req, res) => res.sendFile(__dirname + "/" + 'home.html'));


/*
===========================================
Books
===========================================
*/
app.get('/books', function (req, res) {
    res.sendFile(__dirname + "/books/" + 'search.html');
});


/*
===========================================
Books search 
===========================================
*/


app.post(("/books/search"), (req, res) =>
{
    console.log(req);
    res.write("asdfas|");
    res.write(JSON.stringify(req.body.title));
    res.write("|a#sdfg");
    res.end();
});

app.get(("/books/search"), (req, res) =>
{

    console.log(req.query.title);

    let title = req.query.title;

    res.write(`You searched for : ${title}`);
    res.end();
});

app.get('/hello', function (req, res) {
    res.render('hello', { title: 'Hello', message: 'Hello there!sdfadsfsadf' });
});

app.get('/demo/test', function (req, res) {
    var listOfStuff = ["cat", "dog", "mouse"];
    res.render('demo/test', 
    { 
        newTitle: 'Hello', 
        message: "this is a demo section", 
        book: 
        {
            title: "Dune", 
            author :'Frank Herbert', 
            cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1567929075i/39776179._SY180_.jpg'
        }, 
        listOfStuff: listOfStuff 
    });
});


