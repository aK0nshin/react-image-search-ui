import React from 'react';
import ReactInfinite from 'react-infinite';
import style from './style';
import ImageStore from '../stores/ImageStore';
var EventEmitter = require('events').EventEmitter;
import assign from 'object-assign';


var ITEM_CLICK = 'itemclick';
var ListItem = React.createClass({

    eventEmitter:EventEmitter.prototype,

    onClick: function(){
        var m;
        this.eventEmitter.emit(ITEM_CLICK, this.props.imageId);
    },
    render: function() {
        return <div className={style.infiniteListItem} onClick={this.onClick}>
            <div className={style.imgMask}></div>
            <img id={this.props.key} src={this.props.link}/>
        </div>;
    }
});
ListItem.addClickListener = function(callback) {
    var m;
    EventEmitter.prototype.on(ITEM_CLICK, callback);
};
ListItem.removeClickListener = function(callback){
    EventEmitter.prototype.removeListener(ITEM_CLICK, callback);
};

export default ListItem;
