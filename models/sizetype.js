module.exports = {
    get: id => {
        var result = '';
        console.log(id);
        switch (id) {
            case 0: result = "partials/types/notype.ejs"; break;
            case 1: result = "partials/types/classic.ejs"; break;
            case 2: result = "partials/types/childsize.ejs"; break;
            case 3: result = "partials/types/babysize.ejs"; break;
            case 4: result = "partials/types/shoes.ejs"; break;
            case 5: result = "partials/types/childshoes.ejs"; break;
            case 6: result = "partials/types/babyshoes.ejs "; break;
        }
        return result;
    }
}
