  convertRawImage: function(rawImage) {
    return {
      id: rawImage.id,
      link: rawImage.link,
    };
  },

  getCreatedImageData: function(link) {
    var timestamp = Date.now();
    return {
      id: 'm_' + timestamp,
      link: link
    };
  }

};
