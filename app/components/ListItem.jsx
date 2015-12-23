import React from 'react';
import ReactInfinite from 'react-infinite';

var ListItem = React.createClass({
    getDefaultProps: function() {
        return {
            height: 50,
            lineHeight: "50px"

        }

    },
    render: function() {
        return <div className="infinite-list-item" style={
            {
                height: this.props.height,
                lineHeight: this.props.lineHeight

            }

        }>
        List Item {this.props.index}
        </div>;

    }

});

export default ListItem;
