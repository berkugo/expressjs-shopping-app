module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            database: 'afrocheckdb',
            user: 'afrocheckroot',
            password: 'chr123321',
            charset: 'utf8'
        }
    },

    docker: {
        client: 'mysql2',
        connection: {
            host: 'zalina.db', // mariadb container's ip OR it's handle in hosts file
            database: 'zalina',
            user: 'zalina',
            password: '123',
            charset: 'utf8'
        }
    }
};
