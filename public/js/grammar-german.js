// Данные грамматики для немецкого языка.
// Загружается динамически через import() в init() — должен писать на window.

window.grammarTopics = [
  // ─────────────────────────────────────────────
  // 1. РОД И АРТИКЛИ
  // ─────────────────────────────────────────────
  {
    id: 'articles',
    title: 'Род и артикли',
    icon: '🏷️',
    description: 'Три рода, определённый и неопределённый артикль, изменение по падежам',
    sections: [
      {
        id: 'articles-gender',
        title: 'Три рода',
        body: 'В немецком три рода: мужской (der), женский (die) и средний (das). Артикль — отдельное слово перед существительным. Род нужно учить вместе с каждым словом — правил мало, исключений много. Совет: всегда учи «der Tisch», а не просто «Tisch».',
        table: {
          headers: ['Род', 'Артикль', 'Пример', 'Перевод'],
          rows: [
            ['мужской (Maskulinum)', 'der', 'der Mann', 'мужчина'],
            ['женский (Femininum)', 'die', 'die Frau', 'женщина'],
            ['средний (Neutrum)', 'das', 'das Kind', 'ребёнок'],
            ['множественное число', 'die', 'die Kinder', 'дети'],
          ],
        },
        examples: [
          { ro: 'der Hund', ru: 'собака (м.р.)', note: 'определённый артикль' },
          { ro: 'die Katze', ru: 'кошка (ж.р.)' },
          { ro: 'das Buch', ru: 'книга (ср.р.)' },
          { ro: 'die Bücher', ru: 'книги (мн.ч.) — всегда die' },
          { ro: 'die Musik', ru: 'музыка (ж.р.)' },
          { ro: 'das Wasser', ru: 'вода (ср.р.)' },
        ],
      },
      {
        id: 'articles-definite',
        title: 'Определённый артикль (der, die, das)',
        body: 'Определённый артикль меняется в зависимости от рода и падежа. Это одно из ключевых отличий немецкого — за падежом следит артикль, а не окончание слова. В именительном падеже: der (м.р.), die (ж.р.), das (ср.р.), die (мн.ч.).',
        table: {
          headers: ['Падеж', 'м.р.', 'ж.р.', 'ср.р.', 'мн.ч.'],
          rows: [
            ['Nominativ (Им.)', 'der', 'die', 'das', 'die'],
            ['Akkusativ (Вин.)', 'den', 'die', 'das', 'die'],
            ['Dativ (Дат.)', 'dem', 'der', 'dem', 'den'],
            ['Genitiv (Род.)', 'des', 'der', 'des', 'der'],
          ],
        },
        examples: [
          { ro: 'Der Mann schläft.', ru: 'Мужчина спит.', note: 'Nominativ — субъект' },
          { ro: 'Ich sehe den Mann.', ru: 'Я вижу мужчину.', note: 'Akkusativ — прямой объект' },
          { ro: 'Ich helfe dem Mann.', ru: 'Я помогаю мужчине.', note: 'Dativ — косвенный объект' },
          { ro: 'Das ist das Buch des Mannes.', ru: 'Это книга мужчины.', note: 'Genitiv — принадлежность' },
          { ro: 'Ich gebe der Frau die Blumen.', ru: 'Я даю женщине цветы.', note: 'Dativ ж.р. → der' },
          { ro: 'Die Farbe des Himmels ist blau.', ru: 'Цвет неба голубой.', note: 'Genitiv ср.р. → des' },
        ],
      },
      {
        id: 'articles-indefinite',
        title: 'Неопределённый артикль (ein, eine)',
        body: 'Неопределённый артикль обозначает неизвестный или неуточнённый предмет. У него нет формы для множественного числа. Склоняется почти как определённый, но у него есть нулевые окончания в нескольких формах (Nominativ м.р./ср.р.).',
        table: {
          headers: ['Падеж', 'м.р.', 'ж.р.', 'ср.р.', 'мн.ч.'],
          rows: [
            ['Nominativ', 'ein', 'eine', 'ein', '—'],
            ['Akkusativ', 'einen', 'eine', 'ein', '—'],
            ['Dativ', 'einem', 'einer', 'einem', '—'],
            ['Genitiv', 'eines', 'einer', 'eines', '—'],
          ],
        },
        examples: [
          { ro: 'Ein Hund bellt.', ru: 'Какая-то собака лает.', note: 'Nominativ м.р.' },
          { ro: 'Ich habe eine Katze.', ru: 'У меня есть кошка.', note: 'Akkusativ ж.р.' },
          { ro: 'Ich gebe einem Kind ein Eis.', ru: 'Я даю ребёнку мороженое.', note: 'Dativ ср.р.' },
          { ro: 'Das ist das Buch eines Kindes.', ru: 'Это книга ребёнка.', note: 'Genitiv ср.р.' },
          { ro: 'Ich wohne in einer Wohnung.', ru: 'Я живу в квартире.', note: 'Dativ ж.р. → einer' },
          { ro: 'Er liest ein interessantes Buch.', ru: 'Он читает интересную книгу.', note: 'Akkusativ ср.р.' },
        ],
      },
      {
        id: 'articles-kein',
        title: 'Отрицательный артикль kein',
        body: 'Kein/keine — отрицание существительного. Означает «никакой», «ни одного». Склоняется точно как неопределённый артикль ein, но имеет формы и во множественном числе (keine).',
        table: {
          headers: ['Падеж', 'м.р.', 'ж.р.', 'ср.р.', 'мн.ч.'],
          rows: [
            ['Nominativ', 'kein', 'keine', 'kein', 'keine'],
            ['Akkusativ', 'keinen', 'keine', 'kein', 'keine'],
            ['Dativ', 'keinem', 'keiner', 'keinem', 'keinen'],
            ['Genitiv', 'keines', 'keiner', 'keines', 'keiner'],
          ],
        },
        examples: [
          { ro: 'Ich habe kein Geld.', ru: 'У меня нет денег.', note: 'ср.р., Akkusativ' },
          { ro: 'Das ist kein Problem.', ru: 'Это не проблема.', note: 'ср.р., Nominativ' },
          { ro: 'Ich sehe keine Kinder.', ru: 'Я не вижу детей.', note: 'мн.ч., Akkusativ' },
          { ro: 'Er hat keinen Bruder.', ru: 'У него нет брата.', note: 'м.р., Akkusativ' },
          { ro: 'Wir haben keine Zeit.', ru: 'У нас нет времени.', note: 'ж.р., Akkusativ → keine' },
          { ro: 'Keine Ahnung!', ru: 'Понятия не имею!', note: 'ж.р., Nom.' },
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
    description: 'Множественное число, склонение, n-склонение',
    sections: [
      {
        id: 'nouns-plural',
        title: 'Множественное число',
        body: 'Множественное число в немецком образуется непредсказуемо — у каждого слова нужно учить его форму. Общий принцип: артикль во мн.ч. всегда «die». Самые частые способы образования мн.ч.: добавление -e, -er, -en/-n, -s, умлаут (ä/ö/ü) или нулевое окончание.',
        table: {
          headers: ['Тип', 'Ед. число', 'Мн. число', 'Перевод'],
          rows: [
            ['-e (часто м.р.)', 'der Hund', 'die Hunde', 'собака → собаки'],
            ['-e + умлаут', 'der Vater', 'die Väter', 'отец → отцы'],
            ['-er (часто ср.р.)', 'das Kind', 'die Kinder', 'ребёнок → дети'],
            ['-er + умлаут', 'das Buch', 'die Bücher', 'книга → книги'],
            ['-en/-n (часто ж.р.)', 'die Frau', 'die Frauen', 'женщина → женщины'],
            ['-s (заимствования)', 'das Auto', 'die Autos', 'машина → машины'],
            ['нулевое', 'das Zimmer', 'die Zimmer', 'комната → комнаты'],
          ],
        },
        examples: [
          { ro: 'ein Kind / zwei Kinder', ru: 'один ребёнок / двое детей' },
          { ro: 'eine Frau / drei Frauen', ru: 'одна женщина / три женщины' },
          { ro: 'ein Auto / viele Autos', ru: 'одна машина / много машин' },
          { ro: 'ein Mann / zwei Männer', ru: 'один мужчина / двое мужчин', note: 'умлаут' },
          { ro: 'ein Buch / drei Bücher', ru: 'одна книга / три книги', note: '-er + умлаут' },
          { ro: 'ein Haus / viele Häuser', ru: 'один дом / много домов' },
        ],
      },
      {
        id: 'nouns-cases',
        title: 'Четыре падежа',
        body: 'Немецкий имеет четыре падежа. Nominativ — субъект действия. Akkusativ — прямой объект (кого? что?). Dativ — косвенный объект (кому? чему?). Genitiv — принадлежность (чего?). Падеж показывает артикль, а не окончание существительного.',
        table: {
          headers: ['Падеж', 'Вопрос', 'Роль', 'Пример'],
          rows: [
            ['Nominativ', 'Wer? Was?', 'субъект', 'Der Hund bellt.'],
            ['Akkusativ', 'Wen? Was?', 'прямой объект', 'Ich sehe den Hund.'],
            ['Dativ', 'Wem?', 'косвенный объект', 'Ich gebe dem Hund Futter.'],
            ['Genitiv', 'Wessen?', 'принадлежность', 'Das Halsband des Hundes.'],
          ],
        },
        examples: [
          { ro: 'Der Mann kauft das Buch.', ru: 'Мужчина покупает книгу.', note: 'Mann — Nom, Buch — Akk' },
          { ro: 'Ich gebe der Frau das Buch.', ru: 'Я даю женщине книгу.', note: 'Frau — Dat, Buch — Akk' },
          { ro: 'Das ist das Auto des Mannes.', ru: 'Это машина мужчины.', note: 'Mannes — Gen, -es окончание' },
          { ro: 'Ich schenke der Mutter Blumen.', ru: 'Я дарю маме цветы.', note: 'Mutter — Dat., Blumen — Akk.' },
          { ro: 'Das Fahrrad des Kindes ist rot.', ru: 'Велосипед ребёнка красный.', note: 'Kindes — Gen.' },
          { ro: 'Wem gehört das Buch? — Dem Lehrer.', ru: 'Кому принадлежит книга? — Учителю.', note: 'Dativ в ответе' },
        ],
      },
      {
        id: 'nouns-n-declension',
        title: 'N-склонение (слабое склонение)',
        body: 'Группа мужских существительных, которые во всех падежах кроме именительного получают окончание -en или -n. К ним относятся слова на -e (der Junge), животные и профессии (der Mensch, der Bär), а также заимствования на -ist, -ent, -ant.',
        table: {
          headers: ['Падеж', 'der Junge', 'der Mensch'],
          rows: [
            ['Nominativ', 'der Junge', 'der Mensch'],
            ['Akkusativ', 'den Jungen', 'den Menschen'],
            ['Dativ', 'dem Jungen', 'dem Menschen'],
            ['Genitiv', 'des Jungen', 'des Menschen'],
          ],
        },
        examples: [
          { ro: 'Ich sehe den Jungen.', ru: 'Я вижу мальчика.', note: 'Akkusativ → Jungen' },
          { ro: 'Ich helfe dem Studenten.', ru: 'Я помогаю студенту.', note: 'Dativ → Studenten' },
          { ro: 'Das ist das Buch des Präsidenten.', ru: 'Это книга президента.', note: 'Genitiv → Präsidenten' },
          { ro: 'Er ist ein guter Mensch.', ru: 'Он хороший человек.', note: 'Nom. → Mensch (без -en)' },
          { ro: 'Mit dem Kollegen sprechen.', ru: 'Говорить с коллегой.', note: 'Dativ → Kollegen' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. ГЛАГОЛЫ — НАСТОЯЩЕЕ ВРЕМЯ
  // ─────────────────────────────────────────────
  {
    id: 'verbs-present',
    title: 'Глаголы. Настоящее время',
    icon: '⚡',
    description: 'Личные окончания, сильные глаголы, sein и haben, модальные глаголы',
    sections: [
      {
        id: 'verbs-endings',
        title: 'Личные окончания правильных глаголов',
        body: 'Основа глагола получается отбрасыванием -en (или -n) от инфинитива. К основе добавляются личные окончания. Четыре ключевых окончания: -e, -st, -t, -en. Если основа оканчивается на -t, -d, -fn, -gn — добавляется -e для благозвучия (arbeiten → du arbeitest).',
        table: {
          headers: ['Лицо', 'Окончание', 'machen (делать)', 'arbeiten (работать)'],
          rows: [
            ['ich (я)', '-e', 'mache', 'arbeite'],
            ['du (ты)', '-st', 'machst', 'arbeitest'],
            ['er/sie/es (он/она/оно)', '-t', 'macht', 'arbeitet'],
            ['wir (мы)', '-en', 'machen', 'arbeiten'],
            ['ihr (вы, неформ.)', '-t', 'macht', 'arbeitet'],
            ['sie/Sie (они/Вы)', '-en', 'machen', 'arbeiten'],
          ],
        },
        examples: [
          { ro: 'Ich mache Hausaufgaben.', ru: 'Я делаю домашнее задание.' },
          { ro: 'Du arbeitest viel.', ru: 'Ты много работаешь.' },
          { ro: 'Wir lernen Deutsch.', ru: 'Мы учим немецкий.' },
          { ro: 'Sie spielen Fußball.', ru: 'Они играют в футбол.' },
          { ro: 'Ihr tanzt sehr gut.', ru: 'Вы очень хорошо танцуете.' },
          { ro: 'Er kommt um 8 Uhr.', ru: 'Он приходит в 8 часов.' },
        ],
      },
      {
        id: 'verbs-strong',
        title: 'Сильные глаголы (Vokalwechsel)',
        body: 'Сильные (нерегулярные) глаголы меняют корневую гласную во 2-м и 3-м лице единственного числа настоящего времени. Два основных чередования: a → ä (fahren: du fährst) и e → i или ie (lesen: du liest). Остальные лица спрягаются регулярно.',
        table: {
          headers: ['Лицо', 'fahren (ехать)', 'lesen (читать)', 'sehen (видеть)'],
          rows: [
            ['ich', 'fahre', 'lese', 'sehe'],
            ['du', 'fährst', 'liest', 'siehst'],
            ['er/sie/es', 'fährt', 'liest', 'sieht'],
            ['wir', 'fahren', 'lesen', 'sehen'],
            ['ihr', 'fahrt', 'lest', 'seht'],
            ['sie/Sie', 'fahren', 'lesen', 'sehen'],
          ],
        },
        examples: [
          { ro: 'Er fährt nach Berlin.', ru: 'Он едет в Берлин.', note: 'a → ä только у du/er' },
          { ro: 'Du liest sehr schnell.', ru: 'Ты читаешь очень быстро.', note: 'e → ie' },
          { ro: 'Sie sieht gut aus.', ru: 'Она хорошо выглядит.', note: 'e → ie' },
          { ro: 'Du gibst mir das Buch.', ru: 'Ты даёшь мне книгу.', note: 'geben: e → i' },
          { ro: 'Nimmst du Zucker?', ru: 'Ты берёшь сахар?', note: 'nehmen: du nimmst' },
          { ro: 'Was trägst du heute?', ru: 'Что ты сегодня несёшь?', note: 'tragen: a → ä' },
        ],
      },
      {
        id: 'verbs-sein',
        title: 'Глагол sein (быть)',
        body: 'Sein — вспомогательный и связочный глагол, полностью нерегулярный. Используется как самостоятельный («я есть/нахожусь») и для образования Perfekt глаголов движения и изменения состояния.',
        table: {
          headers: ['Лицо', 'Форма', 'Перевод'],
          rows: [
            ['ich', 'bin', 'я есмь / я нахожусь'],
            ['du', 'bist', 'ты'],
            ['er/sie/es', 'ist', 'он/она/оно'],
            ['wir', 'sind', 'мы'],
            ['ihr', 'seid', 'вы (неформ.)'],
            ['sie/Sie', 'sind', 'они / Вы'],
          ],
        },
        examples: [
          { ro: 'Ich bin Lehrer.', ru: 'Я учитель.' },
          { ro: 'Bist du müde?', ru: 'Ты устал?' },
          { ro: 'Es ist kalt draußen.', ru: 'На улице холодно.' },
          { ro: 'Wir sind zu Hause.', ru: 'Мы дома.' },
          { ro: 'Sie sind meine Freunde.', ru: 'Они мои друзья.' },
        ],
      },
      {
        id: 'verbs-haben',
        title: 'Глагол haben (иметь)',
        body: 'Haben — второй важнейший вспомогательный глагол. Используется самостоятельно («иметь») и для образования Perfekt большинства глаголов. Формы du hast и er hat — нерегулярные (выпадает -b-).',
        table: {
          headers: ['Лицо', 'Форма'],
          rows: [
            ['ich', 'habe'],
            ['du', 'hast'],
            ['er/sie/es', 'hat'],
            ['wir', 'haben'],
            ['ihr', 'habt'],
            ['sie/Sie', 'haben'],
          ],
        },
        examples: [
          { ro: 'Ich habe einen Hund.', ru: 'У меня есть собака.' },
          { ro: 'Hast du Zeit?', ru: 'У тебя есть время?' },
          { ro: 'Er hat Hunger.', ru: 'Он голоден.', note: 'Hunger haben = быть голодным' },
          { ro: 'Wir haben ein Problem.', ru: 'У нас проблема.' },
          { ro: 'Sie haben heute keine Schule.', ru: 'У них сегодня нет школы.' },
          { ro: 'Haben Sie Fragen?', ru: 'Есть ли у вас вопросы?' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. МОДАЛЬНЫЕ ГЛАГОЛЫ
  // ─────────────────────────────────────────────
  {
    id: 'modal-verbs',
    title: 'Модальные глаголы',
    icon: '🎛️',
    description: 'können, müssen, wollen, sollen, dürfen, mögen — спряжение и значение',
    sections: [
      {
        id: 'modal-meaning',
        title: 'Шесть модальных глаголов',
        body: 'Модальные глаголы выражают отношение к действию — возможность, необходимость, желание, разрешение. Главный глагол действия стоит в инфинитиве в конце предложения. Это называется «глагольная рамка» (Satzklammer).',
        table: {
          headers: ['Глагол', 'Основное значение', 'Пример'],
          rows: [
            ['können', 'мочь, уметь', 'Ich kann schwimmen. — Я умею плавать.'],
            ['müssen', 'должен, обязан', 'Du musst lernen. — Ты должен учиться.'],
            ['wollen', 'хотеть', 'Er will schlafen. — Он хочет спать.'],
            ['sollen', 'должен (по чужой воле)', 'Du sollst pünktlich sein. — Ты должен быть вовремя.'],
            ['dürfen', 'иметь право, мочь', 'Hier darf man nicht rauchen. — Здесь нельзя курить.'],
            ['mögen / möchten', 'нравиться / хотеть (вежл.)', 'Ich möchte Kaffee. — Я хочу кофе.'],
          ],
        },
        examples: [
          { ro: 'Kann ich helfen?', ru: 'Могу я помочь?' },
          { ro: 'Sie muss früh aufstehen.', ru: 'Ей нужно рано вставать.' },
          { ro: 'Wir wollen ins Kino gehen.', ru: 'Мы хотим пойти в кино.' },
          { ro: 'Hier darf man nicht rauchen.', ru: 'Здесь нельзя курить.', note: 'dürfen nicht = запрет' },
          { ro: 'Du sollst die Wahrheit sagen.', ru: 'Ты должен говорить правду.', note: 'sollen = по чужой воле' },
          { ro: 'Ich möchte bitte die Rechnung.', ru: 'Я хотел бы счёт, пожалуйста.', note: 'möchten — вежливое желание' },
        ],
      },
      {
        id: 'modal-conjugation',
        title: 'Спряжение модальных глаголов',
        body: 'Особенность: 1-е и 3-е лицо единственного числа одинаковы (нет окончания -e/-t). Корневая гласная в единственном числе меняется. Во множественном числе — обычные окончания.',
        table: {
          headers: ['Лицо', 'können', 'müssen', 'wollen', 'dürfen', 'sollen', 'mögen'],
          rows: [
            ['ich', 'kann', 'muss', 'will', 'darf', 'soll', 'mag'],
            ['du', 'kannst', 'musst', 'willst', 'darfst', 'sollst', 'magst'],
            ['er/sie/es', 'kann', 'muss', 'will', 'darf', 'soll', 'mag'],
            ['wir', 'können', 'müssen', 'wollen', 'dürfen', 'sollen', 'mögen'],
            ['ihr', 'könnt', 'müsst', 'wollt', 'dürft', 'sollt', 'mögt'],
            ['sie/Sie', 'können', 'müssen', 'wollen', 'dürfen', 'sollen', 'mögen'],
          ],
        },
        examples: [
          { ro: 'Ich kann Deutsch sprechen.', ru: 'Я могу говорить по-немецки.', note: 'инфинитив в конце' },
          { ro: 'Du musst das nicht tun.', ru: 'Тебе не нужно этого делать.', note: 'nicht + инфинитив' },
          { ro: 'Er will das Buch lesen.', ru: 'Он хочет прочитать книгу.' },
          { ro: 'Darf ich das Fenster öffnen?', ru: 'Можно мне открыть окно?', note: 'вежливый вопрос' },
          { ro: 'Ich mag keine Zwiebeln.', ru: 'Мне не нравится лук.', note: 'mögen без инфинитива' },
          { ro: 'Sollen wir gehen?', ru: 'Нам идти?', note: 'sollen в вопросе = предложение' },
        ],
      },
      {
        id: 'modal-muessen-vs-sollen',
        title: 'müssen не tun vs. dürfen nicht',
        body: 'Важное отличие от русского: «nicht müssen» = не нужно (нет обязательства), «nicht dürfen» = нельзя (запрет). Это одна из самых частых ошибок у носителей русского языка.',
        table: {
          headers: ['Форма', 'Значение'],
          rows: [
            ['Du musst lernen.', 'Ты должен учиться. (обязан)'],
            ['Du musst nicht lernen.', 'Тебе не нужно учиться. (нет обязательства)'],
            ['Du darfst nicht rauchen.', 'Тебе нельзя курить. (запрет)'],
            ['Du darfst schlafen.', 'Тебе можно спать. (разрешение)'],
          ],
        },
        examples: [
          { ro: 'Du musst das nicht wissen.', ru: 'Тебе не нужно это знать.' },
          { ro: 'Hier darf man nicht parken.', ru: 'Здесь нельзя парковаться.' },
          { ro: 'Ich muss morgen früh aufstehen.', ru: 'Мне завтра нужно рано вставать.' },
          { ro: 'Du darfst so lange bleiben, wie du willst.', ru: 'Ты можешь оставаться столько, сколько хочешь.' },
          { ro: 'Du musst nicht auf mich warten.', ru: 'Тебе не нужно меня ждать.', note: 'nicht müssen ≠ не мочь' },
          { ro: 'Man darf hier nicht fotografieren.', ru: 'Здесь нельзя фотографировать.', note: 'darf nicht = запрещено' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. ПРИЛАГАТЕЛЬНЫЕ
  // ─────────────────────────────────────────────
  {
    id: 'adjectives',
    title: 'Прилагательные',
    icon: '🎨',
    description: 'Склонение после определённого и неопределённого артикля, степени сравнения',
    sections: [
      {
        id: 'adjectives-after-definite',
        title: 'Склонение после определённого артикля (слабое)',
        body: 'После определённого артикля (der, die, das) прилагательное берёт слабые окончания: в большинстве форм -en. Только в именительном и (для ж.р./ср.р.) в винительном падеже — -e. Логика: артикль уже несёт информацию о роде/падеже.',
        table: {
          headers: ['Падеж', 'м.р.', 'ж.р.', 'ср.р.', 'мн.ч.'],
          rows: [
            ['Nom.', 'der alte Mann', 'die alte Frau', 'das alte Kind', 'die alten Leute'],
            ['Akk.', 'den alten Mann', 'die alte Frau', 'das alte Kind', 'die alten Leute'],
            ['Dat.', 'dem alten Mann', 'der alten Frau', 'dem alten Kind', 'den alten Leuten'],
            ['Gen.', 'des alten Mannes', 'der alten Frau', 'des alten Kindes', 'der alten Leute'],
          ],
        },
        examples: [
          { ro: 'Der kleine Hund schläft.', ru: 'Маленькая собака спит.', note: 'Nom. м.р. → kleine' },
          { ro: 'Ich sehe den kleinen Hund.', ru: 'Я вижу маленькую собаку.', note: 'Akk. м.р. → kleinen' },
          { ro: 'Ich helfe dem kleinen Kind.', ru: 'Я помогаю маленькому ребёнку.', note: 'Dat. ср.р. → kleinen' },
          { ro: 'Die alte Frau geht langsam.', ru: 'Пожилая женщина идёт медленно.', note: 'Nom. ж.р. → alte' },
          { ro: 'Ich lese das neue Buch.', ru: 'Я читаю новую книгу.', note: 'Akk. ср.р. → neue' },
          { ro: 'Die Bücher der kleinen Kinder.', ru: 'Книги маленьких детей.', note: 'Gen. мн.ч. → kleinen' },
        ],
      },
      {
        id: 'adjectives-after-indefinite',
        title: 'Склонение после неопределённого артикля (смешанное)',
        body: 'После ein/eine и kein, а также притяжательных местоимений прилагательное берёт смешанные окончания. В тех позициях, где неопределённый артикль не показывает род/падеж (Nom. м.р.: «ein» не показывает, это м.р. или ср.р.) — прилагательное берёт сильное окончание (-er, -es).',
        table: {
          headers: ['Падеж', 'м.р.', 'ж.р.', 'ср.р.'],
          rows: [
            ['Nom.', 'ein alter Mann', 'eine alte Frau', 'ein altes Kind'],
            ['Akk.', 'einen alten Mann', 'eine alte Frau', 'ein altes Kind'],
            ['Dat.', 'einem alten Mann', 'einer alten Frau', 'einem alten Kind'],
            ['Gen.', 'eines alten Mannes', 'einer alten Frau', 'eines alten Kindes'],
          ],
        },
        examples: [
          { ro: 'Ein kleiner Hund bellt.', ru: 'Маленькая собака лает.', note: 'Nom. м.р. → kleiner (-er!)' },
          { ro: 'Ich habe ein kleines Kind.', ru: 'У меня маленький ребёнок.', note: 'Akk. ср.р. → kleines (-es!)' },
          { ro: 'Ich helfe einer alten Frau.', ru: 'Я помогаю пожилой женщине.', note: 'Dat. ж.р. → alten' },
          { ro: 'Eine alte Frau geht langsam.', ru: 'Пожилая женщина идёт медленно.', note: 'Nom. ж.р. → alte' },
          { ro: 'Er hat einen neuen Job.', ru: 'У него новая работа.', note: 'Akk. м.р. → neuen' },
          { ro: 'Mit einem alten Freund sprechen.', ru: 'Говорить со старым другом.', note: 'Dat. м.р. → alten' },
        ],
      },
      {
        id: 'adjectives-comparison',
        title: 'Степени сравнения',
        body: 'Сравнительная степень образуется добавлением -er, превосходная — am + -sten или der/die/das + -ste. Многие односложные прилагательные с a/o/u получают умлаут. Нерегулярные: gut → besser → am besten, viel → mehr → am meisten.',
        table: {
          headers: ['Степень', 'Форма', 'Пример'],
          rows: [
            ['Положительная', 'adj.', 'schnell (быстрый)'],
            ['Сравнительная', 'adj. + -er', 'schneller (быстрее)'],
            ['Превосходная (предикат.)', 'am + adj. + -(e)sten', 'am schnellsten (самый быстрый)'],
            ['Превосходная (атрибутив.)', 'der/die/das + adj. + -(e)ste', 'der schnellste Zug'],
          ],
        },
        examples: [
          { ro: 'Sie ist älter als ich.', ru: 'Она старше меня.', note: 'alt → älter (умлаут); als = чем' },
          { ro: 'Das ist das billigste Restaurant.', ru: 'Это самый дешёвый ресторан.' },
          { ro: 'Er spricht am besten Deutsch.', ru: 'Он лучше всех говорит по-немецки.', note: 'нерег. gut → besser → best-' },
          { ro: 'Ich habe mehr Zeit als du.', ru: 'У меня больше времени, чем у тебя.', note: 'нерег. viel → mehr' },
          { ro: 'Dieses Café ist gemütlicher als das andere.', ru: 'Это кафе уютнее, чем другое.' },
          { ro: 'Sie ist am klügsten in der Klasse.', ru: 'Она самая умная в классе.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. МЕСТОИМЕНИЯ
  // ─────────────────────────────────────────────
  {
    id: 'pronouns',
    title: 'Местоимения',
    icon: '👤',
    description: 'Личные, притяжательные, указательные, возвратные',
    sections: [
      {
        id: 'pronouns-personal',
        title: 'Личные местоимения',
        body: 'В немецком 8 личных местоимений: ich, du, er, sie, es, wir, ihr, sie/Sie. Формальное «Вы» — Sie (всегда с заглавной буквы). Местоимение меняет форму по падежу. Субъект опускать нельзя — в отличие от румынского или испанского.',
        table: {
          headers: ['Лицо', 'Nominativ', 'Akkusativ', 'Dativ'],
          rows: [
            ['ich', 'ich', 'mich', 'mir'],
            ['du', 'du', 'dich', 'dir'],
            ['er', 'er', 'ihn', 'ihm'],
            ['sie (она)', 'sie', 'sie', 'ihr'],
            ['es', 'es', 'es', 'ihm'],
            ['wir', 'wir', 'uns', 'uns'],
            ['ihr', 'ihr', 'euch', 'euch'],
            ['sie/Sie', 'sie/Sie', 'sie/Sie', 'ihnen/Ihnen'],
          ],
        },
        examples: [
          { ro: 'Er liebt mich.', ru: 'Он любит меня.', note: 'mich — Akkusativ' },
          { ro: 'Ich helfe dir.', ru: 'Я тебе помогаю.', note: 'dir — Dativ' },
          { ro: 'Sie sieht ihn.', ru: 'Она его видит.', note: 'ihn — Akkusativ м.р.' },
          { ro: 'Kannst du uns helfen?', ru: 'Ты можешь нам помочь?', note: 'uns — Dativ' },
          { ro: 'Ich schreibe ihr eine Nachricht.', ru: 'Я пишу ей сообщение.', note: 'ihr — Dativ ж.р.' },
          { ro: 'Magst du ihn?', ru: 'Тебе он нравится?', note: 'ihn — Akkusativ м.р.' },
        ],
      },
      {
        id: 'pronouns-possessive',
        title: 'Притяжательные местоимения',
        body: 'Притяжательные местоимения (mein, dein, sein, ihr, unser, euer, ihr/Ihr) показывают принадлежность. Они склоняются по той же схеме, что и «kein» (ein-Wörter). Основа берётся от притяжательного местоимения, окончание — как у неопределённого артикля.',
        table: {
          headers: ['Владелец', 'Местоимение', 'Пример (Nom. м.р.)'],
          rows: [
            ['ich', 'mein', 'mein Bruder'],
            ['du', 'dein', 'dein Bruder'],
            ['er/es', 'sein', 'sein Bruder'],
            ['sie (она)', 'ihr', 'ihr Bruder'],
            ['wir', 'unser', 'unser Bruder'],
            ['ihr', 'euer', 'euer Bruder'],
            ['sie/Sie', 'ihr/Ihr', 'ihr/Ihr Bruder'],
          ],
        },
        examples: [
          { ro: 'Das ist mein Buch.', ru: 'Это моя книга.', note: 'Nom. ср.р. — нулевое окончание' },
          { ro: 'Ich sehe deine Schwester.', ru: 'Я вижу твою сестру.', note: 'Akk. ж.р. → deine' },
          { ro: 'Er gibt seiner Mutter Blumen.', ru: 'Он дарит своей маме цветы.', note: 'Dat. ж.р. → seiner' },
          { ro: 'Ist das dein Auto?', ru: 'Это твоя машина?', note: 'Nom. ср.р. — нулевое окончание' },
          { ro: 'Wo ist mein Schlüssel?', ru: 'Где мой ключ?' },
          { ro: 'Das sind unsere Kinder.', ru: 'Это наши дети.' },
        ],
      },
      {
        id: 'pronouns-reflexive',
        title: 'Возвратные местоимения',
        body: 'Возвратные местоимения используются с возвратными глаголами (sich freuen, sich waschen). В большинстве лиц совпадают с обычными личными местоимениями в Akkusativ/Dativ. Особая форма только у 3-го лица и формального Sie — sich.',
        table: {
          headers: ['Лицо', 'Akkusativ', 'Dativ'],
          rows: [
            ['ich', 'mich', 'mir'],
            ['du', 'dich', 'dir'],
            ['er/sie/es/Sie', 'sich', 'sich'],
            ['wir', 'uns', 'uns'],
            ['ihr', 'euch', 'euch'],
            ['sie/Sie', 'sich', 'sich'],
          ],
        },
        examples: [
          { ro: 'Ich freue mich.', ru: 'Я радуюсь.' },
          { ro: 'Er wäscht sich die Hände.', ru: 'Он моет руки.', note: 'Dativ sich при наличии объекта' },
          { ro: 'Wir setzen uns.', ru: 'Мы садимся.' },
          { ro: 'Erinnerst du dich?', ru: 'Ты помнишь?', note: 'sich erinnern — возвратный' },
          { ro: 'Sie freut sich sehr.', ru: 'Она очень радуется.' },
          { ro: 'Wir sehen uns morgen.', ru: 'Увидимся завтра.', note: 'sich sehen — взаимное' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. ЧИСЛИТЕЛЬНЫЕ
  // ─────────────────────────────────────────────
  {
    id: 'numerals',
    title: 'Числительные',
    icon: '🔢',
    description: 'Количественные и порядковые числительные',
    sections: [
      {
        id: 'numerals-cardinal',
        title: 'Количественные числительные',
        body: 'Числа 1 и 2 частично согласуются с родом. «Zwei» иногда становится «zwo» при счёте (по телефону) во избежание путаницы с «drei». Числа 13–19 образуются по схеме: единица + zehn. 21, 31 и т.д.: единица + und + десяток (einundzwanzig).',
        table: {
          headers: ['Число', 'Слово', 'Число', 'Слово'],
          rows: [
            ['0', 'null', '11', 'elf'],
            ['1', 'eins / ein-', '12', 'zwölf'],
            ['2', 'zwei', '13', 'dreizehn'],
            ['3', 'drei', '20', 'zwanzig'],
            ['4', 'vier', '21', 'einundzwanzig'],
            ['5', 'fünf', '30', 'dreißig'],
            ['6', 'sechs', '100', 'hundert'],
            ['7', 'sieben', '1000', 'tausend'],
            ['8', 'acht', '1 000 000', 'eine Million'],
            ['9', 'neun', '', ''],
            ['10', 'zehn', '', ''],
          ],
        },
        examples: [
          { ro: 'ein Mann / eine Frau / ein Kind', ru: 'один мужчина / одна женщина / один ребёнок' },
          { ro: 'zwei Kinder', ru: 'двое детей' },
          { ro: 'zwanzig Euro', ru: 'двадцать евро' },
          { ro: 'dreiunddreißig', ru: 'тридцать три', note: 'единица + und + десяток' },
          { ro: 'Ich bin dreiundzwanzig Jahre alt.', ru: 'Мне двадцать три года.' },
        ],
      },
      {
        id: 'numerals-ordinal',
        title: 'Порядковые числительные',
        body: 'Порядковые числительные 2–19 образуются добавлением -te к количественному (zweite, dritte — нерег.). С 20 — добавляется -ste (zwanzigste). Нерегулярные: erste (первый), dritte (третий), siebte (седьмой). Перед существительным склоняются как прилагательные.',
        table: {
          headers: ['Число', 'Порядковое', 'С артиклем'],
          rows: [
            ['1', 'erst-', 'der erste'],
            ['2', 'zweit-', 'der zweite'],
            ['3', 'dritt-', 'der dritte'],
            ['4', 'viert-', 'der vierte'],
            ['7', 'siebt-', 'der siebte'],
            ['8', 'acht-', 'der achte'],
            ['19', 'neunzehnt-', 'der neunzehnte'],
            ['20', 'zwanzigst-', 'der zwanzigste'],
            ['100', 'hundertst-', 'der hundertste'],
          ],
        },
        examples: [
          { ro: 'der erste Schritt', ru: 'первый шаг' },
          { ro: 'das dritte Mal', ru: 'третий раз' },
          { ro: 'am zwanzigsten März', ru: 'двадцатого марта', note: 'Dativ в датах' },
          { ro: 'Heute ist der fünfte Mai.', ru: 'Сегодня пятое мая.' },
          { ro: 'Er ist zum zweiten Mal hier.', ru: 'Он здесь во второй раз.' },
          { ro: 'Sie lebt im siebten Stock.', ru: 'Она живёт на седьмом этаже.', note: 'Dativ → siebten' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. ПРЕДЛОГИ
  // ─────────────────────────────────────────────
  {
    id: 'prepositions',
    title: 'Предлоги',
    icon: '📍',
    description: 'Предлоги с Akkusativ, Dativ, обоими падежами и Genitiv',
    sections: [
      {
        id: 'prepositions-akkusativ',
        title: 'Предлоги с Akkusativ',
        body: 'Следующие предлоги всегда требуют Akkusativ: durch, für, gegen, ohne, um, bis, entlang. Запомнить как группу проще, чем учить каждый отдельно.',
        table: {
          headers: ['Предлог', 'Значение', 'Пример'],
          rows: [
            ['durch', 'через, сквозь', 'durch den Park gehen'],
            ['für', 'для, за', 'Das ist für dich.'],
            ['gegen', 'против, около (времени)', 'gegen die Wand fahren'],
            ['ohne', 'без', 'ohne Zucker'],
            ['um', 'вокруг, в (время)', 'um den Tisch, um 8 Uhr'],
            ['bis', 'до', 'bis nächsten Montag'],
            ['entlang', 'вдоль (после сущ.)', 'den Fluss entlang'],
          ],
        },
        examples: [
          { ro: 'Ich kaufe ein Geschenk für meinen Vater.', ru: 'Я покупаю подарок для отца.', note: 'für + Akk' },
          { ro: 'Wir gehen durch den Park.', ru: 'Мы идём через парк.' },
          { ro: 'ohne Milch', ru: 'без молока' },
          { ro: 'Das Geschenk ist für dich.', ru: 'Подарок для тебя.' },
          { ro: 'Er läuft um das Haus.', ru: 'Он бегает вокруг дома.' },
          { ro: 'Bis nächsten Montag!', ru: 'До следующего понедельника!', note: 'bis + Akk.' },
        ],
      },
      {
        id: 'prepositions-dativ',
        title: 'Предлоги с Dativ',
        body: 'Следующие предлоги всегда требуют Dativ: aus, bei, mit, nach, seit, von, zu, außer, gegenüber. Sehr wichtig: «von» часто используется вместо Genitiv в разговорной речи.',
        table: {
          headers: ['Предлог', 'Значение', 'Пример'],
          rows: [
            ['aus', 'из, из материала', 'aus Deutschland, aus Holz'],
            ['bei', 'у, при, во время', 'bei mir zu Hause, bei der Arbeit'],
            ['mit', 'с (совместно), на (транспорт)', 'mit dem Bus, mit Freunden'],
            ['nach', 'после, в (страны), по направлению', 'nach Hause, nach Berlin'],
            ['seit', 'с (момента времени)', 'seit einem Jahr'],
            ['von', 'от, из, о', 'von meiner Mutter'],
            ['zu', 'к, на (место)', 'zu Hause, zum Arzt'],
            ['außer', 'кроме', 'außer mir'],
          ],
        },
        examples: [
          { ro: 'Ich fahre mit dem Zug.', ru: 'Я еду на поезде.', note: 'mit + Dativ' },
          { ro: 'Seit zwei Jahren lerne ich Deutsch.', ru: 'Два года я учу немецкий.', note: 'seit + Dativ (!)' },
          { ro: 'Ich gehe zum Arzt.', ru: 'Я иду к врачу.', note: 'zu + dem = zum' },
          { ro: 'Er kommt aus der Schweiz.', ru: 'Он из Швейцарии.' },
          { ro: 'Er wohnt bei seinen Eltern.', ru: 'Он живёт у своих родителей.' },
          { ro: 'Nach dem Unterricht gehen wir essen.', ru: 'После занятий мы идём есть.' },
        ],
      },
      {
        id: 'prepositions-two-way',
        title: 'Двойные предлоги (Wechselpräpositionen)',
        body: 'Предлоги an, auf, hinter, in, neben, über, unter, vor, zwischen принимают либо Akkusativ (движение, вопрос wohin?), либо Dativ (расположение, вопрос wo?). Отвечай на вопрос: предмет движется в новое место или он уже там?',
        table: {
          headers: ['Предлог', 'Dativ (wo? — где?)', 'Akkusativ (wohin? — куда?)'],
          rows: [
            ['an', 'am Tisch sitzen', 'an den Tisch gehen'],
            ['auf', 'auf dem Tisch liegen', 'auf den Tisch legen'],
            ['in', 'in der Stadt sein', 'in die Stadt fahren'],
            ['über', 'über dem Bett hängen', 'das Bild über das Bett hängen'],
            ['unter', 'unter dem Tisch liegen', 'unter den Tisch fallen'],
            ['vor', 'vor dem Haus stehen', 'vor das Haus gehen'],
            ['zwischen', 'zwischen den Häusern', 'zwischen die Häuser stellen'],
          ],
        },
        examples: [
          { ro: 'Das Buch liegt auf dem Tisch.', ru: 'Книга лежит на столе.', note: 'wo? → Dativ' },
          { ro: 'Ich lege das Buch auf den Tisch.', ru: 'Я кладу книгу на стол.', note: 'wohin? → Akkusativ' },
          { ro: 'Sie sitzt an der Bar.', ru: 'Она сидит у стойки бара.', note: 'wo? → Dativ' },
          { ro: 'Wir fahren in die Stadt.', ru: 'Мы едем в город.', note: 'wohin? → Akkusativ' },
          { ro: 'Die Katze liegt auf dem Sofa.', ru: 'Кошка лежит на диване.', note: 'wo? → Dativ' },
          { ro: 'Stell das Buch ins Regal.', ru: 'Поставь книгу на полку.', note: 'wohin? → Akkusativ; in + das = ins' },
        ],
      },
      {
        id: 'prepositions-genitive',
        title: 'Предлоги с Genitiv',
        body: 'В книжном и официальном немецком ряд предлогов управляет родительным падежом. В разговорной речи они часто заменяются конструкциями с Dativ. Самые важные: wegen, trotz, während, statt/anstatt.',
        table: {
          headers: ['Предлог', 'Значение', 'Пример'],
          rows: [
            ['wegen', 'из-за', 'wegen des Wetters'],
            ['trotz', 'несмотря на', 'trotz des Regens'],
            ['während', 'во время, пока', 'während des Unterrichts'],
            ['statt / anstatt', 'вместо', 'statt des Busses'],
            ['außerhalb', 'вне, за пределами', 'außerhalb der Stadt'],
            ['innerhalb', 'внутри, в пределах', 'innerhalb einer Stunde'],
          ],
        },
        examples: [
          { ro: 'Wegen des schlechten Wetters bleiben wir zu Hause.', ru: 'Из-за плохой погоды мы остаёмся дома.' },
          { ro: 'Trotz des Regens gehen wir spazieren.', ru: 'Несмотря на дождь, мы идём гулять.' },
          { ro: 'Während der Prüfung war es still.', ru: 'Во время экзамена было тихо.' },
          { ro: 'Statt des Kaffees trinke ich Tee.', ru: 'Вместо кофе я пью чай.' },
          { ro: 'Er wohnt außerhalb der Stadt.', ru: 'Он живёт за городом.' },
          { ro: 'Innerhalb einer Stunde war alles fertig.', ru: 'В течение часа всё было готово.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 9. ГЛАГОЛЫ — ПРОШЕДШЕЕ ВРЕМЯ
  // ─────────────────────────────────────────────
  {
    id: 'verbs-past',
    title: 'Глаголы. Прошедшее время',
    icon: '⏮️',
    description: 'Perfekt (разговорное), Präteritum (письменное), Partizip II',
    sections: [
      {
        id: 'verbs-perfekt',
        title: 'Perfekt (Разговорное прошедшее)',
        body: 'Perfekt — основное прошедшее время в разговорном немецком. Образуется: вспомогательный глагол haben или sein (в настоящем времени) + Partizip II в конце предложения. Partizip II неизменяемо.',
        table: {
          headers: ['Лицо', 'haben + Partizip II', 'sein + Partizip II'],
          rows: [
            ['ich', 'ich habe gemacht', 'ich bin gegangen'],
            ['du', 'du hast gemacht', 'du bist gegangen'],
            ['er/sie/es', 'er hat gemacht', 'er ist gegangen'],
            ['wir', 'wir haben gemacht', 'wir sind gegangen'],
            ['ihr', 'ihr habt gemacht', 'ihr seid gegangen'],
            ['sie/Sie', 'sie haben gemacht', 'sie sind gegangen'],
          ],
        },
        examples: [
          { ro: 'Ich habe Pizza gegessen.', ru: 'Я съел пиццу.' },
          { ro: 'Er ist nach Hause gegangen.', ru: 'Он ушёл домой.', note: 'gehen → sein' },
          { ro: 'Hast du den Film gesehen?', ru: 'Ты видел этот фильм?' },
          { ro: 'Wir sind nach Berlin gefahren.', ru: 'Мы поехали в Берлин.', note: 'fahren → sein' },
          { ro: 'Sie ist nach Berlin geflogen.', ru: 'Она полетела в Берлин.', note: 'fliegen → sein' },
          { ro: 'Ich habe gestern lange geschlafen.', ru: 'Вчера я долго спал.' },
        ],
      },
      {
        id: 'verbs-partizip2',
        title: 'Образование Partizip II',
        body: 'У правильных глаголов: ge- + основа + -t (machen → gemacht). У неправильных сильных глаголов: ge- + изменённая основа + -en (gehen → gegangen, schreiben → geschrieben). Глаголы с неотделяемыми приставками (be-, er-, ver-, ent-) и глаголы на -ieren не получают ge-.',
        table: {
          headers: ['Тип', 'Инфинитив', 'Partizip II'],
          rows: [
            ['правильный', 'machen', 'gemacht'],
            ['правильный', 'kaufen', 'gekauft'],
            ['сильный', 'gehen', 'gegangen'],
            ['сильный', 'fahren', 'gefahren'],
            ['сильный', 'schreiben', 'geschrieben'],
            ['сильный', 'trinken', 'getrunken'],
            ['с be-/er-/ver-', 'besuchen', 'besucht (без ge-)'],
            ['на -ieren', 'telefonieren', 'telefoniert (без ge-)'],
          ],
        },
        examples: [
          { ro: 'Ich habe viel gearbeitet.', ru: 'Я много работал.', note: 'arbeiten → gearbeitet' },
          { ro: 'Sie hat das Buch gelesen.', ru: 'Она прочитала книгу.', note: 'lesen → gelesen' },
          { ro: 'Er hat seinen Freund besucht.', ru: 'Он навестил своего друга.', note: 'besuchen → besucht (без ge-)' },
          { ro: 'Sie haben die Wohnung renoviert.', ru: 'Они отремонтировали квартиру.', note: '-ieren → renoviert (без ge-)' },
          { ro: 'Er hat einen Brief geschrieben.', ru: 'Он написал письмо.', note: 'schreiben → geschrieben' },
          { ro: 'Wir haben den Film gesehen.', ru: 'Мы посмотрели фильм.', note: 'sehen → gesehen' },
        ],
      },
      {
        id: 'verbs-haben-vs-sein',
        title: 'haben или sein?',
        body: 'Глаголы движения из точки A в точку B и глаголы изменения состояния используют sein. Это: gehen, fahren, fliegen, kommen, laufen, fallen, sterben, werden, bleiben, sein. Всё остальное, как правило, — haben.',
        table: {
          headers: ['Глагол', 'Вспомогат.', 'Partizip II'],
          rows: [
            ['gehen (идти)', 'sein', 'gegangen'],
            ['fahren (ехать)', 'sein', 'gefahren'],
            ['kommen (приходить)', 'sein', 'gekommen'],
            ['bleiben (оставаться)', 'sein', 'geblieben'],
            ['werden (становиться)', 'sein', 'geworden'],
            ['sterben (умирать)', 'sein', 'gestorben'],
            ['machen (делать)', 'haben', 'gemacht'],
            ['kaufen (покупать)', 'haben', 'gekauft'],
            ['essen (есть)', 'haben', 'gegessen'],
            ['schlafen (спать)', 'haben', 'geschlafen'],
          ],
        },
        examples: [
          { ro: 'Er ist nach Hause gegangen.', ru: 'Он пошёл домой.', note: 'движение → sein' },
          { ro: 'Sie ist Lehrerin geworden.', ru: 'Она стала учительницей.', note: 'изменение → sein' },
          { ro: 'Ich habe geschlafen.', ru: 'Я спал.', note: 'нет движения → haben' },
          { ro: 'Das Baby ist eingeschlafen.', ru: 'Малыш заснул.', note: 'einschlafen — изменение состояния → sein' },
          { ro: 'Er ist in Berlin geblieben.', ru: 'Он остался в Берлине.', note: 'bleiben → sein' },
          { ro: 'Ich habe das Buch gelesen.', ru: 'Я прочитал книгу.', note: 'нет движения → haben' },
        ],
      },
      {
        id: 'verbs-praeteritum',
        title: 'Präteritum (письменное прошедшее)',
        body: 'Präteritum используется в литературе, газетах, формальных текстах. В разговорной речи применяется только для sein, haben и модальных глаголов — при них Präteritum звучит естественнее, чем Perfekt. Правильные глаголы: основа + -te + личное окончание.',
        table: {
          headers: ['Лицо', 'machen (прав.)', 'sein (нерег.)', 'haben (нерег.)'],
          rows: [
            ['ich', 'machte', 'war', 'hatte'],
            ['du', 'machtest', 'warst', 'hattest'],
            ['er/sie/es', 'machte', 'war', 'hatte'],
            ['wir', 'machten', 'waren', 'hatten'],
            ['ihr', 'machtet', 'wart', 'hattet'],
            ['sie/Sie', 'machten', 'waren', 'hatten'],
          ],
        },
        examples: [
          { ro: 'Ich war gestern müde.', ru: 'Вчера я был уставшим.', note: 'sein → war (разговорн. норма)' },
          { ro: 'Er hatte keine Zeit.', ru: 'У него не было времени.', note: 'haben → hatte' },
          { ro: 'Sie konnten nicht kommen.', ru: 'Они не смогли прийти.', note: 'können → konnten' },
          { ro: 'Als Kind konnte ich gut zeichnen.', ru: 'В детстве я умел хорошо рисовать.', note: 'können → konnte' },
          { ro: 'Es war einmal ein König.', ru: 'Жил-был однажды король.', note: 'Präteritum — нарратив' },
          { ro: 'Die Straßen waren nass.', ru: 'Улицы были мокрые.', note: 'sein → waren' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 10. ПОРЯДОК СЛОВ
  // ─────────────────────────────────────────────
  {
    id: 'word-order',
    title: 'Порядок слов',
    icon: '🔀',
    description: 'Правило V2, обрамление, придаточные предложения, глагольная рамка',
    sections: [
      {
        id: 'word-order-v2',
        title: 'Правило V2: глагол на 2-м месте',
        body: 'В немецком главном предложении спрягаемый глагол всегда занимает вторую позицию. На первом месте может стоять что угодно: подлежащее, обстоятельство, дополнение. Если первая позиция занята не подлежащим — подлежащее перемещается за глагол (инверсия).',
        table: {
          headers: ['Позиция 1', 'Глагол (2)', 'Остальное'],
          rows: [
            ['Ich', 'gehe', 'heute ins Kino.'],
            ['Heute', 'gehe', 'ich ins Kino.'],
            ['Ins Kino', 'gehe', 'ich heute.'],
            ['Morgen', 'kaufe', 'ich ein Buch.'],
          ],
        },
        examples: [
          { ro: 'Heute gehe ich ins Kino.', ru: 'Сегодня я иду в кино.', note: 'heute на 1-м месте → инверсия' },
          { ro: 'Das Buch lese ich gern.', ru: 'Книгу я читаю охотно.', note: 'объект на 1-м месте' },
          { ro: 'Manchmal schlafe ich schlecht.', ru: 'Иногда я плохо сплю.' },
          { ro: 'Abends lerne ich Deutsch.', ru: 'По вечерам я учу немецкий.', note: 'abends на 1-м → инверсия' },
          { ro: 'Gestern hat er mich angerufen.', ru: 'Вчера он мне позвонил.' },
          { ro: 'Das Buch lese ich jeden Abend.', ru: 'Эту книгу я читаю каждый вечер.', note: 'объект на 1-м' },
        ],
      },
      {
        id: 'word-order-klammer',
        title: 'Глагольная рамка (Satzklammer)',
        body: 'В немецком предложении спрягаемый глагол стоит на 2-м месте, а все остальные глагольные компоненты (инфинитив, Partizip II, отделяемая приставка) — в самом конце. Это создаёт «рамку» вокруг середины предложения.',
        table: {
          headers: ['Начало рамки', 'Середина', 'Конец рамки'],
          rows: [
            ['Ich muss', 'heute Abend', 'lernen.'],
            ['Er hat', 'das Buch schon', 'gelesen.'],
            ['Sie ruft', 'ihren Vater jeden Tag', 'an. (anrufen)'],
            ['Wir werden', 'morgen früh', 'abreisen.'],
          ],
        },
        examples: [
          { ro: 'Ich rufe dich morgen an.', ru: 'Я позвоню тебе завтра.', note: 'anrufen → an в конце' },
          { ro: 'Er hat das gestern gemacht.', ru: 'Он сделал это вчера.', note: 'gemacht в конце' },
          { ro: 'Sie kann gut Deutsch sprechen.', ru: 'Она умеет хорошо говорить по-немецки.', note: 'sprechen в конце' },
          { ro: 'Er hat das Buch schon fertig gelesen.', ru: 'Он уже дочитал книгу.', note: 'gelesen — конец рамки' },
          { ro: 'Ich bin gestern zu Hause geblieben.', ru: 'Вчера я остался дома.' },
          { ro: 'Du sollst das sofort machen.', ru: 'Ты должен это сделать немедленно.', note: 'machen — конец рамки' },
        ],
      },
      {
        id: 'word-order-nebensatz',
        title: 'Придаточное предложение (Nebensatz)',
        body: 'В придаточном предложении спрягаемый глагол уходит В САМЫЙ КОНЕЦ. Подчинительные союзы: weil (потому что), dass (что), wenn (если/когда), ob (ли), obwohl (хотя), damit (чтобы) и др. Придаточное всегда отделяется запятой.',
        table: {
          headers: ['Главное предложение', 'Союз', 'Придаточное (глагол в конце)'],
          rows: [
            ['Ich lerne Deutsch,', 'weil', 'ich in Deutschland arbeiten will.'],
            ['Er sagt,', 'dass', 'er müde ist.'],
            ['Ich weiß nicht,', 'ob', 'er kommt.'],
            ['Wir bleiben zu Hause,', 'obwohl', 'das Wetter gut ist.'],
          ],
        },
        examples: [
          { ro: 'Ich lerne Deutsch, weil ich in Berlin wohnen will.', ru: 'Я учу немецкий, потому что хочу жить в Берлине.', note: 'weil → глагол в конец' },
          { ro: 'Er sagt, dass er krank ist.', ru: 'Он говорит, что он болен.', note: 'dass → глагол в конец' },
          { ro: 'Wenn es regnet, bleibe ich zu Hause.', ru: 'Если идёт дождь, я остаюсь дома.', note: 'придаточное на 1-м → инверсия в главном' },
          { ro: 'Ich bleibe, obwohl es regnet.', ru: 'Я остаюсь, хотя идёт дождь.' },
          { ro: 'Weißt du, wann der Film anfängt?', ru: 'Знаешь, когда начинается фильм?' },
          { ro: 'Damit er kommt, habe ich ihn eingeladen.', ru: 'Чтобы он пришёл, я его пригласил.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 11. БУДУЩЕЕ ВРЕМЯ
  // ─────────────────────────────────────────────
  {
    id: 'verbs-future',
    title: 'Глаголы. Будущее время',
    icon: '⏩',
    description: 'Futur I с werden, настоящее время как будущее',
    sections: [
      {
        id: 'verbs-future-werden',
        title: 'Futur I (werden + инфинитив)',
        body: 'Будущее время образуется с помощью werden (спрягается на 2-м месте) + инфинитив главного глагола в конце предложения. На практике немцы часто используют настоящее время с временным указателем вместо Futur I — это звучит естественнее.',
        table: {
          headers: ['Лицо', 'werden (Präsens)'],
          rows: [
            ['ich', 'werde'],
            ['du', 'wirst'],
            ['er/sie/es', 'wird'],
            ['wir', 'werden'],
            ['ihr', 'werdet'],
            ['sie/Sie', 'werden'],
          ],
        },
        examples: [
          { ro: 'Ich werde morgen kommen.', ru: 'Я приду завтра.' },
          { ro: 'Es wird regnen.', ru: 'Будет дождь.', note: 'прогноз → werden' },
          { ro: 'Wir werden das Problem lösen.', ru: 'Мы решим эту проблему.' },
          { ro: 'Ich komme morgen. (= Ich werde morgen kommen.)', ru: 'Я приду завтра.', note: 'Präsens + morgen — разговорная норма' },
          { ro: 'Nächstes Jahr werde ich umziehen.', ru: 'В следующем году я переберусь.' },
          { ro: 'Das wird nicht leicht sein.', ru: 'Это будет нелегко.' },
        ],
      },
      {
        id: 'verbs-future-modal',
        title: 'werden как модальный глагол',
        body: 'Werden используется для выражения предположений о настоящем или будущем (= вероятно, наверное). В этом значении оно стоит рядом с wohl или schon. Не путать с Futur II (werden + Partizip II + haben/sein).',
        examples: [
          { ro: 'Er wird wohl krank sein.', ru: 'Он, наверное, болен.', note: 'предположение о настоящем' },
          { ro: 'Das wird schon stimmen.', ru: 'Это, наверное, правда.' },
          { ro: 'Sie wird das Buch schon gelesen haben.', ru: 'Она, наверное, уже прочитала книгу.', note: 'Futur II — предположение о прошлом' },
          { ro: 'Er wird schon da sein.', ru: 'Он, наверное, уже там.' },
          { ro: 'Das wird stimmen.', ru: 'Это, вероятно, верно.' },
          { ro: 'Sie wird wohl zu Hause sein.', ru: 'Она, наверное, дома.', note: 'wohl усиливает предположение' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 12. ОТДЕЛЯЕМЫЕ И НЕОТДЕЛЯЕМЫЕ ПРИСТАВКИ
  // ─────────────────────────────────────────────
  {
    id: 'separable-verbs',
    title: 'Отделяемые и неотделяемые приставки',
    icon: '🔧',
    description: 'Trennbare и untrennbare Verben, приставки двойного типа',
    sections: [
      {
        id: 'separable-trennbar',
        title: 'Отделяемые приставки (trennbare Verben)',
        body: 'В главном предложении отделяемая приставка отрывается от глагола и уходит в конец (часть глагольной рамки). Ударение всегда на приставке. Самые частые отделяемые приставки: ab-, an-, auf-, aus-, ein-, mit-, nach-, vor-, weg-, zu-, zurück-.',
        table: {
          headers: ['Глагол', 'Перевод', 'В предложении'],
          rows: [
            ['anrufen', 'звонить', 'Ich rufe dich an.'],
            ['aufstehen', 'вставать', 'Er steht um 7 auf.'],
            ['einladen', 'приглашать', 'Sie lädt ihn ein.'],
            ['mitkommen', 'идти с кем-то', 'Kommst du mit?'],
            ['zurückkommen', 'возвращаться', 'Wann kommst du zurück?'],
            ['abfahren', 'отправляться', 'Der Zug fährt ab.'],
          ],
        },
        examples: [
          { ro: 'Ich stehe jeden Tag um 7 Uhr auf.', ru: 'Я встаю каждый день в 7 часов.', note: 'auf — в конце' },
          { ro: 'Er ruft seine Mutter an.', ru: 'Он звонит своей маме.', note: 'an — в конце' },
          { ro: 'Kommst du mit?', ru: 'Ты идёшь с нами?', note: 'в вопросе — тоже в конце' },
          { ro: 'Bitte mach das Licht aus!', ru: 'Пожалуйста, выключи свет!', note: 'ausmachen → mach...aus' },
          { ro: 'Wann fährt der Zug ab?', ru: 'Когда отправляется поезд?', note: 'abfahren → fährt...ab' },
          { ro: 'Ich lade dich ein.', ru: 'Я тебя приглашаю.', note: 'einladen → lade...ein' },
        ],
      },
      {
        id: 'separable-untrennbar',
        title: 'Неотделяемые приставки (untrennbare Verben)',
        body: 'Неотделяемые приставки никогда не отрываются от глагола. Ударение — на корне, не на приставке. Partizip II образуется без ge-. Приставки: be-, er-, ge-, miss-, ver-, zer-, ent-, emp-.',
        table: {
          headers: ['Глагол', 'Перевод', 'Partizip II'],
          rows: [
            ['besuchen', 'посещать', 'besucht (без ge-)'],
            ['erklären', 'объяснять', 'erklärt'],
            ['vergessen', 'забывать', 'vergessen'],
            ['verstehen', 'понимать', 'verstanden'],
            ['bezahlen', 'платить', 'bezahlt'],
            ['entscheiden', 'решать', 'entschieden'],
          ],
        },
        examples: [
          { ro: 'Ich verstehe das nicht.', ru: 'Я этого не понимаю.', note: 'ver- — не отделяется' },
          { ro: 'Er hat das vergessen.', ru: 'Он это забыл.', note: 'Partizip II без ge-' },
          { ro: 'Sie erklärt die Aufgabe.', ru: 'Она объясняет задание.' },
          { ro: 'Er bezahlt die Rechnung.', ru: 'Он оплачивает счёт.' },
          { ro: 'Ich entscheide mich für das rote.', ru: 'Я выбираю красное.', note: 'entscheiden — неотд., без ge-' },
          { ro: 'Er versteht das sofort.', ru: 'Он сразу это понимает.', note: 'verstehen — ver- неотделяемая' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 13. СОСЛАГАТЕЛЬНОЕ НАКЛОНЕНИЕ (KONJUNKTIV II)
  // ─────────────────────────────────────────────
  {
    id: 'konjunktiv',
    title: 'Сослагательное наклонение',
    icon: '💭',
    description: 'Konjunktiv II — вежливые просьбы, условные предложения, нереальные ситуации',
    sections: [
      {
        id: 'konjunktiv-würde',
        title: 'Konjunktiv II с würde + инфинитив',
        body: 'Самый простой способ образовать сослагательное: würde (спрягается) + инфинитив в конце. Würde — это Konjunktiv II от werden. Используется для вежливых просьб, гипотетических ситуаций, вежливых предложений.',
        table: {
          headers: ['Лицо', 'würde'],
          rows: [
            ['ich', 'würde'],
            ['du', 'würdest'],
            ['er/sie/es', 'würde'],
            ['wir', 'würden'],
            ['ihr', 'würdet'],
            ['sie/Sie', 'würden'],
          ],
        },
        examples: [
          { ro: 'Ich würde gern mitkommen.', ru: 'Я бы с удовольствием пошёл.' },
          { ro: 'Würdest du mir helfen?', ru: 'Ты бы мне помог?', note: 'вежливая просьба' },
          { ro: 'Was würdest du machen?', ru: 'Что бы ты сделал?' },
          { ro: 'Er würde das nie sagen.', ru: 'Он бы никогда этого не сказал.' },
          { ro: 'Ich würde gern reisen, wenn ich Geld hätte.', ru: 'Я бы путешествовал, если бы были деньги.' },
          { ro: 'Was würden Sie empfehlen?', ru: 'Что бы вы порекомендовали?' },
        ],
      },
      {
        id: 'konjunktiv-synthetic',
        title: 'Konjunktiv II синтетический (sein, haben, модальные)',
        body: 'Глаголы sein, haben и модальные образуют Konjunktiv II собственными формами (без würde). Это звучит естественнее и чаще используется в речи. Основа берётся из Präteritum + умлаут (если возможно) + окончания -e, -est, -e, -en, -et, -en.',
        table: {
          headers: ['Глагол', 'ich', 'du', 'er/sie/es'],
          rows: [
            ['sein (war→)', 'wäre', 'wärst', 'wäre'],
            ['haben (hatte→)', 'hätte', 'hättest', 'hätte'],
            ['können (konnte→)', 'könnte', 'könntest', 'könnte'],
            ['müssen (musste→)', 'müsste', 'müsstest', 'müsste'],
            ['dürfen (durfte→)', 'dürfte', 'dürftest', 'dürfte'],
            ['wollen (wollte→)', 'wollte', 'wolltest', 'wollte'],
          ],
        },
        examples: [
          { ro: 'Wärst du bitte ruhig?', ru: 'Будь, пожалуйста, тише.', note: 'вежливая просьба' },
          { ro: 'Hätten Sie einen Moment Zeit?', ru: 'Нашлась бы у вас минутка?', note: 'вежливое обращение' },
          { ro: 'Das könnte sein.', ru: 'Это возможно.', note: 'können → könnte' },
          { ro: 'Ich dürfte das eigentlich nicht sagen.', ru: 'Мне, собственно, не следовало бы этого говорить.' },
          { ro: 'Wenn ich mehr Zeit hätte, würde ich Sport treiben.', ru: 'Если бы было больше времени, я бы занимался спортом.' },
          { ro: 'Müsste ich das wirklich tun?', ru: 'Мне действительно пришлось бы это делать?' },
        ],
      },
      {
        id: 'konjunktiv-conditions',
        title: 'Условные предложения',
        body: 'Нереальные условные предложения строятся на Konjunktiv II. Союз wenn (если) вводит условие, главное предложение — следствие. Если wenn стоит в начале — в главном предложении инверсия (dann + глагол или только глагол).',
        examples: [
          { ro: 'Wenn ich Zeit hätte, würde ich mehr lesen.', ru: 'Если бы у меня было время, я бы больше читал.' },
          { ro: 'Wenn er reicher wäre, würde er ein Haus kaufen.', ru: 'Если бы он был богаче, он бы купил дом.' },
          { ro: 'Wenn ich das gewusst hätte, wäre ich nicht gekommen.', ru: 'Если бы я это знал, я бы не пришёл.', note: 'нереальное условие в прошлом' },
          { ro: 'Wenn ich du wäre, würde ich nicht gehen.', ru: 'На твоём месте я бы не шёл.' },
          { ro: 'Wenn es nicht so kalt wäre, würden wir spazieren gehen.', ru: 'Если бы не было так холодно, мы бы пошли гулять.' },
          { ro: 'Wenn ich das früher gewusst hätte, hätte ich anders gehandelt.', ru: 'Если бы я знал раньше, я бы действовал иначе.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 14. ПАССИВНЫЙ ЗАЛОГ
  // ─────────────────────────────────────────────
  {
    id: 'passive',
    title: 'Пассивный залог',
    icon: '🔄',
    description: 'Vorgangspassiv с werden, Zustandspassiv с sein',
    sections: [
      {
        id: 'passive-werden',
        title: 'Vorgangspassiv (процессный пассив)',
        body: 'Образуется: werden (спрягается, 2-я позиция) + Partizip II в конце. Показывает действие/процесс. Деятель может быть указан через «von + Dativ». Если деятель неизвестен или неважен — опускается.',
        table: {
          headers: ['Время', 'Структура', 'Пример'],
          rows: [
            ['Präsens', 'wird + Part. II', 'Das Buch wird gelesen.'],
            ['Präteritum', 'wurde + Part. II', 'Das Buch wurde gelesen.'],
            ['Perfekt', 'ist + Part. II + worden', 'Das Buch ist gelesen worden.'],
          ],
        },
        examples: [
          { ro: 'Das Haus wird gebaut.', ru: 'Дом строится.', note: 'Präsens пассив' },
          { ro: 'Das Fenster wurde geöffnet.', ru: 'Окно открыли / было открыто.', note: 'Präteritum пассив' },
          { ro: 'Das Buch wird von ihm gelesen.', ru: 'Книгу читает он.', note: 'von + Dativ = деятель' },
          { ro: 'Die Stadt wurde 1850 gegründet.', ru: 'Город был основан в 1850 году.' },
          { ro: 'Die Aufgaben werden täglich kontrolliert.', ru: 'Задания проверяются ежедневно.' },
          { ro: 'Das Paket wird morgen geliefert.', ru: 'Посылка будет доставлена завтра.' },
        ],
      },
      {
        id: 'passive-sein',
        title: 'Zustandspassiv (пассив состояния)',
        body: 'Образуется с sein + Partizip II. Описывает результирующее состояние, а не сам процесс. Сравни: Das Fenster wird geöffnet (его открывают — процесс) vs. Das Fenster ist geöffnet (оно открыто — состояние).',
        examples: [
          { ro: 'Das Geschäft ist geschlossen.', ru: 'Магазин закрыт.', note: 'состояние, а не действие' },
          { ro: 'Die Aufgabe ist erledigt.', ru: 'Задача выполнена.' },
          { ro: 'Die Tür ist geöffnet.', ru: 'Дверь открыта.' },
          { ro: 'Die Küche ist aufgeräumt.', ru: 'Кухня убрана.' },
          { ro: 'Ist der Brief schon abgeschickt?', ru: 'Письмо уже отправлено?' },
          { ro: 'Der Vertrag ist unterschrieben.', ru: 'Договор подписан.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 15. ОТНОСИТЕЛЬНЫЕ ПРЕДЛОЖЕНИЯ
  // ─────────────────────────────────────────────
  {
    id: 'relative-clauses',
    title: 'Относительные предложения',
    icon: '🔗',
    description: 'Relativsätze — относительные местоимения и порядок слов',
    sections: [
      {
        id: 'relative-pronouns',
        title: 'Относительные местоимения',
        body: 'Относительное местоимение согласуется с антецедентом (словом, которое оно заменяет) в роде и числе, а падеж определяется его ролью в придаточном предложении. Формы почти совпадают с определённым артиклем — кроме Dativ мн.ч. (denen) и Genitiv (dessen/deren).',
        table: {
          headers: ['Падеж', 'м.р.', 'ж.р.', 'ср.р.', 'мн.ч.'],
          rows: [
            ['Nom.', 'der', 'die', 'das', 'die'],
            ['Akk.', 'den', 'die', 'das', 'die'],
            ['Dat.', 'dem', 'der', 'dem', 'denen'],
            ['Gen.', 'dessen', 'deren', 'dessen', 'deren'],
          ],
        },
        examples: [
          { ro: 'Der Mann, der dort steht, ist mein Vater.', ru: 'Мужчина, который стоит там, — мой отец.', note: 'м.р., Nom.' },
          { ro: 'Die Frau, die ich sehe, ist Ärztin.', ru: 'Женщина, которую я вижу, — врач.', note: 'ж.р., Akk.' },
          { ro: 'Das Kind, dem ich helfe, heißt Max.', ru: 'Ребёнка, которому я помогаю, зовут Макс.', note: 'ср.р., Dat.' },
          { ro: 'Der Mann, dessen Buch ich lese, ist Autor.', ru: 'Мужчина, книгу которого я читаю, — автор.', note: 'Gen. — dessen' },
          { ro: 'Die Frau, deren Mann Arzt ist, kommt.', ru: 'Женщина, чей муж врач, приходит.', note: 'Gen. ж.р. — deren' },
          { ro: 'Die Bücher, die ich lese, sind interessant.', ru: 'Книги, которые я читаю, интересные.', note: 'мн.ч., Akk.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 16. ПРЕДЛОЖЕНИЯ С ИНФИНИТИВОМ
  // ─────────────────────────────────────────────
  {
    id: 'infinitive-clauses',
    title: 'Инфинитивные конструкции',
    icon: '🔤',
    description: 'zu + Infinitiv, um...zu, ohne...zu, statt...zu',
    sections: [
      {
        id: 'infinitive-zu',
        title: 'zu + Infinitiv',
        body: 'После многих глаголов и выражений инфинитив главного глагола ставится с zu. Инфинитив с zu — в конце предложения. При отделяемых глаголах zu вставляется между приставкой и основой: auf|zu|stehen.',
        table: {
          headers: ['Конструкция', 'Пример'],
          rows: [
            ['versuchen + zu', 'Ich versuche, Deutsch zu lernen.'],
            ['vergessen + zu', 'Er hat vergessen, mich anzurufen.'],
            ['anfangen + zu', 'Sie fängt an, zu weinen.'],
            ['vorhaben + zu', 'Ich habe vor, nach Berlin zu fahren.'],
            ['es ist + Adj. + zu', 'Es ist wichtig, pünktlich zu sein.'],
          ],
        },
        examples: [
          { ro: 'Ich versuche, das Buch zu lesen.', ru: 'Я пытаюсь прочитать книгу.', note: 'zapятая перед zu-группой' },
          { ro: 'Er vergaß, die Tür abzuschließen.', ru: 'Он забыл запереть дверь.', note: 'ab-zu-schließen — приставка' },
          { ro: 'Er hat keine Zeit, mich anzurufen.', ru: 'У него нет времени позвонить мне.' },
          { ro: 'Es ist schwierig, Deutsch zu lernen.', ru: 'Трудно учить немецкий.', note: 'es ist + adj. + zu' },
          { ro: 'Ich habe vor, morgen früh aufzustehen.', ru: 'Я планирую завтра рано встать.', note: 'vorhaben: auf-zu-stehen' },
          { ro: 'Sie versucht, jeden Tag Sport zu machen.', ru: 'Она старается каждый день заниматься спортом.' },
        ],
      },
      {
        id: 'infinitive-um-zu',
        title: 'um...zu, ohne...zu, statt...zu',
        body: 'um...zu = чтобы (цель); ohne...zu = не + деепричастие (без того чтобы); statt...zu = вместо того чтобы. Все три требуют инфинитива в конце, одного субъекта в обоих частях предложения. Всегда запятая.',
        examples: [
          { ro: 'Ich lerne Deutsch, um in Berlin zu arbeiten.', ru: 'Я учу немецкий, чтобы работать в Берлине.', note: 'um...zu = цель' },
          { ro: 'Er geht weg, ohne ein Wort zu sagen.', ru: 'Он уходит, не говоря ни слова.', note: 'ohne...zu' },
          { ro: 'Statt zu lernen, spielt er Computerspiele.', ru: 'Вместо того чтобы учиться, он играет в компьютерные игры.', note: 'statt...zu' },
          { ro: 'Er spart Geld, um ein Auto zu kaufen.', ru: 'Он копит деньги, чтобы купить машину.' },
          { ro: 'Sie spricht laut, ohne zu schreien.', ru: 'Она говорит громко, не крича.' },
          { ro: 'Statt zu arbeiten, schläft er.', ru: 'Вместо того чтобы работать, он спит.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 17. ВОПРОСЫ И ВОПРОСИТЕЛЬНЫЕ СЛОВА
  // ─────────────────────────────────────────────
  {
    id: 'questions',
    title: 'Вопросы',
    icon: '❓',
    description: 'Вопросительные слова, общие вопросы, косвенные вопросы',
    sections: [
      {
        id: 'questions-w-words',
        title: 'Вопросительные слова (W-Fragen)',
        body: 'В немецком все вопросительные слова начинаются на W. После вопросительного слова — глагол на 2-м месте, субъект — на 3-м.',
        table: {
          headers: ['Слово', 'Значение', 'Пример'],
          rows: [
            ['wer', 'кто', 'Wer ist das?'],
            ['was', 'что', 'Was machst du?'],
            ['wo', 'где', 'Wo wohnst du?'],
            ['wohin', 'куда', 'Wohin gehst du?'],
            ['woher', 'откуда', 'Woher kommst du?'],
            ['wann', 'когда', 'Wann kommst du?'],
            ['warum', 'почему', 'Warum lernst du Deutsch?'],
            ['wie', 'как / сколько', 'Wie heißt du? Wie viel kostet das?'],
            ['wie viele', 'сколько (счётное)', 'Wie viele Kinder hast du?'],
            ['welch-', 'какой, который', 'Welches Buch liest du?'],
            ['wessen', 'чей', 'Wessen Buch ist das?'],
            ['wen', 'кого (Akk.)', 'Wen siehst du?'],
            ['wem', 'кому (Dat.)', 'Wem gibst du das Buch?'],
          ],
        },
        examples: [
          { ro: 'Warum lernst du Deutsch?', ru: 'Почему ты учишь немецкий?' },
          { ro: 'Woher kommst du?', ru: 'Откуда ты?' },
          { ro: 'Welchen Film siehst du?', ru: 'Какой фильм ты смотришь?', note: 'welch- склоняется' },
          { ro: 'Was kostet das?', ru: 'Сколько это стоит?' },
          { ro: 'Wie lange dauert die Fahrt?', ru: 'Как долго длится поездка?' },
          { ro: 'Wessen Tasche ist das?', ru: 'Чья это сумка?', note: 'Genitiv-вопрос' },
        ],
      },
      {
        id: 'questions-yes-no',
        title: 'Общие вопросы (Ja/Nein-Fragen)',
        body: 'Вопрос «да/нет» образуется вынесением спрягаемого глагола на 1-е место. Субъект встаёт на 2-е. Ответ: Ja (да), Nein (нет), Doch (да, но в ответ на отрицательный вопрос).',
        examples: [
          { ro: 'Kommst du morgen?', ru: 'Ты придёшь завтра?' },
          { ro: 'Hast du ein Auto?', ru: 'У тебя есть машина?' },
          { ro: 'Sprichst du kein Deutsch? — Doch!', ru: 'Ты не говоришь по-немецки? — Нет, говорю!', note: 'Doch = «нет, всё-таки да»' },
          { ro: 'Bist du müde?', ru: 'Ты устал?' },
          { ro: 'Hast du das verstanden?', ru: 'Ты понял?' },
          { ro: '— Magst du Kaffee nicht? — Doch, sehr!', ru: '— Ты не любишь кофе? — Нет, очень!', note: 'Doch на отрицательный вопрос' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 18. СОЮЗЫ И СВЯЗКИ
  // ─────────────────────────────────────────────
  {
    id: 'conjunctions',
    title: 'Союзы и связки',
    icon: '🔗',
    description: 'Сочинительные (координирующие) и подчинительные союзы',
    sections: [
      {
        id: 'conjunctions-coordinating',
        title: 'Сочинительные союзы',
        body: 'Сочинительные союзы соединяют равноправные части и не меняют порядок слов в предложении: und (и), aber (но), oder (или), denn (потому что — с нормальным порядком!), sondern (а, напротив — после отрицания).',
        table: {
          headers: ['Союз', 'Значение', 'Пример'],
          rows: [
            ['und', 'и', 'Ich lerne und arbeite.'],
            ['aber', 'но, однако', 'Er ist müde, aber er arbeitet.'],
            ['oder', 'или', 'Tee oder Kaffee?'],
            ['denn', 'потому что (разг.)', 'Ich bleibe, denn es regnet.'],
            ['sondern', 'а, напротив', 'Nicht er, sondern sie kommt.'],
          ],
        },
        examples: [
          { ro: 'Ich bin müde, aber ich muss lernen.', ru: 'Я устал, но мне нужно учиться.' },
          { ro: 'Er kommt nicht, denn er ist krank.', ru: 'Он не придёт, потому что он болен.', note: 'denn — нормальный порядок' },
          { ro: 'Nicht Peter, sondern Maria hat gewonnen.', ru: 'Победила не Петер, а Мария.' },
          { ro: 'Er mag Kaffee, aber keine Milch.', ru: 'Он любит кофе, но не молоко.' },
          { ro: 'Lernst du Deutsch oder Französisch?', ru: 'Ты учишь немецкий или французский?' },
          { ro: 'Nicht er, sondern ich habe das gemacht.', ru: 'Не он, а я это сделал.' },
        ],
      },
      {
        id: 'conjunctions-subordinating',
        title: 'Подчинительные союзы',
        body: 'После подчинительного союза глагол уходит в конец придаточного предложения. Самые важные: weil, dass, wenn, ob, obwohl, als, nachdem, bevor, damit, sodass.',
        table: {
          headers: ['Союз', 'Значение', 'Пример'],
          rows: [
            ['weil', 'потому что', 'weil er krank ist'],
            ['dass', 'что', 'dass sie kommt'],
            ['wenn', 'если / когда (повтор.)', 'wenn es regnet'],
            ['als', 'когда (однократн. в прошлом)', 'als ich jung war'],
            ['ob', 'ли', 'ob er kommt'],
            ['obwohl', 'хотя', 'obwohl es kalt ist'],
            ['damit', 'чтобы (разные субъекты)', 'damit er schlafen kann'],
            ['bevor', 'до того как, прежде чем', 'bevor ich schlafe'],
            ['nachdem', 'после того как', 'nachdem er gegessen hat'],
            ['sodass', 'так что', 'sodass ich müde bin'],
          ],
        },
        examples: [
          { ro: 'Ich lerne, weil ich eine Prüfung habe.', ru: 'Я учусь, потому что у меня экзамен.' },
          { ro: 'Als ich Kind war, wohnte ich in München.', ru: 'Когда я был ребёнком, я жил в Мюнхене.', note: 'als — однократное прошлое' },
          { ro: 'Ich weiß nicht, ob er kommt.', ru: 'Я не знаю, придёт ли он.' },
          { ro: 'Ich rufe an, bevor ich komme.', ru: 'Я позвоню, прежде чем прийти.' },
          { ro: 'Nachdem er gegessen hatte, schlief er ein.', ru: 'После того как он поел, он заснул.' },
          { ro: 'Sie bleibt zu Hause, obwohl es schön ist.', ru: 'Она остаётся дома, хотя погода хорошая.' },
        ],
      },
      {
        id: 'conjunctions-adverbs',
        title: 'Союзные наречия (Konjunktionaladverbien)',
        body: 'Эти слова занимают 1-ю позицию в предложении и вызывают инверсию (глагол на 2-м месте). Они соединяют предложения по смыслу, но формально — это не союзы.',
        table: {
          headers: ['Слово', 'Значение'],
          rows: [
            ['deshalb / deswegen', 'поэтому, по этой причине'],
            ['trotzdem', 'тем не менее, несмотря на это'],
            ['außerdem', 'кроме того, вдобавок'],
            ['dann', 'потом, тогда'],
            ['danach', 'после этого'],
            ['davor', 'перед этим'],
            ['jedoch', 'однако, но'],
            ['also', 'итак, следовательно'],
            ['zum Beispiel', 'например'],
            ['zum Schluss / schließlich', 'наконец, в конце концов'],
          ],
        },
        examples: [
          { ro: 'Es regnet, deshalb bleibe ich zu Hause.', ru: 'Идёт дождь, поэтому я остаюсь дома.', note: 'deshalb на 1-м месте → инверсия' },
          { ro: 'Er ist müde, trotzdem arbeitet er.', ru: 'Он устал, тем не менее работает.' },
          { ro: 'Außerdem habe ich keine Zeit.', ru: 'Кроме того, у меня нет времени.' },
          { ro: 'Ich bin krank, deshalb bleibe ich zu Hause.', ru: 'Я болен, поэтому остаюсь дома.' },
          { ro: 'Er hat wenig Geld, trotzdem kauft er viel.', ru: 'У него мало денег, тем не менее покупает много.' },
          { ro: 'Außerdem brauche ich noch Milch.', ru: 'Кроме того, мне ещё нужно молоко.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 19. РАЗДЕЛИТЕЛЬНЫЕ ГЛАГОЛЫ В ПРОШЕДШЕМ И ПРИДАТОЧНОМ
  // ─────────────────────────────────────────────
  {
    id: 'separable-advanced',
    title: 'Особые случаи с глаголами',
    icon: '🧩',
    description: 'Отделяемые в Perfekt, в придаточных, Infinitiv mit zu',
    sections: [
      {
        id: 'separable-perfekt',
        title: 'Отделяемые глаголы в Perfekt',
        body: 'В Partizip II отделяемые приставки возвращаются на место — ge- вставляется между приставкой и основой: auf + ge + standen = aufgestanden. В придаточном предложении отделяемый глагол не разделяется — он стоит целиком в конце.',
        table: {
          headers: ['Глагол', 'Partizip II', 'В придаточном'],
          rows: [
            ['aufstehen', 'aufgestanden', 'weil er aufgestanden ist'],
            ['anrufen', 'angerufen', 'dass sie angerufen hat'],
            ['einladen', 'eingeladen', 'ob er eingeladen wurde'],
            ['mitkommen', 'mitgekommen', 'weil er mitgekommen ist'],
          ],
        },
        examples: [
          { ro: 'Er ist früh aufgestanden.', ru: 'Он рано встал.', note: 'auf-ge-standen' },
          { ro: 'Sie hat mich angerufen.', ru: 'Она мне позвонила.', note: 'an-ge-rufen' },
          { ro: 'Ich weiß, dass er mitgekommen ist.', ru: 'Я знаю, что он пришёл с нами.', note: 'в Nebensatz не разделяется' },
          { ro: 'Hast du mich angerufen?', ru: 'Ты мне звонил?', note: 'anrufen → angerufen' },
          { ro: 'Wann seid ihr abgefahren?', ru: 'Когда вы уехали?', note: 'abfahren → abgefahren, sein' },
          { ro: 'Sie hat ihn eingeladen.', ru: 'Она его пригласила.', note: 'einladen → eingeladen' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 20. УСТОЙЧИВЫЕ ВЫРАЖЕНИЯ И ФРАЗЕОЛОГИЯ
  // ─────────────────────────────────────────────
  {
    id: 'phraseology',
    title: 'Устойчивые выражения',
    icon: '🧩',
    description: 'Идиомы, глагольные сочетания, дискурсивные связки',
    sections: [
      {
        id: 'phrase-verbs',
        title: 'Глагольные устойчивые сочетания',
        body: 'Устойчивые сочетания «глагол + существительное» переводятся как единое понятие. Дословный перевод даёт бессмыслицу.',
        table: {
          headers: ['Выражение', 'Перевод', 'Буквально'],
          rows: [
            ['eine Entscheidung treffen', 'принять решение', 'встретить решение'],
            ['eine Frage stellen', 'задать вопрос', 'поставить вопрос'],
            ['Bescheid geben/sagen', 'сообщить, дать знать', 'дать уведомление'],
            ['in Frage kommen', 'подходить, рассматриваться', 'приходить под вопрос'],
            ['zur Verfügung stehen', 'быть в распоряжении', 'стоять к распоряжению'],
            ['Rücksicht nehmen', 'считаться с кем-то, уважать', 'взять уважение'],
            ['Angst haben', 'бояться', 'иметь страх'],
            ['Recht haben', 'быть правым', 'иметь право'],
            ['Hunger haben', 'быть голодным', 'иметь голод'],
            ['Spaß machen', 'быть весёлым, нравиться', 'делать веселье'],
          ],
        },
        examples: [
          { ro: 'Kannst du mir Bescheid geben?', ru: 'Ты можешь мне сообщить?' },
          { ro: 'Er hat immer Recht.', ru: 'Он всегда прав.' },
          { ro: 'Das macht keinen Spaß.', ru: 'Это неинтересно / не весело.' },
          { ro: 'Sie hat die richtige Entscheidung getroffen.', ru: 'Она приняла правильное решение.' },
          { ro: 'Hast du Angst vor dem Hund?', ru: 'Ты боишься собаки?', note: 'Angst haben vor + Dativ' },
          { ro: 'Das macht mir Spaß!', ru: 'Мне это нравится / это весело!' },
        ],
      },
      {
        id: 'phrase-connectors',
        title: 'Дискурсивные связки',
        body: 'Слова-связки структурируют речь и делают её связной. Незаменимы при письменных ответах, сочинениях, аргументации.',
        table: {
          headers: ['Связка', 'Функция'],
          rows: [
            ['erstens... zweitens...', 'во-первых... во-вторых...'],
            ['einerseits... andererseits...', 'с одной стороны... с другой стороны...'],
            ['mit anderen Worten', 'другими словами'],
            ['zum Beispiel / beispielsweise', 'например'],
            ['im Allgemeinen', 'в целом / вообще говоря'],
            ['vor allem / insbesondere', 'прежде всего / в особенности'],
            ['schließlich / letztendlich', 'в конечном счёте / наконец'],
            ['eigentlich', 'собственно (говоря) / на самом деле'],
            ['trotzdem / dennoch', 'тем не менее / всё же'],
            ['also / daher / deshalb', 'итак / поэтому / следовательно'],
          ],
        },
        examples: [
          { ro: 'Einerseits ist es teuer, andererseits sehr praktisch.', ru: 'С одной стороны дорого, с другой — очень практично.' },
          { ro: 'Schließlich haben wir eine Lösung gefunden.', ru: 'В конечном счёте мы нашли решение.' },
          { ro: 'Also, was machen wir jetzt?', ru: 'Итак, что мы теперь делаем?' },
          { ro: 'Vor allem ist es wichtig, regelmäßig zu üben.', ru: 'Прежде всего важно регулярно тренироваться.' },
          { ro: 'Im Allgemeinen bin ich damit einverstanden.', ru: 'В целом я с этим согласен.' },
          { ro: 'Letztendlich hat alles geklappt.', ru: 'В конечном счёте всё получилось.' },
        ],
      },
      {
        id: 'phrase-everyday',
        title: 'Повседневные выражения',
        body: 'Устойчивые фразы — самостоятельные высказывания, которые не разбираются по частям. Правила порядка слов и падежей к ним не применяются — учить как цельные блоки. Многие образованы от глаголов с отделяемыми приставками или содержат застывшие падежные формы.',
        table: {
          headers: ['Выражение', 'Перевод', 'Когда'],
          rows: [
            ['Das macht nichts.', 'Ничего страшного. / Не важно.', 'утешение, извинение принято'],
            ['Kein Problem.', 'Нет проблем.', 'согласие, лёгкость'],
            ['Das geht nicht.', 'Это невозможно. / Так не получится.', 'отказ'],
            ['Genau!', 'Точно! / Именно!', 'подтверждение'],
            ['Na ja.', 'Ну, в общем...', 'сомнение, уклонение'],
            ['Wie bitte?', 'Простите?', 'переспросить'],
            ['Alles klar!', 'Всё ясно! / Окей!', 'понимание'],
            ['Viel Spaß!', 'Приятного / Удачи!', 'пожелание при расставании'],
            ['Gute Besserung!', 'Скорейшего выздоровления!', 'больному'],
            ['Herzlichen Glückwunsch!', 'Поздравляю! С праздником!', 'поздравление'],
          ],
        },
        examples: [
          { ro: 'Das macht nichts, ich helfe dir gern.', ru: 'Ничего страшного, я охотно тебе помогу.' },
          { ro: 'Wie bitte? Kannst du das wiederholen?', ru: 'Простите? Ты можешь повторить?' },
          { ro: 'Herzlichen Glückwunsch zum Geburtstag!', ru: 'С днём рождения!' },
          { ro: 'Kein Problem! Ich helfe dir gern.', ru: 'Нет проблем! Я охотно помогу.' },
          { ro: 'Alles klar, ich mache das sofort.', ru: 'Всё ясно, сделаю это сразу.' },
          { ro: 'Viel Erfolg bei der Prüfung!', ru: 'Удачи на экзамене!' },
        ],
      },
    ],
  },
]

// ─────────────────────────────────────────────
// 21. ПРЕДПРОШЕДШЕЕ ВРЕМЯ (PLUSQUAMPERFEKT)
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'plusquamperfekt',
  title: 'Предпрошедшее время',
  icon: '⏪',
  description: 'Plusquamperfekt — действие, завершённое до другого действия в прошлом',
  sections: [
    {
      id: 'plusquamperfekt-formation',
      title: 'Образование',
      body: 'Plusquamperfekt образуется по той же схеме, что и Perfekt, но вспомогательный глагол (haben или sein) стоит в Präteritum: hatte/war + Partizip II. Используется для обозначения действия, которое произошло раньше другого действия в прошлом.',
      table: {
        headers: ['Лицо', 'haben → Plusqpf.', 'sein → Plusqpf.'],
        rows: [
          ['ich', 'hatte gemacht', 'war gegangen'],
          ['du', 'hattest gemacht', 'warst gegangen'],
          ['er/sie/es', 'hatte gemacht', 'war gegangen'],
          ['wir', 'hatten gemacht', 'waren gegangen'],
          ['ihr', 'hattet gemacht', 'wart gegangen'],
          ['sie/Sie', 'hatten gemacht', 'waren gegangen'],
        ],
      },
      examples: [
        { ro: 'Als ich ankam, hatte er schon gegessen.', ru: 'Когда я пришёл, он уже поел.', note: 'поел раньше, чем я пришёл' },
        { ro: 'Sie war schon eingeschlafen, als das Telefon klingelte.', ru: 'Она уже спала, когда зазвонил телефон.' },
        { ro: 'Er hatte das Buch gelesen, bevor er den Film sah.', ru: 'Он прочитал книгу до того, как посмотрел фильм.' },
        { ro: 'Er hatte die Aufgabe schon erledigt, als ich ankam.', ru: 'Он уже выполнил задание, когда я пришёл.' },
        { ro: 'Nachdem wir angekommen waren, gingen wir schlafen.', ru: 'После того как мы приехали, мы пошли спать.' },
        { ro: 'Sie hatte noch nie Sushi gegessen, bevor sie nach Japan fuhr.', ru: 'Она никогда не ела суши до поездки в Японию.' },
      ],
    },
    {
      id: 'plusquamperfekt-nachdem',
      title: 'Союз nachdem',
      body: '«Nachdem» (после того как) почти всегда требует Plusquamperfekt в придаточном предложении, а главное — в Präteritum или Perfekt. Это самый типичный контекст для Plusquamperfekt. Сравни: «als» + Präteritum/Perfekt описывает одновременность, «nachdem» + Plusquamperfekt — строгую последовательность.',
      examples: [
        { ro: 'Nachdem er die Prüfung bestanden hatte, feierten sie.', ru: 'После того как он сдал экзамен, они отпраздновали.' },
        { ro: 'Nachdem wir gegessen hatten, gingen wir spazieren.', ru: 'После того как мы поели, мы пошли гулять.' },
        { ro: 'Nachdem er das Buch gelesen hatte, gab er es zurück.', ru: 'После того как он прочитал книгу, он её вернул.' },
        { ro: 'Nachdem sie angekommen waren, ruhten sie sich aus.', ru: 'После того как они приехали, они отдохнули.' },
        { ro: 'Als vs. Nachdem: Als sie ankam, schlief er. (одновременно) / Nachdem sie gegessen hatte, schlief er. (сначала — потом)', ru: 'als — одновременно, nachdem — строгая последовательность' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 22. ДАТЕЛЬНЫЙ ПАДЕЖ: ДЕТАЛИ И ЧАСТЫЕ ОШИБКИ
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'dative-details',
  title: 'Дативный падеж: детали',
  icon: '🎯',
  description: 'Dativ при глаголах, прилагательных, -n во мн. числе',
  sections: [
    {
      id: 'dative-verbs',
      title: 'Глаголы, управляющие Dativ',
      body: 'Ряд немецких глаголов управляет только дательным падежом — они не берут Akkusativ. Их нужно учить отдельно. Особенно важны: helfen, danken, gefallen, gehören, folgen, glauben, antworten.',
      table: {
        headers: ['Глагол', 'Значение', 'Пример'],
        rows: [
          ['helfen', 'помогать', 'Ich helfe dir.'],
          ['danken', 'благодарить', 'Ich danke Ihnen.'],
          ['gefallen', 'нравиться', 'Das gefällt mir.'],
          ['gehören', 'принадлежать', 'Das gehört mir.'],
          ['folgen', 'следовать', 'Folgen Sie mir.'],
          ['antworten', 'отвечать', 'Er antwortet dem Lehrer.'],
          ['glauben', 'верить (кому)', 'Ich glaube dir.'],
          ['fehlen', 'не хватать', 'Du fehlst mir.'],
        ],
      },
      examples: [
        { ro: 'Das Buch gefällt mir sehr.', ru: 'Эта книга мне очень нравится.', note: 'gefallen + Dativ (не mir mag)' },
        { ro: 'Kannst du mir helfen?', ru: 'Ты можешь мне помочь?' },
        { ro: 'Du fehlst mir.', ru: 'Ты мне нужен / мне тебя не хватает.', note: 'буквально: ты отсутствуешь у меня' },
        { ro: 'Das gehört mir nicht.', ru: 'Это мне не принадлежит.' },
        { ro: 'Folgen Sie mir bitte!', ru: 'Следуйте за мной, пожалуйста!' },
      ],
    },
    {
      id: 'dative-plural-n',
      title: 'Окончание -n во мн. числе Dativ',
      body: 'Важное правило: существительные во множественном числе в дательном падеже получают окончание -n, если форма мн. числа уже не оканчивается на -n или -s. Артикль «den» сигнализирует Dativ мн. числа.',
      table: {
        headers: ['Мн. число (Nom.)', 'Мн. число (Dativ)', 'Пример'],
        rows: [
          ['die Kinder', 'den Kindern', 'mit den Kindern'],
          ['die Bücher', 'den Büchern', 'von den Büchern'],
          ['die Männer', 'den Männern', 'bei den Männern'],
          ['die Frauen', 'den Frauen (уже -n)', 'mit den Frauen'],
          ['die Autos', 'den Autos (уже -s)', 'in den Autos'],
        ],
      },
      examples: [
        { ro: 'Ich spiele mit den Kindern.', ru: 'Я играю с детьми.', note: 'Kindern — Dativ мн. ч.' },
        { ro: 'Das Buch liegt zwischen den Büchern.', ru: 'Книга лежит между книгами.' },
        { ro: 'Er fährt mit den Autos. (уже -s)', ru: 'Он едет на машинах.', note: 'Autos — не добавляем -n (уже -s)' },
        { ro: 'Sie hilft den Kindern bei den Hausaufgaben.', ru: 'Она помогает детям с домашними заданиями.' },
        { ro: 'Von den Ärzten bekam er verschiedene Meinungen.', ru: 'От врачей он получил разные мнения.' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 23. СОКРАЩЕНИЯ АРТИКЛЕЙ (VERSCHMELZUNGEN)
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'article-contractions',
  title: 'Сокращения артиклей',
  icon: '✂️',
  description: 'zum, zur, im, am, beim, vom — слияния предлога с артиклем',
  sections: [
    {
      id: 'contractions-main',
      title: 'Основные слияния',
      body: 'В немецком предлог + определённый артикль часто сливаются в одно слово. Это обязательные сокращения в разговорной и письменной речи — использовать полную форму там, где есть слияние, звучит неестественно. Исключение: когда артикль несёт особое ударение («Ich gehe in das Zimmer, не в другое»).',
      table: {
        headers: ['Предлог + артикль', 'Слияние', 'Пример'],
        rows: [
          ['an + dem', 'am', 'am Tisch, am Montag'],
          ['an + das', 'ans', 'ans Fenster gehen'],
          ['in + dem', 'im', 'im Haus, im Sommer'],
          ['in + das', 'ins', 'ins Kino gehen'],
          ['zu + dem', 'zum', 'zum Arzt, zum Bahnhof'],
          ['zu + der', 'zur', 'zur Schule, zur Arbeit'],
          ['bei + dem', 'beim', 'beim Arzt, beim Essen'],
          ['von + dem', 'vom', 'vom Chef, vom Bahnhof'],
          ['durch + das', 'durchs', 'durchs Fenster'],
          ['für + das', 'fürs', 'fürs Kind'],
        ],
      },
      examples: [
        { ro: 'Ich gehe zum Arzt.', ru: 'Я иду к врачу.', note: 'zu + dem = zum' },
        { ro: 'Sie fährt zur Schule.', ru: 'Она едет в школу.', note: 'zu + der = zur' },
        { ro: 'Wir treffen uns beim Bahnhof.', ru: 'Мы встречаемся у вокзала.', note: 'bei + dem = beim' },
        { ro: 'Im Sommer fahren wir ans Meer.', ru: 'Летом мы едем к морю.', note: 'in + dem = im; an + das = ans' },
        { ro: 'Er kommt vom Supermarkt.', ru: 'Он идёт из супермаркета.', note: 'von + dem = vom' },
      ],
    },
    {
      id: 'contractions-time',
      title: 'Время и даты',
      body: '«Am» используется для дней недели и дат, «im» — для месяцев и времён года. Это устойчивые конструкции, которые нужно знать наизусть.',
      table: {
        headers: ['Контекст', 'Предлог', 'Пример'],
        rows: [
          ['дни недели', 'am', 'am Montag, am Freitag'],
          ['дата', 'am', 'am dritten März'],
          ['месяц', 'im', 'im Januar, im August'],
          ['время года', 'im', 'im Winter, im Sommer'],
          ['год', 'im Jahr(e)', 'im Jahr 2025'],
          ['утро', 'am', 'am Morgen / morgens'],
          ['вечер', 'am', 'am Abend / abends'],
          ['ночь', 'in der', 'in der Nacht'],
        ],
      },
      examples: [
        { ro: 'Am Montag habe ich einen Termin.', ru: 'В понедельник у меня встреча.' },
        { ro: 'Im Sommer war es sehr heiß.', ru: 'Летом было очень жарко.' },
        { ro: 'Am dritten März hat er Geburtstag.', ru: 'Третьего марта у него день рождения.' },
        { ro: 'Am Abend gehen wir ins Theater.', ru: 'Вечером мы идём в театр.' },
        { ro: 'Im Jahr 2020 war alles anders.', ru: 'В 2020 году всё было иначе.' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 24. ДНИ НЕДЕЛИ, МЕСЯЦЫ, ВРЕМЯ СУТОК
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'time-calendar',
  title: 'Дни, месяцы, время суток',
  icon: '📅',
  description: 'Названия дней, месяцев и части суток с правильными предлогами',
  sections: [
    {
      id: 'days',
      title: 'Дни недели',
      body: 'Дни недели в немецком — мужского рода (der Montag). Пишутся с заглавной буквы. С «am» означают конкретный день, с «montags» (наречная форма) — регулярность («по понедельникам»). Неделя начинается с понедельника.',
      table: {
        headers: ['День', 'Немецкий', 'Регулярно (наречие)'],
        rows: [
          ['Понедельник', 'der Montag', 'montags'],
          ['Вторник', 'der Dienstag', 'dienstags'],
          ['Среда', 'der Mittwoch', 'mittwochs'],
          ['Четверг', 'der Donnerstag', 'donnerstags'],
          ['Пятница', 'der Freitag', 'freitags'],
          ['Суббота', 'der Samstag / Sonnabend', 'samstags'],
          ['Воскресенье', 'der Sonntag', 'sonntags'],
        ],
      },
      examples: [
        { ro: 'Am Montag habe ich frei.', ru: 'В понедельник у меня выходной.' },
        { ro: 'Montags gehe ich ins Fitnessstudio.', ru: 'По понедельникам я хожу в спортзал.', note: 'наречие — регулярность' },
        { ro: 'Was machst du am Wochenende?', ru: 'Что делаешь на выходных?' },
        { ro: 'Jeden Donnerstag haben wir Besprechung.', ru: 'Каждый четверг у нас совещание.' },
        { ro: 'Heute ist Mittwoch, morgen ist Donnerstag.', ru: 'Сегодня среда, завтра четверг.' },
        { ro: 'Freitags gehe ich früher nach Hause.', ru: 'По пятницам я ухожу домой пораньше.' },
      ],
    },
    {
      id: 'months',
      title: 'Месяцы',
      body: 'Месяцы в немецком — мужского рода (der Januar). С предлогом «im» обозначают месяц. Все пишутся с заглавной буквы.',
      table: {
        headers: ['Месяц', 'Немецкий', 'Месяц', 'Немецкий'],
        rows: [
          ['Январь', 'der Januar', 'Июль', 'der Juli'],
          ['Февраль', 'der Februar', 'Август', 'der August'],
          ['Март', 'der März', 'Сентябрь', 'der September'],
          ['Апрель', 'der April', 'Октябрь', 'der Oktober'],
          ['Май', 'der Mai', 'Ноябрь', 'der November'],
          ['Июнь', 'der Juni', 'Декабрь', 'der Dezember'],
        ],
      },
      examples: [
        { ro: 'Im Juli ist es sehr heiß.', ru: 'В июле очень жарко.' },
        { ro: 'Ich bin im März geboren.', ru: 'Я родился в марте.' },
        { ro: 'Von Mai bis September.', ru: 'С мая по сентябрь.' },
        { ro: 'Im Oktober wird es kühler.', ru: 'В октябре становится прохладнее.' },
        { ro: 'Anfang / Mitte / Ende März.', ru: 'В начале / в середине / в конце марта.' },
      ],
    },
    {
      id: 'time-parts',
      title: 'Время суток и выражения времени',
      body: 'Части суток используются с «am» (утро, день, вечер) и «in der» (ночь). Наречные формы (morgens, abends) не требуют предлога.',
      table: {
        headers: ['Время суток', 'С предлогом', 'Наречие', 'Пример'],
        rows: [
          ['утро', 'am Morgen', 'morgens', 'Morgens trinke ich Kaffee.'],
          ['день', 'am Mittag', 'mittags', 'Mittags esse ich warm.'],
          ['после обеда', 'am Nachmittag', 'nachmittags', '—'],
          ['вечер', 'am Abend', 'abends', 'Abends lese ich.'],
          ['ночь', 'in der Nacht', 'nachts', 'Nachts schlafe ich.'],
        ],
      },
      examples: [
        { ro: 'Morgens bin ich immer müde.', ru: 'По утрам я всегда устал.' },
        { ro: 'Wir treffen uns am Abend.', ru: 'Мы встречаемся вечером.' },
        { ro: 'Gestern — heute — morgen', ru: 'вчера — сегодня — завтра' },
        { ro: 'letzte Woche / nächste Woche', ru: 'на прошлой неделе / на следующей неделе' },
        { ro: 'letztes Jahr / nächstes Jahr', ru: 'в прошлом году / в следующем году' },
      ],
    },
    {
      id: 'time-clock',
      title: 'Который час',
      body: '«Wie viel Uhr ist es?» или «Wie spät ist es?» — который час? Официальное время (вокзал, расписание) использует 24-часовой формат. Разговорное — 12-часовой с уточнениями morgens/nachmittags.',
      table: {
        headers: ['Время', 'Официальное', 'Разговорное'],
        rows: [
          ['8:00', 'acht Uhr', 'acht (Uhr morgens)'],
          ['8:15', 'acht Uhr fünfzehn', 'Viertel nach acht'],
          ['8:30', 'acht Uhr dreißig', 'halb neun'],
          ['8:45', 'acht Uhr fünfundvierzig', 'Viertel vor neun'],
          ['12:00', 'zwölf Uhr', 'Mittag'],
          ['13:30', 'dreizehn Uhr dreißig', 'halb zwei (nachmittags)'],
        ],
      },
      examples: [
        { ro: 'Es ist halb neun.', ru: 'Половина девятого (8:30).', note: 'halb + следующий час' },
        { ro: 'Der Zug fährt um 14:35 ab.', ru: 'Поезд отправляется в 14:35.' },
        { ro: 'Um wie viel Uhr beginnt der Film?', ru: 'В котором часу начинается фильм?' },
        { ro: 'Es ist Viertel nach drei.', ru: 'Четверть четвёртого (3:15).' },
        { ro: 'Es ist kurz vor acht.', ru: 'Без нескольких минут восемь.', note: 'kurz vor/nach — чуть до/после' },
        { ro: 'Wir treffen uns um Punkt zwölf.', ru: 'Встречаемся ровно в двенадцать.', note: 'um Punkt = ровно' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 25. ТЕЛО ЧЕЛОВЕКА И ЗДОРОВЬЕ
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'body',
  title: 'Тело человека',
  icon: '🫀',
  description: 'Части тела, конструкции с болью, «у меня болит»',
  sections: [
    {
      id: 'body-parts',
      title: 'Основные части тела',
      body: 'Части тела в немецком имеют разные роды — их нужно учить с артиклем. Некоторые важные закономерности: -e на конце часто ж.р. (die Nase, die Wange), -en или сложные слова — м.р. (der Rücken, der Magen).',
      table: {
        headers: ['Часть тела', 'Немецкий', 'Род'],
        rows: [
          ['голова', 'der Kopf', 'м.р.'],
          ['лицо', 'das Gesicht', 'ср.р.'],
          ['глаз', 'das Auge', 'ср.р.'],
          ['нос', 'die Nase', 'ж.р.'],
          ['рот', 'der Mund', 'м.р.'],
          ['ухо', 'das Ohr', 'ср.р.'],
          ['рука (кисть)', 'die Hand', 'ж.р.'],
          ['рука (вся)', 'der Arm', 'м.р.'],
          ['нога (стопа)', 'der Fuß', 'м.р.'],
          ['нога (вся)', 'das Bein', 'ср.р.'],
          ['спина', 'der Rücken', 'м.р.'],
          ['сердце', 'das Herz', 'ср.р.'],
          ['живот', 'der Bauch / Magen', 'м.р.'],
          ['горло', 'der Hals', 'м.р.'],
        ],
      },
      examples: [
        { ro: 'Er hat blaue Augen.', ru: 'У него голубые глаза.' },
        { ro: 'Mein Rücken tut weh.', ru: 'У меня болит спина.' },
        { ro: 'Sie hat sich die Hand gebrochen.', ru: 'Она сломала руку.', note: 'sich + Dat. + часть тела' },
        { ro: 'Ich habe Zahnschmerzen — ich muss zum Zahnarzt.', ru: 'У меня болит зуб — мне надо к зубному.' },
        { ro: 'Mein Knie tut weh seit dem Sturz.', ru: 'У меня болит колено с тех пор, как я упал.' },
      ],
    },
    {
      id: 'body-pain',
      title: 'Конструкции с болью',
      body: 'В немецком есть два способа сказать «у меня болит»: (1) «Mir tut … weh» (Dativ + tut weh) — разговорный и очень частый; (2) «Ich habe … -schmerzen» (боль как существительное). Второй способ более медицинский.',
      table: {
        headers: ['Конструкция', 'Пример', 'Перевод'],
        rows: [
          ['Mir tut X weh', 'Mir tut der Kopf weh.', 'У меня болит голова.'],
          ['Ich habe X-schmerzen', 'Ich habe Kopfschmerzen.', 'У меня болит голова.'],
          ['Ich habe X-schmerzen', 'Ich habe Bauchschmerzen.', 'У меня болит живот.'],
          ['Mir tut X weh', 'Mir tut der Hals weh.', 'У меня болит горло.'],
        ],
      },
      examples: [
        { ro: 'Mir tut alles weh!', ru: 'У меня всё болит!' },
        { ro: 'Ich habe Halsschmerzen und Fieber.', ru: 'У меня болит горло и температура.' },
        { ro: 'Seit wann tut es weh?', ru: 'С каких пор болит?' },
        { ro: 'Er hat sich das Bein verletzt.', ru: 'Он ушиб ногу.' },
        { ro: 'Mir ist schlecht — ich glaube, ich habe mich erkältet.', ru: 'Мне плохо — кажется, я простудился.', note: 'erkälten sich = простудиться' },
        { ro: 'Ich brauche einen Arzt.', ru: 'Мне нужен врач.' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 26. РАЗГОВОРНЫЕ МЕХАНИКИ
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'conversation-mechanics',
  title: 'Разговорные механики',
  icon: '🗣️',
  description: 'Заполнители пауз, согласие/несогласие, переспрос, вступление в разговор',
  sections: [
    {
      id: 'conv-fillers',
      title: 'Заполнители пауз (Füllwörter)',
      body: 'В немецком разговорном языке очень активно используются так называемые Modalpartikeln — частицы, которые передают отношение говорящего и заполняют паузы. Без них речь звучит механически и иностранно. Частицы nicht переводятся дословно — их смысл в нюансе.',
      table: {
        headers: ['Слово/частица', 'Функция', 'Похоже на'],
        rows: [
          ['also...', 'итак, ну вот', 'русское «ну...», «значит...»'],
          ['na ja...', 'ну в общем, неопределённость', '«ну, ладно», «в общем»'],
          ['eigentlich', 'собственно говоря, на самом деле', '«вообще-то», «собственно»'],
          ['halt / eben', 'ну вот, просто (так есть)', '«просто», «ничего не поделаешь»'],
          ['doch', 'всё-таки, ведь, же', 'усиление, упрёк, подтверждение'],
          ['mal', 'смягчение просьбы', 'чуть-чуть, -ка'],
          ['ja', 'ведь, же (не вопрос)', 'подтверждение очевидного'],
          ['wohl', 'наверное, пожалуй', 'неуверенность'],
          ['irgendwie', 'как-то, каким-то образом', 'размытость'],
        ],
      },
      examples: [
        { ro: 'Also, was machen wir jetzt?', ru: 'Итак, что мы теперь делаем?' },
        { ro: 'Komm mal her!', ru: 'Поди-ка сюда! (смягчение)' },
        { ro: 'Das ist doch klar!', ru: 'Это же очевидно!', note: 'doch = усиление' },
        { ro: 'Er wohnt halt in Berlin.', ru: 'Он просто живёт в Берлине — ничего не поделаешь.' },
        { ro: 'Das ist ja interessant!', ru: 'Это ведь интересно!, Вот это да!', note: 'ja = удивление/подтверждение' },
      ],
    },
    {
      id: 'conv-agree-disagree',
      title: 'Согласие и несогласие',
      body: 'Просто «Ja» или «Nein» звучит резко. Немецкий располагает богатым набором градаций. Особо важен «Doch» — утвердительный ответ на отрицательный вопрос или отрицательное утверждение.',
      table: {
        headers: ['Фраза', 'Степень', 'Перевод'],
        rows: [
          ['Ja, genau!', 'полное согласие', 'Да, точно!'],
          ['Du hast recht.', 'согласие', 'Ты прав.'],
          ['Stimmt!', 'согласие', 'Верно! Точно!'],
          ['Ich glaube schon.', 'мягкое согласие', 'Я думаю, да.'],
          ['Vielleicht.', 'неуверенность', 'Может быть.'],
          ['Nicht unbedingt.', 'мягкое несогласие', 'Не обязательно.'],
          ['Da bin ich anderer Meinung.', 'несогласие', 'Я другого мнения.'],
          ['Das stimmt nicht.', 'несогласие', 'Это неверно.'],
          ['Doch!', 'возражение на отрицание', 'Нет, напротив! (всё-таки да)'],
        ],
      },
      examples: [
        { ro: '— Du sprichst kein Deutsch? — Doch!', ru: '— Ты не говоришь по-немецки? — Нет, говорю!', note: 'Doch — на отрицательный вопрос' },
        { ro: 'Ich glaube schon, dass es klappt.', ru: 'Думаю, да, что получится.' },
        { ro: 'Da bin ich anderer Meinung.', ru: 'Я здесь другого мнения.' },
        { ro: 'Das sehe ich genauso!', ru: 'Я вижу это точно так же!' },
        { ro: 'Das stimmt leider nicht.', ru: 'К сожалению, это неверно.' },
      ],
    },
    {
      id: 'conv-clarify',
      title: 'Уточнение и переспрос',
      body: 'Попросить повторить или объяснить — нормальная часть любого разговора. Носители относятся к этому нейтрально, особенно если слышат акцент.',
      table: {
        headers: ['Фраза', 'Перевод', 'Ситуация'],
        rows: [
          ['Wie bitte?', 'Простите?', 'переспрос (вежливо)'],
          ['Können Sie das wiederholen?', 'Вы можете повторить?', 'официально'],
          ['Kannst du das nochmal sagen?', 'Можешь повторить?', 'неформально'],
          ['Langsamer bitte!', 'Помедленнее, пожалуйста!', 'слишком быстро'],
          ['Was bedeutet das Wort...?', 'Что означает слово...?', 'незнакомое слово'],
          ['Wie sagt man... auf Deutsch?', 'Как сказать... по-немецки?', 'поиск слова'],
          ['Ich habe das nicht verstanden.', 'Я не понял.', 'прямо и вежливо'],
          ['Können Sie das erklären?', 'Вы можете объяснить?', 'нужно пояснение'],
        ],
      },
      examples: [
        { ro: 'Wie bitte? Ich habe das nicht verstanden.', ru: 'Простите? Я не понял.' },
        { ro: 'Könnten Sie bitte langsamer sprechen?', ru: 'Не могли бы вы говорить помедленнее?', note: 'Konjunktiv II — вежливо' },
        { ro: 'Was bedeutet „Fernweh"?', ru: 'Что означает «Fernweh»?' },
        { ro: 'Wie sagt man „уютный" auf Deutsch?', ru: 'Как сказать «уютный» по-немецки?' },
        { ro: 'Können Sie das bitte aufschreiben?', ru: 'Вы можете это записать, пожалуйста?' },
        { ro: 'Entschuldigung, ich habe das nicht ganz verstanden — können Sie das erklären?', ru: 'Извините, я не совсем понял — вы можете объяснить?' },
      ],
    },
    {
      id: 'conv-reactions',
      title: 'Устойчивые фразы-реакции',
      body: 'Короткие устойчивые фразы для реакции в разговоре — именно они делают речь живой.',
      table: {
        headers: ['Фраза', 'Перевод', 'Когда'],
        rows: [
          ['Das macht nichts.', 'Ничего страшного.', 'утешение, принятие извинения'],
          ['Kein Problem.', 'Нет проблем.', 'согласие'],
          ['Alles klar!', 'Всё ясно! Окей!', 'понимание'],
          ['Genau!', 'Точно! Именно!', 'подтверждение'],
          ['Na ja.', 'Ну, в общем...', 'сомнение, уклонение'],
          ['Das geht nicht.', 'Это невозможно.', 'отказ'],
          ['Nicht schlecht!', 'Неплохо!', 'умеренная похвала'],
          ['Gute Besserung!', 'Скорейшего выздоровления!', 'больному'],
          ['Viel Erfolg!', 'Удачи! Успехов!', 'пожелание' ],
          ['Herzlichen Glückwunsch!', 'Поздравляю!', 'поздравление'],
          ['Tut mir leid.', 'Мне жаль. Извини(те).', 'извинение/сочувствие'],
        ],
      },
      examples: [
        { ro: 'Tut mir leid, das habe ich vergessen.', ru: 'Извини, я забыл.' },
        { ro: 'Herzlichen Glückwunsch zum Geburtstag!', ru: 'С днём рождения!' },
        { ro: 'Viel Erfolg bei der Prüfung!', ru: 'Удачи на экзамене!' },
        { ro: 'Das macht nichts, ich helfe dir.', ru: 'Ничего страшного, я помогу тебе.' },
        { ro: 'Alles klar, ich mache das sofort.', ru: 'Всё ясно, я сделаю это сразу.' },
        { ro: 'Nicht schlecht! Du hast das gut gemacht.', ru: 'Неплохо! Ты хорошо справился.' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 27. СИТУАТИВНЫЕ ДИАЛОГИ
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'dialogues',
  title: 'Ситуативные диалоги',
  icon: '🗣️',
  description: 'Живые фразы для реальных ситуаций',
  sections: [
    {
      id: 'dialogues-greetings',
      title: 'Знакомство и приветствия',
      body: 'Формальность приветствия меняется по региону: «Hallo» повсюду, «Grüß Gott» — Бавария и Австрия, «Moin» — север. На «Wie geht\'s?» отвечают коротко: «Gut, danke!» или «Es geht so».',
      examples: [
        { ro: 'Hallo! Ich heiße Anna. Wie heißt du?', ru: 'Привет! Меня зовут Анна. А тебя как?' },
        { ro: '— Wie geht\'s? — Gut, danke. Und dir?', ru: '— Как дела? — Хорошо, спасибо. А у тебя?' },
        { ro: 'Woher kommst du? — Ich komme aus Russland.', ru: 'Откуда ты? — Я из России.' },
        { ro: 'Freut mich! — Mich auch!', ru: 'Приятно познакомиться! — Взаимно!' },
        { ro: 'Dein Deutsch ist gut! — Danke, ich lerne noch.', ru: 'Твой немецкий хорош! — Спасибо, ещё учусь.' },
      ],
    },
    {
      id: 'dialogues-cafe',
      title: 'В кафе и ресторане',
      body: '«Was darf es sein?» или «Was möchten Sie?» — что желаете? Официант скажет «Bitte schön» при подаче. Счёт: «Die Rechnung, bitte!»',
      examples: [
        { ro: '— Was möchten Sie? — Einen Kaffee und ein Wasser, bitte.', ru: '— Что желаете? — Кофе и воду, пожалуйста.' },
        { ro: 'Haben Sie eine Speisekarte auf Englisch?', ru: 'У вас есть меню на английском?' },
        { ro: 'Was empfehlen Sie?', ru: 'Что вы рекомендуете?' },
        { ro: 'Die Rechnung, bitte!', ru: 'Счёт, пожалуйста!' },
        { ro: 'Kann ich mit Karte zahlen?', ru: 'Можно оплатить картой?' },
        { ro: 'Es hat sehr gut geschmeckt!', ru: 'Было очень вкусно!', note: 'schmecken = быть вкусным' },
      ],
    },
    {
      id: 'dialogues-directions',
      title: 'Дорога и транспорт',
      body: '«Entschuldigung» (извините) — стандартное начало обращения к незнакомцу. «Links» — налево, «rechts» — направо, «geradeaus» — прямо.',
      examples: [
        { ro: 'Entschuldigung, wo ist die U-Bahnstation?', ru: 'Извините, где станция метро?' },
        { ro: 'Gehen Sie geradeaus, dann links.', ru: 'Идите прямо, затем налево.' },
        { ro: 'Wie weit ist es bis zum Zentrum?', ru: 'Как далеко до центра?' },
        { ro: 'Eine Fahrkarte bis zum Hauptbahnhof, bitte.', ru: 'Один билет до главного вокзала, пожалуйста.' },
        { ro: 'Wann fährt der nächste Zug ab?', ru: 'Когда отправляется следующий поезд?' },
        { ro: 'Ich habe mich verlaufen. Können Sie mir helfen?', ru: 'Я заблудился. Можете мне помочь?' },
      ],
    },
    {
      id: 'dialogues-shopping',
      title: 'В магазине',
      body: '«Kann ich Ihnen helfen?» — спросит продавец. «Ich schaue mich nur um» (я просто смотрю) — если не нужна помощь. «Das ist mir zu teuer» — слишком дорого.',
      examples: [
        { ro: '— Kann ich Ihnen helfen? — Ich schaue mich nur um, danke.', ru: '— Могу помочь? — Я просто смотрю, спасибо.' },
        { ro: 'Was kostet das?', ru: 'Сколько это стоит?' },
        { ro: 'Das ist mir zu teuer. Haben Sie etwas Günstigeres?', ru: 'Это мне слишком дорого. Есть что-то подешевле?' },
        { ro: 'Kann ich das anprobieren?', ru: 'Можно примерить?' },
        { ro: 'Das passt mir nicht. Haben Sie eine andere Größe?', ru: 'Мне не подходит. Есть другой размер?' },
        { ro: 'Ich nehme es!', ru: 'Я это беру!' },
      ],
    },
    {
      id: 'dialogues-health',
      title: 'У врача и о здоровье',
      body: '«Was fehlt Ihnen?» — что вас беспокоит? «Wo tut es weh?» — где болит? «Rezept» — рецепт, «Apotheke» — аптека.',
      examples: [
        { ro: 'Wie fühlen Sie sich? — Ich fühle mich nicht gut.', ru: 'Как вы себя чувствуете? — Я чувствую себя нехорошо.' },
        { ro: 'Mir tut der Kopf weh und ich habe Fieber.', ru: 'У меня болит голова и есть температура.' },
        { ro: 'Seit wann haben Sie diese Beschwerden?', ru: 'Как давно у вас эти жалобы?' },
        { ro: 'Haben Sie eine Allergie gegen Medikamente?', ru: 'Есть ли у вас аллергия на лекарства?' },
        { ro: 'Wo ist die nächste Apotheke?', ru: 'Где ближайшая аптека?' },
      ],
    },
    {
      id: 'dialogues-phone',
      title: 'По телефону',
      body: 'По телефону называют себя сразу: «Hier ist / Hier spricht...» (говорит...). «Einen Moment bitte» — одну минуту. «Auf Wiederhören» — до свидания (по телефону).',
      examples: [
        { ro: 'Hier ist / Hier spricht Anna Müller.', ru: 'Говорит Анна Мюллер.' },
        { ro: 'Kann ich bitte Herrn Schneider sprechen?', ru: 'Могу я поговорить с господином Шнайдером?' },
        { ro: 'Einen Moment bitte, ich verbinde Sie.', ru: 'Одну минуту, я вас соединяю.' },
        { ro: 'Er ist gerade nicht da. Möchten Sie eine Nachricht hinterlassen?', ru: 'Его сейчас нет. Хотите оставить сообщение?' },
        { ro: 'Bitte rufen Sie später noch einmal an.', ru: 'Пожалуйста, перезвоните позже.' },
        { ro: 'Ich verstehe Sie schlecht. Können Sie lauter sprechen?', ru: 'Плохо вас слышу. Можете говорить громче?' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 28. PARTIZIP I (ПРИЧАСТИЕ НАСТОЯЩЕГО ВРЕМЕНИ)
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'partizip1',
  title: 'Partizip I',
  icon: '📎',
  description: 'Причастие настоящего времени — как прилагательное и наречие',
  sections: [
    {
      id: 'partizip1-formation',
      title: 'Образование',
      body: 'Partizip I образуется просто: Infinitiv + -d. Обозначает одновременное или длящееся действие.',
      examples: [
        { ro: 'lachen → lachend', ru: 'смеяться → смеющийся' },
        { ro: 'schlafen → schlafend', ru: 'спать → спящий' },
        { ro: 'kommen → kommend', ru: 'приходить → приходящий' },
        { ro: 'lesen → lesend', ru: 'читать → читающий' },
        { ro: 'sprechen → sprechend', ru: 'говорить → говорящий' },
        { ro: 'warten → wartend', ru: 'ждать → ожидающий' },
      ],
    },
    {
      id: 'partizip1-adjective',
      title: 'Как прилагательное',
      body: 'Partizip I перед существительным склоняется по тем же правилам, что и обычное прилагательное. Типично для письменного и официального немецкого.',
      examples: [
        { ro: 'das schlafende Kind', ru: 'спящий ребёнок' },
        { ro: 'ein lachender Mann', ru: 'смеющийся мужчина' },
        { ro: 'die kommenden Wochen', ru: 'предстоящие недели' },
        { ro: 'fließendes Wasser', ru: 'проточная вода' },
        { ro: 'eine steigende Nachfrage', ru: 'растущий спрос', note: 'типично в деловом/газетном языке' },
        { ro: 'der leitende Angestellte', ru: 'руководящий сотрудник, менеджер' },
      ],
    },
    {
      id: 'partizip1-adverb',
      title: 'Как наречие',
      body: 'Без изменения формы описывает способ действия. В этой функции не склоняется.',
      examples: [
        { ro: 'Er kam lachend herein.', ru: 'Он вошёл смеясь.' },
        { ro: 'Sie antwortete zögernd.', ru: 'Она ответила нерешительно.' },
        { ro: 'Das Kind schaute fragend an.', ru: 'Ребёнок смотрел вопросительно.' },
        { ro: 'Er saß schweigend am Tisch.', ru: 'Он сидел за столом молча.' },
        { ro: 'Sie lief weinend aus dem Zimmer.', ru: 'Она выбежала из комнаты плача.' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 29. КОСВЕННАЯ РЕЧЬ (INDIREKTE REDE)
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'reported-speech',
  title: 'Косвенная речь',
  icon: '💬',
  description: 'Indirekte Rede — Konjunktiv I и передача чужих слов',
  sections: [
    {
      id: 'reported-konjunktiv1',
      title: 'Konjunktiv I — форма для косвенной речи',
      body: 'Косвенная речь в немецком оформляется через Konjunktiv I — отдельное наклонение, не путать с Konjunktiv II (гипотезы). Образуется от основы инфинитива + окончания -e/-est/-e/-en/-et/-en. Сигнализирует: это чужие слова, говорящий за них не отвечает.',
      table: {
        headers: ['Лицо', 'sein', 'haben', 'kommen'],
        rows: [
          ['ich', 'sei', 'habe', 'komme'],
          ['du', 'seist', 'habest', 'kommest'],
          ['er/sie/es', 'sei', 'habe', 'komme'],
          ['wir', 'seien', 'haben', 'kommen'],
          ['ihr', 'seiet', 'habet', 'kommet'],
          ['sie/Sie', 'seien', 'haben', 'kommen'],
        ],
      },
      examples: [
        { ro: 'Er sagt, er sei krank.', ru: 'Он говорит, что болен.', note: 'sei — Konj. I от sein' },
        { ro: 'Sie sagt, sie habe keine Zeit.', ru: 'Она говорит, что у неё нет времени.' },
        { ro: 'Er sagte, er komme morgen.', ru: 'Он сказал, что придёт завтра.' },
        { ro: 'Der Minister erklärte, er wisse nichts davon.', ru: 'Министр заявил, что ничего об этом не знает.', note: 'wisse — Konj. I от wissen' },
        { ro: 'Er betonte, die Lage sei ernst.', ru: 'Он подчеркнул, что ситуация серьёзная.', note: 'типично в газетном языке' },
        { ro: 'Sie berichtete, die Ergebnisse seien positiv.', ru: 'Она сообщила, что результаты положительные.' },
      ],
    },
    {
      id: 'reported-konj2-fallback',
      title: 'Konjunktiv II как замена',
      body: 'Если форма Konjunktiv I совпадает с индикативом (часто во мн. числе), используют Konjunktiv II. В разговорной речи — конструкция «dass» + индикатив.',
      examples: [
        { ro: 'Sie sagten, sie kämen.', ru: 'Они сказали, что придут.', note: 'kämen — Konj. II, т.к. kommen (Konj. I мн.ч.) совпадает с индикативом' },
        { ro: 'Er sagte, dass er kommt.', ru: 'Он сказал, что придёт.', note: 'разговорный вариант: dass + индикатив' },
        { ro: 'Die Kollegen erklärten, sie wüssten nichts davon.', ru: 'Коллеги объяснили, что ничего об этом не знают.', note: 'wüssten — Konj. II, т.к. wissen (3.мн.) совпало бы с индикативом' },
        { ro: 'Sie behaupteten, sie hätten das Geld nicht.', ru: 'Они утверждали, что у них нет денег.', note: 'hätten — Konj. II вместо haben' },
        { ro: 'Die Studenten sagten, sie bräuchten mehr Zeit.', ru: 'Студенты сказали, что им нужно больше времени.', note: 'bräuchten — Konj. II от brauchen' },
        { ro: 'Er antwortete, dass er keine Zeit hat.', ru: 'Он ответил, что у него нет времени.', note: 'разговорный dass + индикатив' },
      ],
    },
    {
      id: 'reported-questions',
      title: 'Косвенные вопросы',
      body: '«Ob» вводит косвенный общий вопрос (да/нет), вопросительное слово — специальный. Глагол всегда в конец придаточного.',
      examples: [
        { ro: 'Er fragte, ob sie komme.', ru: 'Он спросил, придёт ли она.' },
        { ro: 'Sie fragte, wann der Zug abfahre.', ru: 'Она спросила, когда отправляется поезд.' },
        { ro: 'Er wollte wissen, wo sie wohne.', ru: 'Он хотел знать, где она живёт.' },
        { ro: 'Sie fragte, wie lange er schon warte.', ru: 'Она спросила, как долго он уже ждёт.' },
        { ro: 'Niemand wusste, warum er nicht gekommen sei.', ru: 'Никто не знал, почему он не пришёл.' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 30. ОТРИЦАНИЕ
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'negation',
  title: 'Отрицание',
  icon: '🚫',
  description: 'nicht, kein, nie, niemand, nichts — как строить отрицания',
  sections: [
    {
      id: 'negation-nicht',
      title: 'nicht — отрицание глагола и прилагательного',
      body: 'Nicht отрицает глагол, прилагательное или всё предложение. Позиция: в конце предложения — если отрицается сказуемое целиком; перед конкретным словом — если отрицается только оно. Перед Partizip II, инфинитивом и отделяемой приставкой nicht стоит непосредственно перед ними.',
      table: {
        headers: ['Что отрицается', 'Позиция nicht', 'Пример'],
        rows: [
          ['всё предложение', 'в конце', 'Ich schlafe nicht.'],
          ['прилагательное/наречие', 'перед adj./adv.', 'Er ist nicht müde.'],
          ['Partizip II', 'перед ним', 'Ich habe nicht geschlafen.'],
          ['отделяемая приставка', 'перед ней', 'Er ruft nicht an.'],
          ['конкретный элемент', 'прямо перед ним', 'Nicht er, sondern sie.'],
        ],
      },
      examples: [
        { ro: 'Ich verstehe das nicht.', ru: 'Я этого не понимаю.', note: 'nicht в конце' },
        { ro: 'Sie ist nicht zu Hause.', ru: 'Её нет дома.' },
        { ro: 'Das ist nicht richtig.', ru: 'Это неправильно.', note: 'nicht перед прилагательным' },
        { ro: 'Ich habe das nicht gewusst.', ru: 'Я этого не знал.', note: 'nicht перед Partizip II' },
        { ro: 'Er ruft heute nicht an.', ru: 'Он сегодня не звонит.', note: 'nicht перед отделяемой приставкой' },
        { ro: 'Nicht heute, sondern morgen.', ru: 'Не сегодня, а завтра.', note: 'nicht перед конкретным словом' },
      ],
    },
    {
      id: 'negation-kein',
      title: 'kein — отрицание существительного',
      body: 'Kein используется вместо nicht, когда перед существительным стоит неопределённый артикль или нет артикля вовсе. Где в утверждении ein/eine — в отрицании kein/keine. Склоняется как неопределённый артикль, но с формами мн. числа (keine).',
      table: {
        headers: ['Утверждение', 'Отрицание'],
        rows: [
          ['Ich habe einen Bruder.', 'Ich habe keinen Bruder.'],
          ['Er hat eine Schwester.', 'Er hat keine Schwester.'],
          ['Sie trinkt Kaffee.', 'Sie trinkt keinen Kaffee.'],
          ['Das ist ein Problem.', 'Das ist kein Problem.'],
        ],
      },
      examples: [
        { ro: 'Ich habe kein Geld.', ru: 'У меня нет денег.' },
        { ro: 'Er hat keine Ahnung.', ru: 'Он понятия не имеет.' },
        { ro: 'Das ist kein Problem.', ru: 'Это не проблема.' },
        { ro: 'Wir haben keinen Hunger.', ru: 'Мы не голодны.', note: 'м.р., Akk. → keinen' },
        { ro: 'Hier gibt es keine Parkplätze.', ru: 'Здесь нет парковочных мест.', note: 'мн.ч. → keine' },
        { ro: 'Ich habe keine Zeit.', ru: 'У меня нет времени.' },
      ],
    },
    {
      id: 'negation-other',
      title: 'nie, niemand, nichts, nirgends',
      body: 'Другие отрицательные слова: nie/niemals (никогда), niemand (никто), nichts (ничто, ничего), nirgends/nirgendwo (нигде). В отличие от русского, в немецком два отрицания не суммируются — нельзя сказать «niemand nichts».',
      examples: [
        { ro: 'Ich habe das nie gesagt.', ru: 'Я этого никогда не говорил.' },
        { ro: 'Niemand weiß die Antwort.', ru: 'Никто не знает ответа.' },
        { ro: 'Ich verstehe nichts.', ru: 'Я ничего не понимаю.' },
        { ro: 'Er ist nirgends zu finden.', ru: 'Его нигде не найти.' },
        { ro: 'Ich habe kein Geld mehr.', ru: 'У меня больше нет денег.', note: 'kein + mehr' },
        { ro: 'Das ist gar nicht wahr.', ru: 'Это совсем неправда.', note: 'gar nicht — усиление' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 31. ПОВЕЛИТЕЛЬНОЕ НАКЛОНЕНИЕ (IMPERATIV)
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'imperative',
  title: 'Повелительное наклонение',
  icon: '📢',
  description: 'Imperativ — du, ihr, Sie — приказы, просьбы и советы',
  sections: [
    {
      id: 'imperative-du',
      title: 'Imperativ для du',
      body: 'Форма для du — основа глагола (инфинитив без -en): mach!, komm!. Глаголы с чередованием e→i/ie в Präsens сохраняют его в Imperativ: lesen → lies!, geben → gib!. Глаголы с a→ä в Präsens умлаут в Imperativ НЕ сохраняют: fahren → fahr! (не *fähr!).',
      table: {
        headers: ['Инфинитив', 'Imperativ (du)', 'Заметка'],
        rows: [
          ['machen', 'Mach!', 'обычный'],
          ['kommen', 'Komm!', 'обычный'],
          ['lesen', 'Lies!', 'e→ie сохраняется'],
          ['geben', 'Gib!', 'e→i сохраняется'],
          ['fahren', 'Fahr!', 'a→ä НЕ сохраняется'],
          ['aufstehen', 'Steh auf!', 'приставка в конце'],
          ['sein', 'Sei!', 'нерегулярный'],
        ],
      },
      examples: [
        { ro: 'Komm her!', ru: 'Иди сюда!' },
        { ro: 'Lies das Buch!', ru: 'Читай книгу!', note: 'lesen → lies' },
        { ro: 'Gib mir das Salz!', ru: 'Дай мне соль!', note: 'geben → gib' },
        { ro: 'Steh bitte auf!', ru: 'Встань, пожалуйста!', note: 'приставка в конце' },
        { ro: 'Fahr langsamer!', ru: 'Езди медленнее!', note: 'fahren → fahr (без умлаута)' },
        { ro: 'Sei ruhig!', ru: 'Тихо! Успокойся!', note: 'sein → sei' },
      ],
    },
    {
      id: 'imperative-ihr-sie',
      title: 'Imperativ для ihr и Sie',
      body: 'Для ihr — форма настоящего времени для ihr, без местоимения: Macht! Kommt!. Для вежливого Sie — инфинитив + Sie в обратном порядке: Kommen Sie!. Sie — единственная форма Imperativ, где местоимение остаётся.',
      table: {
        headers: ['Форма', 'machen', 'kommen', 'aufstehen'],
        rows: [
          ['du', 'Mach!', 'Komm!', 'Steh auf!'],
          ['ihr', 'Macht!', 'Kommt!', 'Steht auf!'],
          ['Sie (вежл.)', 'Machen Sie!', 'Kommen Sie!', 'Stehen Sie auf!'],
        ],
      },
      examples: [
        { ro: 'Kommt schnell!', ru: 'Идите быстро! (к нескольким)' },
        { ro: 'Bitte kommen Sie herein!', ru: 'Пожалуйста, заходите!' },
        { ro: 'Setzen Sie sich bitte!', ru: 'Присаживайтесь, пожалуйста!' },
        { ro: 'Macht die Bücher auf!', ru: 'Откройте книги! (ihr)', note: 'aufmachen → Macht...auf!' },
        { ro: 'Sprechen Sie bitte lauter!', ru: 'Пожалуйста, говорите громче!' },
        { ro: 'Hört mir zu!', ru: 'Слушайте меня! (к группе)' },
      ],
    },
    {
      id: 'imperative-bitte',
      title: 'Смягчение просьбы',
      body: 'Bitte (пожалуйста) делает Imperativ вежливее. Частица mal дополнительно смягчает просьбу — звучит как «не мог бы ты...». Konjunktiv II (Würden Sie...?) ещё вежливее — для официальных ситуаций.',
      examples: [
        { ro: 'Komm mal her!', ru: 'Поди-ка сюда! (мягко)', note: 'mal — смягчение' },
        { ro: 'Hör mal zu!', ru: 'Послушай-ка!' },
        { ro: 'Warte bitte einen Moment!', ru: 'Подожди, пожалуйста, минуту!' },
        { ro: 'Würden Sie bitte leiser sprechen?', ru: 'Не могли бы вы говорить потише?', note: 'Konjunktiv II — максимально вежливо' },
        { ro: 'Könntest du mir bitte helfen?', ru: 'Не мог бы ты мне помочь?' },
        { ro: 'Mach bitte das Licht aus!', ru: 'Пожалуйста, выключи свет!' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 32. ВОЗВРАТНЫЕ ГЛАГОЛЫ
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'reflexive',
  title: 'Возвратные глаголы',
  icon: '🔁',
  description: 'sich + глагол — основные возвратные глаголы и их управление',
  sections: [
    {
      id: 'reflexive-akkusativ',
      title: 'Возвратные глаголы с Akkusativ',
      body: 'Большинство возвратных глаголов требуют sich в Akkusativ. Sich — форма для 3-го лица и для Sie. В 1-м и 2-м лице: mich, dich. Проверка: нет другого объекта в предложении — Akkusativ.',
      table: {
        headers: ['Глагол', 'Значение', 'Ich-форма'],
        rows: [
          ['sich freuen', 'радоваться', 'Ich freue mich.'],
          ['sich waschen', 'мыться', 'Ich wasche mich.'],
          ['sich setzen', 'садиться', 'Ich setze mich.'],
          ['sich fühlen', 'чувствовать себя', 'Ich fühle mich gut.'],
          ['sich beeilen', 'торопиться', 'Ich beeile mich.'],
          ['sich erinnern an', 'вспоминать', 'Ich erinnere mich daran.'],
          ['sich interessieren für', 'интересоваться', 'Ich interessiere mich für Musik.'],
        ],
      },
      examples: [
        { ro: 'Ich fühle mich heute nicht gut.', ru: 'Я сегодня плохо себя чувствую.' },
        { ro: 'Setz dich bitte!', ru: 'Садись, пожалуйста!' },
        { ro: 'Beeil dich! Wir sind spät dran.', ru: 'Торопись! Мы опаздываем.' },
        { ro: 'Ich interessiere mich für Geschichte.', ru: 'Я интересуюсь историей.' },
        { ro: 'Erinnerst du dich an ihn?', ru: 'Ты помнишь его?' },
        { ro: 'Wir haben uns sehr gefreut.', ru: 'Мы очень обрадовались.' },
      ],
    },
    {
      id: 'reflexive-dativ',
      title: 'Возвратные глаголы с Dativ',
      body: 'Если в предложении уже есть прямой объект (Akkusativ), sich стоит в Dativ. В 1-м и 2-м лице: mir, dir. Типичный случай: действие над частью тела (sich die Hände waschen).',
      table: {
        headers: ['Глагол', 'Значение', 'Пример'],
        rows: [
          ['sich etw. vorstellen', 'представлять себе', 'Ich stelle mir das vor.'],
          ['sich etw. wünschen', 'желать', 'Er wünscht sich ein Fahrrad.'],
          ['sich die Hände waschen', 'мыть руки', 'Ich wasche mir die Hände.'],
          ['sich etw. merken', 'запомнить', 'Merk dir das!'],
          ['sich etw. kaufen', 'купить себе', 'Ich kaufe mir ein Buch.'],
        ],
      },
      examples: [
        { ro: 'Ich wasche mir die Hände.', ru: 'Я мою руки.', note: 'mir — Dativ, Hände — Akkusativ' },
        { ro: 'Er kämmt sich die Haare.', ru: 'Он расчёсывает волосы.' },
        { ro: 'Stell dir das vor!', ru: 'Только представь себе!' },
        { ro: 'Ich wünsche mir Urlaub.', ru: 'Я мечтаю об отпуске.' },
        { ro: 'Merk dir diese Regel!', ru: 'Запомни это правило!' },
        { ro: 'Ich habe mir ein neues Handy gekauft.', ru: 'Я купил себе новый телефон.' },
      ],
    },
    {
      id: 'reflexive-common',
      title: 'Важные возвратные глаголы',
      body: 'Список частотных глаголов, которые употребляются только (или преимущественно) возвратно. Некоторые глаголы меняют значение с sich: waschen (мыть что-то) — sich waschen (мыться).',
      table: {
        headers: ['Глагол', 'Значение', 'Управление'],
        rows: [
          ['sich ausruhen', 'отдыхать', '—'],
          ['sich ärgern über', 'злиться из-за', 'über + Akk.'],
          ['sich entschuldigen', 'извиняться', 'für + Akk.'],
          ['sich entscheiden', 'принять решение', 'für/gegen + Akk.'],
          ['sich unterhalten', 'разговаривать', 'mit + Dat.'],
          ['sich verabschieden', 'прощаться', 'von + Dat.'],
          ['sich erholen', 'восстанавливаться', 'von + Dat.'],
          ['sich kümmern um', 'заботиться о', 'um + Akk.'],
        ],
      },
      examples: [
        { ro: 'Ich muss mich ausruhen.', ru: 'Мне нужно отдохнуть.' },
        { ro: 'Er ärgert sich über den Stau.', ru: 'Он злится из-за пробки.' },
        { ro: 'Ich entschuldige mich für den Fehler.', ru: 'Я прошу прощения за ошибку.' },
        { ro: 'Hast du dich schon entschieden?', ru: 'Ты уже решил?' },
        { ro: 'Wir haben uns lange unterhalten.', ru: 'Мы долго разговаривали.' },
        { ro: 'Er erholt sich von der Arbeit.', ru: 'Он восстанавливается после работы.' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 33. КОНСТРУКЦИЯ «НРАВИТСЯ»
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'like',
  title: 'Конструкция «нравится»',
  icon: '❤️',
  description: 'gefallen + Dativ, mögen, gern + глагол — три способа выразить симпатию',
  sections: [
    {
      id: 'like-gefallen',
      title: 'gefallen + Dativ',
      body: 'Основной способ сказать «нравится». Субъект — то, что нравится; тот, кому нравится — в Dativ. Gefällt — ед. число, gefallen — мн. число. Вопрос: «Wie gefällt dir X?».',
      table: {
        headers: ['Конструкция', 'Пример', 'Перевод'],
        rows: [
          ['X gefällt mir', 'Das Lied gefällt mir.', 'Мне нравится эта песня.'],
          ['X gefallen mir', 'Die Schuhe gefallen mir nicht.', 'Мне не нравятся эти туфли.'],
          ['Wie gefällt dir X?', 'Wie gefällt dir Berlin?', 'Тебе нравится Берлин?'],
          ['X hat mir gefallen', 'Der Film hat mir gefallen.', 'Фильм мне понравился.'],
        ],
      },
      examples: [
        { ro: 'Das Buch gefällt mir sehr.', ru: 'Книга мне очень нравится.', note: 'субъект — Buch, mir — Dativ' },
        { ro: 'Wie gefällt Ihnen das Hotel?', ru: 'Вам нравится отель?' },
        { ro: 'Die Musik gefällt mir nicht.', ru: 'Музыка мне не нравится.' },
        { ro: 'Deine Idee gefällt mir gut.', ru: 'Мне очень нравится твоя идея.' },
        { ro: 'Die neuen Möbel gefallen uns.', ru: 'Нам нравится новая мебель.', note: 'мн.ч. → gefallen' },
        { ro: 'Hat dir der Film gefallen?', ru: 'Тебе понравился фильм?' },
      ],
    },
    {
      id: 'like-moegen',
      title: 'mögen — любить, нравиться',
      body: 'Mögen выражает постоянную симпатию или предпочтение. Употребляется с существительным напрямую. Möchten (хотел бы) — Konjunktiv II от mögen, используется для вежливых просьб и желаний.',
      table: {
        headers: ['Форма', 'Употребление', 'Пример'],
        rows: [
          ['mögen + Nomen', 'стабильная симпатия', 'Ich mag Kaffee.'],
          ['mögen + Inf.', 'нравится делать', 'Ich mag nicht kochen.'],
          ['möchten + Inf.', 'вежливое желание', 'Ich möchte Tee bestellen.'],
        ],
      },
      examples: [
        { ro: 'Ich mag Kaffee sehr.', ru: 'Я очень люблю кофе.' },
        { ro: 'Magst du klassische Musik?', ru: 'Тебе нравится классическая музыка?' },
        { ro: 'Er mag keine Zwiebeln.', ru: 'Ему не нравится лук.' },
        { ro: 'Ich möchte bitte einen Tee.', ru: 'Я бы хотел чай, пожалуйста.', note: 'möchten — вежливое желание' },
        { ro: 'Mögen Sie Jazz?', ru: 'Вам нравится джаз?' },
        { ro: 'Die Kinder mögen keinen Spinat.', ru: 'Дети не любят шпинат.' },
      ],
    },
    {
      id: 'like-gern',
      title: 'gern + глагол',
      body: 'Gern (с удовольствием, охотно) + глагол = нравится делать что-то. Степени: gern → lieber → am liebsten. Gern не склоняется — это наречие.',
      table: {
        headers: ['Степень', 'Слово', 'Пример'],
        rows: [
          ['положительная', 'gern(e)', 'Ich lese gern.'],
          ['сравнительная', 'lieber', 'Ich lese lieber als fernsehen.'],
          ['превосходная', 'am liebsten', 'Am liebsten koche ich selbst.'],
        ],
      },
      examples: [
        { ro: 'Ich koche gern.', ru: 'Я люблю готовить.' },
        { ro: 'Liest du gern?', ru: 'Ты любишь читать?' },
        { ro: 'Er spielt lieber Fußball als Tennis.', ru: 'Он предпочитает футбол, а не теннис.', note: 'lieber...als' },
        { ro: 'Am liebsten schlafe ich aus.', ru: 'Больше всего я люблю поспать.', note: 'am liebsten — превосходная' },
        { ro: 'Ich helfe dir gern!', ru: 'Я охотно тебе помогу!' },
        { ro: 'Wir reisen gern, besonders im Sommer.', ru: 'Мы любим путешествовать, особенно летом.' },
      ],
    },
  ],
})
