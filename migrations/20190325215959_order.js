exports.up = function (knex, Promise) {
    return knex.schema.createTable('orders', table => {
        table.increments();
        table.integer('user').unsigned().notNullable().references('users.id');
        table.string('company');
        table.bigint('trackingnumber').unsigned().defaultTo(0);
        table.timestamp('date').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('orders');
};
