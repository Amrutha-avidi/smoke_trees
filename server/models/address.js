const mongoose = require('mongoose');

// Define Address Schema
const AddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique:true
  },
  
  addresses: [{ // Array of addresses
    type: String,required: true
  }]
});

// Create and export the Address model
const AddressModel = mongoose.model('Address', AddressSchema);
module.exports = AddressModel;
