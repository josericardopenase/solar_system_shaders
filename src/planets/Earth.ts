import * as THREE from "three";
import { Planet } from "./Planet";

export class Earth extends Planet {
    constructor() {
        super(3, "http://127.0.0.1:3000/earthMap2k.jpg", {
            bumpMapUrl: "http://127.0.0.1:3000/earthBump.jpg",
            bumpScale: 10,
            specularMapUrl: "http://127.0.0.1:3000/earthSpecular.jpg",
            specularColor: new THREE.Color("grey"),
            shininess: 100,
            refractionRatio: 3.35294,
            cloudMapUrl: "http://127.0.0.1:3000/earthClouds.jpg",
            cloudAlphaMapUrl: "http://127.0.0.1:3000/earthCloudsTransparency.jpg",
            cloudOpacity: 0.7
        });
    }
}