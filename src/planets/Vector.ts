import * as THREE from "three";

interface Vector3DParams {
    radius: number,
    text?: string,
}

export class VisualizationVector3D {
    private vector: THREE.Mesh;
    private vectorHead: THREE.Mesh;
    private prevOmega: number = 0;
    private prevTheta: number = 0;

    constructor(vector: THREE.Vector3, params: Vector3DParams = { radius: 0.5 }) {
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


    changeDirection(normalizedVector: THREE.Vector3) {
        this.prevTheta = Math.acos(normalizedVector.z);
        this.prevOmega = Math.asin(normalizedVector.y / Math.sin(this.prevTheta));
        if (!isNaN(this.prevOmega)) {
            this.vector.rotateY(this.prevOmega);
        }
        this.vector.rotateX(this.prevTheta);
    }

    addToScene(scene: THREE.Scene) {
        scene.add(this.vector);
    }
}
