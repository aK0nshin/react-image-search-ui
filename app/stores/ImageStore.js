var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var AppUtils = require('../utils/AppUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _images = {};

function _addImages(rawImages) {
  rawImages.forEach(function(image) {
    if (!_images[image.id]) {
      _images[image.id] = AppUtils.convertRawImage(
        image
      );
    }
  });
}

var ImageStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
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
    return _Images[id];
  },

  getAll: function() {
    return _Images;
  },

});

ImageStore.dispatchToken = AppDispatcher.register(function(action) {

  switch (action.type) {

    case ActionTypes.CREATE_IMAGE:
      var image = AppUtils.getCreatedImageData(
        action.link
      );
      _images[image.id] = image;
      ImageStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_IMAGES:
      _addImages(action.rawImages);
      ImageStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = ImageStore;

