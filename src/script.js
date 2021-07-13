import "./style.css";
import * as THREE from "three";
// import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// console.log(THREE.PerspectiveCamera);

//Cursor
const cursor = {
	x: 0,
	y: 0,
};

window.addEventListener("mousemove", (event) => {
	cursor.x = event.clientX / sizes.width - 0.5;
	cursor.y = -(event.clientY / sizes.height - 0.5);
});

//Scene
const scene = new THREE.Scene();

//Red Cube

const count = 5000;
const positionArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; ++i) {
	positionArray[i] = (Math.random() - 0.5) * 4;
}

// const positionArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);

const positionsAttribute = new THREE.BufferAttribute(positionArray, 3);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionsAttribute);

// //first vertice
// positionArray[0] = 0;
// positionArray[1] = 0;
// positionArray[2] = 0;

// //2nd
// positionArray[3] = 0;
// positionArray[4] = 1;
// positionArray[5] = 0;

// //3rd
// positionArray[6] = 1;
// positionArray[7] = 0;
// positionArray[8] = 0;

// const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2);

// for (let i = 0; i < 50; ++i) {
// 	for (let j = 0; j < 3; ++j) {
// 		geometry.vertices.push(
// 			new THREE.Vector3(
// 				(Math.random() - 0.5) * 4, //x
// 				(Math.random() - 0.5) * 4, //y
// 				(Math.random() - 0.5) * 4 //z
// 			)
// 		);
// 	} // face bn gya

// 	const verticesIndex = i * 3; // 012 345 3-3 ke gap meh
// 	geometry.faces.push(
// 		new THREE.Face3(verticesIndex, verticesIndex + 1, verticesIndex + 2)
// 	);
// }

// const vertex1 = new THREE.Vector3(0, 0, 0);
// geometry.vertices.push(vertex1);

// const vertex2 = new THREE.Vector3(0, 1, 0);
// geometry.vertices.push(vertex2);

// const vertex3 = new THREE.Vector3(0, 0, 1);
// geometry.vertices.push(vertex3);

// const face = new THREE.Face3(0, 1, 2);
// geometry.faces.push(face);

const material = new THREE.MeshBasicMaterial({
	color: 0xff0000,
	wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	//Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	//Update Camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	//Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
	if (!document.fullscreenElement) {
		canvas.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});

//Camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	1,
	1000
);
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
// 	-1 * aspectRatio,
// 	1 * aspectRatio,
// 	1,
// 	-1,
// 	0.1,
// 	100
// );
// camera.position.x = 2;
// camera.position.y  = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
	// canvas: canvas
	canvas,
});
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update();

renderer.setSize(sizes.width, sizes.height);

// //Time
// let time = Date.now();

// //Clock
const clock = new THREE.Clock();

// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

//Animation
const tick = () => {
	// //time ms
	// const currentTime = Date.now();
	// const deltaTime = currentTime - time;
	// time = currentTime;

	//clock sec
	const elapsedTime = clock.getElapsedTime();

	//Update objects
	// mesh.rotation.y += 0.002 * deltaTime;
	// mesh.rotation.y += 1 * elapsedTime; wrong ab add nhi karega bar bar
	// mesh.rotation.y = elapsedTime;

	// mesh.rotation.y = elapsedTime * Math.PI * 2; //360
	// mesh.position.y = Math.sin(elapsedTime); //sin ka graph
	// mesh.position.x = Math.cos(elapsedTime);
	// camera.position.y = Math.sin(elapsedTime); //sin ka graph
	// camera.position.x = Math.cos(elapsedTime);
	// camera.lookAt(mesh.position); // camera circle meh ghumke obj ko dekh rha h

	//Update Camera
	// camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
	// camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
	// camera.position.y = cursor.y * 5;
	// // camera.lookAt(new THREE.Vector3());
	// camera.lookAt(mesh.position);

	//Update controls
	controls.update();

	//Renderer
	renderer.render(scene, camera);

	window.requestAnimationFrame(tick);
};

tick();
