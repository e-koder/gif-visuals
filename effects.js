"use strict";

const effectsDef = {
    colorEffect: "colorEffect",
    zoomEffect: "zoomEffect",
    moveEffect: "moveEffect",
    flipEffect: "flipEffect"
};

class VisualEffects {


    constructor() {
        this.effects = [];
        this.elements = [];
        this.frame = 0;
        this.interval = null;
        this.settings = null;

        const defaultEffect = effectsDef.colorEffect;

        this.applyEffect = (type) => {
            this.initEffect.call(this, type);
        };

        this.updateElements = (settings) => {

            this.elements = settings.elements;
            this.settings = settings;
            this.initEffect.call(this, defaultEffect);
            this.frame = 0;
        }

    }

    setTiming(ms) {

        if (this.interval) {
            clearInterval(this.interval);
        }

        this.onFrame.call(this);

        this.interval = setInterval(() => {
            this.onFrame.call(this);
        }, ms);
    }
    
     initEffect(type) {

        let elements = this.elements;
        this.effects = [type];


        let len = elements.length;
        let time = 150;

        switch (type) {
            case effectsDef.colorEffect:
                time = 130;
                if (len < 20) {
                    time = 150;
                }
                break;
            case effectsDef.zoomEffect:
                time = 1600;
                break;
            case effectsDef.moveEffect:
                time = 1300;
                break;
            case effectsDef.flipEffect:
                time = 500;
                break;
        }

        for (let i = 0; i < elements.length; i++) {

            let element = elements[i];
            this.resetClasses(element);

            element.classList.add("effect", type);

        }


        this.setTiming.call(this, time);

    }

    onFrame() {

        let frame = this.frame;
        let elements = this.elements;
        let effects = this.effects;

        for (let i = 0; i < effects.length; i++) {
            let type = effects[i];

            switch (type) {
                case effectsDef.colorEffect:
                    this.colorEffect(elements, frame);
                    break;
                case effectsDef.zoomEffect:
                    this.zoomEffect(elements, frame);
                    break;
                case effectsDef.moveEffect:
                    this.moveEffect(elements, frame);
                    break;
                case effectsDef.flipEffect:
                    this.flipEffect(elements, frame);
                    break;
                default:
                    break;
            }
        }

        this.frame++;
        if (this.frame >= elements.length) {
            this.frame = 0;
        }

    }

    resetClasses(element) {
        element.classList.remove("effect");
        element.classList.remove("zoomEffect");
        element.classList.remove("colorEffect");
        element.classList.remove("moveEffect");
        element.classList.remove("active");
    }


    colorEffect(elements, frame) {

        let len = elements.length;

        for (let i = 0; i < len; i++) {

            let element = elements[i];
            let range = Math.floor(len / 5);

            let lastFrame = frame + range;
            let prevFrame = frame - range;

            if ((i >= prevFrame && i <= lastFrame) ||
                (lastFrame >= len && i <= lastFrame - len) ||
                (prevFrame < 0 && i >= len + prevFrame)) {
                element.classList.add("active");
            }
            else {
                element.classList.remove("active");
            }
        }

    }

    zoomEffect(elements, frame) {

        for (let i = 0; i < elements.length; i++) {

            let element = elements[i];

            if (i === frame) {
                element.classList.add("active");
            }
            else {
                element.classList.remove("active");
            }
        }

    }

    moveEffect(elements, frame) {

        let settings = this.settings;

        for (let i = 0; i < elements.length; i++) {

            let element = elements[i];
            let currentRow = Math.floor(i / settings.columns);

            if (currentRow % 2 == frame % 2) {
                element.classList.add("active");
            }
            else {
                element.classList.remove("active");
            }
        }

    }

    flipEffect(elements, frame) {

        let settings = this.settings;

        for (let i = 0; i < elements.length; i++) {

            let element = elements[i];
            let currentRow = Math.floor(i / settings.columns);
            element.classList.remove("active");
        }
        
        elements[frame].classList.add("active");

    }

}
