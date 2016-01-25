var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var WebAPIUtils = require('../utils/WebAPIUtils');
var ImageUtils = require('../utils/ImageUtils');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  createImage: function(link) {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.CREATE_MESSAGE,
      link:link
    });
    var image = ImageUtils.getCreatedImageData(link);
    WebAPIUtils.createImage(image);
  }

};
