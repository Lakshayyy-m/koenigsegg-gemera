import { forwardRef, useEffect, useRef } from "react";
import Koenigsegg from "./Koenigsegg";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

type SceneProps = {
  cameraRef: React.RefObject<THREE.PerspectiveCamera | null>;
  position?: [number, number, number];
  setRegisterScrollTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  increaseLight?: boolean;
} & React.ComponentPropsWithRef<"group">;

const Scene = forwardRef<THREE.Group, SceneProps>(
  ({ cameraRef, ...props }, ref) => {
    const directionLightRef = useRef<THREE.DirectionalLight>(null);
    const { setRegisterScrollTrigger } = props;
    useEffect(() => {
      if (!ref) return;
      setRegisterScrollTrigger(true);
    }, [ref, setRegisterScrollTrigger]);

    useGSAP(() => {
      if (!cameraRef.current) return;
      gsap.from(cameraRef.current!.position, {
        // x: 10,
        // y: 5,
        // z: 10,
        y: -3,
        z: 0,
        x: 0,
        duration: 4,
        ease: "power2.out",
      });
    }, []);

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
      </group>
    );
  }
);

export default Scene;
