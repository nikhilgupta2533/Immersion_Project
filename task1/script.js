const btn = document.getElementById("increaseBtn");
const fill = document.getElementById("fill");

let progress = 0;

btn.addEventListener("click", () => {
  if (progress < 100) {
    progress += 10;
    fill.style.width = progress + "%";
  }
});
