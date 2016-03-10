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
        this.eventEmitter.emit(ITEM_CLICK, this.props.imageId);
    },
    render: function() {
        if (this.props.link) {
            var tooltip = 'Оригинальный размер: '+this.props.width+'x'+this.props.height;
            return <div className={style.infiniteListItem} onClick={this.onClick}>
                <div className={style.imgMask} data-tooltip={tooltip}></div>
                <img id={this.props.key} src={this.props.link}/>
            </div>;
        } else {
            return <div className={style.noThumb} onClick={this.onClick}>
                <div className={style.imgMask}></div>
            </div>;
        }
    }
});
ListItem.addClickListener = function(callback) {
    EventEmitter.prototype.on(ITEM_CLICK, callback);
};
ListItem.removeClickListener = function(callback){
    EventEmitter.prototype.removeListener(ITEM_CLICK, callback);
};

export default ListItem;
