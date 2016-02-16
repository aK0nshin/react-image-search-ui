import React from 'react';
import ListItem from '../components/ListItem';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import style from './style';
import ImageStore from '../stores/ImageStore';
import WebAPIUtils from './../utils/WebAPIUtils';

var InfiniteList = React.createClass({

    componentDidMount: function() {
        ImageStore.addChangeListener(this._onChange);
        ImageStore.addChangeFilterListener(this._onChangeFilter);
    },
    componentWillUnmount: function() {
        ImageStore.removeChangeListener(this._onChange);
        ImageStore.removeChangeFilterListener(this._onChangeFilter);
    },
    _onChange: function(query, page) {
        this.setState({
            firstStart:false,
            isInfiniteLoading: true,
            page:page
        });
        var newElements = this.buildElements('new');
        this.setState({
            elements: newElements,
            query:query
        });
    },
    _onChangeFilter: function(){
        var filteredElements = this.buildElements('filter');
        this.setState({
            elements: filteredElements
        });
    },
    getInitialState: function(){
        return {
            firstStart:true
        }
    },


    buildElements: function(mode) {
        var allImg = ImageStore.getAll();
        var elements = [];
        for(var i in allImg.images) {
            elements.push(<ListItem key={allImg.images[i]['id']} imageId={allImg.images[i]['id']} link={allImg.images[i]['thumb_path']}/>);
        }
        if (allImg.hasMore && mode == 'new'){
            var page = ++this.state.page;
            this.setState({
                page:page,
                isInfiniteLoading: false
            });
        }
        return elements;
    },

    handleInfiniteLoad: function() {
        if (!this.state.firstStart) { //Проверить на пустоту
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
                              infiniteLoadBeginEdgeOffset={1}
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
