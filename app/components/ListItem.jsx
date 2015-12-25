import React from 'react';
import ReactInfinite from 'react-infinite';
import style from './style';

var ListItem = React.createClass({
    render: function() {
        return <div className={style.infiniteListItem}>
            Image {this.props.index}
        </div>;
    }
});

export default ListItem;
