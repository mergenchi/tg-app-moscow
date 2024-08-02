const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

// Замените 'YOUR_TELEGRAM_BOT_TOKEN' на токен вашего бота
const token = '7084457547:AAECC1HUeleUaH8bfctG5Wj3qUKO_MUWv4A';

const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(bodyParser.json());

// Маршрут для отображения веб-приложения
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Обработка данных, полученных из веб-приложения
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg.web_app_data) {
        const userName = msg.web_app_data.data;
        bot.sendMessage(chatId, `Имя пользователя: ${userName}`);
    } else {
        bot.sendMessage(chatId, 'Нажмите кнопку ниже, чтобы ввести ваше имя.');
        bot.sendMessage(chatId, 'Введите ваше имя', {
            reply_markup: {
                inline_keyboard: [[
                    { text: 'Ввести имя', web_app: { url: 'https://yamarket.mooo.com' } }
                ]]
            }
        });
    }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

