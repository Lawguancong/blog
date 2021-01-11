import './dashBoardHeader.css'

import React from 'react'
import {connect} from 'react-redux'



@connect(
    state => state,
)
export default class DashBoardHeader extends React.Component {

    constructor(props) {
        super(props)

    }

    componentDidMount() {

    }
    componentDidUpdate() {

    }

    render() {
        return (
            <div className="header">
                <div className="container">
                    <ul>
                        <li onClick={() => {this.props.history.push("/")}}><span>主页</span></li>
                        <li>
                            <span>
                                <a href="http://second-hand-tao.luoguancong.com" target="_blank" style={{color:"white"}}>React作品</a>
                                {/*<ul className="project">*/}
                                    {/*<li><a href="http://second-hand-tao.luoguancong.com" target="_blank">二手淘</a></li>*/}
                                {/*</ul>*/}
                            </span>
                        </li>
                        <li>
                            <span>
                                <a href="http://cnode.luoguancong.com" target="_blank" style={{color:"white"}}>Vue作品</a>
                                {/*<ul className="project">*/}
                                    {/*<li><a href="http://cnode.luoguancong.com" target="_blank">cnode</a></li>*/}
                                {/*</ul>*/}
                            </span>
                        </li>
                        <li onClick={() => alert('敬请期待')}><span>小程序</span></li>
                        <li onClick={() => alert('敬请期待')}><span>小游戏</span></li>
                        <li><span>敬请期待</span></li>
                    </ul>
                </div>
            </div>
        )
    }
}