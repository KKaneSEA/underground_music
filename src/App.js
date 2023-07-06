import { useRef, Suspense, useState, useEffect } from "react";
import Loading from "./Loading.js";
import Person from "./Person.js";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useAnimations, OrbitControls, Environment } from "@react-three/drei";
import { useGLTF, CameraShake } from "@react-three/drei";
import "./styles/App.scss";
import {
  Debug,
  RigidBody,
  Physics,
  CylinderCollider,
  CuboidCollider,
} from "@react-three/rapier";
import useSound from "use-sound";
import sound1 from "./sounds/u1.mp3";
import sound2 from "./sounds/u2.mp3";
import sound3 from "./sounds/u3.mp3";
import sound4 from "./sounds/u4.mp3";
import sound5 from "./sounds/u5.mp3";
import sound6 from "./sounds/u6.mp3";

let emptyScene = [];

function Env() {
  return <Environment files="./images/OmKHPark_EnvM.hdr" />;
}

function App() {
  const [rotateY, setRotateY] = useState(0);
  const [jumpLeft, setJumpLeft] = useState(0);
  const [jumpRight, setJumpRight] = useState(0);
  const [soundState, setSoundState] = useState(true);
  const [playSound, setPlaySound] = useState(false);

  const modelUnderground = useGLTF("./models/otherUndergroundMusic.glb");
  const bricksUnderground = useGLTF("./models/bricksUndergroundMusic.glb");

  const brickRef = useRef();

  let sceneRotate = modelUnderground.scene.children[2];
  let bricksRotateY = bricksUnderground.scene.children[2];

  sceneRotate.rotation.y = rotateY;
  bricksRotateY.rotation.y = rotateY;
  brickRef.rotation = { x: 0, y: 0, z: 0 };

  const soundArray = [sound1, sound2, sound3, sound4, sound5, sound6];

  function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  const [play, { pause }] = useSound(randomItem(soundArray));

  function toggleSoundState() {
    setSoundState(!soundState);
    pause();
  }

  function handleButtonLeft() {
    if (soundState === false) {
      play();
    }
    setJumpLeft(jumpLeft + 1);
  }

  function handleButtonRight() {
    if (soundState === false) {
      play();
    }
    setJumpRight(jumpRight + 1);
  }

  function handleButtonUp(evt) {
    setRotateY(rotateY - 0.02);
  }

  function handleButtonDown(evt) {
    setRotateY(rotateY + 0.02);
  }

  // function handleKey(e) {
  //   console.log(e.key);
  //   let x = e.key;

  //   if (x === "ArrowLeft") handleButtonLeft();
  //   else return;
  //   // if (
  //   //   x === "ArrowUp" ||
  //   //   x === "ArrowLeft" ||
  //   //   x === "ArrowRight" ||
  //   //   x === "ArrowDown"
  //   // )
  //   // handleButton(e);
  //   console.log("enter submitted");
  //   console.log(`Button${x}`);
  // }

  return (
    <div
      className="App"
      // onKeyDown={(e) => {
      //   // handleKey(e);
      //   console.log(e);
      // }}
    >
      <header className="Header">UNDERGROUND MUSIC</header>
      <div className="Body_Container">
        <div className="Canvas">
          {" "}
          <Canvas
            className="Three_Canvas"
            camera={{ fov: 75, position: [15.5, 12, 37.7] }}
          >
            <directionalLight
              position={[90, 70, -20]}
              color={"white"}
              angle={-7}
              intensity={0.5}
            />

            <Env />

            {/* <spotLight
              position={[20, 90, -9]}
              color={"grey"}
              angle={900.9}
              intensity={0.5}
            /> */}

            <Suspense fallback={<Loading position-y={1.0} scale={[5, 5, 5]} />}>
              <Physics>
                <RigidBody type="fixed">
                  <primitive
                    object={modelUnderground.scene}
                    position={[-29.8, 7.5, 35.9]}
                  />
                </RigidBody>

                {/* <RigidBody
                  type="fixed"
                  ref={brickRef}
                  // colliders={false}
                  // onCollisionEnter={collisionEnter}
                > */}

                <primitive
                  object={bricksUnderground.scene}
                  position={[-29.5, 7.5, 36.9]}
                />
                {/* </RigidBody> */}

                <Person jumpLeft={jumpLeft} jumpRight={jumpRight} />
              </Physics>
            </Suspense>
          </Canvas>
        </div>
        <div className="Details_Container">
          <div className="Details_Keys_Container">
            <div className="Details_Keys">
              <div className="Details_Keys_Up">
                <button
                  className="ButtonArrowUp"
                  onClick={(e) => {
                    handleButtonUp();
                  }}
                >
                  <img
                    className="Up_Arrow"
                    src="./images/chevron-up-circle.svg"
                    alt="Up Arrow"
                  />{" "}
                </button>
              </div>
              <div className="Details_Keys_Side">
                <div className="Details_Keys_Side_Left">
                  <button
                    className="ButtonArrowLeft"
                    onClick={(e) => {
                      handleButtonLeft();
                    }}
                  >
                    <img
                      className="Left_Arrow"
                      src="./images/chevron-left-circle.svg"
                      alt="Left Arrow"
                    />
                  </button>
                </div>
                <div className="Details_Keys_Side_Right">
                  <button
                    className="ButtonArrowRight"
                    onClick={(e) => {
                      handleButtonRight();
                    }}
                  >
                    <img
                      className="Right_Arrow"
                      src="./images/chevron-right-circle.svg"
                      alt="Right Arrow"
                    />
                  </button>
                </div>
              </div>
              <div className="Details_Keys_Down">
                <button
                  className="ButtonArrowDown"
                  onClick={(e) => {
                    handleButtonDown();
                  }}
                >
                  <img
                    className="Down_Arrow"
                    src="./images/chevron-down-circle.svg"
                    alt="Down Arrow"
                  />{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="Details_Links">
            click an arrow to play
            <div className="Sound">
              {" "}
              <p className="Sound_Text">sound {soundState ? "off" : "on"}</p>
              <label className="switch">
                <input
                  type="checkbox"
                  onClick={(e) => {
                    toggleSoundState();
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <footer className="Footer"></footer>
    </div>
  );
}

export default App;
