const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

const MAX_USERS = 10; // الحد الأقصى للمستخدمين
let connectedUsers = new Map(); // لتخزين المستخدمين المتصلين

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('new user', (username) => {
        if (connectedUsers.size >= MAX_USERS) {
            socket.emit('login failed', 'عذراً، الغرفة ممتلئة');
            socket.disconnect();
            return;
        }
        
        if ([...connectedUsers.values()].includes(username)) {
            socket.emit('login failed', 'هذا الاسم مستخدم بالفعل');
            return;
        }

        connectedUsers.set(socket.id, username);
        socket.emit('login success', username);
        io.emit('user list', [...connectedUsers.values()]);
        io.emit('chat message', `${username} انضم إلى المحادثة`);
    });

    socket.on('chat message', (msg) => {
        const username = connectedUsers.get(socket.id);
        if (username) {
            io.emit('chat message', `${username}: ${msg}`);
        }
    });

    socket.on('disconnect', () => {
        const username = connectedUsers.get(socket.id);
        if (username) {
            io.emit('chat message', `${username} غادر المحادثة`);
            connectedUsers.delete(socket.id);
            io.emit('user list', [...connectedUsers.values()]);
        }
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});