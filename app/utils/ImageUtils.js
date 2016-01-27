module.exports = {

convertRawImage: function(rawImage) {
    return {
      id: rawImage.image_id,
      link: 'http://dev-fotobank.mirtv.ru/'+rawImage.webpath,
      title: rawImage.MFTitle,
      description: rawImage.MFDescription,
      category: rawImage.MFCategory,
      locality: rawImage.MFLocality,
      author: rawImage.MFAuthor,
      origin: rawImage.MFSource,
      eventDate: rawImage.MFEventDate,
      creationDate: rawImage.MFCreationDate,
      tags: rawImage.MFNotes
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
