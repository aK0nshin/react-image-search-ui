import React from 'react';
import style from './style';
import {Button, IconButton} from 'react-toolbox/lib/button';

var Buttons = React.createClass({
    render: function(){
        return <div className={style.buttons}>
        <Button label='Вставить' raised accent/>
        <Button label='Сделать что-то еще' raised primary/>
        </div>
            }
});

var Info = React.createClass({
    render: function(){
        return <div style={
            {
                width:600,
                margin:'auto',
                paddingTop:'20px'
            }
        }>
                <table className={style.infoTable}>
                    <tr><td>Заголовок</td><td>Lorem Ipsum dolor sit amet, consectetur adipiscing elit</td></tr>
                    <tr><td>Описание</td><td>Phasellus imperdiet enim quam, vel faucibus nulla bibendum eu.
                        Fusce auctor mauris sit amet egestas condimentum. Quisque tincidunt massa odio, quis faucibus dolor pharetra ut.
                        Pellentesque pellentesque dictum nisl. Aliquam erat volutpat.
                        Vivamus convallis blandit velit, in sodales nulla hendrerit quis.
                        Donec vitae venenatis lacus.
                        Phasellus at facilisis neque. Sed interdum rhoncus pretium. In laoreet,
                        massa a porta pellentesque, est nunc aliquet dui, nec consectetur risus urna id risus.</td></tr>
                    <tr><td>Категория</td><td>До 16 и старше</td></tr>
                    <tr><td>Место</td><td>Московская область, деревня Черная Грязь</td></tr>
                    <tr><td>Автор</td><td>Леша Навальный</td></tr>
                    <tr><td>Источник</td><td>Недоверенный</td></tr>
                    <tr><td>Дата события</td><td>Ой, давненько</td></tr>
                    <tr><td>Дата поступления</td><td>Вот только-только</td></tr>
                    <tr><td>Теги</td><td>реакт, react, скачать, material, бесплатно, яваскрипт, материал</td></tr>
                </table>
            </div>;
    }
});

var InfoBlock = React.createClass({
    render: function() {
        return <div className={style.infoBlock}>
            <div className={style.imagePreview}>
                Image Preview
            </div>
            <Info />
            <Buttons />
        </div>;

    }

});

export default InfoBlock;