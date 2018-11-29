const PubSub = require('../helpers/pub_sub.js');

const PinnedCountryView =  function (container, country) {
  this.container = container;
  this.country = country;
};

//////////////////////
// RENDER FUNCTIONS //
//////////////////////

// PinnedCountryView.prototype.render = function () {
//   const countryContainer = this.createDiv('pinned-country-container');
//   const details = this.renderDetails();
//   const countryName = this.createCollapsibleButton(this.country.name, 'pinned-country-name', details);
//   // change to showDetailsButton, call render in the event listener for that
//   countryContainer.appendChild(countryName);
//   countryContainer.appendChild(details);
//   this.container.appendChild(countryContainer);
// };

PinnedCountryView.prototype.render = function () {
  const countryContainer = this.createDiv('pinned-country-container');
  const countryName = this.createShowDetailsButton(this.country.name, 'pinned-country-name');
  const removeButton = this.createRemoveButton('X');
  countryContainer.appendChild(removeButton);
  countryContainer.appendChild(countryName);
  this.container.appendChild(countryContainer);
};

PinnedCountryView.prototype.renderDetails = function () {
  const details = this.createDiv('pinned-country-details');
  const notesForm = this.createNotesForm();
  const notesFormHeading = this.createCollapsibleButton('Add / Change Notes', 'pinned-country-notes-heading', notesForm);
  const notesHeading = this.createTextElement('p', 'Notes', 'pinned-country-notes-heading');
  const notes = this.createTextElement('p', this.country.notes, 'pinned-country-notes');
  this.notes = notes;
  const showInfoButton = this.createShowInfoButton();
  const removeButton = this.createRemoveButton('Remove from pinned countries');
  const closeDetailsButton = this.createCloseDetailsButton('Close Details', 'pinned-country-close-details-button');
  details.appendChild(showInfoButton);
  details.appendChild(notesHeading);
  details.appendChild(notes);
  details.appendChild(notesFormHeading);
  details.appendChild(notesForm);
  details.appendChild(removeButton);
  details.appendChild(closeDetailsButton);
  return details;
};

/////////////////////////////////////////
// CREATE ELEMENT FUNCTIONS (SPECIFIC) //
/////////////////////////////////////////

PinnedCountryView.prototype.createRemoveButton = function (textContent) {
  const removeButton = this.createButton(textContent, 'pinned-country-remove-button');
  removeButton.addEventListener('click', (event) => {
    PubSub.publish('PinnedCountryView:remove-button-clicked', this.country);
  });
  return removeButton;
};

PinnedCountryView.prototype.createShowInfoButton = function () {
  const showInfoButton = this.createButton('Show Country Info', 'pinned-country-show-info-button');
  showInfoButton.addEventListener('click', (event) => {
    PubSub.publish('Countries:selected-country-ready', this.country);
  });
  return showInfoButton;
};

PinnedCountryView.prototype.createCollapsibleButton = function (textContent, cssClass, targetElement) {
  const collapsibleButton = this.createButton(textContent, cssClass);
  collapsibleButton.addEventListener('click', () => {
    if (targetElement.style.display === "block") {
      targetElement.style.display = "none";
    } else {
      targetElement.style.display = "block";
    }
  });
  return collapsibleButton;
  // targetElement MUST have (default) css display property set in stylesheet to none
};

PinnedCountryView.prototype.createShowDetailsButton = function (textContent, cssClass) {
  const showDetailsButton = this.createButton(textContent, cssClass);
  showDetailsButton.addEventListener('click', () => {
    this.container.innerHTML = '';
    this.container.style.display = "block";
    const details = this.renderDetails();
    this.container.appendChild(details);
  });
  return showDetailsButton;
};

PinnedCountryView.prototype.createCloseDetailsButton = function (textContent, cssClass) {
  const closeDetailsButton = this.createButton(textContent, cssClass);
  closeDetailsButton.addEventListener('click', () => {
    this.container.style.display = "grid";
    PubSub.publish('PinnedCountryView:close-details-clicked', this.country);
  });
  return closeDetailsButton;
};

//////////////////////////
// NOTES FORM FUNCTIONS //
//////////////////////////

PinnedCountryView.prototype.createNotesForm = function () {
  const formWrapper = this.createDiv('notes-form-wrapper');
  const form = document.createElement('form');
  form.classList.add('notes-form');
  const textarea = this.createTextElement('textarea', '', 'notes-form-textarea')
  textarea.name = 'notes';
  const submit = document.createElement('input');
  submit.type = 'submit';
  submit.value = 'Add notes';

  form.appendChild(textarea);
  form.appendChild(submit);
  form.addEventListener('submit', (evt) => {
    this.handleSubmit(evt);
  })
  formWrapper.appendChild(form);
  return formWrapper;
};

PinnedCountryView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  this.country.notes = evt.target.notes.value;
  PubSub.publish('PinnedCountryView:notes-submitted', this.country);
  PubSub.subscribe('Countries:country-notes-submitted-id', (evt) => {
    this.country._id = evt.detail;
  });
  this.notes.textContent = this.country.notes;
  evt.target.reset();
};

////////////////////////////////////////
// CREATE ELEMENT FUNCTIONS (GENERIC) //
////////////////////////////////////////


PinnedCountryView.prototype.createTextElement = function (type, textContent, cssClass) {
  const element = document.createElement(type);
  element.textContent = textContent;
  element.classList.add(cssClass);
  return element;
};

PinnedCountryView.prototype.createDiv = function (cssClass) {
  const div = document.createElement('div');
  div.classList.add(cssClass);
  return div;
};

PinnedCountryView.prototype.createButton = function (textContent, cssClass) {
  const button = document.createElement('button');
  button.textContent = textContent;
  button.classList.add(cssClass);
  return button;
};

////////////////////
// MODULE EXPORTS //
////////////////////

module.exports = PinnedCountryView;