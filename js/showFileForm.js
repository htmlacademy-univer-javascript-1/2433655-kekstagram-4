import { isEscapeKey, isEnterKey } from './utils.js';


const overlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const closeForm = document.querySelector('.img-upload__cancel');
const fileInput = document.querySelector('.img-upload__input');
const imageForm = document.querySelector('.img-upload__form');
const hashTag = imageForm.querySelector('.text__hashtags');
const comment = imageForm.querySelector('.text__description');
const preview = imageForm.querySelector('.img-upload__preview img');
const effectsPreview = imageForm.querySelectorAll('.effects__preview');
const scaleSmaller = imageForm.querySelector('.scale__control--smaller');
const scaleBigger = imageForm.querySelector('.scale__control--bigger');
const scaleValue = imageForm.querySelector('.scale__control--value');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFileForm();
  }
};

const plusScale = (evt) => {
  evt.preventDefault();
  scaleValue.value = `${Math.min(Number(scaleValue.value.slice(0, -1)) + 25, 100)}%`;
  scaleImage(scaleValue.value);
};

const minusScale = (evt) => {
  evt.preventDefault();
  scaleValue.value = `${Math.max(Number(scaleValue.value.slice(0, -1)) - 25, 25 )}%`;
  scaleImage(scaleValue.value);
};


function openFileForm() {
  const urlImg = URL.createObjectURL(uploadFile.files[0]);
  overlay.classList.remove('hidden');
  effectsPreview.forEach((element) => {
    element.style.backgroundImage = `url(${  urlImg  })`;
  });
  preview.setAttribute('src', urlImg);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
  scaleBigger.addEventListener('click', plusScale);
  scaleSmaller.addEventListener('click', minusScale);
}

function scaleImage(value) {
  preview.style.transform = `scale(${  Number(Number(value.slice(0, -1)) / 100)  })`;
}

function closeFileForm() {
  if (!(document.activeElement === hashTag || document.activeElement === comment)) {
    uploadFile.value = '';
    overlay.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    document.body.classList.remove('modal-open');
    scaleBigger.removeEventListener('click', plusScale);
    scaleSmaller.removeEventListener('click', minusScale);
  }
}

closeForm.addEventListener('click', () => {
  closeFileForm();
});

closeForm.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeFileForm();
  }
});

fileInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  openFileForm();
});

const sliderElement = document.querySelector('.effect-level__slider');
const effectsList = document.querySelectorAll('.effects__item');
let selectedEffect = 'none';

// Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
// Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
// Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
// Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
// Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
// Для эффекта «Оригинал» CSS-стили filter удаляются.

const effectFunctions = {
  'sepia': (value) => {  },
  'none': (value) => {},
  'chrome': (value) => { preview.style.filter = `grayscale(${ value })`;
    console.log(value);},
  'marvin': (value) => {},
  'phobos': (value) => {},
  'heat': (value) => {}
};

const sliderOptionEdit = {
  'sepia': () => { },
  'none': () => { sliderElement.setAttribute('disabled', true);},
  'chrome': () => {sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  sliderElement.noUiSlider.set(1);},
  'marvin': () => {},
  'phobos': () => {},
  'heat': () => {}
};

effectsList.forEach((element) => {
  element.addEventListener('change', (evt) => {
    evt.preventDefault();
    preview.style.filter = 'none';
    selectedEffect = element.querySelector('input[name="effect"]:checked').value;
    sliderElement.removeAttribute('disabled');
    sliderOptionEdit[selectedEffect]();
    effectFunctions[selectedEffect](sliderElement.noUiSlider.get());
  });
});

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  effectFunctions[selectedEffect](sliderElement.noUiSlider.get());
});

sliderElement.setAttribute('disabled', true);
