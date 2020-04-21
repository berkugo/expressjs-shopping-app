exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('productColors').del()
        .then(function () {
            // Inserts seed entries
            return knex('productColors').insert([{
                name: 'Siyah',
                product: 1,
                productCode: 155
            }, {
                name: 'Mavi',
                product: 2,
                productCode: 155
            }, {
                name: 'Mavi',
                product: 3,
                productCode: 156
            }, {
                name: 'Mor',
                product: 4,
                productCode: 156
            }]);
        });
};
