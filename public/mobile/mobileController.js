class mobileController {

    constructor(){

        var socket = io.connect('http://localhost:3000');

    }
}

window.onload = ()=>{

    let mobile = new mobileController();
}
