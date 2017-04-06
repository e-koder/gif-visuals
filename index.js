"use strict";
let express = require('express');
let socket = require('socket.io');
let http = require('http');
let path = require('path');
let port = process.env.PORT || 8000


class Server {

    constructor(){

        this.app = express();
        this.server =  http.createServer(this.app);
        this.io = socket(this.server);

        //this.app.use(express.static('public'));
        this.app.use(express.static(path.join(__dirname, 'public')))


        this.app.get('/', function(req, res){
            res.sendfile(__dirname + '/index.html');
        });

        this.app.get('/mobile', function(req, res){
            res.sendfile(__dirname + '/public/mobile/mobile.html');
        });


        this.server.listen(port, function(){
            console.log('listening on *:', port);
        });

        this.io.on('connection', function(socket){

            socket.on("init", (data)=>{
                console.log(data);
            });

            socket.on("update", data => {
                socket.broadcast.emit("update", data);
            })
        });


    }

    initSockets(){


    }

}

let server = new Server();
