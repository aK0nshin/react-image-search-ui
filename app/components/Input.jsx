import React from 'react';
import Superagent from 'superagent';
import style from './style';

const origin = 'http://dev-fotobank.mirtv.ru';

var SuperagentSearch = Superagent.post(origin + '/image/search/');
var SuperagentSuggest = Superagent.get(origin + "/image/suggest/?token=Utyhb[Uthw2015PB&term=путин");

var Input = React.createClass ({
    superagent: {search:SuperagentSearch, suggest:SuperagentSuggest},

    handleKeyDown: function(event){
        if(event.keyCode == 13){
            this.superagent.search.send({query:this.state.query, page:0, token:"Utyhb[Uthw2015PB"})
                .end(function(){});
        }
    },

    handleChange: function(event) {
        this.setState({ query: event.target.value });
    },

    render: function () {
        return (
            <div className={style.searchBox}>
                <input className={style.searchInput} placeholder="Введите запрос" type="text" onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
            </div>

        );
    }
});

export default Input;
