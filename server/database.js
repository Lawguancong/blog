//连接mongodb
const serverIp = "localhost"//127.0.0.1
const porjectName = 'blog'
const mongoose = require('mongoose')
const DB_URL = 'mongodb://'+serverIp+':27017/' + porjectName
mongoose.connect(DB_URL,{ useNewUrlParser: true })
mongoose.connection.on('connected',function () {
    console.log('mongodb:"'+ porjectName +'" connect success')
})

// 数据库模型建立
const models = {
    blog:{
        'visit':{type:Number,'require':true,default: 0},//博客访问量
    },
    user:{
        'user':{type:String,'require':true},
        'password':{type:String,'require':true},
    },
    article:{
        'articleType':{type:String,'require':true},
        'articleTitle':{type:String,'require':true},
        'articleTag':{type:Array,'require':true},
        'articleClassification':{type:Array,'require':true},
        'articleAbstract':{type:String,'require':true},
        'content':{type:String,'require':true},
        'publishTime':{type:Number,'require':true},
        'reading':{type:Number,'require':true,default:0},
        'editorState':{type:JSON,'require':true},
        'rawString':{type:String,'require':true},
        'rawJSON':{type:JSON,'require':true},
    },
}
// 实例化模式
for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports = {
    getModel : function (name) {
        return mongoose.model(name)
    }
}