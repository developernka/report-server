const { json } = require('server/reply');
const { ObjectId } = require('mongodb');

exports.login = async ctx => {
  console.log(ctx.data);
  return await ctx.db
    .collection('users')
    .findOneAndUpdate(
      {
        username: ctx.data.username,
        password: ctx.data.password
      },
      {
        $set: {
          token: new ObjectId() + '$#$#$' + new ObjectId()
        }
      }
    )
    .then(res => {
      return json(res);
    });
};

exports.info = async ctx => {
  return json({ currentUser: {}, lastLogin: Date.now() });
};

exports.update = async ctx => {
  return await ctx.db
    .collection('users')
    .findOneAndUpdate(
      {
        username: ctx.data.username,
        password: ctx.data.password
      },
      {
        $set: {
          password: ctx.data.newpassword
        }
      }
    )
    .then(res => {
      return json(res);
    });
};
