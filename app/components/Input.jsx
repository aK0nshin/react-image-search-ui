import React from 'react';
import Superagent from 'superagent';
import style from './style';
import WebAPIUtils from './../utils/WebAPIUtils';
import MaterialInput from 'react-toolbox/lib/input';


const origin = 'https://dev-fotobank.mirtv.ru';

var SuperagentSearch = Superagent.post(origin + '/image/search/');
var SuperagentSuggest = Superagent.get(origin + "/image/suggest/?token=Utyhb[Uthw2015PB&term=путин");

var Input = React.createClass ({
    superagent: {search:SuperagentSearch, suggest:SuperagentSuggest},

    handleKeyDown: function(event){
        if(event.which == 13){
            WebAPIUtils.getImages(0, this.state.query);
        }
    },

    handleChange: function(value) {
        this.setState({ query: value });
    },

    render: function () {
        return (
            <div className={style.searchBox}>
                <MaterialInput placeholder="Введите запрос" type="text" onChange={this.handleChange} onKeyPress={this.handleKeyDown}/>
            </div>

        );
    }
});

export default Input;
