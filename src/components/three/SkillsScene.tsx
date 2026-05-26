"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/components/providers/ThemeProvider";

const DARK_COLORS = {
  primary: "#8B5CF6",
  secondary: "#06B6D4",
  accent: "#F472B6",
};

const LIGHT_COLORS = {
  primary: "#4C1D95",
  secondary: "#0891B2",
  accent: "#DB2777",
};

function SkillsNetwork({ colors }: { colors: typeof DARK_COLORS }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeCount = 18;
  
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < nodeCount; i++) {
      // Create a more spherical cluster for skills
      const radius = 1.8;
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      
      p.push(new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      ));
    }
    return p;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {points.map((point, i) => (
        <group key={i}>
          <mesh position={point}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? colors.primary : colors.secondary} 
              emissive={i % 2 === 0 ? colors.primary : colors.secondary}
              emissiveIntensity={0.2}
            />
          </mesh>
          {points.map((target, j) => {
            if (i < j && point.distanceTo(target) < 1.8) {
              const curve = new THREE.LineCurve3(point, target);
              return (
                <mesh key={j}>
                  <tubeGeometry args={[curve, 1, 0.008, 8, false]} />
                  <meshBasicMaterial 
                    color={colors.primary} 
                    transparent 
                    opacity={0.15} 
                  />
                </mesh>
              );
            }
            return null;
          })}
        </group>
      ))}
    </group>
  );
}

export function SkillsScene() {
  const { theme } = useTheme();
  const [dpr, setDpr] = useState(1.2);
  const colors = theme === "light" ? LIGHT_COLORS : DARK_COLORS;

  useEffect(() => {
    const checkMobile = () => setDpr(window.innerWidth < 768 ? 0.8 : 1.2);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 55 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, dpr]}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[0, 2, 3]} intensity={0.6} color={colors.primary} />
        <pointLight position={[0, -2, -3]} intensity={0.4} color={colors.secondary} />
        <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <SkillsNetwork colors={colors} />
        </Float>
        <Sparkles
          count={40}
          scale={6}
          size={1.2}
          speed={0.3}
          opacity={0.4}
          color={colors.accent}
        />
      </Canvas>
    </div>
  );
}
