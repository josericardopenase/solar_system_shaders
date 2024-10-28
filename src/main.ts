import * as THREE from 'three';
const { createApp, ref } = Vue
import {Jupiter, Mars, Mercury, Neptune, Planet, Saturn, Uranus, Venus} from "./planets/Planet.ts";
import {Sun} from "./planets/Sun.ts";
import {PlanetPhysics} from "./planets/physics.ts";
import {setupCameraControls, setupRenderer} from "./planets/utils.ts";
import {Earth} from "./planets/Earth.ts";
import {TextureLoader} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

let currentPlanet = null;
const scene = new THREE.Scene();
scene.background = new TextureLoader().load("./public/bg.jpg")
scene.backgroundIntensity = 0.2
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
setupRenderer(renderer);
const controls = setupCameraControls(camera, renderer)
const cameraPivot = new THREE.Object3D();
scene.add(cameraPivot);
cameraPivot.add(camera);
const initialPivotPosition = cameraPivot.position.clone();

camera.position.set(0, 325, 0)
camera.lookAt(0, 0, 0)

const sun = new Sun()
sun.addToScene(scene)

const mars = new Mars();
const marsPhysics = new PlanetPhysics(mars.mesh(), {
    radius: 100,
    rotationCenter: new THREE.Vector3(0, 0),
    drawOrbit: true,
    rotationVelocity: 0.8,
    selfRotationVelocity: 3,
    orbitInclination:0,
    orbitStrength: 5,
    orbitColor: 0xb55228
});
marsPhysics.addToScene(scene)
mars.mesh().position.set(100, 0, 0)


const earth = new Earth();
const earthPhysics = new PlanetPhysics(earth.mesh(), {
    radius: 80,
    rotationCenter: new THREE.Vector3(0, 0),
    drawOrbit: true,
    rotationVelocity: 1,
    selfRotationVelocity: 3,
    orbitInclination:0,
    orbitStrength: 5,
    orbitColor: 0xff9321
});
earthPhysics.addToScene(scene)
earth.mesh().position.set(100, 0, 0)


const mercury = new Mercury();
const mercuryPhysics = new PlanetPhysics(mercury.mesh(), {
    radius: 40,
    rotationCenter: new THREE.Vector3(0, 0),
    drawOrbit: true,
    rotationVelocity: 0.8,
    selfRotationVelocity: 3,
    orbitInclination:0,
    orbitStrength: 5,
    orbitColor: 0x70b2e0
});
mercuryPhysics.addToScene(scene)
mercury.mesh().position.set(100, 0, 0)

const venus = new Venus();
const venusPhysics = new PlanetPhysics(venus.mesh(), {
    radius: 55,
    rotationCenter: new THREE.Vector3(0, 0),
    drawOrbit: true,
    rotationVelocity: 0.6,
    selfRotationVelocity: 3,
    orbitInclination:0,
    orbitStrength: 5,
    orbitColor: 0xff5500
});
venusPhysics.addToScene(scene)
venus.mesh().position.set(100, 0, 0)


const jupyter = new Jupiter();
const jupyterPhysics = new PlanetPhysics(jupyter.mesh(), {
    radius: 145,
    rotationCenter: new THREE.Vector3(0, 0),
    drawOrbit: true,
    rotationVelocity: 0.6,
    selfRotationVelocity: 3,
    orbitInclination:20,
    orbitStrength: 5,
    orbitColor:0xf2bb83
});
jupyterPhysics.addToScene(scene)
jupyter.mesh().position.set(100, 0, 0)


const saturn = new Saturn();
const saturnPhysics = new PlanetPhysics(saturn.mesh(), {
    radius: 175,
    rotationCenter: new THREE.Vector3(0, 0),
    drawOrbit: true,
    rotationVelocity: 0.6,
    selfRotationVelocity: 3,
    orbitInclination:-10,
    orbitStrength: 5,
    orbitColor:0xffa378
});
saturnPhysics.addToScene(scene)
saturn.mesh().position.set(100, 0, 0)


