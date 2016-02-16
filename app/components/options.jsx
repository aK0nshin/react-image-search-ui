import React from 'react';
import style from './style';
import WebAPIUtils from './../utils/WebAPIUtils';
import { RadioGroup, RadioButton } from 'react-toolbox';
var EventEmitter = require('events').EventEmitter;
var ServerActionCreators = require('../actions/ServerActionCreators');
var ImageStore = require('../stores/ImageStore');

var Options = React.createClass({

    eventEmitter:EventEmitter.prototype,

    getInitialState: function(){
      return {
          origin: 'all'
      }
    },

    handleRadioChange: function(value){
        this.setState({
            origin: value
        });
        ImageStore.setFilter('origin', value);
        ServerActionCreators.changeFilter();
    },

    render: function() {
        return <div>
        <RadioGroup name='origin' value={this.state.origin} onChange={this.handleRadioChange}>
            <RadioButton label='Новый фотобанк' value='new'/>
            <RadioButton label='Старый фотобанк' value='obsolete'/>
            <RadioButton label='Все' value='all'/>
        </RadioGroup>
            </div>
    }
});


export default Options;
