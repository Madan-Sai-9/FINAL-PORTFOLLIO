gsap.registerPlugin(ScrollTrigger);

// --- 1. HERO ENTRANCE ---
const tl = gsap.timeline();
tl.from(".hero-content", { y: 50, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.5 })
  .from(".tagline", { x: -20, opacity: 0, duration: 0.8 }, "-=0.8")
  .from(".btn", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

// --- 2. GLOBAL SCROLL REVEAL (Triggers for every section) ---
// Animates anything with class 'scroll-reveal'
gsap.utils.toArray('.scroll-reveal').forEach(section => {
    gsap.from(section, {
        scrollTrigger: { trigger: section, start: "top 85%" },
        y: 50, opacity: 0, duration: 1, ease: "power3.out"
    });
});

// Statement Reveal
gsap.from(".reveal-text", {
    scrollTrigger: { trigger: ".statement", start: "top 80%" },
    y: 50, opacity: 0, duration: 1, ease: "power3.out"
});

// --- 3. ACCORDION LOGIC ---
const accordions = document.querySelectorAll(".accordion-item");
accordions.forEach((acc) => {
    const header = acc.querySelector(".accordion-header");
    const content = acc.querySelector(".accordion-content");
    const icon = acc.querySelector(".acc-icon");

    header.addEventListener("click", () => {
        const isOpen = acc.classList.contains("active");
        accordions.forEach(otherAcc => {
            if (otherAcc !== acc) {
                otherAcc.classList.remove("active");
                gsap.to(otherAcc.querySelector(".accordion-content"), { height: 0, duration: 0.5, ease: "power2.out" });
                gsap.to(otherAcc.querySelector(".acc-icon"), { rotation: 0, duration: 0.3 });
            }
        });
        if (isOpen) {
            acc.classList.remove("active");
            gsap.to(content, { height: 0, duration: 0.5, ease: "power2.out" });
            gsap.to(icon, { rotation: 0, duration: 0.3 });
        } else {
            acc.classList.add("active");
            gsap.to(content, { height: "auto", duration: 0.5, ease: "power2.out" });
            gsap.to(icon, { rotation: 45, duration: 0.3 });
        }
    });
});

// --- 4. CTA REVEAL ---
gsap.from(".cta-text", {
    scrollTrigger: { trigger: ".cta", start: "top 70%" },
    y: 100, opacity: 0, duration: 1.2, ease: "power4.out"
});
gsap.from(".big-btn", {
    scrollTrigger: { trigger: ".cta", start: "top 70%" },
    y: 50, opacity: 0, scale: 0.8, duration: 1, delay: 0.3, ease: "back.out(1.7)"
});

// --- 5. FOOTER VISUAL REVEAL ---
gsap.from(".footer-visual", {
    scrollTrigger: { trigger: ".footer-visual", start: "top 75%" },
    scale: 0.9, opacity: 0, duration: 1.2, ease: "power2.out"
});

// --- 6. FOOTER 3D PARALLAX (Mouse Move) ---
const footerSection = document.querySelector(".footer-visual");
const layers = document.querySelectorAll(".layer");

if(footerSection) {
    footerSection.addEventListener("mousemove", (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 20;
        const y = (window.innerHeight / 2 - e.pageY) / 20;
        layers.forEach(layer => {
            const speed = layer.getAttribute("data-speed");
            gsap.to(layer, {
                x: x * speed, y: y * speed, rotation: x * 0.1, 
                duration: 0.5, ease: "power2.out"
            });
        });
    });
    footerSection.addEventListener("mouseleave", () => {
        layers.forEach(layer => {
            gsap.to(layer, { x: 0, y: 0, rotation: 0, duration: 1, ease: "elastic.out(1, 0.5)" });
        });
    });
}

// --- 7. FRACTAL NOISE INTERACTION (On Hover) ---
const fractalText = document.querySelector("#fractal-text");
const turbulence = document.querySelector("feTurbulence");
const displacement = document.querySelector("feDisplacementMap");

if (fractalText && turbulence && displacement) {
    fractalText.addEventListener("mouseenter", () => {
        gsap.to(turbulence, { attr: { baseFrequency: 0.05 }, duration: 0.5 });
        gsap.to(displacement, { attr: { scale: 30 }, duration: 0.5 });
    });

    fractalText.addEventListener("mouseleave", () => {
        gsap.to(turbulence, { attr: { baseFrequency: 0 }, duration: 0.5 });
        gsap.to(displacement, { attr: { scale: 0 }, duration: 0.5 });
    });
}