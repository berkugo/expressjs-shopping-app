exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('sizes').del()
        .then(function () {
            // Inserts seed entries
            let seed = [];
            const sizeTable = {
                'notype': ['stock'],
                'classic': ['xs', 's', 'm', 'l', 'xl', 'xxl', ],
                'childsize': ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
                'babysize': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
                'shoes': ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
                'childshoes': ['22', '23', '24', '25', '26', '27'],
                'babyshoes': ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'],
                'underwear-top': [],
                'underwear-bottom': [],
            }

            const sizes = Object.values(sizeTable);
            for (let i = 0; i < sizes.length; i++) {
                sizes[i].forEach(size => {
                    seed.push({
                        type: i,
                        name: size
                    });
                });
            }
            return knex('sizes').insert(seed);
        });
};
