import React from 'react';
import ListItem from '../components/ListItem';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import style from './style';
import ImageStore from '../stores/ImageStore';
import WebAPIUtils from './../utils/WebAPIUtils';

function getImageStore() {
  return {
    allImages: ImageStore.getAll()
  };
}

var InfiniteList = React.createClass({

    componentDidMount: function() {
        ImageStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        ImageStore.removeChangeListener(this._onChange);
    },
    _onChange: function(query, page) {
        this.setState({
            firstStart:false,
            page:page,
            isInfiniteLoading: true
        });
        var newElements = this.buildElements();
        this.setState({
            elements: newElements,
            query:query
        });
    },
    getInitialState: function(){
        return {
            firstStart:true
        }
    },


    buildElements: function() {
        var allImg = getImageStore();
        var elements = [];
        for(var i in allImg.allImages.images) {
            elements.push(<ListItem key={allImg.allImages.images[i]['id']} imageId={allImg.allImages.images[i]['id']} link={allImg.allImages.images[i]['link']}/>);
        }
        if (allImg.allImages.hasMore){
            var page = ++this.state.page;
            this.setState({
                page:page,
                isInfiniteLoading: false
            });
        }
        return elements;
    },

    handleInfiniteLoad: function() {
        if (!this.state.firstStart) {
            WebAPIUtils.getImages(this.state.page, this.state.query);
        } else {
            this.setState({
                isInfiniteLoading: false
            });
        }

    },

    elementInfiniteLoad: function() {
        return <div className={style.loader}>
        <ProgressBar type="circular" mode="indeterminate" />
            </div>;
    },

    render: function() {
            if (this.state.elements) {
                return <div className={style.gallery}>
                    <Infinite elementHeight={20}
                              containerHeight={730}
                              infiniteLoadBeginEdgeOffset={10}
                              onInfiniteLoad={this.handleInfiniteLoad}
                              loadingSpinnerDelegate={this.elementInfiniteLoad()}
                              isInfiniteLoading={this.state.isInfiniteLoading}
                        >
                        {this.state.elements}
                    </Infinite>
                </div>;
            } else {
                return false;
            }
    }

});

export default InfiniteList;
