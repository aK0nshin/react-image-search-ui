import React from 'react';
import style from './style';
import WebAPIUtils from './../utils/WebAPIUtils';
import { RadioGroup, RadioButton } from 'react-toolbox';
import DatePicker from 'react-toolbox/lib/date_picker';
import Input from 'react-toolbox/lib/input';
var EventEmitter = require('events').EventEmitter;
var ServerActionCreators = require('../actions/ServerActionCreators');
var ImageStore = require('../stores/ImageStore');
import Autocomplete from 'react-toolbox/lib/autocomplete';

var Options = React.createClass({

    eventEmitter:EventEmitter.prototype,

    getInitialState: function(){
      return {
          origin: 'all',
          author: ''
      }
    },
    componentWillMount: function(){
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://dev-fotobank.mirtv.ru/author/all/', true);
        xhr.onload = function() {
            var resp = JSON.parse(xhr.responseText);
            that.setState({source:resp});
        };
        xhr.onerror = function() {
            alert( 'Ошибка получения файла!' + xhr.status );
        };
        xhr.send();
        this.setState({query: []});
    },

    handleRadioChange: function(value){
        this.setState({
            origin: value
        });
        ImageStore.setFilter('origin', value);
        ServerActionCreators.changeFilter();
    },
    dateFromChange: function(value){
        this.setState({
            dateFrom:value
        });
        ImageStore.setFilter('dateFrom', value);
        ServerActionCreators.changeFilter();

    },
    dateToChange: function(value){
        this.setState({
            dateTo:value
        });
        ImageStore.setFilter('dateTo', value);
        ServerActionCreators.changeFilter();

    },
    handleAuthorChange: function(value) {
        var m;
        this.setState({
            author:value
        });
        ImageStore.setFilter('author', value);
        ServerActionCreators.changeFilter();
    },
    handleSizeInput: function(inputName, value){
        this.setState({
        ...this.state, [inputName]: value //колдовство
        });
    },
    handleSizeEnter: function(inputName, event){
        if(event.which == 13){
            ImageStore.setFilter(inputName, this.state[inputName]);
            ServerActionCreators.changeFilter();
        }
    },
    handleSizeBlur: function(inputName){
        ImageStore.setFilter(inputName, this.state[inputName]);
        ServerActionCreators.changeFilter();
    },

    render: function() {
        return <div>
        <RadioGroup name='origin' value={this.state.origin} onChange={this.handleRadioChange}>
            <RadioButton label='Новый фотобанк' value='new'/>
            <RadioButton label='Старый фотобанк' value='obsolete'/>
            <RadioButton label='Все' value='all'/>
        </RadioGroup>
            <section>
                Дата
                <DatePicker
                    label='От'
                    onChange={this.dateFromChange}
                    value={this.state.dateFrom}
                />

                <DatePicker
                    label='До'
                    onChange={this.dateToChange}
                    value={this.state.dateTo}
                />
            </section>
            <Autocomplete
                direction="down"
                onChange={this.handleAuthorChange}
                source={this.state.source}
                placeholder="Автор"
                value={this.state.author}
            />
            <Input placeholder="От" type="text" value={this.state.widthFrom} onBlur={this.handleSizeBlur.bind(this, 'widthFrom')} onChange={this.handleSizeInput.bind(this, 'widthFrom')} onKeyPress={this.handleSizeEnter.bind(this, 'widthFrom')}/>px
            <Input placeholder="До" type="text" value={this.state.widthTo} onBlur={this.handleSizeBlur.bind(this, 'widthTo')} onChange={this.handleSizeInput.bind(this, 'widthTo')} onKeyPress={this.handleSizeEnter.bind(this, 'widthTo')}/>px
            <Input placeholder="От" type="text" value={this.state.heightFrom} onBlur={this.handleSizeBlur.bind(this, 'heightFrom')} onChange={this.handleSizeInput.bind(this, 'heightFrom')} onKeyPress={this.handleSizeEnter.bind(this, 'heightFrom')}/>px
            <Input placeholder="До" type="text" value={this.state.heightTo} onBlur={this.handleSizeBlur.bind(this, 'heightTo')} onChange={this.handleSizeInput.bind(this, 'heightTo')} onKeyPress={this.handleSizeEnter.bind(this, 'heightTo')}/>px


            </div>
    }
});


export default Options;
