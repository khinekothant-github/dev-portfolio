"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float, PresentationControls, Clone, Text3D, Center } from "@react-three/drei";
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from "three";
import { useTheme } from "@/components/providers/ThemeProvider";

// Preload the photorealistic drone asset
useGLTF.preload("/models/helmet.glb");

/* ─────────────────────────────────────────────
   Custom GLSL Shader for Light Attenuation
   ───────────────────────────────────────────── */
const laserVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const laserFragmentShader = `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec2 vUv;
  void main() {
    // Smoothly fade out the beam at both ends so there are NO hard cuts.
    float alpha = smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.3, vUv.y);
    
    // Apply conditional intensity to prevent blowing out to white in light mode
    vec3 finalColor = uColor * uIntensity;
    
    // Increased base alpha slightly in light mode to compensate for lack of additive glow
    gl_FragColor = vec4(finalColor, alpha * 0.45);
  }
`;

/* ─────────────────────────────────────────────
   Multi-Point Laser Scanner Component
   ───────────────────────────────────────────── */
function LaserScanner({ laserColor, isDark }: { laserColor: string, isDark: boolean }) {
  const minorLasersRef = useRef<THREE.Group>(null);
  
  // Generate a subtler network of scanning beams
  const beams = useMemo(() => {
    const arr = [];
    const count = 8; // Reduced from 25 to 8 for less visual clutter
    for(let i=0; i<count; i++) {
      // Tighter beam spread
      const rotX = (Math.random() - 0.5) * 0.15;
      const rotY = (Math.random() - 0.5) * 0.15;
      const scaleZ = 0.5 + Math.random() * 0.5; 
      arr.push({ rotX, rotY, scaleZ });
    }
    return arr;
  }, []);

  const uniforms = useMemo(() => ({
    uColor: { value: new THREE.Color(laserColor) },
    uIntensity: { value: isDark ? 4.0 : 1.2 } // High intensity for dark mode bloom, low for light mode color accuracy
  }), [laserColor, isDark]);

  useFrame((state) => {
    if (minorLasersRef.current) {
      // Slowly rotate the laser network around the Z-axis (like a spinning drill)
      minorLasersRef.current.rotation.z = state.clock.elapsedTime * 1.5; 
    }
  });

  return (
    <group ref={minorLasersRef}>
      {beams.map((b, i) => (
        <group key={i} rotation={[b.rotX, b.rotY, 0]}>
          {/* Aligned to shoot straight down the +Z axis */}
          <mesh position={[0, 0, 6 * b.scaleZ]} rotation={[Math.PI / 2, 0, 0]} scale={[1, b.scaleZ, 1]}>
            <cylinderGeometry args={[0.03, 0.001, 12, 4]} />
            <shaderMaterial 
              vertexShader={laserVertexShader}
              fragmentShader={laserFragmentShader}
              uniforms={uniforms}
              transparent={true}
              depthWrite={false}
              blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────
   Laser-Scanning Scout Drones (DamagedHelmet)
   ───────────────────────────────────────────── */
function Drone({ radius, angleOffset, speed, yOffset, verticalSpeed, theme }: any) {
  const helmetGltf = useGLTF("/models/helmet.glb");
  const ref = useRef<THREE.Group>(null);
  const targetPointer = useMemo(() => new THREE.Vector3(), []);

  const isDark = theme === 'dark';
  const laserColor = useMemo(() => {
    return isDark 
      ? (Math.random() > 0.5 ? "#06B6D4" : "#ff007f")
      : (Math.random() > 0.5 ? "#0ea5e9" : "#e11d48"); // Deep, rich colors for light mode
  }, [isDark]);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    
    // Orbital swarm mathematics
    const currentAngle = angleOffset + time * speed * 0.15;
    const x = Math.cos(currentAngle) * radius;
    const z = Math.sin(currentAngle) * radius;
    const y = yOffset + Math.sin(time * verticalSpeed) * 2;

    ref.current.position.set(x, y, z);
    
    // INTERACTIVE CURSOR TRACKING
    // The *entire drone* acts as an omnidirectional scout, always keeping its face and lasers locked onto the user
    const targetWorld = new THREE.Vector3(state.pointer.x * 15, state.pointer.y * 10, 8);
    targetPointer.lerp(targetWorld, 0.1); 
    
    const currentQuat = ref.current.quaternion.clone();
    
    // Point the entire drone body at the target
    ref.current.lookAt(targetPointer);
    
    const targetQuat = ref.current.quaternion.clone();
    
    ref.current.quaternion.copy(currentQuat);
    ref.current.quaternion.slerp(targetQuat, 0.08); 
  });

  return (
    <group ref={ref} scale={0.5}>
      <Clone object={helmetGltf.scene} />
      {/* The laser is rigidly attached to the front of the drone (+Z) and never bends relative to the drone */}
      <group position={[0, 0.2, 1.2]}>
        <LaserScanner laserColor={laserColor} isDark={isDark} />
      </group>
    </group>
  );
}

function DroneSwarm({ count = 15, theme }: { count?: number, theme: string }) {
  const dronesData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      radius: 4 + Math.random() * 8, // Expanded slightly to make room for text
      angleOffset: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 1.5,
      yOffset: (Math.random() - 0.5) * 6,
      verticalSpeed: (Math.random() - 0.5) * 1.5,
      key: Math.random().toString(),
    }));
  }, [count]);

  return (
    <>
      {dronesData.map(({ key, ...rest }) => (
        <Drone key={key} theme={theme} {...rest} />
      ))}
    </>
  );
}

