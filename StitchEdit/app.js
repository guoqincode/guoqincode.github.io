'use strict';
const cases = window.STITCHEDIT_CASES || [];
const slider = document.querySelector('#compare-range');
const comparison = document.querySelector('#comparison');
function setSplit(value) {
  const amount = Math.max(0, Math.min(100, Number(value)));
  comparison.style.setProperty('--split', `${amount}%`);
  slider.setAttribute('aria-valuetext', `${amount} percent source image visible`);
}
slider.addEventListener('input', e => setSplit(e.target.value));
let switchToken = 0;
async function chooseCase(id, button) {
  const item = cases.find(c => c.id === id);
  if (!item) return;
  const token = ++switchToken;
  document.querySelectorAll('[data-case]').forEach(el => {
    const selected = el.dataset.case === id;
    el.classList.toggle('active', selected);
    el.setAttribute('aria-pressed', String(selected));
  });
  const images = [item.source, item.output, item.qwen].map(src => {
    const image = new Image(); image.src = src;
    return image.decode().catch(() => {});
  });
  await Promise.all(images);
  if (token !== switchToken) return;
  document.querySelector('#compare-source').src = item.source;
  document.querySelector('#compare-source').alt = `Source image for: ${item.prompt}`;
  document.querySelector('#compare-output').src = item.output;
  document.querySelector('#compare-output').alt = `Recorded StitchEdit result for: ${item.prompt}`;
  document.querySelector('#baseline-image').src = item.qwen;
  document.querySelector('#baseline-image').alt = `Qwen-Image-Edit result for: ${item.prompt}`;
  document.querySelector('#case-category').textContent = item.label.toUpperCase();
  document.querySelector('#case-prompt').textContent = item.prompt;
  document.querySelector('#case-explanation').textContent = item.explanation;
  document.querySelector('#case-status').textContent = `${item.label} example selected.`;
  slider.value = '50'; setSplit(50);
}
document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => chooseCase(button.dataset.case, button)));
const copyButton = document.querySelector('#copy-citation');
copyButton.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(document.querySelector('#bibtex').textContent.trim());
    copyButton.textContent = 'Copied'; status.textContent = 'Citation copied to clipboard.';
  } catch {
    const range = document.createRange(); range.selectNodeContents(document.querySelector('#bibtex'));
    const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
    status.textContent = 'Citation selected. Press ⌘C or Ctrl+C to copy.';
  }
});
