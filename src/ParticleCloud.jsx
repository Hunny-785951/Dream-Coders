import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CloudContent({ onReady }) {
  const points = useRef();
  
  // Particle counts for the two distinct visual elements
  const cloudCount = 12000;
  const ambientCount = 4000;
  const totalCount = cloudCount + ambientCount;

  // 1. Generate procedural glowing circle texture for soft stars
  const starTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64; 
    canvas.height = 64;
    const context = canvas.getContext("2d");
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");   
    gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.6)"); 
    gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.2)"); 
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");         
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  // 2. Generate positions for BOTH the central cloud and the ambient background
  const [positions, colors] = useMemo(() => {
    const posTemp = new Float32Array(totalCount * 3);
    const colTemp = new Float32Array(totalCount * 3);

    // Original colors from your reference
    const colorCore = new THREE.Color("#00f0ff");   // Cyan/Blue
    const colorMid = new THREE.Color("#7f00ff");    // Deep Purple
    const colorOuter = new THREE.Color("#ff007f");  // Pink/Magenta

    let currentIndex = 0;

    // --- ELEMENT A: THE CENTRAL CLOUD (Replacing the Swirl) ---
    const cloudSpheres = [
      { x: 0, y: 0, z: 0, r: 2.4 },         // Main central core (scaled to fit behind text)
      { x: -1.9, y: -0.4, z: 0.2, r: 1.5 }, // Left mid puff
      { x: -3.2, y: -0.6, z: 0.4, r: 1.0 }, // Left outer tail
      { x: 2.1, y: -0.3, z: -0.2, r: 1.6 }, // Right mid puff
      { x: 3.6, y: -0.5, z: 0.1, r: 1.1 },  // Right outer tail
      { x: -0.9, y: 1.5, z: 0.3, r: 1.3 },  // Top left puff
      { x: 1.1, y: 1.3, z: -0.3, r: 1.2 },  // Top right puff
    ];

    const totalVolume = cloudSpheres.reduce((sum, s) => sum + Math.pow(s.r, 3), 0);

    cloudSpheres.forEach((sphere) => {
      const sphereParticleCount = Math.floor((Math.pow(sphere.r, 3) / totalVolume) * cloudCount);

      for (let i = 0; i < sphereParticleCount; i++) {
        if (currentIndex >= cloudCount) break;

        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = sphere.r * Math.cbrt(Math.random()); 

        const x = sphere.x + r * Math.sin(phi) * Math.cos(theta);
        const y = sphere.y + r * Math.sin(phi) * Math.sin(theta);
        const z = sphere.z + r * Math.cos(phi);

        posTemp[currentIndex * 3] = x;
        posTemp[currentIndex * 3 + 1] = y;
        posTemp[currentIndex * 3 + 2] = z;

        // Color mapped by distance from the absolute center
        const dist = Math.sqrt(x*x + y*y + z*z);
        let t = Math.min(Math.max(dist / 4.0, 0.0), 1.0); 

        let finalColor = new THREE.Color();
        if (t <= 0.5) {
          finalColor.lerpColors(colorCore, colorMid, t * 2.0);
        } else {
          finalColor.lerpColors(colorMid, colorOuter, (t - 0.5) * 2.0);
        }

        colTemp[currentIndex * 3] = finalColor.r;
        colTemp[currentIndex * 3 + 1] = finalColor.g;
        colTemp[currentIndex * 3 + 2] = finalColor.b;

        currentIndex++;
      }
    });

    // --- ELEMENT B: AMBIENT BACKGROUND PARTICLES ---
    for (let i = 0; i < ambientCount; i++) {
      // Push particles outwards into a larger sphere shell (radius 4 to 12)
      let dist = 4 + 8 * Math.pow(Math.random(), 2); 
      let theta = THREE.MathUtils.randFloatSpread(360);
      let phi = THREE.MathUtils.randFloatSpread(180);

      const x = dist * Math.sin(theta) * Math.cos(phi);
      const y = dist * Math.cos(theta);
      const z = dist * Math.sin(theta) * Math.sin(phi);

      posTemp[currentIndex * 3] = x;
      posTemp[currentIndex * 3 + 1] = y;
      posTemp[currentIndex * 3 + 2] = z;

      // Same spatial color logic, but stretched for the wider distances
      let t = Math.min(Math.max(dist / 11.0, 0.0), 1.0); 

      let finalColor = new THREE.Color();
      if (t <= 0.5) {
        finalColor.lerpColors(colorCore, colorMid, t * 2.0);
      } else {
        finalColor.lerpColors(colorMid, colorOuter, (t - 0.5) * 2.0);
      }

      colTemp[currentIndex * 3] = finalColor.r;
      colTemp[currentIndex * 3 + 1] = finalColor.g;
      colTemp[currentIndex * 3 + 2] = finalColor.b;

      currentIndex++;
    }

    return [posTemp, colTemp];
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onReady) onReady();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onReady]);

  useFrame((state, delta) => {
    if (!points.current) return;
    const safeDelta = Math.min(delta, 0.1);

    // Bloom entrance
    points.current.scale.x = THREE.MathUtils.damp(points.current.scale.x, 1, 2, safeDelta);
    points.current.scale.y = THREE.MathUtils.damp(points.current.scale.y, 1, 2, safeDelta);
    points.current.scale.z = THREE.MathUtils.damp(points.current.scale.z, 1, 2, safeDelta);

    // Subtle drift instead of fast spinning, so the cloud shape remains legible
    points.current.rotation.y += safeDelta * 0.02;
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;

    points.current.position.x = 0;
  });

  return (
    <points ref={points} scale={[0.01, 0.01, 0.01]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.14} 
        map={starTexture} 
        vertexColors={true} 
        transparent={true}
        opacity={1.0}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

const ParticleCloud = ({ onCloudReady }) => (
  <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
    <Canvas eventSource={document.body} camera={{ position: [0, 0, 8], fov: 60 }} style={{ pointerEvents: "none" }}>
      {/* Kept your fog settings to blend the edges perfectly into the CSS background */}
      <fog attach="fog" args={['#080d1a', 2, 12]} />
      <CloudContent onReady={onCloudReady} />
    </Canvas>
  </div>
);

export default ParticleCloud;