const uranus = new Uranus();
const uranusPhysics = new PlanetPhysics(uranus.mesh(), {
    radius: 205,
    rotationCenter: new THREE.Vector3(0, 0),
    drawOrbit: true,
    rotationVelocity: 0.4,
    selfRotationVelocity: 3,
    orbitInclination:5,
    orbitStrength: 5,
    orbitColor:0x9cdbff
});
uranusPhysics.addToScene(scene)
uranus.mesh().position.set(100, 0, 0)

const neptune = new Neptune();
const neptunePhysics = new PlanetPhysics(neptune.mesh(), {
    radius: 225,
    rotationCenter: new THREE.Vector3(0, 0),
    drawOrbit: true,
    rotationVelocity: 0.4,
    selfRotationVelocity: 3,
    orbitInclination:-20,
    orbitStrength: 5,
    orbitColor:0x2474ff
});
neptunePhysics.addToScene(scene)
neptune.mesh().position.set(100, 0, 0)

var planets = [
    {
        "name" : "mercury",
        "mesh" : mercuryPhysics
    },
    {
        "name" : "venus",
        "mesh" : venusPhysics
    },
    {
        "name": "earth",
        "mesh" : earthPhysics
    },
    {
        "name": "mars",
        "mesh" : marsPhysics
    },
    {
        "name": "jupyter",
        "mesh" : jupyterPhysics
    },
    {
        "name": "saturn",
        "mesh" : saturnPhysics
    },
    {
        "name": "uranus",
        "mesh" : uranusPhysics
    },
    {
        "name": "neptune",
        "mesh" : neptunePhysics
    },
]


function resetSpaceship(){
    spaceShip.position.set(20, 0, -500);
    spaceShip.scale.set(2, 2, 2);
    spaceShip.rotation.set(0, 0, 0)
}
function resetCamera(){
    resetSpaceship()
    controls.reset()
    cameraPivot.rotation.set(0, 0, 0)
    cameraPivot.position.set(0, 0, 0)
    camera.rotation.set(0, 0, 0)
    camera.position.set(0, 325, 0)
    camera.lookAt(0, 0, 0)
}


function renderButtonsList(list : {name: string, mesh ?: PlanetPhysics}[]){
    const uiButtons = list.map((x) =>
        `
            <div class="${currentPlanet == x.mesh && "!bg-blue-100 !text-blue-500 !border-blue-500"} text-gray-800 p-3 hover:bg-gray-200 border-2 cursor-pointer bg-gray-100 rounded-xl text-center font-semibold">
                ${x.name}
            </div>
        `
    )
    const getHtmlButtonList = document.getElementById("camera-positions")
    getHtmlButtonList.innerHTML = ""
    const resetButton = document.createElement("div");

    resetButton.innerHTML = `
            <div class="${currentPlanet == null && "!bg-blue-100 !text-blue-500 !border-blue-500"} text-gray-800 p-3 hover:bg-gray-200 border-2 cursor-pointer bg-gray-100 rounded-xl text-center font-semibold">
                Vista libre
            </div>
        `;
    resetButton.onclick = function () {
        currentPlanet = null
        resetCamera()
        renderButtonsList(list)
    }
    getHtmlButtonList.appendChild(resetButton);



    const spacialButton = document.createElement("div");

    spacialButton.innerHTML = `
            <div class="${currentPlanet?.spacial  && "!bg-blue-100 !text-blue-500 !border-blue-500"} text-gray-800 p-3 hover:bg-gray-200 border-2 cursor-pointer bg-gray-100 rounded-xl text-center font-semibold">
                Nave espacial
            </div>
        `;
    spacialButton.onclick = function () {
        currentPlanet = {
            mesh : null,
            spacial : true
        }
        resetCamera()
        renderButtonsList(list)
    }
    getHtmlButtonList.appendChild(spacialButton);

    uiButtons.forEach((item, i) => {
        const button = document.createElement("div");
        button.innerHTML = item
        button.onclick = () => {
            if(currentPlanet == list[i].mesh){
                currentPlanet = null
                resetCamera()
                renderButtonsList(list)
            }else{
                resetCamera()
                currentPlanet = list[i].mesh
            }
            renderButtonsList(list)
        }
        getHtmlButtonList?.appendChild(button)
    })
}

