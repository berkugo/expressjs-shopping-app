exports.up = function (knex, Promise) {
    return knex.schema.createTable('productSizes', table => {
        table.increments();
        table.integer('product').unsigned().notNullable().references('products.id');
        table.integer('size').notNullable().unsigned().references('sizes.id');
        table.integer('stock').notNullable().default(0);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('productSizes');
};
