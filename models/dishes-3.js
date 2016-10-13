/**
 * Created by Joh on 2016/10/12.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema
var commentSchema = new Schema({
    rating: {
        type:Number,
        min: 1,
        max: 5
    },
    comment:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
},{ timestamp: true});

//create a schema
var dishSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
/*    通过[]将comment包含*/
    comments:[commentSchema]
},{
    timestamp:true
});

//创建一个model
var Dishes = mongoose.model('Dish', dishSchema);

module.exports= Dishes;