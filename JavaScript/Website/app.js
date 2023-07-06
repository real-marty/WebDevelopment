gsap.registerPlugin(ScrollTrigger);

let controller;
let slideScene;
let pageScene;
let detailScene;
const mouse = document.querySelector(".cursor");
const mouseText = mouse.querySelector("span");
const burger = document.querySelector(".burger");
function animateSlides() {
    const sliders = document.querySelectorAll(".slide");
    const nav = document.querySelector(".nav-header");
    sliders.forEach((slide, index, slides) => {
        // init
        controller = new ScrollMagic.Controller();
        //
        //slection
        const revealImg = slide.querySelector(".reveal-img");
        const img = slide.querySelector("img");
        const revealText = slide.querySelector(".reveal-text");
        // GSAP for slide transition
        const timeLine = gsap.timeline({
            defaults: {
                ease: "power2.inOut",
                duration: 1,
            },
            scrollTrigger: {
                trigger: slide,
                start: "top center",
                markers: false,
                toggleActions: "play",
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
        // Creating scene
        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false,
        })
            //.addIndicators({ colorStart: "white", colorTrigger: "white", name: "slide" })
            .addTo(controller)
            .setTween(timeLine);

        const pageTl = gsap.timeline();
        let nextSlide = slides.length - 1 === index ? false : slides[index + 1];
        if (nextSlide === false) {
            return false;
        }
        pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
        pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
        pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");

        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: "100%",
            triggerHook: 0,
        })
            //.addIndicators({ colorStart: "white", colorTrigger: "white", name: "slide", indent: 200 })
            .setPin(slide, { pushFollowers: false })
            .setTween(pageTl)
            .addTo(controller);
    });
}

function cursor(e) {
    mouse.style.top = e.pageY + "px";
    mouse.style.left = e.pageX + "px";
}
function activeCursor(e) {
    const item = e.target;
    if (item.id === "logo" || item.classList.contains("burger")) {
        mouse.classList.add("nav-active");
    } else {
        mouse.classList.remove("nav-active");
    }
    if (item.classList.contains("explore")) {
        mouse.classList.add("explore-active");
        mouseText.innerText = "tap";
        gsap.to(".title-swipe", { y: "0%", duration: 2 });
    } else {
        gsap.to(".title-swipe", { y: "100%", duration: 2 });
        mouse.classList.remove("explore-active");
        mouseText.innerText = "";
    }
}
function navToggle(e) {
    if (!e.target.classList.contains("active")) {
        e.target.classList.add("active");
        gsap.to(".cursor", 1, { color: "black" });
        gsap.to(".line1", 0.5, { rotate: "45", y: 3.85, background: "black" });
        gsap.to(".line2", 0.5, { rotate: "-45", y: -3.85, background: "black" });
        gsap.to("#logo", 1, { color: "black" });
        gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
        /* Remove the scroll event in menu */
        document.body.classList.add("hide");
    } else {
        e.target.classList.remove("active");
        gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
        gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
        gsap.to("#logo", 1, { color: "white" });
        gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
        /* Remove the scroll event in menu */
        document.body.classList.remove("hide");
    }
}
// Barba page transition
const logo = document.querySelector("#logo");
barba.init({
    views: [
        {
            namespace: "home",
            beforeEnter() {
                animateSlides();
                logo.href = "./index.html";
            },
            beforeLeave() {
                slideScene.destroy();
                pageScene.destroy();
                controller.destroy();
            },
        },
        {
            namespace: "fashion",
            beforeEnter() {
                detailAnimation();
                logo.href = "../index.html";
            },
            beforeLeave() {
                controller.destroy();
                detailScene.destroy();
            }
        },
    ],
    transitions: [
        {
            leave(data) {
                const done = this.async();

                const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
                tl.fromTo(
                    data.current.contaner,
                    1,
                    { opacity: 1 },
                    {
                        opacity: 0,
                    },
                );
                tl.fromTo(
                    ".swipe",
                    0.6,
                    { x: "-100%" },
                    { x: "0%", onComplete: done },
                    "-=0.5"
                );
            },
            enter(data) {
                const done = this.async();
                // Scroll to the top
                window.scrollTo(0, 0);
                const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
                tl.fromTo(
                    ".swipe",
                    0.75,
                    { x: "0%" },

                    { x: "100%", stagger: 0.2, onComplete: done() }
                );
                tl.fromTo(
                    data.next.container,
                    0.5,
                    { opacity: 0 },
                    {
                        opacity: 1,
                    },
                );
                tl.fromTo(
                    ".nav-header",
                    1,
                    { y: "-100%" },
                    { y: "0%", ease: "power2.inOut" },
                    "-=1.25"
                );
            },
        },
    ],
});
function detailAnimation() {
    controller = new ScrollMagic.Controller();
    const slides = document.querySelectorAll(".detail-slide");
    slides.forEach((slide, index, slides) => {
        const slideTl = gsap.timeline({ defaults: { duration: 1 } });
        let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
        const nextImg = nextSlide.querySelector("img");
        slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
        slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
        slideTl.fromTo(nextImg, { x: "50%" }, { x: "0%" });
        //Scene
        detailScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: "100%",
            triggerHook: 0
        })
            .setPin(slide, { pushFollowers: false })
            .setTween(slideTl)
            // .addIndicators({
            //   colorStart: "white",
            //   colorTrigger: "white",
            //   name: "detailScene"
            // })
            .addTo(controller);
    });
}
burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mousemove", activeCursor);
