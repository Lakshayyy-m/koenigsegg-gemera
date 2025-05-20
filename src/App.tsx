import { Canvas } from "@react-three/fiber";
import Scene from "./Components/Scene";
import { Loader, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useControls } from "leva";

gsap.registerPlugin(ScrollTrigger);

const convertToSpan = (str: string, underline: boolean = false) => {
  return str.split("").map((char, i) => (
    <span className={`inline-block ${underline && "underline"}`} key={i}>
      {char}
    </span>
  ));
};

const DEFAULT_CAMERA_POSITION = [-0.8, 0.78, -1.8];
const DEFAULT_CAMERA_ROTATION = [0.3, 3.6, 0.13];
const ENGINE_CAMERA_POSITION = [0, 0.56, -0.9];
const ENGINE_CAMERA_ROTATION = [0.5, 3.14, 0];

function App() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const koenigseggRef = useRef<HTMLHeadingElement>(null);
  const gemeraRef = useRef<HTMLHeadingElement>(null);
  const sceneRef = useRef<THREE.Group>(null);
  const upcomingCardRef = useRef<HTMLDivElement>(null);
  const [registerScrollTrigger, setRegisterScrollTrigger] = useState(false);
  // const { positionX, positionY, positionZ, rotationX, rotationY, rotationZ } =
  //   useControls({
  //     positionX: {
  //       value: -0.8,
  //       min: -100,
  //       max: 100,
  //       step: 0.002,
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
    if (!registerScrollTrigger || !sceneRef.current) return;
    console.log(sceneRef.current);
    gsap.to(sceneRef.current?.rotation, {
      y: Math.PI / 2,
      scrollTrigger: {
        trigger: upcomingCardRef.current,
        start: "top 90%",
        end: "top 50%",
        scrub: true,
        markers: true,
      },
    });
  }, [registerScrollTrigger]);

  useGSAP(() => {
    if (!koenigseggRef.current || !gemeraRef.current) {
      return;
    }
    console.log(sceneRef.current);
    //Koenigsegg text animation
    gsap.from(koenigseggRef.current.children, {
      opacity: 0,
      duration: 0.4,
      scale: 1.1,
      delay: 2,
      ease: "power4.in",
      stagger: 0.05,
    });
    //Gemera text animation
    gsap.from(gemeraRef.current.children, {
      opacity: 0,
      duration: 0.6,
      scale: 1.1,
      delay: 2,
      ease: "power4.in",
      stagger: -0.05,
    });
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <div className="h-screen">
        <div>
          <h1
            className="text-white text-8xl font-['Koenigsegg'] font-bold italic fixed left-[10%] top-[3%]"
            ref={koenigseggRef}
          >
            {convertToSpan("Koenigsegg", true)}
          </h1>
          <h1
            className="text-white text-[7rem] font-['Gemera']  fixed bottom-[0%] right-[10%] "
            ref={gemeraRef}
          >
            {convertToSpan("Gemera")}
          </h1>
        </div>
        <section className="w-screen fixed -z-10 inset-0 h-screen">
          <Canvas className="" shadows>
            {/* <HeroText /> */}
            <color attach="background" args={["#0d0d0d"]} />
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
              cameraRef={cameraRef}
              ref={sceneRef}
              setRegisterScrollTrigger={setRegisterScrollTrigger}
            />
          </Canvas>
        </section>

        <section
          className="relative top-[150%] h-[50%] z-0 bg-amber-300"
          ref={upcomingCardRef}
        ></section>
      </div>
    </Suspense>
  );
}

export default App;
