const NodeCache = require("node-cache");

class Cache {
    constructor(ttl) {
        this.cache = new NodeCache({
            stdTTL: ttl,
            checkperiod: ttl * 0.2,
            useClones: false
        })
    }

    get(key) {
        return this.cache.get(key);
    }

    set(key, value) {
        return this.cache.set(key, value);
    }

    has(key) {
        return this.cache.has(key);
    }

    delete(key) {
        return this.cache.del(key);
    }

    flush() {
        return this.cache.flushAll();
    }

    stasitics() {
        return this.cache.getStats();
    }

}

module.exports = Cache