const TelegramApi = require('node-telegram-bot-api')
const {gameOptions,againOptions} = require('./options')
const token = '1879567187:AAGkM-onFfRcbsaBiNZvgLexQVR32Zutz4E'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!`);
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

const start =  () => {

   // bot.setMyCommands([

    //])

    const commandsDB = [
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра угадай цифру'},
        {command: '/sagarmut', description: 'Нажми!'},
        {command: '/help', description: 'Показать справку!'},
        {command: '/whoIAm', description: 'Информация о тебе'}
    ]


    const getHelp = () => {
        let helpText = `Телеграм-бот, созданный для развлечения, а не для работы.\n*Доступные команды:*\n`;
        helpText += commandsDB.map(
            (command) => `*/${command.command}* ${command.description}`
        ).join(`/n`);
        return helpText;
    };

    bot.on("audio", () => {
        return getHelp();
    });

    bot.on("whoami", (e) => {
        const { id, username, first_name, last_name } = e.from;
        return e.replyWithMarkdown(`Кто ты в телеграмме:
        *id* : ${id}
        *username* : ${username}
        *Имя* : ${first_name}
        *Фамилия* : ${last_name}`);
    });

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

            if (text === '/start') {
                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/88e/586/88e586f0-4299-313f-bedb-ef45c7710422/1.webp')
                return bot.sendMessage(chatId, ` привествую тебя  ${msg.from.first_name}!`);
            }
            if (text === '/whoIAm') {
                return
            }
            if (text === '/help') {
                return getHelp()
            }
            if (text === '/info') {
                return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
            }
            if (text === '/game') {
                return startGame(chatId);
            }
            if (text === '/sagarmut') {
                return bot.sendMessage(chatId, `Люблю тебя ${msg.from.first_name} ${msg.from.last_name}❤️ `);
            }
            return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!)');
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data == chats[chatId]) {
           return bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions);
        } else {
            return  bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions);
        }
    })
}

start()