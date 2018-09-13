const MunrosView = function(element, munro) {
  this.element = element;
  this.munro = munro;
}

MunrosView.prototype.render = function () {
  const container = document.createElement('div');
  container.classList.add('munro');

  const header = document.createElement('h2');
  header.textContent = this.munro.name;
  container.appendChild(header);

  const infoList = document.createElement('ul');
  const height = document.createElement('li');
  height.textContent = this.munro.height;
  infoList.appendChild(height);

  const meaning = document.createElement('li')
  meaning.textContent = this.munro.meaning;
  infoList.appendChild(meaning);

  container.appendChild(infoList);

  this.element.appendChild(container);
};

module.exports = MunrosView;
