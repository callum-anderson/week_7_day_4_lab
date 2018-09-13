const PubSub = require('../helpers/pub_sub.js');
const MunroView = require('../views/munros_view.js');

const MunrosListView = function(element){
  this.element = element;
}

MunrosListView.prototype.bindEvents = function () {
  PubSub.subscribe('Munros:all-munros', (event) => {
    this.render(event.detail);
  })
};

MunrosListView.prototype.render = function (data) {
  const munroList = data.map(munro => {return {
    name: munro.name,
    meaning: munro.meaning,
    height: munro.height
  }});

  munroList.forEach((munro) => {
    const munroView = new MunroView(this.element, munro);
    munroView.render();
  })
};

module.exports = MunrosListView;
