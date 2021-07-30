const start = async () => {

    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (e) {
        console.log('Подключение к бд сломалось', e)
    }

    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра угадай цифру'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        try {
            if (text === '/start') {
                await UserModel.create({chatId})
                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
                return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот автора ютуб канала ULBI TV`);
            }
            if (text === '/info') {
                const user = await UserModel.findOne({chatId})
                return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}, в игре у тебя правильных ответов ${user.right}, неправильных ${user.wrong}`);
            }
            if (text === '/game') {
                return startGame(chatId);
            }
            return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!)');
        } catch (e) {
            return bot.sendMessage(chatId, 'Произошла какая то ошибочка!)');
        }

    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        const user = await UserModel.findOne({chatId})
        if (data == chats[chatId]) {
            user.right += 1;
            await bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions);
        } else {
            user.wrong += 1;
            await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions);
        }
        await user.save();
    })
}

start()





const bot = new TelegramApi(token, {polling:true})

const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{$text: '1', callback_data: '1'},{$text: '1', callback_data: '1'},{$text: '1', callback_data: '1'}],
            [{$text: '2', callback_data: '2'},{$text: '1', callback_data: '1'},{$text: '1', callback_data: '1'}],
            [{$text: '3', callback_data: '3'},{$text: '1', callback_data: '1'},{$text: '1', callback_data: '1'}],
            [{$text: '4', callback_data: '4'}],
        ]
    })
}

const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{$text: 'Играть еще раз ', callback_data: '/again'}]
        ]
    })
}

const startGame = async (chatId) => {
    await  bot.sendMessage(chatId,`Сейчас я загадаю цифру от 1 до 9 , а ты должен ее угадать !`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай число ', gameOptions)
}

const start = async () => {

    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (e) {
        console.log('Подключение к бд сломалось', e)
    }

    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра угадай цифру'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        try {
            if (text === '/start') {
                await UserModel.create({chatId})
                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
                return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот автора ютуб канала ULBI TV`);
            }
            if (text === '/info') {
                const user = await UserModel.findOne({chatId})
                return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}, в игре у тебя правильных ответов ${user.right}, неправильных ${user.wrong}`);
            }
            if (text === '/game') {
                return startGame(chatId);
            }
            return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!)');
        } catch (e) {
            return bot.sendMessage(chatId, 'Произошла какая то ошибочка!)');
        }

    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        const user = await UserModel.findOne({chatId})
        if (data == chats[chatId]) {
            user.right += 1;
            await bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions);
        } else {
            user.wrong += 1;
            await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions);
        }
        await user.save();
    })
}

const start = () => {
    bot.setMyCommands([
        {command:'/start', description:'Начальное приветвие'},
        {command:'/info', description:'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра угадать цифру '}
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId =msg.chat.id;

        if(text === '/start') {
            return  bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/6f9/bf3/6f9bf3ed-544f-37cf-b3e1-1779eccbf3d2/2.webp')
            return  bot.sendMessage(chatId, `Ты написал мне ${text}`)
        }
        if(text === '/info') {
            return  bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if(text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще !')

    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId);
        }
        if(data === chats[chatId]) {
            return  bot.sendMessage(chatId, `Поздравляю ты отгадал цифру ${chats[chatId]}`, againOptions)
        }else {
            return  bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions)
        }

    })

}

start()









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



/*  bot.onText(/\/inlineTab/,msg => {
            bot.sendMessage(chatId, 'inline keyboard', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Google',
                                url: 'https://google.com'
                            }
                        ],
                        [
                            {
                                text:'Reply',
                                callback_data: 'reply'
                            }
                        ],
                        [
                            {
                                text:'Forward',
                                callback_data: 'forward'
                            }
                        ]
                    ]
                }
            })

             bot.on('callback_query', query => {
                 //bot.sendMessage(query.message.chat.id, debug(query))

                 //bot.answerCallbackQuery(query.id, `${query.data}`)
             })
        })*/




/*bot.on('inline_query', query =>{

           const results = []

           for(let i = 0;i < 5; i++){
               results.push({
                   type:'article',
                   id: i.toString(),
                   title: 'Title' + i,
                   input_message_content: {
                       message_text: `Article #${i+1}`
                   }
               })
           }

           bot.answerInlineQuery(query.id, results, {
               cache_time: 0
           })
       })*/
