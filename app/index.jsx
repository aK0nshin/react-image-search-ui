// You can also include here commons if you want with import 'react-toolbox/lib/commons';
import React from 'react';
import ReactDOM from 'react-dom';
import Superagent from 'superagent';
import ToolboxApp from 'react-toolbox/lib/app';
import Button from 'react-toolbox/lib/button';
import Header from './components/header';
import Input from './components/Input';
import InfoBlock from './components/infoBlock';
import InfiniteList from './components/InfiniteList';
import Options from './components/options';
import style from './style';
import ImageExampleData from './ImageExampleData';

ImageExampleData.init();

ReactDOM.render((
    <ToolboxApp>
    <Header />
    <Input />
    <Options />
    <InfiniteList />
    <InfoBlock />
    </ToolboxApp>
), document.getElementById('app'));
