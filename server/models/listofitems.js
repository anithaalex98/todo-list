const mongoose = require('mongoose');


const ToDoAppSchema = new mongoose.Schema({
    // name -String
    // list of todo items - List of string
    // date created - date
    // starred - bool

    name: 
    {
        type:String
    },
    items:
    {
        type:Array
    },
    currdate:
    {
        type:String,
        required:true
    },
    starred:
    {
        type:Boolean
    }
});

//Getting instance the collection
const ToDoAppModel = mongoose.model('todolists', ToDoAppSchema);

module.exports = ToDoAppModel;