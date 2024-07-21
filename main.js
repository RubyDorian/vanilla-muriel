import './style.css';

import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader';

const width = 2048;
const height = 1536;
const canvas = document.querySelector('canvas');
canvas.width = width;
canvas.height = height;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const geometry = new THREE.PlaneGeometry(20, 20, 4);
const material = new THREE.MeshPhongMaterial({color: 0xffffff});
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

const pointLight1 = new THREE.PointLight(0xffffff, 20, 100);
pointLight1.position.set(0, 20, 0);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 20, 100);
pointLight2.position.set(20, 0, 0);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xffffff, 20, 100);
pointLight3.position.set(0, 0, 20);
scene.add(pointLight3);

const lights = [pointLight1, pointLight2, pointLight3];

const renderer = new THREE.WebGLRenderer({
    canvas,
});

let muriel = null;

function animate(time) {
    for (let i = 0; i < lights.length; i++) {
        const light = lights[i];
        const angle = time * 0.1 / 180 * Math.PI + Math.PI * i / 3;
        const vec = new THREE.Vector3(6, 6, 0);
        vec.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
        light.position.copy(vec);
    }
    if (muriel) {
        muriel.rotation.y += 0.1;
    }
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

const glbLoader = new GLTFLoader();
glbLoader.load(
    'Muriel.glb',
    (object) => {
        const muriel = object.scene.children[0];
        muriel.position.set(0, 0, 0);
        const scale = 4;
        muriel.scale.set(scale, scale, scale);
        scene.add(muriel);
    },
    (xhr) => {
        // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
);
