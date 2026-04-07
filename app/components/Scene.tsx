"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Sphere,
  MeshDistortMaterial,
  Float,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time / 4;
    meshRef.current.rotation.y = time / 6;
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial color="#3b82f6" speed={2} distort={0.5} />
    </Sphere>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-slate-950">
      {" "}
      {/* Background color stays here */}
      <Canvas
        camera={{ position: [2, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }} // Ensures crisp edges and transparency
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#60a5fa" />

        <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
          <AnimatedSphere />
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
