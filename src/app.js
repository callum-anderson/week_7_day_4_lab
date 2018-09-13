const Munros = require('./models/munros.js');
const MunrosView = require('./views/munros_view.js')
const MunrosListView = require('./views/munros_list_view.js')

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('body');
  const munrosListView = new MunrosListView();
  munrosListView.bindEvents();

  const munros = new Munros();
  munros.bindEvents();


})
