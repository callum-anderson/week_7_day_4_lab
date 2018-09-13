const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Munros = function(){
  this.data = null;
}

Munros.prototype.getData = function () {
  const request = new RequestHelper('https://munroapi.herokuapp.com/api/munros');
  request.get()
    .then((data) => {
      this.data = data.map(munro => {return {
        name: munro.name,
        meaning: munro.meaning,
        height: munro.height
      }});
      PubSub.publish('Munros:all-munros', this.data);
    })
    .catch((err) => {
      console.error(err)
    });
};

Munros.prototype.bindEvents = function () {
  this.getData();
  PubSub.subscribe('Munros:selected-change', (event) => {
    const filteredMunro = this.data.filter((munro) => munro.name === event.detail);
    PubSub.publish('Munros:selected-munro', filteredMunro);
  });
};

module.exports = Munros;
