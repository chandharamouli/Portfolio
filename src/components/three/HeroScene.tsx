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

type PanelDatum = {
  position: Vector3;
  rotation: Vector3;
  scale: Vector3;
  drift: number;
  spin: number;
};

type ParticleDatum = {
  position: Vector3;
  scale: number;
  speed: number;
  phase: number;
};

const dummy = new Object3D();
const tint = new Color();

function createPanels(): PanelDatum[] {
  return [
    {
      position: new Vector3(-2.6, 1.8, -0.7),
      rotation: new Vector3(-0.4, 0.9, -0.25),
      scale: new Vector3(1.7, 2.5, 0.12),
      drift: 0.6,
      spin: 0.2,
    },
    {
      position: new Vector3(2.35, 1.4, -1.1),
      rotation: new Vector3(0.25, -0.8, 0.32),
      scale: new Vector3(1.4, 2.1, 0.12),
      drift: 0.7,
      spin: -0.16,
    },
    {
      position: new Vector3(-2.2, -1.6, 0.2),
      rotation: new Vector3(0.45, 0.72, -0.52),
      scale: new Vector3(1.25, 1.9, 0.12),
      drift: 0.8,
      spin: 0.18,
    },
    {
      position: new Vector3(2.7, -1.8, -0.3),
      rotation: new Vector3(-0.24, -1.05, 0.28),
      scale: new Vector3(1.6, 2.4, 0.12),
      drift: 0.65,
      spin: -0.22,
    },
    {
      position: new Vector3(0.35, 2.45, -1.7),
      rotation: new Vector3(-0.8, 0.3, 0.4),
      scale: new Vector3(1.2, 1.8, 0.12),
      drift: 0.55,
      spin: 0.14,
    },
    {
      position: new Vector3(-0.55, -2.5, -1.45),
      rotation: new Vector3(0.82, -0.22, -0.38),
      scale: new Vector3(1.05, 1.6, 0.12),
      drift: 0.75,
      spin: -0.12,
    },
  ];
}

function createParticles(count: number): ParticleDatum[] {
  return Array.from({ length: count }, (_, index) => {
    const angle = index * 0.52;
    const radius = 2.6 + (index % 9) * 0.18 + Math.random() * 0.4;
    return {
      position: new Vector3(
        Math.cos(angle) * radius,
        Math.sin(index * 0.36) * 2.4,
        Math.sin(angle) * radius - 1.8 + Math.random() * 1.2
      ),
      scale: 0.018 + Math.random() * 0.038,
      speed: 0.4 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2,
    };
  });
}

function SceneRig({ children }: { children: ReactNode }) {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      state.pointer.y * 0.22 - 0.1,
      3.5,
      delta
    );
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      state.pointer.x * 0.38 + 0.25,
      3.5,
      delta
    );
    group.current.position.x = MathUtils.damp(group.current.position.x, state.pointer.x * 0.45, 4, delta);
    group.current.position.y = MathUtils.damp(group.current.position.y, state.pointer.y * 0.24, 4, delta);
  });

  return <group ref={group}>{children}</group>;
}

function BackgroundGlow() {
  const left = useRef<Group>(null);
  const right = useRef<Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (left.current) {
      left.current.position.y = Math.sin(time * 0.45) * 0.2;
    }
    if (right.current) {
      right.current.position.y = Math.cos(time * 0.4) * 0.28;
    }
  });

  return (
    <>
      <group ref={left} position={[-3.8, 1.1, -4.8]}>
        <mesh>
          <sphereGeometry args={[1.9, 32, 32]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.16}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
      <group ref={right} position={[4.1, -1.4, -5.4]}>
        <mesh>
          <sphereGeometry args={[2.4, 32, 32]} />
          <meshBasicMaterial
            color="#f9a8d4"
            transparent
            opacity={0.12}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  );
}

function FloatingPanels() {
  const mesh = useRef<InstancedMesh>(null);
  const panels = useMemo(() => createPanels(), []);

  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.getElapsedTime();
    for (let index = 0; index < panels.length; index++) {
      const panel = panels[index];
      dummy.position.copy(panel.position);
      dummy.position.y += Math.sin(time * panel.drift + index) * 0.18;
      dummy.position.x += Math.cos(time * (panel.drift * 0.7) + index) * 0.08;
      dummy.rotation.set(
        panel.rotation.x + Math.sin(time * panel.spin + index) * 0.08,
        panel.rotation.y + time * panel.spin,
        panel.rotation.z + Math.cos(time * panel.spin + index * 0.5) * 0.08
      );
      dummy.scale.copy(panel.scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(index, dummy.matrix);

      tint.set(index % 2 === 0 ? "#dbeafe" : "#e0f2fe");
      tint.offsetHSL(0, 0, Math.sin(time + index) * 0.05);
      mesh.current.setColorAt(index, tint);
    }

    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) {
      mesh.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, panels.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        transparent
        opacity={0.18}
        roughness={0.08}
        metalness={0.12}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={0.6}
      />
    </instancedMesh>
  );
}

