import React from 'react'
import {connect} from 'react-redux'
// 引入编辑器以及EditorState子模块
import BraftEditor, { EditorState } from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import { Button } from 'antd';
import axios from 'axios'
import { Input, Col, Select, InputNumber, DatePicker, AutoComplete, Cascader, Layout, Menu, Breadcrumb, Icon,message } from 'antd';
@connect(
    state => state,
)
export default class PublishArticle extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            articleType:'原创',
            editorState: null,
            articleTag: []

    }
        this.handlePublishArticle = this.handlePublishArticle.bind(this)
        // this.handleChangeArticleTitle = this.handleChangeArticleTitle.bind(this)
    }
    componentDidMount(){
        // axios.post('/getArticle',{}).then( res => {
        //     console.log(res.data)
        //     if(res.data.length !== 0){
        //         console.log(res)
        //         console.log(EditorState.createFrom(res.data.doc[1].content))
        //         this.setState({
        //             editorState: EditorState.createFrom(res.data.doc[1].content)
        //         })
        //     }
        // })
    }
    componentDidUpdate(){
    }
    async componentDidMount () {
        // 假设此处从服务端获取html格式的编辑器内容
        // const htmlContent = await fetchEditorContent()
        // 使用EditorState.createFrom将html字符串转换为编辑器需要的editorState数据
        // this.setState({
        //     editorState: EditorState.createFrom(htmlContent)
        // })
    }

    async handleSaveArticle () {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        // const htmlContent = this.state.editorState.toHTML()
        // const result = await saveEditorContent(htmlContent)
    }
    handleChange = (value,key) => {
        this.setState({
            [key]:value
        });
    }
    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }
    handlePublishArticle = (e) => {
        e.preventDefault();
        axios.post('/publishArticle',{
            ...this.state,
            rawString  :this.state.editorState.toRAW(),
            rawJSON :this.state.editorState.toRAW(true),
            content:this.state.editorState.toHTML(),
            publishTime:new Date().getTime(),
        }).then( res => {
            // console.log(res)
            if(res.status === 200 && res.data.code === 1 && res.data.msg === '文章发表成功'){
                message.success('文章发表成功');
                this.props.history.push('/admin/edit-article')
            }else{
                message.error('文章发表失败');
            }
        })
    }
    render () {
        const InputGroup = Input.Group;
        const Option = Select.Option;
        return (
            <div className="my-component">
                <div>
                    <InputGroup compact>
                        文章标题：
                        <Select
                            defaultValue={this.state.articleType}
                            onChange={value => this.handleChange(value,'articleType')}
                        >
                            <Option value="原创">原创</Option>
                            <Option value="转载">转载</Option>
                        </Select>
                        <AutoComplete
                            style={{ width: 300 }}
                            onChange={value => this.handleChange(value,'articleTitle')}
                            placeholder="请填写文章标题"
                        />
                        文章标签：
                        <Select
                            mode="tags"
                            style={{ width: 200 }}
                            placeholder="请填写文章标签"
                            onChange={value => this.handleChange(value,'articleTag')}
                        >
                        </Select>
                        文章类型：
                        <Select
                            style={{ width: 115 }}
                            defaultValue="请选择类型"
                            onChange={value => this.handleChange(value,'articleClassification')}
                        >
                            <Option value="typescript">typescript</Option>
                            <Option value="javascript">javascript</Option>
                            <Option value="react">react</Option>
                            <Option value="node.js">node.js</Option>
                            <Option value="css">css</Option>
                        </Select>
                        文章摘要：
                        <AutoComplete
                            style={{ width: 300 }}
                            onChange={value => this.handleChange(value,'articleAbstract')}
                            placeholder="请填写文章摘要"
                        />
                        <Button type="primary" htmlType="submit" className="" onClick={this.handlePublishArticle}>发表文章</Button>
                    </InputGroup>
                    <BraftEditor
                        value={this.state.editorState}
                        onChange={this.handleEditorChange}
                        onSave={this.handleSaveArticle}
                    />
                </div>

            </div>
        )

    }

}