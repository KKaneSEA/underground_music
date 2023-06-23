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

  const personJump = () => {
    const mass = personRef.current.mass();
    // console.log(mass);
    // console.log(cube.current);
    personRef.current.applyImpulse({ x: -2, y: 5 * mass, z: 0 });
    personRef.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: 1,
      z: 0,
    });
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const eulerRotation = new THREE.Euler(0, time * 6, 0);

    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    personRef.current.setNextKinematicTranslation(quaternionRotation);

    // const angle = time * 0.5;
    // const x = Math.cos(angle) * 2;
    // const z = Math.sin(angle) * 2;
    // twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z });
  });

  // useEffect(() => {
  //   const action = animationPerson.actions.PersonAction;
  //   action.play();
  //   console.log(personRef.current);
  // }, []);

  //   useFrame(() => {
  //     const action = animationPerson.actions.PersonAction;
  //     action.play();
  //     console.log(personRef);
  //     console.log(action);
  //     personRef.current.applyImpulse(action);
  //   });

  return (
    <>
      <RigidBody type="kinematicPosition" ref={personRef}>
        <primitive
          object={personUnderground.scene}
          position={[-29.5, 7.5, 36.9]}
        />{" "}
      </RigidBody>
    </>
  );
}
