import './icons.js';
import './showFullsize.js';
import './showFileForm.js';
import './validation.js';
import './effects.js';
import './api.js';
import { renderPhotosList } from './icons.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { setUserFormSubmit } from './validation.js';
import { closeSentForm } from './showFileForm.js';

const PHOTOS_COUNT = 25;

getData()
  .then((photos) => {
    renderPhotosList(photos.slice(0, PHOTOS_COUNT));
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit(closeSentForm);
