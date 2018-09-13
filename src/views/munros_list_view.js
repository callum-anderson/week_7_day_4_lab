const PubSub = require('../helpers/pub_sub.js');

const MunrosListView = function(){

}

MunrosListView.prototype.bindEvents = function () {
  PubSub.subscribe('Munros:all-munros', (event) => {
    // console.log(event);
    console.log(event.detail);
  })
};

module.exports = MunrosListView;
