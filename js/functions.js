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


/*
console.log(checkLength('проверяемая строка', 20)); // true
console.log(checkLength('проверяемая строка', 18)); // true
console.log(checkLength('проверяемая строка', 10)); // false
console.log(isPalindrome('топот')); // true
console.log(isPalindrome('ДовОд')); // true
console.log(isPalindrome('Кекс')); // false
console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true
console.log(takeNumbers('2023 год'));            // 2023
console.log(takeNumbers('ECMAScript 2022'));     // 2022
console.log(takeNumbers('1 кефир, 0.5 батона')); // 105
console.log(takeNumbers('агент 007'));           // 7
console.log(takeNumbers('а я томат'));           // NaN
*/
