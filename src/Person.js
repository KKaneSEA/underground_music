import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useAnimations, OrbitControls, Environment } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import "./styles/App.scss";
import { useRef, useEffect } from "react";
import { Debug, RigidBody, Physics, CuboidCollider } from "@react-three/rapier";

export default function Person(props) {
  const personUnderground = useGLTF("./models/personUndergroundMusic.glb");

  const personRef = useRef();

  // function personJump() {
  //   // const mass = personRef.current.mass();

  //   // personRef.current.applyImpulse({ x: -20, y: 90, z: 0 });
  //   console.log("jump");
  //   console.log(personRef.current);

  //   personRef.current.setTranslation({
  //     x: 2.5,
  //     y: (Math.random() + 2.5) * 0.9,
  //     z: 0,
  //   });

  //   setTimeout(() => {
  //     personRef.current.setTranslation({ x: 0, y: 0, z: 0 });
  //   }, 175);
  // }

  // function personJumpLeft() {
  //   // const mass = personRef.current.mass();

  //   // personRef.current.applyImpulse({ x: -20, y: 90, z: 0 });
  //   console.log("jump");
  //   console.log(personRef.current);

  //   personRef.current.setTranslation({
  //     x: -2.5,
  //     y: (Math.random() + 2.5) * 0.9,
  //     z: 0,
  //   });

  //   setTimeout(() => {
  //     personRef.current.setTranslation({ x: 0, y: 0, z: 0 });
  //   }, 175);
  // }

  // useFrame((state) => {
  //   const time = state.clock.getElapsedTime();

  //   const eulerRotation = new THREE.Euler(time * 1, 0, 0);

  //   const quaternionRotation = new THREE.Quaternion();
  //   quaternionRotation.setFromEuler(eulerRotation);
  //   personRef.current.setNextKinematicTranslation(quaternionRotation);
  // });

  useEffect(() => {
    personRef.current.setTranslation({
      x: Math.random() - 5,
      // y: (Math.random() + 2.5) * 0.9,
      y: Math.random() * 3,
      z: -1,
    });

    setTimeout(() => {
      personRef.current.setTranslation({ x: -2, y: 0, z: 0 });
    }, 175);
  }, [props.jumpLeft]);

  useEffect(() => {
    personRef.current.setTranslation({
      x: Math.random() + 1.5,
      // y: (Math.random() + 2.5) * 0.9,
      y: Math.random() * 2,
      z: -2.8,
    });

    setTimeout(() => {
      personRef.current.setTranslation({ x: -1, y: 0, z: 0 });
    }, 175);
  }, [props.jumpRight]);

  return (
    <>
      <RigidBody
        canSleep={false}
        type="kinematicPosition"
        ref={personRef}
        gravityScale={1}
        colliders={false}
      >
        <CuboidCollider mass={1} args={[8, 7.5, 5]} position={[8, 5, 22]} />
        <primitive
          object={personUnderground.scene}
          position={[-29.5, 7.5, 36.9]}
        />{" "}
      </RigidBody>
    </>
  );
}
