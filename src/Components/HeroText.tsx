import { useEffect, useRef, useState } from "react";
import { TTFLoader, FontData, Font } from "three/examples/jsm/Addons.js";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HeroText = () => {
  const [font, setFont] = useState<Font>();
  const textRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const loader = new TTFLoader();
    loader.load("/assets/fonts/Anton-Regular.ttf", (anton: FontData) => {
      if (anton) {
        const font = new FontLoader().parse(anton);
        setFont(font);
      }
    });
  }, []);

  useGSAP(() => {
    if (!textRef.current || !font) return;
    const text = textRef.current;
    gsap.from(text.position, {
      y: 1.3,
      // opacity: 0,
      duration: 1.4,
      ease: "power2.out",
    });
    gsap.from(text.scale, {
      x: 0.9,
      y: 0.9,
      z: 0.9,
      duration: 1.4,
    });
  }, [font]);

  if (!font) return null;

  const text = ["KOENIGSEGG", "GEMERA"];
  const geometries = text.map((text) => {
    const geometry = new TextGeometry(text, {
      font,
      size: 1.1,
      depth: 0.1,
      curveSegments: 12,
    });

    // Center the geometry
    geometry.computeBoundingBox();
    const centerOffset = geometry.boundingBox!.getCenter(new THREE.Vector3());
    geometry.translate(-centerOffset.x, -centerOffset.y, -centerOffset.z);

    return geometry;
  });
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    wireframe: true,
  });
  //doing the text thing

  return (
    <group position={[0, 1.5, -7]} ref={textRef}>
      {geometries.map((geometry, index) => {
        return (
          <primitive
            key={index}
            object={new THREE.Mesh(geometry, material)}
            position={[0, -index * 1.5, 0]}
          />
        );
      })}
    </group>
  );
};

export default HeroText;
