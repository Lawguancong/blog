import './article.css'

import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
// 引入编辑器以及EditorState子模块
// import BraftEditor, { EditorState } from 'braft-editor'
// 引入编辑器样式
// import 'braft-editor/dist/index.css'
import $ from 'jquery'
import TimestampConversion from "../../component/timestampConversion/timestampConversion";



@connect(
    state => state,
)
export default class Article extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            articleDetails: null,
            articleId: null
        }
    }
    componentWillMount (){

    }
    componentDidMount() {
        this.getArticle()
        console.log(this.props)
    }
    componentWillReceiveProps(){
        // return true
        // return false
    }

    shouldComponentUpdate(){

        // 是否重新渲染新的文章
        if(this.state.articleId === null){
            return true
        }else if(this.state.articleId === this.props.history.location.pathname.split("/")[2]){
            return false
        }else{
            this.getArticle()
            return true
        }
    }
    componentWillUpdate(){
    }
    componentDidUpdate() {
    }
    getArticle(){
        axios.post('/getArticle', {_id:this.props.match.params.id}).then(res => {
            if (!res.data.length) {
                this.setState({
                    articleDetails: res.data.doc,
                    articleId: res.data.doc._id
                })
                $("div.content").html(res.data.doc.content)
            }
        })
    }
    render() {
        return (
            <div className="article">
                {this.state.articleDetails === null ? null : (
                    <div className="article-details">
                        <h3>{this.state.articleDetails.articleTitle}</h3>
                        <p><span><TimestampConversion publishTime={this.state.articleDetails.publishTime}/> </span><span> 标签：{this.state.articleDetails.articleTag} </span><span> 浏览：{this.state.articleDetails.reading + 1}</span></p>
                        <div className="abstract">{this.state.articleDetails.articleAbstract}</div>
                        <div className="content"/>
                    </div>
                )}
            </div>
        )

    }

}