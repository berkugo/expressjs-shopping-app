exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('productTypes').del()
        .then(function () {
            // Inserts seed entries
            return knex('productTypes').insert([{
                name: 'Elbise',
                category: 1
            },
            {
                name: 'Ceket & Kaban',
                category: 1
            },
            {
                name: 'Hırka & Kazak',
                category: 1
            },
            {
                name: 'Gömlek & Bluz',
                category: 1
            },
            {
                name: 'Aksesuar',
                category: 1
            },
            {
                name: 'Ayakkabı',
                category: 1
            },
            {
                name: 'Gecelik',
                category: 1
            },
            {
                name: 'İç Çamaşırı',
                category: 1
            },
            {
                name: 'Pantolon',
                category: 1
            },
            {
                name: 'Etek',
                category: 1
            },
            {
                name: 'Jean',
                category: 1
            },
            {
                name: 'Otantik Ürünler',
                category: 1
            },

            {
                name: 'Kapüşonlu & Sweatshirt',
                category: 2
            },
            {
                name: 'Hırka & Kazak',
                category: 2
            },
            {
                name: 'Ceket & Kaban',
                category: 2
            },
            {
                name: 'Basic',
                category: 2
            },
            {
                name: 'Tişört & Atlet',
                category: 2
            },
            {
                name: 'Gömlek',
                category: 2
            },
            {
                name: 'Pantolon',
                category: 2
            },
            {
                name: 'Aksesuar',
                category: 2
            },
            {
                name: 'Otantik Ürünler',
                category: 2
            },
            ]);
        });
};