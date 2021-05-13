module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: '159.89.15.212',
            database: 'afrocheckdb',
            user: 'afrocheckrem',
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
