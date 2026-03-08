/* ============================================
   THREE.JS 3D CAKE SCENE
   Builds a procedural 3D tiered cake with
   frosting, drips, candles, cherries & plate.
   Two instances: hero + customizer
   ============================================ */

const CakeScene = (() => {
    // ---- Shared colour palettes ----
    const THEMES = {
        chocolate:  { base: 0x4a2c2a, frost: 0x7B3F00, drip: 0x3a1c1a, accent: 0xe8567f, plate: 0xe0d5c8 },
        redvelvet:  { base: 0xb02a2a, frost: 0xf2e6e6, drip: 0x8c1c1c, accent: 0xf5c6c6, plate: 0xe0d5c8 },
        fruit:      { base: 0xf5e6c8, frost: 0xfff8f0, drip: 0x7ec850, accent: 0x55efc4, plate: 0xe0d5c8 },
        birthday:   { base: 0xe8567f, frost: 0xfdcb6e, drip: 0x6c5ce7, accent: 0xff6b8a, plate: 0xe0d5c8 },
        wedding:    { base: 0xffffff, frost: 0xf8f0ff, drip: 0xe8d5f5, accent: 0xd4a041, plate: 0xf0e8e0 },
    };

    // Hold instances so main.js can interact
    const instances = {};

    /* -------------------------------------------------------
       createScene  –  mount a 3D cake in a <canvas> element
       id:       unique string key ('hero' | 'customizer')
       canvas:   <canvas> DOM element
       opts:     { theme:'chocolate', size:1, showMessage:false }
       ------------------------------------------------------- */
    function createScene(id, canvas, opts = {}) {
        const theme = opts.theme || 'chocolate';
        const initialSize = opts.size || 1;

        // --- Renderer ---
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(0x000000, 0); // transparent

        // Force initial size (canvas may not have layout yet)
        const initW = canvas.clientWidth || canvas.parentElement.clientWidth || 520;
        const initH = canvas.clientHeight || canvas.parentElement.clientHeight || 455;
        renderer.setSize(initW, initH, false);

        // --- Scene ---
        const scene = new THREE.Scene();

        // --- Camera ---
        const camera = new THREE.PerspectiveCamera(40, initW / initH, 0.1, 100);
        camera.position.set(0, 3.5, 8);
        camera.lookAt(0, 1.8, 0);

        // --- Lights ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
        keyLight.position.set(5, 8, 5);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.set(1024, 1024);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0xffeedd, 0.4);
        fillLight.position.set(-4, 4, -3);
        scene.add(fillLight);

        const rimLight = new THREE.PointLight(0xe8567f, 0.45, 20);
        rimLight.position.set(-3, 5, -4);
        scene.add(rimLight);

        // --- Group that holds cake (for rotation & scaling) ---
        const cakeGroup = new THREE.Group();
        scene.add(cakeGroup);

        // Helpers
        const mat = (color, opts = {}) => new THREE.MeshStandardMaterial({
            color,
            roughness: opts.rough !== undefined ? opts.rough : 0.55,
            metalness: opts.metal !== undefined ? opts.metal : 0.05,
            ...opts
        });

        // Store materials for live colour swap
        const mats = {
            base: [], frost: [], drip: [], accent: [], plate: null
        };

        function buildCake(t) {
            // Clear previous
            while (cakeGroup.children.length) cakeGroup.remove(cakeGroup.children[0]);
            mats.base = []; mats.frost = []; mats.drip = []; mats.accent = [];

            const colors = THEMES[t] || THEMES.chocolate;

            // ===== PLATE =====
            const plateGeo = new THREE.CylinderGeometry(2.2, 2.4, 0.15, 64);
            const plateMat = mat(colors.plate, { rough: 0.2, metal: 0.15 });
            mats.plate = plateMat;
            const plate = new THREE.Mesh(plateGeo, plateMat);
            plate.position.y = 0.075;
            plate.receiveShadow = true;
            cakeGroup.add(plate);

            // Plate rim
            const rimGeo = new THREE.TorusGeometry(2.3, 0.06, 16, 64);
            const rimMat = mat(0xc9bba8, { rough: 0.3, metal: 0.2 });
            const rim = new THREE.Mesh(rimGeo, rimMat);
            rim.rotation.x = Math.PI / 2;
            rim.position.y = 0.15;
            cakeGroup.add(rim);

            // ===== TIER DATA =====
            const tiers = [
                { rTop: 1.8, rBot: 1.85, h: 1.1, y: 0.15 + 0.55 },         // bottom
                { rTop: 1.35, rBot: 1.4, h: 0.9, y: 0.15 + 1.1 + 0.45 },   // middle
                { rTop: 0.95, rBot: 1.0, h: 0.75, y: 0.15 + 1.1 + 0.9 + 0.35 }, // top
            ];

            tiers.forEach((ti, idx) => {
                // Cake body
                const bodyGeo = new THREE.CylinderGeometry(ti.rTop, ti.rBot, ti.h, 64);
                const bodyMat = mat(colors.base, { rough: 0.65 });
                mats.base.push(bodyMat);
                const body = new THREE.Mesh(bodyGeo, bodyMat);
                body.position.y = ti.y;
                body.castShadow = true;
                body.receiveShadow = true;
                cakeGroup.add(body);

                // Frosting top disc
                const frostGeo = new THREE.CylinderGeometry(ti.rTop + 0.04, ti.rTop + 0.04, 0.1, 64);
                const frostMat = mat(colors.frost, { rough: 0.35 });
                mats.frost.push(frostMat);
                const frost = new THREE.Mesh(frostGeo, frostMat);
                frost.position.y = ti.y + ti.h / 2 + 0.05;
                frost.castShadow = true;
                cakeGroup.add(frost);

                // Frosting swirl ring on top
                const swirlGeo = new THREE.TorusGeometry(ti.rTop * 0.65, 0.07, 12, 48);
                const swirlMat = mat(colors.frost, { rough: 0.3 });
                mats.frost.push(swirlMat);
                const swirl = new THREE.Mesh(swirlGeo, swirlMat);
                swirl.rotation.x = Math.PI / 2;
                swirl.position.y = ti.y + ti.h / 2 + 0.12;
                cakeGroup.add(swirl);

                // Drips – several around the edge
                const dripCount = 6 + idx * 2;
                for (let d = 0; d < dripCount; d++) {
                    const angle = (d / dripCount) * Math.PI * 2 + Math.random() * 0.3;
                    const dripH = 0.25 + Math.random() * 0.35;
                    const dripR = 0.06 + Math.random() * 0.03;
                    const dripGeo = new THREE.CylinderGeometry(dripR, dripR * 0.5, dripH, 8);
                    const dripMat = mat(colors.drip, { rough: 0.4 });
                    mats.drip.push(dripMat);
                    const drip = new THREE.Mesh(dripGeo, dripMat);
                    drip.position.set(
                        Math.cos(angle) * (ti.rTop - 0.05),
                        ti.y + ti.h / 2 - dripH / 2,
                        Math.sin(angle) * (ti.rTop - 0.05)
                    );
                    cakeGroup.add(drip);

                    // Drip blob at bottom
                    const blobGeo = new THREE.SphereGeometry(dripR * 1.1, 8, 8);
                    const blob = new THREE.Mesh(blobGeo, dripMat);
                    blob.position.set(drip.position.x, ti.y + ti.h / 2 - dripH, drip.position.z);
                    cakeGroup.add(blob);
                }
            });

            // ===== CANDLES =====
            const topTier = tiers[2];
            const candlePositions = [
                { x: -0.3, z: 0 },
                { x: 0, z: -0.25 },
                { x: 0.3, z: 0.1 },
            ];
            candlePositions.forEach(cp => {
                // candle body
                const cGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.55, 12);
                const cMat = mat(0xfff5e0, { rough: 0.4 });
                const candle = new THREE.Mesh(cGeo, cMat);
                candle.position.set(cp.x, topTier.y + topTier.h / 2 + 0.35, cp.z);
                candle.castShadow = true;
                cakeGroup.add(candle);

                // stripe
                const stripeGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.08, 12);
                const stripeMat = mat(colors.accent, { rough: 0.4 });
                mats.accent.push(stripeMat);
                const stripe = new THREE.Mesh(stripeGeo, stripeMat);
                stripe.position.set(cp.x, topTier.y + topTier.h / 2 + 0.25, cp.z);
                cakeGroup.add(stripe);

                // wick
                const wickGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.1, 6);
                const wickMat = mat(0x333333);
                const wick = new THREE.Mesh(wickGeo, wickMat);
                wick.position.set(cp.x, topTier.y + topTier.h / 2 + 0.65, cp.z);
                cakeGroup.add(wick);

                // flame (emissive sphere)
                const flameGeo = new THREE.SphereGeometry(0.06, 12, 12);
                const flameMat = new THREE.MeshStandardMaterial({
                    color: 0xffaa00, emissive: 0xff6600, emissiveIntensity: 2,
                    roughness: 1, metalness: 0, transparent: true, opacity: 0.9
                });
                const flame = new THREE.Mesh(flameGeo, flameMat);
                flame.scale.set(0.8, 1.3, 0.8);
                flame.position.set(cp.x, topTier.y + topTier.h / 2 + 0.72, cp.z);
                flame.userData.isFlame = true;
                cakeGroup.add(flame);

                // flame point light
                const fLight = new THREE.PointLight(0xff8800, 0.3, 2);
                fLight.position.copy(flame.position);
                cakeGroup.add(fLight);
            });

            // ===== CHERRIES =====
            const cherryAngles = [0, Math.PI * 0.6, Math.PI * 1.3];
            const midTier = tiers[1];
            cherryAngles.forEach((a, i) => {
                const cGeo = new THREE.SphereGeometry(0.12, 16, 16);
                const cMat = mat(0xcc2244, { rough: 0.3 });
                mats.accent.push(cMat);
                const cherry = new THREE.Mesh(cGeo, cMat);
                cherry.position.set(
                    Math.cos(a) * (midTier.rTop + 0.05),
                    midTier.y + midTier.h / 2 + 0.18,
                    Math.sin(a) * (midTier.rTop + 0.05)
                );
                cherry.castShadow = true;
                cakeGroup.add(cherry);

                // cherry stem
                const sGeo = new THREE.CylinderGeometry(0.015, 0.012, 0.18, 6);
                const sMat = mat(0x2d5a27);
                const stem = new THREE.Mesh(sGeo, sMat);
                stem.position.set(cherry.position.x, cherry.position.y + 0.14, cherry.position.z);
                stem.rotation.z = (i - 1) * 0.3;
                cakeGroup.add(stem);
            });

            // ===== TOPPER HEART =====
            const heartShape = new THREE.Shape();
            const x0 = 0, y0 = 0;
            heartShape.moveTo(x0, y0 + 0.25);
            heartShape.bezierCurveTo(x0, y0 + 0.25, x0 - 0.25, y0, x0, y0 - 0.25);
            heartShape.bezierCurveTo(x0, y0 - 0.45, x0 + 0.35, y0 - 0.25, x0 + 0.35, y0);
            // mirror other half
            heartShape.bezierCurveTo(x0 + 0.35, y0 + 0.15, x0, y0 + 0.5, x0, y0 + 0.25);

            const extSettings = { depth: 0.08, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 4 };
            const heartGeo = new THREE.ExtrudeGeometry(heartShape, extSettings);
            heartGeo.center();
            const heartMat = mat(colors.accent, { rough: 0.25, metal: 0.1 });
            mats.accent.push(heartMat);
            const heart = new THREE.Mesh(heartGeo, heartMat);
            heart.scale.set(0.6, 0.6, 0.6);
            heart.position.y = topTier.y + topTier.h / 2 + 1.15;
            heart.userData.isTopper = true;
            cakeGroup.add(heart);

            // topper stick
            const stickGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.5, 8);
            const stickMat = mat(colors.accent, { rough: 0.4, metal: 0.15 });
            mats.accent.push(stickMat);
            const stick = new THREE.Mesh(stickGeo, stickMat);
            stick.position.y = topTier.y + topTier.h / 2 + 0.8;
            cakeGroup.add(stick);

            // ===== SPRINKLES =====
            const sprinkleColors = [0xff6b8a, 0xfdcb6e, 0x74b9ff, 0x55efc4, 0xa29bfe, 0xffeaa7];
            for (let i = 0; i < 60; i++) {
                const tier = tiers[Math.floor(Math.random() * 3)];
                const angle = Math.random() * Math.PI * 2;
                const r = tier.rTop + 0.01;
                const sGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.09, 6);
                const sMat = mat(sprinkleColors[i % sprinkleColors.length], { rough: 0.5 });
                const sprinkle = new THREE.Mesh(sGeo, sMat);
                sprinkle.position.set(
                    Math.cos(angle) * r,
                    tier.y + (Math.random() - 0.5) * tier.h * 0.6,
                    Math.sin(angle) * r
                );
                sprinkle.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
                cakeGroup.add(sprinkle);
            }

            // ===== GROUND SHADOW =====
            const shadowGeo = new THREE.PlaneGeometry(5, 5);
            const shadowMat = new THREE.MeshStandardMaterial({
                color: 0x000000, transparent: true, opacity: 0.08, roughness: 1, metalness: 0
            });
            const shadow = new THREE.Mesh(shadowGeo, shadowMat);
            shadow.rotation.x = -Math.PI / 2;
            shadow.position.y = 0.01;
            shadow.receiveShadow = true;
            cakeGroup.add(shadow);
        }

        // Build initial cake
        buildCake(theme);
        cakeGroup.scale.setScalar(initialSize);

        // --- Interaction: mouse / touch drag to rotate ---
        let isDragging = false;
        let prevX = 0;
        let autoRotate = true;
        let rotationSpeed = 0.004;
        let targetRotY = 0;

        canvas.addEventListener('pointerdown', (e) => {
            isDragging = true;
            prevX = e.clientX;
            autoRotate = false;
        });
        window.addEventListener('pointerup', () => {
            isDragging = false;
            // Resume auto-rotate after 3s
            setTimeout(() => { autoRotate = true; }, 3000);
        });
        canvas.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - prevX;
            targetRotY += dx * 0.008;
            prevX = e.clientX;
        });

        // --- Resize handler ---
        function handleResize() {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
                renderer.setSize(w, h, false);
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
            }
        }

        // --- Animation loop ---
        let time = 0;
        function animate() {
            requestAnimationFrame(animate);
            time += 0.016;
            handleResize();

            // Auto-rotate
            if (autoRotate) {
                targetRotY += rotationSpeed;
            }
            cakeGroup.rotation.y += (targetRotY - cakeGroup.rotation.y) * 0.08;

            // Animate flames
            cakeGroup.children.forEach(child => {
                if (child.userData.isFlame) {
                    child.scale.x = 0.8 + Math.sin(time * 8 + child.position.x * 10) * 0.15;
                    child.scale.y = 1.3 + Math.sin(time * 10 + child.position.z * 10) * 0.2;
                    child.position.y += Math.sin(time * 12) * 0.0003;
                }
                if (child.userData.isTopper) {
                    child.rotation.y = Math.sin(time * 1.5) * 0.2;
                    child.position.y = (THEMES[instances[id]?.currentTheme || 'chocolate'] ? 3.6 : 3.6) + Math.sin(time * 2) * 0.03;
                }
            });

            renderer.render(scene, camera);
        }
        animate();

        // --- Public API for this instance ---
        const instance = {
            currentTheme: theme,
            currentSize: initialSize,
            scene, camera, renderer, cakeGroup,

            setTheme(themeName) {
                const colors = THEMES[themeName];
                if (!colors) return;
                this.currentTheme = themeName;
                // Animate colour transition via material swap
                mats.base.forEach(m => m.color.setHex(colors.base));
                mats.frost.forEach(m => m.color.setHex(colors.frost));
                mats.drip.forEach(m => m.color.setHex(colors.drip));
                mats.accent.forEach(m => m.color.setHex(colors.accent));
                if (mats.plate) mats.plate.color.setHex(colors.plate);
            },

            setAccentColor(hexString) {
                const c = new THREE.Color(hexString);
                mats.accent.forEach(m => m.color.copy(c));
                mats.drip.forEach(m => m.color.copy(c));
            },

            setSize(scale) {
                this.currentSize = scale;
                gsap.to(cakeGroup.scale, {
                    x: scale, y: scale, z: scale,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.5)'
                });
            },

            rebuild(themeName) {
                this.currentTheme = themeName || this.currentTheme;
                buildCake(this.currentTheme);
                cakeGroup.scale.setScalar(this.currentSize);
            },

            bounce() {
                gsap.fromTo(cakeGroup.scale,
                    { x: this.currentSize * 0.85, y: this.currentSize * 0.85, z: this.currentSize * 0.85 },
                    { x: this.currentSize, y: this.currentSize, z: this.currentSize, duration: 0.6, ease: 'elastic.out(1, 0.4)' }
                );
            },

            spinOnce() {
                gsap.to(cakeGroup.rotation, { y: cakeGroup.rotation.y + Math.PI * 2, duration: 1.2, ease: 'power3.out' });
            }
        };

        instances[id] = instance;
        return instance;
    }

    // --- Public API ---
    return {
        create: createScene,
        get(id) { return instances[id]; },
        THEMES
    };
})();
