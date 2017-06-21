module.exports = {
    development: {
        client: 'pg',
        connection: {
            user: 'mayo',
            password: 'mayo',
            database: 'mayo'
        }
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    }
};