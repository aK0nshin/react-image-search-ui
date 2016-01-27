import React from 'react';
import style from './style';
import {Button, IconButton} from 'react-toolbox/lib/button';
import ListItem from '../components/ListItem';
import ImageStore from '../stores/ImageStore';


var Buttons = React.createClass({
    render: function(){
        return <div className={style.buttons}>
        <Button label='Вставить' raised accent/>
        <Button label='Сделать что-то еще' raised primary/>
        </div>
    }
});

var InfoBlock = React.createClass({
    getInitialState: function() {
        return {
            info: false
        }
    },
    componentDidMount: function() {
        ListItem.addClickListener(this._onItemClick);
    },
    componentWillUnmount: function() {
        ListItem.removeClickListener(this._onItemClick);
    },
    _onItemClick: function(id){
        var info = ImageStore.get(id);
        this.setState({
            info:info
        });
    },
    render: function() {
        if (this.state.info!=false){
            return <div className={style.infoBlock}>
                <div className={style.imagePreview}>
                    <img src={this.state.info.link}/>
                </div>
                <div style={
            {
                width:600,
                margin:'auto',
                paddingTop:'20px'
            }
            }>
                    <table className={style.infoTable}>
                        <tr><td>Заголовок</td><td>{this.state.info.title}</td></tr>
                        <tr><td>Описание</td><td>{this.state.info.description}</td></tr>
                        <tr><td>Категория</td><td>{this.state.info.category}</td></tr>
                        <tr><td>Место</td><td>{this.state.info.locality}</td></tr>
                        <tr><td>Автор</td><td>{this.state.info.author}</td></tr>
                        <tr><td>Источник</td><td>{this.state.info.origin}</td></tr>
                        <tr><td>Дата события</td><td>{this.state.info.eventDate}</td></tr>
                        <tr><td>Дата поступления</td><td>{this.state.info.creationDate}</td></tr>
                        <tr><td>Теги</td><td>{this.state.info.tags}</td></tr>
                    </table>
                </div>
                <Buttons />
            </div>;
        } else {
            return <div className={style.infoBlockEmpty}>
                Выберите изображение
            </div>;
        }


    }

});

export default InfoBlock;