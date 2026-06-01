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
    description: 'Два глагола «быть» — одна из главных особенностей испанского',
    sections: [
      {
        id: 'ser-uses',
        title: 'Ser — постоянные характеристики',
        body: 'Ser используется для:\n— Постоянных характеристик (личность, характер, происхождение)\n— Профессии и национальности\n— Принадлежности (чей?)\n— Времени и даты\n— Пассивного залога',
        examples: [
          { ro: 'Soy ruso', ru: 'Я русский', note: 'национальность' },
          { ro: 'Ella es médica', ru: 'Она врач', note: 'профессия' },
          { ro: 'Este libro es de Ana', ru: 'Эта книга Аны', note: 'принадлежность' },
          { ro: 'Son las tres', ru: 'Сейчас три часа', note: 'время' },
          { ro: 'Es inteligente', ru: 'Он умный', note: 'характер' },
        ],
      },
      {
        id: 'estar-uses',
        title: 'Estar — временные состояния',
        body: 'Estar используется для:\n— Временного состояния (настроение, здоровье)\n— Местонахождения (где?)\n— Прогрессивного времени (estar + gerundio)\n— Результата действия',
        examples: [
          { ro: 'Estoy cansado', ru: 'Я устал', note: 'временное состояние' },
          { ro: 'Estamos en Madrid', ru: 'Мы в Мадриде', note: 'местонахождение' },
          { ro: 'Está comiendo', ru: 'Он сейчас ест', note: 'прогрессивное время' },
          { ro: 'La puerta está abierta', ru: 'Дверь открыта', note: 'результат действия' },
        ],
      },
      {
        id: 'ser-estar-difference',
        title: 'Разница в значении',
        body: 'Некоторые прилагательные меняют смысл в зависимости от ser или estar.',
        table: {
          headers: ['Прилагательное', 'С ser', 'С estar'],
          rows: [
            ['listo', 'умный (ser listo)', 'готов (estar listo)'],
            ['malo', 'плохой по характеру', 'больной, плохо себя чувствует'],
            ['bueno', 'добрый по характеру', 'вкусный, в хорошей форме'],
            ['aburrido', 'скучный (человек)', 'скучает (сейчас)'],
            ['seguro', 'безопасный', 'уверен (в чём-то)'],
          ],
        },
        examples: [
          { ro: 'Es malo', ru: 'Он злой (по характеру)' },
          { ro: 'Está malo', ru: 'Он болен (сейчас)' },
          { ro: 'Es listo', ru: 'Он умный' },
          { ro: 'Está listo', ru: 'Он готов' },
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
        ],
      },
      {
        id: 'presente-irregular',
        title: 'Неправильные глаголы',
        body: 'Самые частые неправильные глаголы в настоящем времени.',
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
        ],
      },
      {
        id: 'presente-irregular2',
        title: 'Неправильные глаголы (продолжение)',
        body: 'Ещё важные глаголы с нерегулярными формами в настоящем времени.',
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
        body: 'Числа от 1 до 20 и далее. Число 1 согласуется с родом: un libro, una mesa.',
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
        body: 'Возвратные глаголы в словаре всегда заканчиваются на -se: llamarse, levantarse, ducharse. При спряжении -se превращается в возвратное местоимение, которое ставится перед глаголом.\n\nВозвратные местоимения: me, te, se, nos, os, se',
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
        ],
      },
      {
        id: 'reflexive-common',
        title: 'Частые возвратные глаголы',
        body: 'Многие глаголы повседневной рутины — возвратные.',
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
        body: 'Базовые предлоги места, времени и связи.',
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
        body: 'Субхунтиво — не время, а наклонение. Используется после:\n— Глаголов желания и воли: querer que, desear que, esperar que\n— Эмоций: alegrarse de que, tener miedo de que\n— Сомнения и отрицания: no creer que, dudar que\n— Безличных конструкций: es importante que, es necesario que\n— Ojalá (= дай Бог, хотелось бы)\n\nКлюч: если в предложении два субъекта и разные желания → субхунтиво.',
        examples: [
          { ro: 'Quiero que vengas', ru: 'Я хочу, чтобы ты пришёл', note: 'два субъекта: я хочу, ты приходишь' },
          { ro: 'Es importante que estudies', ru: 'Важно, чтобы ты учился' },
          { ro: 'No creo que sea verdad', ru: 'Не думаю, что это правда' },
          { ro: 'Ojalá tengas razón', ru: 'Хотелось бы, чтобы ты был прав' },
          { ro: 'Espero que llueva', ru: 'Надеюсь, что пойдёт дождь' },
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
          { ro: 'Quiero que hables más despacio', ru: 'Хочу, чтобы ты говорил медленнее' },
          { ro: 'Es necesario que comamos bien', ru: 'Необходимо, чтобы мы хорошо питались' },
        ],
      },
      {
        id: 'subjuntivo-irregular',
        title: 'Неправильные глаголы (DISHES)',
        body: 'Шесть полностью неправильных глаголов в субхунтиво — запоминают по акрониму DISHES: Dar, Ir, Saber, Haber, Estar, Ser.\n\nHaber: haya, hayas, haya, hayamos, hayáis, hayan (используется в сложных временах: espero que haya venido).',
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
        body: 'Condicional Simple соответствует русскому «бы»:\n— Вежливые просьбы и предложения\n— Гипотетические ситуации: «что было бы, если бы...»\n— Предположения о прошлом\n— В условных конструкциях: Si + imperfecto subjuntivo + condicional',
        examples: [
          { ro: '¿Podrías ayudarme?', ru: 'Ты мог бы мне помочь?', note: 'вежливая просьба' },
          { ro: 'Me gustaría un café', ru: 'Я бы хотел кофе', note: 'мягче, чем quiero' },
          { ro: 'Si tuviera dinero, viajaría', ru: 'Если бы у меня были деньги, я бы путешествовал' },
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
        ],
      },
    ],
  },
];
