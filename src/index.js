import http from 'http';

const requestHandler = (req, res) => {
    if(req.method === 'POST' && req.url === '/users') {
        res.writeHead(400, { 'content-type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Payload should not be empty'
        }));
        return;
    }
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end("Hello World!");
};

const server = http.createServer(requestHandler);
server.listen(8080);

console.log("Server started listening on http://localhost:8080");