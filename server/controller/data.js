const Data = require('../model/data');

exports.list = async (req, res) => {
  const Model = Data(req.params.collection);
  res.json(await Model.find());
};

exports.read = async (req, res) => {
  const Model = Data(req.params.collection);
  res.json(
    await Model.findById(req.params.id).catch(err => {
      return err;
    })
  );
};

exports.create = async (req, res) => {
  const Model = Data(req.params.collection);
  var model = new Model(req.body);
  res.json(await model.save());
};

exports.update = async (req, res) => {
  const Model = Data(req.params.collection);
  var update = { $set: {} };
  for (var k in req.body.data) {
    update.$set['data.' + k] = req.body.data[k];
  }
  res.json(
    await Model.findByIdAndUpdate(req.params.id, update).catch(err => {
      return err;
    })
  );
};

exports.trash = async (req, res) => {
  const Model = Data(req.params.collection);
  var update = { $set: { trash: { at: new Date() } } };
  res.json(
    await Model.findByIdAndUpdate(req.params.id, update).catch(err => {
      return err;
    })
  );
};
