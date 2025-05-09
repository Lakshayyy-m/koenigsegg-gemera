import { Canvas } from "@react-three/fiber";
import Scene from "./Components/Scene";
import { Loader, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";

function App() {
  return (
    <div className="w-screen h-screen ">
      <Suspense fallback={<Loader />}>
        <Canvas className="w-screen h-screen" shadows>
          {/* <HeroText /> */}
          <color attach="background" args={["#0d0d0d"]} />
          <PerspectiveCamera
            makeDefault
            position={[-0.8, 0.7, -1.8]}
            fov={50}
            rotation={[0.2, 3.5, 0.08]}
          />

          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
