import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export function setupRenderer(renderer) {
    const element = document.getElementById("threejs");
    if (element == null)
        return;
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
export function setupCameraControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2; // Limit vertical angle if needed
    return controls;
}
