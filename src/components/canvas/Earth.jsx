import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Text } from "@react-three/drei";

import CanvasLoader from "../Loader";

/* ── 3D Earth with rotating ACM-W text around equator ── */
const Earth = () => {
  const { scene } = useGLTF("./planet/scene.gltf");
  const groupRef = useRef();

  // Clone once to avoid shared-scene-parent issues
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Smoothly rotate everything together on the Y-axis
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  const R = 2.85; // text orbit radius (just outside the cloud shell)

  return (
    <group ref={groupRef}>
      {/* ── Planet Globe ── */}
      <primitive object={clonedScene} scale={2.5} />

      {/* ── Equatorial Ring ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.82, 0.025, 16, 128]} />
        <meshBasicMaterial color="#1591DC" />
      </mesh>

      {/* Outer orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.05, 0.01, 16, 128]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.45} />
      </mesh>

      {/* ── ACM-W Text × 4 around equator ── */}
      {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((angle, i) => (
        <Text
          key={i}
          position={[
            Math.sin(angle) * R,
            0,
            Math.cos(angle) * R,
          ]}
          rotation={[0, angle, 0]}
          fontSize={0.5}
          color="#FFFFFF"
          outlineWidth={0.04}
          outlineColor="#1591DC"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.1}
        >
          ACM-W
        </Text>
      ))}
    </group>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      {/* Lights for the text geometry */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.8}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
