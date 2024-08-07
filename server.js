var express = require("express")
const {createServer} = require("http");
const {Server} = require("socket.io")

var app = express();
var server = createServer(app);
const io = new Server(server);


app.use(express.static(__dirname+"/public"))

var score = {
    IND: 0,
    PAK: 0
}

io.on("connection",(socket)=>{
    console.log("new socket connection established",socket.id)
    io.emit("message",score)
})

app.get("/inc/:country",(req,res)=>{
    score[req.params.country]++;
    io.emit("message",score)
})

// app.get("/sendall/:msg",(req,res)=>{
//     console.log("admin sent ",req.params.msg)
//     io.emit("message",req.params.msg)
// })



server.listen(4000,()=>{
    console.log("server is running on port 4000")
})