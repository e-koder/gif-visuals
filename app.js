
let express = require('express');
let socket = require('socket.io');
let http = require('http');
let path = require('path');


class Server {

    constructor(){

        this.app = express();
        this.http = http.Server(this.app);
        this.io = socket(this.http);

        //this.app.use(express.static('public'));
        this.app.use(express.static(path.join(__dirname, 'public')))


        this.app.get('/', function(req, res){
            res.sendfile(__dirname + '/index.html');
        });

        this.app.get('/mobile', function(req, res){
            res.sendfile(__dirname + '/public/mobile/mobile.html');
        });

        this.io.on('connection', function(socket){
            console.log('a user connected');
        });


        this.app.listen(3000, function(){
            console.log('listening on *:3000');
        });
    }

}

let server = new Server();
