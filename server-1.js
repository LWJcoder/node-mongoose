/**
 * Created by Joh on 2016/10/12.
 */
var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1');

//connect url
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, ' connection error'));
db.once('open', function () {
    //连接服务器成功
    console.log("connect to the server");
    //新建Dish实例
    var newDish = Dishes({
        name:"zzz",
        description:"test"
    });

    //保存用户
    newDish.save(function (err) {
        if(err) throw err;
        console.log("dish created");
    });

    Dishes.find({},function (err, dishes) {
        if(err) throw err;
        //所有用户的对象
        console.log("Dishes:\n "+ dishes);

        db.connection("dishes").drop(function () {
            db.close();
        });
    });

});
