import React from 'react'
import {connect} from 'react-redux'
import { Form, Icon, Input, Button, message} from 'antd';
import browserCookie from 'browser-cookies'

import './loginModal.css'

@connect(
    state => state,
    {}
)
export default class LoginModal extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            user:'',
            password:''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.user === 'admin' && this.state.password === 'luoguancong'){
            browserCookie.set('user', 'admin')
            browserCookie.set('password', 'luoguancong')
            // browserCookie.set('user', 'admin',{expires: 365,secure: true, domain: '/admin'})
            // browserCookie.set('password', 'admin',{expires: 365,secure: true, domain: '/admin'})
            this.props.history.push('/admin')
        }else{
            message.error('This is a message of error');
        }
    }
    componentDidMount(){}
    onChange = (e,key) => {
        this.setState({
            [key]:e.target.value
        });
    }
    render(){
        const FormItem = Form.Item;
        return(
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    <Input value={this.state.user} onChange={(e) => this.onChange(e,'user')} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户"/>
                </FormItem>
                <FormItem>
                    <Input value={this.state.password} onChange={(e) => this.onChange(e,'password')} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                </FormItem>
                <FormItem>
                    <p><span>Username：admin</span><span>Password：admin</span></p>
                </FormItem>
            </Form>
        )
    }
}