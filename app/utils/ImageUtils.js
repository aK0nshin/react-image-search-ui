module.exports = {

convertRawImage: function(rawImage) {
    var thumb = (rawImage.thumb_path) ? 'http://dev-fotobank.mirtv.ru/'+rawImage.thumb_path : false;
    return {
      id: rawImage.image_id,
      link: 'http://dev-fotobank.mirtv.ru/'+rawImage.webpath,
      thumb_path: thumb,
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
