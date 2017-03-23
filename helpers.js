class helpers {

    static applyStyle(element, props){
        for(var i in props){
            let val = props[i];
            element.style[i] = val;
        }
    }

    static saveProps(element, props){
        for(var i in props){
            let val = props[i];
            element.dataset[i] = val;
        }
    }
}