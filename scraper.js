const axios = require('axios')
const cheerio = require("cheerio")


async function scrape(ip){
    //take in an IP and scrape the respective value 
    const { data } = await axios.get(ip);
    const $ = cheerio.load(data);
    //from the data get the html
    const h1 = $("h1").html();
    console.log(h1);
    //covert h1 to type int 
    const h1Int = parseInt(h1);
    console.log(h1Int);
    return h1Int;

}

//export the function
export default scrape