import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { CameraShake } from "@react-three/drei";

import "./App.css";

function HeaderText() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" />

      <meshLambertMaterial attach="material" color="blue" />
    </mesh>
  );
}

function App() {
  return (
    <div className="App">
      <header className="Header">Header</header>
      <div className="Body_Container">
        <div className="Canvas">
          {" "}
          <Canvas
            className="Three_Canvas"
            camera={{ fov: 30, position: [0, 20, 35] }}
          >
            <ambientLight intensity={0.5} color={"white"} />
            <spotLight position={[60, 900, -9]} color={"white"} angle={10.9} />
            <HeaderText />
          </Canvas>
        </div>
        <div className="Details">details</div>
      </div>
      <footer>footer</footer>
    </div>
  );
}

export default App;
