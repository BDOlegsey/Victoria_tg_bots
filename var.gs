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
    [{ "text": "КНМ" }, { "text": "калькулятор" }],
    [{ "text": "суммирование" }, { "text": "стикер" }]
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


let REMOVE_KEYBOARD = {
  remove_keyboard: true
}
