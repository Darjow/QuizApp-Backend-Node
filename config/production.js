module.exports = {
  log: {
    level: 'info',
    disabled: false,
  } ,
  database: {
    client:'mysql2',
    host: "remotemysql.com",
    port: 3306,
    name: "jju6zZzJJE",
},cors: {
  origins: ['http://localhost:3000'],
  maxAge: 3 * 60 * 60, // 3h in seconds
},
}