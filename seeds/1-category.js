exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('categories').del()
        .then(function () {
            // Inserts seed entries
            return knex('categories').insert([
                {
                    name: 'Kadın'
                },
                {
                    name: 'Erkek'
                },
                {
                    name: 'Çocuk & Bebek'
                },
                {
                    name: 'Deri & Kürk'
                },
                {
                    name: 'Ev Tekstil'
                },
                {
                    name: 'Züccaciye & Mutfak Eşyaları'
                },
            ]);
        });
};
