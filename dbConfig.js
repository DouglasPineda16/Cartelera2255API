// dbConfig.js
require('dotenv').config();

const sql = require('mssql');

const config = {
  user: process.env.DB_USER || 'usr_DesaWebDevUMG',
  password: process.env.DB_PASS || '!ngGuast@360',
  server: process.env.DB_SERVER || 'svr-sql-ctezo.southcentralus.cloudapp.azure.com',
  database: process.env.DB_NAME || 'db_DesaWebDevUMG',
  options: { encrypt: true, trustServerCertificate: true },
  pool: { max: 10, min: 0, idleTimeoutMillis: 30000 }
};


const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => { console.log('✅ SQL Server conectado'); return pool; })
  .catch(err => console.error('❌ Error conexión SQL:', err));

module.exports = { sql, poolPromise };
