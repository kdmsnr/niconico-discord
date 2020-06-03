// Server
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;
io.on('connection', function (socket) {
  socket.on('message', function (msg) {
    io.emit('message', msg);
  });
});

http.listen(PORT, function () {
  console.log('server listening. Port:' + PORT);
});


// Discord
const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.SECRET;
client.on('ready', () => {
  console.log('ready...');
});

client.on('message', message =>{
  if (message.author.bot) {
    return; // 自分の発言は無視
  }
  if (!message.channel.name.match(/realtime-/)) {
    return; // realtime-xxx のときだけ反応
  }

  // logic
  console.log(message.content);
  io.emit('message', message.content);
  return;
});
client.login(token);
