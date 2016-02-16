var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var AppUtils = require('../utils/ImageUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';
var CHANGE_FILTER_EVENT = 'changeFilter';

var filter = {
  origin:'all'
};

var SearchQuery = null;
var _images = {};
var filtered = {};
_images.images = {};
filtered.images = {};

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
  _filterImages(_images);
}

function _filterImages(allImages){
  var arImages = allImages.images;
  for(var i in arImages) {
    if (arImages[i]['origin'] == filter['origin'] || filter['origin']=='all') {
      filtered['images'][i] = arImages[i];
    }
  }
  filtered.hasMore = allImages.hasMore;
}

var ImageStore = assign({}, EventEmitter.prototype, {
  emitChange: function(query, page) {
    this.emit(CHANGE_EVENT, query, page);
  },
  emitFilterChange: function() {
    this.emit(CHANGE_FILTER_EVENT);
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
  addChangeFilterListener: function(callback) {
    this.on(CHANGE_FILTER_EVENT, callback);
  },

  removeChangeFilterListener: function(callback) {
    this.removeListener(CHANGE_FILTER_EVENT, callback);
  },

  get: function(id) {
    return _images['images'][id];
  },

  getAll: function() {
    return filtered;
  },

  setFilter: function(param, value) {
    filter[param] = value;
  }

});

ImageStore.dispatchToken = AppDispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_RAW_IMAGES:
      _addImages(action.rawImages, action.query);
      ImageStore.emitChange(action.query, action.page);
      break;

    case ActionTypes.CHANGE_FILTER_STATE:
      filtered = {};
      filtered.images = {};
      _filterImages(_images);
      ImageStore.emitFilterChange();
      break;

    default:
      // do nothing
  }

});

module.exports = ImageStore;

