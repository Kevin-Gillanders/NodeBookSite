const http = require('http');

const search = require("./externalSearch");



const searchGoodreads = async (title) =>{

    var data;
    try{
        var bookData = await search.searchGoodreads(title);
        data = await search.advancedSearchGoodReads(bookData);
    }
    catch(error)
    {
        console.log(error);
    }
    finally{
        return data;
    }
}


module.exports.searchGoodreads = searchGoodreads;
