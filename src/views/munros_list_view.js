const PubSub = require('../helpers/pub_sub.js');
const MunroView = require('../views/munros_view.js');

const MunrosListView = function(element){
  this.element = element;
}

MunrosListView.prototype.bindEvents = function () {

  PubSub.subscribe('Munros:all-munros', (e) => {
    this.render(e.detail);
  });
  PubSub.subscribe('Munros:selected-munro', (e) => {
    this.render(e.detail);
  });
};

MunrosListView.prototype.render = function (data) {
  if (data.length>1) {
    const listviewDiv = document.createElement('div');
    listviewDiv.classList.add('listview-div');
    this.element.appendChild(listviewDiv);
  };
  listviewDiv = document.querySelector('.listview-div');
  listviewDiv.innerHTML = "";
  data.forEach((munro) => {
    const munroView = new MunroView(listviewDiv, munro);
    munroView.render();
  });
};

module.exports = MunrosListView;
