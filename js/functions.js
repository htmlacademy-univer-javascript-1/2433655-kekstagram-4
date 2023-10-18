function isPalindrome(line){
  line = line.toLowerCase().replaceAll(' ', '');
  for (let i = 0; i < line.length; i++){
    if (line[i] !== line[line.length - i - 1]){
      return false;
    }
  }
  return true;
}

function checkLength(line, len){
  if (line.length <= len)
  {
    return true;
  }
  return false;
}

function takeNumbers(line){
  line = line.toString();
  let total = '';
  for (let i = 0; i < line.length; i++){
    if (!Number.isNaN(parseInt(line[i], 10))){
      total += line[i];
    }
  }
  return parseInt(total, 10);
}

function getMinutes(time){
  const parsedTime = time.split(':');
  return parseInt(parsedTime[0], 10) * 60 + parseInt(parsedTime[1], 10);
}

function timeNotOver(workStart, workEnd, meetingStart, duration){
  const wStart = getMinutes(workStart);
  const wEnd = getMinutes(workEnd);
  const mStart = getMinutes(meetingStart);
  if (mStart < wStart || mStart + duration > wEnd){
    return false;
  }
  return true;
}


checkLength('проверяемая строка', 20);
isPalindrome('топот');
takeNumbers('2023 год');
timeNotOver('08:00', '17:30', '14:00', 90);
