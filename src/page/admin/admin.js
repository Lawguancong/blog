import React from 'react'
import {connect} from 'react-redux'
import browserCookie from 'browser-cookies'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import EditArticle from "../../component/editArticle/editArticle";
import PublishArticle from "../../component/publishArticle/publishArticle";

import {BrowserRouter,Switch,Route} from 'react-router-dom'

@connect(
    state => state,
)

export default class Admin extends React.Component{
    constructor(props) {
        super(props)
        this.state ={
            collapsed: false,
        }
    }
    componentWillMount(){
        if(browserCookie.get('user') !== 'admin' || browserCookie.get('password') !== 'luoguancong'){
            this.props.history.push('/admin/login')
        }
    }
    componentDidMount(){
    }
    componentDidUpdate(){
    }
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    render(){
        const { Header, Content, Footer, Sider } = Layout;
        const SubMenu = Menu.SubMenu;
        return(
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                        theme="light"
                    >
                        <div className="logo" />
                        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="首页"  onClick={() => this.props.history.push('/admin')}>
                                <Icon type="home" />
                                <span>首页</span>
                            </Menu.Item>
                            <SubMenu
                                key="文章"
                                title={<span><Icon type="file" /><span>文章</span></span>}
                            >
                                <Menu.Item key="文章管理" onClick={() => this.props.history.push('/admin/edit-article')}><Icon type="edit" />文章管理</Menu.Item>
                                <Menu.Item key="发表文章" onClick={() => this.props.history.push('/admin/publish-article')}><Icon type="upload" />发表文章</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="说说"
                                title={<span><Icon type="message" /><span>说说</span></span>}
                            >
                                <Menu.Item key="说说管理" onClick={() => this.props.history.push('/admin/edit-shuoshuo')}><Icon type="edit" />说说管理</Menu.Item>
                                <Menu.Item key="发表说说"><Icon type="upload" />发表说说</Menu.Item>
                            </SubMenu>

                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }} />
                        <Content style={{ margin: '0 16px' }}>

                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                <Switch>
                                    <Route path="/admin/edit-article" component={EditArticle}/>
                                    <Route path="/admin/publish-article" component={PublishArticle}/>
                                </Switch>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2018 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>

            </div>

        )
    }
}