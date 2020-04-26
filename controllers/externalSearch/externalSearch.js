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
                
                var data = JSON.stringify(res);
                // console.log(data);
                //TODO add error handling
                callback(null, data);
            });
        })
        .catch(error => {
            console.log(error);
        });
    // return title + '|key : ' + process.env.key;
}


module.exports.searchGoodreads = searchGoodreads;
