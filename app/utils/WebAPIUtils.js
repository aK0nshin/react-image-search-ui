var ServerActionCreators = require('../actions/ServerActionCreators');
var Superagent = require('superagent');
var ImageStore = require('../stores/ImageStore');

// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

module.exports = {

  getImages: function(page, query) { //Нужно добавить query
    // simulate retrieving data from a database

    var superagent = Superagent.post('https://dev-fotobank.mirtv.ru/image/search/');
    superagent.send({query:query, page:page, token:"Utyhb[Uthw2015PB", external_client: true})
        .end(function(err, res){
          var rawImages = {};
          rawImages.images = res.body.data;
          rawImages.hasMore= res.body.meta.hasMore;
          ServerActionCreators.receiveAll(rawImages, query, page);

        });


  },

  createImages: function(images) {
    // simulate writing to a database
    var rawImages = JSON.parse(localStorage.getItem('images'));
    var timestamp = Date.now();
    var id = 'm_' + timestamp;
    var createdImages = {
      id: id,
      link: image.link
    };
    rawImages.push(createdImages);
    localStorage.setItem('images', JSON.stringify(rawImages));

    // simulate success callback
    setTimeout(function() {
      ServerActionCreators.receiveCreatedImage(createdImage);
    }, 0);
  }

};
