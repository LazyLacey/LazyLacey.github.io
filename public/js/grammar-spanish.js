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
    ],
  },
];
