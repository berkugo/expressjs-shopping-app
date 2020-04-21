const express = require('express');
const router = express.Router();
const db = require('../lib/db/queries');
const util = require('../lib/util');
const fs = require('fs-extra');

// mounts to /product/id
router.get('/:id', async (req, res, next) => {
    const product = await db.getProductById(req.params.id);
    if (product) {
        let pics;
        if (fs.existsSync(`./public/products/${product.id}`)) {
            pics = fs.readdirSync(`./public/products/${product.id}`);
        }
        const colors = await db.getProductColorsByCode(product.productCode);
        const sizes = await db.getProductSizes(product.id);

        res.render('product', {
            title: product.name,
            product,
            colors,
            sizes: sizes.filter(size => size.stock > 0),
            pics,
        });
    } else {
        next();
    }
});

module.exports = router;
