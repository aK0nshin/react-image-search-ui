import React from 'react';
import style from './style';
import {Button, IconButton} from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import Table from 'react-toolbox/lib/table';
import ListItem from '../components/ListItem';
import DatePicker from 'react-toolbox/lib/date_picker';
import ImageStore from '../stores/ImageStore';
import WebAPIUtils from './../utils/WebAPIUtils';

var MetaInfoLine = React.createClass({
        getInitialState: function() {
            return {editable : false,
                    resetValue : this.props.initialValue,
                    value : this.props.initialValue,
                    photoId : this.props.photoId,
                    metaName : this.props.metaName};
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({ value: nextProps.initialValue,
                        resetValue : nextProps.initialValue,
                        photoId : nextProps.photoId,
                        metaName : nextProps.metaName,
                        editable : false});
    },
    handleClick: function(event) {
        this.setState({editable: true});
    },
    handleReset: function(event) {
        this.setState({ value : this.state.resetValue,
                        editable: false});
    },
    handleBlur: function(event) {
        this.setState({editable: false});
    },
    handleChange: function(value) {
        this.setState({value: value});
    },
    handleDateChange: function(date) {
        this.setState({startDate: date});
    },
    handleSubmit: function(event) {
        event.preventDefault();
        var exportValue = this.state.value.trim();
        var exportMetaName = this.state.metaName;
        var exportPhotoId = this.state.photoId;
        WebAPIUtils.setMeta(exportMetaName, exportValue, exportPhotoId);
        this.setState({editable: false});
    },
    render: function() {
        switch(this.props.type){
            case "text":
                if(this.state.editable){
                    return (
                        <div>
                            <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td colSpan='2'><Input type='text' ref={function(input) {if (input != null) {input.focus();}}} value={this.state.value} onChange={this.handleChange} multiline /></td>
                                        </tr>
                                        <tr>
                                            <td><Button type="submit" icon='check' raised primary /></td>
                                            <td><Button type="reset" icon='clear' raised /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    );
                }else{
                    return (
                        <div>
                            <p onClick={this.handleClick}>{this.state.value}</p>
                        </div>
                    );
                }
                break;
            case "date":
                if(this.state.editable){
                    return (
                        <div>
                            <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                                <DatePicker onChange={this.handleDateChange} value={this.state.date} />
                                <table>
                                    <tbody>
                                        <tr>
                                            <td colSpan='2'><Input type='text' ref={function(input) {if (input != null) {input.focus();}}} value={this.state.value} onChange={this.handleChange} multiline /></td>
                                        </tr>
                                        <tr>
                                            <td><Button type="submit" icon='check' raised primary /></td>
                                            <td><Button type="reset" icon='clear' raised /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    );
                }else{
                    return (
                        <div>
                            <p onClick={this.handleClick}>{this.state.value}</p>
                        </div>
                    );
                }
                break;
            case "tags":
                break;
            case "flag":
                break;
        }
            
    }
});

var Buttons = React.createClass({
    insertClick: function(){
        var params = {
          localpath: this.props.local_path,
          token: 'Utyhb[Uthw2015PB'
        };
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://dev-fotobank.mirtv.ru/image/getbinary/', true);
        xhr.onload = function() {
            window.handle(this.responseText);
            window.close();
        };
        xhr.onerror = function() {
            alert( 'Ошибка получения файла!' + this.status );
        };
        xhr.send(JSON.stringify(params));
    }
    ,
    render: function(){
        return <div className={style.buttons}>
        <Button label='Вставить' onClick={this.insertClick} raised accent/>
        <Button label='Сделать что-то еще' raised primary/>
        </div>
    }
});

var InfoBlock = React.createClass({
    getInitialState: function() {
        return {
            info: false,
            firstAppear: false
        }
    },
    componentDidMount: function() {
        ListItem.addClickListener(this._onItemClick);
        ImageStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function() {
        ListItem.removeClickListener(this._onItemClick);
        ImageStore.removeChangeListener(this._onStoreChange);
    },
    _onItemClick: function(id){
        var info = ImageStore.get(id);
        this.setState({
            info:info
        });
    },
    _onStoreChange: function(query, page){
        if(page==0) {
            this.setState({
                firstAppear: true
            });
        }
    },
    render: function() {
        if (this.state.info!=false){
            return <div className={style.infoBlock}>
                <div className={style.imagePreview}>
                    <img src={this.state.info.link}/>
                </div>
                <div style={{
                    width:600,
                    margin:'auto',
                    paddingTop:'20px'
                }}>
                    <table className={style.infoTable}>
                        <tbody>
                            <tr><td>Заголовок</td><td><MetaInfoLine initialValue={this.state.info.title} metaName="MFTitle" type="text" photoId={this.state.info.id} /></td></tr>
                            <tr><td>Описание</td><td><MetaInfoLine initialValue={this.state.info.description} metaName="MFDescription" type="text" photoId={this.state.info.id} /></td></tr>
                            <tr><td>Категория</td><td><MetaInfoLine initialValue={this.state.info.category} metaName="MFCategory" type="text" photoId={this.state.info.id} /></td></tr>
                            <tr><td>Место</td><td><MetaInfoLine initialValue={this.state.info.locality} metaName="MFLocality" type="text" photoId={this.state.info.id} /></td></tr>
                            <tr><td>Автор</td><td><MetaInfoLine initialValue={this.state.info.author} metaName="MFAuthor" type="text" photoId={this.state.info.id} /></td></tr>
                            <tr><td>Источник</td><td><MetaInfoLine initialValue={this.state.info.source} metaName="MFSource" type="text" photoId={this.state.info.id} /></td></tr>
                            <tr><td>Дата события</td><td>{this.state.info.eventDate}</td></tr>
                            <tr><td>Дата поступления</td><td>{this.state.info.creationDate}</td></tr>
                            <tr><td>Оригинальный размер</td><td>{this.state.info.width}px x {this.state.info.height}px</td></tr>
                            <tr><td>Теги</td><td>{this.state.info.tags}</td></tr>
                        </tbody>
                    </table>
                </div>
                <Buttons local_path={this.state.info.local_path}/>
            </div>;
        } else {
            if (this.state.firstAppear) {
                return <div className={style.infoBlockEmpty}>
                    Выберите изображение
                </div>;
            } else {
                return <div className={style.infoBlockEmpty}>
                </div>;
            }
        }


    },


  _renderInput(param) {
    return (
      <div className="form-group" key={param} style={{paddingRight: 5}}>
        <label>
          {param.toUpperCase()}
        </label>
        {' '}
        <input
                className="form-control"
                type="number"
                value={this.state[param]}
                onChange={this._setValue.bind(this, param)}
        />
      </div>
    );
  }



});

export default InfoBlock;