function ParticleField() {
  const mesh = useRef<InstancedMesh>(null);
  const particles = useMemo(() => createParticles(90), []);

  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.getElapsedTime();
    for (let index = 0; index < particles.length; index++) {
      const particle = particles[index];
      dummy.position.copy(particle.position);
      dummy.position.y += Math.sin(time * particle.speed + particle.phase) * 0.2;
      dummy.position.x += Math.cos(time * particle.speed * 0.8 + particle.phase) * 0.08;
      dummy.scale.setScalar(
        particle.scale * (0.75 + (Math.sin(time * 2 + particle.phase) + 1) * 0.28)
      );
      dummy.updateMatrix();
      mesh.current.setMatrixAt(index, dummy.matrix);
    }

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, particles.length]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.58} depthWrite={false} />
    </instancedMesh>
  );
}

function CoreOrb() {
  const shell = useRef<Group>(null);
  const halo = useRef<Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (shell.current) {
      shell.current.rotation.x = time * 0.15;
      shell.current.rotation.y = time * 0.22;
      shell.current.position.y = Math.sin(time * 0.7) * 0.12;
    }

    if (halo.current) {
      halo.current.rotation.z = time * 0.16;
      halo.current.rotation.x = Math.sin(time * 0.35) * 0.3;
    }
  });

  return (
    <group>
      <group ref={shell}>
        <mesh>
          <icosahedronGeometry args={[1.18, 5]} />
          <meshPhysicalMaterial
            color="#dbeafe"
            transparent
            opacity={0.2}
            roughness={0.04}
            metalness={0.18}
            clearcoat={1}
            clearcoatRoughness={0.08}
            emissive="#7dd3fc"
            emissiveIntensity={0.35}
          />
        </mesh>
        <mesh scale={0.72}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#f8fafc"
            transparent
            opacity={0.85}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      <group ref={halo}>
        <mesh rotation={[1.15, 0.3, 0]}>
          <torusGeometry args={[1.85, 0.018, 12, 160]} />
          <meshBasicMaterial color="#7dd3fc" transparent opacity={0.55} depthWrite={false} />
        </mesh>
        <mesh rotation={[0.4, 1.2, 0.45]}>
          <torusGeometry args={[2.35, 0.012, 10, 160]} />
          <meshBasicMaterial color="#f5d0fe" transparent opacity={0.35} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

function AccentCluster() {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.rotation.y = -time * 0.18;
    ref.current.position.y = Math.sin(time * 0.55) * 0.22;
  });

  return (
    <group ref={ref} position={[0, -0.1, -0.35]}>
      <mesh position={[1.55, 0.6, 0.4]} scale={0.32}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#bfdbfe" emissive="#93c5fd" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-1.7, -0.3, 0.75]} rotation={[0.8, 0.4, 0.2]} scale={[0.18, 0.78, 0.18]}>
        <cylinderGeometry args={[1, 1, 1, 24]} />
        <meshStandardMaterial color="#f8fafc" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0.15, -1.65, -0.1]} rotation={[1.2, 0.2, 0.7]} scale={[0.24, 0.9, 0.24]}>
        <cylinderGeometry args={[1, 1, 1, 24]} />
        <meshStandardMaterial color="#fde68a" emissive="#fef08a" emissiveIntensity={0.32} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 8.5], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#020617", 8, 17]} />

      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 5, 6]} intensity={1.15} color="#ffffff" />
        <pointLight position={[-4, 2, 4]} intensity={18} color="#38bdf8" distance={11} />
        <pointLight position={[4, -1, 5]} intensity={15} color="#f9a8d4" distance={12} />
        <spotLight position={[0, 6, 5]} angle={0.45} penumbra={1} intensity={20} color="#dbeafe" />

        <BackgroundGlow />

        <SceneRig>
          <ParticleField />
          <FloatingPanels />
          <CoreOrb />
          <AccentCluster />
        </SceneRig>
      </Suspense>
    </Canvas>
  );
}
