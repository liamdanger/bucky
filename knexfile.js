// Update with your config settings.

module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './db/dev.sqlite3'
        },
        useNullAsDefault: true,
    },

    test: {
        client: 'sqlite3',
        connection: {
            filename: ':memory:',
        },
        useNullAsDefault: true,
    },

    production: {
        client: 'sqlite3',
        connection: {
            filename: './db/prod.sqlite3'
        },
        useNullAsDefault: true,
    },
};
