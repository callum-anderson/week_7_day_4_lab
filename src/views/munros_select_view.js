const PubSub = require('../helpers/pub_sub.js');
// const MunroView = require('../views/munros_view.js');

const MunrosSelectView = function(container){
  this.container = container;
}

MunrosSelectView.prototype.bindEvents = function () {

  const selector = document.createElement('select');
  selector.classList.add('munro-filter');
  this.container.appendChild(selector);

  PubSub.subscribe('Munros:all-munros', (e) => {
    this.populate(e.detail);
  });

  selector.addEventListener('change', (e) => {
    PubSub.publish('Munros:selected-change', e.target.value);
  })

};

MunrosSelectView.prototype.populate = function (data) {
  const selector = document.querySelector('.munro-filter');
  data.forEach((munro) => {
    const option = document.createElement('option');
    option.index = data.indexOf(munro);
    option.textContent = munro.name;
    option.value = munro.name;
    selector.appendChild(option);
  });
};

module.exports = MunrosSelectView;
