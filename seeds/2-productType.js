exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('productTypes').del()
        .then(function () {
            // Inserts seed entries
            return knex('productTypes').insert([{
                name: 'HOODIES',
                category: 1
            },
            {
                name: 'JACKETS',
                category: 1
            },
            {
                name: 'T-SHIRTS',
                category: 1
            },
            {
                name: 'CAPS AND HATS',
                category: 1
            },
            {
                name: 'BROOCHES AND PIN BADGES',
                category: 1
            },
            {
                name: 'SOCKS',
                category: 1
            },
            {
                name: 'SCARFS',
                category: 1
            },
            {
                name: 'MASK',
                category: 1
            },
            {
                name: 'TEST',
                category: 2
            },
            ]);
        });
};