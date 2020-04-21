const db = require('./lib/db/queries.js');
const util = require('./lib/util.js');

const locals = {}

module.exports = new Promise(async (resolve, reject) => {
    const categories = await db.getCategories();
    const links = categories.map(category => util.toEn(category));

    locals.headerLang = 'tr';
    locals.header = {
        tr: {
            categories,
        },
        links
    }

    resolve(locals);
})
