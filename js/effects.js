import { preview } from './showFileForm.js';

const sliderElement = document.querySelector('.effect-level__slider');
const effectsList = document.querySelectorAll('.effects__item');
const sliderField = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-value-to-form');
let selectedEffect = 'none';
const effectsFormat = {
  'sepia': (value) => `sepia(${value})`,
  'marvin': (value) => `invert(${value}%)`,
  'phobos': (value) => `blur(${value}px)`,
  'none': () => 'none',
  'chrome': (value) => `grayscale(${value})`,
  'heat': (value) => `brightness(${value})`
};
const sliderOptionEdit = {
  'sepia': () => {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
    });
    sliderElement.noUiSlider.set(1);
  },
  'none': () => {
    sliderField.classList.add('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
    });
    sliderElement.noUiSlider.set(1);
  },
  'chrome': () => {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
    });
    sliderElement.noUiSlider.set(1);
  },
  'marvin': () => {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
    });
    sliderElement.noUiSlider.set(100);
  },
  'phobos': () => {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
    });
    sliderElement.noUiSlider.set(3);
  },
  'heat': () => {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
    });
    sliderElement.noUiSlider.set(3);
  }
};
effectsList.forEach((element) => {
  element.addEventListener('change', (evt) => {
    evt.preventDefault();
    preview.style.filter = 'none';
    selectedEffect = element.querySelector('input[name="effect"]:checked').value;
    sliderField.classList.remove('hidden');
    sliderOptionEdit[selectedEffect]();
    preview.style.filter = effectsFormat[selectedEffect](sliderElement.noUiSlider.get());
    effectValue.value = preview.style.filter;
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
  preview.style.filter = effectsFormat[selectedEffect](sliderElement.noUiSlider.get());
  effectValue.value = preview.style.filter;
});
sliderField.classList.add('hidden');
