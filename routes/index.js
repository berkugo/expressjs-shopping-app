const express = require('express');
const router = express.Router();
const db = require('../lib/db/queries');
const util = require('../lib/util');
const fs = require('fs-extra');

// mounts to /
router.get('/', (req, res, next) => {
    res.render('index', {
        title: util.title(req.session, 'index')
    });
});

// mounts to /category/productType
router.get('/:cat/:type?', (req, res, next) => {
    const {
        translate,
        header
    } = req.app.locals;
    const isCategory = header.links.some((category, index) => {
        if (category === req.params.cat) {
            return db.getProductTypesByCategory(header['tr'].categories[index]).then(async types => {
                const sidemenu = await translate({
                    ...types
                }, req.session.siteLang);
                if (!req.params.type) {
                    // product type is not specified
                    // render the category page
                    res.render('category', {
                        title: header[req.session.siteLang].categories[index],
                        category,
                        sidemenu,
                        sidemenuLinks: types,
                    });
                } else {
                    const typeIndex = types
                        .map(type => util.toEn(type))
                        .findIndex(type => type === req.params.type);
                    let productType = types[typeIndex];

                    // make sure the product type exists
                    if (typeIndex !== -1) {
                        // get that type's listing
                        db.getProductListing(header['tr'].categories[index], productType).then(async listing => {
                            listing.forEach(product => product.picture = fs.existsSync(`./public/products/${product.id}`));
                            productType = await translate(productType, req.session.siteLang);

                            // then render it's listing page
                            res.render('product-listing', {
                                title: productType,
                                category: await translate(category, req.session.siteLang),
                                sidemenu,
                                sidemenuLinks: types,
                                productType,
                                listing,
                                listingNames: await translate({
                                    ...listing.map(item => item.name)
                                }, req.session.siteLang)
                            });
                        });
                    } else {
                        // if given type is not an actual product type
                        // pass control to the next handler
                        next();
                    }
                }
            });
        }
    });

    // if given category is not an actual category
    // pass control to the next handler
    if (!isCategory) {
        next();
    }
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
