"use client";
import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function NeuralGrid() {
  const pointsRef = useRef<THREE.Points>(null!);
  const boxRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  // Create a ref to store mouse position globally
  const mouse = useRef({ x: 0, y: 0 });

  // 1. Listen to the window, not the canvas
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates to -1 to +1
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const positions = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 2. Use our manual mouse ref instead of state.mouse
    const { x, y } = mouse.current;

    // TARGETS
    // Rotation tilts toward mouse
    const targetRotX = -y * 0.6;
    const targetRotY = x * 0.6;

    // Position drifts toward mouse
    const targetPosX = x * 1.2;
    const targetPosY = y * 1.2;

    // SMOOTHING (Lerp)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.05,
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.05,
    );

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetPosX,
      0.05,
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetPosY,
      0.05,
    );

    // INTERNAL SPIN (Always moving slightly)
    pointsRef.current.rotation.y = time * 0.05;
    boxRef.current.rotation.y = time * 0.1;
    boxRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={boxRef}>
        <boxGeometry args={[3.8, 3.8, 3.8]} />
        <meshBasicMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#60a5fa"
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#60a5fa" />
        <pointLight intensity={3} distance={6} color="#3b82f6" />
      </mesh>
    </group>
  );
}

export default function Scene() {
  return (
    // Note: Added bg-linear-to-r for v4 tailwind standards as requested
    <div className="fixed inset-0 -z-10 h-full w-full bg-[#020617] bg-linear-to-r from-[#020617] to-[#0f172a]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true }}
      >
        <fog attach="fog" args={["#020617", 8, 22]} />
        <ambientLight intensity={0.4} />

        <NeuralGrid />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
