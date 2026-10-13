import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const server = http.createServer((req, res) => {
    fs.readFile('./public/index.html', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

const wss = new WebSocketServer({ server });

const broadcast = (data) => {
    const payload = JSON.stringify(data);

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(payload);
        }
    });
};

wss.on('connection', (socket, req) => {
    const username = new URL(req.url, "http://localhost").searchParams.get(
        "username"
    );
    broadcast({ "type": "system", "text": `${username} joined` })

    socket.on('message', (data) => {
        const { username, text } = JSON.parse(data);
        broadcast({ "type": "chat", username, text});
    });

    socket.on('close', () => {
        broadcast({ "type": "system", "text": `${username} left`});
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})