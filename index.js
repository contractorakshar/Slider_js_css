"use strict";
let index = 0;

//for adding new page
function submitHanlder(event) {
  event.preventDefault();
  //getting value from input
  const imgSrc = document.getElementById("carosoule_img").value;
  const headText = document.getElementById("carosoule_heading").value;
  const container = document.createElement("div");
  container.className = "showSlide";

  const imgContainer = document.createElement("img");

  imgContainer.src = `${imgSrc}`;
  imgContainer.className = "fade";
  const head = document.createElement("div");
  head.className = "content";
  head.innerText = headText;

  container.append(imgContainer);
  container.append(head);
  document.querySelector(".slidercontainer").appendChild(container);

  const sub_indicator = document.createElement("div");
  //adding new page and new sub indicator
  sub_indicator.innerText = index += 1;
  sub_indicator.className = "sub_indicator";
  sub_indicator.addEventListener("click", () => {
    changePageHandler(sub_indicator.innerText);
  });
  document.querySelector(".indicators").appendChild(sub_indicator);
  nextSlide(1);

  document.getElementById("form_wrapper").reset();
}
function changePageHandler(e) {
  let i = parseInt(e);
  i = i - 1;
  let slides = document.getElementsByClassName("showSlide");

  for (let k = 0; k < slides.length; k++) {
    if (k === i) {
      slides[k].style.display = "block";
    } else {
      slides[k].style.display = "none";
    }
  }
  // console.log(typeof i);
}
function toggleArrow(n) {
  if (n.checked && index > 0) {
    document.querySelector(".left").style.display = "block";
    //right left arrow toggle
    document.querySelector(".right").style.display = "block";
  } else {
    document.querySelector(".left").style.display = "none";
    document.querySelector(".right").style.display = "none";
  }
}

//remove and img according to index
function Remove() {
  const pageIndex = document.getElementById("remove_index").value;

  document.getElementsByClassName("sub_indicator")[pageIndex - 1].remove();
  document.getElementsByClassName("showSlide")[pageIndex - 1].remove();

  index += -1;
  nextSlide(-1);
}
//indicator show/hide
function toggleIndicators(i) {
  if (!i.checked) {
    document.querySelector(".indicators ").style.display = "none";
  } else {
    document.querySelector(".indicators").style.display = "flex";
  }
}

let slide_index = 0;

displaySlides(slide_index);

function nextSlide(n) {
  displaySlides((slide_index += n));
}
//slide change by index
function displaySlides(n) {
  let slides = document.getElementsByClassName("showSlide");

  if (n > slides.length) {
    slide_index = 1;
  }
  if (n < 1) {
    slide_index = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  if (slides.length > 0) {
    slides[slide_index - 1].style.display = "block";
  }
}
//automatic scroll
function toggleSlidwShow(slideShow) {
  if (slideShow.checked) {
    setTimeout(() => {
      nextSlide(1);
      toggleSlidwShow(slideShow);
    }, 3000);
  }
}
