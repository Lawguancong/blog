const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const database = require('./database')
const path = require('path')
const Blog = database.getModel('blog')
const User = database.getModel('user')
const Article = database.getModel('article')
const app = express()
const server = require('http').Server(app)




// import express from 'express'
// import bodyParser from 'body-parser'
// import cookieParser from 'cookie-parser'
// import database from './database'
// import path from 'path'
// const User = database.getModel('user')
// const Article = database.getModel('article')
// const app = express()
// const server = require('http').Server(app)




app.use(bodyParser.json({limit:'30mb'}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
app.use(bodyParser.json())
app.use(cookieParser())


app.use(function (req, res, next) {
    if(req.url.startsWith('/')){
        // console.log(1)
        return next()
    }
    console.log(path.resolve('build/index.html'))
    return res.sendFile(path.resolve('build/index.html'))
})
app.use('/',express.static(path.resolve('build')))
app.use('/admin',express.static(path.resolve('build')))



server.listen(9093, function () {
    console.log('Node app:"server" start at port 9093')
})

//发表文章
app.post('/publishArticle', function (req, res) {
    const {articleTitle, articleTag, articleType, articleClassification, articleAbstract, content, publishTime, editorState, rawString, rawJSON} = req.body
    const articleModel = new Article({
        articleTitle,
        articleTag,
        articleType,
        articleClassification,
        articleAbstract,
        content,
        publishTime,
        editorState,
        rawString,
        rawJSON,
    })
    articleModel.save(function (errSave, docSave) {
        if (errSave) {
            console.log(docSave)
            return res.json({code: 0, msg: '文章发表失败'})
        }
        return res.json({code: 1, msg: '文章发表成功'})
    })
})
//获取文章列表
app.post('/getArticleList', function (req, res) {
    Article.find(
        {},
        'articleAbstract articleClassification articleTag articleTitle articleType publishTime reading content')
        .sort({publishTime:'-1'})
        .limit().exec(function (err, doc){
            return res.json({doc}
        )}
    )
})

// 博客首页
app.post('/blogInfo',function (req, res) {
    let data = {}
    async function asyncAwaitFn1() {
        return await new Promise((resolve, reject) => {
            Blog.find({}).exec(function (e, d) {
                if(!d.length){
                    const BlogModel = new Blog({})
                    BlogModel.save()
                    Object.assign(data,{code: 1, msg: '自增博客访问量成功', visit: d.visit})
                    resolve()
                }else{
                    Blog.findOneAndUpdate({},{$inc:{visit:1}},function (err, doc) {
                        Object.assign(data,{code: 1, msg: '自增博客访问量成功', visit: doc.visit})
                        resolve()
                    })
                }
            })
        })
    }
    async function asyncAwaitFn2() {
        return await new Promise((resolve, reject) => {
            Article.find({},).sort({publishTime:'-1'}).limit().exec(function (err, doc){
                Object.assign(data,{articleNum:doc.length})
                resolve()
            })
        })
    }
    async function asyncAwaitFn3() {
        return await new Promise((resolve, reject) => {
            Article.find({},'articleTitle _id reading').sort({reading:'-1'}).limit(10).exec(function (err, doc){
                Object.assign(data,{hotArticlesList:doc})
                resolve()
            })
        })
    }
    const parallelFn = async () => { //并行执行
        const parallelOne = asyncAwaitFn1();
        const parallelTwo = asyncAwaitFn2();
        const parallelThree = asyncAwaitFn3();
        await parallelOne
        await parallelTwo
        await parallelThree
        return res.json(data)
    }
    parallelFn()





})



//获取一篇文章
app.post('/getArticle', function (req, res) {

    let data = {}
    async function asyncAwaitFn1() {
        return await new Promise((resolve, reject) => {
            const {_id} = req.body
            Article.findOne(
                {_id},
                'articleAbstract articleClassification articleTag articleTitle articleType publishTime reading content',
                function (err, doc) {
                    // return res.json(doc)
                    Object.assign(data,{doc})
                    resolve()
                })
        })
    }
    async function asyncAwaitFn2() {
        return await new Promise((resolve, reject) => {
            const {_id} = req.body
            Article.findOneAndUpdate({_id},{$inc:{reading:1}},function (err, doc) {
                Object.assign(data,{code:1,msg:'自增文章浏览量成功'})
                resolve()
            })
        })
    }
    const parallelFn = async () => { //并行执行
        const parallelOne = asyncAwaitFn1();
        const parallelTwo = asyncAwaitFn2();
        await parallelOne
        await parallelTwo
        return res.json(data)
    }
    parallelFn()
})









