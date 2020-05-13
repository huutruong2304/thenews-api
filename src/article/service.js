const { crawlArticles } = require('../utils/crawler/crawl-article');
const { ClassifyCategory } = require('../classify-category/index');
const { Category } = require('../category/index')
const { Destination } = require('../destination/index')


const getArticlesFromWeb = async() => {
    return await Promise.all(urls.map(async url => await crawlArticles(url)));
}


// because categories is a virtual property, we just have it when calling it
const getArticlesByCC = async(cc) => {
    const classCate = await ClassifyCategory.findOne({ slug: cc });
    await classCate.populate('categories').execPopulate();
    return await Promise.all(
        classCate.categories.map(async cate => {
            let des = await Destination.findById(cate.destination);
            if (!des) {
                return [];
            }
            return await crawlArticles(cate.url, des.url, des.articleKit);
        })
    );
}

module.exports = {
    getArticlesFromWeb,
    getArticlesByCC
}