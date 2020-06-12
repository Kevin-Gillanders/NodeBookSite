require('dotenv').config();
const http = require('http');
const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const path = require('path');

const externalSearch = require("./controllers/externalSearch/externalSearchUtil");

const hostname = '127.0.0.1';
const port = 3000;

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.json());

app.use(favicon(path.join(__dirname , 'public', 'favicon.ico')));

app.set('views', 'views');
app.set('view engine', 'pug')


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


/*
===========================================
Index
===========================================
*/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname ,  "views", "searchGoodreads" , "search.html"));
});


/*
===========================================
Books
===========================================
*/
app.get('/books',  (req, res) => {
    res.sendFile(path.join(__dirname , "views", "searchGoodreads", "search.html"));
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

app.get(("/books/externalSearch"), async (req, res) =>
{
    //TODO Create logic module
    console.log(req.query.title);

    let title = req.query.title;
    // res.setHeader('Content-Type', 'application/json');
    // res.write(`You searched for : ${search.search(title)}`);
    // res.json(search.search(title));
    try{
        // var bookData = await search.searchGoodreads(title);
        // var data = await search.advancedSearchGoodReads(bookData);
        var data = await externalSearch.searchGoodreads(title);
        res.render(path.join('searchGoodreads', 'searchResult'), {data: data, title: title});

    }
    catch(error)
    {
        console.log(error);
        res.render(path.join('shared', 'error.html'), {error: error})
    }
    finally{
        res.end();
    }
    // }
    // catch(error)
    // {}
    



});



/*
===========================================
Test stuff
===========================================
*/
app.get('/hello',  (req, res) => {
    res.render('demo/hello', { title: 'Hello', message: 'Hello there!sdfadsfsadf' });
});

app.get('/demo/test', (req, res) => {
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


