import { forwardRef, useRef } from "react";
import Koenigsegg from "./Koenigsegg";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Scene = forwardRef((props, ref) => {
  const directionLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    if (directionLightRef.current) {
      if (directionLightRef.current.intensity <= 1)
        directionLightRef.current.intensity += 0.0075;
    }
  });
  return (
    <group {...props} ref={ref}>
      <directionalLight
        ref={directionLightRef}
        position={[5, 5, 5]}
        intensity={0}
      />
      <Koenigsegg />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        {/* <axesHelper /> */}
        <meshStandardMaterial color={"#141414"} />
      </mesh>
    </group>
  );
});

export default Scene;
