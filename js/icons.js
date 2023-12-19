const picturesList = document.querySelector('.pictures');
picturesList.classList.remove('hidden');
const pictureTemplate = document.querySelector('#picture').content;

const renderPhotosList = (photos) => {
  picturesList.querySelectorAll('.picture').forEach((element) => {
    picturesList.removeChild(element);
  });
  const pictureListFragment = document.createDocumentFragment();
  photos.forEach((element) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').setAttribute('id', element['id']);
    newPicture.querySelector('.picture__img').setAttribute('src', element['url']);
    newPicture.querySelector('.picture__img').setAttribute('alt', element['description']);
    newPicture.querySelector('.picture__likes').textContent = element['likes'];
    newPicture.querySelector('.picture__comments').textContent = element['comments'].length;
    pictureListFragment.appendChild(newPicture);
  });
  picturesList.appendChild(pictureListFragment);
};

export {renderPhotosList};
