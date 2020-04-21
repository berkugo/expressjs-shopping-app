exports.up = function (knex, Promise) {
    return knex.schema.createTable('orderProducts', table => {
        table.integer('order').unsigned().notNullable().references('orders.id');
        table.integer('product').unsigned().notNullable().references('products.id');
        table.integer('size').unsigned().notNullable().references('productSizes.id');
        table.integer('color').unsigned().notNullable().references('productColors.id');
        table.integer('qty').unsigned().notNullable();
    });
};


exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('orderProducts');
};
