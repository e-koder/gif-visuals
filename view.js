class VisualView {

    constructor(dom) {

        this.columns = 12;
        this.rows = this.getRows(this.columns);
        this.images = [];
        this.elements = [];
        this.dom = dom;

    }

    changeImages(images) {

        this.images = images;

    }

    getRows(columns) {
        return Math.ceil(columns / 16 * 9);
    }

    initGrid(images, columns) {

        this.images = images ? images : this.images;
        this.columns = columns ? columns : this.columns;
      
      	let imageWidth = window.innerWidth / columns;
      	let imageHeight = window.innerHeight / rows;
      
        this.rows = this.calculateRows(imageWidth);
        this.dom.innerHTML = "";
      
      	let imageWidth = window.innerWidth / columns;
        let imageHeight = window.innerHeight / rows;
      
        let elements = this.elements;
        let totalElements = this.columns * this.rows;
        let totalImages = this.images.length;
        let currentIndex = 0;
        
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {

                let image = this.images[currentIndex];
                elements.push(image);
                this.addElement.call(this, image, x, y);

                currentIndex++;
                if (currentIndex == totalImages) {
                    currentIndex = 0;
                }
            }

        }
    }

    addElement(image, x, y) {

        let columns = this.columns;
        let rows = this.rows;
        let element = document.createElement("div");
        let inner = document.createElement("div");
        let imageWidth = window.innerWidth / columns;
        let imageHeight = window.innerHeight / rows;

        element.className = "gif";

        helpers.applyStyle(element, {
            width: imageWidth + "px",
            height: imageHeight + "px",
            top: imageHeight * y + "px",
            left: imageWidth * x + "px"
        });

        inner.className = "inner-div";
        inner.style.backgroundImage = "url(" + image + ")";
        element.appendChild(inner);
        this.dom.appendChild(element)

        helpers.saveProps(element, {
            top: imageHeight * y + "px",
            left: imageWidth * x + "px"
        });
    }

    flipImage(element, url) {
        let img = element.querySelector("img");
        let rotation = img.getAttribute("data-rotation").split(",");
        let random2 = Math.random() > 0.5 ? 180 : -180;
        if (Math.random() > 0) {
            rotation[1] = parseInt(rotation[1]) + 180;
        } else {
            rotation[0] = parseInt(rotation[0]) + random2;
            rotation[2] = parseInt(rotation[2]) + random2;
        }

        img.style.transform = "rotateX(" + rotation[0] + "deg)rotateY(" + rotation[1] + "deg)rotateZ(" + rotation[2] + "deg)";
        img.setAttribute("data-rotation", rotation);

        setTimeout(() => {
            img.src = url
        }, 100);
    }

}
