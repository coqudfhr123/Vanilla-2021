// const images = ["1.png", "2.png", "3.png"];
// const chosenImage = images[Math.floor(Math.random() * images.length)];
// const bgImage = document.createElement("img");
// bgImage.src = `image/${chosenImage}`;
// document.body.appendChild(bgImage);

const images = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];
const chosenImage = images[Math.floor(Math.random() * images.length)];

document.querySelector("body").style.backgroundImage =
  "url('image/" + chosenImage;
