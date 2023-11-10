const html = document.documentElement;
const scrollContainer = document.getElementById('scroll-container');
scrollContainer.innerHTML = `
<div id="scroll-animation">
  <canvas id="scroll-canvas" width="2501" height="2501"></canvas>
  <a href="/services" target="_self" class="sie-content-3_view-1_0 se" data-sid="content-3_view-1_0">
    <p class="se-t sie-content-3_view-1_0-text st-m-subheading st-d-subheading">work with me</p>
  </a>
  <div data-sid="content-3_view-3_1" class="sie-content-3_view-3_1 se"
    style="width: 1px; transform: scale(1, 1) translate(-0.141667px, 0px); top: 606.3px; left: 386px; height: 1px;">
    <svg class="se-line" style="width: 86px; height: 1px;">
      <line data-d-strokelinecap="butt" data-d-linestyle="solid" data-d-thickness="1" data-d-rotatedwidth="120"
        data-d-rotatedheight="0" data-d-widthoffset="0" data-d-heightoffset="0" data-d-isround="false"
        data-d-rotation="0" data-d-roundedsolid="false" data-d-dotted="false" data-d-length="120"
        data-d-mirrorline="false" data-d-dashwidth="21" data-d-spacing="15" data-d-dasharrayvalue="none"
        data-m-strokelinecap="butt" data-m-linestyle="solid" data-m-thickness="1" data-m-rotatedwidth="118"
        data-m-rotatedheight="0" data-m-widthoffset="0" data-m-heightoffset="0" data-m-isround="false"
        data-m-rotation="0" data-m-roundedsolid="false" data-m-dotted="false" data-m-length="118"
        data-m-mirrorline="false" data-m-dashwidth="21" data-m-spacing="15" data-m-dasharrayvalue="none" x1="0"
        y1="0" x2="100%" y2="0" style="stroke-width: 0.716667px; stroke-dasharray: 0px;"></line>
    </svg>
  </div>
</div>
`;

const canvas = document.getElementById('scroll-canvas');
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
