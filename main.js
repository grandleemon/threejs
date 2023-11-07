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

const camera = new THREE.PerspectiveCamera(75, aspectRatio);
camera.position.setZ(z);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
	canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
handleZCamera(zInput.value);

const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();
	console.log(elapsedTime);

	camera.position.y = Math.sin(elapsedTime) * Math.PI * 2;
	camera.position.x = Math.cos(elapsedTime) * Math.PI * 2;
	camera.lookAt(cube.position);
	renderer.render(scene, camera);

	window.requestAnimationFrame(tick);
};

tick();