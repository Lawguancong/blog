import './sideBar.css'

import React from 'react'
import {connect} from 'react-redux'
// import Cover from '../../data/image/u=2130476472,1692954163&fm=27&gp=0.jpg'
// import Avatar from '../../data/image/42945313639375304.jpg'
// import weChatQrCode from '../../data/image/weChat-qrcode.jpg'
import axios from 'axios'

const Cover = "https://lgc-bucket.oss-cn-shenzhen.aliyuncs.com/u%3D2130476472%2C1692954163%26fm%3D27%26gp%3D0.jpg"
const Avatar = "https://lgc-bucket.oss-cn-shenzhen.aliyuncs.com/42945313639375304.jpg"
const weChatQrCode = "https://lgc-bucket.oss-cn-shenzhen.aliyuncs.com/weChat-qrcode.jpg"
@connect(
    state => state,
)
export default class SideBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hotArticlesList:[],
            articlesNum:null,
            visit:null
        }
    }
    componentDidMount() {
        axios.post('/blogInfo',{}).then( res =>{
            this.setState({
                visit:res.data.visit,
                articleNum:res.data.articleNum,
                hotArticlesList:res.data.hotArticlesList
            })
        })
    }
    componentDidUpdate() {

    }
    redirectToArticle(value,index){
        // console.log(value)
        // console.log(index)
        this.props.history.push(`/article/${value}`)
        // console.log(this.state.hotArticlesList[index].reading)
        // this.state.hotArticlesList[index].reading += 1
        // this.setState({
        //     hotArticlesList:this.state.hotArticlesList
        // })
    }
    render() {
        return (
            <div className="side-bar">
                <div className="personal-data">
                    <div className="cover">
                        <img src={Cover} alt=""/>
                    </div>
                    <div className="avatar">
                        <img src={Avatar} alt=""/>
                    </div>
                    <div className="nick-name">
                        <span>面朝诺坎普</span>
                    </div>
                    <div className="description">
                        <span>全栈搬运工.</span>
                    </div>
                    <div className="abstract">
                        <span style={{'marginRight':'10px'}}>文章 {this.state.articleNum}</span>|<span style={{'marginLeft':'10px'}}>访问 {this.state.visit}</span>
                    </div>
                </div>
                <div className="follow-me">
                    <div className="title">
                        FOLLOW ME
                    </div>
                    <div className="">
                        <ul>
                            <li>
                                <span>新浪微博</span>

                            </li>
                            <li><span><a href="https://github.com/Lawguancong" target="_blank">github</a></span></li>
                            <li>
                                <div className="weChatQrCode">
                                    <img src={weChatQrCode} alt=""/>
                                </div>
                                <span>weChat</span>
                            </li>
                            <li><span>qq</span></li>
                        </ul>
                    </div>
                </div>
                <div className="cloud-tags">
                    <div className="title">
                        云标签
                    </div>
                    <div className="tags-list">
                        <ul>
                            <li style={{backgroundColor:"rgb(135, 208, 104)"}}><span>koa2</span></li>
                            <li style={{backgroundColor:"rgb(254, 85, 0)"}}><span>ts</span></li>
                            <li style={{backgroundColor:"rgb(16, 142, 233)"}}><span>React</span></li>
                            <li style={{backgroundColor:"rgb(248, 167, 42)"}}><span>Linux</span></li>
                            <li style={{backgroundColor:"rgb(16, 142, 233)"}}><span>Redux</span></li>
                            <li style={{backgroundColor:"rgb(248, 167, 42)"}}><span>es6</span></li>
                        </ul>
                    </div>
                </div>
                <div className="hot-articles">
                    <div className="title">
                        热门文章
                    </div>
                    <div className="hot-articles-list">
                        <ul>
                            {this.state.hotArticlesList.map( (value,index) => {
                                return(
                                    <li key={value._id}><span onClick={() => this.redirectToArticle(`${value._id}`,index)}>{value.articleTitle} <i className="reading"></i></span></li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}