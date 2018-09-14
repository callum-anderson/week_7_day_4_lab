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
        height: munro.height,
        region: munro.region
      }});
      PubSub.publish('Munros:all-munros', this.data);
      const filteredByRegion = this.data
        .map(munro => munro.region)
          .reduce((acc, current, index, array) => {
            if (array.indexOf(current) === index) {
              acc.push(current);
            }
            return acc
          }, []);
      this.regions = filteredByRegion;
      PubSub.publish('Munros:regions', filteredByRegion);
    })
    .catch((err) => {
      console.error(err)
    });
};

Munros.prototype.bindEvents = function () {
  this.getData();
  PubSub.subscribe('Munros:selected-change', (event) => {
    let dataSend = this.data.filter((munro) => munro.region === event.detail);
    if (event.detail==="Show All") {
      dataSend = this.data;
    }
    PubSub.publish('Munros:selected-munro', dataSend);
  });
};

module.exports = Munros;
