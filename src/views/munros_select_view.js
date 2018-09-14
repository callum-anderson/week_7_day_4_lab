const PubSub = require('../helpers/pub_sub.js');
// const MunroView = require('../views/munros_view.js');

const MunrosSelectView = function(container){
  this.container = container;
}

MunrosSelectView.prototype.bindEvents = function () {

  const selector = document.createElement('select');
  selector.classList.add('munro-filter');
  this.container.appendChild(selector);

  PubSub.subscribe('Munros:regions', (e) => {
    this.populate(e.detail);
  });

  selector.addEventListener('change', (e) => {
    PubSub.publish('Munros:selected-change', e.target.value);
  });

};

MunrosSelectView.prototype.populate = function (data) {
  const selector = document.querySelector('.munro-filter');
  createHTML('option', 0, 'Show All', selector);
  for (i = 0; i<data.length; i++) {
    createHTML('option', i+1, data[i], selector);
  };
};

function createHTML(element, index, text, parent) {
  const option = document.createElement(element);
  option.value = text;
  option.textContent = text;
  parent.appendChild(option);
}

module.exports = MunrosSelectView;
