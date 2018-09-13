const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Munros = function(){
  this.data = null;
}

Munros.prototype.getData = function () {
  const request = new RequestHelper('https://munroapi.herokuapp.com/api/munros');
  request.get()
    .then((data) => { // if successfull
      this.data = data;
      PubSub.publish('Munros:all-munros', this.data);
    })
    .catch((err) => { // on error
      console.error(err)
    });
};

Munros.prototype.bindEvents = function () {
  this.getData();
};

module.exports = Munros;
