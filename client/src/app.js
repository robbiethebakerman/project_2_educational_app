const Countries = require('./models/countries.js');
const QuizView = require('./views/quiz_view.js');
const QuizGridView = require('./views/quiz_grid_view.js');
const CountryFlagView = require('./views/country_flag_view.js');
const SelectView = require('./views/select_view.js');
const CountryInfoView = require('./views/country_info_view.js');

const MapView = require('./views/map_view.js');



document.addEventListener('DOMContentLoaded', () => {
// document.querySelector('');
// const  = new ();
//  .bindEvents();



const selectDropdown = document.querySelector('.country-select');
const selectView = new SelectView(selectDropdown);
selectView.bindEvents();

const mapDiv = document.querySelector('#mapid')
const mapView = new MapView(mapDiv);
mapView.bindEvents();

const countries = new Countries();
countries.getData();
countries.getAllData();
countries.bindEvents();
countries.getNewQuestion();

const quizDiv = document.querySelector('.j')
const quizView = new QuizGridView(quizDiv);
quizView.bindEvents();

const countryContainer = document.querySelector('.wrapper');
const flagBox = document.querySelector('.flag');
console.log('app flagbox', flagBox);
const countryFlagView = new CountryFlagView(countryContainer, flagBox);
countryFlagView.bindEvents();

const countryInfoContainer = document.querySelector('.g');
const countryInfoView = new CountryInfoView (countryInfoContainer);
countryInfoView.bindEvents();
})
