exports.up = function (knex, Promise) {
    return knex.schema.createTable('productTypes', table => {
        table.increments();
        table.string('name').notNullable();
        table.integer('category').unsigned().notNullable().references('categories.id').onDelete('CASCADE');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('productTypes');
};
