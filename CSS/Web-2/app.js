const navigation = document.querySelector(".nav-links");
const burger = document.querySelector(".burger");
const links = navigation.querySelectorAll("a");
const body = document.querySelector("body");


burger.addEventListener("click", () => {
    navigation.classList.toggle("nav-open");
    burger.classList.toggle("toggle");
    body.classList.toggle("stop-scrolling");

});
links.forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.toggle("nav-open");
        burger.classList.toggle("toggle");
        body.classList.toggle("stop-scrolling");
    })
})

