

class gifVisual{

    constructor(view, effects){

        this.view = view;
        this.effects = effects;
        this.hue = 0;
        this.invert = 0;
        this.blinker = true;
        this.allImages = [];
        this.images = [];
        this.imagesNum = 0;
        this.visual = window; ///window.open("visual.html","VisualWindow");
        this.firstIndex = 0;

        this.mainElement = this.visual.document.querySelector(".wrapper-main");
        this.initControls.call(this, effects);
        this.initImages.call(this, 50);
        this.getImages.call(this);

        //setInterval(this.switchRandom.bind(this), 3000);
        window.addEventListener("keypress", this.onKey.bind(this));
    }

    initControls(effects){
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
    }

    getImages(m){

        let gifs, gifsRoot;

        let r = Math.random()>0.5 ? 0:1;
        r=0;
        gifs = gifObj[r].list;
        gifsRoot = gifObj[r].root;

        this.allImages = [];
        for(var i=0; i<gifs.length; i++){
            this.allImages.push(gifsRoot+gifs[i]);
        }
        this.imagesNum = 20;

        let tag = $("#control-tag").val();

        this.mapImages.call(this, 4);

        /*for(var i=0; i<this.imagesNum; i++){

            $.get("http://api.giphy.com/v1/gifs/translate?s="+tag+"&api_key=dc6zaTOxFJmzC", this.loadImage.bind(this));
        }*/
    }

    mapImages(combinations){

    	combinations = combinations ? combinations : Math.ceil(Math.random()*5);
    	this.images = [];
    	let elements = this.mainElement.querySelectorAll(".gif");
    	let j=0;

    	for(var i=0; i<combinations; i++){
    		let randomImageIndex = Math.floor(Math.random()*this.allImages.length);
    		this.images.push(this.allImages[randomImageIndex]);
    	}

    	this.view.initGrid.call(this.view, this.images);
        this.effects.applyEffect(elements, "colorRoll");
    }

    initImages(num){

        for (var i=0; i<num; i++){
            var element = document.createElement("div");
            element.className = "gif";
            var img = document.createElement("img");
            element.className+=" shake-constant";
            element.appendChild(img);
            img.dataset.rotation = [0,0,0];
            this.mainElement.appendChild(element);
        }
    }

    switchBlinker(force){
        if(!force && !this.blinker){
            this.blinker = setInterval(this.invertColor.bind(this), 100);
        }else{
            if(this.blinker)
                clearInterval(this.blinker);
            this.blinker = false;
            this.invert = 0;
            this.setStyle.call(this);
        }
    }

    setGrid(imagesPerRow){

        this.view.initGrid.call(this.view, null, imagesPerRow);

    }

    changeColor(){
        this.hue+=80;
        this.setStyle.call(this);
    }

    invertColor(){
        this.invert = this.invert == 0 ? 1 : 0;
        this.setStyle.call(this);
    }

    setStyle(){

        var filter = "";
        filter+="hue-rotate("+ this.hue +"deg)";
        filter+="invert("+this.invert*100+"%)";

        this.mainElement.style.filter = filter;
    }

    onKey(e){
        var key = e.key;
        if(key>0) {
            this.setGrid.call(this, parseInt(key));
            return false;
        }

        let elements = document.querySelectorAll(".gif");

        switch (key) {
            case "i":
                this.switchBlinker.call(this);
                break;
            case "o":
                this.effects.applyEffect(elements, "colorRoll");
                break;
            case "p":
                this.effects.applyEffect(elements, "zoomRoll");
                break;
            case " ":
                this.mapImages.call(this, parseInt(10));
                break;
            default:
                break;
        }
    }

}

$(document).ready(function () {

    let view = new VisualView();
    let effects = new VisualEffects(view);
    let controller = new gifVisual(view, effects);



});
