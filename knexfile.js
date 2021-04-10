module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: '192.168.1.21',
            database: 'afrocheck_db',
            user: 'afroroot',
            password: 'charley123321',
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
