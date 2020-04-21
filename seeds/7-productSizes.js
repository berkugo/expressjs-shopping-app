exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('productSizes').del()
        .then(function () {
            // Inserts seed entries
            let seed = [];
            for (j = 1; j <= 4; j++) {
                for (i = 2; i <= 7; i++) {
                    seed.push({
                        product: j,
                        size: i,
                        stock: (Math.random() > 0.5) ? Math.floor((Math.random() * 300) + 1) : 0
                    });
                }
            }
            return knex('productSizes').insert(seed);
        });
};
