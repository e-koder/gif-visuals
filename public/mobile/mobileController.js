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
        this.emitUpdate.call(this, target.name, target.value);
    }

    emitUpdate(type, value){
        this.io.emit("update", {
            type,
            value
        })
    }

}

window.onload = ()=>{

    window.mobile = new mobileController();
}
