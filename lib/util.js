const charMap = {
    'çÇ': 'c',
    'ğĞ': 'g',
    'şŞ': 's',
    'üÜ': 'u',
    'ıİ': 'i',
    'öÖ': 'o'
};

module.exports = {
    toEn(str) {
        let strFixed = str
            .replace(/\s+/g, '-')
            .replace(/\&+/g, '-')
            .replace(/[-]+/gi, "-")
            .trim()
            .toLowerCase();
        for (const key in charMap) {
            strFixed = strFixed.replace(new RegExp('[' + key + ']', 'g'), charMap[key]);
        }
        return strFixed;
    },

    title: (session, page) => session.siteText[session.siteLang].titles[page],

}
