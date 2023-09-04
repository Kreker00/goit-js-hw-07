import { galleryItems } from "./gallery-items.js"
// Change code below this line
console.log(galleryItems)

const gallery = document.querySelector(".gallery")
const galleryLi = galleryItems
    .map(
        ({ preview, original, description }) =>
            `<li data-preview="${preview}" class="gallery__item">
            <a class="gallery__link" href="${original}">
            <img src="${preview}" data-source="${original}" alt="${description}" class="gallery__image" />
            </a>
            </li>`
    )
    .join("")
gallery.innerHTML = galleryLi

let instance = null;

gallery.addEventListener('click', event => {
    event.preventDefault();
    
  if (event.target.classList.contains("gallery__image")) {
    
    const imageSource = event.target.dataset.source;
    instance = basicLightbox.create(
      `
      <img src="${imageSource}" width="800" height="600">
      `,
      {
        onShow: () => {
          window.addEventListener("keydown", handleKeyPress);
        },
        onClose: () => {
          window.removeEventListener("keydown", handleKeyPress);
        },
      }
    );
    instance.show();
  }
})

function handleKeyPress(event) {
  if (event.key === "Escape") {
    instance.close();
  }
}