(function documents() { //Code isolation


// This isn't an HTML5 canvas, it's an old svg hack, (the code is _that_ old!)

var xlinkNS = "http://www.w3.org/1999/xlink";
var imgCount = 1;
function onstart() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();
    fileInput.addEventListener("change", () => {
        var reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);

        reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
    
            var uid = Tools.generateUID("doc"); // doc for document
        
            Tools.drawAndSend({
                id: uid,
                data: image.src,
                w: this.width || 300,
                h: this.height || 300
                //fileType: fileInput.files[0].type
            });
            };
        };
       // Tools.change(Tools.prevToolName);
    });
}

function draw(msg) {
    //const file = self ? msg.data : new Blob([msg.data], { type: msg.fileType });
    //const fileURL = URL.createObjectURL(file);

   // fakeCanvas.style.background = `url("${fileURL}") 170px 0px no-repeat`;
    //fakeCanvas.style.backgroundSize = "400px 500px";
    var aspect = msg.w/msg.h
    var img = Tools.createSVGElement("image");
    img.id=msg.id;
    img.setAttribute("class", "layer-"+Tools.layer);
    img.setAttributeNS(xlinkNS, "href", msg.data);
    img.setAttribute("x", 100+imgCount*10);
    img.setAttribute("y", 100+imgCount*10);
    img.setAttribute("width", 400*aspect);
    img.setAttribute("height", 400);
    if(msg.transform)
			img.setAttribute("transform",msg.transform);
    Tools.group.appendChild(img);
    imgCount++;
}

Tools.add({
    "name": "Document",
    "icon": "🖼️",
    //"shortcut": "",
    "draw": draw,
    "onstart": onstart
});

})(); //End of code isolation