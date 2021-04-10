exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('productColors').del()
        .then(function () {
            // Inserts seed entries
            return knex('productColors').insert([{
                name: 'Black',
                product: 1,
                productCode: 155
            }, {
                name: 'Blue',
                product: 2,
                productCode: 156
            },
            {
                name: 'Red',
                product: 2,
                productCode: 156
            },
             {
                name: 'Dark Blue',
                product: 3,
                productCode: 157
            }, {
                name: 'Purple',
                product: 4,
                productCode: 158
            }]);
        });
};
