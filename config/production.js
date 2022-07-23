module.exports = {
  log: {
    level: 'info',
    disabled: false,
  },
  database: {
    client:'mysql2',
    host: "remotemysql.com",
    port: 3306,
    name: "jju6zZzJJE",
  },
  cors: {
    origins: ['http://localhost:3000'],
    maxAge: 3 * 60 * 60, // 3h in seconds
},
auth:{
  argon: {
    saltLength: 16,
    hashLength: 32,
    timeCost: 6,
    memoryCost: 2 ** 17  // 2^17 = 128MiB
  },
  jwt:{
    secret: "eenveeltemoeilijkesecretdatniemandooitzalradenandersisdesitegehacked",
    expirationInterval: 60 * 60 * 1000,
    issuer: "Dario",
    audience:"Dario"
  }
}
}