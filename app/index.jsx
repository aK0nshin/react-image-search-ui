// You can also include here commons if you want with import 'react-toolbox/lib/commons';
import React from 'react';
import ReactDOM from 'react-dom';
import Superagent from 'superagent';
import ToolboxApp from 'react-toolbox/lib/app';
import Button from 'react-toolbox/lib/button';
import Header from './components/header';
import Input from './components/Input';
import Gallery from './components/gallery';
import InfoBlock from './components/infoBlock';
import style from './style';
import ImageExampleData from './ImageExampleData';

ImageExampleData.init();

ReactDOM.render((
    <ToolboxApp>
    <Header />
    <Input />
    <Gallery />
    <InfoBlock />
    </ToolboxApp>
), document.getElementById('app'));
