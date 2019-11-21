import pic2 from '../images/icon-suc.png';
/* init value */

const canvar_img = {
  canvasBox: null,
  canvas: null,
  ctx: null,
  x1: null,
  y1: null,
  a: 30,
  timeout: null,
  totimes: 100,
  distance: 30,
  init(){
    this.canvasBox = document.getElementById("J_canvas_box");
    this.canvas = document.getElementById("J_canvas");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = this.canvasBox.clientWidth;
    this.canvas.height = this.canvasBox.clientHeight;

    this.Image();
  },
  Image(){
    var that = this;
    let img = new Image();
    img.src = pic2;
    img.onload = function(){

      var w = that.canvas.height * img.width / img.height;
      that.ctx.drawImage(img, (that.canvas.width - w) / 2, 0, w, that.canvas.height);
      that.tapClip();
    }
  },
  tapClip() {
    var that = this;
    var hastouch = "ontouchstart" in window ? true : false,
        tapstart = hastouch ? "touchstart" : "mousedown",
        tapmove = hastouch ? "touchmove" : "mousemove",
        tapend = hastouch ? "touchend" : "mouseup";

    var area;
    var x2,y2;

    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.lineWidth = this.a * 2;
    this.ctx.globalCompositeOperation = "destination-out";

    document.getElementById('J_canvas').addEventListener(tapstart, function (e) {
      clearTimeout(that.timeout);
      e.preventDefault();
      area = that.getClipArea(e, hastouch);

      that.x1 = area.x;
      that.y1 = area.y;

      that.drawLine(that.x1, that.y1);

      this.addEventListener(tapmove, tapmoveHandler);

      this.addEventListener(tapend, function () {
        this.removeEventListener(tapmove, tapmoveHandler);
        //检测擦除状态
        that.timeout = setTimeout(function () {
          var imgData = that.ctx.getImageData(0, 0, that.canvas.width, that.canvas.height);
          var dd = 0;
          for (var x = 0; x < imgData.width; x += that.distance) {
            for (var y = 0; y < imgData.height; y += that.distance) {
              var i = (y * imgData.width + x) * 4;
              if (imgData.data[i + 3] > 0) { dd++ }
            }
          }
          if (dd / (imgData.width * imgData.height / (that.distance * that.distance)) < 0.4) {
            that.canvas.className = "noOp";
          }
        }, that.totimes)
      });

      function tapmoveHandler(e) {
        clearTimeout(that.timeout);

        e.preventDefault();

        area = that.getClipArea(e, hastouch);

        x2 = area.x;
        y2 = area.y;

        that.drawLine(that.x1, that.y1, x2, y2);

        that.x1 = x2;
        that.y1 = y2;
      }
    })
  },
  getClipArea(e, hastouch){
    var x = hastouch ? e.targetTouches[0].pageX : e.clientX;
    var y = hastouch ? e.targetTouches[0].pageY : e.clientY;
    var ndom = this.canvas;

    while(ndom.tagName!=="BODY"){
      x -= ndom.offsetLeft;
      y -= ndom.offsetTop;
      ndom = ndom.parentNode;
    }

    return {
      x: x,
      y: y
    }
  },
  drawLine(x1, y1, x2, y2){
    this.ctx.save();
    this.ctx.beginPath();
    if(arguments.length==2){
      this.ctx.arc(x1, y1, this.a, 0, 2 * Math.PI);
      this.ctx.fill();
    }else {
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
    this.ctx.restore();
  }
}

canvar_img.init();
