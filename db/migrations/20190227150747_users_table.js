
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', user => {
        user.increments(); //creates primary key that is an ID

        user.string('username', 100).notNullable().unique();
        user.string('password', 200).notNullable();
        user.string('department', 100).notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
