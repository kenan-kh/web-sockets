const express =require('express');
const app=express();
const path=require('path')
const { Server } = require('socket.io');
const http =require('http');

const server= http.createServer(app)
const io =new Server(server)
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'))
})


io.on('connection', (socket) => {
socket.on("chat message",(msg)=>{
  io.emit("all user",msg)
})
    socket.on('typing',()=>{
      socket.broadcast.emit('show_typing')
    })
    socket.on('stop_writing',()=>{
      socket.broadcast.emit('not show typing')
    })
  });

server.listen(4000,()=>{
  console.log("listen to port 4000")
})
