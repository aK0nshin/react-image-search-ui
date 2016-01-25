var ServerActionCreators = require('../actions/ServerActionCreators');

// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

module.exports = {

  getAllImages: function() {
    // simulate retrieving data from a database
    var rawImages= JSON.parse(localStorage.getItem('images'));

    // simulate success callback
    ServerActionCreators.receiveAll(rawImages);
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
