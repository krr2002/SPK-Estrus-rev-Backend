const mongoose = require('mongoose');

const ParameterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  values: [String]
});

module.exports = mongoose.model('Parameter', ParameterSchema);
