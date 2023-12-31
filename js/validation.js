import { sendData } from './api.js';
import { closeSentFormError } from './file-form.js';

const imageForm = document.querySelector('.img-upload__form');
const submitButton = imageForm.querySelector('.img-upload__submit');
const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const pristine = new Pristine(imageForm, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});


const validateHashTag = (value) => {
  let isValidated = true;
  if (value.length === 0) {
    return true;
  }
  const valueArr = value.split(/\s+/);
  const existHashs = [];
  if (valueArr.length > 5) {
    return false;
  }
  valueArr.forEach((element) => {
    if (!regexp.test(element) || existHashs.includes(element.toLowerCase())) {
      isValidated = false;
    }
    existHashs.push(element.toLowerCase());
  });
  if (existHashs.length === 0) {
    return false;
  }
  else {
    if (!isValidated) {
      return false;
    }
    return true;
  }
};

const validateComment = (value) => value.length <= 140;

pristine.addValidator(
  imageForm.querySelector('.text__hashtags'),
  validateHashTag,
  'не правильно введены хэштеги'
);

pristine.addValidator(
  imageForm.querySelector('.text__description'),
  validateComment,
  'введено больше 140 символов'
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setUserFormSubmit = (onSuccess) => {
  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      pristine.reset();
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(
          (err) => {
            closeSentFormError(err.message);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

export {setUserFormSubmit};
