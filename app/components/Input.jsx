import React from 'react';
import style from './style';
import Autocomplete from 'react-toolbox/lib/autocomplete';

const source = {
    'ES': 'Spain',
    'TH': 'Thailand',
    'EN': 'England',
    'US': 'USA'

};

var Input = React.createClass ({

    handleChange: function(value) {
        this.setState({countries: value});
    },

    componentWillMount: function(){
        this.setState({countries: []});
    },

    render: function () {
        var currentSearch = this.state.countries;
        return (
            <div className={style.searchBox}>
            <Autocomplete
            direction="down"
            label="Введите запрос:"
            onChange={this.handleChange}
            source={source}
            value={currentSearch}
            />
            </div>

        );
    }
});

export default Input;
