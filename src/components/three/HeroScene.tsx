import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, Suspense } from "react";
import {
  BufferGeometry,
  Float32BufferAttribute,
  Vector3,
  type Group,
  type Mesh,
  type InstancedMesh,
  Object3D,
  Color,
} from "three";

/**
 * Knowledge graph network — the visual identity of Graph RAG / agent systems.
 * Nodes drift in a sphere, edges connect nearby nodes, signal pulses
 * periodically travel along random edges.
 */

type Node = { pos: Vector3; phase: number };
type Edge = { a: number; b: number };

function generateNodes(count: number, radius: number): Node[] {
  const nodes: Node[] = [];
  for (let i = 0; i < count; i++) {
    // Fibonacci sphere for even distribution
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const jitter = 0.35;
    nodes.push({
      pos: new Vector3(
        radius * Math.cos(theta) * Math.sin(phi) + (Math.random() - 0.5) * jitter,
        radius * Math.sin(theta) * Math.sin(phi) + (Math.random() - 0.5) * jitter,
        radius * Math.cos(phi) + (Math.random() - 0.5) * jitter
      ),
      phase: Math.random() * Math.PI * 2,
    });
  }
  return nodes;
}

function buildEdges(nodes: Node[], maxDist: number, maxPerNode: number): Edge[] {
  const edges: Edge[] = [];
  const counts = new Array(nodes.length).fill(0);
  for (let i = 0; i < nodes.length; i++) {
    // sort neighbors by distance, take closest few
    const neighbors = nodes
      .map((n, j) => ({ j, d: nodes[i].pos.distanceTo(n.pos) }))
      .filter((n) => n.j !== i && n.d < maxDist)
      .sort((a, b) => a.d - b.d);
    for (const n of neighbors) {
      if (counts[i] >= maxPerNode) break;
      if (counts[n.j] >= maxPerNode) continue;
      if (edges.some((e) => (e.a === i && e.b === n.j) || (e.a === n.j && e.b === i))) continue;
      edges.push({ a: i, b: n.j });
      counts[i]++;
      counts[n.j]++;
    }
  }
  return edges;
}

const dummy = new Object3D();
const tmpColor = new Color();

function GraphNetwork() {
  const group = useRef<Group>(null);
  const nodesMesh = useRef<InstancedMesh>(null);
  const signalsMesh = useRef<InstancedMesh>(null);

  const { nodes, edges, lineGeometry } = useMemo(() => {
    const nodes = generateNodes(26, 2.6);
    const edges = buildEdges(nodes, 2.2, 4);
    const positions: number[] = [];
    edges.forEach(({ a, b }) => {
      positions.push(
        nodes[a].pos.x, nodes[a].pos.y, nodes[a].pos.z,
        nodes[b].pos.x, nodes[b].pos.y, nodes[b].pos.z
      );
    });
    const lineGeometry = new BufferGeometry();
    lineGeometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return { nodes, edges, lineGeometry };
  }, []);

  // Signal particles — each randomly assigned to an edge, interpolates a→b
  const signalCount = 6;
  const signals = useRef(
    Array.from({ length: signalCount }, () => ({
      edge: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      speed: 0.25 + Math.random() * 0.35,
    }))
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate whole graph slowly
    if (group.current) {
      group.current.rotation.y = time * 0.08;
      group.current.rotation.x = Math.sin(time * 0.15) * 0.15;
    }

    // Node pulse: scale via sin + phase
    if (nodesMesh.current) {
      for (let i = 0; i < nodes.length; i++) {
        const pulse = 0.85 + Math.sin(time * 1.6 + nodes[i].phase) * 0.3;
        dummy.position.copy(nodes[i].pos);
        dummy.scale.setScalar(pulse * 0.06);
        dummy.updateMatrix();
        nodesMesh.current.setMatrixAt(i, dummy.matrix);

        // per-instance color intensity
        const intensity = 0.7 + Math.sin(time * 1.6 + nodes[i].phase) * 0.3;
        tmpColor.setRGB(intensity, intensity, intensity);
        nodesMesh.current.setColorAt(i, tmpColor);
      }
      nodesMesh.current.instanceMatrix.needsUpdate = true;
      if (nodesMesh.current.instanceColor) nodesMesh.current.instanceColor.needsUpdate = true;
    }

    // Signals travel along edges
    if (signalsMesh.current) {
      for (let i = 0; i < signals.current.length; i++) {
        const s = signals.current[i];
        s.t += s.speed * 0.016;
        if (s.t >= 1) {
          s.t = 0;
          s.edge = Math.floor(Math.random() * edges.length);
          s.speed = 0.25 + Math.random() * 0.35;
        }
        const edge = edges[s.edge];
        if (!edge) continue;
        const a = nodes[edge.a].pos;
        const b = nodes[edge.b].pos;
        dummy.position.set(
          a.x + (b.x - a.x) * s.t,
          a.y + (b.y - a.y) * s.t,
          a.z + (b.z - a.z) * s.t
        );
        dummy.scale.setScalar(0.05);
        dummy.updateMatrix();
        signalsMesh.current.setMatrixAt(i, dummy.matrix);
      }
      signalsMesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      {/* Edges */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </lineSegments>

      {/* Nodes */}
      <instancedMesh ref={nodesMesh} args={[undefined, undefined, nodes.length]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </instancedMesh>

      {/* Signal pulses */}
      <instancedMesh ref={signalsMesh} args={[undefined, undefined, signalCount]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

function OrbitingRing() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.1;
    ref.current.rotation.y = t * 0.15;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[3.4, 0.005, 8, 128]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <GraphNetwork />
        <OrbitingRing />
      </Suspense>
    </Canvas>
  );
}
