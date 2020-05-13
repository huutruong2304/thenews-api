const axios = require('axios');
const cheerio = require('cheerio');

//CATEGORY KIT

//LIST CATEGORY ELEMENT
//#admWrapsite > div > header > div.header-bottom > div.w980 > ul >li
//TITILE ELEMENT
// a
//URL ELEMENT
// a
// const categoryKit = [
//     '#admWrapsite > div > header > div.header-bottom > div.w980 > ul >li',
//     'a',
//     'a'
// ]


const crawlCategory = async(urlDestination, categoryKit) => {
    if (!categoryKit) {
        return '';
    }

    //convert categoryKit to array
    // categoryKit = categoryKit.split(',');

    const res = await axios.get(urlDestination);
    let $ = await cheerio.load(res.data);
    let categories = [];


    $(categoryKit).map((index, ele) => {
        let title = $(ele).find('a').first().text().trim() || '';
        // console.log(title);
        let url = $(ele).find('a').attr('href') || '';
        categories.push({
            title,
            url: !url.includes('http') ? urlDestination + url : url
        })
    })
    return categories.filter(cate => cate.title !== '');
}

module.exports = {
    crawlCategory
}