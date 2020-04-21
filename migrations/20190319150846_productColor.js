exports.up = function (knex, Promise) {
    return knex.schema.createTable('productColors', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('product').unsigned().notNullable().references('products.id');
        table.integer('productCode').unsigned().notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('productColors');
};
