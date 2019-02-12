const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    token: {
      type: String
    },
    token_expiry: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
