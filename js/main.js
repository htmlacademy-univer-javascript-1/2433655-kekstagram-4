import './icons.js';
import './big-picture.js';
import './file-form.js';
import './validation.js';
import './effects.js';
import './api.js';
import './filters.js';
import { renderPhotosList } from './icons.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { setUserFormSubmit } from './validation.js';
import { closeSentForm } from './file-form.js';
import { setFilterListeners } from './filters.js';
import { setFullsizeListeners } from './big-picture.js';


const PHOTOS_COUNT = 25;

getData().then((photos) => {
  setFilterListeners(photos);
  setFullsizeListeners(photos);
  renderPhotosList(photos.slice(0, PHOTOS_COUNT));
})
  .then(() => {
    const filters = document.querySelector('.img-filters');
    filters.classList.remove('img-filters--inactive');
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit(closeSentForm);
