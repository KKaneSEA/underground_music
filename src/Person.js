import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useAnimations, OrbitControls, Environment } from "@react-three/drei";
import { useGLTF, CameraShake } from "@react-three/drei";
import "./styles/App.scss";
import { useRef, useEffect } from "react";
import { Debug, RigidBody, Physics } from "@react-three/rapier";

export default function Person(props) {
  const personUnderground = useGLTF("./models/personUndergroundMusic.glb");

  const personRef = useRef();

  // const personJump = () => {
  //   const mass = personRef.current.mass();
  //   // console.log(mass);
  //   // console.log(cube.current);
  //   personRef.current.applyImpulse({ x: -2, y: 5 * mass, z: 0 });
  //   personRef.current.applyTorqueImpulse({
  //     x: Math.random() - 0.5,
  //     y: 1,
  //     z: 0,
  //   });
  // };

  function personJump() {
    // const mass = personRef.current.mass();

    // personRef.current.applyImpulse({ x: -20, y: 90, z: 0 });
    console.log("jump");
    console.log(personRef.current);

    // personRef.current.applyTorqueImpulse({
    //   x: Math.random() - 0.5,
    //   y: 5,
    //   z: 0,
    // });
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const eulerRotation = new THREE.Euler(5, time * 6, 0);

    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    personRef.current.setNextKinematicTranslation(quaternionRotation);
  });

  return (
    <>
      <RigidBody
        canSleep={false}
        type="kinematicPosition"
        ref={personRef}
        onClick={personJump}
      >
        <primitive
          object={personUnderground.scene}
          position={[-29.5, 7.5, 36.9]}
        />{" "}
      </RigidBody>
    </>
  );
}
