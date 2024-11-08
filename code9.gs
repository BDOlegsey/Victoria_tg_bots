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


function editMessageText(chat_id, message_id, text) {
  let data = {
    method: "post",
    payload: {
      method: "editMessageText",
      message_id: message_id,
      chat_id: String(chat_id),
      text: text
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

function last_row_in_col(n) {
  let ind = 1;
  while (!SpreadsheetApp.getActive().getSheetByName('Учёт Финансов').getRange(ind, n).isBlank()) {
    ind++;
  }
  return ind;
}


// Прак-игра: необходимо сделать игру в крестики нолики с ботом (пусть бот просто ходит, куда может)



function doPost(e) {
  let contents = JSON.parse(e.postData.contents);
  let text = '';
  text = contents.message.text;
  let chat_id = contents.message.chat.id;

  var date = new Date(JSON.parse(contents.message.date) * 1000);

  SpreadsheetApp.getActive().getSheetByName('test').getRange(2, 1).setValue(JSON.stringify(date.getMinutes()));
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
      if (cache.get('step') == '-1') {
        // Tic-Tac-Toe
        if (text === 'Прибыль') {
          cache.put('step', '0');
          cache.put('ch', 'Прибыль');
        } else if (text === 'Убыль') {
          cache.put('step', '0');
          cache.put('ch', 'Убыль');
        } else if (text === 'Tic-Tac-Toe') {
          cache.put('step', '0');
          cache.put('ch', 'ttt');
        }
      } else if (cache.get('step') == '0') {
        
        if (cache.get('ch') == 'ttt') {
          sendText(chat_id, "Game start!", TTT_KEYBOARD);
          cache.put('step', '1');
          mat = [
            ['0', '0', '0'],
            ['0', '0', '0'],
            ['0', '0', '0']
          ]
          for (let i = 1; i <= 3; ++i) {
            for (let j = 1; j <= 3; ++j) {
              mat[i - 1][j - 1] = SpreadsheetApp.getActive().getSheetByName('ttt').getRange(i, j).getValue();
            }
          }

          


        } else if (cache.get('ch') != 'ttt') {
          cache.put('step', '-1');
          let last_column = SpreadsheetApp.getActive().getSheetByName('Учёт Финансов').getLastColumn();
          let last_time = SpreadsheetApp.getActive().getSheetByName('Учёт Финансов').getRange(1, last_column).getValue();

          if (JSON.stringify(date.getMinutes()) != last_time) {
            var sum = 0;
            for (let i = 2; i < last_row_in_col(last_column - 2); ++i) {
              sum += JSON.parse(SpreadsheetApp.getActive().getSheetByName('Учёт Финансов').getRange(i, last_column - 2).getValue());
            }
            for (let i = 2; i < last_row_in_col(last_column - 1); ++i) {
              sum -= JSON.parse(SpreadsheetApp.getActive().getSheetByName('Учёт Финансов').getRange(i, last_column - 1).getValue());
            }
            SpreadsheetApp.getActive().getSheetByName('Учёт Финансов').getRange(3, last_column).setValue(JSON.stringify(sum));
            SpreadsheetApp.getActive().getSheetByName('Учёт Финансов').getRange(1, last_column + 3).setValue(JSON.stringify(date.getMinutes()))
            SpreadsheetApp.getActive().getSheetByName('Учёт Финансов').getRange(2, last_column + 3).setValue('Итог');
            SpreadsheetApp.getActive().getSheetByName('Учёт Финансов').getRange(1, last_column + 2).setValue('Убыль');
            SpreadsheetApp.getActive().getSheetByName('Учёт Финансов').getRange(1, last_column + 1).setValue('Прибыль');
          }

          if (cache.get('ch') ===  'Прибыль') {
            last_column = SpreadsheetApp.getActive().getSheetByName('Учёт Финансов').getLastColumn();
            let last_row = last_row_in_col(last_column - 2);
            SpreadsheetApp.getActive().getSheetByName('Учёт Финансов').getRange(last_row, last_column - 2).setValue(text);
          } else if (cache.get('ch') ===  'Убыль') {
            last_column = SpreadsheetApp.getActive().getSheetByName('Учёт Финансов').getLastColumn();
            let last_row = last_row_in_col(last_column - 1);
            SpreadsheetApp.getActive().getSheetByName('Учёт Финансов').getRange(last_row, last_column - 1).setValue(text);
          }
      } 
        } else if (cache.get('step') == '1') {
          for (let i = 1; i <= 3; ++i) {
            for (let j = 1; j <= 3; ++j) {
              mat[i - 1][j - 1] = SpreadsheetApp.getActive().getSheetByName('ttt').getRange(i, j).getValue();
            }
          }
          if (text[0] == '1') {
            mat[0][0] = 1
          } else if (text[0] == '2') {
            mat[0][1] = 1
          } else if (text[0] == '3') {
            mat[0][2] = 1
          } else if (text[0] == '4') {
            mat[1][0] = 1
          } else if (text[0] == '5') {
            mat[1][1] = 1
          } else if (text[0] == '6') {
            mat[1][2] = 1
          } else if (text[0] == '7') {
            mat[2][0] = 1
          } else if (text[0] == '8') {
            mat[2][1] = 1
          } else if (text[0] == '9') {
            mat[2][2] = 1
          }

          let id = -1, jd = -1;
          for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
              if (mat[i][j] == '0') {
                id = i; jd = j;
              }
            }
          }

          if (id != -1 && jd != -1) {
            mat[id][jd] = '-1';
            for (let i = 1; i <= 3; ++i) {
              for (let j = 1; j <= 3; ++j) {
                SpreadsheetApp.getActive().getSheetByName('ttt').getRange(i, j).setValue(String(mat[i - 1][j - 1]));
              }
            }
            sendText(chat_id, 'Следующий ход', TTT_KEYBOARD);
          } else {
            cache.put('step', '-1');
            sendText(chat_id, 'Game over', START_KEYBOARD);
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

  var date = new Date(JSON.parse(contents.message.date) * 1000);
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


