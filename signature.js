const colorPicker = document.querySelector("#text-color");
const canvasBackground = document.querySelector("#background-color");
const fontSize = document.querySelector("#fontsizepicker");
const myCanvas = document.querySelector("#canvas-screen");
//btns
const clearbtn = document.querySelector("#clearbtn");
const saveAndDownload = document.querySelector("#saveAndDownload");
const retrieveAndSavedSignature = document.querySelector(
  "#retrieveAndSavedSignature"
);

//access 2d context of canvas
const ctx = myCanvas.getContext("2d");
colorPicker.addEventListener("change", (event) => {
  ctx.fillStyle = event.target.value;
  // Defines the fill-color of the object/shape
  ctx.strokeStyle = event.target.value;
  // Defines the color of the outline of the object/shape
});
canvasBackground.addEventListener("change", (event) => {
  ctx.fillStyle = event.target.value;
  ctx.fillRect(0, 0, 800, 500);
});
myCanvas.addEventListener("mousedown", (event) => {
  isDrawing = true;
  // The offsetX property returns the relative horizontal coordinate of the mouse pointer when a mouse event occurs.
  // The offsetX property is read-only.
  lastX = event.offsetX;
  lastY = event.offsetY;
});
myCanvas.addEventListener("mousemove", (event) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();

    lastX = event.offsetX;
    lastY = event.offsetY;
  }
});
myCanvas.addEventListener("mouseup", (event) => {
  isDrawing = false;
});
myCanvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

fontSize.addEventListener("change", (event) => {
  ctx.lineWidth = event.target.value;
});
clearbtn.addEventListener("click", () => {
  // Clear the canvas
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
});
saveAndDownload.addEventListener("click", (event) => {
  localStorage.setItem("canvasData", myCanvas.toDataURL());
  let link = document.createElement("a");
  link.download = `mycanvas ${Math.random() * 10}.png`;
  link.href = myCanvas.toDataURL();
  link.click();
});
retrieveAndSavedSignature.addEventListener("click", (event) => {
  let savedCanvas = localStorage.getItem("canvasData");
  if (savedCanvas) {
    let img = new Image();
    img.src = savedCanvas;
    ctx.drawImage(img, 0, 0);
  }
});
