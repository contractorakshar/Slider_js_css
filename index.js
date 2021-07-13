var index = 0;
function submitHanlder(event) {
  event.preventDefault();
  var imgSrc = document.getElementById("carosoule_img").value;
  var headText = document.getElementById("carosoule_heading").value;

  var container = document.createElement("div");
  container.className = "showSlide";

  var imgContainer = document.createElement("img");
  imgContainer.src = `${imgSrc}`;

  var Head = document.createElement("div");
  Head.className = "content";
  Head.innerText = headText;

  container.append(imgContainer);
  container.append(Head);
  document.querySelector(".slidercontainer").appendChild(container);

  const sub_indicator = document.createElement("div");

  sub_indicator.innerText = index += 1;

  document.querySelector(".indicators").appendChild(sub_indicator);
  nextSlide(1);
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
  let pageIndex = document.getElementById("remove_index").value;
  var container = document.getElementsByClassName("showSlide");
  container[pageIndex - 1].remove();
  document.getElementsByClassName("indicators")[pageIndex - 1].remove();
}

function toggleIndicators(i) {
  if (!i.checked) {
    document.querySelector(".indicators ").style.display = "none";
  } else {
    document.querySelector(".indicators").style.display = "flex";
  }
}

var slide_index = 0;

displaySlides(slide_index);

function nextSlide(n) {
  displaySlides((slide_index += n));
}

function displaySlides(n) {
  var i;
  var slides = document.getElementsByClassName("showSlide");

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
