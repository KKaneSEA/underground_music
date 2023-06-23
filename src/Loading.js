import "./styles/App.scss";

import { Text, Center } from "@react-three/drei";
import * as THREE from "three";
export default function Loading() {
  return (
    <>
      <Text color="yellow" fontSize={3}>
        loading...
      </Text>
    </>
  );
}
