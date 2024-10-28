import * as THREE from "three";
import { Planet } from "./Planet";

export class Earth extends Planet {
    constructor() {
        super(3, "/public/earthMap2k.jpg", {
            bumpMapUrl: "/public/earthBump.jpg",
            bumpScale: 10,
            specularMapUrl: "/public/earthSpecular.jpg",
            specularColor: new THREE.Color("grey"),
            shininess: 100,
            refractionRatio: 3.35294,
            cloudMapUrl: "/public/earthClouds.jpg",
            cloudAlphaMapUrl: "/public/earthCloudsTransparency.jpg",
            cloudOpacity: 0.7
        });
    }
}