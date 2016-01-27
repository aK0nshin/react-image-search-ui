var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  receiveAll: function(rawImages, query, page) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_RAW_IMAGES,
      rawImages: rawImages,
      query: query,
      page: page
    });
  }


};
