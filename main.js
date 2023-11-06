import * as THREE from "three";

const canvas = document.querySelector(".webgl");
const zInput = document.querySelector(".z-input");

let z = 5;

const handleZCamera = (e) => {
	z = e.target.value;
	camera.position.setZ(z);
	renderer.render(scene, camera);
};


zInput.addEventListener("input", handleZCamera);

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const aspectRatio = sizes.width / sizes.height;

const camera = new THREE.PerspectiveCamera(75, aspectRatio);
camera.position.setZ(z);
camera.position.setY(0);
camera.position.setX(0);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
	canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

