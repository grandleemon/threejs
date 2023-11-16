import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import gsap from "gsap";

const gui = new GUI();
const debugObject = {
	color: "#425466",
	spin: () => {
		gsap.to(cube.rotation, { duration: 1, y: cube.rotation.y + Math.PI * 2 });
	},
};

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
	new THREE.MeshBasicMaterial({ color: debugObject.color }),
);
scene.add(cube);

gui.add(cube.position, "y").min(-3).max(3).step(.0001).name("elevation");
gui.add(cube, "visible");
gui.add(cube.material, "wireframe");
gui.addColor(debugObject, "color").onChange(() => cube.material.color.set(debugObject.color));
gui.add(debugObject, "spin");

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