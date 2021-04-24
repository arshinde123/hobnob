"use strict";

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requestHandler = (req, res) => {
  debugger;
  res.writeHead(200, {
    'content-type': 'text/plain'
  });
  res.end("Hello World!");
};

const server = _http.default.createServer(requestHandler);

server.listen(8080);
console.log("Server started listening on http://localhost:8080");