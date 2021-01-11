// css样式
import './index.css';



//registerServiceWorker处理离线缓存、消息推送、后台自动更新等任务
import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDom from 'react-dom'
import Router from './router/router'




ReactDom.render(<Router/>,document.getElementById('root'))
registerServiceWorker();
