import { Canvas, useThree } from "@react-three/fiber";
import Scene from "./Components/Scene";
import { Loader, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useControls } from "leva";
import StartScreenContent from "./Components/StartScreenContent";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_CAMERA_POSITION = [-0.8, 0.78, -1.8];
const DEFAULT_CAMERA_ROTATION = [0.3, 3.6, 0.13];
const ENGINE_CAMERA_POSITION = [0, 0.56, -0.9];
const ENGINE_CAMERA_ROTATION = [0.5, 3.14, 0];

function App() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const startScreenContentRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Group>(null);
  const scrollCard = useRef<HTMLDivElement>(null);
  const [registerScrollTrigger, setRegisterScrollTrigger] = useState(false);

  const [increaseLight, setIncreaseLight] = useState(false);

  // const { positionX, positionY, positionZ, rotationX, rotationY, rotationZ } =
  //   useControls({
  //     positionX: {
  //       value: -0.8,
  //       min: -100,
  //       max: 100,
  //       step: 0.007,
  //     },
  //     positionY: {
  //       value: 0.78,
  //       min: -100,
  //       max: 100,
  //       step: 0.002,
  //     },
  //     positionZ: {
  //       value: -1.8,
  //       min: -100,
  //       max: 100,
  //       step: 0.002,
  //     },
  //     rotationX: {
  //       value: 0.3,
  //       min: -100,
  //       max: 100,
  //       step: 0.002,
  //     },

  //     rotationY: {
  //       value: 3.6,
  //       min: -100,
  //       max: 100,
  //       step: 0.002,
  //     },
  //     rotationZ: {
  //       value: 0.13,
  //       min: -100,
  //       max: 100,
  //       step: 0.002,
  //     },
  //   });

  useGSAP(() => {
    if (
      !registerScrollTrigger ||
      !sceneRef.current ||
      !scrollCard.current ||
      !cameraRef.current
    )
      return;

    gsap.fromTo(
      cameraRef.current?.position,
      {
        x: DEFAULT_CAMERA_POSITION[0],
        y: DEFAULT_CAMERA_POSITION[1],
        z: DEFAULT_CAMERA_POSITION[2],
      },
      {
        x: ENGINE_CAMERA_POSITION[0],
        y: ENGINE_CAMERA_POSITION[1],
        z: ENGINE_CAMERA_POSITION[2],
        duration: 4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scrollCard.current,
          start: "10% top",
          end: "65% 50%",
          scrub: true,
          markers: true,
        },
      }
    );
    gsap.to(cameraRef.current?.rotation, {
      x: ENGINE_CAMERA_ROTATION[0],
      y: ENGINE_CAMERA_ROTATION[1],
      z: ENGINE_CAMERA_ROTATION[2],
      duration: 4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: scrollCard.current,
        start: "10% top",
        end: "65% 50%",
        scrub: true,
        markers: true,
      },
    });
    gsap.to(startScreenContentRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: scrollCard.current,
        start: "10% top",
        end: "65% 50%",
        scrub: true,
        markers: true,
      },
      onComplete: () => setIncreaseLight(true),
    });
  }, [registerScrollTrigger]);

  return (
    <Suspense fallback={<Loader />}>
      <div className="h-screen">
        <StartScreenContent ref={startScreenContentRef} />
        <section
          className="bg-[#000000] h-[200%] w-full -z-20 relative"
          ref={scrollCard}
        ></section>
        <section className="w-screen fixed -z-10 inset-0 h-screen ">
          <Canvas className="" shadows>
            {/* <HeroText /> */}
            <PerspectiveCamera
              ref={cameraRef}
              makeDefault
              position={[
                DEFAULT_CAMERA_POSITION[0],
                DEFAULT_CAMERA_POSITION[1],
                DEFAULT_CAMERA_POSITION[2],
              ]}
              fov={50}
              rotation={[
                DEFAULT_CAMERA_ROTATION[0],
                DEFAULT_CAMERA_ROTATION[1],
                DEFAULT_CAMERA_ROTATION[2],
              ]}
            />
            {/* <PerspectiveCamera
              ref={cameraRef}
              makeDefault
              position={[-0.8, 0.78, -1.8]}
              fov={50}
              rotation={[0.3, 3.6, 0.13]}
              /> */}

            {/* <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              maxPolarAngle={Math.PI / 2}
            /> */}

            <Scene
              position={[0, 0, 0]}
              // scale={[0.7, 0.7, 0.7]}
              cameraRef={cameraRef}
              ref={sceneRef}
              setRegisterScrollTrigger={setRegisterScrollTrigger}
              increaseLight={increaseLight}
            />
          </Canvas>
        </section>

        {/* <section
          className="relative top-[150%] h-[50%] z-0 bg-amber-300"
          ref={scrollCard}
        ></section> */}
      </div>
    </Suspense>
  );
}

export default App;