function SceneContent({ theme }: { theme: string }) {
  const [isMobile, setIsMobile] = useState(false);
  const sceneGroupRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 1024);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useFrame((state) => {
    // Highly Interactive Parallax: The entire swarm tilts slightly opposite to the mouse
    if (sceneGroupRef.current) {
      const targetX = (state.pointer.x * Math.PI) * 0.03;
      const targetY = (state.pointer.y * Math.PI) * 0.03;
      
      sceneGroupRef.current.rotation.y += (targetX - sceneGroupRef.current.rotation.y) * 0.1;
      sceneGroupRef.current.rotation.x += (-targetY - sceneGroupRef.current.rotation.x) * 0.1;
    }
  });

  const position = isMobile ? [0, -1, -4] : [3, 0, 0];

  return (
    <>
      {/* Cinematic studio & sci-fi lighting - reduced intensity in light mode to prevent washout */}
      <ambientLight intensity={theme === 'dark' ? 0.2 : 0.6} />
      <directionalLight position={[10, 20, 10]} intensity={theme === 'dark' ? 2 : 1.5} color={theme === 'dark' ? "#06B6D4" : "#ffffff"} castShadow />
      <directionalLight position={[-10, -10, -10]} intensity={theme === 'dark' ? 5 : 1} color={theme === 'dark' ? "#ff007f" : "#a5b4fc"} />

      <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.2}>
        <group ref={sceneGroupRef}>
          <group position={position as any}>
             <PresentationControls
                global={false}
                cursor={true}
                config={{ mass: 1, tension: 170, friction: 26 }}
                // @ts-expect-error - drei types might not support spring config for snap yet
                snap={{ mass: 2, tension: 250 }}
                rotation={[0.1, -0.2, 0]} 
                polar={[-Math.PI / 3, Math.PI / 3]}
                azimuth={[-Math.PI, Math.PI]}
              >
                {/* Subtler Swarming Fleet of Scout Drones */}
                <DroneSwarm count={6} theme={theme} />
              </PresentationControls>
          </group>
        </group>
      </Float>

      <Environment preset={theme === "dark" ? "night" : "studio"} />

      {/* @ts-expect-error - disableNormalPass might not be typed properly in this version */}
      <EffectComposer disableNormalPass>
        <Bloom 
          luminanceThreshold={theme === 'dark' ? 0.3 : 0.8} 
          mipmapBlur 
          intensity={theme === 'dark' ? 1.0 : 0.4} 
          radius={0.6}
        />
      </EffectComposer>
    </>
  );
}

export function HeroScene() {
  const { theme } = useTheme();
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    const check = () => setDpr(window.innerWidth < 768 ? 1 : 1.5);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, dpr]}
      >
        <SceneContent theme={theme || "dark"} />
      </Canvas>
    </div>
  );
}
