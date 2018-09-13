const Munros = require('./models/munros.js');

document.addEventListener('DOMContentLoaded', () => {
  const munros = new Munros();
  munros.getData();
})
