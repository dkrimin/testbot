
const { describe, test, expect } = require('just');

describe('Тестирование команды /start', () => {
    test('Отправляет сообщение с доступными командами', async () => {
        const mockedCtx = {
            reply: jest.fn(),
        };

        await bot.handleUpdate({ message: { text: '/start' }, from: { id: 123 } }, mockedCtx);

        expect(mockedCtx.reply).toHaveBeenCalledWith('Привет! Я бот, который может помочь тебе с различными задачами. Вот список доступных команд: \n/auth - авторизация\n/registration - регистрация\n/help - помощь\n/randomnumber - случайное число от 1 до 100\n/squaresize - вычисление площади квадрата\n/cubevolume - вычисление объема куба\n/changepassword - смена пароля\n/birthdaydays - дни до дня рождения\n/coinflip - орел или решка\n/multiply - перемножение двух чисел\n/bmi - индекс массы тела');
    });
});

describe('Тестирование команды /auth', () => {
    test('Пользователь успешно авторизуется при правильном секрете', async () => {
        const mockedCtx = {
            from: { id: 123 },
            message: { text: '/auth key' },
            reply: jest.fn(),
        };

        await bot.handleUpdate({ message: { text: '/auth key' }, from: { id: 123 } }, mockedCtx);

        expect(bot.authorizedUsers.has(123)).toBe(true);
        expect(mockedCtx.reply).toHaveBeenCalledWith('Вы успешно авторизовались!');
    });


    
test('randomnumber command should return a random number between 1 and 100', () => {
    const ctx = Just.mockBot(bot);
    ctx.reply = jest.fn();
    bot.handleUpdate({ message: { text: '/randomnumber' } });
    expect(ctx.reply).toHaveBeenCalledWith(expect.stringMatching(/^Случайное число от 1 до 100: [1-9]?[0-9]$/));
  });
  
  test('squaresize command should calculate square area correctly', () => {
    const ctx = Just.mockBot(bot);
    ctx.reply = jest.fn();
    bot.handleUpdate({ message: { text: '/squaresize' } });
    const sideLength = 5;
    bot.handleUpdate({ message: { text: sideLength.toString() } });
    const squareArea = sideLength * sideLength;
    expect(ctx.reply).toHaveBeenCalledWith(`Площадь квадрата с длиной стороны ${sideLength} равна: ${squareArea}`);
  });
  
  test('cubevolume command should calculate cube volume correctly', () => {
    const ctx = Just.mockBot(bot);
    ctx.reply = jest.fn();
    bot.handleUpdate({ message: { text: '/cubevolume' } });
    const sideLength = 3;
    bot.handleUpdate({ message: { text: sideLength.toString() } });
    const cubeVolume = sideLength ** 3;
    expect(ctx.reply).toHaveBeenCalledWith(`Объём куба с длиной стороны ${sideLength} равен: ${cubeVolume}`);
  });
  
    test('Неправильный секрет при попытке авторизации', async () => {
        const mockedCtx = {
            from: { id: 123 },
            message: { text: '/auth wrong' },
            reply: jest.fn(),
        };

        await bot.handleUpdate({ message: { text: '/auth wrong' }, from: { id: 123 } }, mockedCtx);

        expect(bot.authorizedUsers.has(123)).toBe(false);
        expect(mockedCtx.reply).toHaveBeenCalledWith('Неправильный секрет. Попробуйте снова.');
    });
});




