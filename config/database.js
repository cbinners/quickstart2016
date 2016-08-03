module.exports = {
  development: {
    host: process.env.DB_HOSTNAME || 'localhost',
    dialect: 'postgres',
    maxConcurrentQueries: 100,
    pool: { maxConnections: 20, maxIdleTime: 30 },
    native: false,
    password: process.env.DB_PASSWORD || '',
    username: process.env.DB_USERNAME || 'postgres',
    database: process.env.DB_DATABASE || 'your_db_name'
  },
};
