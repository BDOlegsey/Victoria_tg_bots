function getMe() {
  let responce = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/getMe');
  console.log(responce.getContentText());
}

function setWebhook() {
  let webAppUrl = 'https://script.google.com/macros/s/AKfycbzjkoekdbxLsGEiYOgg-HLigLTfpmyk5aWTuWAsFMgyeo6vDJM5n0O4gJyM2GXxuSTp/exec';
  let responce = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/setWebhook?url=" + webAppUrl);
  console.log(responce.getContentText());
}

function sendText(chat_id, text, keyboard) {
  let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chat_id),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(keyboard)
    }
  };
  UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/", data);
}

function forwardMessage(chat_id, from_chat_id, message_id) {
  let data = {
    method: "post",
    payload: {
      method: "forwardMessage",
      chat_id: String(chat_id),
      message_id: String(message_id),
      from_chat_id: String(from_chat_id),
    }
  }; 
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data)
}


function sendSticker(chat_id, sticker, keyboard) {
  let data = {
    method: "post",
    payload: {
      method: "sendSticker",
      chat_id: String(chat_id),
      sticker: sticker,
      reply_markup: JSON.stringify(keyboard)
    }
  }; 
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data)
}

function banned(chat_id) {
  let last_row = SpreadsheetApp.getActive().getSheetByName('ban_users').getLastRow();
  for (let i = 1; i <= last_row; ++i) {
    let value = SpreadsheetApp.getActive().getSheetByName('ban_users').getRange(i, 1).getValue();
    if (value == String(chat_id)) {
      return true
    }
  }
  return false
}


// Прак1 : Реализовать бан-лист пользователей (из таблицы)
// Прак2 : Реализовать наше меню в клавиатуре
// Бонусный прак : КНМ реализовать через клавиатуру


function doPost(e) {
  let contents = JSON.parse(e.postData.contents);
  let text = '';
  text = contents.message.text;
  let chat_id = contents.message.chat.id;

  SpreadsheetApp.getActive().getSheetByName('test').getRange(1, 1).setValue(JSON.stringify(contents));


  let id_of_group = -4517402721;

  forwardMessage(id_of_group, chat_id, contents.message.message_id);

  if (banned(chat_id)) {
    sendText(chat_id, 'Ты - в бане!');
  } else {
    if ((/^\//.exec(text))) {
      if (text === '/start') {
        sendText(chat_id, "Напишите команду", START_KEYBOARD);
        cache.putAll({'step': '-1'}); 
        sendSticker(chat_id, hi_sticker);
      } else if (text === '/delete') {
        sendText(chat_id, "Напишите команду", REMOVE_KEYBOARD);
      }
    } else {
      if (cache.get('step') === '-1') {
        if (text === 'КНМ') {
          cache.put('mod', 'КНМ');
        } else if (text === 'калькулятор') {
          cache.put('mod', 'калькулятор');
        } else if (text === 'суммирование') {
          cache.put('mod', 'суммирование');
        } else if (text === 'стикер') {
          cache.put('mod', 'стикер');
          cache.put('sticker', '0');
        }
        cache.put('step', 0)
      } else if (cache.get('step') === '0') {
        if (cache.get('mod') === 'стикер') {
          sendSticker(chat_id, contents.message.sticker.file_id, START_KEYBOARD);
          cache.putAll({'step': -1});
        } else if (cache.get('mod') === 'калькулятор') {
          sendText(chat_id, "step 0");
          cache.put('step', '1');
          if (text === 'сложение') {
            cache.put('com', 'сложение');
          } else if (text === 'вычитание') {
            cache.put('com', 'вычитание');
          } else if (text === 'умножение') {
            cache.put('com', 'умножение');
          }
        } else if (cache.get('mod') === 'КНМ') {
          cache.put('step', -1)
          answer = randInt(3);
          /*
          1 - камень
          2 - ножницы
          3 - бумага
          */

          if (text === 'камень') {
            if (answer === 1) {
              sendText(chat_id, "draw");
            } else if (answer === 2) {
              sendText(chat_id, "win");
            } else if (answer === 3) {
              sendText(chat_id, "lose");
            }
          } else if (text === 'ножницы') {
            if (answer === 1) {
              sendText(chat_id, "lose");
            } else if (answer === 2) {
              sendText(chat_id, "draw");
            } else if (answer === 3) {
              sendText(chat_id, "win");
            }
          } else if (text === 'бумага') {
            if (answer === 1) {
              sendText(chat_id, "win");
            } else if (answer === 2) {
              sendText(chat_id, "lose");
            } else if (answer === 3) {
              sendText(chat_id, "draw");
            }
          }
          sendText(chat_id, "Напишите команду", START_KEYBOARD);
        } else if (cache.get('mod') === 'суммирование') {
          let last_row = SpreadsheetApp.getActive().getSheetByName('abc').getLastRow();
          if (text != 'stop') {
            SpreadsheetApp.getActive().getSheetByName('abc').getRange(last_row + 1, 1).setValue(text);
          } else if (text === 'stop') {
            var sm = 0;
            for (let i = 1; i <= last_row; ++i) {
              sm += parseInt(SpreadsheetApp.getActive().getSheetByName('abc').getRange(i, 1).getValue());
            }

            for (let i = 1; i <= last_row; ++i) {
              SpreadsheetApp.getActive().getSheetByName('abc').getRange(i, 1).setValue('');
            }

            sendText(chat_id, JSON.stringify(sm), START_KEYBOARD);
            cache.put('step', '-1');
          }
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
  }



  /*
  for (let i = 0; i < 10; ++i) {
    console.log(i);
  }
  */
  // let last_row = SpreadsheetApp.getActive().getSheetByName('test').getLastRow();

  SpreadsheetApp.getActive().getSheetByName('test').getRange(last_row + 1, 1).setValue(JSON.stringify(contents));
  value = SpreadsheetApp.getActive().getSheetByName('test').getRange(1, 1).getValue();
}

/*
Практическая работа 1

  тг-бот:
1. Иметь меню выбора режима:
  - Играть в камень-ножницы-бумага
  - Простой калькулятор
2. Запоминает (записывает в таблицу) суммарный результат по К-Н-Б

Практическая работа 2

  тг-бот:
1. Добавьте в меню новый режим (или создайте меню с 1 режимом):
  пользователь вводит числа, пока не скажет "стоп" - бот выводит сумму
  Все числа пользователя должны быть в таблице

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
