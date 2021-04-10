exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('categories').del()
        .then(function () {
            // Inserts seed entries
            return knex('categories').insert([
                {
                    name: 'HOODIES'
                },
                {
                    name: 'JACKETS'
                },
                {
                    name: 'T-SHIRTS'
                },
                {
                    name: 'CAPS AND HATS'
                },
                {
                    name: 'BROOCHES AND PIN BADGES'
                },
                {
                    name: 'SOCKS'
                },
                {
                    name: 'SCARFS AND MASK'
                },
            ]);
        });
};
