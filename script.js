function revealToSpan() {
  document.querySelectorAll(".reveal").forEach((container) => {
    // create parent and child span
    let parent = document.createElement("span");
    let child = document.createElement("span");

    // add classes to parent and child span
    parent.classList.add("parent");
    child.classList.add("child");

    // add content from container
    child.innerHTML = container.innerHTML;

    // append child to parent
    parent.appendChild(child);

    // append parent to container
    container.innerHTML = "";
    container.appendChild(parent);
  });
}

function loaderAnimation() {
  let tl = gsap.timeline();
  gsap.from(".loader h1 .child .first", {
    x: 40,
    // opacity:0,
    duration: 1,
    ease: Power3.easeInOut,
    // stagger:.2
  });
  gsap.from(".loader h1 .child .second", {
    x: 120,
    // delay:.1,
    duration: 1,
    ease: Power3.easeInOut,
    // stagger:.2
  });

  tl.to(".loader .child", {
    y: "-100%",
    duration: 1,
    delay: 1,
    ease: Power3.easeInOut,
  });

  tl.to(".green-page", {
    top: 0,
    duration: 1,
    ease: Power1.out,
  });

  tl.to(".loader", {
    height: 0,
    delay: -0.7,
    duration: 1,
    ease: Power1.out,
    onComplete: () => {
      homeAnimation();
    },
  });
}

function homeAnimation() {
  let tl = gsap.timeline();
  tl.to(".home h1 .child", {
    y: 0,
    duration: 2,
    // delay:-1,
    onComplete: () => {
      animateSVG();
    },
  });

  tl.to(".home .text h5 .child", {
    y: 0,
    duration: 1,
    delay: 1,
    ease: Power1.out,
  });
}

function animateSVG() {
  document.querySelectorAll("#Visual>g").forEach((e) => {
    let char = e.childNodes[0].childNodes[0];

    char.style.strokeDasharray = char.getTotalLength() + "px";
    char.style.strokeDashoffset = char.getTotalLength() + "px";
  });

  gsap.to("svg", { opacity: 1 });

  gsap.to("#Visual>g>g>path,#Visual>g>g>polyline", {
    strokeDashoffset: 0,
    duration: 2,
    ease: Power1.out,
  });
}

function locomotiveScrollTrigger() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function locoScroll() {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
}

revealToSpan();
loaderAnimation();
// locomotiveScrollTrigger();
locoScroll();
