import { useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { CameraShake } from "@react-three/drei";

import "./App.css";

function HeaderText(props) {
  return (
    <mesh position={props.positionBox}>
      <boxBufferGeometry attach="geometry" />

      {/* <meshLambertMaterial attach="material" color="blue" /> */}
      <meshPhongMaterial attach="material" color="green" />
    </mesh>
  );
}

function App() {
  const [upArrowCSS, setUpArrowCSS] = useState("ButtonArrowUp");
  const [rotateAxis, setRotateAxis] = useState(1);
  const [positionBox, setPositionBox] = useState([1, rotateAxis, 1]);

  function handleButton(evt) {
    console.log("handled");
    setRotateAxis(rotateAxis + 1);
    setPositionBox([1, rotateAxis, 1]);
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
    setRotateAxis(rotateAxis + 1);
    setPositionBox([1, rotateAxis, 1]);
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
            camera={{ fov: 30, position: [0, 20, 35] }}
          >
            <directionalLight position={[1, 1, 1]} />
            <OrbitControls />
            <ambientLight intensity={1.5} color={"white"} />
            <spotLight position={[60, 900, -9]} color={"white"} angle={90.9} />
            <HeaderText positionBox={positionBox} />
          </Canvas>
        </div>
        <div className="Details_Container">
          <div className="Details_Keys_Container">
            <div className="Details_Keys">
              <div className="Details_Keys_Up">
                <button
                  className="ButtonArrowUp"
                  onClick={(e) => {
                    handleButton();
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
                    handleButton();
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
          <div className="Details_Links">export link</div>
        </div>
      </div>
      <footer>footer</footer>
    </div>
  );
}

export default App;
