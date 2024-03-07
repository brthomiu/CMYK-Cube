import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";
import { TypeAnimation } from "react-type-animation";

function MyRotatingBox() {
  const myMesh = useRef<Mesh>(null!);
  const [doubleClicked, setDoubleClicked] = useState(false);
  const [multiplier, setMultiplier] = useState(1);

  const width = 3 * multiplier;
  const length = 3 * multiplier;
  const depth = 3 * multiplier;

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime() * 0.7;
    myMesh.current.rotation.x = a / 2;
    myMesh.current.rotation.y = a / 3;
  });

  return (
    <mesh
      ref={myMesh}
      onDoubleClick={() => {
        if (doubleClicked) {
          setDoubleClicked(false);
          console.log("unDoubleClick");
          setMultiplier(1);
        } else {
          setDoubleClicked(true);
          console.log("doubleClick");
          setMultiplier(1.5);
        }
      }}
    >
      <boxGeometry args={[length, width, depth]} />
      <meshPhongMaterial color="white" />
    </mesh>
  );
}

export default function RotateCube() {
  return (
    <div className="cube-container" style={{ width: "1000px", height: "700px" }}>
      <Canvas>
        <directionalLight
          position={[-10, 30, 10]}
          intensity={1.5}
          color={"cyan"}
        />
        <directionalLight
          position={[0, -30, 0]}
          intensity={1.5}
          color={"magenta"}
        />
        <directionalLight
          position={[30, 10, 10]}
          intensity={1.5}
          color={"yellow"}
        />
        <MyRotatingBox />
      </Canvas>
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          "Accelerating Barnacles",
          3000, // wait 1s before replacing "Mice" with "Hamsters"
          "Obfuscating Quigley Matrix",
          3000,
          "Reticulating Splines",
          3000,
          "Inserting Sublimated Messages",
          3000,
        ]}
        wrapper="span"
        speed={20}
        style={{ fontSize: "2.75em", display: "inline-block" }}
        repeat={Infinity}
      />{" "}
    </div>
  );
}
