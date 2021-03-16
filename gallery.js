import img from './gallery-items.js'

const galleryContainer = document.querySelector(".js-gallery");
const cardsMarkup =  createImgCardsMarkup(img);
galleryContainer.insertAdjacentHTML("beforeend", cardsMarkup);

function createImgCardsMarkup(img) {
  return img
  .map( ({ preview, original, description}) => {
  return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
  `;
})
.join(" ");
};

const lightbox = document.querySelector('.js-lightbox');
const lightboxImage = lightbox.querySelector('.lightbox__image');
galleryContainer.addEventListener('click', galleryContainerClick);

function galleryContainerClick(evt) {
  evt.preventDefault();
     if (!evt.target.classList.contains('gallery__image')) {
       return;
   }
     lightbox.classList.add('is-open');
     lightboxImage.setAttribute('src', evt.target.dataset.source)
};

const closeButton = document.querySelector('button[data-action="close-lightbox"]');
closeButton.addEventListener('click', onModalIsClosed);

function onModalIsClosed (evt) {
    lightboxImage.src = ''; 
    lightbox.classList.remove('is-open');     
};

const closeModal = document.querySelector('.js-lightbox');
closeModal.addEventListener('click', closedModalClick);

function closedModalClick (evt) {
  if (evt.target.classList.contains('lightbox__overlay')) {
    onModalIsClosed ();
   };
  return;
};

window.addEventListener('keydown', closeModalKey);

function closeModalKey (evt) {
  evt.preventDefault();
  if (evt.code === 'Escape') {
    onModalIsClosed ();
   };
  return;
}


