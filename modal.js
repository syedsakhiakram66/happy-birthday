const modal = document.getElementById('giftModal');
const btn = document.getElementById('giftBtn');
const closeBtn = document.querySelector('.close');
const nextBtn = document.getElementById('nextPageBtn');
const floatingImagesContainer = document.getElementById('floatingImagesContainer');

var speed = 50;

// Split text into two pages
var pages = [
  "Happy Birthday! I hope your special day is filled with joy, laughter, and moments that remind you how truly appreciated you are. Today is all about celebrating the wonderful person you are and the positive impact you make on everyone around you. May this year bring you new adventures, meaningful connections, and countless reasons to smile. I hope you take time to relax, enjoy yourself, and feel surrounded by love. You deserve every bit of happiness that comes your way.",
  "Wishing you good health, success, and unforgettable memories in the year ahead. Have an amazing birthday!"
];

let currentPage = 0;
let i = 0;

function typeWriter() {
  let txt = pages[currentPage];

  if (i < txt.length) {
    document.getElementById("cardInner").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  } else {
    // When finished typing, show next arrow (if more pages exist)
    if (currentPage < pages.length - 1) {
      nextBtn.style.display = "block";
    }
  }
}

btn.onclick = function() {
  modal.style.display = 'block';
  currentPage = 0;
  i = 0;
  document.getElementById("cardInner").innerHTML = "";
  typeWriter();
}

nextBtn.onclick = function() {
  nextBtn.style.display = "none";
  currentPage++;
  i = 0;
  document.getElementById("cardInner").innerHTML = "";
  typeWriter();
};

closeBtn.onclick = function() {
  modal.style.display = 'none';
  nextBtn.style.display = "none";
  document.getElementById("cardInner").innerHTML = "";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    nextBtn.style.display = "none";
    document.getElementById("cardInner").innerHTML = "";
  }
}

// Floating images logic

const imageSources = [
  'https://images.unsplash.com/photo-1692155628903-3f93fa955da7?q=80&w=868&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1642802031916-875a87c95734?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1705820922514-f78e764c3122?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/vector-1742739301927-959ef5f72016?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/vector-1742739301924-2ae33456b256?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJpcnRoZGF5fGVufDB8MnwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1640506054499-2b040ca19023?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmlydGhkYXl8ZW58MHwyfDB8fHwy',
  'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmlydGhkYXl8ZW58MHwyfDB8fHwy',
  'https://images.unsplash.com/photo-1705820922514-f78e764c3122?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmlydGhkYXl8ZW58MHwyfDB8fHwy',
  'https://images.unsplash.com/photo-1660431875015-f64c8384aaa0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGJpcnRoZGF5fGVufDB8MnwwfHx8Mg%3D%3D',
  'https://images.unsplash.com/photo-1657497850588-95c90b876cdb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGJpcnRoZGF5fGVufDB8MnwwfHx8Mg%3D%3D'
];

const container = document.getElementById("floatingImagesContainer");
const IMG_WIDTH = 150;

function getRandomX(existingXs) {
  const screenWidth = window.innerWidth;
  const minSpacing = IMG_WIDTH * 1.2; // prevents overlapping

  for (let tries = 0; tries < 20; tries++) {
    const x = Math.random() * (screenWidth - IMG_WIDTH);

    // check if too close to existing positions
    let ok = true;
    for (const ex of existingXs) {
      if (Math.abs(x - ex) < minSpacing) {
        ok = false;
        break;
      }
    }

    if (ok) return x;
  }

  return Math.random() * (screenWidth - IMG_WIDTH); // fallback
}

function spawnFour() {
  const positions = [];

  for (let i = 0; i < 4; i++) {
    const img = document.createElement("img");
    img.src = imageSources[Math.floor(Math.random() * imageSources.length)];

    const x = getRandomX(positions);
    positions.push(x);

    img.style.left = x + "px";

    // random float duration for variety
    img.style.animationDuration = (8 + Math.random() * 4) + "s";

    container.appendChild(img);

    img.addEventListener("animationend", () => img.remove());
  }
}

spawnFour();

// spawn a new batch every 2–3 seconds
setInterval(spawnFour, 2500);

