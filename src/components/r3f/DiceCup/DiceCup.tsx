import useCastShadow from "@/hooks/useCastShadow";
import useReceiveShadow from "@/hooks/useReceiveShadow";
import { useGLTF } from "@react-three/drei";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import DiceCupCover from "../DiceCupCover/DiceCupCover";
import { firstPosition } from "./constants/diceCup.constant";
import useHandleDiceCup from "./hooks/useHandleDiceCup.hook";

const DiceCup = () => {
  const gltf = useGLTF("/diceCup.glb");

  useCastShadow(gltf.scene);
  useReceiveShadow(gltf.scene);

  const rigidBodyRef = useRef<RapierRigidBody>(null);

  useHandleDiceCup(rigidBodyRef);

  const { x, y, z } = firstPosition;

  return (
    <group>
      <RigidBody
        ref={rigidBodyRef}
        colliders="trimesh"
        type="kinematicPosition"
        position={[x, y, z]}
        ccd
      >
        <primitive position={[-0.75, -0.5, 0]} object={gltf.scene} />
      </RigidBody>
      <DiceCupCover position={[0.5, 1.1, 0]} />
    </group>
  );
};

export default DiceCup;
