import { Canvas } from "@react-three/fiber";
import Scene from "./Components/Scene";
import { Loader, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const convertToSpan = (str: string, underline: boolean = false) => {
  return str.split("").map((char, i) => (
    <span className={`inline-block ${underline && "underline"}`} key={i}>
      {char}
    </span>
  ));
};

function App() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const koenigseggRef = useRef<HTMLHeadingElement>(null);
  const gemeraRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!koenigseggRef.current) return;
    if (!gemeraRef.current) return;
    gsap.from(koenigseggRef.current.children, {
      opacity: 0,
      duration: 0.4,
      scale: 1.1,
      delay: 2,
      ease: "power4.in",
      stagger: 0.05,
    });
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
      <div className="w-screen h-screen ">
        <section>
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
        </section>
        <section className="fixed -z-10 h-screen w-screen inset-0">
          <Canvas className="w-screen h-screen" shadows>
            {/* <HeroText /> */}
            <color attach="background" args={["#0d0d0d"]} />
            <PerspectiveCamera
              ref={cameraRef}
              makeDefault
              position={[-0.8, 0.78, -1.8]}
              fov={50}
              rotation={[0.3, 3.6, 0.13]}
            />

            {/* <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            /> */}
            <Scene position={[0, 0, 0]} cameraRef={cameraRef} />
          </Canvas>
        </section>
      </div>
    </Suspense>
  );
}

export default App;
