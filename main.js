import * as THREE from "three";

const canvas = document.querySelector(".webgl");
const zInput = document.querySelector(".z-input");
const zValue = document.querySelector(".z-value");

let z = 5;

const handleZCamera = (value) => {
	z = value;
	zValue.innerHTML = `z: ${z}`;
	camera.position.setZ(z);
	renderer.render(scene, camera);
};


zInput.addEventListener("input", e => handleZCamera(e.target.value));

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0.7, -0.6, 1);

scene.add(mesh);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const aspectRatio = sizes.width / sizes.height;

const camera = new THREE.PerspectiveCamera(75, aspectRatio);
camera.position.setZ(z);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
	canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
handleZCamera(zInput.value);