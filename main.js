import * as THREE from "three";
import gsap from "gsap";

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

const cube = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: "red" }),
);
scene.add(cube);

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const aspectRatio = sizes.width / sizes.height;

// const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
const camera = new THREE.OrthographicCamera(-1 * aspectRatio, aspectRatio, 1 * aspectRatio, -1, 0.1, 100);
camera.position.setZ(z);
camera.position.x = 2;
camera.position.y = 2;
camera.lookAt(cube.position);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
	canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
handleZCamera(zInput.value);

const clock = new THREE.Clock();

const tick = () => {
	cube.rotation.y = clock.getElapsedTime();
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};

tick();