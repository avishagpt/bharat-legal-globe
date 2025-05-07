import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { IndianCity } from '@/types';

interface GlobeProps {
  cities: IndianCity[];
  onCitySelect: (city: IndianCity) => void;
}

const Globe: React.FC<GlobeProps> = ({ cities, onCitySelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000510);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 200;
    
    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 100;
    controls.maxDistance = 300;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Earth texture loader
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('/earth-texture.jpg');
    const bumpMap = textureLoader.load('/earth-bump.jpg');
    const specularMap = textureLoader.load('/earth-specular.jpg');
    const cloudsTexture = textureLoader.load('/earth-clouds.png');
    
    // Earth geometry and material
    const earthGeometry = new THREE.SphereGeometry(80, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpMap,
      bumpScale: 0.5,
      specularMap: specularMap,
      specular: new THREE.Color(0x333333),
      shininess: 25,
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    
    // Clouds layer
    const cloudsGeometry = new THREE.SphereGeometry(82, 64, 64);
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.3,
    });
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    scene.add(clouds);
    
    // India highlight
    const indiaGeometry = new THREE.SphereGeometry(80.5, 32, 32);
    const indiaMaterial = new THREE.MeshPhongMaterial({
      color: 0x138808, // India green
      transparent: true,
      opacity: 0.6,
    });
    
    // Position to approximate India's location
    const indiaLat = 20; // Approximate latitude for India
    const indiaLong = 77; // Approximate longitude for India
    
    const phi = (90 - indiaLat) * (Math.PI / 180);
    const theta = (indiaLong + 180) * (Math.PI / 180);
    
    const india = new THREE.Mesh(indiaGeometry, indiaMaterial);
    india.scale.set(0.2, 0.2, 0.01);
    
    const x = -(80 * Math.sin(phi) * Math.cos(theta));
    const z = (80 * Math.sin(phi) * Math.sin(theta));
    const y = (80 * Math.cos(phi));
    
    india.position.set(x, y, z);
    
    // Rotate to align with the globe surface
    india.lookAt(0, 0, 0);
    
    scene.add(india);
    
    // Create a point for each city
    const cityPoints: THREE.Mesh[] = [];
    cities.forEach(city => {
      // Convert city coordinates to 3D position on sphere
      const phi = (90 - city.coordinates[1]) * (Math.PI / 180);
      const theta = (city.coordinates[0] + 180) * (Math.PI / 180);
      
      const x = -(80 * Math.sin(phi) * Math.cos(theta));
      const z = (80 * Math.sin(phi) * Math.sin(theta));
      const y = (80 * Math.cos(phi));
      
      // Use size based on lawyer count with a minimum size
      const pointGeometry = new THREE.SphereGeometry(Math.log(city.lawyerCount) / 3 + 0.8, 16, 16);
      const pointMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xFF9933, // Saffron from Indian flag
        transparent: true,
        opacity: 0.9
      });
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      
      point.position.set(x, y, z);
      point.userData = { city };
      scene.add(point);
      cityPoints.push(point);
      
      // Add pulsing effect for each city point
      const pulseMaterial = new THREE.MeshBasicMaterial({
        color: 0xFF9933,
        transparent: true,
        opacity: 0.4
      });
      
      const pulseGeometry = new THREE.SphereGeometry(Math.log(city.lawyerCount) / 3 + 1.5, 16, 16);
      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
      pulse.position.set(x, y, z);
      pulse.scale.set(1, 1, 1);
      pulse.userData = { initialScale: 1, growFactor: 0.01 };
      scene.add(pulse);
      
      // Add city name label
      const cityNameDiv = document.createElement('div');
      cityNameDiv.className = 'absolute text-xs bg-white/80 px-1 py-0.5 rounded pointer-events-none opacity-0 transition-opacity';
      cityNameDiv.textContent = `${city.name}: ${city.lawyerCount} lawyers`;
      cityNameDiv.style.zIndex = '10';
      if (tooltipRef.current) {
        tooltipRef.current.appendChild(cityNameDiv);
      }
      point.userData.label = cityNameDiv;
      pulse.userData.isGrowing = true;
    });
    
    // Add a subtle glow effect
    const glowGeometry = new THREE.SphereGeometry(84, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        c: { value: 0.2 },
        p: { value: 5.5 },
        glowColor: { value: new THREE.Color(0x0077be) }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float c;
        uniform float p;
        uniform vec3 glowColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(c - dot(vNormal, vec3(0.0, 0.0, 1.0)), p);
          gl_FragColor = vec4(glowColor, intensity);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);
    
    // Raycaster for point interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    let hoveredPoint: THREE.Mesh | null = null;
    
    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      
      // Fix: Ensure we only get Mesh objects that can have material property
      const intersects = raycaster.intersectObjects(cityPoints);
      
      if (hoveredPoint) {
        // Fix: Type check to ensure hoveredPoint has material property
        if (hoveredPoint instanceof THREE.Mesh && hoveredPoint.material instanceof THREE.Material) {
          (hoveredPoint.material as THREE.MeshBasicMaterial).color.set(0xFF9933);
        }
        if (hoveredPoint.userData && hoveredPoint.userData.label) {
          hoveredPoint.userData.label.style.opacity = '0';
        }
        hoveredPoint = null;
      }
      
      if (intersects.length > 0) {
        // Fix: Ensure we cast to Mesh and verify it has the material property before accessing it
        const intersectedObject = intersects[0].object;
        
        // Verify it's a Mesh with material property
        if (intersectedObject instanceof THREE.Mesh && intersectedObject.material) {
          hoveredPoint = intersectedObject;
          
          if (hoveredPoint.material instanceof THREE.Material) {
            (hoveredPoint.material as THREE.MeshBasicMaterial).color.set(0xFFFFFF);
          }
          
          if (hoveredPoint.userData && hoveredPoint.userData.label) {
            const label = hoveredPoint.userData.label;
            label.style.left = `${event.clientX}px`;
            label.style.top = `${event.clientY - 30}px`;
            label.style.opacity = '1';
          }
          
          document.body.style.cursor = 'pointer';
        }
      } else {
        document.body.style.cursor = 'auto';
      }
    };
    
    const onClick = (event: MouseEvent) => {
      if (hoveredPoint && hoveredPoint instanceof THREE.Mesh && hoveredPoint.userData && hoveredPoint.userData.city) {
        onCitySelect(hoveredPoint.userData.city);
      }
    };
    
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onClick);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Slow cloud rotation
      clouds.rotation.y += 0.0002;
      
      // Animate city pulses
      scene.children.forEach(child => {
        if (child.userData && child.userData.growFactor) {
          if (child.userData.isGrowing) {
            child.scale.x += child.userData.growFactor;
            child.scale.y += child.userData.growFactor;
            child.scale.z += child.userData.growFactor;
            
            if (child.scale.x >= 1.5) {
              child.userData.isGrowing = false;
            }
          } else {
            child.scale.x -= child.userData.growFactor;
            child.scale.y -= child.userData.growFactor;
            child.scale.z -= child.userData.growFactor;
            
            if (child.scale.x <= child.userData.initialScale) {
              child.userData.isGrowing = true;
            }
          }
          
          // Update opacity based on scale
          const material = child.material as THREE.MeshBasicMaterial;
          material.opacity = 0.7 - ((child.scale.x - child.userData.initialScale) / 2);
        }
      });
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    
    // Slow auto rotation
    const autoRotate = () => {
      if (!controls.enabled) return;
      earth.rotation.y += 0.0005;
      clouds.rotation.y += 0.0007;
    };
    
    // Start auto rotation
    const interval = setInterval(autoRotate, 16);
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('click', onClick);
      window.addEventListener('resize', handleResize);
      clearInterval(interval);
      
      // Clean up city labels
      cityPoints.forEach(point => {
        if (point.userData.label && tooltipRef.current) {
          tooltipRef.current.removeChild(point.userData.label);
        }
      });
    };
  }, [cities, onCitySelect]);
  
  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      <div 
        ref={containerRef} 
        className="globe-container absolute inset-0 rounded-lg overflow-hidden"
        aria-label="Interactive 3D globe showing lawyers across Indian cities"
      ></div>
      <div 
        ref={tooltipRef} 
        className="absolute inset-0 pointer-events-none"
      ></div>
    </div>
  );
};

export default Globe;
