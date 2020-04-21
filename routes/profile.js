const express = require('express');
const router = express.Router();
const db = require('../lib/db/queries');
const util = require('../lib/util');
const yup = require('yup');
const url = require('url');

router.get('/', (req, res, next) => {
    if (req.session.userid)
        db.getUserInfoById(req.session.userid).then((result) => {
            res.render('profile', {
                title: util.title(req.session, 'profile'),
                cPage: 0,
                email: req.session.email,
                userInfo: result[0]
            });
        });
    else res.redirect('/login');
});

router.get('/update', (req, res, next) => {
    if (req.session.userid) {
        const schema = yup.object().shape({
            clientname: yup.string().required(),
            clientsurname: yup.string().required(),
            phonenumber: yup.number(),
            idnumber: yup.number()
        });

        const update_state = {
            clientname: req.query.name,
            clientsurname: req.query.surname,
            phonenumber: req.query.phone,
            idnumber: req.query.idnumber
        };
        try {
            schema.isValid(update_state).then((valid) => {
                if (valid === true) {
                    db.updateUserInfo(req.session.userid, update_state);
                    db.getUserInfoById(req.session.userid).then((result) => {
                        res.render('profile', {
                            title: util.title(req.session, 'profileInfo'),
                            cPage: 1,
                            validation: true,
                            email: req.session.email,
                            userInfo: result[0]
                        });
                    });
                } else {
                    db.getUserInfoById(req.session.userid).then((result) => {
                        res.render('profile', {
                            title: util.title(req.session, 'profileInfo'),
                            cPage: 1,
                            validation: false,
                            email: req.session.email,
                            userInfo: result[0]
                        });
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    } else res.redirect('/login');
});
router.post("/add_address", (req, res, next) => {
    if (req.session.userid) {
        const schema = yup.object().shape({
            title: yup.string().required(),
            country: yup.string().required(),
            city: yup.string().required(),
            location: yup.string().required(),
            postalcode: yup.string().required(),
            content: yup.string().required()

        });
        try {
            schema.isValid(req.body).then(valid => {
                if (valid === true) {
                    db.addAddress(req.session.userid, req.body);
                    db.getUserInfoById(req.session.userid).then((result) => {
                        db.getAddress(req.session.userid).then(addressResult => {
                            res.redirect(url.format({
                                pathname: "/profile/addresses",
                                query: {
                                    "validation": true
                                }
                            }));
                        });
                    });
                } else {
                    db.getUserInfoById(req.session.userid).then((result) => {
                        db.getAddress(req.session.userid).then(addressResult => {
                            res.redirect(url.format({
                                pathname: "/profile/addresses",
                                query: {
                                    "validation": false
                                }
                            }));
                        });
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    } else res.redirect('/login');
});

router.get('/:param', async (req, res, next) => {
    if (req.session.userid) {
        switch (req.params.param) {
            case 'general':
                {
                    db.getUserInfoById(req.session.userid).then((result) => {
                        res.render('profile', {
                            title: 'Zalina | Genel',
                            cPage: 0,
                            email: req.session.email,
                            userInfo: result[0]
                        });

                    });
                    break;
                }
            case 'info':
                {
                    db.getUserInfoById(req.session.userid).then((result) => {

                        res.render('profile', {
                            title: 'Zalina | Kişisel Bilgiler',
                            cPage: 1,
                            validation: true,
                            email: req.session.email,
                            userInfo: result[0]
                        });

                    });
                    break;
                }
            case 'taken':
                {
                    const result = await db.getUserInfoById(req.session.userid);
                    const orders = await db.getOrdersOfUser(req.session.userid);

                    res.render('profile', {
                        title: 'Zalina | Sipariş',
                        cPage: 2,
                        userInfo: result[0],
                        orders: orders[0]
                    });
                    break;
                }
            case 'addresses':
                {
                    db.getUserInfoById(req.session.userid).then((result) => {

                        db.getAddress(req.session.userid).then(addressResult => {
                            res.render('profile', {
                                title: 'Zalina | Adres Bilgileri',
                                cPage: 3,
                                validation: req.query.validation,
                                addresses: addressResult,
                                email: req.session.email,
                                userInfo: result[0]
                            })
                        });
                    });
                    break;
                }
            default:
                {
                    next();
                }
        }
    } else res.redirect('/login');
});

router.get('/taken/:id', async (req, res, next) => {
    if (!req.session.userid) res.redirect('/');
    const order = await db.getOrder(req.params.id);
    const result = await db.getUserInfoById(req.session.userid);
    res.render('profile', {
        title: util.title(req.session, 'orders'),
        cPage: 4,
        userInfo: result[0],
        order
    });
});

module.exports = router;
