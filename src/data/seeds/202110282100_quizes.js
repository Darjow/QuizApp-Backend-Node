const {tables} = require("..");
const {Categories, Difficulties} = require("../../core/enum")

module.exports = {
  seed: async(knex) => {
    await knex(tables.quiz).insert([
      {
        id:1,
        category: Categories["1"],
        difficulty: Difficulties["2"],
        question: "How many countries are there?",
        correct_answer:'193',
        approved:1,
        author:'Dario Admin',
        incorrect_answers:JSON.stringify(["247", "483", "173"]),
      },{
        id:2,
        category: Categories["2"] ,
        difficulty:Difficulties["1"],
        question: "What's the most famous movie?",
        correct_answer:'Star Wars',
        approved:1,
        author:'Dario Admin',
        incorrect_answers:JSON.stringify(["Lord of the Rings", "Spider Man", "Superman"]),
      },{
        id:3,
        category: Categories["3"],
        difficulty: Difficulties["3"],
        question: "If you planted the seeds of Quercus robur what would grow?",
        correct_answer:'Trees',
        approved:1,
        author:'Dario Admin',
        incorrect_answers:JSON.stringify(["Bushes", "Flowers"]),
      },{
        id:4,
        category: Categories["4"],
        difficulty:Difficulties["2"],
        question: "How many chromosomes are in your body cells?",
        correct_answer:'23',
        approved:1,
        author:'Dario Admin',
        incorrect_answers:JSON.stringify(["17", "20", "22"]),
      },{
        id:5,
        category: Categories["5"],
        difficulty:Difficulties["1"],
        question: "Who was the King of Gods in Ancient Greek mythology?",
        correct_answer:'Zeus',
        approved:1,
        author:'Dario Admin',
        incorrect_answers:JSON.stringify(["Apollo", "Hermes"]),
      },{
        id:6,
        category: Categories["6"],
        difficulty:Difficulties["1"],
        question: "Which team won 2014 FIFA World Cup in Brazil?",
        correct_answer:'Germany',
        approved:1,
        author:'Dario Admin',
        incorrect_answers:JSON.stringify(["Spain", "Brazil", "Argentina"]),
      },{
        id:7,
        category: Categories["7"],        
        difficulty: Difficulties["2"],
        question: "Which state of the United States is the smallest?",
        correct_answer:'Rhode Island',
        approved:1,
        author:'Dario Admin',
        incorrect_answers:JSON.stringify(["Main", "Vermont"]),
      },{
        id:8,
        category: Categories["8"],        
        difficulty: Difficulties["2"],
        question: "When was Adolf Hitler appointed as Chancellor of Germany?",
        correct_answer:'1933',
        approved:1,
        author:'Dario Admin',
        incorrect_answers:JSON.stringify(["1940", "1939", "1938"]),
      },{
        id:9,
        category: Categories["9"],
        difficulty: Difficulties["2"],
        question: "How old must a person be to be elected President of the United States?",
        correct_answer:'35',
        approved:1,
        author:'Dario Admin',
        incorrect_answers:JSON.stringify(["30", "40", "50"]),
      },{
        id:10,
        category: Categories["10"],        
        difficulty: Difficulties["3"],
        question: "Which one of these paintings is not by Caspar David Friedrich?",
        correct_answer:'The Black Sea',
        approved:1,
        author:'Dario Admin',
        incorrect_answers:JSON.stringify(["The Sea of Ice"]),
      },{
        id:11,
        category: Categories["11"],        
        difficulty: Difficulties["1"],
        question: "Which celebrity announced his presidency in 2015?",
        correct_answer:'Kanye West',
        approved:1,
        author:'Dario Admin',
        incorrect_answers:JSON.stringify(["Michael Jackson", "Donald Trump"]),
      },{
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
        approved:0,
        author:'Dario Admin',
        incorrect_answers:JSON.stringify(["No"]),
      },{
        id:15,
        category: Categories["7"],        
        difficulty: Difficulties["2"],
        question: "What is the capital of Belgium?",
        correct_answer:'Brussels',
        approved:0,
        author:'Dario Admin',
        incorrect_answers:JSON.stringify(["Antwerp", "Amsterdam"]),
      },{
        id:16,
        category: Categories["12"],        
        difficulty: Difficulties["2"],
        question: "Blablabla",
        correct_answer:'b l',
        approved:0,
        author:'Dario User',
        incorrect_answers:JSON.stringify(["a", ""]),
      },{
        id:17,
        category: Categories["5"],        
        difficulty: Difficulties["2"],
        question: "Hello",
        correct_answer:"Yo",
        approved:0,
        author:'Dario User',
        incorrect_answers:JSON.stringify(["Bye"]),
      }
      ]);
  }
}