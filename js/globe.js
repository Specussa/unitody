// start globedots
const globedots = document.querySelector(".globe__dots");
if (globedots) {
  const globedot = 30;
  const FL = 250;
  const globeradio = (1 + Math.pow(5, 0.5)) / 2;
  let canvas;
  let ctx;
  let raf;
  let cx;
  let cy;
  let list;
  let mouse = {};
  
  class Dot {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }
  
  
  function init() {
    canvas = document.getElementById('globe__dots');
    ctx = canvas.getContext('2d');
    resize();
  }
  
  function resize() {
    list = [];
    let globeSize = Math.min(
      document.querySelector(".globes__right").clientHeight, document.querySelector(".globes__right").clientWidth, document.querySelector(".globes").clientHeight, document.querySelector(".globes").clientWidth, 700
    );
    canvas.width = globeSize;
    canvas.height = globeSize;
    document.querySelector(".globe").style.width = globeSize + "px";
    document.querySelector(".globe").style.height = globeSize + "px";
    cx = canvas.width / 2;
    cy = canvas.height / 2;
    ctx.translate(cx, cy);
  
    mouse.x = canvas.width / 2 - 25;
    mouse.y = canvas.height / 2 - 25;
  
    for (let i = 0; i < globedot; i++){
      let phi = Math.acos(1 - 2 * i / globedot);
      let theta = Math.PI * 2 * i / globeradio;
      let x = Math.cos(theta) * Math.sin(phi);
      let y = Math.sin(theta) * Math.sin(phi);
      let z = Math.cos(phi);
      if (globeSize >= 670) {
        list.push(new Dot(x * (canvas.width / 3.35),y * (canvas.width / 3.35),z * (canvas.width / 3.35)));
      } else if (globeSize >= 640 && globeSize < 670) {
        list.push(new Dot(x * (canvas.width / 3.25),y * (canvas.width / 3.25),z * (canvas.width / 3.25)));
      } else if (globeSize >= 610 && globeSize < 640) {
        list.push(new Dot(x * (canvas.width / 3.15),y * (canvas.width / 3.15),z * (canvas.width / 3.15)));
      } else if (globeSize >= 580 && globeSize < 610) {
        list.push(new Dot(x * (canvas.width / 3.05),y * (canvas.width / 3.05),z * (canvas.width / 3.05)));
      } else if (globeSize >= 530 && globeSize < 580) {
        list.push(new Dot(x * (canvas.width / 2.95),y * (canvas.width / 2.95),z * (canvas.width / 2.95)));
      } else if (globeSize >= 470 && globeSize < 530) {
        list.push(new Dot(x * (canvas.width / 2.85),y * (canvas.width / 2.85),z * (canvas.width / 2.85)));
      } else if (globeSize >= 410 && globeSize < 470) {
        list.push(new Dot(x * (canvas.width / 2.65),y * (canvas.width / 2.65),z * (canvas.width / 2.65)));
      } else if (globeSize >= 380 && globeSize < 410) {
        list.push(new Dot(x * (canvas.width / 2.55),y * (canvas.width / 2.55),z * (canvas.width / 2.55)));
      } else if (globeSize >= 350 && globeSize < 380) {
        list.push(new Dot(x * (canvas.width / 2.45),y * (canvas.width / 2.45),z * (canvas.width / 2.45)));
      } else if (globeSize >= 290 && globeSize < 350) {
        list.push(new Dot(x * (canvas.width / 2.35),y * (canvas.width / 2.35),z * (canvas.width / 2.35)));
      } else if (globeSize >= 200 && globeSize < 290) {
        list.push(new Dot(x * (canvas.width / 2.15),y * (canvas.width / 2.15),z * (canvas.width / 2.15)));
      } else if (globeSize >= 170 && globeSize < 200) {
        list.push(new Dot(x * (canvas.width / 2.05),y * (canvas.width / 2.05),z * (canvas.width / 2.05)));
      } else if (globeSize >= 110 && globeSize < 170) {
        list.push(new Dot(x * (canvas.width / 1.95),y * (canvas.width / 1.95),z * (canvas.width / 1.95)));
      } else if (globeSize >= 80 && globeSize < 110) {
        list.push(new Dot(x * (canvas.width / 1.85),y * (canvas.width / 1.85),z * (canvas.width / 1.85)));
      } else {
        list.push(new Dot(x * (canvas.width / 1.75),y * (canvas.width / 1.75),z * (canvas.width / 1.75)));
      }
    }
  
    if (raf) window.cancelAnimationFrame(raf);
    onEnterFrame();
  }
  
  function onEnterFrame() {
    ctx.clearRect(-cx, -cy, canvas.width, canvas.height);
  
    let angleY = (mouse.x - cx) * .0002;
    let cosY = Math.cos(angleY);
    let sinY = Math.sin(angleY);
  
    let angleX = (mouse.y - cy) * .0002;
    let cosX = Math.cos(angleX);
    let sinX = Math.sin(angleX);
  
    for (let i = 0; i < list.length; i++) {
      let dot = list[i];
  
      let x1 = dot.x * cosY - dot.z * sinY;
      let z1 = dot.z * cosY + dot.x * sinY;
  
      let y1 = dot.y * cosX - z1 * sinX;
      let z2 = z1 * cosX + dot.y * sinX;
  
      dot.x = x1;
      dot.y = y1;
      dot.z = z2;
  
      ctx.save();
  
      if (dot.z <= -FL) {
        continue;
      } else {
        let scale = FL / (FL + dot.z);
        ctx.scale(scale, scale);
        ctx.globalAlpha = scale - .5;
        dot._x = cx + dot.x * scale;
        dot._y = cy + dot.y * scale;
      }
      dot.draw();
      ctx.restore();
    }
    raf = window.requestAnimationFrame(onEnterFrame);
  }
  
  window.addEventListener('load', init);
  window.addEventListener('resize', resize);
}
// end globedots