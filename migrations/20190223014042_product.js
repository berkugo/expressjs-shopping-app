exports.up = function (knex, Promise) {
    return knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description');
        table.integer('productType').unsigned().notNullable().references('productTypes.id');
        table.float('price', 9, 2).notNullable();
        table.integer('productCode').notNullable();
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('products');
};
