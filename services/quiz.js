let mock_data = require("../src/data/mock_data").QUIZES;
const logger = require("../src/core/logging").getLogger();
const uuid = require("uuid");


const getAll = () => {
return {
    data: mock_data,
    count: mock_data.length,
  }
};

const getById = (id) => {
  return  mock_data.filter((e) => e.id === id)[0];
}

const getByCategory= (category) => {
  return mock_data.filter((e) => e.category === category);
}

const getByDifficulty = (difficulty) => {
  return mock_data.filter((e) => e.difficulty === difficulty);
}


const getBy = (category, difficulty) => {
  return mock_data.filter((e) => e.category === category && e.difficulty === difficulty);
}

const deleteById = (id) => {
  const exist = mock_data.filter((e) => e.id === id).length === 1;
  if(exist){
    mock_data = mock_data.filter((e) => e.id !== id);
  }else{
    logger.error(`QUIZ WITH ID ${id} DOESN'T EXIST`);
  }
};
const updateById = (id,{ category, difficulty, question, correct_answer, incorrect_answers, approved}) => {
  mock_data = mock_data.map((quiz) => {
    return quiz.id === id ? {
      ...quiz,
      category,
      difficulty,
      question,
      correct_answer,
      incorrect_answers,
      approved
    } : quiz;
    });
    return mock_data;

}

const create = ({ category, type, difficulty, question, correct_answer, incorrect_answers, author }) => {

  const quiz = {
    id: uuid.v4(),
    category,
    type,
    difficulty,
    question,
    correct_answer,
    incorrect_answers,
    approved:false,
    author
  }

  mock_data = [...mock_data  , quiz];
  return quiz;

 
}


module.exports =  {
  getAll,
  getById,
  getByCategory,
  getByDifficulty,
  getBy,

  deleteById,
  create,
  updateById
  
}
