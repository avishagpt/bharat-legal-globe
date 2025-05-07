
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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
    scene.background = new THREE.Color(0xf5f5f5);
    
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
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Earth geometry and material
    const earthGeometry = new THREE.SphereGeometry(80, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x0F2E68,  // Base color (blue)
      shininess: 50,
      transparent: true,
      opacity: 0.9,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    
    // Add grid lines
    const gridHelper = new THREE.GridHelper(200, 20, 0xffffff, 0xffffff);
    gridHelper.position.y = -90;
    scene.add(gridHelper);
    
    // Create a point for each city
    const cityPoints: THREE.Mesh[] = [];
    cities.forEach(city => {
      // Convert city coordinates to 3D position on sphere
      const phi = (90 - city.coordinates[1]) * (Math.PI / 180);
      const theta = (city.coordinates[0] + 180) * (Math.PI / 180);
      
      const x = -(80 * Math.sin(phi) * Math.cos(theta));
      const z = (80 * Math.sin(phi) * Math.sin(theta));
      const y = (80 * Math.cos(phi));
      
      const pointGeometry = new THREE.SphereGeometry(Math.log(city.lawyerCount) / 3 + 0.5, 16, 16);
      const pointMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xD4AF37,  // Gold color
        transparent: true,
        opacity: 0.9
      });
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      
      point.position.set(x, y, z);
      point.userData = { city };
      scene.add(point);
      cityPoints.push(point);
      
      // Add city name label
      const cityNameDiv = document.createElement('div');
      cityNameDiv.className = 'absolute text-xs bg-white/80 px-1 py-0.5 rounded pointer-events-none opacity-0 transition-opacity';
      cityNameDiv.textContent = `${city.name}: ${city.lawyerCount} lawyers`;
      cityNameDiv.style.zIndex = '10';
      if (tooltipRef.current) {
        tooltipRef.current.appendChild(cityNameDiv);
      }
      point.userData.label = cityNameDiv;
    });
    
    // Raycaster for point interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    let hoveredPoint: THREE.Mesh | null = null;
    
    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      
      const intersects = raycaster.intersectObjects(cityPoints);
      
      if (hoveredPoint) {
        (hoveredPoint.material as THREE.MeshBasicMaterial).color.set(0xD4AF37);
        hoveredPoint.userData.label.style.opacity = '0';
        hoveredPoint = null;
      }
      
      if (intersects.length > 0) {
        hoveredPoint = intersects[0].object as THREE.Mesh;
        (hoveredPoint.material as THREE.MeshBasicMaterial).color.set(0xE57C23);
        
        if (hoveredPoint.userData.label) {
          const label = hoveredPoint.userData.label;
          label.style.left = `${event.clientX}px`;
          label.style.top = `${event.clientY - 30}px`;
          label.style.opacity = '1';
        }
        
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'auto';
      }
    };
    
    const onClick = (event: MouseEvent) => {
      if (hoveredPoint && hoveredPoint.userData.city) {
        onCitySelect(hoveredPoint.userData.city);
      }
    };
    
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onClick);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    
    // Slow auto rotation
    const autoRotate = () => {
      if (!controls.enabled) return;
      earth.rotation.y += 0.001;
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
      window.removeEventListener('resize', handleResize);
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
