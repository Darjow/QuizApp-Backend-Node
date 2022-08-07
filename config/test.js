module.exports = {
  log: {
    level: 'silly',
    disabled: true,
  },
  cors:{
    origins:["http://localhost:3000"],
    maxAge: 3 * 60 * 60,
  },
  database: {
    client:'mysql2',
    host: "127.0.0.1",
    port: 3306,
    name: "quiz-master_test",
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
};
