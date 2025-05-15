 // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
        
        // Blockchain 3D Animation
        document.addEventListener('DOMContentLoaded', () => {
            // Scene setup
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({
                canvas: document.getElementById('blockchainCanvas'),
                alpha: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            
            // Create blockchain links
            const links = [];
            const linkGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            const linkMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x6e45e2,
                transparent: true,
                opacity: 0.7
            });
            
            // Create 50 blockchain links in a chain formation
            for (let i = 0; i < 50; i++) {
                const link = new THREE.Mesh(linkGeometry, linkMaterial);
                
                // Position links in a chain-like formation
                const radius = 5;
                const angle = (i / 50) * Math.PI * 2;
                link.position.x = radius * Math.cos(angle);
                link.position.y = radius * Math.sin(angle);
                link.position.z = i * 0.2 - 5;
                
                scene.add(link);
                links.push(link);
            }
            
            // Add connecting lines between links
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0x88d3ce, transparent: true, opacity: 0.5 });
            for (let i = 0; i < links.length - 1; i++) {
                const points = [];
                points.push(new THREE.Vector3(links[i].position.x, links[i].position.y, links[i].position.z));
                points.push(new THREE.Vector3(links[i+1].position.x, links[i+1].position.y, links[i+1].position.z));
                
                const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
                const line = new THREE.Line(lineGeometry, lineMaterial);
                scene.add(line);
            }
            
            // Camera position
            camera.position.z = 5;
            
            // Animation
            function animate() {
                requestAnimationFrame(animate);
                
                // Rotate the blockchain links
                links.forEach((link, index) => {
                    link.rotation.x += 0.01;
                    link.rotation.y += 0.01;
                    
                    // Add subtle pulsing effect
                    const scale = 0.9 + Math.sin(Date.now() * 0.001 + index) * 0.1;
                    link.scale.set(scale, scale, scale);
                });
                
                renderer.render(scene, camera);
            }
            
            // Handle window resize
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
            
            animate();
        });