import * as THREE from "three";
import { Planet } from "./Planet";
export class Earth extends Planet {
    constructor() {
        super(3, "/assets/earthMap2k.jpg", {
            bumpMapUrl: "/assets/earthBump.jpg",
            bumpScale: 10,
            specularMapUrl: "/assets/earthSpecular.jpg",
            specularColor: new THREE.Color("grey"),
            shininess: 100,
            refractionRatio: 3.35294,
            cloudMapUrl: "/assets/earthClouds.jpg",
            cloudAlphaMapUrl: "/assets/earthCloudsTransparency.jpg",
            cloudOpacity: 0.7
        });
    }
}
