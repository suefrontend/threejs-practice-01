import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { angleToRadians } from "../../utils/angle";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { Model } from "./car";

// https://www.youtube.com/watch?v=epyHLQsS7EY&list=PLIRTsuB0iPJvxaYyg8MOrjffPPcYnccL0&index=5 5:00

function Three() {
  const orbitControlsRef = useRef(null);
  useFrame((state) => {
    if (!!orbitControlsRef.current) {
      const { x, y } = state.mouse; // x -> -1 to 1
      console.log(y * angleToRadians(90 - 30));

      orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45));
      orbitControlsRef.current.setPorlarAngle(
        (y + 0.9) * angleToRadians(90 - 30)
      );
      orbitControlsRef.current.update();
    }
  });

  const ballRef = useRef(null);
  useEffect(() => {
    console.log("ballRef", ballRef);

    if (!!ballRef.current) {
      console.log(ballRef.current);

      const timeline = gsap.timeline({ paused: true });

      timeline.to(ballRef.current.position, {
        x: 1,
        duration: 2,
        ease: "power2.out",
      });

      timeline.to(
        ballRef.current.position,
        {
          y: 0.5,
          duration: 0.5,
          ease: "power2.in",
        },
        "<"
      );

      timeline.play();
    }
  }, [ballRef.current]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      <OrbitControls
        ref={orbitControlsRef.current}
        minPolarAngle={angleToRadians(60)}
        maxPolarAngle={angleToRadians(80)}
      />

      <mesh position={[-2, 1.5, 0]} castShadow ref={ballRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#d1d1d1" metalness={0.9} roughness={0.1} />
      </mesh>

      <Model />

      <mesh rotation={[angleToRadians(-90), 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1ea3d8" />
      </mesh>

      <ambientLight args={["#ffffff", 0.25]} />

      {/* <pointLight args={["#ffffff", 1.5, 0, 1, 0]} position={[-3, 0, 0]} /> */}
      <spotLight
        args={["#ffffff", 1.5, 17, angleToRadians(30), 0.4]}
        position={[-3, 1, 0]}
        castShadow
      />

      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial color="#2266cc" side={THREE.BackSide} />
        </mesh>
      </Environment>
    </>
  );
}

export default Three;
