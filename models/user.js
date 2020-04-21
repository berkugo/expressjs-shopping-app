const yup = require('yup');
const bcrypt = require('bcrypt');
const db = require('../lib/db/queries');

const schema = yup.object().shape({
    email: yup
        .string()
        .required()
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    password: yup
        .string()
        .required(),
});

const model = {
    create: async (user) => {
        try {
            await schema.validate(user);
            user.password = bcrypt.hashSync(user.password, 10);
            await db.createUser(user);
            return user;
        } catch (error) {
            console.error(error);
        }
    }
};

module.exports = model;
