exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('products').del()
        .then(function () {
            // Inserts seed entries
            return knex('products').insert([{
                    name: 'Deri Ceket',
                    description: 'insert description here',
                    price: '1499',
                    productType: 2,
                    productCode: 155
                },
                {
                    name: 'Deri Ceket',
                    description: 'insert description here',
                    price: '1499',
                    productType: 2,
                    productCode: 155
                },
                {
                    name: 'Kapüşonlu Üst',
                    description: 'description',
                    price: '99.9',
                    productType: 13,
                    productCode: 156

                },
                {
                    name: 'Kapüşonlu Üst',
                    description: 'description',
                    price: '99.9',
                    productType: 13,
                    productCode: 156

                },
            ]);
        });
};
