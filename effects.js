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
    
    resetClasses(element){
        element.classList.remove("effect");
        element.classList.remove("effect-zoomRoll");
        element.classList.remove("effect-colorRoll");
        element.classList.remove("active");
    }

    initEffect(elements, type) {

        this.elements = elements;
        this.effects = [type];


        let len = elements.length;
        let time = 100;

        switch (type){
            case effectsDef.colorRoll:
                time = 60;
                if(len<10){
                    time = 400;
                }else if(len<20){
                    time = 150;
                }
                break;
            case effectsDef.zoomRoll:
                time = 2000;
                break;
        }
        
        for(let i=0; i< elements.length; i++){
            
            let element = elements[i];
            this.resetClasses(element);
            
            let effectClass = "effect-"+type;
            element.classList.add("effect", effectClass);
            
        }
        

        this.setTiming.call(this, time);

    }

    colorRoll(elements, index) {
        
         let len = elements.length;

        for (let i = 0; i < len; i++) {
            
            let element = elements[i];
            let range = Math.floor(len/5);
           
           let nextIndex = index + range;
           let prevIndex = index - range;

            if ((i >= prevIndex && i <= nextIndex) || 
                (nextIndex >= len && i <= nextIndex - len) || 
                (prevIndex < 0 && i>= len + prevIndex) ) {
                element.classList.add("active");
            }else {
                element.classList.remove("active");
            }
        }

    }

    zoomRoll(elements, index) {

        let randomIndex = Math.floor(Math.random()*elements.length);

        for (let i = 0; i < elements.length; i++) {

            let element = elements[i];

            if (i===randomIndex) {
                element.classList.add("active");
            }else{
                element.classList.remove("active");
            }
        }

    }

}
