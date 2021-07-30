const TelegramApi = require('node-telegram-bot-api')
const axios = require('axios');
const {gameOptions,againOptions} = require('./options')
const token = '1879567187:AAGkM-onFfRcbsaBiNZvgLexQVR32Zutz4E'
const yandex_api = 'AQVN3lf0ItFXeu-AqyUQPqeQVJ49c51ik27M34sj'
const debug = require('./helpers')
const fs = require('fs')
const bot = new TelegramApi(token, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
})

const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!`);
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}


bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/info', description: 'Получить информацию о пользователе'},
    {command: '/game', description: 'Игра угадай цифру'},
    {command: '/sagarmut', description: 'Нажми!'},
    {command: '/help', description: 'Показать справку!'},
    {command: '/hoh', description: 'гшршшршгршг'},
    {command: '/test', description: 'test'},
    {command: '/btn', description:  'Смотри что могу'},
    {command: '/pay', description: 'Оплата товара'},
    {command: '/clickmepls', description:'ДААВАЙ ЖМИ!'},

])

const start =  () => {

    bot.on('voice', (msg) => {
        const stream = bot.getFileStream(msg.voice.file_id);

        let chunks = [];

        stream.on('data', (chunk) => chukns.push(chunk));

        stream.on('end', () => {
            const axiosConfig = {
                method: 'POST',
                url: 'https://stt.api.cloud.yandex.net/speech/v1/stt:recognize',
                headers: {
                    Authorization: 'Api-Key' + yandex_api
                },
                data: Bufffer.concat(chunks),
            };
        })
        axios(axiosConfig)
            .then((response) => {
            console.log(response.data);
        })
            .catch((err) => {
                console.log("произоошла ошибка", err);
            })

    })


    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;



        const html = `
            <strong>hello, ${msg.from.first_name} ${msg.from.last_name}</strong>  
            <i>how are you doing ?</i>
            <strong>Creater</strong><pre>:fersko</pre>  `


       const inline_keyboard = [
           [
               {
                   text: 'Forward',
                   callback_data: 'forward'
               },
               {
                   text: 'Reply',
                   callback_data: 'reply'
               }
           ],
           [
               {
                   text: 'Edit',
                   callback_data: 'edit'
               },
               {
                   text: 'Delete',
                   callback_data: 'delete'
               }
           ]
       ]

        bot.on('callbavk_query', query => {

            const {chat, message_id,text} = query.message

            switch (query.data) {
                case 'forward':
                    bot.forwardMessage(chat.id, chat.id,message_id)
                    break
                case 'reply':
                    bot.sendMessage(chatId, `Отвечаем на сообщение `, {
                        reply_to_message_id: message_id
                    })
                    break
                case 'edit':
                    bot.editMessageText(`${text} (edited)`, {
                        chat_id:chat.id,
                        message_id:message_id,
                        reply_markup: {inline_keyboard}
                    })
                    break
            }

            bot.answerCallbackQuery({
                callback_query_id: query.id
            })
        })

        bot.onText(/\/btn/, (msg, [source, match]) => {
            bot.sendMessage(chatId, 'keyboard', {
                reply_markup: {
                    inline_keyboard
                }
            })
        })


        if (text === 'закрыть') {

            bot.sendMessage(chatId, 'Закрываю клавиатуру', {
                reply_markup: {
                    remove_keyboard: true
                }
            })

        }else if (text === 'ответить') {
            bot.sendMessage(chatId, 'Отвечаю на сообщение', {
                reply_markup: {
                    force_reply:true
                }
            })
        } else bot.onText(/\/test/,msg => {
            bot.sendMessage(chatId, '.', {
                reply_markup: {
                    keyboard: [
                        [{
                            text: 'Отправить местоположение ',
                            request_location: true
                        }],
                        ['ответить','закрыть'],
                        [{
                            text: 'отправить контакт',
                            request_contact: true
                        }]
                    ]
                }
            })
        })

        bot.onText(/\/pic/,msg => {

        })


            if (text === '/start') {
                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/88e/586/88e586f0-4299-313f-bedb-ef45c7710422/1.webp')
                return bot.sendMessage(chatId, ` привествую тебя  ${msg.from.first_name}!`);
            }
            if (text === '/hoh') {
                return bot.sendMessage(chatId, `hello!`)
            }
            if(text === 'hello') {
                return bot.sendMessage(chatId,html, {
                    parse_mode:'HTML'
                })
            }
            if (text ==='/clickmepls' ){
                return bot.sendMessage(chatId, `так так  ${msg.from.first_name}-мирная мне с тобой так повезло,Люблю тебя очень сильно ❤️`)
            }

            if ( text === 'Максим') {
                bot.sendPhoto(chatId, './mirror.png')
            }
            /*if (text === '/info') {
                return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}, а в  игре у тебя правильных ответов ${user.right}, неправильных ${user.wrong}`);

            }*/
            if (text === '/game') {
                return startGame(chatId);
            }
            if (text === '/sagarmut') {
                return bot.sendMessage(chatId, `Люблю тебя ${msg.from.first_name} ${msg.from.last_name}❤️ `);
            }else {
              //  return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!)');
            }


            /*bot.onText(/\/pay/, msg => {
                const chatId = msg.chat.id

                bot.sendInvoice(
                    chatId,
                    'audi A4',
                    'best car ever ',
                    'payload',
                    '401643678:TEST:19a69b50-5b5e-4b12-b2ab-b0444e60f0c8',
                    'SOME_RANDOM_START_KEY',
                    'RUB',
                    [
                        {
                            label:'koo',
                            amount: 100
                        }
                    ],
                    {
                        photo_url:'https://3dnews.ru/assets/external/illustrations/2019/12/04/999060/dims%20(3).jpg',
                        need_name:true
                    }

                )
            })*/





    })

    bot.on('callback_query', async msg => {
        const dataForGames = msg.data;
        const chatId = msg.chat.id;

        if (dataForGames === '/again') {
            return startGame(chatId)
        }
        if (dataForGames == chats[chatId]) {
           return bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions);
        } else if (dataForGames !== chats[chatId]){
            return  bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions);
        }
    })




    //401643678:TEST:19a69b50-5b5e-4b12-b2ab-b0444e60f0c8




}





start()



