const axios = require('axios');
const xml2js = require('xml2js');
const xmlParser = xml2js.Parser();
// const settings = require("settings");

// const key = settings.key;

searchGoodreads = async (title) =>
{
    return new Promise(function(resolve, reject){ 
        var apiInitialSearchEndPoint = `https://www.goodreads.com/search/index.xml?key=${process.env.key}&q=${title}`
        var booksData = [];

        axios.get(apiInitialSearchEndPoint)
            .then(response => 
            {
                try{
                    // console.log(data);
                    xmlParser.parseString(response.data, (err, res) =>{
                        
                        var data = JSON.parse(JSON.stringify(res));

                        var books = data.GoodreadsResponse.search[0].results[0].work;     
                        books.forEach((book) => {
                            booksData.push(extractData(book));
                        });
                    });
                }
                catch(error){
                    console.log(error);
                }
                finally
                {
                    resolve( Promise.all(booksData));
                }
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
    // return title + '|key : ' + process.env.key;
}

const extractData =  async (message) =>
{
    return new Promise((resolve, reject) =>{
        try {
            var goodReadsID = message.best_book[0].id[0]._;
            var amountOfRatings = message.ratings_count[0]._;

            var year = (message.original_publication_year[0]._ != null ? message.original_publication_year[0]._ : "1");
            var month = (message.original_publication_month[0]._ != null ? message.original_publication_month[0]._ : "1");
            var day = (message.original_publication_day[0]._ != null ? message.original_publication_day[0]._ : "1");
            var publicationDate = year + "-" + month  + "-" + day;

            var avgRating = message.average_rating[0];
            var title = message.best_book[0].title[0]; 
            var authorID = message.best_book[0].author[0].id[0]._;
            var authorName = message.best_book[0].author[0].name[0];
            var cover = message.best_book[0].image_url[0];
            
            // var num_pages = advancedData.GoodreadsResponse.book[0].num_pages[0];
            var jsonData = 
            {
                "GoodReadsID" : goodReadsID,
                "AmountOfRatings" : amountOfRatings,
                "PublicationDate" : publicationDate,
                "AverageRating" : avgRating,
                "Title" : title,
                "GoodReadsAuthorID" : authorID,
                "AuthorName" : authorName,
                "Cover" : cover
            };
            // console.log(jsonData);
            resolve(jsonData);
        }
        catch(error)
        {
            reject(error);
        }
    });

} 

const advancedSearchGoodReads = async (books) =>
{
    var advData = [];
    return new Promise((resolve, reject) => {
        try
        {
            for(var book of books)
            { 
                advData.push(advancedQueryGoodReads(book));
            }
        }
        catch(error)
        {
            reject(error);
        }
        finally{
            resolve( Promise.all(advData));
        }
    });

}
const advancedQueryGoodReads = async (book) =>
{
    return new Promise((resolve, reject) => 
    {

        var goodReadsID = book.GoodReadsID;
        var advancedSearch = `https://www.goodreads.com/book/show/${goodReadsID}.xml?key=n0mstayRjsbdLBxIiBcGg`;

        axios.get(advancedSearch).then(response => {
            xmlParser.parseString(response.data, (err, res) =>{
                try
                {
                    var advancedData = JSON.parse(JSON.stringify(res));

                    
                    book.isbn = advancedData.GoodreadsResponse.book[0].isbn13;
                    book.publisher = advancedData.GoodreadsResponse.book[0].publisher[0];
                    book.num_pages = advancedData.GoodreadsResponse.book[0].num_pages[0];
                    book.description = advancedData.GoodreadsResponse.book[0].description[0];
                    book.original_title = (advancedData.GoodreadsResponse.book[0].original_title  != null ? advancedData.GoodreadsResponse.book[0].original_title[0] : "");
                    book.rating_dist = (advancedData.GoodreadsResponse.book[0].rating_dist  != null ? advancedData.GoodreadsResponse.book[0].rating_dist[0] : "");
                    
                    // console.log(JSON.stringify(advancedData.GoodreadsResponse.book[0].authors, null, 2));
                    // console.log(advancedData.GoodreadsResponse.book[0]);
                    // console.log("==============================");

                }
                catch(error)
                {
                    reject(error);
                }
                finally
                {
                    resolve(book);
                }
            });
        })
        
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
}
const parseShelves = (goodReadsID, data) =>
{

}


module.exports.searchGoodreads = searchGoodreads;
module.exports.advancedSearchGoodReads = advancedSearchGoodReads;
