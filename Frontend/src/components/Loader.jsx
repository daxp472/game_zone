import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import lottie from 'lottie-web';
import animationData from '../animations/loadingAnimation.json'; // Update the path to your Lottie animation file

// 3D Rotating Sphere Component
const RotatingSphere = () => {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.y += 0.01;
    meshRef.current.rotation.x += 0.005;
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="purple" emissive="blue" emissiveIntensity={0.5} />
    </mesh>
  );
};

// Cursor Reacting Particles
const CursorParticles = () => {
  const particles = useRef();
  useFrame(() => {
    if (particles.current) {
      particles.current.position.x = (window.innerWidth / 2 - window.mouseX) / 100;
      particles.current.position.y = (window.innerHeight / 2 - window.mouseY) / 100;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array([
            0, 0, 0,
            10, 10, 10,
            -10, 10, 10,
            -10, -10, 10,
            10, -10, 10,
          ])}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="white" size={0.5} />
    </points>
  );
};

const Loader = ({ setLoading }) => {
  const loaderRef = useRef();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (setLoading) {
      gsap.to(loaderRef.current, { opacity: 1, duration: 1 });

      // Initialize Lottie animation
      const lottieAnimation = lottie.loadAnimation({
        container: loaderRef.current.querySelector('.lottie-container'),
        animationData: animationData,
        loop: true,
        autoplay: true,
      });

      setIsAnimating(true);

      setTimeout(() => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            if (typeof setLoading === 'function') {
              setLoading(false);
            }
            setIsAnimating(false);
          }
        });
      }, 3000);

      return () => {
        lottieAnimation.destroy();
      };
    }
  }, [setLoading]);

  return (
    <div ref={loaderRef} className="fixed inset-0 flex items-center justify-center bg-black z-50" style={{ opacity: 0 }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingSphere />
        <CursorParticles />
        <Stars />
        <Html center>
          <div className="lottie-container">
            <h2 className="text-white text-3xl font-bold animate-pulse">Loading GameZone...</h2>
          </div>
        </Html>
      </Canvas>
    </div>
  );
};

export default Loader;