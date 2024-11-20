import * as THREE from 'three';
const { createApp, ref } = Vue
import {Jupiter, Mars, Mercury, Moon, Neptune, Planet, Saturn, Uranus, Venus} from "./planets/Planet.ts";
import {Sun} from "./planets/Sun.ts";
import {PlanetPhysics} from "./planets/physics.ts";
import {createOrbitPath, setupCameraControls, setupRenderer} from "./planets/utils.ts";
import {Earth} from "./planets/Earth.ts";
import {ShaderMaterial, TextureLoader} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import axios from 'axios';
import {ParametricGeometries} from "three/examples/jsm/geometries/ParametricGeometries";
import plane = ParametricGeometries.plane;

async function main() {
    async function getShader(name) {
        const response = await axios.get(name)
        return response.data as string
    }

    const sunShader = await getShader("sunShader.glsl");
    const planetShader = await getShader("planettexture1.glsl");
    const planetShader2 = await getShader("planettexture2.glsl");
    const seaVertex = await getShader("seaVertex.glsl");
    const seaFragment = await getShader("seaFragment.glsl");


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


    camera.position.set(0, 125, 0)
    camera.lookAt(0, 0, 0)

    const sun = new Sun()
    sun.addToScene(scene)

    const mars = new Mars();
    const marsPhysics = new PlanetPhysics(mars.mesh(), {
        radius: 400,
        rotationCenter: new THREE.Vector3(0, 0),
        drawOrbit: true,
        rotationVelocity: 0,
        selfRotationVelocity: 0.05,
        orbitInclination: 0,
        orbitStrength: 5,
        orbitColor: 0xb55228
    });
    mars.mesh().position.set(400, 0, 0)


    marsPhysics.addToScene(scene)

    const earth = new Earth();
    const earthPhysics = new PlanetPhysics(earth.mesh(), {
        radius: 80,
        rotationCenter: new THREE.Vector3(0, 0),
        drawOrbit: true,
        rotationVelocity: 1,
        selfRotationVelocity: 2,
        orbitInclination: 0,
        orbitStrength: 5,
        orbitColor: 0xff9321
    });
    earth.mesh().position.set(100, 0, 0);

    const moon = new Moon();
    earth.mesh().add(moon.mesh());
    moon.mesh().position.set(10, 0, 0);


    const moonOrbit = createOrbitPath(10, 0xaaaaaa, 1);
    earth.mesh().add(moonOrbit);

    earthPhysics.addToScene(scene);

    earthPhysics.addToScene(scene);

    const mercury = new Mercury();
    const mercuryPhysics = new PlanetPhysics(mercury.mesh(), {
        radius: 40,
        rotationCenter: new THREE.Vector3(0, 0),
        drawOrbit: true,
        rotationVelocity: 0.8,
        selfRotationVelocity: 3,
        orbitInclination: 0,
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
        orbitInclination: 0,
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
        selfRotationVelocity: 1.2,
        orbitInclination: 20,
        orbitStrength: 5,
        orbitColor: 0xf2bb83
    });
    jupyter.mesh().position.set(100, 0, 0)
    const moon2 = new Moon();
    jupyter.mesh().add(moon2.mesh());
    moon2.mesh().position.set(20, 0, 0);
    const moonOrbit2 = createOrbitPath(20, 0xaaaaaa, 1);
    jupyter.mesh().add(moonOrbit2);
    jupyterPhysics.addToScene(scene)

    const saturn = new Saturn();
    const saturnPhysics = new PlanetPhysics(saturn.mesh(), {
        radius: 175,
        rotationCenter: new THREE.Vector3(0, 0),
        drawOrbit: true,
        rotationVelocity: 0.6,
        selfRotationVelocity: 3,
        orbitInclination: -10,
        orbitStrength: 5,
        orbitColor: 0xffa378
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
        orbitInclination: 5,
        orbitStrength: 5,
        orbitColor: 0x9cdbff
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
        orbitInclination: -20,
        orbitStrength: 5,
        orbitColor: 0x2474ff
    });
    neptunePhysics.addToScene(scene)
    neptune.mesh().position.set(100, 0, 0)

    var planets = [
        {
            "name": "mercury",
            "mesh": mercuryPhysics
        },
        {
            "name": "venus",
            "mesh": venusPhysics
        },
        {
            "name": "earth",
            "mesh": earthPhysics
        },
        {
            "name": "mars",
            "mesh": marsPhysics
        },
        {
            "name": "jupyter",
            "mesh": jupyterPhysics
        },
        {
            "name": "saturn",
            "mesh": saturnPhysics
        },
        {
            "name": "uranus",
            "mesh": uranusPhysics
        },
        {
            "name": "neptune",
            "mesh": neptunePhysics
        },
    ]


    function resetSpaceship() {
        spaceShip.position.set(20, 0, -500);
        spaceShip.scale.set(0.05, 0.05, 0.05);
        spaceShip.rotation.set(0, 0, 0)
    }

    function resetCamera() {
        resetSpaceship()
        controls.reset()
        cameraPivot.rotation.set(0, 0, 0)
        cameraPivot.position.set(0, 0, 0)
        camera.rotation.set(0, 0, 0)
        camera.position.set(0, 325, 0)
        camera.lookAt(0, 0, 0)
    }


    function renderButtonsList(list: { name: string, mesh?: PlanetPhysics }[]) {
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
            <div class="${currentPlanet?.spacial && "!bg-blue-100 !text-blue-500 !border-blue-500"} text-gray-800 p-3 hover:bg-gray-200 border-2 cursor-pointer bg-gray-100 rounded-xl text-center font-semibold">
                Nave espacial
            </div>
        `;
        spacialButton.onclick = function () {
            currentPlanet = {
                mesh: null,
                spacial: true
            }
            resetCamera()
            renderButtonsList(list)
        }
        getHtmlButtonList.appendChild(spacialButton);

        uiButtons.forEach((item, i) => {
            const button = document.createElement("div");
            button.innerHTML = item
            button.onclick = () => {
                if (currentPlanet == list[i].mesh) {
                    currentPlanet = null
                    resetCamera()
                    renderButtonsList(list)
                } else {
                    resetCamera()
                    currentPlanet = list[i].mesh
                }
                renderButtonsList(list)
            }
            getHtmlButtonList?.appendChild(button)
        })
    }

    function renderPlanetList(list: { name: string, mesh?: PlanetPhysics }[]) {

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
            spaceShip.getWorldDirection(direction);

            const tiltAngle = 0.4;
            const forwardTiltAngle = 0.2;
            const tiltSpeed = 0.03;
            spaceShip.position.add(direction.multiplyScalar(0.3));

            if (moveBackward) {
                spaceShip.rotation.x = THREE.MathUtils.lerp(spaceShip.rotation.x, forwardTiltAngle, tiltSpeed);
            } else if (moveForward) {
                spaceShip.rotation.x = THREE.MathUtils.lerp(spaceShip.rotation.x, -forwardTiltAngle, tiltSpeed);
            } else {
                spaceShip.rotation.x = THREE.MathUtils.lerp(spaceShip.rotation.x, 0, tiltSpeed);
            }

            if (rotateLeft) {
                spaceShip.rotation.y += 0.005;
                cameraPivot.rotation.y += 0.005;
                spaceShip.rotation.z = THREE.MathUtils.lerp(spaceShip.rotation.z, -tiltAngle, tiltSpeed);
            } else if (rotateRight) {
                spaceShip.rotation.y -= 0.005;
                cameraPivot.rotation.y -= 0.005;
                spaceShip.rotation.z = THREE.MathUtils.lerp(spaceShip.rotation.z, tiltAngle, tiltSpeed);
            } else {
                spaceShip.rotation.z = THREE.MathUtils.lerp(spaceShip.rotation.z, 0, tiltSpeed);
            }

            cameraPivot.position.copy(spaceShip.position);
        }
    }


    renderButtonsList(planets)
    renderPlanetList(planets)

    function getMousePosition() {
        let mousePosition = [0, 0];

        document.addEventListener('mousemove', (event) => {
            mousePosition[0] = event.clientX;
            mousePosition[1] = event.clientY;
        });

        return function () {
            return [...mousePosition];
        };
    }

    const mouse = getMousePosition();


    let dt = 0.01;
    var t = 0;

    function animate() {
        sun.mesh().rotateY(dt);
        const debugObject = {}
        debugObject.depthColor = "#186691"
        debugObject.surfaceColor = "#9bd8ff"
        planets.forEach((x, i) => {
            if(i == 3){
                x.mesh.mesh().material =  new THREE.ShaderMaterial({
                    fragmentShader: seaFragment,
                    vertexShader: seaVertex,
                    uniforms:{
                        uTime: {
                            value: t/100.0
                        },
                        uBigWavesElevation: { value:0.08},
                        uBigWavesFrequency: {value: new THREE.Vector2(1,1.5)},
                        uBigWavesSpeed: {value: 0.75},
                        uSmallWavesElevation: {value:0.15},
                        uSmallWavesFrequency: {value:3},
                        uSmallWavesSpeed: {value:0.2},
                        uSmallWavesIterations: {value: 4},
                        uDepthColor: {value: new THREE.Color(debugObject.depthColor)},
                        uSurfaceColor: {value: new THREE.Color(debugObject.surfaceColor)},
                        uColorOffset: {value: 0.08},
                        uColorMultiplier: {value: 5},
                    }
                });
            }
            if(i == 1){
                x.mesh.mesh().material =  new THREE.ShaderMaterial({
                    fragmentShader: planetShader2,
                    vertexShader:  `
            varying vec2 vUv;

            void main() {
            vUv = uv;

            vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * modelViewPosition;
        }
        `,
                    uniforms : {
                        "mouse_position": new THREE.Uniform(mouse()),
                        "time": new THREE.Uniform(t/100),
                        "resolution": new THREE.Uniform([window.innerWidth, window.innerHeight]),
                        "zoom" : camera.position.distanceTo(new THREE.Vector3(0, 0, 0)),
                        "u_texture": {
                            value: venus.texture
                        }
                    }
                });
            }
            if(i == 0){
                x.mesh.mesh().material =  new THREE.ShaderMaterial({
                    fragmentShader: planetShader,
                    vertexShader:  `
            varying vec2 vUv;

            void main() {
            vUv = uv;

            vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * modelViewPosition;
        }
        `,
                    uniforms : {
                        "mouse_position": new THREE.Uniform(mouse()),
                        "time": new THREE.Uniform(t/100),
                        "resolution": new THREE.Uniform([window.innerWidth, window.innerHeight]),
                        "zoom" : camera.position.distanceTo(new THREE.Vector3(0, 0, 0)),
                        "u_texture": {
                            value: x.mesh.mesh().texture
                        }
                    }
                });
            }
            x.mesh.updatePosition(0.01)

        })
        if (currentPlanet && currentPlanet.mesh) {
            camera.position.set(currentPlanet.mesh().position.x, currentPlanet.mesh().position.y + 20, currentPlanet.mesh().position.z)
            camera.lookAt(currentPlanet.mesh().position)
        }

        if (currentPlanet?.spacial && spaceShip) {
            moveAndRotateSpaceShip()
            camera.position.set(0, 0, -0.7);
            camera.lookAt(spaceShip.position)
            camera.position.y += 0.3
        }
        t+=1;
        sun.mesh().material =  new THREE.ShaderMaterial({
            fragmentShader: sunShader,
            vertexShader:  `
            varying vec2 vUv;

            void main() {
            vUv = uv;

            vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * modelViewPosition;
        }
        `,
            uniforms : {
                "mouse_position": new THREE.Uniform(mouse()),
                "time": new THREE.Uniform(t/100),
                "resolution": new THREE.Uniform([window.innerWidth, window.innerHeight]),
                "zoom" : camera.position.distanceTo(new THREE.Vector3(0, 0, 0)),
                "u_texture": {
                    value: sun.texture
                }
            }
        });
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

    }


    animate();
}
main();