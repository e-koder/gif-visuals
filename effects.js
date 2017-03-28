"use strict";

const effectsDef = [
    { type: "greyEffect", time: 120},
    { type: "colorEffect", time: 120},
    { type: "invertEffect", time: 300},
    { type: "zoomEffect", time: 1600},
    { type: "shakeEffect", time: 300},
    { type: "flipEffect", time: 300}
];

class VisualEffects {


    constructor() {
        this.effectIndex = 0;
        this.effect = effectsDef[this.effectIndex];
        this.elements = [];
        this.frame = 0;
        this.interval = null;
        this.settings = null;

        this.applyEffect = (index) => {
            if(effectsDef[index]){
                this.effectIndex = index;
                this.initEffect.call(this, effectsDef[index]);
            }
        };

        this.updateElements = (settings) => {

            this.elements = settings.elements;
            this.settings = settings;
            this.initEffect.call(this);
            this.frame = 0;
        };

        this.nextEffect = () => {
            let index = this.effectIndex+1;
            index = index >= effectsDef.length ? 0 : index;
            this.applyEffect.call(this, index);
        };

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
    
     initEffect(effect) {

        effect = effect ? effect : this.effect;
        this.effect = effect;

        let elements = this.elements;

        for (let i = 0; i < elements.length; i++) {

            let element = elements[i];
            this.resetClasses(element);
            element.classList.add("effect", effect.type);

        }

        this.setTiming.call(this, effect.time);

    }

    resetEffectModes(element){
        element.classList.remove("active", "range", "even", "odd", "row", "col", "above", "bellow")
    }

    renderEffect(frame){

        frame = frame ? frame : this.frame;
        let elements = this.elements;
        let settings = this.settings;
        let len = elements.length;
        let rows = settings.rows;
        let cols = settings.cols;
        let range = Math.floor(len / 5);

        let i=0;

        let row = frame % settings.rows;
        let col = frame % settings.cols;

        for(let x=0; x<rows; x++){
            for(let y=0;y<cols; y++){

                let element = elements[i];
                let lastFrame = frame + range;
                let prevFrame = frame - range;

                this.resetEffectModes(element);


                if((frame+i)%2==0){
                    element.classList.add("even");
                }else{
                    element.classList.add("odd");
                }

                if(i<=len/2){
                    element.classList.add("above");
                }else {
                    element.classList.add("bellow");
                }

                if ((i >= prevFrame && i <= lastFrame) ||
                    (lastFrame >= len && i <= lastFrame - len) ||
                    (prevFrame < 0 && i >= len + prevFrame)) {
                    element.classList.add("range");
                }

                if(col == y){
                    element.classList.add("col");
                }

                if(row == x){
                    element.classList.add("row");
                }

                if(i == frame){
                    element.classList.add("active");
                }

                i++
            }
        }

    }

    onFrame() {

        let frame = this.frame;
        let elements = this.elements;

        this.renderEffect(frame);
        this.frame++;
        if (this.frame >= elements.length) {
            this.frame = 0;
        }

    }

    resetClasses(element) {
        element.classList.remove("effect");
        for(let i=0; i<effectsDef.length; i++){
            element.classList.remove(effectsDef[i].type);
        }
    }



}
