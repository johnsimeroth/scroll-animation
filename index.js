const html = document.documentElement;
const scrollContainer = document.getElementById('scroll-container');
const canvas = document.getElementById('scroll-animation');
const context = canvas.getContext('2d');
const frameCount = 3;
let frameIndex = 1;

function getCurrentImageSrc(index) {
  return `./assets/scrollAnimation${index}.png`
}

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = getCurrentImageSrc(i);
  }
};

const img = new Image();
img.onload = () => {context.drawImage(img, 0, 0)};
img.src = getCurrentImageSrc(frameIndex);

function updateImage(index) {
  img.src = getCurrentImageSrc(index);
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {
  const scrollTop = html.scrollTop;
  const rect = scrollContainer.getBoundingClientRect();
  const startTop = rect.top + scrollTop + 150;
  const endTop = rect.bottom + scrollTop - window.innerHeight - 400;
  if (scrollTop < startTop) frameIndex = 1;
  else if (scrollTop >= endTop) frameIndex = frameCount;
  else {
    rawIndex = ((frameCount - 1) / (endTop - startTop)) * (scrollTop - startTop);
    frameIndex = Math.floor(rawIndex) + 1;
  }
  requestAnimationFrame(() => updateImage(frameIndex))
});




  // const maxScrollTop = scrollContainer.scrollHeight - window.innerHeight;
  // const scrollFraction = scrollTop / maxScrollTop;
  // const frameIndex = Math.min(
  //   frameCount - 1,
  //   Math.ceil(scrollFraction * frameCount)
  // );
