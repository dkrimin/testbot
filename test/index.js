
const { Telegraf } = require('telegraf');
const bot = new Telegraf('6923245784:AAEtAXiKiFPQcGfPJlMqxVomDtSACT0QMxc');

// Хранилище состояний авторизации пользователей
const authorizedUsers = new Set();

// Обработчик команды /start
bot.start((ctx) => {
    ctx.reply('Привет! Я бот, который может помочь тебе с различными задачами. Вот список доступных команд: \n/auth - авторизация\n/registration - регистрация\n/help - помощь\n/randomnumber - случайное число от 1 до 100\n/squaresize - вычисление площади квадрата\n/cubevolume - вычисление объема куба\n/changepassword - смена пароля\n/birthdaydays - дни до дня рождения\n/coinflip - орел или решка\n/multiply - перемножение двух чисел\n/bmi - индекс массы тела');
});

// Обработчик команды /auth
bot.command('auth', (ctx) => {
    const [command, secret] = ctx.message.text.split(' ');
    if (secret === 'key') {
        authorizedUsers.add(ctx.from.id);
        ctx.reply('Вы успешно авторизовались!');
    } else {
        ctx.reply('Неправильный секрет. Попробуйте снова.');
    }
});

// Обработчик команды /help
bot.command('help', (ctx) => ctx.reply('Список доступных команд: \n/auth - авторизация\n/help - помощь\n/randomnumber - случайное число от 1 до 100\n/squaresize - вычисление площади квадрата\n/cubevolume - вычисление объема куба\n/coinflip - орел или решка\n/circlearea- площадь круга\n/bmi - индекс массы тела'));

// Функция проверки авторизации
function checkAuthorization(ctx, next) {
    if (authorizedUsers.has(ctx.from.id)) {
        return next();
    } else {
        return ctx.reply('Вы не авторизованы. Пожалуйста, выполните команду авторизации /auth <ключ>.');
    }
}

// Обработчик команды /randomnumber
bot.command('randomnumber', checkAuthorization, (ctx) => {
    ctx.reply(`Случайное число от 1 до 100: ${Math.floor(Math.random() * 100) + 1}`);
});

// Обработчик команды /squaresize
bot.command('squaresize', checkAuthorization, (ctx) => {
    ctx.reply('Введите длину стороны квадрата:');
    bot.hears(/[0-9]+/, (ctx) => {
        const sideLength = parseFloat(ctx.message.text);
        const squareArea = sideLength * sideLength;
        ctx.reply(`Площадь квадрата с длиной стороны ${sideLength} равна: ${squareArea}`);
    });
});

// Обработчик команды /cubevolume
bot.command('cubevolume', checkAuthorization, (ctx) => {
    ctx.reply('Введите длину стороны куба:');
    bot.hears(/[0-9]+/, (ctx) => {
        const sideLength = parseFloat(ctx.message.text);
        const cubeVolume = sideLength ** 3;
        ctx.reply(`Объём куба с длиной стороны ${sideLength} равен: ${cubeVolume}`);
    });
});

// Обработчик команды /coinflip
bot.command('coinflip', checkAuthorization, (ctx) => {
    const result = Math.random() < 0.5 ? 'Орел' : 'Решка';
    ctx.reply(`Выпало: ${result}`);
});

// Обработчик команды /circlearea
bot.command('circlearea', checkAuthorization, (ctx) => {
    ctx.reply('Введите радиус круга:');
    bot.hears(/[0-9]+/, (ctx) => {
        const radius = parseFloat(ctx.message.text);
        const circleArea = Math.PI * radius * radius;
        ctx.reply(`Площадь круга с радиусом ${radius} равна: ${circleArea.toFixed(2)}`);
    });
});

// Обработчик команды /bmi
bot.command('bmi', checkAuthorization, (ctx) => {
    const [weight, height] = ctx.message.text.split(' ').slice(1).map(Number);
    const bmi = weight / ((height / 100) ** 2);
    ctx.reply(`Ваш индекс массы тела: ${bmi.toFixed(2)}`);
});

// Запуск бота
bot.launch();
