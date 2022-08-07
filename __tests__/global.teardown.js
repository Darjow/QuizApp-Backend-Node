const { shutdownData, getKnex, tables } = require("../src/data")

module.exports = async () => {
  console.log("---------------------------------");
  await getKnex()(tables.gamesPlayed).delete()
  await getKnex()(tables.users).delete();
  await getKnex()(tables.quiz).delete()


  await shutdownData();
}