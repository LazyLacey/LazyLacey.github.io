// Данные грамматики для испанского языка.
// Загружается динамически через import() в init() — должен писать на window.

window.grammarTopics = [
  // ─────────────────────────────────────────────
  // 1. АРТИКЛИ И РОД
  // ─────────────────────────────────────────────
  {
    id: 'articles',
    title: 'Артикли и род',
    icon: '🏷️',
    description: 'Два рода, определённый и неопределённый артикль, согласование с существительным',
    sections: [
      {
        id: 'articles-gender',
        title: 'Два рода',
        body: 'В испанском два рода: мужской (masculino) и женский (femenino). Род влияет на форму артикля и прилагательного.\n\nОсновные правила:\n— Слова на -o обычно мужского рода: libro (книга), vaso (стакан)\n— Слова на -a обычно женского рода: mesa (стол), casa (дом)\n— Слова на -ión, -dad, -tad, -tud женского рода: nación, ciudad, libertad\n— Исключения: el día (день), el mapa (карта), el problema (проблема) — мужской, хотя на -a; la mano (рука) — женский, хотя на -o',
        table: {
          headers: ['Род', 'Окончание', 'Примеры'],
          rows: [
            ['мужской', '-o', 'libro, banco, vino'],
            ['женский', '-a', 'casa, mesa, luna'],
            ['женский', '-ión, -dad', 'canción, ciudad'],
            ['исключения (м.р.)', '-a', 'día, mapa, problema, tema'],
          ],
        },
        examples: [
          { ro: 'el libro', ru: 'книга (м.р.)', note: 'определённый артикль el' },
          { ro: 'la casa', ru: 'дом (ж.р.)', note: 'определённый артикль la' },
          { ro: 'el día', ru: 'день (м.р.)', note: 'исключение — на -a, но мужской' },
          { ro: 'la mano', ru: 'рука (ж.р.)', note: 'исключение — на -o, но женский' },
          { ro: 'la nación, la ciudad, la libertad', ru: 'нация, город, свобода', note: 'суффиксы -ión/-dad → ж.р.' },
          { ro: 'el tema, el problema, el mapa', ru: 'тема, проблема, карта — м.р., хотя на -a', note: 'греческого происхождения' },
        ],
      },
      {
        id: 'articles-definite',
        title: 'Определённый артикль',
        body: 'Определённый артикль (аналог русского «этот/тот») согласуется с существительным в роде и числе.',
        table: {
          headers: ['', 'Единственное', 'Множественное'],
          rows: [
            ['Мужской', 'el', 'los'],
            ['Женский', 'la', 'las'],
          ],
        },
        examples: [
          { ro: 'el chico', ru: 'мальчик' },
          { ro: 'la chica', ru: 'девочка' },
          { ro: 'los chicos', ru: 'мальчики (или смешанная группа)' },
          { ro: 'las chicas', ru: 'девочки' },
          { ro: 'Voy al trabajo', ru: 'Иду на работу', note: 'a + el = al (слияние)' },
          { ro: 'Vengo del médico', ru: 'Иду от врача', note: 'de + el = del (слияние)' },
        ],
      },
      {
        id: 'articles-indefinite',
        title: 'Неопределённый артикль',
        body: 'Неопределённый артикль используется при первом упоминании или когда речь идёт о неконкретном предмете.',
        table: {
          headers: ['', 'Единственное', 'Множественное'],
          rows: [
            ['Мужской', 'un', 'unos'],
            ['Женский', 'una', 'unas'],
          ],
        },
        examples: [
          { ro: 'un libro', ru: 'какая-то книга / одна книга' },
          { ro: 'una mesa', ru: 'какой-то стол / один стол' },
          { ro: 'unos amigos', ru: 'несколько друзей' },
          { ro: 'unas flores', ru: 'несколько цветков' },
          { ro: 'Tengo un perro y una gata', ru: 'У меня есть собака и кошка' },
          { ro: 'Hay unos problemas que resolver', ru: 'Есть некоторые проблемы для решения', note: 'unos/unas = «некоторые»' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. СУЩЕСТВИТЕЛЬНЫЕ
  // ─────────────────────────────────────────────
  {
    id: 'nouns',
    title: 'Существительные',
    icon: '📦',
    description: 'Образование множественного числа, изменение рода',
    sections: [
      {
        id: 'nouns-plural',
        title: 'Множественное число',
        body: 'Правила образования множественного числа:\n— Слова на гласную + s: libro → libros, casa → casas\n— Слова на согласную + es: ciudad → ciudades, color → colores\n— Слова на -z → -ces: lápiz → lápices, voz → voces\n— Слова на ударную гласную + es: rubí → rubíes',
        table: {
          headers: ['Окончание', 'Правило', 'Пример'],
          rows: [
            ['гласная', '+ s', 'libro → libros'],
            ['согласная', '+ es', 'color → colores'],
            ['-z', '→ -ces', 'lápiz → lápices'],
            ['-s (без ударения)', 'не изменяется', 'el lunes → los lunes'],
          ],
        },
        examples: [
          { ro: 'el libro → los libros', ru: 'книга → книги' },
          { ro: 'la ciudad → las ciudades', ru: 'город → города' },
          { ro: 'el lápiz → los lápices', ru: 'карандаш → карандаши' },
          { ro: 'el lunes → los lunes', ru: 'понедельник → понедельники' },
          { ro: 'el actor → los actores', ru: 'актёр → актёры' },
          { ro: 'el joven → los jóvenes', ru: 'молодой человек → молодые люди', note: 'согласная → +es' },
        ],
      },
      {
        id: 'nouns-gender-change',
        title: 'Изменение рода',
        body: 'Многие существительные образуют форму женского рода от мужской:\n— -o → -a: amigo → amiga\n— согласная → согласная + a: profesor → profesora\n— Некоторые слова меняются полностью: el hombre → la mujer',
        examples: [
          { ro: 'el amigo / la amiga', ru: 'друг / подруга' },
          { ro: 'el profesor / la profesora', ru: 'учитель / учительница' },
          { ro: 'el actor / la actriz', ru: 'актёр / актриса' },
          { ro: 'el hombre / la mujer', ru: 'мужчина / женщина' },
          { ro: 'el rey / la reina', ru: 'король / королева', note: 'суффикс -ina' },
          { ro: 'el niño / la niña', ru: 'мальчик / девочка' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. ПРИЛАГАТЕЛЬНЫЕ
  // ─────────────────────────────────────────────
  {
    id: 'adjectives',
    title: 'Прилагательные',
    icon: '🎨',
    description: 'Согласование с существительным, место в предложении, степени сравнения',
    sections: [
      {
        id: 'adjectives-agreement',
        title: 'Согласование с существительным',
        body: 'Прилагательное согласуется с существительным в роде и числе.\n— Прилагательные на -o имеют 4 формы: -o, -a, -os, -as\n— Прилагательные на -e или согласную имеют 2 формы (только по числу)',
        table: {
          headers: ['', 'Ед. муж.', 'Ед. жен.', 'Мн. муж.', 'Мн. жен.'],
          rows: [
            ['alto (высокий)', 'alto', 'alta', 'altos', 'altas'],
            ['grande (большой)', 'grande', 'grande', 'grandes', 'grandes'],
            ['azul (синий)', 'azul', 'azul', 'azules', 'azules'],
          ],
        },
        examples: [
          { ro: 'un chico alto', ru: 'высокий мальчик' },
          { ro: 'una chica alta', ru: 'высокая девочка' },
          { ro: 'un coche grande', ru: 'большая машина' },
          { ro: 'una casa grande', ru: 'большой дом' },
          { ro: 'unos chicos altos', ru: 'высокие мальчики' },
          { ro: 'unas chicas inteligentes', ru: 'умные девочки', note: 'inteligente — форма только по числу' },
        ],
      },
      {
        id: 'adjectives-position',
        title: 'Место прилагательного',
        body: 'В испанском прилагательное обычно стоит ПОСЛЕ существительного. Перед существительным стоят прилагательные, выражающие субъективную оценку, а также bueno/malo/grande перед существительным сокращаются.',
        table: {
          headers: ['Полная форма', 'Краткая (перед сущ.)', 'Значение'],
          rows: [
            ['bueno', 'buen', 'хороший'],
            ['malo', 'mal', 'плохой'],
            ['grande', 'gran', 'великий (перед сущ.)'],
            ['primero', 'primer', 'первый'],
          ],
        },
        examples: [
          { ro: 'un coche rojo', ru: 'красная машина', note: 'прилагательное после' },
          { ro: 'un buen amigo', ru: 'хороший друг', note: 'buen перед существительным' },
          { ro: 'un gran hombre', ru: 'великий человек', note: 'gran = великий' },
          { ro: 'un hombre grande', ru: 'большой/высокий мужчина', note: 'grande после = физически большой' },
          { ro: 'el mal tiempo', ru: 'плохая погода', note: 'malo → mal перед сущ.' },
          { ro: 'un viejo amigo / un amigo viejo', ru: 'давний друг / старый (пожилой) друг', note: 'место прилагательного меняет смысл' },
        ],
      },
      {
        id: 'adjectives-comparison',
        title: 'Степени сравнения',
        body: 'Сравнительная степень: más + прилагательное + que (más alto que — выше, чем)\nПревосходная степень: el/la más + прилагательное (el más alto — самый высокий)\nНеправильные формы: bueno → mejor, malo → peor, grande → mayor, pequeño → menor',
        examples: [
          { ro: 'más alto que', ru: 'выше, чем' },
          { ro: 'tan alto como', ru: 'такой же высокий, как' },
          { ro: 'el más alto de la clase', ru: 'самый высокий в классе' },
          { ro: 'mejor / peor', ru: 'лучше / хуже' },
          { ro: 'mayor / menor', ru: 'старше / младше (о возрасте)' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. МЕСТОИМЕНИЯ
  // ─────────────────────────────────────────────
  {
    id: 'pronouns',
    title: 'Местоимения',
    icon: '👤',
    description: 'Личные местоимения, особенности употребления',
    sections: [
      {
        id: 'pronouns-subject',
        title: 'Личные местоимения (подлежащее)',
        body: 'Испанский — язык с нулевым подлежащим (pro-drop): личное местоимение часто опускается, так как окончание глагола указывает на лицо. Местоимения используют для выделения или при необходимости уточнения.',
        table: {
          headers: ['Лицо', 'Единственное', 'Множественное'],
          rows: [
            ['1-е', 'yo (я)', 'nosotros/nosotras (мы)'],
            ['2-е', 'tú (ты)', 'vosotros/vosotras (вы, разг.) / ustedes (вы, форм.)'],
            ['3-е', 'él (он) / ella (она) / usted (Вы)', 'ellos/ellas / ustedes'],
          ],
        },
        examples: [
          { ro: 'Hablo español', ru: 'Я говорю по-испански', note: 'yo опускается' },
          { ro: 'Yo hablo, tú escuchas', ru: 'Я говорю, ты слушаешь', note: 'местоимения для контраста' },
          { ro: 'usted / ustedes', ru: 'вежливое «вы» (единственное и множественное)', note: 'в Латинской Америке ustedes = vosotros' },
          { ro: 'Ella es profesora', ru: 'Она учительница' },
          { ro: '¿Y vosotros, qué hacéis?', ru: 'А вы что делаете?', note: 'vosotros — только в Испании' },
          { ro: '¿Hablan ustedes inglés?', ru: 'Вы говорите по-английски?', note: 'usted/ustedes — вежливо' },
        ],
      },
      {
        id: 'pronouns-possessive',
        title: 'Притяжательные местоимения',
        body: 'Краткая форма (перед существительным) не изменяется по роду: mi libro, mi casa. Полная форма (после существительного или самостоятельно) согласуется с родом и числом: el mío, la mía.',
        table: {
          headers: ['Владелец', 'Краткая (перед сущ.)', 'Полная форма', 'Перевод'],
          rows: [
            ['yo', 'mi / mis', 'mío/mía/míos/mías', 'мой'],
            ['tú', 'tu / tus', 'tuyo/tuya/tuyos/tuyas', 'твой'],
            ['él/ella/usted', 'su / sus', 'suyo/suya/suyos/suyas', 'его/её/Ваш'],
            ['nosotros', 'nuestro/a, nuestros/as', 'nuestro/a/os/as', 'наш'],
            ['vosotros', 'vuestro/a, vuestros/as', 'vuestro/a/os/as', 'ваш'],
            ['ellos/ellas', 'su / sus', 'suyo/suya/suyos/suyas', 'их'],
          ],
        },
        examples: [
          { ro: 'mi libro / mis libros', ru: 'моя книга / мои книги', note: 'краткая форма не меняется по роду' },
          { ro: 'nuestra casa', ru: 'наш дом', note: 'nuestro согласуется' },
          { ro: 'El libro es mío', ru: 'Книга — моя', note: 'полная форма — самостоятельно' },
          { ro: '¿Es tuyo este bolígrafo?', ru: 'Эта ручка твоя?' },
          { ro: 'Los míos son mejores', ru: 'Мои (штуки) лучше' },
          { ro: 'un amigo suyo', ru: 'его/её друг', note: 'suyo после существительного' },
        ],
      },
      {
        id: 'pronouns-demonstrative',
        title: 'Указательные местоимения',
        body: 'Три степени удалённости: este (этот — близко), ese (тот — немного дальше), aquel (тот вон — далеко). Согласуются с родом и числом.',
        table: {
          headers: ['', 'М.р. ед.', 'Ж.р. ед.', 'М.р. мн.', 'Ж.р. мн.'],
          rows: [
            ['близко (этот)', 'este', 'esta', 'estos', 'estas'],
            ['средне (тот)', 'ese', 'esa', 'esos', 'esas'],
            ['далеко (тот вон)', 'aquel', 'aquella', 'aquellos', 'aquellas'],
          ],
        },
        examples: [
          { ro: 'este libro / esta silla', ru: 'эта книга / этот стул', note: 'близко' },
          { ro: 'ese chico de allí', ru: 'вон тот парень', note: 'немного дальше' },
          { ro: 'aquellas montañas', ru: 'те горы вон там', note: 'далеко' },
          { ro: '¿Quieres este o ese?', ru: 'Хочешь этот или вот тот?' },
          { ro: 'Aquella época era diferente', ru: 'То время было другим', note: 'aquel/aquella в переносном смысле' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. SER И ESTAR
  // ─────────────────────────────────────────────
  {
    id: 'ser-estar',
    title: 'Ser и Estar',
    icon: '⚖️',
    description: 'Два глагола «быть»: ser — идентичность и определение, estar — состояние и расположение',
    sections: [
      {
        id: 'ser-uses',
        title: 'Ser — определение и идентичность',
        body: 'Ser описывает то, чем является предмет или человек по сути — определение, идентичность, категория:\n— Происхождение, национальность, материал\n— Профессия, принадлежность к группе\n— Принадлежность (чей?)\n— Время и дата\n— Место проведения события (не физического предмета!)\n— Пассивный залог (ser + причастие)\n\nВажно: события привязаны к месту через ser: La boda es en la iglesia.',
        examples: [
          { ro: 'Soy ruso', ru: 'Я русский', note: 'национальность' },
          { ro: 'Ella es médica', ru: 'Она врач', note: 'профессия' },
          { ro: 'Este libro es de Ana', ru: 'Эта книга Аны', note: 'принадлежность' },
          { ro: 'Son las tres', ru: 'Сейчас три часа', note: 'время' },
          { ro: 'La fiesta es en mi casa', ru: 'Вечеринка у меня дома', note: 'место события — ser!' },
          { ro: 'El concierto es a las ocho', ru: 'Концерт в восемь часов', note: 'событие — ser' },
        ],
      },
      {
        id: 'estar-uses',
        title: 'Estar — состояние и расположение',
        body: 'Estar описывает состояние, в котором находится предмет или человек, а также физическое расположение:\n— Состояние здоровья, настроение, ощущения\n— Физическое местонахождение (где именно находится?)\n— Прогрессивное время: estar + gerundio (действие прямо сейчас)\n— Результат действия (причастие как прилагательное)\n\nПравило: если можно спросить «как ты себя чувствуешь?» — вероятно, нужен estar.',
        examples: [
          { ro: 'Estoy cansado', ru: 'Я устал', note: 'состояние' },
          { ro: 'Estamos en Madrid', ru: 'Мы в Мадриде', note: 'местонахождение физического лица/предмета' },
          { ro: 'Está comiendo', ru: 'Он сейчас ест', note: 'estar + gerundio' },
          { ro: 'La puerta está abierta', ru: 'Дверь открыта', note: 'результат действия' },
          { ro: 'El libro está en la mesa', ru: 'Книга на столе', note: 'физическое расположение предмета' },
        ],
      },
      {
        id: 'ser-estar-conjugation',
        title: 'Спряжение ser и estar в настоящем времени',
        body: 'Оба глагола полностью нерегулярны в настоящем времени. Важно знать все формы наизусть — они используются в большинстве испанских предложений.',
        table: {
          headers: ['Лицо', 'ser (быть/являться)', 'estar (быть/находиться)'],
          rows: [
            ['yo', 'soy', 'estoy'],
            ['tú', 'eres', 'estás'],
            ['él/ella/usted', 'es', 'está'],
            ['nosotros', 'somos', 'estamos'],
            ['vosotros', 'sois', 'estáis'],
            ['ellos/ustedes', 'son', 'están'],
          ],
        },
        examples: [
          { ro: 'Soy de Rusia / Estoy en Rusia', ru: 'Я из России / Я нахожусь в России', note: 'ser = откуда, estar = где сейчас' },
          { ro: 'Es médico / Está cansado', ru: 'Он врач / Он устал', note: 'ser = профессия, estar = состояние' },
          { ro: 'Somos estudiantes', ru: 'Мы студенты' },
          { ro: '¿Estáis listos?', ru: 'Вы готовы?' },
          { ro: 'Son las tres', ru: 'Три часа', note: 'ser для обозначения времени' },
          { ro: 'Estoy de acuerdo', ru: 'Я согласен', note: 'estar de acuerdo — устойчивое выражение' },
        ],
      },
      {
        id: 'ser-estar-difference',
        title: 'Разница в значении одних и тех же прилагательных',
        body: 'Ряд прилагательных меняет смысл в зависимости от ser или estar. Ser = устойчивая характеристика человека или вещи; estar = текущее состояние, ощущение.',
        table: {
          headers: ['Прилагательное', 'С ser (характеристика)', 'С estar (состояние)'],
          rows: [
            ['listo', 'умный — Es listo', 'готов — Está listo'],
            ['malo', 'злой/плохой — Es malo', 'болен/нехорошо — Está malo'],
            ['bueno', 'добрый/хороший — Es bueno', 'вкусный/в форме — Está bueno'],
            ['aburrido', 'скучный человек — Es aburrido', 'ему скучно — Está aburrido'],
            ['seguro', 'безопасный — Es seguro', 'уверен — Está seguro'],
            ['rico', 'богатый — Es rico', 'вкусный — Está rico'],
          ],
        },
        examples: [
          { ro: 'Es malo', ru: 'Он злой (по характеру)' },
          { ro: 'Está malo', ru: 'Он болен / плохо себя чувствует' },
          { ro: 'Es listo', ru: 'Он умный' },
          { ro: 'Está listo', ru: 'Он готов' },
          { ro: 'El pastel está rico', ru: 'Пирог вкусный', note: 'rico + estar = вкусный на вкус' },
          { ro: 'Es un hombre rico', ru: 'Он богатый человек', note: 'rico + ser = богатый' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. PRESENTE DE INDICATIVO
  // ─────────────────────────────────────────────
  {
    id: 'presente',
    title: 'Presente de Indicativo',
    icon: '⏱️',
    description: 'Настоящее время — регулярные и нерегулярные глаголы',
    sections: [
      {
        id: 'presente-regular',
        title: 'Правильные глаголы',
        body: 'Три типа спряжения: -ar, -er, -ir. Убираем окончание инфинитива и добавляем личные окончания.',
        table: {
          headers: ['Лицо', '-ar (hablar)', '-er (comer)', '-ir (vivir)'],
          rows: [
            ['yo', 'hablo', 'como', 'vivo'],
            ['tú', 'hablas', 'comes', 'vives'],
            ['él/ella', 'habla', 'come', 'vive'],
            ['nosotros', 'hablamos', 'comemos', 'vivimos'],
            ['vosotros', 'habláis', 'coméis', 'vivís'],
            ['ellos/ellas', 'hablan', 'comen', 'viven'],
          ],
        },
        examples: [
          { ro: 'Hablo español todos los días', ru: 'Я говорю по-испански каждый день' },
          { ro: 'Comes mucho', ru: 'Ты много ешь' },
          { ro: 'Vivimos en Madrid', ru: 'Мы живём в Мадриде' },
          { ro: '¿A qué hora trabajas?', ru: 'В котором часу ты работаешь?' },
          { ro: 'Ella estudia medicina', ru: 'Она учится на врача' },
          { ro: 'Bebemos agua', ru: 'Мы пьём воду' },
        ],
      },
      {
        id: 'presente-irregular',
        title: 'Неправильные глаголы',
        body: 'Глаголы ser, estar, ir, tener, hacer, venir полностью нерегулярны — каждый имеет уникальные формы, которые не выводятся из инфинитива. Все они относятся к самым частотным в языке, без них невозможно построить базовое предложение.',
        table: {
          headers: ['', 'ser', 'estar', 'tener', 'ir', 'hacer'],
          rows: [
            ['yo', 'soy', 'estoy', 'tengo', 'voy', 'hago'],
            ['tú', 'eres', 'estás', 'tienes', 'vas', 'haces'],
            ['él/ella', 'es', 'está', 'tiene', 'va', 'hace'],
            ['nosotros', 'somos', 'estamos', 'tenemos', 'vamos', 'hacemos'],
            ['vosotros', 'sois', 'estáis', 'tenéis', 'vais', 'hacéis'],
            ['ellos', 'son', 'están', 'tienen', 'van', 'hacen'],
          ],
        },
        examples: [
          { ro: 'Tengo veinte años', ru: 'Мне двадцать лет', note: 'tener + años = возраст' },
          { ro: 'Voy al trabajo', ru: 'Я иду на работу' },
          { ro: '¿Qué haces?', ru: 'Что ты делаешь?' },
          { ro: 'Soy de Rusia', ru: 'Я из России' },
          { ro: 'Estamos en casa', ru: 'Мы дома' },
          { ro: 'Van a la playa', ru: 'Они идут на пляж' },
        ],
      },
      {
        id: 'presente-irregular2',
        title: 'Неправильные глаголы (продолжение)',
        body: 'Poder и querer — глаголы с чередованием гласной (o→ue, e→ie) во всех лицах, кроме nosotros/vosotros. Saber нерегулярен только в 1-м лице (sé). Venir нерегулярен по смешанному типу: vengo в 1 л., чередование e→ie в остальных лицах.',
        table: {
          headers: ['', 'poder', 'querer', 'venir', 'saber'],
          rows: [
            ['yo', 'puedo', 'quiero', 'vengo', 'sé'],
            ['tú', 'puedes', 'quieres', 'vienes', 'sabes'],
            ['él/ella', 'puede', 'quiere', 'viene', 'sabe'],
            ['nosotros', 'podemos', 'queremos', 'venimos', 'sabemos'],
            ['vosotros', 'podéis', 'queréis', 'venís', 'sabéis'],
            ['ellos', 'pueden', 'quieren', 'vienen', 'saben'],
          ],
        },
        examples: [
          { ro: '¿Puedes ayudarme?', ru: 'Ты можешь мне помочь?' },
          { ro: 'Quiero un café', ru: 'Я хочу кофе' },
          { ro: 'Vengo de Rusia', ru: 'Я из России', note: 'venir de = быть из...' },
          { ro: 'No sé', ru: 'Не знаю' },
          { ro: 'No quiero ir', ru: 'Я не хочу идти' },
          { ro: '¿Sabes la respuesta?', ru: 'Ты знаешь ответ?' },
        ],
      },
      {
        id: 'presente-stem',
        title: 'Глаголы с чередованием гласных',
        body: 'У части глаголов ударная гласная в основе меняется: e→ie, o→ue, e→i, u→ue. Это происходит во всех формах КРОМЕ nosotros и vosotros («паттерн ботинка» — изменённые формы образуют подошву ботинка на схеме).\n\ne→ie: pensar, querer, entender, empezar, perder, preferir\no→ue: poder, volver, dormir, encontrar, recordar\ne→i (только -ir): pedir, servir, repetir, seguir\nu→ue: jugar (единственный)',
        table: {
          headers: ['Тип', 'Глагол', 'yo', 'tú', 'él/ella', 'nosotros', 'ellos'],
          rows: [
            ['e→ie', 'pensar', 'pienso', 'piensas', 'piensa', 'pensamos ✓', 'piensan'],
            ['o→ue', 'volver', 'vuelvo', 'vuelves', 'vuelve', 'volvemos ✓', 'vuelven'],
            ['e→i', 'pedir', 'pido', 'pides', 'pide', 'pedimos ✓', 'piden'],
            ['u→ue', 'jugar', 'juego', 'juegas', 'juega', 'jugamos ✓', 'juegan'],
          ],
        },
        examples: [
          { ro: 'Pienso que tienes razón', ru: 'Я думаю, что ты прав', note: 'pensar: pienso' },
          { ro: 'Vuelvo a casa a las seis', ru: 'Я возвращаюсь домой в шесть', note: 'volver: vuelvo' },
          { ro: '¿Qué pides de comer?', ru: 'Что ты заказываешь поесть?', note: 'pedir: pides' },
          { ro: '¿Juegas al fútbol?', ru: 'Ты играешь в футбол?', note: 'jugar: juegas' },
          { ro: 'No entiendo nada', ru: 'Я ничего не понимаю', note: 'entender: entiendo (e→ie)' },
          { ro: 'Dormimos ocho horas', ru: 'Мы спим восемь часов', note: 'dormir — nosotros без изменений' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. PRETÉRITO INDEFINIDO
  // ─────────────────────────────────────────────
  {
    id: 'preterito',
    title: 'Pretérito Indefinido',
    icon: '📅',
    description: 'Простое прошедшее время — завершённые действия',
    sections: [
      {
        id: 'preterito-regular',
        title: 'Правильные глаголы',
        body: 'Pretérito Indefinido используется для завершённых действий в прошлом с указанием на конкретный момент. Окончания -er и -ir совпадают.',
        table: {
          headers: ['Лицо', '-ar (hablar)', '-er/-ir (comer/vivir)'],
          rows: [
            ['yo', 'hablé', 'comí / viví'],
            ['tú', 'hablaste', 'comiste / viviste'],
            ['él/ella', 'habló', 'comió / vivió'],
            ['nosotros', 'hablamos', 'comimos / vivimos'],
            ['vosotros', 'hablasteis', 'comisteis / vivisteis'],
            ['ellos/ellas', 'hablaron', 'comieron / vivieron'],
          ],
        },
        examples: [
          { ro: 'Ayer hablé con María', ru: 'Вчера я говорил с Марией' },
          { ro: '¿Comiste bien?', ru: 'Ты хорошо поел?' },
          { ro: 'Vivieron en París dos años', ru: 'Они прожили в Париже два года' },
          { ro: 'Llegué a las ocho', ru: 'Я пришёл в восемь' },
          { ro: 'Ayer estudié mucho', ru: 'Вчера я много занимался' },
          { ro: '¿Bebiste agua?', ru: 'Ты пил воду?' },
        ],
      },
      {
        id: 'preterito-irregular',
        title: 'Неправильные глаголы',
        body: 'Ser и ir имеют одинаковые формы в pretérito (контекст определяет смысл). Tener, hacer и другие глаголы имеют нерегулярные основы.',
        table: {
          headers: ['', 'ser / ir', 'tener', 'hacer', 'poder', 'querer'],
          rows: [
            ['yo', 'fui', 'tuve', 'hice', 'pude', 'quise'],
            ['tú', 'fuiste', 'tuviste', 'hiciste', 'pudiste', 'quisiste'],
            ['él/ella', 'fue', 'tuvo', 'hizo', 'pudo', 'quiso'],
            ['nosotros', 'fuimos', 'tuvimos', 'hicimos', 'pudimos', 'quisimos'],
            ['vosotros', 'fuisteis', 'tuvisteis', 'hicisteis', 'pudisteis', 'quisisteis'],
            ['ellos', 'fueron', 'tuvieron', 'hicieron', 'pudieron', 'quisieron'],
          ],
        },
        examples: [
          { ro: 'Fui al médico ayer', ru: 'Вчера я ходил к врачу' },
          { ro: 'Fue una buena idea', ru: 'Это была хорошая идея', note: 'fue = ser или ir — по контексту' },
          { ro: 'Hizo frío', ru: 'Было холодно' },
          { ro: 'No pude dormir', ru: 'Я не смог уснуть' },
          { ro: 'Tuve que trabajar todo el día', ru: 'Мне пришлось работать весь день', note: 'tener que = быть вынужденным' },
          { ro: 'Quise llamarte pero no pude', ru: 'Я хотел тебе позвонить, но не смог' },
        ],
      },
      {
        id: 'preterito-hace',
        title: 'Выражения времени с hace',
        body: 'Hace + отрезок времени используется по-разному:\n— Hace + настоящее время: действие началось в прошлом и продолжается (= «уже X времени»)\n— Hace + pretérito: действие закончилось X времени назад\n— Desde hace + настоящее: то же, с акцентом на начало',
        table: {
          headers: ['Конструкция', 'Значение', 'Пример'],
          rows: [
            ['hace + время + que + presente', 'уже X времени (длится)', 'Hace dos años que vivo aquí'],
            ['hace + tiempo + pretérito', 'X времени назад', 'Llegué hace dos años'],
            ['desde hace + tiempo + presente', 'с X пор / уже X', 'Vivo aquí desde hace dos años'],
          ],
        },
        examples: [
          { ro: 'Hace tres años que estudio español', ru: 'Я учу испанский уже три года', note: 'действие продолжается' },
          { ro: 'Llegué a Madrid hace tres años', ru: 'Я приехал в Мадрид три года назад', note: 'действие завершено' },
          { ro: '¿Cuánto tiempo hace que vives aquí?', ru: 'Как давно ты здесь живёшь?' },
          { ro: 'Hace mucho que no te veo', ru: 'Я давно тебя не видел' },
          { ro: 'Lo vi hace unos días', ru: 'Я видел его несколько дней назад' },
          { ro: 'Desde hace un año trabajo aquí', ru: 'Уже год как я здесь работаю' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. FUTURO SIMPLE
  // ─────────────────────────────────────────────
  {
    id: 'futuro',
    title: 'Futuro Simple',
    icon: '🔮',
    description: 'Будущее время — регулярные и нерегулярные основы',
    sections: [
      {
        id: 'futuro-regular',
        title: 'Правильные глаголы',
        body: 'Futuro Simple образуется легко: к инфинитиву целиком прибавляются окончания. Окончания одинаковы для всех трёх типов спряжения.',
        table: {
          headers: ['Лицо', 'Окончание', 'hablar', 'comer', 'vivir'],
          rows: [
            ['yo', '-é', 'hablaré', 'comeré', 'viviré'],
            ['tú', '-ás', 'hablarás', 'comerás', 'vivirás'],
            ['él/ella', '-á', 'hablará', 'comerá', 'vivirá'],
            ['nosotros', '-emos', 'hablaremos', 'comeremos', 'viviremos'],
            ['vosotros', '-éis', 'hablaréis', 'comeréis', 'viviréis'],
            ['ellos', '-án', 'hablarán', 'comerán', 'vivirán'],
          ],
        },
        examples: [
          { ro: 'Mañana hablaré con él', ru: 'Завтра я поговорю с ним' },
          { ro: '¿Vendrás a la fiesta?', ru: 'Ты придёшь на вечеринку?' },
          { ro: 'Comeremos en casa', ru: 'Мы пообедаем дома' },
          { ro: '¿Trabajarás mañana?', ru: 'Ты завтра будешь работать?' },
          { ro: 'El tren llegará a las tres', ru: 'Поезд прибудет в три часа' },
          { ro: 'Vivirán en Madrid el año que viene', ru: 'В следующем году они будут жить в Мадриде' },
        ],
      },
      {
        id: 'futuro-irregular',
        title: 'Нерегулярные основы',
        body: 'Некоторые глаголы меняют основу инфинитива перед добавлением окончаний. Окончания остаются теми же.',
        table: {
          headers: ['Глагол', 'Основа', 'Пример (yo)'],
          rows: [
            ['tener', 'tendr-', 'tendré'],
            ['poder', 'podr-', 'podré'],
            ['querer', 'querr-', 'querré'],
            ['hacer', 'har-', 'haré'],
            ['venir', 'vendr-', 'vendré'],
            ['saber', 'sabr-', 'sabré'],
            ['poner', 'pondr-', 'pondré'],
            ['salir', 'saldr-', 'saldré'],
          ],
        },
        examples: [
          { ro: 'Tendré tiempo mañana', ru: 'Завтра у меня будет время' },
          { ro: 'No podré venir', ru: 'Я не смогу прийти' },
          { ro: '¿Qué harás el fin de semana?', ru: 'Что ты будешь делать на выходных?' },
          { ro: 'Vendremos a las ocho', ru: 'Мы придём в восемь' },
          { ro: 'Sabremos la respuesta mañana', ru: 'Завтра мы узнаем ответ', note: 'saber → sabr-' },
          { ro: '¿Querrás acompañarme?', ru: 'Ты захочешь пойти со мной?', note: 'querer → querr-' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 9. ЧИСЛА И ВРЕМЯ
  // ─────────────────────────────────────────────
  {
    id: 'numbers',
    title: 'Числа и время',
    icon: '🔢',
    description: 'Числительные, время суток, дни недели',
    sections: [
      {
        id: 'numbers-cardinal',
        title: 'Числительные',
        body: 'Числа 16–19 и 21–29 пишутся слитно: dieciséis, veintiuno. С 31 — раздельно через y: treinta y uno. Uno перед существительными усекается: un libro, una mesa. Millar (тысяча) — без de; millón требует de: un millón de personas.',
        table: {
          headers: ['Число', 'Испанский', 'Число', 'Испанский'],
          rows: [
            ['1', 'uno/un/una', '11', 'once'],
            ['2', 'dos', '12', 'doce'],
            ['3', 'tres', '13', 'trece'],
            ['4', 'cuatro', '14', 'catorce'],
            ['5', 'cinco', '15', 'quince'],
            ['6', 'seis', '16', 'dieciséis'],
            ['7', 'siete', '17', 'diecisiete'],
            ['8', 'ocho', '18', 'dieciocho'],
            ['9', 'nueve', '19', 'diecinueve'],
            ['10', 'diez', '20', 'veinte'],
          ],
        },
        examples: [
          { ro: 'treinta (30)', ru: 'тридцать' },
          { ro: 'cuarenta (40)', ru: 'сорок' },
          { ro: 'cincuenta (50)', ru: 'пятьдесят' },
          { ro: 'cien (100)', ru: 'сто', note: 'ciento перед другими числами: ciento uno' },
          { ro: 'mil (1000)', ru: 'тысяча' },
        ],
      },
      {
        id: 'time',
        title: 'Время суток',
        body: 'Время спрашивают: ¿Qué hora es? Отвечают с ser: Es la una / Son las dos. Минуты: y (и) — до получаса, menos (без) — после.',
        examples: [
          { ro: 'Es la una', ru: 'Час дня/ночи', note: 'la una — единственное число' },
          { ro: 'Son las tres', ru: 'Три часа', note: 'son — мн. число' },
          { ro: 'Son las tres y cuarto', ru: 'Три пятнадцать (четверть четвёртого)' },
          { ro: 'Son las cuatro menos diez', ru: 'Без десяти четыре' },
          { ro: 'de la mañana / de la tarde / de la noche', ru: 'утра / дня-вечера / ночи' },
        ],
      },
      {
        id: 'days',
        title: 'Дни недели и месяцы',
        body: 'Дни недели и месяцы пишутся со строчной буквы. Для выражения «в понедельник» используется el lunes (или los lunes — по понедельникам).',
        table: {
          headers: ['День', 'Испанский', 'Месяц', 'Испанский'],
          rows: [
            ['Понедельник', 'lunes', 'Январь', 'enero'],
            ['Вторник', 'martes', 'Февраль', 'febrero'],
            ['Среда', 'miércoles', 'Март', 'marzo'],
            ['Четверг', 'jueves', 'Апрель', 'abril'],
            ['Пятница', 'viernes', 'Май', 'mayo'],
            ['Суббота', 'sábado', 'Июнь', 'junio'],
            ['Воскресенье', 'domingo', 'Июль / Август', 'julio / agosto'],
          ],
        },
        examples: [
          { ro: 'el lunes', ru: 'в понедельник (разово)' },
          { ro: 'los lunes', ru: 'по понедельникам' },
          { ro: 'el 15 de mayo', ru: '15 мая' },
          { ro: 'Hoy es lunes', ru: 'Сегодня понедельник' },
          { ro: 'Nació el 3 de octubre de 1990', ru: 'Он родился 3 октября 1990 года' },
          { ro: 'En enero hace mucho frío', ru: 'В январе очень холодно' },
        ],
      },
      {
        id: 'numbers-ordinal',
        title: 'Порядковые числительные',
        body: 'Порядковые числительные согласуются с существительным в роде и числе. Перед существительным primero и tercero теряют -o: el primer piso, el tercer día.',
        table: {
          headers: ['Цифра', 'М.р.', 'Ж.р.'],
          rows: [
            ['1-й', 'primero / primer', 'primera'],
            ['2-й', 'segundo', 'segunda'],
            ['3-й', 'tercero / tercer', 'tercera'],
            ['4-й', 'cuarto', 'cuarta'],
            ['5-й', 'quinto', 'quinta'],
            ['6-й', 'sexto', 'sexta'],
            ['7-й', 'séptimo', 'séptima'],
            ['8-й', 'octavo', 'octava'],
            ['9-й', 'noveno', 'novena'],
            ['10-й', 'décimo', 'décima'],
          ],
        },
        examples: [
          { ro: 'el primer piso', ru: 'первый этаж', note: 'primero → primer перед сущ.' },
          { ro: 'la primera vez', ru: 'первый раз', note: 'primera — ж.р.' },
          { ro: 'el tercer día', ru: 'третий день', note: 'tercero → tercer перед сущ.' },
          { ro: 'el quinto aniversario', ru: 'пятая годовщина' },
          { ro: 'por segunda vez', ru: 'во второй раз' },
          { ro: 'Felipe II (segundo)', ru: 'Филипп II (Второй)', note: 'в именах — порядковое' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 10. ВОПРОСИТЕЛЬНЫЕ СЛОВА
  // ─────────────────────────────────────────────
  {
    id: 'questions',
    title: 'Вопросительные слова',
    icon: '❓',
    description: 'Как задать вопрос: ¿qué?, ¿quién?, ¿cómo?, ¿dónde? и другие',
    sections: [
      {
        id: 'questions-words',
        title: 'Основные вопросительные слова',
        body: 'Все вопросительные слова пишутся с ударением (tilde). Предложение заключается в перевёрнутый вопросительный знак ¿ в начале и ? в конце.',
        table: {
          headers: ['Испанский', 'Русский', 'Пример'],
          rows: [
            ['¿qué?', 'что? какой?', '¿Qué haces? — Что ты делаешь?'],
            ['¿quién? / ¿quiénes?', 'кто?', '¿Quién es? — Кто это?'],
            ['¿cuál? / ¿cuáles?', 'какой? который?', '¿Cuál prefieres? — Какой предпочитаешь?'],
            ['¿cuándo?', 'когда?', '¿Cuándo llegas? — Когда ты приедешь?'],
            ['¿dónde?', 'где? куда?', '¿Dónde vives? — Где ты живёшь?'],
            ['¿cómo?', 'как? каким образом?', '¿Cómo te llamas? — Как тебя зовут?'],
            ['¿cuánto/a?', 'сколько?', '¿Cuánto cuesta? — Сколько стоит?'],
            ['¿por qué?', 'почему?', '¿Por qué estudias español? — Почему ты учишь испанский?'],
            ['¿para qué?', 'зачем?', '¿Para qué sirve esto? — Зачем это нужно?'],
          ],
        },
        examples: [
          { ro: '¿Qué hora es?', ru: 'Который час?' },
          { ro: '¿Dónde está el baño?', ru: 'Где туалет?' },
          { ro: '¿Cuántos años tienes?', ru: 'Сколько тебе лет?', note: 'cuántos согласуется с родом/числом' },
          { ro: '¿Por qué no vienes?', ru: 'Почему ты не приходишь?' },
          { ro: '¿Con quién hablas?', ru: 'С кем ты разговариваешь?' },
        ],
      },
      {
        id: 'questions-indirect',
        title: '¿Qué? vs ¿Cuál?',
        body: '¿Qué? + существительное = «какой/что за»: ¿Qué libro? (Что за книга?)\n¿Cuál? без существительного = «который из...»: ¿Cuál es tu libro? (Который из книг твоя?)\n\nЭта пара часто вызывает путаницу: ¿Cuál es tu nombre? (не ¿Qué es tu nombre?).',
        examples: [
          { ro: '¿Qué idiomas hablas?', ru: 'Какие языки ты знаешь?', note: 'qué + существительное' },
          { ro: '¿Cuál es tu número de teléfono?', ru: 'Какой твой номер телефона?', note: 'cuál без сущ.' },
          { ro: '¿Cuáles son tus colores favoritos?', ru: 'Какие твои любимые цвета?', note: 'cuáles = мн. число' },
          { ro: '¿Qué libro prefieres?', ru: 'Какую книгу ты предпочитаешь?', note: 'qué + сущ. = «что за»' },
          { ro: '¿Cuál es la diferencia?', ru: 'В чём разница?' },
          { ro: '¿Qué es un bolígrafo?', ru: 'Что такое шариковая ручка?', note: 'qué + ser = определение понятия' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 11. PRETÉRITO IMPERFECTO
  // ─────────────────────────────────────────────
  {
    id: 'imperfecto',
    title: 'Pretérito Imperfecto',
    icon: '🌀',
    description: 'Прошедшее незавершённое — привычные действия и описания в прошлом',
    sections: [
      {
        id: 'imperfecto-uses',
        title: 'Когда используется',
        body: 'Imperfecto используется для:\n— Привычных действий в прошлом («раньше я делал...»)\n— Описания обстановки, людей, чувств в прошлом\n— Незавершённых действий, фон для другого действия\n— Выражения вежливой просьбы (quería un café — я бы хотел кофе)\n\nГлавный вопрос: «Что происходило?» (Imperfecto) vs «Что произошло?» (Pretérito Indefinido)',
        examples: [
          { ro: 'Cuando era niño, vivía en Madrid', ru: 'Когда я был ребёнком, я жил в Мадриде', note: 'era + vivía — оба imperfecto' },
          { ro: 'Todos los veranos íbamos a la playa', ru: 'Каждое лето мы ездили на пляж', note: 'todos los — признак imperfecto' },
          { ro: 'Llovía cuando salí de casa', ru: 'Шёл дождь, когда я вышел из дома', note: 'llovía (фон) + salí (событие)' },
          { ro: 'Quería pedirte un favor', ru: 'Я хотел бы попросить тебя об одолжении', note: 'вежливая просьба' },
          { ro: 'Eran las dos cuando llegó', ru: 'Было два часа, когда он пришёл', note: 'описание обстоятельств' },
          { ro: 'Siempre comíamos juntos', ru: 'Мы всегда ели вместе', note: 'siempre — признак imperfecto' },
        ],
      },
      {
        id: 'imperfecto-regular',
        title: 'Правильные глаголы',
        body: 'Два набора окончаний: для -ar и для -er/-ir (совпадают). Обратите внимание на ударение в nosotros: -ábamos, -íamos.',
        table: {
          headers: ['Лицо', '-ar (hablar)', '-er (comer)', '-ir (vivir)'],
          rows: [
            ['yo', 'hablaba', 'comía', 'vivía'],
            ['tú', 'hablabas', 'comías', 'vivías'],
            ['él/ella', 'hablaba', 'comía', 'vivía'],
            ['nosotros', 'hablábamos', 'comíamos', 'vivíamos'],
            ['vosotros', 'hablabais', 'comíais', 'vivíais'],
            ['ellos/ellas', 'hablaban', 'comían', 'vivían'],
          ],
        },
        examples: [
          { ro: 'Hablábamos mucho', ru: 'Мы много разговаривали' },
          { ro: 'Comía pizza todos los viernes', ru: 'Каждую пятницу я ел пиццу' },
          { ro: 'Vivían cerca del mar', ru: 'Они жили рядом с морем' },
          { ro: 'Trabajaba en una empresa grande', ru: 'Я работал в большой компании' },
          { ro: '¿Estudiabas mucho de joven?', ru: 'Ты много учился в молодости?' },
          { ro: 'Leíamos libros por la noche', ru: 'По ночам мы читали книги' },
        ],
      },
      {
        id: 'imperfecto-irregular',
        title: 'Неправильные глаголы',
        body: 'В imperfecto только три неправильных глагола: ser, ir, ver. Всё остальное — правильное.',
        table: {
          headers: ['Лицо', 'ser', 'ir', 'ver'],
          rows: [
            ['yo', 'era', 'iba', 'veía'],
            ['tú', 'eras', 'ibas', 'veías'],
            ['él/ella', 'era', 'iba', 'veía'],
            ['nosotros', 'éramos', 'íbamos', 'veíamos'],
            ['vosotros', 'erais', 'ibais', 'veíais'],
            ['ellos', 'eran', 'iban', 'veían'],
          ],
        },
        examples: [
          { ro: 'Éramos amigos', ru: 'Мы были друзьями' },
          { ro: 'Iba al colegio en autobús', ru: 'Я ходил в школу на автобусе' },
          { ro: 'Veía la tele cada noche', ru: 'Каждый вечер я смотрел телевизор' },
          { ro: 'Era muy tímido de pequeño', ru: 'В детстве он был очень застенчивым' },
          { ro: 'Iban de vacaciones a la playa', ru: 'Они ездили в отпуск на пляж' },
          { ro: 'La veía en el parque', ru: 'Я видел её в парке' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 12. IR A + INFINITIVO (FUTURO PRÓXIMO)
  // ─────────────────────────────────────────────
  {
    id: 'futuro-proximo',
    title: 'Ir a + infinitivo',
    icon: '🎯',
    description: 'Ближайшее будущее — то, что произойдёт скоро или запланировано',
    sections: [
      {
        id: 'futuro-proximo-form',
        title: 'Образование',
        body: 'Конструкция ir (в настоящем времени) + a + инфинитив. Аналог английского «going to». Используется для планов, намерений и действий, которые произойдут в ближайшем будущем.',
        table: {
          headers: ['Лицо', 'ir', 'Пример'],
          rows: [
            ['yo', 'voy a', 'Voy a comer — Я собираюсь есть'],
            ['tú', 'vas a', 'Vas a llegar tarde — Ты опоздаешь'],
            ['él/ella', 'va a', 'Va a llover — Будет дождь'],
            ['nosotros', 'vamos a', 'Vamos a estudiar — Мы будем учиться'],
            ['vosotros', 'vais a', 'Vais a ver — Вы увидите'],
            ['ellos/ellas', 'van a', 'Van a venir — Они придут'],
          ],
        },
        examples: [
          { ro: 'Voy a llamar a mi madre', ru: 'Я собираюсь позвонить маме' },
          { ro: '¿Qué vas a hacer mañana?', ru: 'Что ты будешь делать завтра?' },
          { ro: 'Va a ser difícil', ru: 'Это будет трудно' },
          { ro: 'Vamos a ver', ru: 'Посмотрим / Давайте посмотрим', note: 'устойчивое выражение' },
          { ro: 'Van a abrir un restaurante nuevo', ru: 'Они откроют новый ресторан' },
          { ro: '¿Cuándo vas a llamar?', ru: 'Когда ты собираешься позвонить?' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 13. HAY И GUSTAR
  // ─────────────────────────────────────────────
  {
    id: 'hay-gustar',
    title: 'Hay и gustar',
    icon: '💡',
    description: 'Две важные конструкции: «есть/находится» и «нравится»',
    sections: [
      {
        id: 'hay',
        title: 'Hay — есть, находится',
        body: 'Hay — неизменяемое слово (от haber), означает «есть, имеется, находится». Используется и с единственным, и со множественным числом.\n\nВ прошедшем: había (было/были)\nВ будущем: habrá (будет)',
        examples: [
          { ro: 'Hay un libro en la mesa', ru: 'На столе есть книга' },
          { ro: 'Hay tres personas aquí', ru: 'Здесь три человека', note: 'hay не меняется для мн. числа' },
          { ro: '¿Hay leche?', ru: 'Есть молоко?' },
          { ro: 'No hay pan', ru: 'Хлеба нет' },
          { ro: 'Había mucho tráfico', ru: 'Было много пробок' },
          { ro: 'Habrá una fiesta', ru: 'Будет вечеринка' },
        ],
      },
      {
        id: 'gustar',
        title: 'Gustar — нравиться',
        body: 'Gustar — конструкция наоборот: не «я люблю кофе», а «кофе нравится мне». Подлежащее — то, что нравится; косвенное дополнение — кому нравится.\n\ngusta (ед. число) / gustan (мн. число)\n\nАналогично работают: encantar (очень нравиться), molestar (раздражать), parecer (казаться), doler (болеть).',
        table: {
          headers: ['Кому нравится', 'Местоимение'],
          rows: [
            ['мне', 'me gusta / me gustan'],
            ['тебе', 'te gusta / te gustan'],
            ['ему/ей/Вам', 'le gusta / le gustan'],
            ['нам', 'nos gusta / nos gustan'],
            ['вам', 'os gusta / os gustan'],
            ['им', 'les gusta / les gustan'],
          ],
        },
        examples: [
          { ro: 'Me gusta el café', ru: 'Мне нравится кофе', note: 'gusta — ед. число' },
          { ro: 'Me gustan los libros', ru: 'Мне нравятся книги', note: 'gustan — мн. число' },
          { ro: '¿Te gusta la música?', ru: 'Тебе нравится музыка?' },
          { ro: 'Le encanta bailar', ru: 'Ему/ей очень нравится танцевать', note: 'bailar — инфинитив = ед. число' },
          { ro: 'No me gustan las películas de terror', ru: 'Мне не нравятся фильмы ужасов' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 14. ВОЗВРАТНЫЕ ГЛАГОЛЫ
  // ─────────────────────────────────────────────
  {
    id: 'reflexive',
    title: 'Возвратные глаголы',
    icon: '🔄',
    description: 'Verbos reflexivos — действие направлено на самого себя',
    sections: [
      {
        id: 'reflexive-intro',
        title: 'Что такое возвратный глагол',
        body: 'Возвратные глаголы в словаре всегда заканчиваются на -se: llamarse, levantarse, ducharse. При спряжении частица -se превращается в возвратное местоимение и ставится перед спряжённым глаголом.\n\nВозвратные местоимения: me (я), te (ты), se (он/она/они), nos (мы), os (вы), se (они)\n\nНекоторые глаголы с nos/os/se выражают взаимное действие: nos llamamos = мы звоним друг другу.',
        table: {
          headers: ['Лицо', 'Местоимение', 'llamarse', 'levantarse'],
          rows: [
            ['yo', 'me', 'me llamo', 'me levanto'],
            ['tú', 'te', 'te llamas', 'te levantas'],
            ['él/ella', 'se', 'se llama', 'se levanta'],
            ['nosotros', 'nos', 'nos llamamos', 'nos levantamos'],
            ['vosotros', 'os', 'os llamáis', 'os levantáis'],
            ['ellos/ellas', 'se', 'se llaman', 'se levantan'],
          ],
        },
        examples: [
          { ro: 'Me llamo Ana', ru: 'Меня зовут Ана', note: 'llamarse = называться, звать себя' },
          { ro: 'Se levanta a las siete', ru: 'Он встаёт в семь часов' },
          { ro: '¿A qué hora te acuestas?', ru: 'В котором часу ты ложишься спать?' },
          { ro: 'Nos duchamos por la mañana', ru: 'Мы принимаем душ утром' },
          { ro: 'Me siento bien hoy', ru: 'Сегодня я чувствую себя хорошо', note: 'sentirse = чувствовать себя' },
          { ro: '¿Os conocéis?', ru: 'Вы знакомы (друг с другом)?', note: 'os = взаимное действие' },
        ],
      },
      {
        id: 'reflexive-common',
        title: 'Частые возвратные глаголы',
        body: 'Возвратные глаголы обозначают действие, направленное на самого субъекта. Сравни: levantarse (встать самому) vs levantar algo (поднять что-то). Большинство глаголов рутины возвратны. Местоимение (me/te/se/nos/os/se) стоит перед спрягаемым глаголом или присоединяется к инфинитиву.',
        table: {
          headers: ['Глагол', 'Перевод', 'Глагол', 'Перевод'],
          rows: [
            ['llamarse', 'звать (себя)', 'ducharse', 'принимать душ'],
            ['levantarse', 'вставать', 'lavarse', 'мыться'],
            ['acostarse', 'ложиться спать', 'vestirse', 'одеваться'],
            ['despertarse', 'просыпаться', 'sentarse', 'садиться'],
            ['afeitarse', 'бриться', 'peinarse', 'причёсываться'],
            ['casarse', 'жениться/выходить замуж', 'irse', 'уходить'],
          ],
        },
        examples: [
          { ro: 'Me despierto a las ocho', ru: 'Я просыпаюсь в восемь' },
          { ro: 'Se viste rápido', ru: 'Он одевается быстро' },
          { ro: 'Siéntate, por favor', ru: 'Садись, пожалуйста', note: 'повелительное наклонение' },
          { ro: 'Se casaron en junio', ru: 'Они поженились в июне' },
          { ro: 'Me lavo los dientes dos veces al día', ru: 'Я чищу зубы два раза в день' },
          { ro: 'Se afeitó esta mañana', ru: 'Он побрился этим утром' },
        ],
      },
      {
        id: 'reflexive-position',
        title: 'Место возвратного местоимения',
        body: 'Перед спряжённым глаголом: me levanto.\nПрикреплено к инфинитиву: voy a levantarme / me voy a levantar (оба варианта верны).\nПрикреплено к герундию: estoy levantándome / me estoy levantando.',
        examples: [
          { ro: 'Tengo que lavarme las manos', ru: 'Мне нужно помыть руки' },
          { ro: 'Me tengo que lavar las manos', ru: 'Мне нужно помыть руки', note: 'оба варианта верны' },
          { ro: 'Está duchándose', ru: 'Он принимает душ (прямо сейчас)' },
          { ro: 'Se está duchando', ru: 'Он принимает душ (прямо сейчас)', note: 'тоже верно' },
          { ro: 'Voy a levantarme temprano', ru: 'Я собираюсь встать рано' },
          { ro: 'Me voy a levantar temprano', ru: 'Я собираюсь встать рано', note: 'оба порядка одинаково верны' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 15. МЕСТОИМЕНИЯ ДОПОЛНЕНИЯ
  // ─────────────────────────────────────────────
  {
    id: 'object-pronouns',
    title: 'Местоимения дополнения',
    icon: '🔗',
    description: 'Прямое и косвенное дополнение — заменители существительных',
    sections: [
      {
        id: 'direct-object',
        title: 'Прямое дополнение (lo, la, los, las)',
        body: 'Прямое дополнение отвечает на вопрос «кого? что?». Местоимения согласуются в роде и числе с существительным, которое заменяют.',
        table: {
          headers: ['', 'Единственное', 'Множественное'],
          rows: [
            ['1-е л.', 'me (меня)', 'nos (нас)'],
            ['2-е л.', 'te (тебя)', 'os (вас)'],
            ['3-е л. муж.', 'lo (его, вас — м.р.)', 'los (их — м.р.)'],
            ['3-е л. жен.', 'la (её, вас — ж.р.)', 'las (их — ж.р.)'],
          ],
        },
        examples: [
          { ro: '¿Ves el libro? — Sí, lo veo', ru: 'Видишь книгу? — Да, вижу её (её = libro, м.р.)' },
          { ro: '¿Conoces a María? — Sí, la conozco', ru: 'Ты знаешь Марию? — Да, знаю (её = María)' },
          { ro: 'Compra los billetes — Cómpralos', ru: 'Купи билеты — Купи их', note: 'к повелительному прикрепляется' },
          { ro: '¿Me escuchas? — Sí, te escucho', ru: 'Ты меня слушаешь? — Да, слушаю', note: 'me → te при смене говорящего' },
          { ro: '¿Las ves? — Sí, las veo', ru: 'Ты их видишь? — Да, вижу', note: 'las = вещи ж.р. мн.ч.' },
          { ro: 'No lo entiendo', ru: 'Я это не понимаю' },
        ],
      },
      {
        id: 'indirect-object',
        title: 'Косвенное дополнение (le, les)',
        body: 'Косвенное дополнение отвечает на вопрос «кому? для кого?». Для 3-го лица: le (ему/ей) и les (им). Не зависит от рода.',
        table: {
          headers: ['', 'Единственное', 'Множественное'],
          rows: [
            ['1-е л.', 'me (мне)', 'nos (нам)'],
            ['2-е л.', 'te (тебе)', 'os (вам)'],
            ['3-е л.', 'le (ему / ей / Вам)', 'les (им / Вам)'],
          ],
        },
        examples: [
          { ro: 'Le doy el libro a Juan', ru: 'Я даю Хуану книгу', note: 'le = Хуану (косвенное)' },
          { ro: '¿Me puedes ayudar?', ru: 'Ты можешь мне помочь?' },
          { ro: 'Les escribo un mensaje', ru: 'Я пишу им сообщение' },
          { ro: 'Te lo explico', ru: 'Я тебе это объясняю', note: 'оба местоимения вместе: te (косв.) + lo (прямое)' },
          { ro: '¿Le dices la verdad?', ru: 'Ты ему говоришь правду?' },
          { ro: 'Nos manda un regalo', ru: 'Он посылает нам подарок' },
        ],
      },
      {
        id: 'pronoun-order',
        title: 'Порядок и правило se',
        body: 'Если косвенное и прямое дополнение стоят рядом: косвенное (me/te/le/nos/os/les) → прямое (lo/la/los/las).\n\nВажно: le/les перед lo/la/los/las заменяется на se (не путать с возвратным se!).',
        examples: [
          { ro: 'Te lo digo — Я тебе это скажу', ru: 'te (косв.) + lo (прямое)' },
          { ro: '¿Le dices la verdad? → ¿Se la dices?', ru: 'Ты ему говоришь правду? → Говоришь ли ты её ему?', note: 'le → se перед la' },
          { ro: 'Se lo mando mañana', ru: 'Я отошлю ему/ей это завтра' },
          { ro: 'Me lo das, por favor', ru: 'Дай мне это, пожалуйста', note: 'me (косв.) + lo (прямое)' },
          { ro: 'Nos lo explicó el profesor', ru: 'Учитель нам это объяснил' },
          { ro: 'Se las compré', ru: 'Я купил их ей/ему', note: 'le → se перед las' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 16. ПРЕДЛОГИ
  // ─────────────────────────────────────────────
  {
    id: 'prepositions',
    title: 'Предлоги',
    icon: '📍',
    description: 'Основные предлоги и сложная пара por/para',
    sections: [
      {
        id: 'prepositions-basic',
        title: 'Основные предлоги',
        body: 'Главная особенность испанских предлогов — так называемый personal a: перед одушевлённым прямым дополнением обязательно ставится a (veo a mi amigo). Предлоги a и de сливаются с определённым артиклем el: a + el = al, de + el = del.',
        table: {
          headers: ['Предлог', 'Значение', 'Примеры'],
          rows: [
            ['a', 'в (направление), кому (дат.), через (время)', 'voy a Madrid; a las tres; le digo a él'],
            ['de', 'из, от, принадлежность', 'soy de Rusia; el libro de Ana; vengo de casa'],
            ['en', 'в (место), на, по', 'estoy en casa; en coche; en julio'],
            ['con', 'с (вместе)', 'café con leche; vivo con mis padres'],
            ['sin', 'без', 'café sin azúcar; sin problemas'],
            ['sobre', 'о (теме), над, на поверхности', 'hablo sobre eso; el libro está sobre la mesa'],
            ['entre', 'между', 'entre tú y yo; entre semana'],
            ['hasta', 'до (места/времени)', 'hasta mañana; hasta Madrid'],
            ['desde', 'с (момента), из (места)', 'desde las tres; desde aquí'],
          ],
        },
        examples: [
          { ro: 'Voy a la tienda', ru: 'Я иду в магазин', note: 'a + la = a la' },
          { ro: 'a + el = al', ru: 'Voy al trabajo — иду на работу', note: 'слияние a + el → al' },
          { ro: 'de + el = del', ru: 'El libro del profesor — книга учителя', note: 'слияние de + el → del' },
          { ro: 'Desde las ocho hasta las cinco', ru: 'С восьми до пяти' },
          { ro: 'Vivo con mis padres', ru: 'Я живу с родителями' },
          { ro: 'Hablo sobre el trabajo', ru: 'Я говорю о работе' },
        ],
      },
      {
        id: 'prepositions-por-para',
        title: 'Por vs Para',
        body: 'Пара por/para — одна из самых сложных тем испанского. Оба могут переводиться «для», «за», «по», но смысл разный.\n\nPOR — причина, обмен, длительность, движение через, «благодаря»\nPARA — цель, назначение, получатель, дедлайн, направление',
        table: {
          headers: ['POR (причина, средство)', 'PARA (цель, назначение)'],
          rows: [
            ['причина: Lo hice por ti (сделал из-за тебя)', 'цель: Estudio para hablar bien (учусь, чтобы хорошо говорить)'],
            ['длительность: Estudié por dos horas (два часа)', 'дедлайн: La tarea es para el lunes (до понедельника)'],
            ['обмен: Te doy 20€ por el libro (за книгу)', 'получатель: Este regalo es para ti (тебе в подарок)'],
            ['движение через: Pasé por el parque (через парк)', 'направление: Salgo para Madrid (еду в Мадрид)'],
            ['благодарность: Gracias por tu ayuda', 'мнение: Para mí, es difícil (по-моему, это сложно)'],
          ],
        },
        examples: [
          { ro: 'Lo compré por diez euros', ru: 'Я купил это за десять евро' },
          { ro: 'Lo compré para ti', ru: 'Я купил это для тебя' },
          { ro: 'Trabajo por dinero', ru: 'Я работаю ради денег' },
          { ro: 'Trabajo para vivir', ru: 'Я работаю, чтобы жить' },
          { ro: 'por favor / por ejemplo / por supuesto', ru: 'пожалуйста / например / конечно', note: 'устойчивые выражения с por' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 17. PRESENTE DE SUBJUNTIVO
  // ─────────────────────────────────────────────
  {
    id: 'subjuntivo',
    title: 'Presente de Subjuntivo',
    icon: '🌊',
    description: 'Сослагательное наклонение настоящего времени — желание, сомнение, эмоции',
    sections: [
      {
        id: 'subjuntivo-uses',
        title: 'Когда используется',
        body: 'Субхунтиво — не время, а наклонение. Используется после:\n— Желания и воли: querer que, desear que, esperar que\n— Рекомендаций и советов: recomendar que, aconsejar que, sugerir que\n— Эмоций: alegrarse de que, tener miedo de que, estar feliz de que\n— Сомнения и отрицания: no creer que, dudar que, no pensar que\n— Безличных конструкций: es importante que, es necesario que, es mejor que\n— Ojalá (= дай Бог, хотелось бы)\n\nКлюч: два разных субъекта + глагол влияния/оценки → субхунтиво в придаточном.',
        examples: [
          { ro: 'Quiero que vengas', ru: 'Я хочу, чтобы ты пришёл', note: 'два субъекта: я хочу, ты приходишь' },
          { ro: 'Te recomiendo que estudies más', ru: 'Советую тебе учиться больше', note: 'рекомендация → субхунтиво' },
          { ro: 'Es importante que estudies', ru: 'Важно, чтобы ты учился', note: 'безличная конструкция' },
          { ro: 'No creo que sea verdad', ru: 'Не думаю, что это правда', note: 'сомнение → субхунтиво' },
          { ro: 'Ojalá tengas razón', ru: 'Хотелось бы, чтобы ты был прав', note: 'ojalá всегда + субхунтиво' },
          { ro: 'Me alegra que estés aquí', ru: 'Я рад, что ты здесь', note: 'эмоция → субхунтиво' },
        ],
      },
      {
        id: 'subjuntivo-regular',
        title: 'Образование правильных глаголов',
        body: 'Формула: форма yo настоящего времени − o + «перевёрнутые» окончания.\nГлаголы -ar берут окончания -er/-ir и наоборот.',
        table: {
          headers: ['Лицо', '-ar (hablar → hable)', '-er (comer → coma)', '-ir (vivir → viva)'],
          rows: [
            ['yo', 'hable', 'coma', 'viva'],
            ['tú', 'hables', 'comas', 'vivas'],
            ['él/ella', 'hable', 'coma', 'viva'],
            ['nosotros', 'hablemos', 'comamos', 'vivamos'],
            ['vosotros', 'habléis', 'comáis', 'viváis'],
            ['ellos/ellas', 'hablen', 'coman', 'vivan'],
          ],
        },
        examples: [
          { ro: 'Quiero que hables más despacio', ru: 'Хочу, чтобы ты говорил медленнее', note: 'hablar → hables' },
          { ro: 'Es necesario que comamos bien', ru: 'Необходимо, чтобы мы хорошо питались', note: 'comer → comamos' },
          { ro: 'Espero que vivas cerca', ru: 'Надеюсь, что ты живёшь рядом', note: 'vivir → vivas' },
          { ro: 'No quiero que trabajes tanto', ru: 'Не хочу, чтобы ты так много работал', note: 'trabajar → trabajes' },
          { ro: 'Te pido que vengas', ru: 'Прошу тебя прийти', note: 'pedir que + субхунтиво' },
          { ro: 'Ojalá lleguen a tiempo', ru: 'Хотелось бы, чтобы они успели', note: 'ojalá + субхунтиво' },
        ],
      },
      {
        id: 'subjuntivo-irregular',
        title: 'Неправильные глаголы (DISHES)',
        body: 'Шесть полностью неправильных глаголов в субхунтиво — запоминают по акрониму DISHES: Dar, Ir, Saber, Haber, Estar, Ser. Их формы нельзя вывести из правила, нужно запомнить. Haber важен для сложных времён в субхунтиво (espero que haya venido).',
        table: {
          headers: ['', 'dar', 'ir', 'saber', 'estar', 'ser'],
          rows: [
            ['yo', 'dé', 'vaya', 'sepa', 'esté', 'sea'],
            ['tú', 'des', 'vayas', 'sepas', 'estés', 'seas'],
            ['él/ella', 'dé', 'vaya', 'sepa', 'esté', 'sea'],
            ['nosotros', 'demos', 'vayamos', 'sepamos', 'estemos', 'seamos'],
            ['vosotros', 'deis', 'vayáis', 'sepáis', 'estéis', 'seáis'],
            ['ellos', 'den', 'vayan', 'sepan', 'estén', 'sean'],
          ],
        },
        examples: [
          { ro: 'Quiero que vayas al médico', ru: 'Хочу, чтобы ты сходил к врачу' },
          { ro: 'Espero que estés bien', ru: 'Надеюсь, что ты в порядке' },
          { ro: 'Es importante que seas honesto', ru: 'Важно, чтобы ты был честным' },
          { ro: 'No quiero que des ese paso', ru: 'Не хочу, чтобы ты делал этот шаг', note: 'dar → des' },
          { ro: 'Ojalá sepa la respuesta', ru: 'Хотелось бы, чтобы он знал ответ', note: 'saber → sepa' },
          { ro: 'Es necesario que estén aquí a las ocho', ru: 'Нужно, чтобы они были здесь в восемь', note: 'estar → estén' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 18. CONDICIONAL SIMPLE
  // ─────────────────────────────────────────────
  {
    id: 'condicional',
    title: 'Condicional Simple',
    icon: '🔀',
    description: 'Условное наклонение — «бы» и вежливые просьбы',
    sections: [
      {
        id: 'condicional-uses',
        title: 'Когда используется',
        body: 'Condicional Simple соответствует русскому «бы»:\n— Вежливые просьбы и предложения (мягче, чем индикатив)\n— Гипотетические ситуации: «что было бы, если бы...»\n— Предположения о прошлом (действие могло произойти)\n— В условных конструкциях: Si + imperfecto subjuntivo + condicional\n\nОсобенно часты: me gustaría (я бы хотел), podría (мог бы), debería (следовало бы), querría (хотел бы).',
        examples: [
          { ro: '¿Podrías ayudarme?', ru: 'Ты мог бы мне помочь?', note: 'вежливая просьба' },
          { ro: 'Me gustaría un café', ru: 'Я бы хотел кофе', note: 'мягче, чем quiero' },
          { ro: 'Deberías descansar más', ru: 'Тебе следовало бы больше отдыхать', note: 'deber → deberías = мягкий совет' },
          { ro: 'Si tuviera dinero, viajaría', ru: 'Если бы у меня были деньги, я бы путешествовал', note: 'условная конструкция' },
          { ro: 'Serían las tres cuando llegó', ru: 'Было, наверное, около трёх, когда он пришёл', note: 'предположение о прошлом' },
        ],
      },
      {
        id: 'condicional-regular',
        title: 'Правильные глаголы',
        body: 'Образуется от инфинитива целиком + окончания (как в futuro, но другие суффиксы). Окончания одинаковы для -ar/-er/-ir.',
        table: {
          headers: ['Лицо', 'Окончание', 'hablar', 'comer', 'vivir'],
          rows: [
            ['yo', '-ía', 'hablaría', 'comería', 'viviría'],
            ['tú', '-ías', 'hablarías', 'comerías', 'vivirías'],
            ['él/ella', '-ía', 'hablaría', 'comería', 'viviría'],
            ['nosotros', '-íamos', 'hablaríamos', 'comeríamos', 'viviríamos'],
            ['vosotros', '-íais', 'hablaríais', 'comeríais', 'viviríais'],
            ['ellos', '-ían', 'hablarían', 'comerían', 'vivirían'],
          ],
        },
        examples: [
          { ro: 'Hablaríamos más, pero no hay tiempo', ru: 'Мы бы говорили дольше, но нет времени' },
          { ro: '¿Comerías sushi?', ru: 'Ты бы поел суши?' },
          { ro: 'Viviría en España si pudiera', ru: 'Я бы жил в Испании, если бы мог' },
          { ro: 'Trabajaría menos si ganara más', ru: 'Я бы меньше работал, если бы больше зарабатывал' },
          { ro: 'Estudiaría más, pero estoy cansado', ru: 'Я бы больше учился, но я устал' },
          { ro: '¿Beberías más agua si hiciera más calor?', ru: 'Ты бы пил больше воды, если бы было теплее?' },
        ],
      },
      {
        id: 'condicional-irregular',
        title: 'Нерегулярные основы',
        body: 'Те же нерегулярные основы, что и в futuro simple (основа та же, окончания другие).',
        table: {
          headers: ['Глагол', 'Основа', 'yo', 'él/ella'],
          rows: [
            ['tener', 'tendr-', 'tendría', 'tendría'],
            ['poder', 'podr-', 'podría', 'podría'],
            ['querer', 'querr-', 'querría', 'querría'],
            ['hacer', 'har-', 'haría', 'haría'],
            ['venir', 'vendr-', 'vendría', 'vendría'],
            ['saber', 'sabr-', 'sabría', 'sabría'],
            ['poner', 'pondr-', 'pondría', 'pondría'],
            ['salir', 'saldr-', 'saldría', 'saldría'],
          ],
        },
        examples: [
          { ro: '¿Podrías repetir, por favor?', ru: 'Не мог бы ты повторить?' },
          { ro: 'Querría una mesa para dos', ru: 'Я бы хотел столик на двоих', note: 'в ресторане — очень вежливо' },
          { ro: 'Haría lo mismo en tu lugar', ru: 'На твоём месте я бы сделал то же самое' },
          { ro: '¿Qué harías si tuvieras un millón?', ru: 'Что бы ты сделал, если бы у тебя был миллион?' },
          { ro: 'Tendría más tiempo libre', ru: 'У меня было бы больше свободного времени' },
          { ro: 'Vendría contigo, pero tengo trabajo', ru: 'Я бы пошёл с тобой, но у меня работа' },
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────
  // 19. ESTAR + GERUNDIO
  // ─────────────────────────────────────────────
  {
    id: 'estar-gerundio',
    title: 'Estar + gerundio',
    icon: '🔄',
    description: 'Продолженное время — действие, происходящее прямо сейчас',
    sections: [
      {
        id: 'gerundio-when',
        title: 'Когда использовать',
        body: 'Estar + gerundio описывает действие, которое происходит прямо сейчас или в этот период — аналог русского «я делаю это в данный момент».\n\nОтличие от Presente:\n— Trabajo en casa → работаю из дома вообще (привычка)\n— Estoy trabajando en casa → работаю из дома прямо сейчас\n\nЧасто сопровождается: ahora (сейчас), ahora mismo (прямо сейчас), en este momento (в данный момент).',
        examples: [
          { ro: 'Estoy comiendo', ru: 'Я ем (прямо сейчас)' },
          { ro: '¿Qué estás haciendo?', ru: 'Что ты сейчас делаешь?' },
          { ro: 'Está lloviendo', ru: 'Идёт дождь', note: 'llover → lloviendo' },
          { ro: 'Estamos estudiando español', ru: 'Мы учим испанский (сейчас)' },
          { ro: 'En este momento estoy durmiendo', ru: 'В данный момент я сплю', note: 'dormir → durmiendo' },
          { ro: 'Estaba comiendo cuando llegaste', ru: 'Я ел, когда ты пришёл', note: 'estar в imperfecto + gerundio' },
        ],
      },
      {
        id: 'gerundio-form',
        title: 'Образование герундия',
        body: 'Герундий образуется от основы инфинитива:\n— Глаголы на -ar: основа + -ando\n— Глаголы на -er/-ir: основа + -iendo\n\nЕсли основа оканчивается на гласный, -iendo → -yendo (иначе три гласных подряд): leer → leyendo, construir → construyendo, ir → yendo.\n\nГлаголы -ir с чередованием основы (те же, что в presente):\ne→i: pedir → pidiendo, servir → sirviendo, seguir → siguiendo, decir → diciendo\no→u: dormir → durmiendo, morir → muriendo',
        table: {
          headers: ['Инфинитив', 'Герундий', 'Правило'],
          rows: [
            ['hablar', 'hablando', '-ar → -ando'],
            ['comer', 'comiendo', '-er → -iendo'],
            ['vivir', 'viviendo', '-ir → -iendo'],
            ['leer', 'leyendo', 'гласный + iendo → yendo'],
            ['ir', 'yendo', 'нерегулярный'],
            ['pedir', 'pidiendo', '-ir, e→i'],
            ['dormir', 'durmiendo', '-ir, o→u'],
          ],
        },
        examples: [
          { ro: 'El niño está durmiendo', ru: 'Ребёнок спит (сейчас)', note: 'dormir → durmiendo' },
          { ro: 'Sigo leyendo el libro', ru: 'Я продолжаю читать книгу', note: 'leer → leyendo' },
          { ro: '¿Estás siguiendo?', ru: 'Ты следишь (понимаешь)?', note: 'seguir → siguiendo' },
          { ro: 'Estoy pidiendo un taxi', ru: 'Я заказываю такси', note: 'pedir → pidiendo (e→i)' },
          { ro: 'Está construyendo una casa', ru: 'Он строит дом', note: 'construir → construyendo' },
          { ro: 'Estamos viviendo momentos especiales', ru: 'Мы переживаем особые моменты' },
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────
  // 20. IMPERATIVO
  // ─────────────────────────────────────────────
  {
    id: 'imperativo',
    title: 'Imperativo',
    icon: '👉',
    description: 'Команды, просьбы, советы и инструкции',
    sections: [
      {
        id: 'imperativo-uses',
        title: 'Когда использовать',
        body: 'Imperativo — глагольная форма для прямых команд, просьб, советов и инструкций. У него нет формы yo.\n\n— Команда: ¡Ven aquí! (Иди сюда!)\n— Просьба: Habla más despacio, por favor (Говори помедленнее)\n— Совет: Come más verdura (Ешь больше овощей)\n— Инструкция: Gira a la derecha (Поверни направо)\n\nКлючевой момент: утвердительные и отрицательные формы образуются по-разному.',
        examples: [
          { ro: '¡Escúchame!', ru: 'Слушай меня!', note: 'tú, утвердительный' },
          { ro: 'Por favor, abra la ventana', ru: 'Откройте, пожалуйста, окно', note: 'usted, вежливо' },
          { ro: '¡No toques eso!', ru: 'Не трогай это!', note: 'tú, отрицательный → субхунтиво' },
          { ro: '¡Come la verdura!', ru: 'Ешь овощи!', note: 'comer → come (tú)' },
          { ro: 'Gira a la derecha en el semáforo', ru: 'Поверни направо у светофора', note: 'инструкция' },
          { ro: 'Por favor, espere un momento', ru: 'Пожалуйста, подождите минуту', note: 'esperar → espere (usted)' },
        ],
      },
      {
        id: 'imperativo-tu',
        title: 'Форма tú — правила и исключения',
        body: 'Утвердительный imperativo tú = 3-е лицо ед.ч. presente:\nhablar → habla, comer → come, escribir → escribe\n\n8 нерегулярных форм (обязательно запомнить):\ndi (decir), haz (hacer), pon (poner), sal (salir),\nsé (ser), ten (tener), ve (ir), ven (venir)\n\nОтрицательный imperativo tú = no + presente de subjuntivo:\nno hables, no comas, no escribas\nнерегулярные: no vayas (ir), no vengas (venir), no hagas (hacer)',
        table: {
          headers: ['Глагол', 'Афф. tú', 'Отриц. tú'],
          rows: [
            ['hablar', 'habla', 'no hables'],
            ['comer', 'come', 'no comas'],
            ['venir', 'ven ⚠️', 'no vengas'],
            ['tener', 'ten ⚠️', 'no tengas'],
            ['hacer', 'haz ⚠️', 'no hagas'],
            ['decir', 'di ⚠️', 'no digas'],
            ['ser', 'sé ⚠️', 'no seas'],
            ['ir', 've ⚠️', 'no vayas'],
          ],
        },
        examples: [
          { ro: '¡Ven aquí!', ru: 'Иди сюда!', note: 'venir → ven' },
          { ro: 'Hazlo ahora', ru: 'Сделай это сейчас', note: 'hacer → haz' },
          { ro: 'Di la verdad', ru: 'Говори правду', note: 'decir → di' },
          { ro: 'No vengas tarde', ru: 'Не приходи поздно', note: 'no + vengas (субхунтиво)' },
          { ro: 'Sé amable con todos', ru: 'Будь добр со всеми', note: 'ser → sé' },
          { ro: 'Ten paciencia', ru: 'Потерпи / Будь терпелив', note: 'tener → ten' },
        ],
      },
      {
        id: 'imperativo-other',
        title: 'Другие формы и местоимения',
        body: 'Usted/Ustedes и nosotros используют presente de subjuntivo — вежливые формы или предложение «давайте».\n\nVosotros (только Испания): инфинитив − r + d.\n\nМестоимения:\n— Утвердительный: присоединяются в конце → dámelo, escúchame (нужен акцент!)\n— Отрицательный: ставятся перед глаголом → no me lo des',
        table: {
          headers: ['Лицо', 'hablar', 'comer', 'venir'],
          rows: [
            ['tú', 'habla', 'come', 'ven ⚠️'],
            ['usted', 'hable', 'coma', 'venga'],
            ['nosotros', 'hablemos', 'comamos', 'vengamos'],
            ['vosotros', 'hablad', 'comed', 'venid'],
            ['ustedes', 'hablen', 'coman', 'vengan'],
          ],
        },
        examples: [
          { ro: 'Dámelo', ru: 'Дай мне это', note: 'da + me + lo, ударение сохраняется' },
          { ro: 'No me lo des', ru: 'Не давай мне это', note: 'me lo стоят перед глаголом' },
          { ro: '¡Escúchenme!', ru: 'Слушайте меня! (ustedes)', note: 'escuchen + me' },
          { ro: 'Hablad más despacio', ru: 'Говорите помедленнее (vosotros)', note: 'hablar → hablad' },
          { ro: '¡Vayamos al cine!', ru: 'Пойдём в кино!', note: 'ir → vayamos (nosotros)' },
          { ro: 'Hablen más despacio, por favor', ru: 'Говорите помедленнее, пожалуйста', note: 'hablar → hablen (ustedes)' },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────
// 21. ОТРИЦАНИЕ
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'negation',
  title: 'Отрицание',
  icon: '🚫',
  description: 'no, tampoco, ni…ni, nada, nadie, nunca — строим отрицательные предложения',
  sections: [
    {
      id: 'negation-no',
      title: 'No — базовое отрицание',
      body: 'No ставится перед спряжённым глаголом. В испанском допустимо двойное отрицание — если отрицательное слово стоит после глагола, перед глаголом обязательно стоит no.',
      table: {
        headers: ['Отрицание', 'Позиция', 'Пример'],
        rows: [
          ['no', 'перед глаголом', 'No hablo ruso.'],
          ['no … nada', 'no + гл. + nada', 'No como nada.'],
          ['no … nadie', 'no + гл. + nadie', 'No veo a nadie.'],
          ['no … nunca/jamás', 'no + гл. + nunca', 'No voy nunca allí.'],
          ['nunca/nadie/nada + гл.', 'без no', 'Nunca voy allí.'],
        ],
      },
      examples: [
        { ro: 'No entiendo nada', ru: 'Я ничего не понимаю', note: 'двойное отрицание — норма' },
        { ro: 'No veo a nadie aquí', ru: 'Я никого здесь не вижу' },
        { ro: 'Nadie sabe la respuesta', ru: 'Никто не знает ответа', note: 'nadie перед глаголом — no не нужно' },
        { ro: 'No quiero nada', ru: 'Я ничего не хочу' },
        { ro: 'No tengo tiempo', ru: 'У меня нет времени' },
        { ro: 'No sé nada de esto', ru: 'Я ничего об этом не знаю' },
      ],
    },
    {
      id: 'negation-words',
      title: 'Отрицательные слова',
      body: 'Отрицательные слова могут стоять перед глаголом (без no) или после глагола (тогда нужно no перед глаголом).',
      table: {
        headers: ['Отрицание', 'Значение', 'Пример'],
        rows: [
          ['nada', 'ничего', 'No hay nada / Nada hay'],
          ['nadie', 'никто', 'No viene nadie / Nadie viene'],
          ['nunca / jamás', 'никогда', 'No voy nunca / Nunca voy'],
          ['tampoco', 'тоже нет', '— Yo no voy. — Yo tampoco.'],
          ['ni … ni …', 'ни … ни …', 'No tengo ni tiempo ni dinero'],
          ['ningún/ninguna', 'никакой', 'No tengo ningún problema'],
        ],
      },
      examples: [
        { ro: '— Yo no como carne. — Yo tampoco.', ru: '— Я не ем мяса. — Я тоже.', note: 'tampoco = тоже нет' },
        { ro: 'No tengo ni hermanos ni hermanas', ru: 'У меня нет ни братьев, ни сестёр' },
        { ro: 'Nunca he estado en España', ru: 'Я никогда не был в Испании' },
        { ro: 'No vino nadie a la fiesta', ru: 'На вечеринку никто не пришёл' },
        { ro: 'No tengo ninguna idea', ru: 'У меня нет никакой идеи', note: 'ningún/ninguna + сущ.' },
        { ro: 'Jamás lo haré', ru: 'Я никогда этого не сделаю', note: 'jamás = сильнее, чем nunca' },
      ],
    },
  ],
});

// ─────────────────────────────────────────────
// 22. ТЕЛО ЧЕЛОВЕКА И ЗДОРОВЬЕ
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'body',
  title: 'Тело человека',
  icon: '🫀',
  description: 'Части тела, конструкция «болит» с doler, поход к врачу',
  sections: [
    {
      id: 'body-parts',
      title: 'Основные части тела',
      body: 'Части тела в испанском используются с определённым артиклем (не притяжательным), если понятно, чьё это тело: Me lavo las manos (не mis manos).',
      table: {
        headers: ['Часть тела', 'Испанский', 'Часть тела', 'Испанский'],
        rows: [
          ['голова', 'la cabeza', 'нога', 'la pierna / el pie'],
          ['лицо', 'la cara', 'рука', 'el brazo / la mano'],
          ['глаз', 'el ojo', 'спина', 'la espalda'],
          ['нос', 'la nariz', 'живот', 'el estómago'],
          ['рот', 'la boca', 'сердце', 'el corazón'],
          ['ухо', 'la oreja / el oído', 'горло', 'la garganta'],
        ],
      },
      examples: [
        { ro: 'Me duele la cabeza', ru: 'У меня болит голова', note: 'doler работает как gustar' },
        { ro: 'Me lavo las manos', ru: 'Я мою руки', note: 'las manos, не mis manos' },
        { ro: 'Tiene los ojos azules', ru: 'У него голубые глаза', note: 'los ojos, не sus ojos' },
        { ro: 'Me rompí el brazo', ru: 'Я сломал руку', note: 'артикль, не притяжательное' },
        { ro: 'Abre la boca', ru: 'Открой рот' },
        { ro: 'Le duele la espalda', ru: 'У него/неё болит спина' },
      ],
    },
    {
      id: 'body-doler',
      title: 'Конструкция «болит» — doler',
      body: 'Doler работает как gustar: подлежащее — то, что болит; косвенное дополнение — кому болит.\n\n me/te/le/nos/os/les + duele (ед.ч.) / duelen (мн.ч.)\n\nДля сказать «у меня болит голова» нельзя использовать estar — только doler или tener dolor de.',
      table: {
        headers: ['Конструкция', 'Пример', 'Перевод'],
        rows: [
          ['me duele + ед.ч.', 'Me duele el estómago', 'У меня болит желудок'],
          ['me duelen + мн.ч.', 'Me duelen los pies', 'У меня болят ноги'],
          ['tener dolor de', 'Tengo dolor de cabeza', 'У меня болит голова'],
          ['tener fiebre', 'Tengo fiebre', 'У меня температура'],
        ],
      },
      examples: [
        { ro: 'Me duele la garganta', ru: 'У меня болит горло' },
        { ro: 'Le duelen las rodillas', ru: 'У него/неё болят колени', note: 'duelen — мн.ч.' },
        { ro: 'Tengo dolor de cabeza', ru: 'У меня болит голова', note: 'альтернативная конструкция' },
        { ro: '¿Dónde te duele?', ru: 'Где у тебя болит?' },
        { ro: 'Tengo fiebre y me duele todo el cuerpo', ru: 'У меня температура и болит всё тело' },
        { ro: 'Necesito ver al médico', ru: 'Мне нужно попасть к врачу' },
      ],
    },
  ],
});

// ─────────────────────────────────────────────
// 23. КОСВЕННАЯ РЕЧЬ
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'reported-speech',
  title: 'Косвенная речь',
  icon: '💬',
  description: 'Передача чужих слов: dice que…, dijo que…, смена времён',
  sections: [
    {
      id: 'reported-present',
      title: 'Настоящее время — dice que…',
      body: 'Если глагол передачи речи стоит в настоящем времени (dice, pregunta), время в придаточном не меняется.',
      table: {
        headers: ['Прямая речь', 'Косвенная речь'],
        rows: [
          ['"Estoy cansado"', 'Dice que está cansado.'],
          ['"Tengo hambre"', 'Dice que tiene hambre.'],
          ['"Voy al trabajo"', 'Dice que va al trabajo.'],
          ['"No sé"', 'Dice que no sabe.'],
        ],
      },
      examples: [
        { ro: 'Dice que está cansado', ru: 'Он говорит, что устал', note: 'настоящее — без смены времени' },
        { ro: 'Me dice que venga mañana', ru: 'Он говорит мне прийти завтра', note: 'субхунтиво после просьбы' },
        { ro: 'Pregunta si tienes tiempo', ru: 'Он спрашивает, есть ли у тебя время', note: 'косвенный вопрос через si' },
        { ro: 'Pregunta dónde vives', ru: 'Он спрашивает, где ты живёшь' },
        { ro: 'Cuenta que ha viajado mucho', ru: 'Она рассказывает, что много путешествовала' },
        { ro: 'Explica que no puede venir', ru: 'Он объясняет, что не может прийти' },
      ],
    },
    {
      id: 'reported-past',
      title: 'Прошедшее время — dijo que…',
      body: 'Если глагол передачи речи стоит в прошедшем времени, время в придаточном сдвигается назад:\n— presente → imperfecto\n— pretérito indefinido → pluscuamperfecto\n— futuro → condicional',
      table: {
        headers: ['Прямая речь', 'Косвенная речь (dijo que…)'],
        rows: [
          ['"Estoy cansado" (presente)', 'Dijo que estaba cansado. (imperfecto)'],
          ['"Fui al médico" (indefinido)', 'Dijo que había ido al médico. (pluscuam.)'],
          ['"Vendré mañana" (futuro)', 'Dijo que vendría mañana. (condicional)'],
        ],
      },
      examples: [
        { ro: 'Dijo que estaba cansado', ru: 'Он сказал, что устал', note: 'está → estaba' },
        { ro: 'Dijo que vendría mañana', ru: 'Он сказал, что придёт завтра', note: 'vendrá → vendría' },
        { ro: 'Me preguntó si tenía tiempo', ru: 'Он спросил меня, есть ли у меня время', note: 'tienes → tenía' },
        { ro: 'Nos dijo que no podía venir', ru: 'Он сказал нам, что не может прийти' },
        { ro: 'Explicó que había olvidado el libro', ru: 'Он объяснил, что забыл книгу', note: 'pluscuamperfecto' },
        { ro: 'Dijo que lo haría más tarde', ru: 'Он сказал, что сделает это позже' },
      ],
    },
  ],
});

// ─────────────────────────────────────────────
// 24. РАЗГОВОРНЫЕ МЕХАНИКИ
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'conversation-mechanics',
  title: 'Разговорные механики',
  icon: '🗣️',
  description: 'Заполнители пауз, согласие и несогласие, переспрос, реакции',
  sections: [
    {
      id: 'conv-fillers',
      title: 'Заполнители пауз и частицы',
      body: 'Испанский разговорный язык богат на слова-связки и усилители. Без них речь звучит книжно.',
      table: {
        headers: ['Слово', 'Значение', 'Пример'],
        rows: [
          ['pues…', 'ну, итак', 'Pues, no sé... (Ну, не знаю)'],
          ['bueno', 'ну ладно, хорошо', 'Bueno, vamos. (Ну, пошли)'],
          ['o sea', 'то есть, иными словами', 'O sea, no vas. (То есть, ты не идёшь.)'],
          ['es que…', 'дело в том, что...', 'Es que no puedo. (Просто не могу.)'],
          ['a ver', 'посмотрим, давай-ка', 'A ver, dímelo. (Ну-ка, скажи мне.)'],
          ['claro', 'конечно, ясно', 'Claro que sí. (Конечно, да.)'],
          ['¡venga!', 'ладно! давай!', 'Venga, te ayudo. (Ладно, помогу тебе.)'],
        ],
      },
      examples: [
        { ro: 'Pues no sé qué decirte', ru: 'Ну, не знаю, что тебе сказать' },
        { ro: 'Bueno, si tú lo dices', ru: 'Ну ладно, раз ты так говоришь' },
        { ro: 'Es que estoy muy cansado', ru: 'Просто я очень устал', note: 'es que = мягкое объяснение/оправдание' },
        { ro: 'A ver, ¿cómo te llamas?', ru: 'Ну-ка, как тебя зовут?' },
        { ro: 'O sea, no vas a venir', ru: 'То есть ты не придёшь?' },
        { ro: '¡Venga, no te preocupes!', ru: 'Ладно, не волнуйся!' },
      ],
    },
    {
      id: 'conv-agree',
      title: 'Согласие, несогласие, переспрос',
      body: 'Богатый набор реакций делает речь живой. Простое sí/no звучит резко.',
      table: {
        headers: ['Фраза', 'Перевод', 'Когда'],
        rows: [
          ['Claro / Claro que sí', 'Конечно', 'согласие'],
          ['Exactamente / Exacto', 'Точно / Именно', 'подтверждение'],
          ['Tienes razón', 'Ты прав', 'согласие'],
          ['No estoy de acuerdo', 'Я не согласен', 'несогласие'],
          ['Depende', 'Зависит', 'уклонение'],
          ['¿Cómo?', 'Что? Простите?', 'переспрос' ],
          ['¿Puedes repetir?', 'Можешь повторить?', 'переспрос' ],
          ['Más despacio, por favor', 'Помедленнее, пожалуйста', 'переспрос' ],
        ],
      },
      examples: [
        { ro: '¡Claro que sí! Voy contigo', ru: 'Конечно! Я иду с тобой' },
        { ro: 'Tienes razón, lo haré así', ru: 'Ты прав, я так и сделаю' },
        { ro: '¿Cómo? No te he escuchado bien', ru: 'Что? Я тебя не очень расслышал' },
        { ro: 'No estoy de acuerdo con eso', ru: 'Я с этим не согласен' },
        { ro: '¿Puedes hablar más despacio?', ru: 'Можешь говорить помедленнее?' },
        { ro: '¿Qué significa esa palabra?', ru: 'Что означает это слово?' },
      ],
    },
    {
      id: 'conv-reactions',
      title: 'Устойчивые фразы-реакции',
      body: 'Многие реакции строятся по модели ¡Qué + прилагательное!: ¡Qué bien!, ¡Qué pena!, ¡Qué raro!. Модель продуктивна — можно подставить любое подходящее прилагательное. Восклицательные предложения в испанском обрамляются ¡ … !.',
      table: {
        headers: ['Фраза', 'Перевод', 'Когда'],
        rows: [
          ['¡Qué bien!', 'Как хорошо! Отлично!', 'радость' ],
          ['¡Qué pena!', 'Как жаль!', 'сочувствие' ],
          ['¡Qué asco!', 'Какая гадость!', 'отвращение' ],
          ['¡No me digas!', 'Да ты что! Не может быть!', 'удивление' ],
          ['¡Qué va!', 'Ну что ты! Вовсе нет!', 'возражение' ],
          ['¡Ánimo!', 'Давай! Не сдавайся!', 'поддержка' ],
          ['Lo siento', 'Мне жаль', 'извинение/сочувствие' ],
          ['¡Enhorabuena!', 'Поздравляю!', 'поздравление' ],
        ],
      },
      examples: [
        { ro: '¡Qué bien que hayas venido!', ru: 'Как хорошо, что ты пришёл!' },
        { ro: '¡Qué pena! No puedo ir', ru: 'Как жаль! Не смогу пойти' },
        { ro: '¡No me digas! ¿De verdad?', ru: 'Да ты что! Правда?' },
        { ro: 'Lo siento mucho', ru: 'Мне очень жаль' },
        { ro: '¡Enhorabuena por el nuevo trabajo!', ru: 'Поздравляю с новой работой!' },
        { ro: '¡Ánimo, ya casi llegas!', ru: 'Давай, ты почти у цели!' },
      ],
    },
  ],
});

// ─────────────────────────────────────────────
// 25. ПАССИВНЫЙ ЗАЛОГ
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'passive',
  title: 'Пассивный залог',
  icon: '🔄',
  description: 'Pasiva refleja (se + verbo) и pasiva perifrástica (ser + participio)',
  sections: [
    {
      id: 'passive-se',
      title: 'Pasiva refleja — se + глагол',
      body: 'Самый частый способ выражения пассива в разговорном испанском — конструкция se + глагол в 3-м лице. Деятель не упоминается. Глагол согласуется с подлежащим в числе.\n\nИспользуется для:\n— Объявлений, вывесок, инструкций\n— Обобщённых утверждений («говорят, что...»)\n— Описания процессов без указания исполнителя',
      table: {
        headers: ['Пример', 'Перевод'],
        rows: [
          ['Se habla español aquí.', 'Здесь говорят по-испански.'],
          ['Se venden pisos.', 'Продаются квартиры.'],
          ['Se alquila habitación.', 'Сдаётся комната.'],
          ['Se prohibe fumar.', 'Курить запрещено.'],
          ['Se dice que...', 'Говорят, что...'],
        ],
      },
      examples: [
        { ro: 'Se habla español en 20 países', ru: 'На испанском говорят в 20 странах' },
        { ro: 'Se vende piso en el centro', ru: 'Продаётся квартира в центре', note: 'объявление о продаже' },
        { ro: 'Se alquila habitación', ru: 'Сдаётся комната', note: 'объявление' },
        { ro: 'Se dice que va a llover', ru: 'Говорят, что будет дождь' },
        { ro: 'Aquí se come muy bien', ru: 'Здесь очень хорошо кормят', note: 'обобщение' },
        { ro: 'Se aceptan tarjetas de crédito', ru: 'Принимаются кредитные карты', note: 'множественное число' },
      ],
    },
    {
      id: 'passive-ser',
      title: 'Pasiva perifrástica — ser + participio',
      body: 'Конструкция ser + participio пассива — аналог русского «был сделан». Причастие согласуется с подлежащим в роде и числе. Часто используется в письменном, официальном и журналистском языке.\n\nДеятель вводится через предлог por: La carta fue escrita por el director.',
      table: {
        headers: ['Лицо', 'Пример', 'Перевод'],
        rows: [
          ['ед.ч. м.р.', 'El libro fue escrito por García Márquez.', 'Книга написана Г. Маркесом.'],
          ['ед.ч. ж.р.', 'La ley fue aprobada.', 'Закон был принят.'],
          ['мн.ч. м.р.', 'Los edificios fueron destruidos.', 'Здания были разрушены.'],
        ],
      },
      examples: [
        { ro: 'La carta fue escrita por ella', ru: 'Письмо было написано ею', note: 'por + деятель' },
        { ro: 'El puente fue construido en 1900', ru: 'Мост был построен в 1900 году' },
        { ro: 'Los ladrones fueron detenidos', ru: 'Воры были задержаны' },
        { ro: 'La novela es leída por millones', ru: 'Роман читается миллионами', note: 'ser в presente = текущее состояние' },
        { ro: 'El problema ha sido resuelto', ru: 'Проблема была решена', note: 'с haber — сложное время' },
        { ro: 'Los heridos fueron llevados al hospital', ru: 'Раненые были доставлены в больницу' },
      ],
    },
  ],
});

// ─────────────────────────────────────────────
// 26. СОЮЗЫ
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'conjunctions',
  title: 'Союзы',
  icon: '🔗',
  description: 'Сочинительные и подчинительные союзы — pero, sino, aunque, porque, si…',
  sections: [
    {
      id: 'conjunctions-coord',
      title: 'Сочинительные союзы',
      body: 'Соединяют равноправные части. Важная пара: pero vs sino.\n\n— pero (но) — противопоставление после утвердительного\n— sino (а, но) — противопоставление после отрицательного: заменяет то, что отвергнуто\n— sino que — то же, но перед придаточным с глаголом',
      table: {
        headers: ['Союз', 'Значение', 'Пример'],
        rows: [
          ['y / e', 'и (e перед i/hi)', 'pan y agua; padre e hijo'],
          ['o / u', 'или (u перед o/ho)', 'café o té; mujer u hombre'],
          ['pero', 'но (после утверд.)', 'Es difícil pero interesante.'],
          ['sino', 'а, но (после отриц.)', 'No es ruso, sino ucraniano.'],
          ['sino que', 'а (перед придаточным)', 'No descansó sino que trabajó.'],
          ['ni … ni', 'ни … ни', 'No tengo ni tiempo ni dinero.'],
        ],
      },
      examples: [
        { ro: 'Quiero café o té', ru: 'Хочу кофе или чай' },
        { ro: 'Es cansado pero feliz', ru: 'Он устал, но счастлив', note: 'pero после утвердительного' },
        { ro: 'No es alemán, sino austriaco', ru: 'Он не немец, а австриец', note: 'sino заменяет отвергнутое' },
        { ro: 'No fue al cine sino al teatro', ru: 'Он пошёл не в кино, а в театр' },
        { ro: 'Habla español e italiano', ru: 'Она говорит по-испански и по-итальянски', note: 'e перед i' },
        { ro: 'No descansó sino que siguió trabajando', ru: 'Он не отдыхал, а продолжал работать', note: 'sino que + глагол' },
      ],
    },
    {
      id: 'conjunctions-sub',
      title: 'Подчинительные союзы',
      body: 'Вводят придаточные предложения. Главный вопрос: после союза нужен индикатив или субхунтиво?\n\n— porque (потому что) → индикатив (факт)\n— para que (чтобы, с целью) → субхунтиво\n— aunque (хотя, даже если) → индикатив (факт) или субхунтиво (гипотеза)\n— cuando (когда) → индикатив (прошлое/настоящее), субхунтиво (будущее!)\n— si (если) → индикатив (реальное), imperfecto subjuntivo (гипотеза)',
      table: {
        headers: ['Союз', 'Значение', 'Наклонение'],
        rows: [
          ['porque', 'потому что', 'индикатив'],
          ['para que', 'чтобы (цель)', 'субхунтиво'],
          ['aunque', 'хотя / даже если', 'инд. (факт) / субх. (гипотеза)'],
          ['cuando', 'когда', 'инд. (прош./наст.) / субх. (буд.)'],
          ['si', 'если', 'инд. (реально) / impf. subj. (гипотеза)'],
          ['como', 'так как, поскольку', 'индикатив'],
        ],
      },
      examples: [
        { ro: 'No fui porque estaba cansado', ru: 'Я не пошёл, потому что устал', note: 'porque + индикатив' },
        { ro: 'Te lo digo para que lo sepas', ru: 'Говорю тебе, чтобы ты знал', note: 'para que + субхунтиво' },
        { ro: 'Aunque es difícil, lo haré', ru: 'Хотя это трудно, я сделаю', note: 'aunque + инд. = реальный факт' },
        { ro: 'Llámame cuando llegues', ru: 'Позвони мне, когда приедешь', note: 'cuando + субхунтиво (будущее!)' },
        { ro: 'Si tienes tiempo, ven', ru: 'Если у тебя есть время, приходи', note: 'si + индикатив = реальное условие' },
        { ro: 'Si tuviera dinero, viajaría', ru: 'Если бы у меня были деньги, я бы путешествовал', note: 'si + impf. subj. = гипотеза' },
      ],
    },
  ],
});

// ─────────────────────────────────────────────
// 27. СИТУАТИВНЫЕ ДИАЛОГИ
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'dialogues',
  title: 'Ситуативные диалоги',
  icon: '💬',
  description: 'Живые фразы для реальных ситуаций — знакомство, кафе, транспорт, покупки',
  sections: [
    {
      id: 'dialogues-intro',
      title: 'Знакомство',
      body: 'При знакомстве ¿cómo te llamas? — неформально (к ровеснику), ¿cómo se llama? — формально. Профессию называют без артикля: soy estudiante, soy médico. Возраст через tener: tengo veinte años — буквально «у меня есть 20 лет».',
      examples: [
        { ro: '— ¿Cómo te llamas? — Me llamo Ана.', ru: '— Как тебя зовут? — Меня зовут Ана.' },
        { ro: '— ¿De dónde eres? — Soy de Rusia.', ru: '— Откуда ты? — Я из России.' },
        { ro: '— ¿A qué te dedicas? — Soy estudiante.', ru: '— Чем ты занимаешься? — Я студент.', note: 'a qué te dedicas = чем занимаешься' },
        { ro: '— ¿Cuánto tiempo llevas aquí? — Llevo dos años.', ru: '— Как давно ты здесь? — Два года.', note: 'llevar + tiempo = находиться X времени' },
        { ro: 'Encantado / Encantada de conocerte', ru: 'Приятно познакомиться' },
        { ro: 'Igualmente', ru: 'Взаимно' },
      ],
    },
    {
      id: 'dialogues-cafe',
      title: 'В кафе и ресторане',
      body: 'Заказ строится на конструкции para mí + блюдо (буквально «для меня»). Официанта привлекают через oiga (формально) или perdona. Счёт просят через ¿me trae la cuenta? Глагол ir a tomar используется официантами вместо querer — это вежливее.',
      examples: [
        { ro: '¿Qué van a tomar?', ru: 'Что будете заказывать?', note: 'фраза официанта' },
        { ro: 'Para mí, un café con leche, por favor', ru: 'Мне кофе с молоком, пожалуйста' },
        { ro: '¿Me trae la cuenta, por favor?', ru: 'Принесите счёт, пожалуйста?' },
        { ro: '¿Está incluido el servicio?', ru: 'Сервис включён?' },
        { ro: 'Querría reservar una mesa para dos personas', ru: 'Я бы хотел забронировать столик на двоих' },
        { ro: '¿Qué me recomienda?', ru: 'Что вы рекомендуете?', note: 'recomienda = recomendar (usted)' },
      ],
    },
    {
      id: 'dialogues-transport',
      title: 'Транспорт и ориентирование',
      body: 'При запросе пути: ¿cómo se llega a…? (как добраться до). Инструкции: gire a la izquierda/derecha (повернуть — usted), siga todo recto (прямо). Билет: billete de ida (в одну сторону), de ida y vuelta (туда-обратно).',
      examples: [
        { ro: 'Perdona, ¿cómo se llega a la estación?', ru: 'Извини, как добраться до вокзала?' },
        { ro: 'Gira a la izquierda / a la derecha', ru: 'Поверни налево / направо' },
        { ro: 'Está a cinco minutos a pie', ru: 'Это в пяти минутах пешком' },
        { ro: '¿A qué hora sale el próximo tren?', ru: 'Когда отправляется следующий поезд?' },
        { ro: 'Un billete de ida y vuelta, por favor', ru: 'Один билет туда и обратно, пожалуйста' },
        { ro: '¿Dónde está la parada de metro?', ru: 'Где станция метро?' },
      ],
    },
    {
      id: 'dialogues-shopping',
      title: 'В магазине',
      body: 'Продавец спрашивает ¿le puedo ayudar? Покупатель может ответить solo estoy mirando (просто смотрю). Размер одежды — talla, обуви — número. Скидка — descuento, распродажа — rebajas.',
      examples: [
        { ro: '— ¿Le puedo ayudar? — Solo estoy mirando, gracias.', ru: '— Могу помочь? — Просто смотрю, спасибо.' },
        { ro: '¿Tienen esto en talla M?', ru: 'У вас есть это в размере M?' },
        { ro: '¿Puedo probármelo? ¿Dónde está el probador?', ru: 'Можно примерить? Где примерочная?' },
        { ro: '¿Cuánto cuesta? / ¿Cuánto vale?', ru: 'Сколько стоит?' },
        { ro: '¿Tienen descuento? ¿Hay rebajas?', ru: 'Есть скидка? Идёт распродажа?' },
        { ro: 'Me lo llevo. ¿Puedo pagar con tarjeta?', ru: 'Беру. Можно оплатить картой?' },
      ],
    },
    {
      id: 'dialogues-health',
      title: 'У врача и о здоровье',
      body: 'Боль выражается через doler (me duele la cabeza) или tener dolor de. Симптомы: tener fiebre (температура), tos (кашель), resfriado (насморк). Врач — médico, рецепт — receta, аптека — farmacia.',
      examples: [
        { ro: 'Me duele la cabeza y tengo fiebre.', ru: 'У меня болит голова и температура.' },
        { ro: 'Me duele la garganta desde hace tres días.', ru: 'У меня болит горло уже три дня.' },
        { ro: 'Tengo tos y mocos.', ru: 'У меня кашель и насморк.' },
        { ro: '— ¿Necesito receta? — Sí, voy a recetarle algo.', ru: '— Нужен рецепт? — Да, я вам что-нибудь выпишу.' },
        { ro: 'Soy alérgico/a a la penicilina.', ru: 'У меня аллергия на пенициллин.' },
        { ro: 'Me siento muy cansado/a y mareado/a.', ru: 'Я чувствую себя очень усталым/ой и кружится голова.' },
      ],
    },
    {
      id: 'dialogues-phone',
      title: 'По телефону',
      body: 'Звонок начинается с ¿Dígame? или ¿Sí? (аналог «алло»). Представляются: soy + имя. Попросить к телефону: ¿está + имя? Если нет — no está, está fuera. Попросить перезвонить: ¿puede llamar más tarde?',
      examples: [
        { ro: '— ¿Dígame? — Hola, soy María, ¿está Carlos?', ru: '— Алло? — Привет, это Мария, Карлос дома?' },
        { ro: '— Lo siento, no está. — ¿Puede llamar más tarde?', ru: '— Извините, его нет. — Он может перезвонить позже?' },
        { ro: '¿Quiere dejar un mensaje?', ru: 'Хотите оставить сообщение?' },
        { ro: '¿Puede hablar más despacio, por favor?', ru: 'Вы могли бы говорить помедленнее, пожалуйста?' },
        { ro: 'La línea está cortando, no le oigo bien.', ru: 'Плохая связь, я вас плохо слышу.' },
        { ro: 'Le paso con el señor García.', ru: 'Соединяю вас с господином Гарсиа.', note: 'Le — usted' },
      ],
    },
  ],
});

// ─────────────────────────────────────────────
// 28. УСТОЙЧИВЫЕ ВЫРАЖЕНИЯ И ФРАЗЕОЛОГИЯ
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'phraseology',
  title: 'Устойчивые выражения',
  icon: '🧩',
  description: 'Глагольные идиомы, дискурсивные связки, повседневные реакции',
  sections: [
    {
      id: 'phrase-verbs',
      title: 'Глагольные устойчивые сочетания',
      body: 'Испанские идиомы строятся на tener, hacer, dar, echar, llevar. Смысл часто непредсказуем — tener ganas de (хотеть) буквально «иметь желание». Echar + существительное заменяет глагол: echar una ojeada = mirar.',
      examples: [
        { ro: 'tener ganas de + inf.', ru: 'хотеть, иметь желание что-то сделать' },
        { ro: 'darse cuenta de', ru: 'осознавать, замечать' },
        { ro: 'hacer caso (de)', ru: 'обращать внимание, слушаться' },
        { ro: 'echar de menos', ru: 'скучать (по кому-то / чему-то)' },
        { ro: 'llevar + tiempo + gerundio', ru: 'делать что-то уже X времени', note: 'llevo dos años viviendo aquí' },
        { ro: 'ponerse + adj.', ru: 'стать, сделаться (об эмоциях)', note: 'se puso rojo = покраснел' },
      ],
    },
    {
      id: 'phrase-connectors',
      title: 'Дискурсивные связки',
      body: 'Связки организуют речь: добавление (además, también, encima), противопоставление (sin embargo, en cambio, aunque), следствие (por lo tanto, así que, entonces), уточнение (es decir, o sea), итог (en resumen, total que).',
      examples: [
        { ro: 'Es caro; sin embargo, vale la pena.', ru: 'Это дорого; однако оно того стоит.', note: 'sin embargo = противопоставление' },
        { ro: 'No tenía ganas, así que me quedé en casa.', ru: 'Не хотелось, поэтому остался дома.', note: 'así que = следствие' },
        { ro: 'Es simpático, o sea, siempre ayuda.', ru: 'Он приятный, то есть всегда помогает.', note: 'o sea = уточнение' },
        { ro: 'Además, hay que considerar el precio.', ru: 'К тому же, надо учитывать цену.', note: 'además = добавление' },
        { ro: 'En resumen, no sé qué hacer.', ru: 'В общем, не знаю, что делать.', note: 'en resumen = итог' },
        { ro: 'Trabajé todo el día; en cambio, él no hizo nada.', ru: 'Я работал весь день; а он не сделал ничего.', note: 'en cambio = контраст' },
      ],
    },
    {
      id: 'phrase-everyday',
      title: 'Повседневные фразы-реакции',
      body: 'Готовые блоки для реакций на новости, согласия, удивления. Их не конструируют по правилам, а выучивают целиком. ¡Menos mal! — облегчение; ¡Qué va! — отрицание/несогласие; ¡Venga! — согласие или подбадривание.',
      examples: [
        { ro: '— Aprobé el examen. — ¡Menos mal! / ¡Qué bien!', ru: '— Я сдал экзамен. — Слава богу! / Как здорово!' },
        { ro: '— Lo siento. — ¡No pasa nada! / ¡No te preocupes!', ru: '— Мне жаль. — Ничего! / Не переживай!' },
        { ro: '¡Qué va, eso no puede ser!', ru: 'Да ладно, не может быть!' },
        { ro: '¡Venga, anímate!', ru: 'Давай, не унывай!', note: 'Venga = подбадривание' },
        { ro: '— ¿Te apetece salir? — ¡Con mucho gusto!', ru: '— Хочешь выйти? — С большим удовольствием!' },
        { ro: '¡Menos mal que llegaste a tiempo!', ru: 'Хорошо, что ты успел вовремя!' },
      ],
    },
  ],
});
