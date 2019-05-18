
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('logs', table => {
        table.increments()
        table.string('body')
        table.timestamps()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('logs')
};
