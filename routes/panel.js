const express = require('express');
const router = express.Router();
const db = require('../lib/db/queries');
const multer = require('multer');
const storage = multer.memoryStorage();
const type_model = require('../models/sizetype');
const upload = multer({
    storage: storage
})
const type = upload.single('productimage');
const fs = require('fs-extra');

// mounts to /panel
router.get('/', async (req, res, next) => {
    req.session.uploaditeration = 0;
    res.render('panel/index', {
        title: 'Zalina | Yönetim Paneli',
    });
});

router.get('/selectcategory', async (req, res, next) => {
    const products = [];
    for (let i = 0; i < req.app.locals.header['tr'].categories.length; i++) {
        const result = await db.getProductTypesByCategory(req.app.locals.header['tr'].categories[i]);
        products.push(result);
    }
    res.render('panel/selectproduct', {
        title: 'Zalina | Yönetim Paneli',
        headers: req.app.locals.header['tr'].categories,
        productInfo: products,
    });
});

router.post('/add', async (req, res, next) => {
    const types = [
        "notype",
        "classic",
        "childsize",
        "babysize",
        "shoes",
        "childshoes",
        "babyshoes",
        "underwear-top",
        "underwear-bottom"
    ];

    res.render('panel/addproduct', {
        title: 'Zalina | Ürün Ekleme',
        productType: req.body.values.split('*')[2],
        stockType: types[req.body.type],
    });
});

router.get('/edit', async (req, res, next) => {
    res.render('panel/edit', {
        title: 'Zalina | Ürün Düzenleme',
        error: 0
    });
});

router.post('/edit', async (req, res, next) => {
    const product = await db.getProductById(req.body.id);
    if (product) {
        product.color = await db.getProductColor(product.id);
        const productInfo = [];
        for (let i = 0; i < req.app.locals.header['tr'].categories.length; i++) {
            const result = await db.getProductTypesByCategory(req.app.locals.header['tr'].categories[i]);
            productInfo.push(result);
        }

        const stock = await db.getProductStock(req.body.id);
        res.render('panel/product', {
            title: 'Zalina | Ürün Düzenleme',
            product,
            headers: req.app.locals.header['tr'].categories,
            productInfo,
            stock,
        });
    } else {
        res.render('panel/edit', {
            title: 'Zalina | Ürün Düzenleme',
            error: 1
        });
    }
});

router.post('/manageorders', async (req, res, next) =>
{
        try
        {
            console.log(req.body);
            console.log(req.query);
                if('q' in req.query)
                {
                    if(req.query.q === '1')
                    {
                        const result = await db.updateOrder(req.query.orderId, req.body.cargono, req.body.cargoname);
                        
                            console.log(result);
                            res.redirect('/panel/manageorders');
                    }
                    else
                    {
                        res.redirect('/panel/manageorders');
                    }
                }
         
        
        
        }
        catch(err)
        {
              res.redirect('/panel/manageorders');
        }

    
})

router.get('/manageorders', async (req, res, next) => 
{
   const result = await db.getOrders();
   if(Array.from(result).length > 0)
   {
      const orders_array = Array.from(result);
      console.log(orders_array);
      const details = [];
      for(let i = 0; i<orders_array.length; i++)
      {
        const result = await db.getOrder(orders_array[i].id);
        result[0].orderId = orders_array[i].id;
        result[0].userId = orders_array[i].user;
        result[0].trackingNumber = orders_array[i].trackingnumber;
        result[0].company = orders_array[i].company;
        details.push(result[0]);
      }
      console.log(details);
      res.render('panel/order', {ordersresult: details, page: 0});

   }
   

})


router.get('/acceptorder', async (req, res, next) => 
{
    const user_detail = await db.getUserById(req.query.user);
    const user_adress = await db.getAddress(req.query.user);
    console.log(user_adress);
    const order_detail = await db.getOrder(req.query.id);
    order_detail[0].orderId = req.query.id;
    const result = {order: order_detail, address: user_adress, detail: user_detail};
    res.render('panel/order', {result: result, page: 1});

})

router.post('/edit/:id', async (req, res, next) => {
    req.body.id = req.params.id;
    db.updateProduct(req.body)
        .then(() => {
            res.redirect('/panel/edit');
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/remove', async (req, res, next) => {
    // check foreign key constraints
});

router.get('/editcampanno', async (req, res, next) => {
    res.render('panel/camp_anno');
});

router.post('/addproduct', async (req, res, next) => {
    db.insertProduct(req.body).then(res => {
        const productid = res;
        if (fs.existsSync('./temp/' + req.session.userid) && req.session.uploaditeration > 0) {
            fs.mkdirSync('./public/products/' + productid, {
                recursive: true
            });
            for (var i = 0; i < req.session.uploaditeration; i++) {
                fs.copyFileSync('./temp/' + req.session.userid + '/' + i + '.png', './public/products/' + productid + '/' + i + '.png');
            }
            fs.removeSync('./temp/' + req.session.userid);
            req.session.uploaditeration = 0;
        }
    });
    res.send(req.body);
});

router.post('/addimage', type, async (req, res, next) => {
    if (!fs.existsSync('./temp/' + req.session.userid) && req.session.uploaditeration === 0) {
        fs.mkdirSync('./temp/' + req.session.userid, {
            recursive: true
        });
    }
    await fs.writeFile('./temp/' + req.session.userid + '/' + req.session.uploaditeration + '.png', req.file.buffer).then(err => {
        req.session.uploaditeration += 1;
        res.send('Uploaded to temp.');
    })
});

module.exports = router;
