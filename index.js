"use strict";

let index = 0;
let slide_index = 0;
document
  .querySelector(".slidercontainer")
  .addEventListener("touchstart", handleTouchStart);
document
  .querySelector(".slidercontainer")
  .addEventListener("touchmove", handleTouchMove);

var xStart = null;
var yStart = null;

function getTouches(evt) {
  return evt.touches || evt.originalEvent.touches;
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xStart = firstTouch.clientX;
  yStart = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xStart || !yStart) {
    return;
  }
  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xStart - xUp;
  var yDiff = yStart - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      nextSlide(-1);
    } else {
      nextSlide(1);
    }
  }

  xStart = null;
  yStart = null;
}
let imgPath;
function previewfile(e) {
  imgPath = URL.createObjectURL(e.target.files[0]);
  document.getElementById("preview_img").src = URL.createObjectURL(
    e.target.files[0]
  );
  const remove_preview_btn = document.createElement("button");
  remove_preview_btn.innerText = "x";
  remove_preview_btn.setAttribute("id", "remove_preview_img");
  remove_preview_btn.addEventListener("click", (e) => {
    e.preventDefault();
    removePreview();
  });
  document.getElementById("preivew_wrapper").appendChild(remove_preview_btn);
}

function removePreview() {
  document.getElementById("preview_img").src = "";
  document.getElementById("carosoule_img").value = "";
  document.getElementById("remove_preview_img").style.display = "none";
}

const insertBeforeAnyIndex = (container_new) => {
  // console.log("before");
  let add_index = document.getElementById("add_by_index").value;

  const parent_div = document.querySelector(".slidercontainer");

  const child = document.getElementsByClassName("showSlide")[add_index - 1];

  parent_div.insertBefore(container_new, child);
};

const inserAfterAnyIndex = (container_new) => {
  // console.log("after");
  let add_index = document.getElementById("add_by_index").value;
  document
    .getElementsByClassName("showSlide")
    [add_index - 1].after(container_new);
};
//for adding new page

function submitHanlder(event) {
  event.preventDefault();

  //getting value from input

  const imgSrc = imgPath;
  const headText = document.getElementById("carosoule_heading").value;
  const container = document.createElement("div");
  container.className = "showSlide";
  const del_btn = document.createElement("button");
  del_btn.innerHTML = "❌";
  const imgContainer = document.createElement("img");

  imgContainer.src = `${imgSrc}`;
  imgContainer.className = "fade";

  const head = document.createElement("div");
  head.className = "content";
  head.innerText = headText;
  del_btn.className = "remove_slider";

  container.append(imgContainer);
  container.append(head);
  container.append(del_btn);
  if (document.getElementById("dropdown_index").value === "Before") {
    insertBeforeAnyIndex(container);
  } else if (document.getElementById("dropdown_index").value === "After") {
    inserAfterAnyIndex(container);
  } else {
    document.querySelector(".slidercontainer").appendChild(container);
  }

  const sub_indicator = document.createElement("div");
  //adding new page and new sub indicator

  sub_indicator.innerText = index += 1;
  sub_indicator.className = "sub_indicator";
  sub_indicator.addEventListener("click", () => {
    changePageHandler(sub_indicator.innerText);
  });
  document.querySelector(".indicators").appendChild(sub_indicator);
  nextSlide(1);
  del_btn.addEventListener("click", () => {
    Remove(index);
  });
  removePreview();
  document.getElementById("form_wrapper").reset();
  //show multiple slides
  // if (index >= 3) {
  //   let temp = index;
  //   let prev = document.getElementsByClassName("showSlide")[temp - 1];
  //   let clone = prev.cloneNode(true);
  //   console.log(clone);
  //   if (temp + 1 > index) {
  //     let next = document.getElementsByClassName("showSlide")[0];
  //   } else {
  //     let next = document.getElementsByClassName("showSlide")[temp + 1];
  //   }
  // }
}
function changePageHandler(e) {
  let i = parseInt(e);
  i = i - 1;

  // console.log(e);
  let slides = document.getElementsByClassName("showSlide");
  slide_index = i;
  for (let k = 0; k < slides.length; k++) {
    if (k === i) {
      document
        .getElementsByClassName("sub_indicator")
        [k].setAttribute("id", "active");

      slides[k].style.display = "block";
    } else {
      document.getElementsByClassName("sub_indicator")[k].removeAttribute("id");

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
function Remove(j) {
  // const pageIndex = document.getElementById("remove_index").value;

  document.getElementsByClassName("sub_indicator")[j - 1].remove();
  document.getElementsByClassName("showSlide")[j - 1].remove();
  for (
    let i = 0;
    i < document.getElementsByClassName("sub_indicator").length;
    i++
  ) {
    document.getElementsByClassName("sub_indicator")[i].innerText = i + 1;
  }

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

displaySlides(slide_index);

function nextSlide(n) {
  let temp = (slide_index += n);
  displaySlides(temp);
  for (let i = 0; i < temp; i++) {
    if (document.getElementsByClassName("sub_indicator")[i]) {
      document.getElementsByClassName("sub_indicator")[i].removeAttribute("id");
    }
    if (i === slide_index - 1) {
      document
        .getElementsByClassName("sub_indicator")
        [i].setAttribute("id", "active");
    }
  }
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
let t;
function toggleSlidwShow(slideShow) {
  clearTimeout(t);
  if (slideShow.checked) {
    t = setTimeout(() => {
      nextSlide(1);
      toggleSlidwShow(slideShow);
    }, 3000);
  }
}
