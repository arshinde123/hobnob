import http from 'http';

const requestHandler = (req, res) => {
    debugger;
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end("Hello World!");
};

const server = http.createServer(requestHandler);
server.listen(8080);

console.log("Server started listening on http://localhost:8080");