const galleryPreviewImage = document.querySelector("[data-gallery-image]");
const galleryTitle = document.querySelector("[data-gallery-title]");
const galleryDescription = document.querySelector("[data-gallery-description]");
const galleryFilename = document.querySelector("[data-gallery-filename]");
const galleryThumbs = document.querySelectorAll("[data-gallery-thumb]");

if (galleryPreviewImage && galleryTitle && galleryDescription && galleryFilename && galleryThumbs.length > 0) {
  galleryThumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      galleryPreviewImage.setAttribute("src", thumb.dataset.image ?? "");
      galleryPreviewImage.setAttribute("alt", thumb.dataset.alt ?? "");
      galleryTitle.textContent = thumb.dataset.title ?? "";
      galleryDescription.textContent = thumb.dataset.description ?? "";
      galleryFilename.textContent = `Arquivo planejado: ${thumb.dataset.filename ?? ""}`;

      galleryThumbs.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-pressed", "false");
      });

      thumb.classList.add("is-active");
      thumb.setAttribute("aria-pressed", "true");
    });
  });
}
