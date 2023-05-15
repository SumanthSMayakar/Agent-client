const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientModel = new Schema({
  agencyId: {
    type: Schema.Types.ObjectId,
    ref: 'Agency',
    required: true
  },
  Client_Id:{
    type: Number,
    required : true,
    trim: true
},
Name:{
    type: String,
    required : true,
    trim: true
},
email:{
    type: String,
    required : true,
    trim: true
},
Total_bill:{
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
}
},{
  collection:"client",
  timestamps:true
});

module.exports = mongoose.model('client', clientModel);