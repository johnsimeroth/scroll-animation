const html = document.documentElement;
const scrollContainer = document.getElementById('scroll-container');
const canvas = document.getElementById('scroll-canvas');
// const canvas = scrollContainer.appendChild(document.createElement('canvas'));
// canvas.setAttribute('id', 'scroll-animation');
// canvas.height = 2501;
// canvas.width = 2501;

// const link = scrollContainer.appendChild(document.createElement('a'));
// link.setAttribute('href', '/services')
// link.setAttribute()

{/* <a href="/services" target="_self" class="sie-content-3_view-1_0 se" data-sid="content-3_view-1_0" style="transform: scale(0.925, 0.925) translate(-48.7297px, -70.2162px);"><p class="se-t sie-content-3_view-1_0-text st-m-subheading st-d-subheading">work with me</p></a> */}

const context = canvas.getContext('2d');
const frameCount = 3;
let frameIndex = 1;

const imageSrcs = [
  'https://static.showit.co/file/a_r6CEEBTAW0tFb6PkNLgw/210670/scrollanimation1.png',
  'https://static.showit.co/file/meLy95GbT92o-_ooNfahCQ/210670/scrollanimation2.png',
  'https://static.showit.co/file/ycqBORKCQu6YO9tFD6nyZw/210670/scrollanimation3.png',
];

function getCurrentImageSrc(index) {
  return imageSrcs[index - 1];
}

const img = new Image();
img.onload = () => {
  context.drawImage(img, 0, 0);
};
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
    rawIndex =
      ((frameCount - 1) / (endTop - startTop)) * (scrollTop - startTop);
    frameIndex = Math.floor(rawIndex) + 1;
  }
  requestAnimationFrame(() => updateImage(frameIndex));
});

