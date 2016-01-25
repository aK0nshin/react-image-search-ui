var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  receiveAll: function(rawImages) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_RAW_IMAGES,
      rawImages: rawImages
    });
  },

  receiveCreatedImage: function(createdImage) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_RAW_CREATED_IMAGE,
      rawImage: createdImage
    });
  }

};
