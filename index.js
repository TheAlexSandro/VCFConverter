require('dotenv').config()
const { bot } = require('./callback.js')

/**
 * WEBHOOK DEPLOYMENT
 */
/*module.exports = async (req, res) => {
    await bot.handleUpdate(JSON.parse(req.body))
    return { statusCode: 200 }
}*/

/**
 * LONG POLLING DEPLOYMENT
 */
const http = require('http');
const express = require('express')
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on(`connected`, (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

bot.launch({ dropPendingUpdates: true })
bot.telegram.sendMessage(process.env['ADMIN_BOT'], `<b>Bot menyala!</b>\nSemua proses dibatalkan.`, { parse_mode: 'HTML' })

const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});