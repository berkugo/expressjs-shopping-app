const bcrypt = require('bcrypt');

exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                {
                    email: 'testuser@mail.com',
                    password: bcrypt.hashSync('test', 10),
                },
                {
                    email: 'testadmin@mail.com',
                    password: bcrypt.hashSync('test', 10),
                    isAdmin: 1
                },
            ]);
        });
};
