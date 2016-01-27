var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var AppUtils = require('../utils/ImageUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var SearchQuery = null;
var _images = {};
_images.images = {};

function _addImages(rawImages, query) {
  if (query!=SearchQuery){
    SearchQuery=query;
    _images = {};
    _images.images = {};
  }
  var imageArray = rawImages.images;
  imageArray.forEach(
      function(image) {
        if (!_images['images'][image.image_id]) {
          _images['images'][image.image_id] = AppUtils.convertRawImage(
          image
      );
    }
  });
  _images.hasMore = rawImages.hasMore;
}

var ImageStore = assign({}, EventEmitter.prototype, {
  emitChange: function(query, page) {
    this.emit(CHANGE_EVENT, query, page);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function(id) {
    return _images['images'][id];
  },

  getAll: function() {
    return _images;
  },

});

ImageStore.dispatchToken = AppDispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_RAW_IMAGES:
      _addImages(action.rawImages, action.query);
      ImageStore.emitChange(action.query, action.page);
      break;

    default:
      // do nothing
  }

});

module.exports = ImageStore;

