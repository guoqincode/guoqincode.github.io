"use strict";
const copyButton = document.querySelector("#copy-citation");
copyButton?.addEventListener("click", async () => {
  const status = document.querySelector("#copy-status");
  const citation = document.querySelector("#bibtex");
  try {
    await navigator.clipboard.writeText(citation.textContent.trim());
    copyButton.textContent = "Copied";
    status.textContent = "Citation copied to clipboard.";
  } catch {
    const range = document.createRange();
    range.selectNodeContents(citation);
    const selection = window.getSelection();
    selection.removeAllRanges(); selection.addRange(range);
    status.textContent = "Citation selected. Press ⌘C or Ctrl+C to copy.";
  }
});
