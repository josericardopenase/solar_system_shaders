import * as THREE from "three";
export class PlanetPhysics {
    constructor(mesh, params) {
        Object.defineProperty(this, "ownMesh", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "t", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "params", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inclinationMatrix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "orbitLine", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.ownMesh = mesh;
        this.params = params;
        this.inclinationMatrix = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), THREE.MathUtils.degToRad(params.orbitInclination));
        if (params.drawOrbit) {
            this.createOrbitPath();
        }
    }
    createOrbitPath() {
        const orbitPoints = [];
        for (let i = 0; i <= 64; i++) {
            const angle = (i / 64) * 2 * Math.PI;
            const x = this.params.radius * Math.cos(angle);
            const z = this.params.radius * Math.sin(angle);
            const point = new THREE.Vector3(x, 0, z).applyMatrix4(this.inclinationMatrix);
            orbitPoints.push(point);
        }
        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
        const orbitMaterial = new THREE.LineBasicMaterial({
            color: this.params.orbitColor ?? 0xffffff,
            linewidth: this.params.orbitStrength,
        });
        this.orbitLine = new THREE.LineLoop(orbitGeometry, orbitMaterial);
        this.orbitLine.position.copy(this.params.rotationCenter);
    }
    mesh() {
        return this.ownMesh;
    }
    orbitMesh() {
        return this.orbitLine;
    }
    addToScene(scene) {
        if (this.orbitLine) {
            scene.add(this.orbitLine);
        }
        scene.add(this.ownMesh);
    }
    updatePosition(dt) {
        this.t += dt;
        const x = this.params.radius * Math.sin(this.t * this.params.rotationVelocity) + this.params.rotationCenter.x;
        const z = this.params.radius * Math.cos(this.t * this.params.rotationVelocity) + this.params.rotationCenter.z;
        const position = new THREE.Vector3(x, 0, z).applyMatrix4(this.inclinationMatrix);
        this.ownMesh.position.set(position.x, position.y, position.z);
        this.ownMesh.rotation.y += this.params.selfRotationVelocity * dt;
    }
}
