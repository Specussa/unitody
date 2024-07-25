import * as THREE from '../js/three.module.js';
import { OrbitControls } from '../js/OrbitControls.js';

const containerEl = document.querySelector(".globe-wrapper");
const canvas3D = containerEl.querySelector("#globe-3d");
const canvas2D = containerEl.querySelector("#globe-2d-overlay");

let renderer, scene, camera, controls;
let globeMesh;
let clock;
let mapMaterial;

initScene();
window.addEventListener("resize", updateSize);

function initScene() {
  renderer = new THREE.WebGLRenderer({ canvas: canvas3D, alpha: true });
  renderer.setPixelRatio(2);

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1.1, 1.1, 1.1, -1.1, 0, 3);
  camera.position.z = 1.1;

  createOrbitControls();

  clock = new THREE.Clock();

  new THREE.TextureLoader().load(
  "img/globe/map.png",
  (mapTex) => {
    createGlobe(mapTex);
    addCanvasEvents();
    updateSize();
    render();
  });
}

function createOrbitControls() {
  controls = new OrbitControls(camera, canvas3D);
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.enableDamping = true;
  controls.minPolarAngle = .4 * Math.PI;
  controls.maxPolarAngle = .4 * Math.PI;
  controls.autoRotate = true;
}

function createGlobe(texture) {
  const globeGeometry = new THREE.IcosahedronGeometry(1, 22);
  mapMaterial = new THREE.ShaderMaterial({
    vertexShader: document.getElementById("vertex-shader-map").textContent,
    fragmentShader: document.getElementById("fragment-shader-map").textContent,
    uniforms: {
      u_map_tex: { type: "t", value: texture },
      u_dot_size: { type: "f", value: 0 },
      u_pointer: { type: "v3", value: new THREE.Vector3(0, 0, 1) },
      u_time_since_click: { value: 0 },
    },
    alphaTest: false,
    transparent: true
  });

  const globe = new THREE.Points(globeGeometry, mapMaterial);
  scene.add(globe);

  globeMesh = new THREE.Mesh(globeGeometry, new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: .0
  }));
  scene.add(globeMesh);
}

function addCanvasEvents() {
  containerEl.addEventListener("click", (e) => {
    updateMousePosition(
      e.targetTouches ? e.targetTouches[0].pageX : e.clientX,
      e.targetTouches ? e.targetTouches[0].pageY : e.clientY,
    );

    const res = checkIntersects();
    if (res.length) {
      mapMaterial.uniforms.u_pointer.value = res[0].face.normal;
      clock.start()
    }
  });

  function updateMousePosition(eX, eY) {
    const mouse = new THREE.Vector2(
      (eX - containerEl.offsetLeft) / containerEl.offsetWidth * 2 - 1,
      -((eY - containerEl.offsetTop) / containerEl.offsetHeight) * 2 + 1
    );
  }
}

function checkIntersects() {
  const rayCaster = new THREE.Raycaster();
  rayCaster.setFromCamera(new THREE.Vector2(0, 0), camera);
  return rayCaster.intersectObject(globeMesh);
}

function render() {
  checkIntersects();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

function updateSize() {
  let globesSize = Math.min(
    document.querySelector(".globes__right").clientHeight, document.querySelector(".globes__right").clientWidth, document.querySelector(".globes").clientHeight, document.querySelector(".globes").clientWidth, 700
  );
  containerEl.style.width = globesSize + "px";
  containerEl.style.height = globesSize + "px";
  renderer.setSize(globesSize, globesSize);
  canvas2D.width = canvas2D.height = globesSize;
  mapMaterial.uniforms.u_dot_size.value = .03 * globesSize;
}