const effectsDef = {
    colorRoll: "colorRoll",
    zoomRoll: "zoomRoll"
};

class VisualEffects {


    constructor() {
        this.effects = [];
        this.elements = [];
        this.index = 0;
        this.frame = null;

        this.applyEffect = (elements,type) => {
            this.initEffect.call(this, elements, type);
        };

    }

    setTiming(ms){

        if(this.frame){
            clearInterval(this.frame);
        }

        this.onFrame.call(this);

        this.frame = setInterval(() => {
            this.onFrame.call(this);
        }, ms);
    }

    onFrame() {

        let index = this.index;
        let elements = this.elements;
        let effects = this.effects;

        if (index >= elements.length) {
            this.index = 0;
        }

        for (let i = 0; i < effects.length; i++) {
            let type = effects[i];
            switch (type){
                case effectsDef.colorRoll:
                    this.colorRoll(elements, index);
                    break;
                case effectsDef.zoomRoll:
                    this.zoomRoll(elements, index);
                    break;
                default:
                    return false;
            }
        }

        this.index++;

    }

    initEffect(elements, type) {

        this.elements = elements;
        this.effects = [type];

        let time = 100;

        switch (type){
            case effectsDef.colorRoll:
                time = 60;
                break;
            case effectsDef.zoomRoll:
                time = 2000;
                break;
        }

        this.setTiming.call(this, time);

    }

    colorRoll(elements, index) {

        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];

            helpers.applyStyle(element, {
                top: element.dataset.top,
                left: element.dataset.left,
                transform: "scale(1)",
                filter: "grayscale(1)",
                opacity: 0.2
            });

            if (i > index - elements.length/5 && i < index + elements.length/5 ) {
                helpers.applyStyle(element, {
                    filter: "grayscale(0)",
                    opacity: 1
                });
            }
        }

    }

    zoomRoll(elements, index) {

        let randomIndex = Math.floor(Math.random()*elements.length);

        for (let i = 0; i < elements.length; i++) {

            let element = elements[i];
            element.style.transform = "scale(1)";

            helpers.applyStyle(element, {
                filter: "grayscale(1)",
                opacity: 0.2,
                zIndex: i,
                transform: "scale(1)",
                top: element.dataset.top,
                left: element.dataset.left
            });

            if (i===randomIndex) {
                helpers.applyStyle(element, {
                    zIndex: elements.length+1,
                    filter: "grayscale(0)",
                    opacity: 1,
                    transform: "translate(-50%, -50%) scale(5)",
                    top: "50%",
                    left: "50%"
                });
            }
        }

    }

}
