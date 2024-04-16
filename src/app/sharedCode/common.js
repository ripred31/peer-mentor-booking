const GetDBSettings = () => {
    const env = process.env.NODE_ENV;

    return {
        host: process.env.host, 
        port: parseInt(process.env.port), 
        user: process.env.user,
        password: process.env.password, 
        database: process.env.database
    };
};

module.exports = { GetDBSettings };
