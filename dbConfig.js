// dbConfig.js
const sql = require('mssql');

const config = {
  user: 'usr_DesaWebDevUMG',
  password: '!ngGuast@360',
  server: 'svr-sql-ctezo.southcentralus.cloudapp.azure.com',
  database: 'db_DesaWebDevUMG',
  options: { encrypt: true, trustServerCertificate: true },
  pool: { max: 10, min: 0, idleTimeoutMillis: 30000 }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => { console.log('✅ SQL Server conectado'); return pool; })
  .catch(err => console.error('❌ Error conexión SQL:', err));

module.exports = { sql, poolPromise };
