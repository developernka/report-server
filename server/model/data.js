const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DataSchema = new Schema(
  {
    data: {
      type: JSON,
      required: true
    },
    trash: {
      type: JSON
    }
  },
  { timestamps: true, strict: false }
);

module.exports = model => {
  return mongoose.model(model, DataSchema);
};
