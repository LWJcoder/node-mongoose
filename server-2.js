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
     Dishes.create({
        name:"zzz",
        description:"test"
    },function (err, dish) {
         if(err) throw err;
         console.log("dish created");
         console.log("Dishes:\n "+ dish);

         var id = dish._id;

         //获得全部dish
         setTimeout(function () {
             Dishes.findByIdAndUpdate(id, {
                 $set:{
                     description: "update test"
                 }
             },{
                 new: true
             }).exec(function (err, dish) {
                 if(err) throw err;
                 console.log(dish);
                 console.log("update dish");

                 db.collection('dishes').drop(function () {
                     db.close();
                 });
             });
         }, 2000);
     });
    });

