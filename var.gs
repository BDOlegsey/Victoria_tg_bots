let token = '7226535841:AAHrFts4RGqWspBYAKdE8Z4B9Md2-zDmppE';

let cache = CacheService.getUserCache();

let hi_sticker = 'CAACAgIAAxkBAAONZxKDIuNy8FKyEXzoQf4a5Onsd30AAmYSAAJGR8hLPzanbsxr4Vk2BA';


let REGULAR_KEYBOARD = {
  "keyboard": [
    [{ "text": "abc" }, { "text": "def" }]
  ],
  "resize_keyboard": true,
};

let START_KEYBOARD = {
  "keyboard": [
    [{ "text": "Прибыль" }, { "text": "Убыль" }],
    [{ "text": "Tic-Tac-Toe" }]
  ],
  "resize_keyboard": true,
  "one_time_keyboard": true,
};

let TTT_KEYBOARD = {
  "keyboard": [
    [{ "text": '1' + mat[0][0] }, { "text": '2s' + mat[0][1] }, { "text": '3' + mat[0][2] }],
    [{ "text": '4' + mat[1][0] }, { "text": '5' + mat[1][1] }, { "text": '6' + mat[1][2] }],
    [{ "text": '7' + mat[2][0] }, { "text": '8' + mat[2][1] }, { "text": '9' + mat[2][2] }],
  ],
  "resize_keyboard": true,
  "one_time_keyboard": true,
};

let RSP_KEYBOARD = {
  "keyboard": [
    [{ "text": "камень" }, { "text": "ножницы" }, { "text": "бумага" }]
  ],
  "resize_keyboard": true,
  "one_time_keyboard": true,
};

let Inl_KEYBOARD = {
  "inline_keyboard": [
    [{ "text": "камень", "callback_data": "call"}]
  ],
  "resize_keyboard": true,
  "one_time_keyboard": true,
}


let REMOVE_KEYBOARD = {
  remove_keyboard: true
}


class Player {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log('Hello! I`m ' + this._name);
  }
  get name() {
    return this._name;
  }
  set name(value) {
    if (value === 'Ivan') {
      console.log('I am not Petya');
      return;
    } else {
      this._name = value;
    }
  }
}

function test() {
  let player = new Player('Ivan');

  Player.prototype.sayhello = function() {
    console.log('Hello world!');
  }

  player.sayHi();
  player.sayhello();
}






class Matrix {
  constructor() {
    this.mat = [
            ['0', '0', '0'],
            ['0', '0', '0'],
            ['0', '0', '0']
          ];
    this.keyboard = {
      "keyboard": [
        [{ "text": '1' + this.mat[0][0] }, { "text": '2s' + this.mat[0][1] }, { "text": '3' + this.mat[0][2] }],
        [{ "text": '4' + this.mat[1][0] }, { "text": '5' + this.mat[1][1] }, { "text": '6' + this.mat[1][2] }],
        [{ "text": '7' + this.mat[2][0] }, { "text": '8' + this.mat[2][1] }, { "text": '9' + this.mat[2][2] }],
      ],
      "resize_keyboard": true,
      "one_time_keyboard": true,
    };
  }

  update() {
    for (let i = 1; i <= 3; ++i) {
      for (let j = 1; j <= 3; ++j) {
        this.mat[i - 1][j - 1] = SpreadsheetApp.getActive().getSheetByName('ttt').getRange(i, j).getValue();
      }
    }
    this.keyboard = {
      "keyboard": [
        [{ "text": '1' + this.mat[0][0] }, { "text": '2s' + this.mat[0][1] }, { "text": '3' + this.mat[0][2] }],
        [{ "text": '4' + this.mat[1][0] }, { "text": '5' + this.mat[1][1] }, { "text": '6' + this.mat[1][2] }],
        [{ "text": '7' + this.mat[2][0] }, { "text": '8' + this.mat[2][1] }, { "text": '9' + this.mat[2][2] }],
      ],
      "resize_keyboard": true,
      "one_time_keyboard": true,
    };
  }

  new_turn(value) {
    if (value == '1') {
      this.mat[0][0] = '1'
    } else if (value == '2') {
      this.mat[0][1] = '1'
    } else if (value == '3') {
      this.mat[0][2] = '1'
    } else if (value == '4') {
      this.mat[1][0] = '1'
    } else if (value == '5') {
      this.mat[1][1] = '1'
    } else if (value == '6') {
      this.mat[1][2] = '1'
    } else if (value == '7') {
      this.mat[2][0] = '1'
    } else if (value == '8') {
      this.mat[2][1] = '1'
    } else if (value == '9') {
      this.mat[2][2] = '1'
    }
  }

  get_cell(i, j) {
    return this.mat[i][j];
  }

  set_cell(i, j, value) {
    this.mat[i][j] = value;
  }
}















