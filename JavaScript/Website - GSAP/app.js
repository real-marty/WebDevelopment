gsap.registerPlugin(ScrollTrigger);
const sliders = document.querySelectorAll(".slide");
const nav = document.querySelector(".nav-header");
//const controller = new ScrollMagid.Controller();
sliders.forEach((slide) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    const timeLine = gsap.timeline({
        defaults: {
            ease: "power2.inOut",
            duration: 1,
        },
        scrollTrigger: {
            trigger: slide,
            start: "top center",
            markers: false,
            toggleActions: "play none none reverse",
        },
    });
    timeLine
        .from(img, { scale: 2 })
        .to(revealImg, { x: "101%" }, "-=1")
        .to(revealText, { x: "101%" }, "-=0.5");
    gsap.fromTo(
        nav,
        { y: "-100%" },
        {
            y: "0%",
            ease: "power2.inOut",
            duration: 2,
        },
    );
    const tl = gsap.timeline({
        defaults: {
            ease: "none",
            duration: 2,
        },
        scrollTrigger: {
            trigger: slide,
            start: "-5%",
            markers: true,
            pin: true,
            scrup: true,
            pingSpacing: false,
            end: "+=80%",
            // anticipatePin: 1,
            toggleActions: "play none none reverse",
        },
    });
    const tl2 = gsap.timeline({
        defaults: {
            ease: "none",
            duration: 1,
        },
        scrollTrigger: {
            trigger: slide,
            start: "25%",
            markers: true,
            scrup: true,
            // anticipatePin: 1,
            toggleActions: "play none none reverse",
        },
    });
    tl2.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
});
