/**
 * Created by Joh on 2016/10/12.
 */
var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-3');

//connect url
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, ' connection error'));
db.once('open', function () {
    //连接服务器成功
    console.log("connect to the server");
    //新建Dish实例
    Dishes.create({
        name: 'AAA',
        description: 'BBB',
        comments:[{
        rating: 3,
        comment: 'this is  insane',
        author: 'matt'}
    ]},  function (err ,dish) {
        if(err) throw err;
        console.log("dish created");
        console.log("Dishes:\n "+ dish);

        var id = dish._id;
        setTimeout(function () {
            /*查找ID获得数据库的数据，再先定义$set操作，再通过exec进行数据库操作*/
            Dishes.findByIdAndUpdate(id, {
                $set:{
                    description: 'Update the string'
                }
            }, {new: true}).exec(function (err, dish) {
                if(err) throw err;
                console.log("Updated dish ");
                console.log(dish);
        /*增加*/
                dish.comments.push({
                    rating: 5,
                    comment: 'getting a sinking feeling',
                    author: 'Carppod'
                });
 /*   保存dish*/
                dish.save(function (err, dish) {
                    if(err) throw err;
                    console.log("Update Comments ");
                    console.log(dish);

                 db.collection('dishes').drop(function () {
                     db.close();
                 });
                });
            });
        },2000);
    });

});