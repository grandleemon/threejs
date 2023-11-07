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

const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: "red" }),
);
group.add(cube1);

const cube2 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: "green" }),
);
cube2.position.set(-2, 0, -1);
group.add(cube2);

const cube3 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: "blue" }),
);
cube3.position.set(2, 0, 1);
group.add(cube3);

group.rotation.set(2, 1, 1);

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