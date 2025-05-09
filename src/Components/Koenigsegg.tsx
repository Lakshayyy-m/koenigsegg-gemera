import { useGSAP } from "@gsap/react";
import { useGLTF } from "@react-three/drei";

import { forwardRef, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const Koenigsegg = forwardRef((props, ref) => {
  const { scene } = useGLTF("/assets/koenigsegg.glb");
  const lightRef = useRef<THREE.SpotLight>(null);

  useGSAP(() => {
    gsap.to(lightRef.current!.position, {
      duration: 5,
      x: 0,

      z: 0,
      repeat: -1,
      yoyo: true,
    });
  });

  return (
    <group scale={0.2} ref={ref} {...props}>
      <spotLight
        intensity={521}
        angle={Math.PI / 16}
        penumbra={1}
        castShadow
        position={[13, 20, 21]}
        ref={lightRef}
        target={scene}
        color={0x1a17c4}
      />
      <ambientLight intensity={0} />
      <primitive object={scene} castShadow />
    </group>
  );
});

export default Koenigsegg;
