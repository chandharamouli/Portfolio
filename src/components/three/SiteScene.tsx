import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef, type ReactNode } from "react";
import {
  AdditiveBlending,
  Color,
  MathUtils,
  Object3D,
  Vector3,
  type Group,
  type InstancedMesh,
} from "three";

type CrystalDatum = {
  position: Vector3;
  scale: Vector3;
  speed: number;
  phase: number;
  drift: number;
};

type DustDatum = {
  position: Vector3;
  scale: number;
  speed: number;
  phase: number;
};

const dummy = new Object3D();
const tint = new Color();

function createCrystals(): CrystalDatum[] {
  return Array.from({ length: 16 }, (_, index) => {
    const angle = index * 0.55;
    const radius = 5.2 + (index % 4) * 1.1;
    return {
      position: new Vector3(
        Math.cos(angle) * radius,
        (index % 6) - 2.8,
        Math.sin(angle) * radius - 5.5
      ),
      scale: new Vector3(0.2 + (index % 3) * 0.08, 0.9 + (index % 5) * 0.22, 0.2),
      speed: 0.18 + (index % 5) * 0.04,
      phase: index * 0.8,
      drift: 0.16 + (index % 4) * 0.04,
    };
  });
}

function createDust(count: number): DustDatum[] {
  return Array.from({ length: count }, (_, index) => ({
    position: new Vector3(
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 16,
      -2 - Math.random() * 11
    ),
    scale: 0.012 + Math.random() * 0.025,
    speed: 0.18 + Math.random() * 0.22,
    phase: index * 0.37 + Math.random(),
  }));
}

function ScrollRig({ children }: { children: ReactNode }) {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;

    const scrollRange = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const scrollProgress = window.scrollY / scrollRange;

    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      -0.18 + state.pointer.y * 0.08 + scrollProgress * 0.16,
      3,
      delta
    );
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      state.pointer.x * 0.18 - 0.2 + scrollProgress * 0.28,
      3,
      delta
    );
    group.current.position.x = MathUtils.damp(group.current.position.x, state.pointer.x * 0.7, 3, delta);
    group.current.position.y = MathUtils.damp(group.current.position.y, -scrollProgress * 2.2, 3, delta);
  });

  return <group ref={group}>{children}</group>;
}

function BackgroundGlow() {
  const left = useRef<Group>(null);
  const right = useRef<Group>(null);
  const bottom = useRef<Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (left.current) {
      left.current.position.y = 1.5 + Math.sin(time * 0.2) * 0.45;
    }
    if (right.current) {
      right.current.position.y = -1.8 + Math.cos(time * 0.24) * 0.5;
    }
    if (bottom.current) {
      bottom.current.position.x = Math.sin(time * 0.16) * 0.4;
    }
  });

  return (
    <>
      <group ref={left} position={[-6.5, 1.5, -8.5]}>
        <mesh>
          <sphereGeometry args={[3.6, 32, 32]} />
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.13}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
      <group ref={right} position={[7, -1.8, -9]}>
        <mesh>
          <sphereGeometry args={[4.2, 32, 32]} />
          <meshBasicMaterial
            color="#c084fc"
            transparent
            opacity={0.1}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
      <group ref={bottom} position={[0, -7.5, -7]}>
        <mesh>
          <sphereGeometry args={[4.8, 32, 32]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.08}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  );
}

function CrystalField() {
  const mesh = useRef<InstancedMesh>(null);
  const crystals = useMemo(() => createCrystals(), []);

  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.getElapsedTime();
    for (let index = 0; index < crystals.length; index++) {
      const crystal = crystals[index];
      dummy.position.copy(crystal.position);
      dummy.position.y += Math.sin(time * crystal.speed + crystal.phase) * crystal.drift;
      dummy.rotation.set(
        Math.sin(time * crystal.speed + crystal.phase) * 0.25,
        time * crystal.speed * 0.8 + crystal.phase,
        Math.cos(time * crystal.speed + crystal.phase) * 0.25
      );
      dummy.scale.copy(crystal.scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(index, dummy.matrix);

      tint.set(index % 3 === 0 ? "#7dd3fc" : index % 3 === 1 ? "#c4b5fd" : "#f0f9ff");
      tint.offsetHSL(0, 0, Math.sin(time + index) * 0.04);
      mesh.current.setColorAt(index, tint);
    }

    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) {
      mesh.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, crystals.length]}>
      <octahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        transparent
        opacity={0.2}
        roughness={0.08}
        metalness={0.18}
        clearcoat={1}
        clearcoatRoughness={0.12}
      />
    </instancedMesh>
  );
}

function OrbitBands() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.getElapsedTime();
    group.current.rotation.z = time * 0.04;
    group.current.rotation.x = 1.15 + Math.sin(time * 0.15) * 0.08;
  });

  return (
    <group ref={group} position={[0, 0.5, -6]}>
      <mesh>
        <torusGeometry args={[7.2, 0.02, 12, 220]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.18} depthWrite={false} />
      </mesh>
      <mesh rotation={[0.4, 1.1, 0.2]}>
        <torusGeometry args={[5.6, 0.018, 12, 220]} />
        <meshBasicMaterial color="#e9d5ff" transparent opacity={0.13} depthWrite={false} />
      </mesh>
    </group>
  );
}

function DustField() {
  const mesh = useRef<InstancedMesh>(null);
  const particles = useMemo(() => createDust(130), []);

  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.getElapsedTime();
    for (let index = 0; index < particles.length; index++) {
      const particle = particles[index];
      dummy.position.copy(particle.position);
      dummy.position.y += Math.sin(time * particle.speed + particle.phase) * 0.14;
      dummy.position.x += Math.cos(time * particle.speed * 0.8 + particle.phase) * 0.06;
      dummy.scale.setScalar(
        particle.scale * (0.8 + (Math.sin(time * 2.2 + particle.phase) + 1) * 0.24)
      );
      dummy.updateMatrix();
      mesh.current.setMatrixAt(index, dummy.matrix);
    }

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, particles.length]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.45} depthWrite={false} />
    </instancedMesh>
  );
}

function EdgeMonoliths() {
  const left = useRef<Group>(null);
  const right = useRef<Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (left.current) {
      left.current.rotation.y = 0.4 + Math.sin(time * 0.14) * 0.08;
    }
    if (right.current) {
      right.current.rotation.y = -0.5 + Math.cos(time * 0.16) * 0.08;
    }
  });

  return (
    <>
      <group ref={left} position={[-7.2, -0.8, -4.5]}>
        <mesh scale={[0.4, 4.8, 0.4]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#dbeafe" transparent opacity={0.16} />
        </mesh>
      </group>
      <group ref={right} position={[7.4, 1.5, -4.2]}>
        <mesh scale={[0.35, 5.4, 0.35]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ede9fe" transparent opacity={0.14} />
        </mesh>
      </group>
    </>
  );
}

export default function SiteScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 10], fov: 48 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <fog attach="fog" args={["#020617", 8, 18]} />

      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 5, 3]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-5, 2, 2]} intensity={10} color="#22d3ee" distance={14} />
        <pointLight position={[6, -1, 3]} intensity={10} color="#c084fc" distance={14} />

        <BackgroundGlow />
        <ScrollRig>
          <OrbitBands />
          <CrystalField />
          <DustField />
          <EdgeMonoliths />
        </ScrollRig>
      </Suspense>
    </Canvas>
  );
}
