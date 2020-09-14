const header = document.querySelector(".navbar");
const partOne = document.querySelector(".nav-anime");

const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");

const images = document.querySelectorAll("[data-src");

const partOneOptions = {
  root: null,
  threshold: 0,
  rootMargin: "-200px 0px 0px 0px"
};

const partOneObserver = new IntersectionObserver( (entries, partOneObserver) => {
  entries.forEach(entry => {
    console.log(entry.target)
    if (!entry.isIntersecting) {
      header.classList.add('nav-scrolled');
    } else {
      header.classList.remove('nav-scrolled');
    }
  });

}, partOneOptions);

partOneObserver.observe(partOne);

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -250px 0px"
};

const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

sliders.forEach(slider => {
  appearOnScroll.observe(slider);
});

const preloadImage = (img) => {
  const src = img.getAttribute("data-src");
  if(!src) {
    return;
  } 
    img.src = src;
}
const imgOPtions = {
  threshold: 1,
  rootMargin: "0px 0px 200px 0px"
};
const imgObserver = new IntersectionObserver((entries,imgObserver) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      preloadImage(entry.target);
      imgObserver.unobserve(entry.target);
    }
  });
}, imgOPtions);

images.forEach(image => {
  imgObserver.observe(image);
});