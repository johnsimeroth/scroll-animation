const html = document.documentElement;
const scrollContainer = document.getElementById('scroll-container');
scrollContainer.innerHTML = `
<div id="scroll-animation">
  <canvas id="scroll-canvas" width="2501" height="2501"></canvas>
  <a href="/services" target="_self" class="sie-content-3_view-1_0 work-with-us-link" data-sid="content-3_view-1_0">
    <p class="sie-content-3_view-1_0-text st-m-subheading st-d-subheading">work with us</p>
  </a>
</div>
`;

const canvas = document.getElementById('scroll-canvas');
const context = canvas.getContext('2d');
const frameCount = 3;
let frameIndex = 0;

const imageSrcs = [
  'https://static.showit.co/file/a_r6CEEBTAW0tFb6PkNLgw/210670/scrollanimation1.png',
  'https://static.showit.co/file/meLy95GbT92o-_ooNfahCQ/210670/scrollanimation2.png',
  'https://static.showit.co/file/ycqBORKCQu6YO9tFD6nyZw/210670/scrollanimation3.png',
];

const img = new Image();
img.onload = () => {
  context.drawImage(img, 0, 0);
};
img.src = imageSrcs[frameIndex];

function updateImage(index) {
  img.src = imageSrcs[index];
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {
  const scrollTop = html.scrollTop;
  const rect = scrollContainer.getBoundingClientRect();
  const startTop = rect.top + scrollTop + 150;
  const endTop = rect.bottom + scrollTop - window.innerHeight - 400;
  if (scrollTop < startTop) frameIndex = 0;
  else if (scrollTop >= endTop) frameIndex = frameCount - 1;
  else frameIndex = Math.floor(((frameCount - 1) / (endTop - startTop)) * (scrollTop - startTop));
  requestAnimationFrame(() => updateImage(frameIndex));
});
