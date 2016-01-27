import React from 'react';
import InfiniteList from '../components/InfiniteList';
import style from './style';

var Gallery = React.createClass({
    render: function() {
        return <div className={style.gallery}>
            <InfiniteList />
        </div>;
    }

});

export default Gallery;
