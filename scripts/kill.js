require("babel-register");
require("babel-polyfill");

const kill = require('kill-port');
const port = require('../src/server/config').server.port;
kill(port);
