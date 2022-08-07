const config = require("config")
const { initializeLogger } = require("../src/core/logging");
const roles = require("../src/core/roles");
const { initialiseData, getKnex, tables } = require("../src/data");
const {Categories, Difficulties} = require("../src/core/enum")

module.exports = async () => {
  initializeLogger({
    level: config.get("log.level"),
    disabled: config.get("log.disabled"),
  });

  await initialiseData();
  const knex = getKnex();


  //MOCK USERS
  await knex(tables.users).insert([{
    id: 1,
    email:"a@a.com",
    username:"Dario Admin",
    firstname:"Dario",
    lastname:"Admin",
    score: 0,
    password_hash:"$argon2id$v=19$m=4096,t=6,p=1$bAS8XykPSMVsfJEWzrVGGw$r9JRazUQztRpwkWe5NGawftOydBBnpcOqwWdgdnfAvA", //testertest
    roles: JSON.stringify([roles.ADMIN,roles.USER])
  },
  {
    id: 2,
    email:"test@h.com",
    username:"Dario User",
    firstname:"Dario",
    lastname:"User",
    score: 0,
    password_hash:"$argon2id$v=19$m=4096,t=6,p=1$bAS8XykPSMVsfJEWzrVGGw$r9JRazUQztRpwkWe5NGawftOydBBnpcOqwWdgdnfAvA", //testertest 
    roles: JSON.stringify([roles.USER])
  }]);


  //MOCK QUIZES
  await getKnex()(tables.quiz).insert([{
    id:12,
    category: Categories["12"],        
    difficulty: Difficulties["2"],
    question: "How many known living species of hyenas are there?",
    correct_answer:'4',
    approved:1,
    author:'Dario Admin',
    incorrect_answers:JSON.stringify(["2", "1", "3"]),
  },{
    id:13,
    category: Categories["13"],        
    difficulty: Difficulties["3"],
    question: "What nickname was given to Air Canada Flight 143 after it ran out of fuel and glided to safety in 1983?",
    correct_answer:'Gimli Glider',
    approved:1,
    author:'Dario Admin',
    incorrect_answers:JSON.stringify(["Fly-No-Fuely", "Gimli Fuely"]),
  },{
    id:14,
    category: Categories["6"],        
    difficulty: Difficulties["1"],
    question: "Is chess a sport?",
    correct_answer:'Yes',
    approved:1,
    author:'Dario Admin',
    incorrect_answers:JSON.stringify(["No"]),
  },{
    id:15,
    category: Categories["7"],        
    difficulty: Difficulties["2"],
    question: "What is the capital of Belgium?",
    correct_answer:'Brussels',
    approved:1,
    author:'Dario Admin',
    incorrect_answers:JSON.stringify(["Antwerp", "Amsterdam"]),
  },{
    id:16,
    category: Categories["7"],        
    difficulty: Difficulties["1"],
    question: "What is the capital of France?",
    correct_answer:'Paris',
    approved:1,
    author:'Dario Admin',
    incorrect_answers:JSON.stringify(["Francois", "Francoise"]),
  },{
    id:17,
    category: Categories["7"],        
    difficulty: Difficulties["1"],
    question: "Is this not approved 1?",
    correct_answer:'NA1',
    approved:0,
    author:'Dario Admin',
    incorrect_answers:JSON.stringify(["12", "32"]),
  },{
    id:18,
    category: Categories["7"],        
    difficulty: Difficulties["1"],
    question: "Is this not approved 2?",
    correct_answer:'NA2',
    approved:0,
    author:'Dario Admin',
    incorrect_answers:JSON.stringify(["23", "4"]),
  },{
    id:19,
    category: Categories["7"],        
    difficulty: Difficulties["1"],
    question: "Is this not approved 1?",
    correct_answer:'NA3',
    approved:0,
    author:'Dario Admin',
    incorrect_answers:JSON.stringify(["5", "6"]),
  }
]);


//INSERT GAMES 
await getKnex()(tables.gamesPlayed).insert([{
  player_id: 1,
  quiz_id: 14,
  score: 75,
},{
  player_id: 2,
  quiz_id: 14,
  score: -75
},{
  player_id: 1,
  quiz_id: 15,
  score: 50
}])
}
