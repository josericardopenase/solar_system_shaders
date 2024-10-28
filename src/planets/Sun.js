import * as THREE from "three";
export class Star {
    constructor(radius, mapUrl, pointLightIntensity = 2, ambientLightIntensity = 0.5) {
        Object.defineProperty(this, "starMesh", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pointLight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ambientLight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(mapUrl),
        });
        this.starMesh = new THREE.Mesh(geometry, material);
        this.pointLight = new THREE.PointLight(0xffffff, pointLightIntensity, 10000);
        this.pointLight.position.set(0, 0, 0);
        this.starMesh.add(this.pointLight);
        this.ambientLight = new THREE.AmbientLight(0xffffff, ambientLightIntensity);
    }
    addToScene(scene) {
        scene.add(this.starMesh);
        scene.add(this.ambientLight);
    }
    mesh() {
        return this.starMesh;
    }
}
export class Sun extends Star {
    constructor() {
        super(20, "/assets/sun.jpg", 2800, 0.2);
    }
}
