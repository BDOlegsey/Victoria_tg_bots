import telebot
from telebot import types

bot = telebot.TeleBot('7494088332:AAEIrtYkF3LkhDQhW3I-DoMsSJ6HzvfhOPc')

@bot.message_handler(commands=['start'])
def start(message):
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
    btn = types.KeyboardButton('Hello!')
    btn1 = types.KeyboardButton('Hello!')
    btn2 = types.KeyboardButton('Hello!')
    markup.add(btn, btn2, btn1)
    bot.send_message(message.from_user.id, 'Hello!', reply_markup=markup)


@bot.message_handler(content_types=['text'])
def get_text_message(message):
    if message.text == 'Hello!':
        bot.send_message(message.from_user.id, 'already helloed!')
    else:
        bot.send_message(message.from_user.id, 'Wrong!')


bot.polling(non_stop=True, interval=0)
