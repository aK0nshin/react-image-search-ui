import React from 'react';
import ListItem from '../components/ListItem';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import style from './style';

function getImageStore() {
  return {
    allTodos: ImageStore.getAll()
  };
}

var InfiniteList = React.createClass({
    getInitialState: function() {
        return {
            elements: this.buildElements(0, 100),
            isInfiniteLoading: false

        }

    },

    buildElements: function(start, end) {
        var elements = [];
        for (var i = start; i < end; i++) {
            elements.push(<ListItem key={i} index={i}/>)

        }
        return elements;

    },

    handleInfiniteLoad: function() {
        var that = this;
        this.setState({
            isInfiniteLoading: true

        });
        setTimeout(function() {
            var elemLength = that.state.elements.length,
                newElements = that.buildElements(elemLength, elemLength + 100);
            that.setState({
                isInfiniteLoading: false,
                elements: that.state.elements.concat(newElements)

            });

        }, 2500);

    },

    elementInfiniteLoad: function() {
        return <div className={style.loader}>
        <ProgressBar type="circular" mode="indeterminate" />
            </div>;

    },

    render: function() {
        return <Infinite elementHeight={20}
        containerHeight={730}
        infiniteLoadBeginEdgeOffset={200}
        onInfiniteLoad={this.handleInfiniteLoad}
        loadingSpinnerDelegate={this.elementInfiniteLoad()}
        isInfiniteLoading={this.state.isInfiniteLoading}
        timeScrollStateLastsForAfterUserScrolls={0}
        >
        {this.state.elements}
        </Infinite>;

    }

});

export default InfiniteList;
