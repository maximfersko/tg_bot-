const TelegramApi = require('node-telegram-bot-api');
const axios = require('axios');
const {
  gameOptions,
  againOptions
} = require('./options');
const token = '1879567187:AAGkM-onFfRcbsaBiNZvgLexQVR32Zutz4E';
const yandex_api = 'AQVN1bBJ5Q-Jkp4rcwbZPMWkenuQ4AOBZ_VGkSrz';
/*const IAM = '-----BEGIN PRIVATE KEY-----\n' +
    'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC5xosBeDUcRlfx\n' +
    'fHWZjgtuWTZfjuyagd8I87LgLE0D8g2ymLZLFmNHA4MmzOuNmpmQEQNv6k91g1/w\n' +
    'Nzta6d4glXG7bEgs+Ahc8on4Gha5wew4oG2PSoO2tqJgZv75jclPqAawKRI2NyQo\n' +
    'uO+/+GnbZFYUxKlZmNvJWgS3e/mjf+ARzEaE7xkPaxFVcLX0050tYkCOxbKAUmZ5\n' +
    'KJ9PsUshvZ23hh34KlsTtyCCzVXSOoLEzxdkxkN9SLKRzS9RF8ckE3JG6vAEHRGW\n' +
    'cV4yyaqfOBSgDRp4o1ml7htb5zgWfZdv9Lg6LwDmTrPq19c13odNulV6oRAokU92\n' +
    'efa0SVmzAgMBAAECggEAV+T+2YglIKaLbz6iaS9SazgcSKPXf9aYTqT2aaesHITG\n' +
    'REyKWwZRnESmJZJolAukQgw6oxWp2IB6wK1xELd7l9D9CV7W2yfS1R8Pdenp/KMq\n' +
    'fzQwAc6QeL76HkA8vJd/uodV+rzD2BDIs9ej3yDJ/LoBHDxbn3955U8I0kL+voKv\n' +
    'WLq43cVuJNeWRunGXquXYnmuKe8Q7G9Y2715EugM0sUqMMS3iqdSYr6AmtUqWstn\n' +
    'iAR/3UF3KCKlHJA9kECFqGxDkLeJFxSyzQcxVUHUP4viY9p5mJ2w8srtGFQ0Ya5c\n' +
    'W/HZ4tGVaxLmwvQ6RbDA90Pb1Dgg5WzDJX56nH6riQKBgQDypBtMN6g1rPmqVFud\n' +
    'ycvy6o0x/6dJL6B3GlWeHTGh2wO3djkxMZIMauqTnukjztCyx9zdImuqk0E5LZ/t\n' +
    'SMVam+8aNvKomsnJm6Z9M+M98zWpqapJUTVCglfy9t8ARTVaAJITn3VEi9KuNYrX\n' +
    'V+BsJspkxSX6Smq1j20nW1Y35wKBgQDEAPLGVVDlO0+RRZeIIo806CmBF53dECEc\n' +
    'UQJF4KERa+VLWlFKNUdYvVmBbYYuMwVECKMAho4+pOjw0uO4CuWuqheUez3ns1Gy\n' +
    'a7zEHJ7+9d5KCfRN1qHrDAIEiS77uLjcyzNnBBAAudMNYSEAFR55I/mIf54hzTp4\n' +
    'GXtkgy+mVQKBgQC56tSfyeWxeyCySoEInh8PunkF3oYnpb6mhB8mT+g/xLlMUeHw\n' +
    't7LYoPOsuQ6ayVVQJ6QsLLuir8JCNZtdDW1qyCClTYURe8kyGXmwZZmxVjHAFqjM\n' +
    'FNViaM1K9a5ZXq5KkDVdo8kPBLQhmBUSe9sSA4cBP66h4XNyOrvAdFPT8QKBgQC9\n' +
    '+K1Vzhs6EuJryyezqstiXCLeHCXFvXxaFao+UBnM6Oa0wjVH15vvRpcZ+y2yWYEh\n' +
    'D73tJH15+hxMThqopuc3A2UXZNv7VrI4XHP5IER6mZN572v6ha0qQ9kwzEXddIy4\n' +
    'c7q+fhGEopcMwLdbfRysDVIuGoMKAABLp2cRZJUqgQKBgBR+E4W/M9BN69v2yb73\n' +
    'HmliukA73koa3hO5nG9L1ENosfqBAGuCqXlOYOvOJvKBih+oRwIqpr+BrO9XX0KB\n' +
    'oicLMASHldob+WCBLjjzzDYKq/h93IRwmWzC6M/nBT2mY0yDnkKnO84tm6go0tlp\n' +
    'hqWLm4f8lI1vMISKV1fNdlYc\n' +
    '-----END PRIVATE KEY-----'*/
