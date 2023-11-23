// models/File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  filePath: { type: String, required: true },
  // Add any other fields you need for your file model
});

module.exports = mongoose.model('File', fileSchema);
