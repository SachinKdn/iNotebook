const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user:{
        // as a forign key
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
        // referenece to which model User
    },
    
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:String,
        default:Date.now
    }

  });
  const Note = mongoose.model('Note', noteSchema);
  module.exports = Note;