exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('products').del()
        .then(function () {
            // Inserts seed entries
            return knex('products').insert([{
                    name: 'Hoodie 1',
                    description: 'insert description here',
                    price: '50',
                    productType: 1,
                    productCode: 155
                },
                {
                    name: 'Hoodie 2',
                    description: 'insert description here',
                    price: '60',
                    productType: 1,
                    productCode: 156
                },
                {
                    name: 'Hoodie 3',
                    description: 'description',
                    price: '70',
                    productType: 1,
                    productCode: 157

                },
                {
                    name: 'Hoodie 4',
                    description: 'description',
                    price: '80',
                    productType: 1,
                    productCode: 158

                },
            ]);
        });
};
