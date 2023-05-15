const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agentModel = new Schema({
    Name:{
        type: String,
        required : true,
        trim: true
    },
    Address_1:{
        type: String,
        required : true,
        trim: true
    },
    Address_2:{
        type: String,
        required : false,
        trim: true
    },
    State:{
        type: String,
        required : true,
        trim: true
    },
    City:{
        type: String,
        required : true,
        trim: true
    },
    Phone_Number:{
        type: String,
        required : true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    clients: [{
        type: Schema.Types.ObjectId,
        ref: 'client',
      }] 
},{
  collection:"Agency",
  timestamps:true
});

module.exports = mongoose.model('Agency', agentModel);