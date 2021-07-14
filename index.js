"use strict";
let index = 0;
let autoSlider = false;

function submitHanlder(event) {
  event.preventDefault();
  const imgSrc = document.getElementById("carosoule_img").value;
  const headText = document.getElementById("carosoule_heading").value;

  const container = document.createElement("div");
  container.className = "showSlide";

  const imgContainer = document.createElement("img");
  imgContainer.src = `${imgSrc}`;

  const head = document.createElement("div");
  head.className = "content";
  head.innerText = headText;

  container.append(imgContainer);
  container.append(head);
  document.querySelector(".slidercontainer").appendChild(container);

  const sub_indicator = document.createElement("div");

  sub_indicator.innerText = index += 1;
  sub_indicator.className = "sub_indicator";
  document.querySelector(".indicators").appendChild(sub_indicator);
  nextSlide(1);
  document.querySelector(".left").style.display = "block";
  document.querySelector(".right").style.display = "block";
  document.getElementById("form_wrapper").reset();
}

function toggleArrow(n) {
  if (!n.checked) {
    document.querySelector(".left").style.display = "none";
    document.querySelector(".right").style.display = "none";
  } else {
    document.querySelector(".left").style.display = "block";
    document.querySelector(".right").style.display = "block";
  }
}
function Remove() {
  const sub_indicator = document.getElementsByClassName("sub_indicator");
  const pageIndex = document.getElementById("remove_index").value;
  const container = document.getElementsByClassName("showSlide");

  sub_indicator[pageIndex - 1].remove();

  container[pageIndex - 1].remove();
  index += -1;
  nextSlide(-1);
}

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

function displaySlides(n) {
  let i;
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
function getSlideIndex() {
  return index + 1;
}
function toggleSlidwShow(slideShow) {
  if (slideShow.checked) {
    autoSlider = true;
  }
}
