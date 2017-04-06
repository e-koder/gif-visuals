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
        
        this.index = 0;

        this.mainElement = this.visual.document.querySelector(".wrapper-main");
        this.initControls.call(this, effects);
        this.initEvents.call(this, view);
        this.getImages.call(this);

        //setInterval(this.switchRandom.bind(this), 3000);
        window.addEventListener("keypress", this.onKey.bind(this));

        this.clickEffect = setInterval(()=>{
            this.changeTitle();
        }, 500);
    }

    changeTitle(word){
        let title = document.querySelector("#header-title");
        if(this.word=="TRAP"){
            this.word = "CLICK";
        }else {
            this.word = "TRAP";
        }
        if(word){
            this.word = word;
        }
        title.innerHTML = this.word+" DA FUCK UP"

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
            //this.switchBlinker.call(this);

            this.effects.nextEffect();
            let effect = this.effects.effect;
            clearInterval(this.clickEffect);
            this.changeTitle(effect.desc);

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
        
        
        index = index ? index : 0;//Math.floor(Math.random()*gifObj.length);
        
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


};