function renderPlanetList(list : {name: string, mesh ?: PlanetPhysics}[]){

    const ui = list.map((x) =>
        `<div class="p-3 bg-gray-100 rounded-xl border-2">
            <p class="font-semibold text-base">
                ${x.name}
            </p>
            <div class="grid grid-cols-2 gap-2 mt-3">
                <h1 class=" text-xs font-semibold text-gray-800">
                Position
                </h1>
                <p class="text-xs text-gray-500">
                (${x.mesh.mesh().position.x.toFixed(2)}, ${x.mesh.mesh().position.y.toFixed(2)}, ${x.mesh.mesh().position.z.toFixed(2)})
                </p>
            </div>
            <div class="w-full flex justify-end">
                <button class="delete-button bg-red-500 text-white p-2 text-xs cursor-pointer mt-4 rounded-xl font-semibold w-fit">
                    Eliminar
                </button>
            </div>
        </div>`
    )

    const getHtmlList = document.getElementById("planet-list")
    getHtmlList.innerHTML = ""
    ui.forEach((item, i) => {
        const button = document.createElement("div");
        button.innerHTML = item
        const remove = button.querySelector(".delete-button")
        console.log(remove)
        remove?.addEventListener("click", () => {
            planets = list.filter((x) =>
                x.name != list[i].name
            )
            scene.remove(list[i].mesh.mesh())
            scene.remove(list[i].mesh.orbitMesh())
            renderButtonsList(planets)
            renderPlanetList(planets)
        })

        getHtmlList.appendChild(button)
    })

}





const loader = new GLTFLoader();
let spaceShip = null;
loader.load(
    './public/ship.gltf', // Path to your model file
    (gltf) => {
        const m = gltf.scene;
        scene.add(m);
        spaceShip = m;
        m.position.set(20, 0, -500);
        m.scale.set(2, 2, 2);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.error('An error occurred while loading the model:', error);
    }
);


let moveForward = false;
let moveBackward = false;
let rotateLeft = false;
let rotateRight = false;

// Escuchar eventos de teclado para W, S, A y D
window.addEventListener("keydown", (event) => {
    if (currentPlanet?.spacial && spaceShip) {
        switch (event.key.toLowerCase()) {
            case "w":
                moveForward = true;
                break;
            case "s":
                moveBackward = true;
                break;
            case "a":
                rotateLeft = true;
                break;
            case "d":
                rotateRight = true;
                break;
        }
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key.toLowerCase()) {
        case "w":
            moveForward = false;
            break;
        case "s":
            moveBackward = false;
            break;
        case "a":
            rotateLeft = false;
            break;
        case "d":
            rotateRight = false;
            break;
    }
});

function moveAndRotateSpaceShip() {
    if (spaceShip) {
        const direction = new THREE.Vector3();
        spaceShip.getWorldDirection(direction); // Obtener la dirección de la nave

        // Mover hacia adelante y atrás
        if (moveForward) spaceShip.position.add(direction.multiplyScalar(0.5));
        if (moveBackward) spaceShip.position.add(direction.multiplyScalar(-0.5));
        if (rotateLeft) {
            spaceShip.rotation.y += 0.05;
            cameraPivot.rotation.y += 0.05; // Gira el pivote para que la cámara gire con la nave
        }
        if (rotateRight) {
            spaceShip.rotation.y -= 0.05;
            cameraPivot.rotation.y -= 0.05;
        }
        cameraPivot.position.copy(spaceShip.position);
    }
}

renderButtonsList(planets)
renderPlanetList(planets)

let dt = 0.01;
function animate() {
    sun.mesh().rotateY(dt);

    planets.forEach(x => {
        x.mesh.updatePosition(0.01)
    })
    if(currentPlanet && currentPlanet.mesh){
        camera.position.set(currentPlanet.mesh().position.x, currentPlanet.mesh().position.y + 20, currentPlanet.mesh().position.z)
        camera.lookAt(currentPlanet.mesh().position)
    }

    if(currentPlanet?.spacial && spaceShip){
        moveAndRotateSpaceShip()
        camera.position.set(0, 9, -20);
        camera.lookAt(spaceShip.position)
        camera.position.y += 9
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}


animate();



