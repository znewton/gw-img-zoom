function cssTransformObjectToString(obj) {
  let result = [];
  Object.keys(obj).forEach(key => {
    result.push(key + '(' + obj[key].join(',') + ')');
  });
  console.log(result);
  return result.join(' ');
}
const defaultOptions = {};
/**
 * Initialize an image container that zooms at the mouse cursor and pans with the mouse.
 *
 * @param {HTMLElement} containerElement DOM Element to contain the images
 * @param {Array<string>} images Array of image URLs
 * @param {Object} [options]
 */
function gwImgZoom(containerElement, images, options = {}) {
  // initial setup
  containerElement.style.position = 'relative';
  containerElement.innerHTML = '';
  containerElement.style.overflow = 'hidden';
  const innerFrame = document.createElement('div');
  innerFrame.style =
    'position: absolute; height: 100%; width: 100%;top: 0;left:0;will-change: transform;';
  for (let i = 0; i < images.length; i++) {
    const img = document.createElement('img');
    img.src = images[i];
    img.alt = '';
    img.style = 'position: absolute; height: 100%; width: 100%;';
    innerFrame.appendChild(img);
  }
  containerElement.appendChild(innerFrame);
  // hover handling
  const innerFrameMouseMoveListener = function(e) {
    innerFrame.style.transformOrigin =
      e.offsetX + 'px' + ' ' + e.offsetY + 'px';
  };
  containerElement.addEventListener('mouseenter', function(e) {
    innerFrame.style.transform = 'scale(1.5)';
    innerFrame.style.transformOrigin =
      e.offsetX + 'px' + ' ' + e.offsetY + 'px';
    containerElement.addEventListener('mousemove', innerFrameMouseMoveListener);
  });
  containerElement.addEventListener('mouseleave', function(e) {
    innerFrame.style.transform = 'scale(1)';
    containerElement.removeEventListener(
      'mousemove',
      innerFrameMouseMoveListener
    );
  });
}
