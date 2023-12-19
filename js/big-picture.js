import { isEscapeKey, isEnterKey } from './utils.js';
import { renderImage, renderComments } from './rendering.js';
import { filterDefault } from './filters.js';

const bigPictureImage = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');

let onLoadComments;

const closeImage = (func) => {
  const commentsList = document.querySelector('.social__comments');
  commentsList.innerHTML = '';
  bigPictureImage.classList.add('hidden');
  document.removeEventListener('keydown', func);
  document.body.classList.remove('modal-open');
  document.querySelector('.comments-loader').removeEventListener('click', onLoadComments);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.removeEventListener('keydown', onDocumentKeydown);
    closeImage();
  }
};

const openImage = (image, data) => {
  if (image.target.classList.contains('picture__img')){
    image.preventDefault();
    const commentLoader = bigPictureImage.querySelector('.comments-loader');
    commentLoader.classList.remove('hidden');
    bigPictureImage.classList.remove('hidden');
    const commentsObj = renderComments(filterDefault(data), image, 0, commentLoader);
    commentsObj();
    onLoadComments = (evt) => {
      evt.preventDefault();
      commentsObj();
    };
    renderImage(image);
    commentLoader.addEventListener('click', onLoadComments);
    document.addEventListener('keydown', onDocumentKeydown);
    document.body.classList.add('modal-open');
  }
};

const setFullsizeListeners = (data) => {
  const picturesList = document.querySelector('.pictures');
  picturesList.addEventListener('click', (evt) => {
    openImage(evt, data);
  });
  picturesList.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      openImage(evt, data);
    }
  });
};

bigPictureCloseButton.addEventListener('click', () => {
  closeImage(onDocumentKeydown);
});

bigPictureCloseButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeImage(onDocumentKeydown);
  }
});

export {setFullsizeListeners};
