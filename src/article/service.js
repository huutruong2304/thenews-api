const { crawlArticles } = require('../utils/crawler/crawl-article');
const { ClassifyCategory } = require('../classify-category/index');
const { Category } = require('../category/index');
const { Destination } = require('../destination/index');
const CacheService = require('../utils/cache')

const ttl = 60 * 60 * 0.5; //tính bằng giây
const cache = new CacheService(ttl);


const getArticlesFromWeb = async() => {
    return await Promise.all(urls.map(async url => await crawlArticles(url)));
}


// because categories is a virtual property, we just have it when calling it
const getArticlesByCC = async(cc) => {
    const key = "atc-" + cc;
    const classCate = await ClassifyCategory.findOne({ slug: cc });
    await classCate.populate('categories').execPopulate();
    if (cache.has(key)) {
        return cache.get(key);
    }
    const result = await Promise.all(
        classCate.categories.map(async cate => {
            let des = await Destination.findById(cate.destination);
            if (!des) {
                return [];
            }
            return await crawlArticles(cate.url, des.url, des.articleKit);
        })
    );
    cache.set(key, result);
    console.log(cache.stasitics());
    return result;
}

module.exports = {
    getArticlesFromWeb,
    getArticlesByCC
}