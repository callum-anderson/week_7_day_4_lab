const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Munros = function(){
  this.data = null;
}

Munros.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://munroapi.herokuapp.com/api/munros');
  const request = requestHelper.get((data) => {
    this.data = data;
  });

};

module.exports = Munros;
