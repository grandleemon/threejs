import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector(".webgl");
const zValue = document.querySelector(".z-value");

let z = 5;

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

let aspectRatio = sizes.width / sizes.height;

const cursor = {
	x: 0,
	y: 0,
};

window.addEventListener("mousemove", e => {
	cursor.x = e.clientX / window.innerWidth - 0.5;
	cursor.y = -(e.clientY / window.innerHeight - 0.5);
});

window.addEventListener("resize", e => {
	sizes.width = e.target.innerWidth;
	sizes.height = e.target.innerHeight;

	aspectRatio = sizes.width / sizes.height;
	camera.aspect = aspectRatio;
	camera.updateProjectionMatrix();

	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
	const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

	if (!fullscreenElement) {
		if (canvas.requestFullscreen) {
			canvas.requestFullscreen();
		} else if (canvas.webkitRequestFullscreen) {
			canvas.webkitRequestFullscreen();
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
});

const scene = new THREE.Scene();

const cube = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: "red" }),
);
scene.add(cube);

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
camera.position.setZ(z);
camera.lookAt(cube.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.minDistance = 2;
controls.maxDistance = 60;

const renderer = new THREE.WebGLRenderer({
	canvas,
});

zValue.innerHTML = `zoom: ${z}`;

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("wheel", e => {
	z = controls.getDistance();
	zValue.innerHTML = `zoom: ${z}`;
});

const tick = () => {
	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};

tick();