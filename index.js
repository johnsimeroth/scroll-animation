const html = document.documentElement;
const scrollContainer = document.getElementById('scroll-container');
scrollContainer.innerHTML = `
<div id="scroll-animation">
  <canvas id="scroll-canvas" width="2501" height="2501"></canvas>
  <a href="/services" target="_self" class="wwm" data-sid="content-3_view-1_0">
    <p id="wwm-text" class="st-m-subheading st-d-subheading wwm">work with me</p>
  </a>
</div>
`;

const canvas = document.getElementById('scroll-canvas');
const context = canvas.getContext('2d');
const frameCount = 3;
let frameIndex = 0;

const imageSrcs = [
  'https://static.showit.co/file/3Ee9KsisQ3ujcNsSZKPY-g/210670/sa1.png',
  'https://static.showit.co/file/Rrlp9RvBRiuloA5zjC1WAQ/210670/sa2.png',
  'https://static.showit.co/file/D7Nmy6AYRuWXlni36yCRQg/210670/sa3.png',
];

const img = new Image();
img.onload = () => {
  context.drawImage(img, 0, 0);
};
img.src = imageSrcs[frameIndex];

let prevIndex = frameIndex;
function updateImage(index) {
  if (prevIndex === index) return;
  context.clearRect(0, 0, canvas.width, canvas.height);
  img.src = imageSrcs[index];
  context.drawImage(img, 0, 0);
  prevIndex = index;
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
