// You can also include here commons if you want with import 'react-toolbox/lib/commons';
import React from 'react';
import ReactDOM from 'react-dom';
import Superagent from 'superagent';
import ToolboxApp from 'react-toolbox/lib/app';
import Button from 'react-toolbox/lib/button';
import Header from './components/header';
import Input from './components/Input';
import InfiniteList from './components/InfiniteList';
import style from './style';

ReactDOM.render((
  <ToolboxApp>
    <Header />
    <Input token="Utyhb[Uthw2015PB" />
    <InfiniteList />
    </ToolboxApp>
), document.getElementById('app'));
