"use strict";

/*global VisualView
global VisualEffects
global gifObj*/

class gifVisual {

    constructor(view, effects) {

        this.view = view;
        this.effects = effects;
        this.hue = 0;
        this.invert = 0;
        this.blinker = null;
        this.allImages = [];
        this.images = [];
        this.visual = window;
        this.firstIndex = 0;
        
        this.index = 0;

        this.mainElement = this.visual.document.querySelector(".wrapper-main");
        this.initControls.call(this, effects);
        this.initEvents.call(this, view);
        this.getImages.call(this);
        
        setInterval(()=>{
            this.changeColor.call(this)
        },2000);

        //setInterval(this.switchRandom.bind(this), 3000);
        window.addEventListener("keypress", this.onKey.bind(this));
    }

    initControls(effects) {
        // $("#control-random").click(this.switchRandom.bind(this));
        /*$("#control-switch").click(this.mapImages.bind(this, parseInt(4)));
        $("#control-roll").click(()=>{
            let elements = document.querySelectorAll(".gif");
            effects.applyEffect(elements, "colorRoll")
        });
        $("#control-zoom").click(()=>{
            let elements = document.querySelectorAll(".gif");
            effects.applyEffect(elements, "zoomRoll")
        });*/


        document.querySelector("#header").addEventListener("click",e => {
            this.switchBlinker.call(this);
        })
        /*document.addEventListener("touchstart", e => {
            this.switchBlinker.call(this, true);
        });

        document.addEventListener("touchend", e => {
            this.switchBlinker.call(this, false);
        });*/
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
            console.log(settings);
            this.effects.updateElements(settings);
        };


    }

    getImages(index) {
        
        
        index = index ? index : Math.floor(Math.random()*gifObj.length);
        
        if(this.index == index){
            this.index++;
            if(this.index == gifObj.length){
                this.index = 0;
            }
        }else {
            this.index = index;
        }

        let gifs = gifObj[index].list;
        let gifsRoot = gifObj[index].root;

        this.images = [];

        for (var i = 0; i < gifs.length; i++) {
            this.images.push(gifsRoot + gifs[i]);
        }

        this.view.initGrid.call(this.view, this.images);
    }


    switchBlinker(force) {

        force = force == null ? true : force;

        if (this.blinker) {
            clearInterval(this.blinker);
            this.blinker = false;
            this.invert = 0;
            this.setStyle.call(this);
        }
        else if (force) {
            clearInterval(this.blinker);
            this.invertColor.call(this);
            this.blinker = setInterval(this.invertColor.bind(this), 100);
        } 
    }

    changeColor() {
        this.hue += 60;
        this.setStyle.call(this);
    }

    invertColor() {
        this.invert = this.invert == 0 ? 1 : 0;
        this.setStyle.call(this);
    }

    setStyle() {

        var filter = "blur(2px)";
        filter += "hue-rotate(" + this.hue + "deg)";
        filter += "invert(" + this.invert * 100 + "%)";

        this.mainElement.style.filter = filter;
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
                this.switchBlinker.call(this);
                break;
            case "w":
                this.effects.applyEffect("colorEffect");
                break;
            case "e":
                this.effects.applyEffect("zoomEffect");
                break;
            case "r":
                this.effects.applyEffect("moveEffect");
                break;
            case "t":
                this.effects.applyEffect("flipEffect");
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


};
