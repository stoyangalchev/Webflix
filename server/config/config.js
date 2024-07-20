const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3001,
        dbURL: 'mongodb://localhost:27017/forum',
        origin: ['http://localhost:3001', 'http://localhost:4200',]
    },
    production: {
        port: process.env.PORT || 3001 ,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: []
    }
};

module.exports = config[env];
