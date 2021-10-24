const sql = require("mysql2/promise");


async function sqlDatabase(query){
  const pool = sql.createPool({
    host: "127.0.0.1",
    port: 3306,
    connectionLimit: 10,
    database: "Quiz-Master",
    user: "root",
    password: "root"
  });
  const [result] = await pool.query(query);

  await pool.end();
  return result
}

module.exports.sqlDatabase = sqlDatabase;
