"use strict";

/*global VisualView
 global VisualEffects
 global gifObj*/

class gifVisual {

    constructor(view, effects) {

        this.view = view;
        this.effects = effects;
        this.allImages = [];
        this.images = [];
        this.visual = window;
        this.firstIndex = 0;
        this.word = "TRAP";
        this.io = null;


        this.index = 0;

        this.mainElement = this.visual.document.querySelector(".wrapper-main");
        this.initEvents.call(this, view);
        this.getImages.call(this);
        this.initSockets.call(this);

        //setInterval(this.switchRandom.bind(this), 3000);
        window.addEventListener("keypress", this.onKey.bind(this));

    }

    initSockets() {

        this.io = io ? io() : null;
        if(this.io == null){
            return false;
        }

        this.io.on('connect', ()=> {
            this.io.emit("init", {type: "controller"});
            this.io.on("update", data => this.onUpdate.call(this, data));
        });


    }

    onUpdate(update) {

        if (update.type == "images") {
            this.getImages.call(this);
        } else if (update.type == "grid") {
            this.view.initGrid.call(this.view, null, parseInt(update.value));
        }else if(update.type == "effect"){
            this.effects.applyEffectType(update.value);
        }else if(update.type == "speed"){
            this.effects.changeSpeed(parseFloat(update.value));
        }else if(update.type == "word"){
            this.changeWord(update.value);
        }
    }

    changeWord(word) {

        let header = document.querySelector("#header-title");
        header.innerHTML = word;
        if(word.length){
            header.classList.remove("hidden");
        }else {
            header.classList.add("hidden");
        }

    }

    initEvents(view) {

        let timeout = null;

        ['orientationchange', 'resize'].forEach(event => window.addEventListener(event, () => {

            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                this.view.initGrid.call(this.view, this.images);
                timeout = null;

            }, 60);

        }));

        view.onUpdate = (settings) => {
            this.effects.updateElements(settings);
        };


    }

    getImages(index) {


        index = index ? index : Math.floor(Math.random() * gifObj.length);

        if (this.index == index) {
            this.index++;
            if (this.index == gifObj.length) {
                this.index = 0;
            }
        } else {
            this.index = index;
        }

        let gifs = gifObj[index].list;
        let gifsRoot = gifObj[index].root;

        this.images = [];

        for (var i = 0; i < gifs.length; i++) {
            this.images.push(gifsRoot + gifs[i]);
            helpers.shuffle(this.images);
        }

        this.view.initGrid.call(this.view, this.images);
    }

    onKey(e) {
        var key = e.key;
        if (key > 0) {
            this.view.initGrid.call(this.view, null, parseInt(key));
            return false;
        }

        let elements = document.querySelectorAll(".gif");

        switch (key) {
            case "q":
                this.effects.applyEffect(0);
                break;
            case "w":
                this.effects.applyEffect(1);
                break;
            case "e":
                this.effects.applyEffect(2);
                break;
            case "r":
                this.effects.applyEffect(3);
                break;
            case "t":
                this.effects.applyEffect(4);
                break;
            case "a":
                this.getImages.call(this);
                break;
            case "s":
                let header = document.querySelector("#header");
                header.classList.toggle("hidden");
            default:
                break;
        }
    }

}

window.onload = () => {

    let view = new VisualView(document.querySelector(".wrapper-main"));
    let effects = new VisualEffects(view);
    let controller = new gifVisual(view, effects);

    var socket = io.connect('http://localhost:3000');


};
