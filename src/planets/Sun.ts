import * as THREE from "three";
import axios from 'axios';
import {TextureLoader} from "three";

export class Star {
    protected starMesh: THREE.Mesh;
    protected pointLight: THREE.PointLight;
    protected ambientLight: THREE.AmbientLight;
    public texture : THREE.Texture;

    constructor(radius: number, mapUrl: string, pointLightIntensity: number = 2, ambientLightIntensity: number = 0.5) {
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time : new THREE.Uniform(0.5)
            }
        });
        this.texture = new TextureLoader().load(mapUrl);
        this.starMesh = new THREE.Mesh(geometry, material);

        this.pointLight = new THREE.PointLight(0xffffff, pointLightIntensity, 10000);
        this.pointLight.position.set(0, 0, 0);
        this.starMesh.add(this.pointLight);

        this.ambientLight = new THREE.AmbientLight(0xffffff, ambientLightIntensity);
    }

    addToScene(scene: THREE.Scene) {
        scene.add(this.starMesh);
        scene.add(this.ambientLight);
    }

    mesh(): THREE.Mesh {
        return this.starMesh;
    }
}

export class Sun extends Star {
    constructor() {
        super(20, "./sun.jpg", 2800, 0.2);
    }
}
