import * as THREE from "three";
export class VisualizationVector3D {
    constructor(vector, params = { radius: 0.5 }) {
        Object.defineProperty(this, "vector", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "vectorHead", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "prevOmega", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "prevTheta", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        const vectorGeometry = new THREE.CylinderGeometry(params.radius, params.radius, vector.length());
        const vectorMaterial = new THREE.MeshPhongMaterial({ color: new THREE.Color(0xff0000) });
        this.vector = new THREE.Mesh(vectorGeometry, vectorMaterial);
        const vectorHeadGeometry = new THREE.ConeGeometry(params.radius * 2.5, 2);
        this.vectorHead = new THREE.Mesh(vectorHeadGeometry, vectorMaterial);
        this.vectorHead.position.y = vector.length() - vector.length() / 2;
        this.vector.position.set(vector.length() / 2, vector.length() / 2, vector.length() / 2);
        this.vector.add(this.vectorHead);
        const normalizedVector = vector.normalize();
        this.changeDirection(normalizedVector);
    }
    mesh() {
        return this.vector;
    }
    changeDirection(normalizedVector) {
        this.prevTheta = Math.acos(normalizedVector.z);
        this.prevOmega = Math.asin(normalizedVector.y / Math.sin(this.prevTheta));
        if (!isNaN(this.prevOmega)) {
            this.vector.rotateY(this.prevOmega);
        }
        this.vector.rotateX(this.prevTheta);
    }
    addToScene(scene) {
        scene.add(this.vector);
    }
}
