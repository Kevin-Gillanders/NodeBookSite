const axios = require('axios');
const xml2js = require('xml2js');
const xmlParser = xml2js.Parser();
// const settings = require("settings");

// const key = settings.key;

searchGoodreads = function(title, callback)
{
    axios.get(`https://www.goodreads.com/search/index.xml?key=${process.env.key}&q=${title}`)
    .then(response => 
        {
            // console.log(data);
            xmlParser.parseString(response.data, (err, res) =>{
                
                var data = JSON.parse(JSON.stringify(res));

                var books = data.GoodreadsResponse.search[0].results[0].work;

                // console.log(data);
                // console.log(books[0]);
                // console.log(data.GoodreadsResponse.search);
                // console.log(data.GoodreadsResponse.search[0].results);
                // console.log(data.GoodreadsResponse.search[0].results[0]);
                // console.log(data.GoodreadsResponse.search[0].results[0].work[0]);
                // console.log("search data");
                books.forEach((book) => {
                    console.log(book.best_book[0].title);
                });

                // console.log(data)
                // , (err, res) =>{

                //     console.log("out");
                // });
                //TODO add error handling
                callback(null, JSON.stringify(data.GoodreadsResponse.search[0].results[0].work[0]));
            });
        })
        .catch(error => {
            console.log(error);
        });
    // return title + '|key : ' + process.env.key;
}



module.exports.searchGoodreads = searchGoodreads;
