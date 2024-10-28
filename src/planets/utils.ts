import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function setupRenderer(renderer: THREE.WebGLRenderer) {
    const element = document.getElementById("threejs");
    if(element == null) return;

    const resizeRenderer = () => {
        renderer.setSize(element.offsetWidth, element.offsetHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
    };

    resizeRenderer();

    new ResizeObserver(resizeRenderer).observe(element);
    element.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

export function setupCameraControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2; // Limit vertical angle if needed
    return controls
}
// Moon orbit
export function createOrbitPath(radius, color = 0xffffff, strength = 1) {
    const orbitPoints = [];
    for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * 2 * Math.PI;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        orbitPoints.push(new THREE.Vector3(x, 0, z));
    }

    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    const orbitMaterial = new THREE.LineBasicMaterial({
        color: color,
        linewidth: strength,
    });

    const orbitLine = new THREE.LineLoop(orbitGeometry, orbitMaterial);
    return orbitLine;
}
