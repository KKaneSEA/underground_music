import { useRef, Suspense, useState, useEffect } from "react";
import Loading from "./Loading.js";
import Person from "./Person.js";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useAnimations, OrbitControls, Environment } from "@react-three/drei";
import { useGLTF, CameraShake } from "@react-three/drei";
import "./styles/App.scss";
import { Debug, RigidBody, Physics } from "@react-three/rapier";
import useSound from "use-sound";
import sound1 from "./sounds/sound1.mp3";

let emptyScene = [];

// function Model(positionBox) {
//   const { scene } = useLoader(GLTFLoader, "./models/undergroundmusic.glb");
//   console.log(scene);
//   console.log(scene.children[2]);
//   emptyScene = scene.children[2];
//   // emptyScene.rotation.y = 45;
//   console.log(emptyScene);
//   return (
//     <primitive
//       object={scene}
//       position={[-29.5, 7.5, 45.9]}

//       // rotation={props.positionBox}
//     />
//   );
// }

// function HeaderText(props) {
//   return (
//     <mesh position={props.positionBox}>
//       <boxBufferGeometry attach="geometry" />

//       {/* <meshLambertMaterial attach="material" color="blue" /> */}
//       <meshPhongMaterial attach="material" color="green" />
//     </mesh>
//   );
// }

function Env() {
  return <Environment files="./images/OmKHPark_EnvM.hdr" />;
}

function App() {
  const [rotateY, setRotateY] = useState(0);
  const modelUnderground = useGLTF("./models/otherUndergroundMusic.glb");
  const bricksUnderground = useGLTF("./models/bricksUndergroundMusic.glb");

  const brickRef = useRef();
  const personRef = useRef();

  // const personUnderground = useGLTF("./models/personUndergroundMusic.glb");

  // const animationPerson = useAnimations(
  //   personUnderground.animations,
  //   personUnderground.scene
  // );

  // console.log(personUnderground);
  // console.log("here");

  let sceneRotate = modelUnderground.scene.children[2];
  let bricksRotateY = bricksUnderground.scene.children[2];

  sceneRotate.rotation.y = rotateY;
  bricksRotateY.rotation.y = rotateY;
  brickRef.rotation = { x: 0, y: 0, z: 0 };
  console.log(brickRef);

  const [upArrowCSS, setUpArrowCSS] = useState("ButtonArrowUp");
  // const [rotateAxis, setRotateAxis] = useState(45);
  // const [positionBox, setPositionBox] = useState([1, rotateAxis, 1]);
  // const [positionBox, setPositionBox] = useState(rotateAxis);
  // const [keepPositionBox, setKeepPositionBox] = useState();
  // const gltf = useLoader(GLTFLoader, "./models/undergroundmusic.glb");
  const [play] = useSound(sound1);

  // useEffect(() => {
  //   function changepPositionBox(rotateAxis) {
  //     setPositionBox([1, rotateAxis, 1]);
  //   }
  //   changepPositionBox(rotateAxis);
  // }, [rotateAxis]);

  function handleButton(evt) {
    console.log("handled");
    play();

    // personRef.current.applyTorqueImpulse({
    //   x: Math.random() - 0.5,
    //   y: 1,
    //   z: 0,
    // });

    // setRotateAxis(rotateAxis + 1);
    // setPositionBox([1, rotateAxis, 1]);
  }

  // const personJump = () => {
  //   // const mass = personRef.current.mass();
  //   // console.log(mass);
  //   // console.log(cube.current);
  //   personRef.current.applyImpulse({ x: -2, y: 5, z: 0 });
  //   personRef.current.applyTorqueImpulse({
  //     x: Math.random() - 0.5,
  //     y: 1,
  //     z: 0,
  //   });
  // };

  function handleButtonUp(evt) {
    console.log("handled up");
    // setRotateAxis(rotateAxis + 1);
    // setPositionBox([1, rotateAxis, 1]);
    setRotateY(rotateY - 0.02);
  }

  function handleButtonDown(evt) {
    console.log("handled down");
    // setRotateAxis(rotateAxis - 1);
    // setPositionBox([1, rotateAxis, 1]);
    setRotateY(rotateY + 0.02);
  }

  function handleKey(e) {
    console.log(e.key);
    let x = e.key;
    if (
      x === "ArrowUp" ||
      x === "ArrowLeft" ||
      x === "ArrowRight" ||
      x === "ArrowDown"
    )
      // handleButton(e);
      console.log("enter submitted");
    console.log(`Button${x}`);
    // setRotateAxis(rotateAxis + 1);
    // setPositionBox([1, rotateAxis, 1]);
    // setUpArrowCSS(`Button${x}:focus`);
    // console.log(upArrowCSS);
  }

  return (
    <div
      className="App"
      onKeyDown={(e) => {
        handleKey(e);
        console.log(e);
      }}
    >
      <header className="Header">UNDERGROUND MUSIC</header>
      <div className="Body_Container">
        <div className="Canvas">
          {" "}
          <Canvas
            className="Three_Canvas"
            camera={{ fov: 85, position: [15.5, 12, 37] }}
          >
            <directionalLight
              position={[1, 1, 1]}
              color={"white"}
              angle={-10.9}
            />
            {/* <OrbitControls /> */}
            <Env />

            {/* <spotLight position={[20, 900, -9]} color={"grey"} angle={90.9} /> */}

            {/* <HeaderText positionBox={positionBox} /> */}

            {/* <Model positionBox={positionBox} /> */}

            <Suspense fallback={<Loading position-y={1.0} scale={[5, 5, 5]} />}>
              <Physics>
                <Debug />

                <RigidBody>
                  <primitive
                    object={modelUnderground.scene}
                    position={[-29.5, 7.5, 35.9]}
                  />
                </RigidBody>

                <RigidBody type="kinematicPosition" ref={brickRef}>
                  <primitive
                    object={bricksUnderground.scene}
                    position={[-29.5, 7.5, 36.9]}
                  />
                </RigidBody>

                <Person />
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
                      handleButton();
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
                      handleButton();
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
          <div className="Details_Links">test</div>
        </div>
      </div>
      <footer>footer</footer>
    </div>
  );
}

export default App;
