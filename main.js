import './style.css';

import * as THREE from 'three';

const width = 1200;
const height = 900;
const canvas = document.querySelector('canvas');
canvas.width = width;
canvas.height = height;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize( width, height );

function animate() {
    renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
