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

        //this.getImages.call(this);
        this.initSockets.call(this);
        this.initEvents.call(this, this.view);

        //setInterval(this.switchRandom.bind(this), 3000);
        window.addEventListener("keypress", this.onKey.bind(this));

    }

    initSockets() {

        this.io = io ? io() : null;
        if (this.io == null) {
            return false;
        }

        this.io.on("connect", ()=> {
            this.io.emit("init", data => this.init.call(this, data));
            this.io.on("update", data => this.onUpdate.call(this, data));
        });


    }

    init(data){

        this.loadImages.call(this, data.images);
        this.changeWord(data.word);
        this.view.initGrid.call(this.view, null, data.grid);
        this.effects.applyEffectType(data.effect);
        this.effects.changeSpeed(data.speed);

    }

    loadImages(images){

        this.images = images;
        helpers.shuffle(this.images);

        this.view.initGrid.call(this.view, this.images);
    }

    initEvents(view) {

        let timeout = null;

        ["orientationchange", "resize"].forEach(event => window.addEventListener(event, () => {

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

    onUpdate(update) {

        let data = update.data;
        let type= update.type;

        if (type == "images") {
            this.loadImages.call(this, data.images);
        } else if (type == "grid") {
            this.view.initGrid.call(this.view, null, data.grid);
        } else if (type == "effect") {
            this.effects.applyEffectType(data.effect);
        } else if (type == "speed") {
            this.effects.changeSpeed(data.speed);
        } else if (type == "word") {
            this.changeWord(data.word);
        }

    }

    changeWord(word) {

        let header = document.querySelector("#header-title");
        header.innerHTML = word;
        if (word.length) {
            header.classList.remove("hidden");
        } else {
            header.classList.add("hidden");
        }

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
                //this.getImages.call(this);
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

};
