export default () => ({
        port: parseInt(process.env.PORT ?? '3000', 10),
        secret: process.env.SECRET,
        dbHost: process.env.DB_HOST,
        dbPort: parseInt(process.env.DB_PORT ?? '5432', 10),
        dbUsername: process.env.DB_USERNAME ?? process.env.USERNAME,
        dbPassword: process.env.DB_PASSWORD ?? process.env.PASSWORD,
        dbName: process.env.DB_NAME,
});