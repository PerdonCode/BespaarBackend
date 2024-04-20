const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  img: [{
    type: String,
    required: true,
  }],
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
  popularity: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('News', newsSchema);
