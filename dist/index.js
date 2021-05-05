"use strict";

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requestHandler = (req, res) => {
  if (req.method === 'POST' && req.url === '/users') {
    const payloadData = [];
    req.on('data', data => {
      payloadData.push(data);
    });
    req.on('end', () => {
      if (payloadData.length === 0) {
        res.writeHead(400, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
          message: 'Payload should not be empty'
        }));
        return;
      }

      if (req.headers['content-type'] !== 'application/json') {
        res.writeHead(415, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
          message: 'The "Content-Type" header must always be "application/json"'
        }));
        return;
      }

      try {
        const bodyString = Buffer.concat(payloadData).toString();
        JSON.parse(bodyString);
      } catch (e) {
        res.writeHead(400, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
          message: 'Payload should be in JSON format'
        }));
      }
    });
  } else {
    res.writeHead(200, {
      'content-type': 'text/plain'
    });
    res.end("Hello World!");
  }
};

const server = _http.default.createServer(requestHandler);

server.listen(8080);
console.log("Server started listening on http://localhost:8080");