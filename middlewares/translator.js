const translator = require('translate-json-object')();
translator.init({
    yandexApiKey: 'trnsl.1.1.20190416T173006Z.8b525ae896433bf0.068d43457abee2a4fb70ea42e968ee66c9f83c35'
});
const text = require('../siteText');

class Translator {
    async siteTranslator(req, res, next) {
        let {
            siteLang,
            siteText
        } = req.session;

        siteText = siteText || {};
        if (!siteText[siteLang]) {
            if (siteLang !== 'tr') {
                const categories = await translator.translate({
                    ...req.app.locals.header['tr'].categories
                }, siteLang);
                req.app.locals.header[siteLang] = {
                    categories: Object.keys(categories).map(key => categories[key])
                };
                siteText[siteLang] = await translator.translate(text, siteLang);
            } else {
                siteText[siteLang] = text;
            }
        }
        req.session.siteText = siteText;
        req.app.locals.headerLang = siteLang;
        next();
    }

    async translate(str, lang) {
        if (lang !== 'tr') {
            const t = await translator.translate({
                str
            }, lang);
            return t.str;
        } else {
            return str;
        }
    }
}

module.exports = new Translator();
