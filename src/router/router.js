

//为组件内建文案提供统一的国际化支持。
// import { LocaleProvider } from 'antd';
// import zh_CN from 'antd/lib/locale-provider/zh_CN';
// import 'moment/locale/zh-cn';

//registerServiceWorker处理离线缓存、消息推送、后台自动更新等任务
import React from 'react';
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducer/reducer'
import { Provider } from 'react-redux'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Loadable from 'react-loadable';




// const Loading = () => (<span>loading</span>);
import Loading from '../component/loading/loading'


// page
const DashBoard = Loadable({loader: () => import('../page/dashBoard/dashBoard'),loading: Loading});
const AdminLogin = Loadable({loader: () => import('../page/adminLogin/adminLogin'),loading: Loading});
const Admin = Loadable({loader: () => import('../page/admin/admin'),loading: Loading});






//reudx数据流 -> 创建store
const store = createStore(reducer,compose(//
    applyMiddleware(thunk),// 可以让redux数据流处理异步
    window.devToolsExtension?window.devToolsExtension():f=>f
))

export default class Router extends React.Component {
    // static getDerivedStateFromProps(){
    //     console.log('getDerivedStateFromProps')
    // }
    render(){
        return(
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/admin/login" component={AdminLogin}/>
                        <Route path="/admin" component={Admin}/>
                        <DashBoard/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}
