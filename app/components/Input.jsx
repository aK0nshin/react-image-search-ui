import React from 'react';
import Superagent from 'superagent';
import style from './style';
import Autocomplete from 'react-toolbox/lib/autocomplete';

const source = {
    'ES': 'Spain',
    'TH': 'Thailand',
    'EN': 'England',
    'US': 'USA'

};

const origin = 'http://dev-fotobank.mirtv.ru';

var SuperagentSearch = Superagent.post(origin + '/image/search');
var SuperagentSuggest = Superagent.get(origin + "/image/suggest");

var Input = React.createClass ({
    superagent: {search:SuperagentSearch, suggest:SuperagentSuggest},

    handleChange: function(value) {
        this.setState({query: value});
        this.superagent.search
        .send({'query':this.state.value, 'token':'Utyhb[Uthw2015PB'})
        .end(function(){});
        console.log('change1');
    },

    componentWillMount: function(){
        this.setState({query: []});
        this.setState({source:source});
    },

    componentDidMount(){
        console.log(this.props);
    },

    render: function () {
        var currentSearch = this.state.query;
        return (
            <Autocomplete
            direction="down"
            label="Введите запрос:"
            onChange={this.handleChange}
            source={source}
            value={currentSearch}
            />

        );
    }
});

export default Input;
