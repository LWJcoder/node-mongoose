/**
 * Created by Joh on 2016/10/12.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    }
},{
    timestamp:true
});

//create a model
var Dishes = mongoose.model('Dish', dishSchema);
module.exports = Dishes;