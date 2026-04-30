import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// 1. The Mathematical Ambient Background Particles
function AmbientParticles() {
  const ambientCount = 4000;

  // Generate procedural glowing circle texture for soft stars
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

  const [positions, colors] = useMemo(() => {
    const posTemp = new Float32Array(ambientCount * 3);
    const colTemp = new Float32Array(ambientCount * 3);

    // The complete user-specified palette
    const palette = [
      new THREE.Color("#71CDE8"), // Lightest Cyan
      new THREE.Color("#4AB3D9"), // Bright Sky Blue
      new THREE.Color("#1F5C9E"), // Deep Ocean Blue
      new THREE.Color("#0F2460"), // Dark Navy
      new THREE.Color("#3A5983"), // Main Lobe Blue
      new THREE.Color("#1A2C49"), // Crevice Shadows
      new THREE.Color("#415A7C"), // Cerebellum
      new THREE.Color("#E6E9EE"), // Brightest Silver/White Highlights
      new THREE.Color("#C1AE9A"), // Warm Champagne/Light Gold
      new THREE.Color("#8A6B53"), // Bronze/Copper Shadows
      new THREE.Color("#EEDECB")  // Warm Rim Light
    ];

    for (let i = 0; i < ambientCount; i++) {
      // Push particles outwards into a larger sphere shell (radius 4 to 12)
      let dist = 4 + 8 * Math.pow(Math.random(), 2);
      let theta = THREE.MathUtils.randFloatSpread(360);
      let phi = THREE.MathUtils.randFloatSpread(180);

      const x = dist * Math.sin(theta) * Math.cos(phi);
      const y = dist * Math.cos(theta);
      const z = dist * Math.sin(theta) * Math.sin(phi);

      posTemp[i * 3] = x;
      posTemp[i * 3 + 1] = y;
      posTemp[i * 3 + 2] = z;

      // Randomly pick a color from the image's exact palette
      const randomColor = palette[Math.floor(Math.random() * palette.length)];

      colTemp[i * 3] = randomColor.r;
      colTemp[i * 3 + 1] = randomColor.g;
      colTemp[i * 3 + 2] = randomColor.b;
    }

    return [posTemp, colTemp];
  }, []);

  return (
    <points>
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

// 2. The Structured .glb Brain Model
function NeuralCloudModel({ url }) {
  const customMaterialRef = useRef();
  const { nodes } = useGLTF(url);

  const geometry = useMemo(() => {
    const meshNode = Object.values(nodes).find((n) => n.isMesh);
    if (meshNode) {
      meshNode.geometry.center();
      meshNode.geometry.computeBoundingBox();
      return meshNode.geometry;
    }
    return new THREE.BufferGeometry();
  }, [nodes]);

  const customMaterial = useMemo(() => {
    let minY = -1.0;
    let maxY = 1.0;
    let minX = -1.0;
    let maxX = 1.0;
    let minZ = -1.0;
    let maxZ = 1.0;
    if (geometry.boundingBox) {
      minY = geometry.boundingBox.min.y;
      maxY = geometry.boundingBox.max.y;
      minX = geometry.boundingBox.min.x;
      maxX = geometry.boundingBox.max.x;
      minZ = geometry.boundingBox.min.z;
      maxZ = geometry.boundingBox.max.z;
    }

    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },

        // Refined hex codes perfectly matched to the uploaded image
        colorTop: { value: new THREE.Color("#184185") },      // The brightest cyan at the very top edge
        colorUpperMid: { value: new THREE.Color("#3E1A75") }, // The rich, saturated mid-blue
        colorLowerMid: { value: new THREE.Color("#14223B") }, // The deep transitioning ocean blue
        colorBottom: { value: new THREE.Color("#0E1D3D") },   // The dark navy/almost black shadow at the base
        colorRim: { value: new THREE.Color("#1B3154") },     // The warm, golden-peach bounce light on the bottom left

        // (If you are using the Brain/Depth shader from the previous step, include these too)
        colorBrainCore: { value: new THREE.Color("#35527D") },
        colorBrainShadow: { value: new THREE.Color("#14223B") },

        // Bounding box limits for the gradient math
        minY: { value: minY },
        maxY: { value: maxY },
        minX: { value: minX },
        maxX: { value: maxX },
        // Include Z limits if using the depth shader
        minZ: { value: minZ },
        maxZ: { value: maxZ }
      },
      vertexColors: false, // Ensures we override the model's default colors
      vertexShader: `
        uniform float time;
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          vec3 pos = position;
          
          // Model-specific internal undulation
          pos.y += sin(time * 2.0 + position.x) * 0.05;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 2.0; 
        }
      `,
      fragmentShader: `
        uniform vec3 colorTop;
        uniform vec3 colorUpperMid;
        uniform vec3 colorLowerMid;
        uniform vec3 colorBottom;
        uniform vec3 colorRim;
        uniform float minY;
        uniform float maxY;
        uniform float minX;
        uniform float maxX;
        varying vec3 vPosition;
        
        void main() {
          // Vertical gradient based on actual bounds
          float gradientFactor = (vPosition.y - minY) / (maxY - minY);
          gradientFactor = clamp(gradientFactor, 0.0, 1.0);
          
          // Horizontal distance from center (0.0 at center, 1.0 at far edges)
          float rangeX = max((maxX - minX) * 0.5, 0.0001);
          float xNorm = clamp(abs(vPosition.x) / rangeX, 0.0, 1.0);
        
          // Mix vertical colors: 4-step gradient to match the image precisely
          vec3 baseColor;
          if (gradientFactor > 0.66) {
            baseColor = mix(colorUpperMid, colorTop, (gradientFactor - 0.66) * 3.0);
          } else if (gradientFactor > 0.33) {
            baseColor = mix(colorLowerMid, colorUpperMid, (gradientFactor - 0.33) * 3.0);
          } else {
            baseColor = mix(colorBottom, colorLowerMid, gradientFactor * 3.0);
          }

          // Apply the warm peach rim light to the bottom left/right edges
          // Smoothly appear when X is far from center and Y is near the bottom
          float rimMask = smoothstep(0.5, 1.0, xNorm) * smoothstep(0.4, 0.0, gradientFactor);
          vec3 finalColor = mix(baseColor, colorRim, rimMask * 0.9);
        
          // Shape particles into circles
        vec2 xy = gl_PointCoord.xy - vec2(0.5);
        float ll = length(xy);
        if (ll > 0.5) discard;
        
        // Multiplying finalColor by 1.2 adds a subtle neon brightness
        gl_FragColor = vec4(finalColor * 1.2, 1.0 - (ll * 2.0));
      }
    `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [geometry]);

  useFrame((state) => {
    if (customMaterial) {
      customMaterial.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  // Notice scale is adjusted here relative to the parent group
  return (
    <points geometry={geometry} material={customMaterial} scale={[4, 4, 4]} />
  );
}

// 3. The Parent Wrapper for Animations ("Blow up", Rotation, Bobbing)
function AnimatedScene({ onReady }) {
  const groupRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onReady) onReady();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onReady]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const safeDelta = Math.min(delta, 0.1);

    // Your exact Blow-up / Bloom entrance animation
    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, 1, 2, safeDelta);
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, 1, 2, safeDelta);
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, 1, 2, safeDelta);

    // Your exact Subtle drift and bobbing motion
    groupRef.current.rotation.y += safeDelta * 0.02;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
  });

  return (
    // Initial scale set to 0.01 so it "blows up" into the scene
    <group ref={groupRef} scale={[0.01, 0.01, 0.01]}>
      <NeuralCloudModel url="/neural_brain.glb" />
      <AmbientParticles />
    </group>
  );
}

// 4. Main Canvas
const ParticleCloud = ({ onCloudReady }) => {
  // Make sure this matches your actual filename!
  useGLTF.preload('/neural_brain.glb');

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", backgroundColor: "#000000" }}>
      <Canvas eventSource={document.body} camera={{ position: [0, 0, 8], fov: 60 }} style={{ pointerEvents: "none" }}>
        <fog attach="fog" args={['#000000', 2, 12]} />
        <AnimatedScene onReady={onCloudReady} />
      </Canvas>
    </div>
  );
};

export default ParticleCloud;
