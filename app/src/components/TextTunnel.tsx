import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const words = ['EQUITY', 'RESEARCH', 'VALUATION', 'STRATEGY', 'ANALYSIS', 'MARKETS', 'DERIVATIVES', 'FINANCE', 'MODELS', 'INSIGHTS', 'BLOOMBERG', 'EXCEL'];

interface TextTunnelProps {
  className?: string;
}

export default function TextTunnel({ className }: TextTunnelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameIdRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    const config = {
      ringCount: isMobile ? 8 : 12,
      ringRadius: isMobile ? 240 : 320,
      fontSize: isMobile ? 80 : 120,
      ringSpacing: 60,
      textColor: '#C4956A',
      backgroundColor: '#1A1A1A',
      baseSpeed: 0.002,
      wordSpacing: 1.5,
    };

    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(config.backgroundColor);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000);
    camera.position.z = 1500;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Font loading - use a default font first, then Playfair
    const fontFace = new FontFace(
      'PlayfairDisplayTunnel',
      `url(https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKd3vXDXbtM.woff2)`
    );

    fontFace.load().then((loadedFace) => {
      document.fonts.add(loadedFace);
      buildAndAnimate();
    }).catch(() => {
      // Fallback: use system serif font
      buildAndAnimate();
    });

    let tunnel: THREE.Group;
    let speed = config.baseSpeed;
    let mouseX = 0;
    let mouseY = 0;
    const maxZ = config.ringCount * config.ringSpacing;

    function createRing(word: string, radius: number, zPos: number): THREE.Group {
      const ring = new THREE.Group();

      // Create canvas texture for the word
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      // Measure text
      ctx.font = `${config.fontSize}px "Playfair Display", "PlayfairDisplayTunnel", Georgia, serif`;
      const metrics = ctx.measureText(word);
      const textWidth = (metrics.width / config.fontSize) * config.fontSize;
      const textHeight = config.fontSize * 1.2;

      canvas.width = Math.ceil(textWidth) + 20;
      canvas.height = Math.ceil(textHeight);

      // Draw text
      ctx.font = `${config.fontSize}px "Playfair Display", "PlayfairDisplayTunnel", Georgia, serif`;
      ctx.fillStyle = config.textColor;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(word, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      const aspect = canvas.width / canvas.height;
      const planeHeight = config.ringRadius * 0.4;
      const planeWidth = planeHeight * aspect;

      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        opacity: 0,
        depthWrite: false,
      });

      const circumference = 2 * Math.PI * radius;
      const count = Math.floor(circumference / (planeWidth + config.wordSpacing));

      for (let i = 0; i < count; i++) {
        const mesh = new THREE.Mesh(geometry, material.clone());
        const angle = (i / count) * Math.PI * 2;
        mesh.position.x = Math.cos(angle) * radius;
        mesh.position.y = Math.sin(angle) * radius;
        mesh.position.z = zPos;
        mesh.rotation.z = angle - Math.PI / 2;
        ring.add(mesh);
      }

      return ring;
    }

    function buildAndAnimate() {
      tunnel = new THREE.Group();

      for (let i = 0; i < config.ringCount; i++) {
        const word = words[i % words.length];
        const zPos = -i * config.ringSpacing;
        const ring = createRing(word, config.ringRadius, zPos);
        ring.userData = { originalZ: zPos, index: i };
        tunnel.add(ring);
      }

      scene.add(tunnel);

      // Entrance animation - stagger ring fade in
      tunnel.children.forEach((ring, i) => {
        ring.children.forEach((mesh) => {
          const mat = (mesh as THREE.Mesh).material as THREE.MeshBasicMaterial;
          setTimeout(() => {
            const startTime = Date.now();
            const duration = 600;
            function fadeIn() {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              mat.opacity = progress * 0.85;
              if (progress < 1) {
                requestAnimationFrame(fadeIn);
              }
            }
            fadeIn();
          }, 500 + i * 100);
        });
      });

      animate();
    }

    function animate() {
      frameIdRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current || !tunnel) return;

      tunnel.children.forEach((ring) => {
        ring.position.z += speed * 60;
        if (ring.position.z > config.ringSpacing) {
          ring.position.z -= maxZ + config.ringSpacing;
        }
      });

      tunnel.rotation.x += (mouseY * 0.5 - tunnel.rotation.x) * 0.05;
      tunnel.rotation.y += (mouseX * 0.5 - tunnel.rotation.y) * 0.05;

      renderer.render(scene, camera);
    }

    // Mouse handlers
    function onMouseMove(e: MouseEvent) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((e.clientY - rect.top) / rect.height) * 2 - 1;
      }
    }

    function onTouchMove(e: TouchEvent) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      if (touch &&
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        mouseX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((touch.clientY - rect.top) / rect.height) * 2 - 1;
      }
    }

    function accelerate() {
      speed = 0.004;
    }

    function resetSpeed() {
      speed = config.baseSpeed;
    }

    // Intersection observer for performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('mousedown', accelerate);
    container.addEventListener('mouseup', resetSpeed);
    container.addEventListener('touchstart', accelerate);
    container.addEventListener('touchend', resetSpeed);

    function onResize() {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousedown', accelerate);
        containerRef.current.removeEventListener('mouseup', resetSpeed);
        containerRef.current.removeEventListener('touchstart', accelerate);
        containerRef.current.removeEventListener('touchend', resetSpeed);
      }
      observer.disconnect();

      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (containerRef.current && containerRef.current.contains(rendererRef.current.domElement)) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }

      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (child.material instanceof THREE.Material) {
            child.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
        cursor: 'grab',
      }}
      role="img"
      aria-label="3D text tunnel showing finance keywords"
    />
  );
}
