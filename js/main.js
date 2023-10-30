function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function generateMessages() {
  const messageData = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  const messages = [];
  const countMessages = getRandomInteger(1, 2);
  const generateMessageId = createRandomIdFromRangeGenerator(1, countMessages);
  for (let i = 0; i < countMessages; i++) {
    messages.push(messageData[generateMessageId() - 1]);
  }
  return messages.join(' ');
}

function generateName() {
  const dataName = [
    'Михаил', 'Александр', 'Максим', 'Марк', 'Артём', 'Лев', 'Матвей',
    'София', 'Анна', 'Мария', 'Ева', 'Виктория', 'Полина', 'Варвара'
  ];

  return dataName[getRandomInteger(0, dataName.length - 1)];
}

function generateComments(count) {
  const comments = [];
  const generateCommentId = createRandomIdFromRangeGenerator(1, 200);

  for (let i = 0; i < count; i++) {
    comments.push({
      id: generateCommentId(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: generateMessages(),
      name: generateName()
    });
  }

  return comments;
}


function generateObject(generatePhotoId) {
  const itemId = generatePhotoId();
  const minLikes = 15;
  const maxLikes = 200;
  const countComments = getRandomInteger(0, 30);

  return {
    id: itemId,
    url: itemId,
    description: 'Фото',
    likes: getRandomInteger(minLikes, maxLikes),
    comments: generateComments(countComments)
  };
}

function generateData(number = 25) {
  const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);

  const data = [];
  for (let i = 0; i < number; i++) {
    data.push(generateObject(generatePhotoId));
  }

  return data;
}

generateData();
