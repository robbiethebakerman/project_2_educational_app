const PubSub = require('../helpers/pub_sub.js');
const QuizView = require('./quiz_view.js');

const QuizGridView = function (container) {
  this.container = container;
  this.scoreTotal = 0;

};


QuizGridView.prototype.bindEvents = function () {

  PubSub.subscribe('Countries:country_data_ready', (evt) => {
    const random = this.shuffle(evt.detail);
    const flags = this.renderFlags(random);
    const randomCountryForQuestion = this.randomCountry(random);
    const createquestion = this.createQuestion(random);
    const question = this.renderQuestion(random);
    this.compareQuestionAnswer();
  });

      PubSub.subscribe('Countries:country_new_question_ready', (evt) => {

      const random = this.shuffle(evt.detail);
      const flags = this.renderFlags(random);
      const randomCountryForQuestion = this.randomCountry(random);
      const createquestion = this.createQuestion(random);
      const question = this.renderQuestion(random);


    })

    PubSub.subscribe('QuizGridView:update_current_score', (evt) => {
      console.log(evt);
      const createquestion = this.createScore(evt.detail);
      const question = this.renderScore(evt.detail);
    });
};


QuizGridView.prototype.shuffle = function (array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        const count = array[counter];
        array[counter] = array[index];
        array[index] = count;
    }
    let selected = array.slice(0,4) ;
    return selected;
}

QuizGridView.prototype.renderFlags = function (countries) {
  console.log('in renderFlags()');

  const flagContainer = document.createElement('div');
  flagContainer.id = 'flag_item';
  this.container.innerHTML = '';
  const quizView = new QuizView(flagContainer);
  // console.log(flagContainer);
  countries.forEach((country) => quizView.render(country));
  this.container.appendChild(flagContainer);
};

QuizGridView.prototype.randomCountry = function (countries) {
  const random = countries[Math.floor(Math.random() * countries.length)]
  // console.log(random);
  return random;
};

QuizGridView.prototype.createQuestion = function (countries) {
  const country = this.randomCountry(countries)
  this.country = country;
  // console.log('country', this.country);
  PubSub.publish('QuizGridView:random_country_from_quiz', this.country);
  const question = document.createElement('p');
  question.textContent = `Which is the Flag  of ${country.name}?`;
  return question;
};

QuizGridView.prototype.renderQuestion = function (countries) {
  const questionContainer = document.createElement('div');
  questionContainer.id = 'question_item';

  const question = this.createQuestion(countries);
  questionContainer.appendChild(question);
  this.container.appendChild(questionContainer);
  const answerContainer = document.createElement('div');
  this.container.appendChild(answerContainer);
  answerContainer.id = 'answer_item';
};

QuizGridView.prototype.renderScore = function (scores) {
  const scoreDisplay = document.querySelector('.l')
  const scoreContainer = document.createElement('div');
  scoreContainer.id = 'score_item';

  const score = this.createScore(scores);
  scoreContainer.appendChild(score);
  scoreDisplay.innerHTML = ""
  scoreDisplay.appendChild(scoreContainer);
};

QuizGridView.prototype.createScore = function (scores) {
  // console.log('country', this.country);
  const score = document.createElement('p');
  console.log(scores);
  score.textContent = `Score ${scores}`;
  return score;
};



QuizGridView.prototype.compareQuestionAnswer = function(){
  console.log('in compareQuestionAnswer BEFORE subscribe');
  let isAnswerCorrect = document.createElement('p');

  PubSub.subscribe('QuizView:quiz-item-clicked', (evt) => {
    console.log('in subcribe BEFORE if statement');
     isAnswerCorrect.innerHTML = ""
    // debugger
    let score = null
    let result = ""
    if (evt.detail === this.country.name) {
      result = "Well done!,";
      this.scoreTotal++
      PubSub.publish('QuizGridView:update_current_score', this.scoreTotal);

      setTimeout(() => {
        PubSub.publish('QuizGridView:refresh_quiz')
      }, 2000)

    } else {
      result = "Whoops,";
    }

    isAnswerCorrect.textContent = `${result} that is ${evt.detail}!`
    const answer = document.querySelector('#answer_item')
    answer.appendChild(isAnswerCorrect);
  })
};






module.exports = QuizGridView;
