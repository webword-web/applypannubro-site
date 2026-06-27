const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Replied'],
    default: 'Pending',
  },
}, {
  timestamps: true,
});

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
