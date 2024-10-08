const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodeSubmissionSchema = new Schema({
  language: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CodeSubmission', CodeSubmissionSchema);
