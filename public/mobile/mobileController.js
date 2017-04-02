class mobileController {

    constructor(){

        this.io = io();
        this.io.on('connect', ()=>{
            this.io.emit("init", {type: "controller"});
            this.io.emit("update", "blabla");
        });


        //document.querySelector("#changeImages").onclick = this.changeImages.bind(this);

        document.onclick = e=> {this.onClick.call(this,e)};



    }

    onClick(e){
        let target = e.target;
        if(target.id == "changeImages"){
            this.changeImages.call(this);
        }else if(target.className == "changeGrid"){
            this.changeGrid.call(this, parseInt(target.innerHTML));
        }

    }

    changeGrid(cols){

        this.io.emit("update", {
            type: "changeGrid",
            cols
        })
    }

    changeImages(){
        this.io.emit("update", {
            type: "changeImages"
        })
    }


}

window.onload = ()=>{

    window.mobile = new mobileController();
}
