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
    duration: 1,
    ease: Power1.out,
  });
}
// function animateSVGarrow() {
//   const lines = document.querySelectorAll("#arrow>line, #arrow>polyline");
//   lines.forEach(line => {
//     const length = line.getTotalLength();
//     line.style.transition = "stroke-dashoffset 2s";
//     line.style.strokeDasharray = length;
//     line.style.strokeDashoffset = length;
//     line.getBoundingClientRect(); // Trigger reflow
//     line.style.strokeDashoffset = "0";
//     console.log("");
//   });
// }


function locoScroll() {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
}

// showing hoverCard over image
function showHoverCard() {
  let hoverCard = document.querySelector("#cursor").children;
  let hoverIndex;
  let workColor;
  let target;
  document.querySelectorAll(".hoverCard").forEach((e) => {
    e.addEventListener("mousemove", (dets) => {
      target = dets.target;
      workColor = dets.target.dataset.color;
      hoverIndex = dets.target.dataset.index;
      hoverCard[hoverIndex].style.opacity = 1;
      hoverCard[hoverIndex].style.transform = `translate(${dets.screenX}px,${dets.screenY - 40}px)`;
      document.querySelector(".work").style.backgroundColor = "#" + workColor;
      // animateSVGarrow();
      target.style.filter ="grayscale()";
    });
    e.addEventListener("mouseout", () => {
      target.style.filter = "grayscale(0)";
      hoverCard[hoverIndex].style.opacity = 0;
      document.querySelector(".work").style.backgroundColor = "#f2f2f2";
    });
  });
}


// hover trigger
// function hoverTrigger(){
//   let elementChange = document.querySelectorAll(".project-info > p");
//   console.log(elementChange);
//   let hoverCard = document.querySelectorAll(".hoverCard");
//   hoverCard.forEach((e,i)=>{
//     e.addEventListener("mousemove", (dets) => {
//       let targetIndex = dets.target.dataset.index;
//       elementChange.forEach((elem,index)=>{
//         console.log(targetIndex);
//         if(targetIndex == 0){
//           // console.log(elem);
//           // elem[0].style.opacity = 1;
//           // elem[1].style.opacity = 1;
//         }
//         // e.style.opacity = 1;
//         console.log(elem[0]);
//       })
//     })
//     e.addEventListener("mouseleave", () => {
//       elementChange.forEach(e=>{
//         e.style.opacity = 0;
//       })
//     })
//   })
// }

revealToSpan();
loaderAnimation();
locoScroll();
showHoverCard();
// hoverTrigger();


// need to master locomotive and gsap scrollTrigger

// scroll using js
// Get the rotating image element
// const rotatingImage = document.getElementById('image-container');

// Function to rotate the image
// function rotateImageOnScroll(event) {
//   const scrollPosition = window.scrollY; // Get the current scroll position
//   const rotationAngle = scrollPosition * 0.1; // Adjust the rotation speed
//   rotatingImage.style.transform = `rotate(${rotationAngle}deg)`; // Apply rotation
//   console.log('working');
// }

// Add event listener for scroll event
// window.addEventListener('mousemove', rotateImageOnScroll);



// another method

// Initialize ScrollMagic Controller
var controller = new ScrollMagic.Controller();

// Create a Tween for each image rotation
var rotateTween1 = gsap.to(".image-container:nth-child(1)", { rotation: 10, ease: "power1.inOut" });
var rotateTween2 = gsap.to(".image-container:nth-child(2)", { rotation: 10, ease: "power1.inOut" });
var rotateTween3 = gsap.to(".image-container:nth-child(3)", { rotation: 10, ease: "power1.inOut" });

// Create ScrollMagic Scenes for each image
var scene1 = new ScrollMagic.Scene({
  triggerElement: ".image-container:nth-child(1)", // Adjust as needed
  duration: "100%", // Duration of the animation
  triggerHook: 0.5 // Trigger point
})
  .setTween(rotateTween1)
  .addTo(controller);

var scene2 = new ScrollMagic.Scene({
  triggerElement: ".image-container:nth-child(2)", // Adjust as needed
  duration: "100%", // Duration of the animation
  triggerHook: 0.5 // Trigger point
})
  .setTween(rotateTween2)
  .addTo(controller);

var scene3 = new ScrollMagic.Scene({
  triggerElement: ".image-container:nth-child(3)", // Adjust as needed
  duration: "100%", // Duration of the animation
  triggerHook: 0.5 // Trigger point
})
  .setTween(rotateTween3)
  .addTo(controller);



