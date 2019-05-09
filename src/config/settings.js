
const enviroments = require('./enviroments');
const defaultPort = 3000;
const defaultJwtSecret = 'secret';
const ENV = process.env.ENV || enviroments.DEV;
const PORT = process.env.PORT || defaultPort;
const JWT_SECRET = process.env.JWT_SECRET || defaultJwtSecret;


const getSettings = () => {

    let settings = null;

    switch (ENV) {
        case enviroments.PROD:
            settings = {
                ENV,
                PORT,
                JWT_SECRET,
                DATABASES: {
                    MONGODB: {
                        USER: null,
                        PASSWORD: null,
                        HOST: 'localhost',
                        PORT: 27017,
                        DATABASE: 'test'
                    }
                }
            };
            break;
        case enviroments.DEV:
            settings = {
                ENV,
                PORT,
                JWT_SECRET,
                DATABASES: {
                    MONGODB: {
                        USER: null,
                        PASSWORD: null,
                        HOST: 'localhost',
                        PORT: 27017,
                        DATABASE: 'test'
                    }
                }
            };
            break;
    }

    return settings;
}

// module.exports = getSettings();

module.exports = getSettings();