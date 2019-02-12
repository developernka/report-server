const { get, post, put, del, error } = require('server/router');
const { json } = require('server/reply');

const user = require('./userController');
const ctrl = require('./apiController');
const startTime = Date.now();

module.exports = [
  get('/api', ctx =>
    json({
      error: false,
      msg: 'Api running.',
      started_at: startTime,
      uptime: Date.now() - startTime
    })
  ),

  //Auth
  //get('/token', ctx => ctx.req.csrfToken()),
  get('/user', user.info),
  post('/user', user.login),
  put('/user', user.update),

  //Api
  get('/api/:collection', ctrl.list),
  get('/api/:collection/:id', ctrl.read),

  post('/api/:collection', ctrl.create),
  post('/api/:collection/:id', ctrl.update),

  // del("/api/:collection", ctrl.drop),
  del('/api/:collection/:id', ctrl.trash),

  //Error Handler
  get('/**', ctx => json({ msg: 'Invalid path format' })),
  error(ctx => json(ctx.error))
];
