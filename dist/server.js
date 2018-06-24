'use strict';

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes.conf');

var _routes2 = _interopRequireDefault(_routes);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 4040;

var app = (0, _express2.default)();
var router = _express2.default.Router();

_model2.default.setupConfig({
  RAPIDPRO_CHANNEL_TOKEN: '5c2e7bc6-a96b-44fb-a95c-09863cdff4cf',
  COUCHDB_URL: 'http://admin:admin@localhost:5984/set',
  USSD_CODES: ['*35131*22#']
});

_routes2.default.init(app);
_router2.default.init(router);
app.use('/', router);

// log exceptions without halting system
process.on('uncaughtException', function (err) {
  console.log(err);
});

_http2.default.createServer(app).listen(PORT, function () {
  console.log('up and running @: ' + _os2.default.hostname() + ' on port: ' + PORT);
});