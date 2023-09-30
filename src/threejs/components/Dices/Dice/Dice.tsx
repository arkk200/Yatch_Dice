import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Dispatch, SetStateAction, useMemo, useRef } from "react";
import { DoubleSide } from "three";
import useDiceGeometries from "./hooks/useDiceGeometries.hook";

interface Props {
  id: number;
  position: [number, number, number];
  setIsSleepList: Dispatch<SetStateAction<boolean[]>>;
}

const Dice = ({ id, position, setIsSleepList }: Props) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);

  const { geometry, innerGeometry } = useMemo(useDiceGeometries, []);

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders="cuboid"
      restitution={0.75}
      friction={0.1}
      position={position}
      scale={1}
      mass={100}
      onSleep={() =>
        setIsSleepList((prev) => [
          ...prev.slice(0, id),
          true,
          ...prev.slice(id + 1),
        ])
      }
      ccd
    >
      <group>
        <mesh geometry={geometry} castShadow />
        <mesh geometry={innerGeometry}>
          <meshStandardMaterial color={0x000000} side={DoubleSide} />
        </mesh>
      </group>
    </RigidBody>
  );
};

export default Dice;
