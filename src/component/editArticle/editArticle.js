import React from 'react'
import {connect} from 'react-redux'
// 引入编辑器以及EditorState子模块
import BraftEditor, {EditorState} from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import {Button} from 'antd';
import axios from 'axios'
import {Layout, Menu, Breadcrumb, Icon, Pagination, Table, Divider, Tag} from 'antd';

@connect(
    state => state,
)
export default class EditArticle extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tagsColor:['red','blue','green','orange']
        }
    }

    componentDidMount() {
        axios.post('/getArticleList', {}).then(res => {
            if (!res.data.length) {
                // console.log(res.data.doc)
                // console.log(EditorState.createFrom(res.data.doc))
                this.setState({
                    // editorState: EditorState.createFrom(res.data.doc)，
                    data: res.data.doc

                })
            }
        })
    }

    componentDidUpdate() {
    }

    render() {
        const columns = [{
            title: '文章类型',
            dataIndex: 'articleType',
            key: 'articleType',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '文章标题',
            dataIndex: 'articleTitle',
            key: 'articleTitle',
        }, {
            title: '标签',
            dataIndex: 'articleTag',
            key: 'articleTag',
            render: articleTag => (
                <span>
                  {articleTag.map(tag => <Tag color={this.state.tagsColor[Math.floor(Math.random() * this.state.tagsColor.length)]} key={tag}>{tag}</Tag>)}
                </span>
            )
        }, {
            title: '分类',
            dataIndex: 'articleClassification',
            key: 'articleClassification',
        }, {
            title: '发表时间',
            dataIndex: 'publishTime',
            key: 'publishTime',
        }, {
            title: '阅读量',
            dataIndex: 'reading',
            key: 'reading',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                  <a href="javascript:;">编辑 {record.name}</a>
                  <Divider type="vertical"/>
                  <a href="javascript:;">删除</a>
                </span>
            ),
        }];

        return (

            <div className="my-component">
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>文章</Breadcrumb.Item>
                    <Breadcrumb.Item>文章管理</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <Table columns={columns} dataSource={this.state.data}/>
                </div>
                <Pagination size="small" total={50} showSizeChanger showQuickJumper/>
            </div>
        )

    }

}