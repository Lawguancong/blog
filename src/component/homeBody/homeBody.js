import './homeBody.css'

import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import TimestampConversion from '../timestampConversion/timestampConversion'


@connect(
    state => state,
)
export default class HomeBody extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            articleList: [],
        }

    }

    componentDidMount() {
        axios.post('/getArticleList', {}).then(res => {
            if (!res.data.length) {
                this.setState({
                    articleList: res.data.doc
                })
            }
        })
    }
    componentDidUpdate() {

    }

    render() {
        return (
            <div className="home-body">
                <div className="container">
                    <div className="articleList" >
                        {this.state.articleList.map(value => {
                            return (
                                <div className="articleListDetails" onClick={() => this.props.history.push('/article/'+value._id)} key={value._id}>
                                    <h3>【{value.articleType}】{value.articleTitle}</h3>
                                    <p><span><TimestampConversion publishTime={value.publishTime}/> </span><span> 标签：{value.articleTag} </span><span> 浏览：{value.reading}</span></p>
                                    <div className="abstract">{value.articleAbstract}</div>
                                    <span className="link-article">阅读全文>></span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}