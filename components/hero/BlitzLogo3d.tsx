'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface BlitzLogo3DProps {
  autoRotate?: boolean;
}

function BlitzTextMesh({ autoRotate = true }: BlitzLogo3DProps) {
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame(() => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Center position={[0, 0, 0]}>
      <group ref={groupRef}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={2.5}
          height={0.8}
          bevelEnabled
          bevelThickness={0.04}
          bevelSize={0.02}
          bevelSegments={5}
        >
          BLITZ
          <meshStandardMaterial
            color="#3b82f6"
            roughness={0.3}
            metalness={0.7}
            emissive="#1a5490"
            emissiveIntensity={0.2}
          />
        </Text3D>
      </group>
    </Center>
  );
}

export function BlitzLogo3DCanvas({
  autoRotate = true,
}: BlitzLogo3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 75 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.6} color="#ffffff" />

      {/* Key Light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color="#ffffff"
        castShadow
      />

      {/* Rim Light */}
      <directionalLight
        position={[-5, 3, -5]}
        intensity={0.8}
        color="#4da6ff"
      />

      {/* Fill Light */}
      <pointLight
        position={[0, 0, 0]}
        intensity={0.3}
        color="#ffffff"
      />

      <BlitzTextMesh autoRotate={autoRotate} />

      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={2}
        enableZoom={false}
        enablePan={false}
        enableRotate={!autoRotate}
      />
    </Canvas>
  );
}