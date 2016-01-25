module.exports = {

  init: function() {
    localStorage.clear();
    localStorage.setItem('images', JSON.stringify([
      {
        id: 'm_1',
        link: 'http://lorempixel.com/200/200',
      },
      {
        id: 'm_1',
        link: 'http://lorempixel.com/200/200',
      },
      {
        id: 'm_1',
        link: 'http://lorempixel.com/200/200',
      },
      {
        id: 'm_1',
        link: 'http://lorempixel.com/200/200',
      }
    ]));
  }

};
