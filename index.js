"use strict";
let express = require("express");
let socket = require("socket.io");
let http = require("http");
let path = require("path");
let port = process.env.PORT || 8000;
let gifsApi = require("./gifsApi");


class Server {

    constructor() {

        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socket(this.server);
        this.api = new gifsApi();


        this.app.use(express.static(path.join(__dirname, "public")));

        this.app.get("/", (req, res)=> {
            res.sendfile(__dirname + "/index.html");
        });

        this.app.get("/mobile/047047", (req, res)=> {
            res.sendfile(__dirname + "/public/mobile/mobile.html");
        });

        this.app.get("/mobile/sms", (req, res)=> {
            res.sendfile(__dirname + "/public/mobile/sms.html");
        });


        this.server.listen(port, ()=> {
            console.log("listening on *:", port);
        });

        this.refreshAutoUpdateTimeout.call(this);

        this.io.on("connection", socket => {

            socket.on("init", callback => {
                callback(this.api.getData());
            });

            socket.on("update", (type, value)=> {

                let resetAuto = true;

                if (type == "images") {
                    this.api.setImages(value);
                } else if(type == "hiddenImages") {
                    this.api.setImages(value, true);
                    type = "images";
                }
                else if (type == "grid") {
                    this.api.setGrid(value);
                } else if (type == "effect") {
                    this.api.setEffect(value);
                } else if (type == "speed") {
                    this.api.setSpeed(value);
                } else if (type == "word") {
                    this.api.setWord(value);
                }

                socket.broadcast.emit("update", {type: type, data: this.api.getData()});

                if(resetAuto){
                    this.refreshAutoUpdateTimeout.call(this);
                }
            });

        });


    }

    autoUpdate() {

        let randomGridSize = Math.floor(Math.random()*10+5);
        let changeEffect = Math.random() > 0.85;

        this.api.setGrid(randomGridSize);
        this.api.setImages(null);

        this.io.emit("update",  {type: "grid", data: this.api.getData()});
        this.io.emit("update",  {type: "images", data: this.api.getData()});

        this.refreshAutoUpdateTimeout.call(this);
    }

    refreshAutoUpdateTimeout() {
        if (this.autoTimeout) {
            clearTimeout(this.autoTimeout);
        }
        this.autoTimeout = setTimeout(this.autoUpdate.bind(this), 20000);
    }


}

let server = new Server();
