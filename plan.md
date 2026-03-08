# Avni Bake Shop – Fully 3D Animated Website Plan

## 1. Project Goal

Create a **high-end 3D animated website** for Avni Bake Shop that impresses customers and allows them to interact with cakes using **360° rotation and scroll-based animations**.

The website should feel modern like **Apple product pages**, where scrolling controls the animation and reveals product details.

---

# 2. Core Features

## 2.1 3D Cake Viewer

Main highlight of the website.

Features:

* Fully **3D cake models**
* **360° rotation**
* Mouse / touch drag to rotate
* Zoom in/out
* Scroll triggered animation
* Cake moves to side when scrolling

Technologies:

* Three.js
* WebGL
* GLTF models

User Interaction:

Step 1
User lands on homepage and sees a **floating 3D cake**.

Step 2
User can:

* rotate cake
* zoom cake
* view cake details

Step 3
When user scrolls:

* cake smoothly moves to **left side**
* product details appear on **right side**

---

# 3. Website Sections

## 3.1 Hero Section (3D Landing)

Visual Elements:

* Floating cake in center
* Bakery theme environment
* Soft lighting
* Particle effects (sugar particles)

Text:

```
Avni Bake Shop
Fresh Cakes Made With Love
Order Your Dream Cake Today
```

Buttons:

* View Cakes
* Order Now

Animations:

* Cake rotates slowly
* Background particles float
* Camera moves slightly

---

# 3.2 Interactive Cake Showcase

This section displays cakes with **scroll-based animation**.

Layout:

Left side:
3D cake model

Right side:
Product details

Example product info:

```
Chocolate Truffle Cake
Price: ₹699
Weight: 1 Kg
Ingredients: Chocolate, Cream, Cocoa
Rating: ★★★★☆
```

Animations:

Scroll Step 1
Cake appears

Scroll Step 2
Cake rotates

Scroll Step 3
Cake moves left

Scroll Step 4
Details appear

Scroll Step 5
Next cake loads

---

# 3.3 360° Cake Gallery

Users can explore cakes in **full 360° view**.

Features:

* Drag to rotate
* Auto rotation
* Multiple cake models

Cakes:

* Chocolate Cake
* Red Velvet Cake
* Fruit Cake
* Birthday Special Cake
* Custom Wedding Cake

---

# 3.4 Cake Customization Section

Customer can design cake.

Options:

Cake Size

* 500g
* 1kg
* 2kg

Flavor

* Chocolate
* Vanilla
* Strawberry
* Butterscotch

Message on Cake

Color Theme

Live preview updates in **3D model**.

---

# 3.5 Bakery Story Section

Animated storytelling section.

Content:

```
About Avni Bake Shop

Fresh bakery products made daily
Premium ingredients
Custom cakes for birthdays & weddings
Trusted by hundreds of happy customers
```

Animations:

* Rolling bread animation
* Cake layers stacking
* Flour particle effects

---

# 3.6 Gallery Section

Grid of images:

* Cakes
* Pastries
* Birthday cakes
* Wedding cakes

Hover effect:

* image zoom
* overlay animation

---

# 3.7 Reviews Section

Customer testimonials.

Design:

Animated cards

Example:

```
⭐⭐⭐⭐⭐
Best cakes in Kanpur!

– Rahul Sharma
```

Animation:

Cards slide in.

---

# 3.8 Order Section

Simple order system.

Fields:

Name
Phone
Cake Type
Weight
Delivery Date
Message

Buttons:

* Order via WhatsApp
* Place Order

---

# 3.9 Location Section

Embedded map.

Features:

* Google Map
* Directions button

---

# 3.10 Footer

Content:

* Address
* Phone number
* Opening hours
* Social media links

---

# 4. Animation System

Animation Types:

Scroll Animations
3D Object Animations
Hover Animations
Page Transitions

Libraries:

* GSAP
* ScrollTrigger
* Three.js

---

# 5. Technology Stack

Frontend:

HTML5
CSS3
JavaScript

Libraries:

Three.js
GSAP
ScrollTrigger
Lenis (smooth scrolling)

3D Models:

GLTF / GLB format

Hosting:

Vercel / Netlify

---

# 6. Performance Strategy

Use:

* compressed 3D models
* lazy loading
* GPU acceleration
* texture optimization

Target:

Page load under **3 seconds**.

---

# 7. Mobile Experience

Features:

Touch rotation of cakes
Smooth scroll
Optimized 3D models

---

# 8. File Structure

```
avni-bake-shop
│
├── index.html
├── css
│   ├── style.css
│
├── js
│   ├── main.js
│   ├── three-scene.js
│
├── models
│   ├── chocolate-cake.glb
│   ├── red-velvet.glb
│
├── textures
│
└── images
```

---

# 9. Extra Premium Effects

Optional features:

Chocolate drip animation
3D cake slicing animation
Sprinkle particle effects
Floating pastries

---

# 10. Final Result

The website will look like:

* Apple style product page
* Fully animated
* Interactive 3D cakes
* Smooth scrolling experience

Goal:

When client opens the website they should feel:

```
"Wow this is amazing"
```

---

# End of Plan
