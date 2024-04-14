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
    duration: 1.5,
    ease: Power1.out,
  });
}

function locoScroll() {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
}


revealToSpan();
loaderAnimation();
locoScroll();


// need to master locomotive and gsap scrollTrigger