
exports.up = function (knex, Promise) {
    return knex.schema.createTable('addresses', table => {
        table.increments('adressId').primary();
        table.integer('userId').notNullable();
        table.string('title').notNullable();
        table.string('country').notNullable();
        table.string('city').notNullable();
        table.string('location').notNullable();
        table.string('postalcode').notNullable();
        table.string('content').notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('addresses');

};
