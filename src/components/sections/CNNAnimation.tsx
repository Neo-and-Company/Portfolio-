
"use client";

import React, { useEffect, useRef } from 'react';
// IMPORTANT: You need to install three.js and its types:
// npm install three
// npm install --save-dev @types/three
import * as THREE from 'three'; // Now uncommented

const CNNAnimation: React.FC = () => {
    const animationSectionRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const linesRef = useRef<THREE.Line[]>([]);
    const particlesRef = useRef<THREE.Mesh[]>([]);
    const layerDefinitionsRef = useRef<any[]>([]); // To store layer data including nodes
    const animationStartedRef = useRef(false);
    const clockRef = useRef(new THREE.Clock());

    useEffect(() => {
        if (typeof window === 'undefined' || !animationSectionRef.current || !canvasRef.current) {
            return;
        }
        
        const section = animationSectionRef.current;
        const canvas = canvasRef.current;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, section.offsetWidth / section.offsetHeight, 0.1, 1000);
        camera.position.set(0, 7, 30);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        renderer.setSize(section.offsetWidth, section.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        rendererRef.current = renderer;

        // --- CNN Structure Configuration ---
        const layerDefinitions = [
            { type: 'input', size: { x: 10, y: 10, z: 1 }, nodes: [], color: 0x00AFFF, emissive: 0x0077FF, spacing: 0.6 },
            { type: 'conv', size: { x: 8, y: 8, z: 3 }, nodes: [], color: 0x4CAF50, emissive: 0x388E3C, spacing: 0.7, kernelSize: 2, numKernels: 3 },
            { type: 'pool', size: { x: 4, y: 4, z: 3 }, nodes: [], color: 0xFFC107, emissive: 0xFF8F00, spacing: 0.8 },
            { type: 'conv', size: { x: 3, y: 3, z: 5 }, nodes: [], color: 0x4CAF50, emissive: 0x388E3C, spacing: 0.7, kernelSize: 2, numKernels: 2 },
            { type: 'pool', size: { x: 1, y: 1, z: 5 }, nodes: [], color: 0xFFC107, emissive: 0xFF8F00, spacing: 0.8 },
            { type: 'fc', size: { x: 1, y: 1, z: 15 }, nodes: [], color: 0x9C27B0, emissive: 0x7B1FA2, spacing: 0.4 },
            { type: 'output', size: { x: 1, y: 1, z: 3 }, nodes: [], color: 0xE91E63, emissive: 0xC2185B, spacing: 0.6 }
        ];
        layerDefinitionsRef.current = layerDefinitions;
        const LAYER_X_OFFSET = 6;
        const TOTAL_WIDTH = (layerDefinitions.length - 1) * LAYER_X_OFFSET;

        const lines: THREE.Line[] = [];
        const particles: THREE.Mesh[] = [];
        const MAX_PARTICLES_TOTAL = 200;

        const nodeGeometry = new THREE.SphereGeometry(0.18, 12, 12);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x78909C, transparent: true, opacity: 0, linewidth: 1 });
        const particleBaseColor = new THREE.Color(0xFFFFFF);

        let currentX = -TOTAL_WIDTH / 2;
        layerDefinitions.forEach((layerDef, layerIndex) => {
            const nodeMaterial = new THREE.MeshStandardMaterial({
                color: layerDef.color, emissive: layerDef.emissive, emissiveIntensity: 0.6,
                metalness: 0.2, roughness: 0.6
            });
            const layerWidth = (layerDef.size.x - 1) * layerDef.spacing;
            const layerHeight = (layerDef.size.y - 1) * layerDef.spacing;

            for (let k = 0; k < layerDef.size.z; k++) {
                for (let i = 0; i < layerDef.size.x; i++) {
                    for (let j = 0; j < layerDef.size.y; j++) {
                        const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
                        node.position.set(
                            currentX - layerWidth / 2 + i * layerDef.spacing,
                            -layerHeight / 2 + j * layerDef.spacing,
                            (k - (layerDef.size.z - 1) / 2) * (layerDef.type === 'fc' || layerDef.type === 'output' ? 0.5 : 0.8)
                        );
                        node.userData = { layerIndex, type: layerDef.type, activationTimer: 0, baseEmissiveIntensity: 0.6 };
                        scene.add(node);
                        layerDef.nodes.push(node);
                    }
                }
            }
            currentX += LAYER_X_OFFSET;
        });
        
        for (let i = 0; i < layerDefinitions.length - 1; i++) {
            const currentLayerNodes = layerDefinitions[i].nodes;
            const nextLayerNodes = layerDefinitions[i + 1].nodes;
            currentLayerNodes.forEach(startNode => {
                for (let k = 0; k < Math.min(nextLayerNodes.length, 3); k++) {
                    const endNode = nextLayerNodes[Math.floor(Math.random() * nextLayerNodes.length)];
                    const points = [startNode.position.clone(), endNode.position.clone()];
                    const curve = new THREE.CatmullRomCurve3([
                        points[0],
                        new THREE.Vector3().lerpVectors(points[0], points[1], 0.3).add(new THREE.Vector3(0, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2)),
                        new THREE.Vector3().lerpVectors(points[0], points[1], 0.7).add(new THREE.Vector3(0, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2)),
                        points[1]
                    ]);
                    const curvePoints = curve.getPoints(10);

                    const geometry = new THREE.BufferGeometry().setFromPoints([points[0], points[0]]);
                    const line = new THREE.Line(geometry, lineMaterial.clone());
                    line.userData = { startNode, endNode, targetPoints: points, curvePoints, currentDrawProgress: 0, isDrawn: false, initialOpacity: 0.3 + Math.random() * 0.2 };
                    scene.add(line);
                    lines.push(line);
                }
            });
        }
        linesRef.current = lines;
        particlesRef.current = particles; // Initially empty

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
        keyLight.position.set(-10, 10, 15);
        scene.add(keyLight);

        const animate = () => {
            animationFrameId.current = requestAnimationFrame(animate);
            const deltaTime = clockRef.current.getDelta();
            const elapsedTime = clockRef.current.getElapsedTime();
            const currentLayerDefs = layerDefinitionsRef.current;
            const currentLines = linesRef.current;
            const currentParticles = particlesRef.current;

            currentLayerDefs.forEach(layerDef => {
                layerDef.nodes.forEach((node: THREE.Mesh) => {
                    if (node.userData.activationTimer > 0) {
                        node.userData.activationTimer -= deltaTime;
                        const pulseProgress = Math.max(0, node.userData.activationTimer / 0.3);
                        (node.material as THREE.MeshStandardMaterial).emissiveIntensity = node.userData.baseEmissiveIntensity + Math.sin(pulseProgress * Math.PI) * 1.0;
                        node.scale.setScalar(1 + Math.sin(pulseProgress * Math.PI) * 0.15);
                    } else {
                        (node.material as THREE.MeshStandardMaterial).emissiveIntensity = node.userData.baseEmissiveIntensity;
                        node.scale.setScalar(1.0);
                    }
                });
            });

            if (animationStartedRef.current) {
                currentLines.forEach(line => {
                    if (!line.userData.isDrawn && line.userData.currentDrawProgress < 1) {
                        line.userData.currentDrawProgress += 1.2 * deltaTime;
                        line.userData.currentDrawProgress = Math.min(line.userData.currentDrawProgress, 1);

                        const currentEndPoint = new THREE.Vector3().lerpVectors(
                            line.userData.targetPoints[0],
                            line.userData.targetPoints[1],
                            line.userData.currentDrawProgress
                        );
                        (line.geometry as THREE.BufferGeometry).setFromPoints([line.userData.targetPoints[0], currentEndPoint]);
                        (line.geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true;
                        (line.material as THREE.LineBasicMaterial).opacity = line.userData.currentDrawProgress * line.userData.initialOpacity * (1 + Math.sin(line.userData.currentDrawProgress * Math.PI) * 0.3);

                        if (line.userData.currentDrawProgress >= 1) {
                            line.userData.isDrawn = true;
                            (line.material as THREE.LineBasicMaterial).opacity = line.userData.initialOpacity * 0.4;
                        }
                    }

                    if (line.userData.isDrawn && currentParticles.length < MAX_PARTICLES_TOTAL) {
                        if (Math.random() < 0.015) {
                            const particleMaterial = new THREE.MeshBasicMaterial({ color: particleBaseColor.getHex() });
                            const particle = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 6), particleMaterial);
                            particle.position.copy(line.userData.curvePoints[0]);
                            particle.userData = {
                                line: line, progress: 0, speed: 0.6 + Math.random() * 0.4,
                                color: particleBaseColor.clone(),
                                currentLayerIndex: line.userData.startNode.userData.layerIndex
                            };
                            currentParticles.push(particle);
                            scene.add(particle);
                        }
                    }
                });

                for (let i = currentParticles.length - 1; i >= 0; i--) {
                    const p = currentParticles[i];
                    const line = p.userData.line;

                    p.userData.progress += p.userData.speed * deltaTime;
                    if (p.userData.progress >= 1) {
                        line.userData.endNode.userData.activationTimer = 0.3;
                        scene.remove(p); currentParticles.splice(i, 1); continue;
                    }

                    const curveIndex = Math.floor(p.userData.progress * (line.userData.curvePoints.length - 1));
                    p.position.copy(line.userData.curvePoints[curveIndex]);

                    const targetLayerIndex = line.userData.endNode.userData.layerIndex;
                    const targetColor = new THREE.Color(currentLayerDefs[targetLayerIndex].color);
                    (p.material as THREE.MeshBasicMaterial).color.lerpColors(particleBaseColor, targetColor, p.userData.progress * 0.8 + 0.1);
                    (p.material as THREE.MeshBasicMaterial).opacity = 1.0 - p.userData.progress * 0.6;
                    
                    const nodeType = line.userData.startNode.userData.type;
                    if(nodeType === 'conv' && p.userData.progress > 0.2 && p.userData.progress < 0.8){
                        p.scale.setScalar(1.0 + Math.sin(elapsedTime * 20 + p.userData.progress * 10) * 0.3);
                    } else if (nodeType === 'pool' && p.userData.progress > 0.5){
                        p.scale.setScalar(1.0 - (p.userData.progress - 0.5) * 1.5);
                    } else if (nodeType === 'fc' && p.userData.progress > 0.3){
                         (p.material as THREE.MeshBasicMaterial).color.lerp(new THREE.Color(0xffffff), Math.sin(p.userData.progress * Math.PI) * 0.3);
                    } else {
                        p.scale.setScalar(1.0);
                    }
                }
            }
            scene.rotation.y += 0.00025;
            scene.rotation.x += 0.00008;
            renderer.render(scene, camera);
        };

        const handleScroll = () => {
            if (!animationSectionRef.current) return;
            const rect = animationSectionRef.current.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1) {
                if (!animationStartedRef.current) {
                    animationStartedRef.current = true;
                    linesRef.current.forEach(line => {
                        (line.material as THREE.LineBasicMaterial).opacity = 0;
                        line.userData.currentDrawProgress = 0;
                        line.userData.isDrawn = false;
                        (line.geometry as THREE.BufferGeometry).setFromPoints([line.userData.targetPoints[0], line.userData.targetPoints[0]]);
                    });
                }
            }
        };

        const handleResize = () => {
            if (!animationSectionRef.current || !rendererRef.current || !cameraRef.current) return;
            cameraRef.current.aspect = animationSectionRef.current.offsetWidth / animationSectionRef.current.offsetHeight;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(animationSectionRef.current.offsetWidth, animationSectionRef.current.offsetHeight);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);
        
        handleScroll();
        animate();

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            
            // Dispose Three.js resources
            if (sceneRef.current) {
                sceneRef.current.traverse(object => {
                    if (object instanceof THREE.Mesh) {
                        if (object.geometry) object.geometry.dispose();
                        if (object.material) {
                             if (Array.isArray(object.material)) {
                                (object.material as THREE.Material[]).forEach(material => material.dispose());
                            } else {
                                (object.material as THREE.Material).dispose();
                            }
                        }
                    } else if (object instanceof THREE.Line) {
                        if (object.geometry) object.geometry.dispose();
                        if (object.material) (object.material as THREE.Material).dispose();
                    }
                });
                sceneRef.current.clear(); // Clears children
            }
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
        };

    }, []);

    return (
        <section 
            ref={animationSectionRef} 
            id="heroAnimationSection" 
            className="h-[85vh] relative overflow-hidden flex items-center justify-center"
            style={{ paddingTop: '80px' }} 
        >
            <canvas ref={canvasRef} id="animationCanvas" className="absolute top-0 left-0 w-full h-full z-[1]"></canvas>
            <div className="relative z-[2] text-center p-5 text-foreground">
                <h1 className="text-4xl md:text-5xl font-bold mb-2.5">CNN In Action</h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl md:max-w-2xl mx-auto">
                    Visualizing feature extraction and classification.
                </p>
            </div>
        </section>
    );
};

export default CNNAnimation;
    

    