const debug = require('./helpers');
const fs = require('fs');
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


bot.setMyCommands([{
    command: '/start',
    description: 'Начальное приветствие'
  },
  {
    command: '/info',
    description: 'Получить информацию о пользователе'
  },
  {
    command: '/game',
    description: 'Игра угадай цифру'
  },
  {
    command: '/sagarmut',
    description: 'Нажми!'
  },
  {
    command: '/help',
    description: 'Показать справку!'
  },
  {
    command: '/hoh',
    description: 'гшршшршгршг'
  },
  {
    command: '/test',
    description: 'test'
  },
  {
    command: '/btn',
    description: 'Смотри что могу'
  },
  {
    command: '/pay',
    description: 'Оплата товара'
  },
  {
    command: '/clickmepls',
    description: 'ДААВАЙ ЖМИ!'
  },

])

const start = () => {

  bot.on('voice', (msg) => {
    const stream = bot.getFileStream(msg.voice.file_id);

    let chunks = [];

    stream.on('data', (chunk) => chunks.push(chunk));

    stream.on('end', () => {
      const axiosConfig = {
        method: 'POST',
        url: 'https://stt.api.cloud.yandex.net/speech/v1/stt:recognize',
        headers: {
          Authorization: 'Api-Key' + yandex_api,
        },
        data: Buffer.concat(chunks),
      };
      axios(axiosConfig).then((response) => {
        const command = response.data.result;
        if (command === "Привет") {
          console.log('jj')
        }
      }).catch((err) => {
        console.log("произоошла ошибка", err);
      })

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
      [{
          text: 'Forward',
          callback_data: 'forward'
        },
        {
          text: 'Reply',
          callback_data: 'reply'
        }
      ],
      [{
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

      const {
        chat,
        message_id,
        text
      } = query.message

      switch (query.data) {
        case 'forward':
          bot.forwardMessage(chat.id, chat.id, message_id)
          break
        case 'reply':
          bot.sendMessage(chatId, `Отвечаем на сообщение `, {
            reply_to_message_id: message_id
          })
          break
        case 'edit':
          bot.editMessageText(`${text} (edited)`, {
            chat_id: chat.id,
            message_id: message_id,
            reply_markup: {
              inline_keyboard
            }
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

    } else if (text === 'ответить') {
      bot.sendMessage(chatId, 'Отвечаю на сообщение', {
        reply_markup: {
          force_reply: true
        }
      })
    } else bot.onText(/\/test/, msg => {
      bot.sendMessage(chatId, '.', {
        reply_markup: {
          keyboard: [
            [{
              text: 'Отправить местоположение ',
              request_location: true
            }],
            ['ответить', 'закрыть'],
            [{
              text: 'отправить контакт',
              request_contact: true
            }]
          ]
        }
      })
    })

    bot.onText(/\/pic/, msg => {

    })


    if (text === '/start') {
      await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/88e/586/88e586f0-4299-313f-bedb-ef45c7710422/1.webp')
      return bot.sendMessage(chatId, ` привествую тебя  ${msg.from.first_name}!`);
    }
    if (text === '/hoh') {
      return bot.sendMessage(chatId, `hello!`)
    }
    if (text === 'hello') {
      return bot.sendMessage(chatId, html, {
        parse_mode: 'HTML'
      })
    }
    if (text === '/clickmepls') {
      return bot.sendMessage(chatId, `так так  ${msg.from.first_name}-мирная мне с тобой так повезло,Люблю тебя очень сильно ❤️`)
    }

    if (text === 'Максим') {
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
    } else {
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

  /*bot.on('callback_query', async msg => {
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
  })*/

  //401643678:TEST:19a69b50-5b5e-4b12-b2ab-b0444e60f0c8
}

start()