const { Server } = require("socket.io");

const io = new Server(8000, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

let onlineUsers = [];

io.on("connection", (socket) => {
    console.log('A user connected', socket.id);

    // Add new user
    socket.on('addNewUser', (userId) => {
        if (userId !== null && !onlineUsers.some(user => user.userId === userId)) {
            onlineUsers.push({
                userId,
                socketId: socket.id
            });
            console.log(`User added: ${userId}, Socket ID: ${socket.id}`);
            io.emit("getOnlineUsers", onlineUsers);  // Emit updated online users list
        }
    });

    //add Message
    socket.on('sendMessage', (message) => {
        const user = onlineUsers?.find((user) => user?.userId === message?.recipientId)
        if (user) {
            io.to(user?.socketId).emit("getMessage", message);
        }

    })

    // Handle user disconnect
    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
        console.log('User disconnected', socket.id);
        io.emit("getOnlineUsers", onlineUsers);  // Emit updated online users list
        console.log('onlineUsers', onlineUsers);
    });
});

console.log('Socket.io server is running on port 8000');
