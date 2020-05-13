const axios = require('axios')
const cheerio = require('cheerio')


//ARTICLE KIT

//LIST ARTICLE ELEMENT

//TITLE ELEMENT

//URL ELEMENT

//


// tuoitre
//'#content > div > div.list-middle > div > div.w664.fl.stream-home.list-middle-content > div > ul>li'


const crawlArticles = async(urlCategory, urlDes, articleKit) => {
    if (!articleKit) {
        console.log(urlDes + ' OUT!');
        return [];
    }
    articleKit = articleKit.split(',');
    // console.log(articleKit)

    const res = await axios.get(urlCategory);
    const $ = await cheerio.load(res.data);
    const articles = [];


    $(articleKit[0]).map((index, ele) => {
        let title = $(ele).find(articleKit[1]).text().trim();
        let url = urlDes + $(ele).find(articleKit[2]).attr('href');
        let img = $(ele).find(articleKit[3]).attr('data-src') ? $(ele).find(articleKit[3]).attr('data-src') : $(ele).find(articleKit[3]).attr('src');
        let summary = $(ele).find(articleKit[4]).text().trim();
        articles.push({
            url,
            title,
            img,
            summary
        });
    })
    return articles.length > 0 ? articles : [{
        msg: 'No article'
    }];
}


module.exports = {
    crawlArticles
}