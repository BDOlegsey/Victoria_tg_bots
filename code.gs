function getMe() {
  let responce = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/getMe');
  console.log(responce.getContentText());
}

function setWebhook() {
  let webAppUrl = 'https://script.google.com/macros/s/AKfycbzjkoekdbxLsGEiYOgg-HLigLTfpmyk5aWTuWAsFMgyeo6vDJM5n0O4gJyM2GXxuSTp/exec';
  let responce = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/setWebhook?url=" + webAppUrl);
  console.log(responce.getContentText());
}

function sendText(chat_id, text) {
  let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chat_id),
      text: text,
      parse_mode: "HTML"
    }
  };
  UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/", data);
}




function doPost(e) {
  let contents = JSON.parse(e.postData.contents);
  let text = contents.message.text;
  let chat_id = contents.message.chat.id;


  // сложение, вычитание, умножение

  /*
  сложение

  вычитание

  умножение
  */

  if ((/^\//.exec(text))) {
    if (text === '/start') {
      sendText(chat_id, "Напишите команду");
      cache.putAll({'step': '0'}); 
    }
  } else {
    if (cache.get('step') === '0') {
      sendText(chat_id, "step 0");
      cache.put('step', '1');
      if (text === 'сложение') {
        cache.put('com', 'сложение');
      } else if (text === 'вычитание') {
        cache.put('com', 'вычитание');
      } else if (text === 'умножение') {
        cache.put('com', 'умножение');
      }
    } else if (cache.get('step') === '1') {
      sendText(chat_id, "step 1");
      cache.put('step', '2');
      cache.put('num1', text);
    } else if (cache.get('step') === '2') {
      sendText(chat_id, "step 2");
      cache.put('step', 0);
      if (cache.get('com') === 'сложение') {
        let answer = parseInt(text) + parseInt(cache.get('num1'));
        sendText(chat_id, JSON.stringify(answer));
      } else if (cache.get('com') === 'вычитание') {
        let answer = parseInt(cache.get('num1')) - parseInt(text);
        sendText(chat_id, JSON.stringify(answer));
      } else if (cache.get('com') === 'умножение') {
        let answer = parseInt(cache.get('num1')) * parseInt(text);
        sendText(chat_id, JSON.stringify(answer));
      }
    }
  }

  sendText(chat_id, JSON.stringify(cache.getAll()));
  

  SpreadsheetApp.getActive().getSheetByName('test').getRange(1, 1).setValue(JSON.stringify(contents));
  // SpreadsheetApp.getActive().getSheetByName('test').getRange(1, 1).getValue();
}

/*
Практическая работа

  тг-бот:
1. Иметь меню выбора режима:
  - Играть в камень-ножницы-бумага
  - Простой калькулятор
2. Запоминает (записывает в таблицу) суммарный результат по К-Н-Б

*/

function randInt(count) {
  return Math.ceil(Math.random() * count);
}

function test1() {
  console.log(randInt(3));

  console.log(cache.getAll())
}

function fun1() {
  let a = 5;
  let b = 7;

  console.log(a + b);
  console.log(a * b);
  console.log(a / b);
  console.log(a % b);
  console.log(a ** b);

  let s = "abc";
  let s1 = "def";

  console.log(s + s1);

  console.log(1 == '1'); // true
  console.log(1 === '1'); // false

  if (s === s1) {
    console.log('YEP!');
  } else if (s > s1) {
    console.log('2YEP!');
  } else {
    console.log('3YEP!');
  }

  let j = 0;
  console.log(++j);
  j = 0;
  console.log(j++);

  let j1 = j--;

  for (let i = 0; i < 10; ++i) {
    console.log(i);
  }

  let num = 10;
  while (num > 0) {
    console.log(num--);
  }
}

















