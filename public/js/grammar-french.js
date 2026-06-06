// Данные грамматики для французского языка.
// Загружается динамически через import() в init() — должен писать на window.

window.grammarTopics = [
  // ─────────────────────────────────────────────
  // 1. РОД И АРТИКЛИ
  // ─────────────────────────────────────────────
  {
    id: 'articles',
    title: 'Род и артикли',
    icon: '🏷️',
    description: 'le/la/les, un/une/des, слияния au/aux/du/des',
    sections: [
      { id: 'articles-gender', title: 'Два рода', body: 'Французские существительные бывают мужского (masculin) или женского (féminin) рода. Род грамматический, часто не совпадает с естественным полом. Правил вывода рода по смыслу почти нет — лучше запоминать с артиклем. Окончания могут подсказывать: -tion/-sion/-té/-ité обычно женского рода; -eau/-isme/-ment/-age обычно мужского.', examples: [
          { ro: 'le livre, le garçon', ru: 'книга, мальчик', note: 'мужской род' },
          { ro: 'la table, la fille', ru: 'стол, девочка', note: 'женский род' },
          { ro: 'la liberté, la nation, la tradition', ru: 'свобода, нация, традиция', note: '-té, -tion → ж.р.' },
          { ro: 'le courage, le message, le voyage', ru: 'смелость, сообщение, путешествие', note: '-age → м.р.' },
          { ro: 'le musée — женское окончание, мужской род', ru: 'музей — исключение', note: 'не доверять -ée' },
          { ro: 'la mer, la main, la forêt', ru: 'море, рука, лес', note: 'женский, хотя разные окончания' },
        ] },
      { id: 'articles-definite', title: 'Определённый артикль le/la/l\'/les', body: 'Определённый артикль указывает на конкретный предмет или класс в целом. Перед гласной или немым h оба артикля — le и la — сокращаются до l\' (элизия). Les — единственная форма множественного числа для обоих родов.',
        table: { headers: ['', 'М.р.', 'Ж.р.', 'Мн.ч.'], rows: [['Артикль', 'le', 'la / l\'', 'les']] },
        examples: [
          { ro: 'le chat, la voiture, les enfants', ru: 'кот, машина, дети' },
          { ro: 'l\'ami, l\'école', ru: 'друг, школа', note: 'элизия перед гласной' },
          { ro: 'J\'aime le chocolat.', ru: 'Я люблю шоколад.', note: 'класс в целом, не конкретная плитка' },
          { ro: 'Le soleil brille.', ru: 'Солнце светит.', note: 'единственный в своём роде' },
          { ro: 'les enfants jouent', ru: 'дети играют', note: 'les для обоих родов во мн.ч.' },
          { ro: 'le livre est sur la table', ru: 'книга на столе', note: 'конкретный предмет' },
        ] },
      { id: 'articles-indefinite', title: 'Неопределённый артикль un/une/des', body: 'Un/une — «один/одна», вводит предмет впервые или неизвестный. Des — мн. число (аналог «несколько» или «какие-то»). После отрицания un/une/des заменяются на de/d\': je n\'ai pas de voiture.',
        table: { headers: ['', 'М.р.', 'Ж.р.', 'Мн.ч.'], rows: [['Артикль', 'un', 'une', 'des']] },
        examples: [
          { ro: 'J\'ai un chien et une voiture.', ru: 'У меня есть собака и машина.' },
          { ro: 'Il y a des étudiants dans la salle.', ru: 'В аудитории есть студенты.' },
          { ro: 'Je n\'ai pas de voiture.', ru: 'У меня нет машины.', note: 'после отрицания → de' },
          { ro: 'Elle n\'a pas d\'argent.', ru: 'У неё нет денег.', note: 'de + гласная = d\'' },
          { ro: 'C\'est un médecin.', ru: 'Это врач.', note: 'первое упоминание' },
          { ro: 'Des amis sont venus.', ru: 'Пришли (какие-то) друзья.' },
        ] },
      { id: 'articles-partitive', title: 'Партитивный артикль du/de la/de l\'', body: 'Партитивный артикль используется с неисчислимыми существительными — веществами, абстрактными понятиями, когда берётся «часть целого». Образуется из de + определённый артикль. После отрицания — только de/d\'.',
        table: { headers: ['', 'М.р.', 'Ж.р.', 'Перед гласной'], rows: [['Партитив', 'du', 'de la', "de l'"]] },
        examples: [
          { ro: 'Je mange du pain.', ru: 'Я ем хлеб (какое-то количество).', note: 'du = de + le' },
          { ro: 'Elle boit de la bière.', ru: 'Она пьёт пиво.' },
          { ro: 'Il faut de la patience.', ru: 'Нужно терпение.', note: 'абстрактное понятие' },
          { ro: 'Je bois de l\'eau.', ru: 'Я пью воду.', note: "de l' перед гласной" },
          { ro: 'Je ne mange pas de pain.', ru: 'Я не ем хлеб.', note: 'после отрицания → de' },
          { ro: 'Tu fais du sport?', ru: 'Ты занимаешься спортом?', note: 'частое: faire du/de la + занятие' },
        ] },
      { id: 'articles-contractions', title: 'Слияния: au/aux, du/des', body: 'Предлоги à и de сливаются с определённым артиклем le/les. С la и l\' слияния нет — артикль остаётся без изменений.',
        table: { headers: ['Предлог', '+ le', '+ la', "+ l'", '+ les'], rows: [['à', 'au', 'à la', "à l'", 'aux'], ['de', 'du', 'de la', "de l'", 'des']] },
        examples: [
          { ro: 'Je vais au cinéma.', ru: 'Я иду в кино.', note: 'à + le = au' },
          { ro: 'Elle parle aux étudiants.', ru: 'Она разговаривает со студентами.', note: 'à + les = aux' },
          { ro: 'C\'est le livre du professeur.', ru: 'Это книга профессора.', note: 'de + le = du' },
          { ro: 'Il vient des États-Unis.', ru: 'Он из США.', note: 'de + les = des' },
          { ro: 'Je parle à la fille.', ru: 'Я говорю с девочкой.', note: 'à la — без слияния' },
          { ro: "C'est la voiture de l'étudiant.", ru: 'Это машина студента.', note: "de l' — без слияния" },
        ] },
      { id: 'articles-elision', title: 'Элизия: le/la → l\'', body: "Элизия — замена конечной гласной апострофом перед словом, начинающимся с гласной или немого h. Обязательна для le/la, je, me, te, se, de, ne, que, ce. Немые h: l'heure, l'homme, l'hôpital. Придыхательные h блокируют элизию: le hibou, le hamster.", examples: [
          { ro: "l'ami, l'école, l'université", ru: 'друг, школа, университет', note: 'le/la → l\' перед гласной' },
          { ro: "l'heure, l'homme, l'hôpital", ru: 'час, мужчина, больница', note: 'немое h — элизия есть' },
          { ro: 'le hibou, le hibiscus', ru: 'сова, гибискус', note: 'придыхательное h — элизии нет' },
          { ro: "j'aime, j'arrive", ru: 'я люблю, я прихожу', note: 'je → j\'' },
          { ro: "qu'il vienne, qu'elle parte", ru: 'чтобы он пришёл, чтобы она ушла', note: 'que → qu\'' },
          { ro: "c'est, s'il vous plaît", ru: 'это, пожалуйста', note: 'ce → c\', si + il → s\'il' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. СУЩЕСТВИТЕЛЬНЫЕ
  // ─────────────────────────────────────────────
  {
    id: 'nouns',
    title: 'Существительные',
    icon: '📦',
    description: 'Мн. число, исключения, определение рода',
    sections: [
      { id: 'nouns-plural', title: 'Множественное число', body: 'Основное правило: + s (не произносится). Но: слова на -s/-x/-z не меняются. Слова на -eau/-au → + x. Слова на -al → -aux (но: bals, festivals). Слова на -ail → -ails (но: travaux, vitraux).', examples: [
          { ro: 'un chat → des chats', ru: 'кот → коты', note: 'стандарт: + s' },
          { ro: 'un bras → des bras', ru: 'рука → руки', note: '-s не меняется' },
          { ro: 'un gâteau → des gâteaux', ru: 'торт → торты', note: '-eau → + x' },
          { ro: 'un journal → des journaux', ru: 'газета → газеты', note: '-al → -aux' },
          { ro: 'un festival → des festivals', ru: 'фестиваль → фестивали', note: 'исключение: не -aux' },
          { ro: 'un travail → des travaux', ru: 'работа/труд → работы', note: '-ail → -aux (нерегулярно)' },
        ] },
      { id: 'nouns-gender-hints', title: 'Как угадать род по окончанию', body: 'Надёжных правил нет, но есть сильные тенденции. Женский: -tion/-sion, -té/-ité, -eur (абстр.), -ance/-ence, -ure, -ise. Мужской: -eau, -isme, -ment, -age, -eur (деятель/прибор), -ier. Слова на -e без суффикса — чаще женские, но много исключений (le livre, le verre).', examples: [
          { ro: 'la liberté, la beauté, la qualité', ru: 'свобода, красота, качество', note: '-té → ж.р.' },
          { ro: 'la nation, la passion, la décision', ru: 'нация, страсть, решение', note: '-tion/-sion → ж.р.' },
          { ro: 'le bâtiment, le mouvement', ru: 'здание, движение', note: '-ment → м.р.' },
          { ro: 'le fromage, le mariage', ru: 'сыр, свадьба', note: '-age → м.р.' },
          { ro: 'le docteur, le lecteur — la chaleur, la peur', ru: 'доктор, читатель — жара, страх', note: '-eur: деятель→м.р., абстр.→ж.р.' },
          { ro: 'le livre, le verre, le sourire', ru: 'книга, стакан, улыбка', note: 'на -e, но мужской — исключения важны' },
        ] },
      { id: 'nouns-irregular', title: 'Нерегулярные формы мн. числа', body: 'Несколько существительных имеют полностью нерегулярное множественное число — их нужно запомнить. Некоторые слова используются только во мн. числе (les gens, les vacances). Составные слова (noms composés) образуют мн. число по разным правилам — иногда меняется только одна часть.', examples: [
          { ro: 'un œil → des yeux', ru: 'глаз → глаза', note: 'полная нерегулярность' },
          { ro: 'monsieur → messieurs', ru: 'господин → господа' },
          { ro: 'les gens', ru: 'люди', note: 'только мн. число' },
          { ro: 'les vacances', ru: 'каникулы/отпуск', note: 'только мн. число' },
          { ro: 'un grand-père → des grands-pères', ru: 'дедушка → дедушки', note: 'сложное слово' },
          { ro: 'un timbre-poste → des timbres-poste', ru: 'почтовая марка', note: 'второй элемент не меняется' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. ПРИЛАГАТЕЛЬНЫЕ
  // ─────────────────────────────────────────────
  {
    id: 'adjectives',
    title: 'Прилагательные',
    icon: '🎨',
    description: 'Согласование, позиция, BAGS-правило',
    sections: [
      { id: 'adjectives-agreement', title: 'Согласование в роде и числе', body: 'Прилагательное согласуется с существительным в роде и числе. Женский род: + e (если не заканчивается на -e). Мн. число: + s. Прилагательные на -x не меняются в мн. числе. Прилагательные на -al → -aux в мужском мн. числе.', examples: [
          { ro: 'un ami français / une amie française', ru: 'французский друг / французская подруга' },
          { ro: 'un enfant heureux / une enfant heureuse', ru: 'счастливый ребёнок / счастливая', note: '-eux → -euse' },
          { ro: 'un homme grand / des hommes grands', ru: 'высокий мужчина / высокие мужчины' },
          { ro: 'un journal national / des journaux nationaux', ru: 'национальная газета / национальные газеты', note: '-al → -aux' },
          { ro: 'une maison rouge / des maisons rouges', ru: 'красный дом / красные дома', note: 'на -e: только + s в мн.ч.' },
          { ro: 'un problème grave / une situation grave', ru: 'серьёзная проблема / серьёзная ситуация', note: 'на -e — одна форма для обоих родов' },
        ] },
      { id: 'adjectives-position', title: 'Позиция: после существительного (общее правило)', body: 'В отличие от русского, большинство французских прилагательных стоят после существительного. До существительного — только короткие частые прилагательные (BAGS-группа) и несколько дополнительных. Позиция может менять смысл.', examples: [
          { ro: 'une voiture rouge', ru: 'красная машина', note: 'цвет → после' },
          { ro: 'un étudiant sérieux', ru: 'серьёзный студент', note: 'характер → после' },
          { ro: 'un livre intéressant', ru: 'интересная книга', note: 'качество → после' },
          { ro: 'une robe noire élégante', ru: 'элегантное чёрное платье', note: 'несколько прилаг. — все после' },
          { ro: 'un homme politique important', ru: 'важный политик', note: 'составное: politique — часть имени' },
          { ro: 'une belle maison', ru: 'красивый дом', note: 'beau/belle — исключение: стоит до' },
        ] },
      { id: 'adjectives-bags', title: 'BAGS-прилагательные — до существительного', body: 'BAGS — акроним: Beauty (beauté), Age (âge), Goodness (bonté), Size (taille). Эти прилагательные стоят перед существительным. Наизусть: beau/belle, bon/bonne, grand, gros, jeune, joli, long, mauvais, nouveau, petit, vieux/vieille, autre, même, tel, tout.', examples: [
          { ro: 'un grand homme', ru: 'великий человек', note: 'size → до существительного' },
          { ro: 'une petite maison', ru: 'маленький дом' },
          { ro: 'un bon repas', ru: 'хорошая еда' },
          { ro: 'un vieil ami', ru: 'старый друг', note: 'vieux → vieil перед гласной' },
          { ro: 'un bel homme', ru: 'красивый мужчина', note: 'beau → bel перед гласной' },
          { ro: 'un nouvel appartement', ru: 'новая квартира', note: 'nouveau → nouvel перед гласной' },
        ] },
      { id: 'adjectives-meaning-change', title: 'Прилагательные меняющие смысл от позиции', body: 'Некоторые прилагательные имеют разный смысл в зависимости от позиции: до существительного — переносное/субъективное значение; после — буквальное/объективное. Таких прилагательных около 10-15, самые частые нужно знать наизусть.', examples: [
          { ro: 'un grand homme / un homme grand', ru: 'великий человек / высокий мужчина' },
          { ro: 'un ancien professeur / un bâtiment ancien', ru: 'бывший преподаватель / старинное здание' },
          { ro: 'un pauvre enfant / un enfant pauvre', ru: 'бедный (несчастный) ребёнок / бедный (нищий) ребёнок' },
          { ro: 'un certain âge / un fait certain', ru: 'определённый возраст / достоверный факт' },
          { ro: 'la même chose / la chose même', ru: 'то же самое / сама вещь' },
          { ro: 'un brave homme / un homme brave', ru: 'добрый человек / храбрый человек' },
        ] },
      { id: 'adjectives-comparison', title: 'Степени сравнения — plus/moins, le plus, нерегулярные', body: 'Сравнительная: plus/moins + прилагательное + que. Превосходная: le/la/les + plus/moins + прилагательное. Нерегулярные: bon → meilleur (сравн.) / le meilleur (превосх.); mauvais → pire / le pire. Наречие bien → mieux / le mieux.', examples: [
          { ro: 'Elle est plus grande que lui.', ru: 'Она выше него.' },
          { ro: 'Ce film est moins intéressant que le livre.', ru: 'Фильм менее интересный, чем книга.' },
          { ro: "C'est la plus belle ville du monde.", ru: 'Это самый красивый город мира.' },
          { ro: 'Ce vin est meilleur que l\'autre.', ru: 'Это вино лучше другого.', note: 'bon → meilleur (не plus bon)' },
          { ro: 'C\'est le meilleur restaurant.', ru: 'Это лучший ресторан.' },
          { ro: 'La situation est pire qu\'avant.', ru: 'Ситуация хуже, чем раньше.', note: 'mauvais → pire' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. МЕСТОИМЕНИЯ
  // ─────────────────────────────────────────────
  {
    id: 'pronouns',
    title: 'Местоимения',
    icon: '👤',
    description: 'Субъектные, прямые, косвенные, y, en, притяжательные, указательные',
    sections: [
      { id: 'pronouns-subject', title: 'Субъектные местоимения', body: 'В отличие от испанского и итальянского, субъектное местоимение во французском обязательно — глагол без него не употребляется (кроме импératif). Vous — вежливая форма «вы» для одного человека. On активно заменяет nous в разговорной речи.',
        table: { headers: ['Лицо', 'Ед.ч.', 'Мн.ч.'], rows: [['1', 'je', 'nous (on)'], ['2', 'tu / vous', 'vous'], ['3', 'il/elle', 'ils/elles']] },
        examples: [
          { ro: 'Je parle, tu parles, il parle.', ru: 'Я говорю, ты говоришь, он говорит.' },
          { ro: 'Vous êtes très aimable.', ru: 'Вы очень любезны.', note: 'vous — вежливое обращение к одному' },
          { ro: 'On mange bien ici.', ru: 'Здесь хорошо едят / Мы хорошо едим.', note: 'on вместо nous' },
          { ro: 'Ils arrivent demain.', ru: 'Они приезжают завтра.', note: 'ils — м.р. или смешанная группа' },
          { ro: 'Elles sont françaises.', ru: 'Они (все) француженки.', note: 'elles — только ж.р.' },
          { ro: '* Parle français! (без местоимения в импératif)', ru: 'Говори по-французски!', note: 'единственное исключение' },
        ] },
      { id: 'pronouns-direct', title: 'Прямые объектные: me/te/le/la/nous/vous/les', body: 'Прямые объектные местоимения заменяют прямое дополнение (без предлога). Стоят перед спрягаемым глаголом. В passé composé с avoir причастие согласуется с заменённым существительным.',
        table: { headers: ['Лицо', 'Ед.ч.', 'Мн.ч.'], rows: [['1', 'me (m\')', 'nous'], ['2', 'te (t\')', 'vous'], ['3', 'le/la (l\')', 'les']] },
        examples: [
          { ro: 'Tu vois le film? — Oui, je le vois.', ru: 'Ты смотришь фильм? — Да, я его смотрю.' },
          { ro: 'Il m\'appelle tous les jours.', ru: 'Он звонит мне каждый день.', note: 'me = меня (прям. объект)' },
          { ro: 'Je les ai vus hier.', ru: 'Я их видел вчера.', note: 'les → причастие согласуется: vus' },
          { ro: 'Elle la prend.', ru: 'Она её берёт.', note: 'la = её (вещь/ж.р.)' },
          { ro: 'Il nous invite à dîner.', ru: 'Он приглашает нас на ужин.' },
          { ro: 'Je ne le connais pas.', ru: 'Я его не знаю.', note: 'местоимение внутри ne...pas' },
        ] },
      { id: 'pronouns-indirect', title: 'Косвенные объектные: me/te/lui/nous/vous/leur', body: 'Косвенные объектные местоимения заменяют дополнение с предлогом à (кому? для кого?). В 3-м лице отличаются от прямых: lui (ему/ей), leur (им). В passé composé причастие с ними НЕ согласуется.',
        table: { headers: ['Лицо', 'Ед.ч.', 'Мн.ч.'], rows: [['1', 'me (m\')', 'nous'], ['2', 'te (t\')', 'vous'], ['3', 'lui', 'leur']] },
        examples: [
          { ro: 'Je lui parle. / Je leur parle.', ru: 'Я говорю с ним/с ней. / Я говорю с ними.', note: 'lui/leur = кому' },
          { ro: 'Il m\'a écrit une lettre.', ru: 'Он написал мне письмо.' },
          { ro: 'Tu lui donnes le livre?', ru: 'Ты даёшь ему/ей книгу?' },
          { ro: 'Elle leur a répondu.', ru: 'Она им ответила.', note: 'причастие не согласуется' },
          { ro: 'Il me téléphone souvent.', ru: 'Он часто мне звонит.', note: 'téléphoner à кому → косвенный' },
          { ro: 'Nous vous expliquerons tout.', ru: 'Мы вам всё объясним.' },
        ] },
      { id: 'pronouns-y', title: 'Местоимение y', body: 'Y заменяет место (à/dans/sur + место) или дополнение с à у неодушевлённых. Стоит перед глаголом. Нельзя использовать для людей в значении «ему/ей» — только для мест и вещей. В разговорной речи: il y a = есть/имеется.', examples: [
          { ro: 'Tu vas à Paris? — Oui, j\'y vais.', ru: 'Ты едешь в Париж? — Да, туда еду.', note: 'y = à Paris' },
          { ro: 'Il pense à son travail? — Oui, il y pense.', ru: 'Он думает о работе? — Да, думает.', note: 'y = à son travail (вещь)' },
          { ro: 'Il y a une voiture devant la maison.', ru: 'Перед домом стоит машина.', note: 'il y a = есть/имеется' },
          { ro: 'Tu restes à la maison? — J\'y reste.', ru: 'Ты остаёшься дома? — Остаюсь там.' },
          { ro: 'Je pense à Marie. → *Je y pense. (ОШИБКА)', ru: 'Я думаю о Мари → нельзя y для людей', note: 'для людей → lui: je pense à elle' },
          { ro: "N'y va pas!", ru: 'Не ходи туда!', note: 'y при импératif' },
        ] },
      { id: 'pronouns-en', title: 'Местоимение en', body: 'En заменяет de + существительное (часть чего-то, количество, источник) или дополнение с de у неодушевлённых. При выражении количества число остаётся: j\'en veux deux. Стоит перед глаголом.', examples: [
          { ro: 'Tu as du pain? — Oui, j\'en ai.', ru: 'У тебя есть хлеб? — Да, есть (немного).', note: 'en = du pain' },
          { ro: 'Combien de frères as-tu? — J\'en ai deux.', ru: 'Сколько у тебя братьев? — Двое.', note: 'количество остаётся' },
          { ro: 'Il parle de son travail? — Oui, il en parle.', ru: 'Он говорит о работе? — Да, говорит.', note: 'parler de → en' },
          { ro: 'Il vient de Paris? — Oui, il en vient.', ru: 'Он из Парижа? — Да.', note: 'venir de + место → en' },
          { ro: 'J\'en veux encore.', ru: 'Я хочу ещё (этого).', note: 'en = этого/из этого' },
          { ro: "Prends-en!", ru: 'Возьми!', note: 'en при импératif — через дефис' },
        ] },
      { id: 'pronouns-order', title: 'Порядок при нескольких клитиках', body: 'При нескольких объектных местоимениях порядок фиксирован. Перед инфинитивом они идут к инфинитиву, а не к спрягаемому глаголу. В положительном импératif порядок меняется: прямой объект перед косвенным.',
        table: { headers: ['1', '2', '3', '4', '5'], rows: [['me/te/nous/vous', 'le/la/les', 'lui/leur', 'y', 'en']] },
        examples: [
          { ro: 'Il me le donne.', ru: 'Он мне его даёт.', note: 'me (косв.) перед le (прям.)' },
          { ro: 'Elle le lui explique.', ru: 'Она ему это объясняет.', note: 'le (прям.) перед lui (косв.)' },
          { ro: "Il y en a beaucoup.", ru: 'Там много (этого).', note: 'y перед en' },
          { ro: 'Donne-le-moi!', ru: 'Дай мне это!', note: 'импératif: прям. перед косв.; moi вместо me' },
          { ro: 'Je vais te le montrer.', ru: 'Я тебе это покажу.', note: 'перед инфинитивом' },
          { ro: 'Ne me le dis pas.', ru: 'Не говори мне этого.', note: 'отриц. импératif — стандартный порядок' },
        ] },
      { id: 'pronouns-possessive', title: 'Притяжательные: mon/ma/mes…', body: 'Притяжательные прилагательные согласуются с родом и числом предмета, а не владельца. Перед женским существительным, начинающимся с гласной, используется мужская форма: mon amie (не ma amie).',
        table: { headers: ['Владелец', 'М.р.', 'Ж.р.', 'Мн.ч.'], rows: [['je', 'mon', 'ma (mon)', 'mes'], ['tu', 'ton', 'ta (ton)', 'tes'], ['il/elle', 'son', 'sa (son)', 'ses'], ['nous', 'notre', 'notre', 'nos'], ['vous', 'votre', 'votre', 'vos'], ['ils/elles', 'leur', 'leur', 'leurs']] },
        examples: [
          { ro: 'mon livre, ma voiture, mes amis', ru: 'моя книга, моя машина, мои друзья' },
          { ro: 'mon amie (не ma amie)', ru: 'моя подруга', note: 'mon перед ж.р. на гласную' },
          { ro: 'son père, sa mère', ru: 'его/её отец, его/её мать', note: 'son/sa зависит от предмета, не владельца' },
          { ro: 'notre maison, votre voiture', ru: 'наш дом, ваша машина', note: 'notre/votre — одна форма для обоих родов' },
          { ro: 'leurs enfants', ru: 'их дети', note: 'leurs — мн. число от leur' },
          { ro: 'C\'est son père à elle.', ru: 'Это её отец.', note: 'уточнение пола — добавляют à elle/à lui' },
        ] },
      { id: 'pronouns-demonstrative', title: 'Указательные: ce/cet/cette/ces, celui/celle', body: 'Ce/cet/cette/ces — указательные прилагательные, стоят перед существительным. Celui/celle/ceux/celles — указательные местоимения, заменяют существительное. Для уточнения добавляют -ci (вот этот) или -là (вон тот).',
        table: { headers: ['', 'М.р.', 'М.р. (перед гласн.)', 'Ж.р.', 'Мн.ч.'], rows: [['Прилаг.', 'ce', 'cet', 'cette', 'ces'], ['Местоим.', 'celui', '—', 'celle', 'ceux/celles']] },
        examples: [
          { ro: 'ce livre, cette maison, ces enfants', ru: 'эта книга, этот дом, эти дети' },
          { ro: 'cet homme, cet enfant', ru: 'этот мужчина, этот ребёнок', note: 'cet перед гласной' },
          { ro: 'ce livre-ci / ce livre-là', ru: 'вот эта книга / вон та книга' },
          { ro: 'Quel livre? — Celui-là.', ru: 'Какая книга? — Вон та.', note: 'celui — местоимение' },
          { ro: 'Ma voiture est plus rapide que celle de Marie.', ru: 'Моя машина быстрее, чем машина Мари.', note: 'celle de = та, что принадлежит' },
          { ro: 'Ceux qui étudient réussissent.', ru: 'Те, кто учится, добиваются успеха.', note: 'ceux qui = те, кто' },
        ] },
      { id: 'pronouns-relative', title: 'Относительные: qui, que, dont, où', body: 'Qui — подлежащее придаточного (кто/который делает). Que — прямое дополнение (кого/который). Dont — дополнение с de (чей, о котором, которого). Où — место или время. Выбор зависит от синтаксической роли в придаточном, не от одушевлённости.', examples: [
          { ro: "L'homme qui parle est mon père.", ru: 'Мужчина, который говорит, — мой отец.', note: 'qui = подлежащее' },
          { ro: "Le livre que tu lis est intéressant.", ru: 'Книга, которую ты читаешь, интересная.', note: 'que = прямое дополнение' },
          { ro: "L'ami dont je parle s'appelle Marc.", ru: 'Друг, о котором я говорю, зовётся Марк.', note: "dont = de qui (parler de)" },
          { ro: "C'est la ville où je suis né.", ru: 'Это город, где я родился.', note: 'où = место' },
          { ro: "Le jour où il est arrivé…", ru: 'В день, когда он приехал…', note: 'où = время' },
          { ro: "La voiture dont il a besoin est chère.", ru: 'Машина, которая ему нужна, дорогая.', note: "avoir besoin de → dont" },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. ГЛАГОЛЫ. PRÉSENT
  // ─────────────────────────────────────────────
  {
    id: 'verbs-present',
    title: 'Глаголы. Présent',
    icon: '⚡',
    description: 'Три группы (-er, -ir, -re), нерегулярные être/avoir/aller/faire',
    sections: [
      { id: 'verbs-er', title: 'Глаголы -er (1-я группа)', body: 'Самая большая группа. Основа — инфинитив без -er. Окончания: -e, -es, -e, -ons, -ez, -ent. Финальные -e, -es, -ent не произносятся — три формы звучат одинаково. Глаголы на -cer и -ger имеют орфографические изменения в 1-м л. мн.ч.',
        table: { headers: ['Лицо', 'parler'], rows: [['je', 'parle'], ['tu', 'parles'], ['il/elle', 'parle'], ['nous', 'parlons'], ['vous', 'parlez'], ['ils/elles', 'parlent']] },
        examples: [
          { ro: 'Je parle français.', ru: 'Я говорю по-французски.' },
          { ro: 'Tu travailles beaucoup.', ru: 'Ты много работаешь.' },
          { ro: 'Nous mangeons ensemble.', ru: 'Мы едим вместе.', note: 'manger → mangeons (сохр. е перед о)' },
          { ro: 'Nous commençons.', ru: 'Мы начинаем.', note: 'commencer → ç перед o' },
          { ro: 'Ils regardent la télé.', ru: 'Они смотрят телевизор.', note: '-ent не произносится' },
          { ro: 'Elle chante très bien.', ru: 'Она очень хорошо поёт.' },
        ] },
      { id: 'verbs-ir', title: 'Глаголы -ir (2-я группа)', body: '2-я группа — правильные глаголы на -ir (finir, choisir, réussir). Характерная черта: основа во мн. числе расширяется через -iss-. Не путать с нерегулярными глаголами на -ir (partir, venir, sortir — они к 3-й группе).',
        table: { headers: ['Лицо', 'finir'], rows: [['je', 'finis'], ['tu', 'finis'], ['il/elle', 'finit'], ['nous', 'finissons'], ['vous', 'finissez'], ['ils/elles', 'finissent']] },
        examples: [
          { ro: 'Je finis mon travail.', ru: 'Я заканчиваю работу.' },
          { ro: 'Tu choisis quoi?', ru: 'Что ты выбираешь?' },
          { ro: 'Nous réfléchissons.', ru: 'Мы думаем/размышляем.', note: '-iss- во мн. числе' },
          { ro: 'Elle réussit toujours.', ru: 'Она всегда добивается успеха.' },
          { ro: 'Ils obéissent aux règles.', ru: 'Они соблюдают правила.' },
          { ro: 'Je grandis vite.', ru: 'Я быстро расту.', note: 'grandir — тоже 2-я группа' },
        ] },
      { id: 'verbs-re', title: 'Глаголы -re (3-я группа)', body: '3-я группа — разнородная: включает правильные -re (vendre, attendre) и множество нерегулярных (prendre, mettre, partir, venir…). Правильные -re: основа без -re, окончания -s/-s/-d/-ons/-ez/-ent. В 3-м л. ед. числа — нет окончания (il vend, не vendt).',
        table: { headers: ['Лицо', 'vendre'], rows: [['je', 'vends'], ['tu', 'vends'], ['il/elle', 'vend'], ['nous', 'vendons'], ['vous', 'vendez'], ['ils/elles', 'vendent']] },
        examples: [
          { ro: 'Il vend sa voiture.', ru: 'Он продаёт машину.', note: 'нет -t в 3-м л. ед.ч.' },
          { ro: 'Nous attendons le bus.', ru: 'Мы ждём автобус.' },
          { ro: 'Tu entends la musique?', ru: 'Ты слышишь музыку?' },
          { ro: 'Elle répond à ta question.', ru: 'Она отвечает на твой вопрос.' },
          { ro: 'Ils perdent du temps.', ru: 'Они теряют время.' },
          { ro: 'Je descends dans cinq minutes.', ru: 'Я спускаюсь через пять минут.' },
        ] },
      { id: 'verbs-etre', title: 'Être (быть)', body: 'Être — важнейший нерегулярный глагол. Вспомогательный в passé composé с глаголами движения и возвратными. Participé passé — été. Être + профессия/национальность без артикля: il est médecin.',
        table: { headers: ['Лицо', 'être'], rows: [['je', 'suis'], ['tu', 'es'], ['il/elle', 'est'], ['nous', 'sommes'], ['vous', 'êtes'], ['ils/elles', 'sont']] },
        examples: [
          { ro: 'Je suis étudiant.', ru: 'Я студент.' },
          { ro: 'Elle est française.', ru: 'Она француженка.' },
          { ro: 'Nous sommes à Paris.', ru: 'Мы в Париже.' },
          { ro: 'Vous êtes prêts?', ru: 'Вы готовы?' },
          { ro: 'Il est parti hier.', ru: 'Он уехал вчера.', note: 'être — вспомогательный глагол' },
          { ro: "C'est mon ami.", ru: 'Это мой друг.', note: "c'est = ce + est" },
        ] },
      { id: 'verbs-avoir', title: 'Avoir (иметь)', body: 'Avoir — вспомогательный глагол для passé composé большинства глаголов и для многих устойчивых выражений. Нерегулярен. Participé passé — eu. Важно: у французов «есть» (иметь), «испытывать» ощущения — через avoir, не être: avoir faim, avoir froid.',
        table: { headers: ['Лицо', 'avoir'], rows: [['je', 'ai'], ['tu', 'as'], ['il/elle', 'a'], ['nous', 'avons'], ['vous', 'avez'], ['ils/elles', 'ont']] },
        examples: [
          { ro: "J'ai un chat.", ru: 'У меня есть кот.' },
          { ro: 'Tu as quel âge?', ru: 'Сколько тебе лет?', note: 'avoir + âge = возраст' },
          { ro: "J'ai faim / soif / froid / chaud.", ru: 'Я голоден / хочу пить / мне холодно / жарко.' },
          { ro: 'Nous avons rendez-vous à midi.', ru: 'У нас встреча в полдень.' },
          { ro: "Il a parlé à Marie.", ru: 'Он поговорил с Мари.', note: 'avoir — вспомогательный глагол' },
          { ro: "Vous avez de la chance.", ru: 'Вам везёт / У вас есть удача.' },
        ] },
      { id: 'verbs-aller-faire', title: 'Aller, faire и другие нерегулярные', body: 'Самые частые нерегулярные: aller (идти), faire (делать), pouvoir (мочь), vouloir (хотеть), savoir (знать), venir (приходить). Их формы нужно выучить наизусть — они встречаются в каждом разговоре.',
        table: { headers: ['Лицо', 'aller', 'faire', 'pouvoir', 'vouloir'], rows: [['je', 'vais', 'fais', 'peux', 'veux'], ['tu', 'vas', 'fais', 'peux', 'veux'], ['il/elle', 'va', 'fait', 'peut', 'veut'], ['nous', 'allons', 'faisons', 'pouvons', 'voulons'], ['vous', 'allez', 'faites', 'pouvez', 'voulez'], ['ils/elles', 'vont', 'font', 'peuvent', 'veulent']] },
        examples: [
          { ro: 'Je vais au marché.', ru: 'Я иду на рынок.' },
          { ro: 'Qu\'est-ce que tu fais?', ru: 'Что ты делаешь?' },
          { ro: 'Il ne peut pas venir.', ru: 'Он не может прийти.' },
          { ro: 'Nous voulons partir.', ru: 'Мы хотим уехать.' },
          { ro: 'Tu sais nager?', ru: 'Ты умеешь плавать?', note: 'savoir = знать/уметь' },
          { ro: 'Ils viennent de Lyon.', ru: 'Они приехали из Лиона.', note: 'venir = приходить/приезжать' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. ГЛАГОЛЫ. PASSÉ COMPOSÉ
  // ─────────────────────────────────────────────
  {
    id: 'verbs-passe-compose',
    title: 'Глаголы. Passé composé',
    icon: '⏮️',
    description: 'avoir/être + participe passé, согласование причастия',
    sections: [
      { id: 'pc-avoir', title: 'Passé composé с avoir', body: 'Большинство глаголов образуют passé composé с avoir. Структура: avoir (в présent) + participe passé. С avoir причастие согласуется только если прямое дополнение стоит ПЕРЕД глаголом (местоимение или relative clause).', examples: [
          { ro: "J'ai mangé une pizza.", ru: 'Я съел пиццу.' },
          { ro: 'Tu as travaillé hier?', ru: 'Ты работал вчера?' },
          { ro: 'Elle a lu ce livre.', ru: 'Она прочитала эту книгу.' },
          { ro: 'Nous avons regardé un film.', ru: 'Мы посмотрели фильм.' },
          { ro: 'La pizza que j\'ai mangée était bonne.', ru: 'Пицца, которую я съел, была вкусной.', note: 'прям. дополн. перед глаголом → согласование: mangée' },
          { ro: "Ils l'ont vue hier.", ru: 'Они её видели вчера.', note: "la (ж.р.) → vue" },
        ] },
      { id: 'pc-etre', title: 'Passé composé с être — глаголы движения и возвратные', body: 'С être спрягаются 17 глаголов движения/состояния (Dr Mrs Vandertrampp) и все возвратные. С être причастие всегда согласуется с подлежащим в роде и числе.',
        table: { headers: ['Dr Mrs Vandertrampp'], rows: [['Devenir, Revenir / Mourir, Rester / Sortir / Venir / Arriver, Naître / Descendre, Entrer, Retourner / Tomber, Rentrer, Aller / Monter, Partir, Passer']] },
        examples: [
          { ro: 'Elle est arrivée hier soir.', ru: 'Она приехала вчера вечером.', note: 'arrivée — ж.р.' },
          { ro: 'Ils sont partis tôt.', ru: 'Они уехали рано.', note: 'partis — м.р. мн.ч.' },
          { ro: 'Nous sommes restés à la maison.', ru: 'Мы остались дома.' },
          { ro: 'Elle s\'est levée à sept heures.', ru: 'Она встала в семь часов.', note: 'возвратный — être + согласование' },
          { ro: 'Il est né en 1990.', ru: 'Он родился в 1990 году.' },
          { ro: 'Elles sont tombées.', ru: 'Они (ж.р.) упали.', note: 'tombées — ж.р. мн.ч.' },
        ] },
      { id: 'pc-agreement', title: 'Согласование причастия', body: 'Правило: (1) с être — всегда согласуется с подлежащим; (2) с avoir — согласуется только если прямое дополнение стоит перед глаголом (местоимение le/la/les, relative que, вопросительное combien). Согласование слышно только с некоторыми причастиями.', examples: [
          { ro: 'Elle est partie.', ru: 'Она ушла.', note: 'être: partie (ж.р.)' },
          { ro: "Je l'ai vue. (la = ж.р.)", ru: 'Я её видел.', note: 'avoir + прям. дополн. перед: vue' },
          { ro: "Les livres que j'ai lus…", ru: 'Книги, которые я прочитал…', note: 'que = les livres → lus (м.р. мн.ч.)' },
          { ro: "Combien de lettres as-tu écrites?", ru: 'Сколько писем ты написал?', note: 'согласование с lettres' },
          { ro: "Elle a mangé la pizza. (нет согласования)", ru: 'Она съела пиццу.', note: 'дополнение после — нет согласования' },
          { ro: 'Ils se sont lavés.', ru: 'Они помылись.', note: 'возвратный + être: lavés (м.р. мн.ч.)' },
        ] },
      { id: 'pc-participles', title: 'Образование participe passé — правильные и нерегулярные', body: 'Правильные: -er → -é; -ir (2 гр.) → -i; -re → -u. Нерегулярные нужно учить: être → été, avoir → eu, faire → fait, prendre → pris, mettre → mis, venir → venu, partir → parti, voir → vu, savoir → su.',
        table: { headers: ['Инфинитив', 'Participe passé', 'Инфинитив', 'Participe passé'], rows: [['parler', 'parlé', 'être', 'été'], ['finir', 'fini', 'avoir', 'eu'], ['vendre', 'vendu', 'faire', 'fait'], ['prendre', 'pris', 'venir', 'venu'], ['mettre', 'mis', 'voir', 'vu']] },
        examples: [
          { ro: 'parler → parlé, finir → fini, vendre → vendu', ru: 'правильные причастия' },
          { ro: "J'ai fait mes devoirs.", ru: 'Я сделал домашнее задание.', note: 'faire → fait' },
          { ro: "Elle a pris le train.", ru: 'Она села на поезд.', note: 'prendre → pris' },
          { ro: "Tu as vu ce film?", ru: 'Ты видел этот фильм?', note: 'voir → vu' },
          { ro: "Il a mis son manteau.", ru: 'Он надел пальто.', note: 'mettre → mis' },
          { ro: "Nous avons eu de la chance.", ru: 'Нам повезло.', note: 'avoir → eu' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. ГЛАГОЛЫ. IMPARFAIT
  // ─────────────────────────────────────────────
  {
    id: 'verbs-imparfait',
    title: 'Глаголы. Imparfait',
    icon: '🌅',
    description: 'Описание, фон, повторяющееся прошлое',
    sections: [
      { id: 'imparfait-formation', title: 'Образование imparfait', body: 'Основа — форма «nous» в présent без -ons. Окончания одинаковы для всех глаголов: -ais, -ais, -ait, -ions, -iez, -aient. Единственное исключение в основе — être: имп. основа ét- (était, étions…).',
        table: { headers: ['Лицо', 'parler', 'finir', 'être'], rows: [['je', 'parlais', 'finissais', 'étais'], ['tu', 'parlais', 'finissais', 'étais'], ['il/elle', 'parlait', 'finissait', 'était'], ['nous', 'parlions', 'finissions', 'étions'], ['vous', 'parliez', 'finissiez', 'étiez'], ['ils/elles', 'parlaient', 'finissaient', 'étaient']] },
        examples: [
          { ro: 'Quand j\'étais enfant, j\'habitais à Lyon.', ru: 'Когда я был ребёнком, я жил в Лионе.' },
          { ro: 'Il faisait beau ce jour-là.', ru: 'В тот день была хорошая погода.', note: 'описание обстановки' },
          { ro: 'Nous mangions toujours ensemble.', ru: 'Мы всегда ели вместе.', note: 'повторяющееся прошлое' },
          { ro: 'Elle lisait quand le téléphone a sonné.', ru: 'Она читала, когда зазвонил телефон.', note: 'фоновое действие' },
          { ro: 'Je voulais te parler.', ru: 'Я хотел с тобой поговорить.' },
          { ro: 'Ils habitaient près de la mer.', ru: 'Они жили недалеко от моря.' },
        ] },
      { id: 'imparfait-vs-pc', title: 'Imparfait vs passé composé — когда что', body: 'Passé composé — завершённое однократное событие в прошлом. Imparfait — описание, фон, состояние, повторяющееся действие. В нарративе: PC = события сюжета, imparfait = декорации. Ключ: можно ли сказать «я делал это снова и снова» или «это было состояние»? → imparfait.', examples: [
          { ro: "Il a lu le livre. / Il lisait un livre.", ru: 'Он прочитал книгу (завершено) / Он читал книгу (в процессе).', note: 'PC vs imparfait' },
          { ro: "Hier, je suis allé au marché.", ru: 'Вчера я пошёл на рынок.', note: 'однократное событие → PC' },
          { ro: "Tous les matins, j\'allais au marché.", ru: 'Каждое утро я ходил на рынок.', note: 'повторяющееся → imparfait' },
          { ro: "Elle lisait quand son ami est arrivé.", ru: 'Она читала, когда пришёл друг.', note: 'фон (imparfait) + событие (PC)' },
          { ro: "J'avais vingt ans.", ru: 'Мне было двадцать лет.', note: 'состояние/возраст → imparfait' },
          { ro: "Il a soudain compris la vérité.", ru: 'Он вдруг понял правду.', note: 'soudain + PC = внезапное событие' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. ГЛАГОЛЫ. FUTUR
  // ─────────────────────────────────────────────
  {
    id: 'verbs-future',
    title: 'Глаголы. Будущее время',
    icon: '⏭️',
    description: 'Futur simple и futur proche (aller + infinitif)',
    sections: [
      { id: 'future-proche', title: 'Futur proche: aller + infinitif', body: 'Futur proche = aller (в présent) + инфинитив. Выражает ближайшее будущее или намерение — аналог «собираюсь сделать». В разговорной речи используется чаще, чем futur simple. Отрицание: ne...pas обрамляет aller.', examples: [
          { ro: 'Je vais manger bientôt.', ru: 'Я скоро поем.' },
          { ro: "Il va partir demain.", ru: 'Он уедет завтра.' },
          { ro: "Nous allons voir ce film ce soir.", ru: 'Мы собираемся посмотреть этот фильм сегодня вечером.' },
          { ro: "Tu vas comprendre.", ru: 'Ты поймёшь.' },
          { ro: "Je ne vais pas venir.", ru: 'Я не приду.', note: 'ne...pas вокруг aller' },
          { ro: "Elle va avoir un bébé.", ru: 'Она собирается родить ребёнка / ждёт ребёнка.' },
        ] },
      { id: 'future-simple', title: 'Futur simple', body: 'Futur simple образуется от инфинитива (или нерегулярной основы) + окончания: -ai, -as, -a, -ons, -ez, -ont. Глаголы на -re теряют финальное -e перед окончанием. Используется для будущих событий, предсказаний, обещаний.',
        table: { headers: ['Лицо', 'parler', 'finir', 'vendre'], rows: [['je', 'parlerai', 'finirai', 'vendrai'], ['tu', 'parleras', 'finiras', 'vendras'], ['il/elle', 'parlera', 'finira', 'vendra'], ['nous', 'parlerons', 'finirons', 'vendrons'], ['vous', 'parlerez', 'finirez', 'vendrez'], ['ils/elles', 'parleront', 'finiront', 'vendront']] },
        examples: [
          { ro: "Je parlerai au directeur demain.", ru: 'Я поговорю с директором завтра.' },
          { ro: "Il fera beau ce week-end.", ru: 'На выходных будет хорошая погода.' },
          { ro: "Nous partirons à huit heures.", ru: 'Мы уедем в восемь часов.' },
          { ro: "Quand tu arriveras, appelle-moi.", ru: 'Когда приедешь, позвони мне.', note: 'после quand — futur, не présent!' },
          { ro: "Elle sera médecin un jour.", ru: 'Она когда-нибудь станет врачом.' },
          { ro: "Vous aurez le résultat dans trois jours.", ru: 'Результат будет через три дня.' },
        ] },
      { id: 'future-irregular', title: 'Нерегулярные основы futur simple', body: 'Около 20 глаголов имеют нерегулярную основу в futur simple. Окончания те же (-ai, -as, -a…), только основа другая. Самые важные: être → ser-, avoir → aur-, aller → ir-, faire → fer-, venir → viendr-, voir → verr-, pouvoir → pourr-, vouloir → voudr-.',
        table: { headers: ['Инфинитив', 'Основа futur', 'je...'], rows: [['être', 'ser-', 'serai'], ['avoir', 'aur-', 'aurai'], ['aller', 'ir-', 'irai'], ['faire', 'fer-', 'ferai'], ['venir', 'viendr-', 'viendrai'], ['voir', 'verr-', 'verrai'], ['pouvoir', 'pourr-', 'pourrai'], ['vouloir', 'voudr-', 'voudrai']] },
        examples: [
          { ro: "Je serai là à dix heures.", ru: 'Я буду там в десять.', note: 'être → serai' },
          { ro: "Il fera froid demain.", ru: 'Завтра будет холодно.', note: 'faire → fera' },
          { ro: "Tu pourras m'aider?", ru: 'Ты сможешь мне помочь?', note: 'pouvoir → pourras' },
          { ro: "Nous irons à la plage.", ru: 'Мы поедем на пляж.', note: 'aller → irons' },
          { ro: "Elle viendra avec nous.", ru: 'Она придёт с нами.', note: 'venir → viendra' },
          { ro: "Vous verrez comme c'est beau.", ru: 'Вы увидите, как это красиво.', note: 'voir → verrez' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 9. ГЛАГОЛЫ. CONDITIONNEL
  // ─────────────────────────────────────────────
  {
    id: 'verbs-conditional',
    title: 'Conditionnel',
    icon: '🤔',
    description: 'Вежливость, гипотезы, нереальные ситуации',
    sections: [
      { id: 'cond-present', title: 'Conditionnel présent — вежливость и гипотезы', body: 'Образуется от основы futur simple + окончания imparfait (-ais, -ais, -ait, -ions, -iez, -aient). Три функции: (1) вежливая просьба/желание, (2) гипотеза (si + imparfait → conditionnel), (3) непроверенное утверждение (il serait → по слухам).', examples: [
          { ro: "Je voudrais un café, s'il vous plaît.", ru: 'Я бы хотел кофе, пожалуйста.', note: 'вежливость' },
          { ro: "Pourriez-vous m'aider?", ru: 'Не могли бы вы мне помочь?', note: 'вежливая просьба' },
          { ro: "Si j'avais de l'argent, je voyagerais.", ru: 'Если бы у меня были деньги, я бы путешествовал.', note: 'si + imparfait → conditionnel' },
          { ro: "À ta place, je n'irais pas.", ru: 'На твоём месте я бы не пошёл.' },
          { ro: "Il serait malade, selon les rumeurs.", ru: 'По слухам, он якобы болен.', note: 'непроверенная информация' },
          { ro: "Vous devriez consulter un médecin.", ru: 'Вам следовало бы обратиться к врачу.', note: 'devoir в conditionnel = следует' },
        ] },
      { id: 'cond-passe', title: 'Conditionnel passé — нереальное прошлое', body: 'Conditionnel passé = avoir/être в conditionnel présent + participe passé. Выражает нереализованное действие в прошлом. В условных предложениях: si + plus-que-parfait → conditionnel passé. Также используется для выражения сожаления или упрёка.', examples: [
          { ro: "Si j'avais étudié, j'aurais réussi.", ru: 'Если бы я учился, я бы сдал.', note: 'si + plus-q-p → cond. passé' },
          { ro: "J'aurais dû partir plus tôt.", ru: 'Мне надо было уйти раньше.', note: 'сожаление' },
          { ro: "Tu aurais pu m'appeler!", ru: 'Ты мог бы мне позвонить!', note: 'упрёк' },
          { ro: "Elle serait venue si elle avait su.", ru: 'Она бы пришла, если бы знала.' },
          { ro: "Il aurait été préférable de partir.", ru: 'Было бы лучше уйти.' },
          { ro: "Selon la presse, il aurait démissionné.", ru: 'По данным прессы, он якобы ушёл в отставку.', note: 'непроверенное прошлое' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 10. ГЛАГОЛЫ. SUBJONCTIF
  // ─────────────────────────────────────────────
  {
    id: 'verbs-subjonctif',
    title: 'Subjonctif',
    icon: '🔀',
    description: 'После que, глаголов желания/сомнения/необходимости',
    sections: [
      { id: 'subj-present', title: 'Subjonctif présent — образование', body: 'Основа — форма ils/elles présent без -ent. Окончания: -e, -es, -e, -ions, -iez, -ent. Для nous/vous — основа от nous présent (те же, что в imparfait). Исключения с особой основой: être, avoir, aller, faire, pouvoir, savoir, vouloir.',
        table: { headers: ['Лицо', 'parler', 'finir', 'prendre'], rows: [['je (que)', 'parle', 'finisse', 'prenne'], ['tu (que)', 'parles', 'finisses', 'prennes'], ['il (que)', 'parle', 'finisse', 'prenne'], ['nous (que)', 'parlions', 'finissions', 'prenions'], ['vous (que)', 'parliez', 'finissiez', 'preniez'], ['ils (que)', 'parlent', 'finissent', 'prennent']] },
        examples: [
          { ro: "Il faut que tu parles.", ru: 'Тебе нужно поговорить.' },
          { ro: "Je veux qu'elle vienne.", ru: 'Я хочу, чтобы она пришла.' },
          { ro: "Il est important que vous compreniez.", ru: 'Важно, чтобы вы понимали.' },
          { ro: "Bien qu'il soit fatigué, il travaille.", ru: 'Хотя он устал, он работает.', note: 'bien que + subj.' },
          { ro: "Pour qu'elle réussisse, elle doit travailler.", ru: 'Чтобы она добилась успеха, она должна работать.' },
          { ro: "Je doute qu'il ait raison.", ru: 'Я сомневаюсь, что он прав.', note: 'douter que + subj.' },
        ] },
      { id: 'subj-triggers', title: 'После каких глаголов и выражений', body: 'Субжонктив требуется после: (1) желания/воли: vouloir que, souhaiter que, préférer que; (2) чувства: être content/triste/surpris que; (3) необходимости: il faut que, il est nécessaire que; (4) сомнения/отрицания: douter que, ne pas croire que; (5) уступки: bien que, quoique, pour que, avant que.', examples: [
          { ro: "Je veux que tu viennes.", ru: 'Я хочу, чтобы ты пришёл.', note: 'vouloir que' },
          { ro: "Il est content que tu sois là.", ru: 'Он рад, что ты здесь.', note: 'être content que' },
          { ro: "Il faut que vous partiez.", ru: 'Вам нужно уйти.', note: 'il faut que' },
          { ro: "Bien que ce soit difficile, je le ferai.", ru: 'Хотя это трудно, я это сделаю.', note: 'bien que' },
          { ro: "Je lui téléphone avant qu'il parte.", ru: 'Я позвоню ему, пока он не ушёл.', note: 'avant que' },
          { ro: "Crois-tu qu'il soit honnête?", ru: 'Ты думаешь, что он честный?', note: 'вопрос/сомнение → subj.' },
        ] },
      { id: 'subj-passe', title: 'Subjonctif passé', body: 'Subjonctif passé = avoir/être в subjonctif présent + participe passé. Используется когда действие в придаточном предшествует действию в главном. Если оба действия одновременны или придаточное в будущем — используется subjonctif présent.', examples: [
          { ro: "Je suis content qu'il soit venu.", ru: 'Я рад, что он пришёл.', note: 'пришёл раньше моей радости' },
          { ro: "Il est dommage qu'elle soit partie.", ru: 'Жаль, что она ушла.' },
          { ro: "Bien qu'il ait tout essayé, il n'a pas réussi.", ru: 'Хотя он всё попробовал, он не добился успеха.' },
          { ro: "Je doute qu'il ait compris.", ru: 'Я сомневаюсь, что он понял.', note: 'предшествующее понимание' },
          { ro: "Je veux qu'il vienne (présent) vs. Je suis content qu'il soit venu (passé).", ru: 'Хочу чтобы пришёл (буд.) vs. Рад что пришёл (уже было).' },
          { ro: "C'est la meilleure chose qu'il ait faite.", ru: 'Это лучшее, что он сделал.', note: 'превосходная степень + subj. passé' },
        ] },
      { id: 'subj-irregular', title: 'Нерегулярные формы (être, avoir, aller, faire…)', body: 'Несколько глаголов имеют полностью нерегулярный subjonctif. Être и avoir встречаются в каждом тексте. Aller, faire, pouvoir, savoir, vouloir — тоже частые нерегулярные.',
        table: { headers: ['Лицо', 'être', 'avoir', 'aller', 'faire', 'pouvoir'], rows: [['je', 'sois', 'aie', 'aille', 'fasse', 'puisse'], ['tu', 'sois', 'aies', 'ailles', 'fasses', 'puisses'], ['il/elle', 'soit', 'ait', 'aille', 'fasse', 'puisse'], ['nous', 'soyons', 'ayons', 'allions', 'fassions', 'puissions'], ['vous', 'soyez', 'ayez', 'alliez', 'fassiez', 'puissiez'], ['ils/elles', 'soient', 'aient', 'aillent', 'fassent', 'puissent']] },
        examples: [
          { ro: "Il faut qu'il soit là.", ru: 'Ему нужно быть там.', note: 'être → soit' },
          { ro: "Je veux qu'elle ait confiance.", ru: 'Я хочу, чтобы она доверяла.', note: 'avoir → ait' },
          { ro: "Bien qu'il aille mieux, il reste.", ru: 'Хотя ему лучше, он остаётся.', note: 'aller → aille' },
          { ro: "Il faut que tu fasses attention.", ru: 'Тебе нужно быть внимательным.', note: 'faire → fasses' },
          { ro: "Je doute qu'il puisse venir.", ru: 'Я сомневаюсь, что он сможет прийти.', note: 'pouvoir → puisse' },
          { ro: "Il est rare qu'elle veuille sortir.", ru: 'Редко бывает, что она хочет выйти.', note: 'vouloir → veuille' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 11. PLUS-QUE-PARFAIT
  // ─────────────────────────────────────────────
  {
    id: 'verbs-pluperfect',
    title: 'Plus-que-parfait',
    icon: '⏪',
    description: 'Предпрошедшее — действие до другого действия в прошлом',
    sections: [
      { id: 'plpf-formation', title: 'Образование', body: 'Plus-que-parfait = avoir/être в imparfait + participe passé. Те же правила вспомогательного глагола, что и в passé composé (être — для глаголов движения и возвратных). Согласование причастия — те же правила.', examples: [
          { ro: "J'avais mangé quand il est arrivé.", ru: 'Я уже поел, когда он пришёл.' },
          { ro: "Elle était partie avant la réunion.", ru: 'Она ушла до совещания.' },
          { ro: "Il avait lu le livre deux fois.", ru: 'Он читал эту книгу дважды (до какого-то момента).' },
          { ro: "Nous nous étions déjà rencontrés.", ru: 'Мы уже встречались раньше.', note: 'возвратный с être' },
          { ro: "Je n'avais jamais vu ça.", ru: 'Я никогда такого не видел (до тех пор).' },
          { ro: "Il était fatigué car il avait travaillé toute la nuit.", ru: 'Он устал, потому что работал всю ночь.' },
        ] },
      { id: 'plpf-usage', title: 'Употребление — quand, après que, avant que', body: 'Plus-que-parfait показывает действие, предшествующее другому прошедшему. Часто в паре с imparfait или passé composé. После après que — plus-que-parfait (формально; в разговорной речи часто passé composé). В косвенной речи при смещении времён: passé composé → plus-que-parfait.', examples: [
          { ro: "Quand il est arrivé, elle était déjà partie.", ru: 'Когда он пришёл, она уже ушла.', note: 'PQP предшествует PC' },
          { ro: "Après qu'il eut parlé, tout le monde applaudit.", ru: 'После того как он поговорил, все зааплодировали.' },
          { ro: "Il m'a dit qu'il avait vu ce film.", ru: 'Он сказал, что видел этот фильм.', note: 'косвенная речь: PC → PQP' },
          { ro: "Je n'avais jamais mangé de sushi avant.", ru: 'Я никогда раньше не ел суши.' },
          { ro: "Si j'avais su, je ne serais pas venu.", ru: 'Если бы я знал, я бы не пришёл.', note: 'si + PQP → cond. passé' },
          { ro: "Il était sûr de l'avoir déjà rencontré.", ru: 'Он был уверен, что уже встречал его.' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 12. ГЛАГОЛЫ. IMPÉRATIF
  // ─────────────────────────────────────────────
  {
    id: 'imperative',
    title: 'Impératif',
    icon: '📢',
    description: 'Команды для tu/vous/nous, отрицательный императив',
    sections: [
      { id: 'imp-formation', title: 'Образование: tu/vous/nous', body: 'Три формы импératif: tu (неформальная), vous (формальная или мн.ч.), nous («давайте»). Образуется от présent — без субъектного местоимения. Глаголы -er: форма tu теряет финальное -s (mange!, не manges!). Нерегулярные: être → sois/soyons/soyez; avoir → aie/ayons/ayez; savoir → sache/sachons/sachez.',
        table: { headers: ['Глагол', 'tu', 'nous', 'vous'], rows: [['parler', 'parle!', 'parlons!', 'parlez!'], ['finir', 'finis!', 'finissons!', 'finissez!'], ['prendre', 'prends!', 'prenons!', 'prenez!'], ['être', 'sois!', 'soyons!', 'soyez!'], ['avoir', 'aie!', 'ayons!', 'ayez!']] },
        examples: [
          { ro: "Mange tes légumes!", ru: 'Ешь свои овощи!', note: 'mange — без -s' },
          { ro: "Finissez votre travail!", ru: 'Заканчивайте свою работу!' },
          { ro: "Allons au cinéma!", ru: 'Пойдём в кино!' },
          { ro: "Sois patient!", ru: 'Будь терпеливым!', note: 'être → sois' },
          { ro: "Ayez confiance!", ru: 'Доверяйте!', note: 'avoir → ayez' },
          { ro: "Sache que je t'aime.", ru: 'Знай, что я тебя люблю.', note: 'savoir → sache' },
        ] },
      { id: 'imp-negative', title: 'Отрицательный импératif', body: 'Отрицательный импératif: ne + глагол + pas (ne…pas вокруг глагола). Глаголы -er в отрицательной форме возвращают -s: ne mange pas! (не manges — но ne manges pas!). При объектных местоимениях в отрицательном импératif — стандартный порядок (местоимение перед глаголом).', examples: [
          { ro: "Ne mange pas ça!", ru: 'Не ешь это!' },
          { ro: "Ne partez pas!", ru: 'Не уходите!' },
          { ro: "N'oublie pas ton passeport.", ru: 'Не забудь паспорт.' },
          { ro: "Ne lui dis rien.", ru: 'Ничего ему не говори.', note: 'местоимение перед глаголом' },
          { ro: "Ne te lève pas encore.", ru: 'Ещё не вставай.', note: 'возвратный: te перед глаголом' },
          { ro: "N'y allez pas!", ru: 'Не идите туда!', note: 'y перед глаголом' },
        ] },
      { id: 'imp-pronouns', title: 'Местоимения при императиве', body: 'В положительном импératif объектные местоимения стоят ПОСЛЕ глагола через дефис. Порядок: прямой объект перед косвенным. me/te → moi/toi после глагола. В отрицательном — стандартный порядок перед глаголом (me/te, без moi/toi).', examples: [
          { ro: "Mange-le!", ru: 'Съешь его!', note: 'прям. объект после глагола' },
          { ro: "Donne-lui le livre.", ru: 'Дай ему книгу.', note: 'косв. объект после глагола' },
          { ro: "Donne-le-moi!", ru: 'Дай мне это!', note: 'прям. (le) перед косв. (moi)' },
          { ro: "Parle-moi!", ru: 'Поговори со мной!', note: 'moi вместо me' },
          { ro: "Ne me le dis pas.", ru: 'Не говори мне этого.', note: 'отриц.: стандартный порядок' },
          { ro: "Allons-y!", ru: 'Пойдём! / Поехали!', note: 'y после глагола' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 13. ВОЗВРАТНЫЕ ГЛАГОЛЫ
  // ─────────────────────────────────────────────
  {
    id: 'reflexive',
    title: 'Возвратные глаголы',
    icon: '🔄',
    description: 'Se laver, se lever — me/te/se/nous/vous/se',
    sections: [
      { id: 'reflexive-present', title: 'Возвратные глаголы в présent', body: 'Возвратные глаголы в словаре — se + инфинитив: se lever, se laver, s\'appeler. Возвратное местоимение стоит перед глаголом и меняется по лицам: me/te/se/nous/vous/se. Перед гласной — элизия: je m\'appelle.', examples: [
          { ro: 'Je me lève à sept heures.', ru: 'Я встаю в семь часов.' },
          { ro: 'Tu te laves les mains.', ru: 'Ты моешь руки.', note: 'артикль (не притяжательное) при теле' },
          { ro: 'Il s\'appelle Marc.', ru: 'Его зовут Марк.', note: "se → s' перед гласной" },
          { ro: 'Nous nous couchons tôt.', ru: 'Мы ложимся спать рано.' },
          { ro: 'Vous vous reposez?', ru: 'Вы отдыхаете?' },
          { ro: 'Elles se promènent dans le parc.', ru: 'Они прогуливаются в парке.' },
        ] },
      { id: 'reflexive-passe', title: 'В passé composé — всегда être, согласование', body: 'Возвратные глаголы в passé composé — всегда с être. Причастие согласуется с подлежащим, ЕСЛИ возвратное местоимение является прямым дополнением. Если есть отдельное прямое дополнение (je me suis lavé les mains) — причастие не согласуется.', examples: [
          { ro: 'Elle s\'est levée tôt.', ru: 'Она встала рано.', note: 'levée — согласование с elle' },
          { ro: 'Ils se sont rencontrés.', ru: 'Они встретились.', note: 'rencontrés — м.р. мн.ч.' },
          { ro: 'Elle s\'est lavé les mains.', ru: 'Она помыла руки.', note: 'les mains = прям. доп. → нет согласования' },
          { ro: 'Nous nous sommes promenés.', ru: 'Мы прогулялись.', note: 'promenés — мн.ч.' },
          { ro: 'Elles se sont habillées.', ru: 'Они оделись.', note: 'habillées — ж.р. мн.ч.' },
          { ro: 'Il s\'est brossé les dents.', ru: 'Он почистил зубы.', note: 'les dents = прям. доп. → нет согласования' },
        ] },
      { id: 'reflexive-common', title: 'Частые возвратные глаголы', body: 'Многие французские возвратные глаголы переводятся на русский без «себя» — они просто так устроены во французском. Некоторые глаголы меняют смысл при возвратной форме: aller vs s\'en aller, appeler vs s\'appeler.', examples: [
          { ro: 'se lever, se coucher, se réveiller', ru: 'вставать, ложиться, просыпаться' },
          { ro: 'se laver, se brosser, s\'habiller', ru: 'мыться, чистить зубы, одеваться' },
          { ro: 'se souvenir de', ru: 'помнить, вспоминать', note: 'только возвратный' },
          { ro: 's\'en aller', ru: 'уходить, уезжать', note: 'aller = идти, s\'en aller = убираться' },
          { ro: 'se tromper', ru: 'ошибаться', note: 'se tromper ≠ tromper (обманывать)' },
          { ro: 'se dépêcher, se reposer, s\'inquiéter', ru: 'торопиться, отдыхать, беспокоиться' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 14. ОТРИЦАНИЕ
  // ─────────────────────────────────────────────
  {
    id: 'negation',
    title: 'Отрицание',
    icon: '🚫',
    description: 'ne…pas, ne…jamais, ne…rien, ne…personne, ne…plus',
    sections: [
      { id: 'negation-pas', title: 'Ne…pas — базовое отрицание', body: 'Стандартное отрицание: ne перед глаголом, pas после. В passé composé ne...pas обрамляет вспомогательный глагол (не причастие). В разговорной речи ne часто опускается. Перед гласной: n\'.',
        examples: [
          { ro: 'Je ne parle pas espagnol.', ru: 'Я не говорю по-испански.' },
          { ro: "Il n'aime pas le café.", ru: 'Он не любит кофе.', note: "ne → n' перед гласной" },
          { ro: "Je n'ai pas mangé.", ru: 'Я не ел.', note: 'в passé composé: обрамляет avoir' },
          { ro: "Elle n'est pas venue.", ru: 'Она не пришла.', note: 'ne...pas вокруг est' },
          { ro: "— Tu viens? — Non, je viens pas.", ru: '— Ты идёшь? — Нет, не иду.', note: 'разговорный: без ne' },
          { ro: "Ne me dérange pas!", ru: 'Не мешай мне!', note: 'импératif' },
        ] },
      { id: 'negation-other', title: 'Ne…jamais, ne…rien, ne…personne, ne…plus, ne…que', body: 'Французский использует несколько отрицательных пар с ne. В составных временах jamais/rien/plus стоят сразу после вспомогательного глагола, а personne — после причастия.', examples: [
          { ro: 'Je ne mange jamais de viande.', ru: 'Я никогда не ем мясо.', note: 'ne...jamais' },
          { ro: 'Il ne dit rien.', ru: 'Он ничего не говорит.', note: 'ne...rien' },
          { ro: "Je n'ai rien mangé.", ru: 'Я ничего не ел.', note: 'в passé composé: rien перед причастием' },
          { ro: 'Elle ne voit personne.', ru: 'Она никого не видит.', note: 'ne...personne' },
          { ro: 'Il ne travaille plus ici.', ru: 'Он больше не работает здесь.', note: 'ne...plus' },
          { ro: 'Je ne bois que du thé.', ru: 'Я пью только чай.', note: 'ne...que = ограничение «только»' },
        ] },
      { id: 'negation-spoken', title: 'Разговорное — пропуск ne', body: 'В разговорной речи ne систематически опускается — остаётся только pas/jamais/rien/plus. Это норма для неформального общения, не ошибка. В письменной речи и формальном регистре ne обязателен.', examples: [
          { ro: "Je sais pas. / Je sais pas du tout.", ru: 'Не знаю. / Совсем не знаю.', note: 'без ne — разговорный' },
          { ro: "C'est pas vrai!", ru: 'Неправда! Не может быть!', note: 'эмоциональная реакция' },
          { ro: "T'as pas faim?", ru: 'Ты не голоден?', note: 'tu → t\' в быстрой речи' },
          { ro: "Y'a rien à faire.", ru: 'Нечего делать.', note: "il y a → y'a разговорно" },
          { ro: "Je comprends pas pourquoi il dit ça.", ru: 'Не понимаю, почему он это говорит.' },
          { ro: "— Tu viens? — Non, je peux pas.", ru: '— Идёшь? — Нет, не могу.', note: 'частая бытовая формула' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 15. ВОПРОСЫ
  // ─────────────────────────────────────────────
  {
    id: 'questions',
    title: 'Вопросы',
    icon: '❓',
    description: 'Интонация, est-ce que, инверсия, вопросительные слова',
    sections: [
      { id: 'questions-intonation', title: 'Вопрос через интонацию', body: 'Самый простой способ задать вопрос в разговорной речи — поднять интонацию в конце фразы, не меняя порядок слов. Это норма для неформального общения. На письме — только вопросительный знак.', examples: [
          { ro: 'Tu viens? / Il est là?', ru: 'Ты идёшь? / Он там?', note: 'прямой порядок + интонация' },
          { ro: "Vous parlez français?", ru: 'Вы говорите по-французски?' },
          { ro: "C'est ton livre?", ru: 'Это твоя книга?' },
          { ro: "Il a mangé?", ru: 'Он поел?' },
          { ro: "Vous avez des chambres libres?", ru: 'У вас есть свободные номера?' },
          { ro: "Elle est déjà arrivée?", ru: 'Она уже приехала?' },
        ] },
      { id: 'questions-est-ce-que', title: 'Est-ce que…?', body: "Est-ce que добавляется в начало предложения — порядок слов остаётся прямым. Это нейтральный способ задать вопрос, подходящий для любого регистра. Перед гласной: est-ce qu'.", examples: [
          { ro: "Est-ce que tu viens?", ru: 'Ты идёшь?' },
          { ro: "Est-ce qu'il parle français?", ru: 'Он говорит по-французски?', note: "qu' перед гласной" },
          { ro: "Est-ce que vous avez une chambre?", ru: 'У вас есть номер?' },
          { ro: "Pourquoi est-ce qu'il pleure?", ru: 'Почему он плачет?' },
          { ro: "Qu'est-ce que tu veux?", ru: 'Чего ты хочешь?', note: "que + est-ce que → qu'est-ce que" },
          { ro: "Qu'est-ce qui se passe?", ru: 'Что происходит?', note: "qu'est-ce qui — подлежащее" },
        ] },
      { id: 'questions-inversion', title: 'Инверсия субъекта и глагола', body: 'Инверсия — формальный способ вопроса: глагол ставится перед местоимением-подлежащим через дефис. Если существительное — оно остаётся на месте, добавляется местоимение: Marie, vient-elle? Для связи согласных добавляют -t-: a-t-il, va-t-elle.', examples: [
          { ro: "Parlez-vous français?", ru: 'Вы говорите по-французски?' },
          { ro: "Est-il venu?", ru: 'Он пришёл?', note: 'être → est-il' },
          { ro: "A-t-il mangé?", ru: 'Он поел?', note: '-t- между гласными' },
          { ro: "Va-t-elle venir?", ru: 'Она придёт?', note: 'va + t + elle' },
          { ro: "Marie vient-elle?", ru: 'Мари придёт?', note: 'существительное + местоимение-повтор' },
          { ro: "Où allez-vous?", ru: 'Куда вы идёте?' },
        ] },
      { id: 'questions-words', title: 'Вопросительные слова: qui, que, où, quand, comment, pourquoi, combien', body: 'Вопросительные слова сочетаются со всеми тремя способами вопроса (интонация, est-ce que, инверсия). Qui — о людях (кто?/кого?). Que/quoi — о вещах (что?). Que перед глаголом, quoi — после глагола или изолированно.', examples: [
          { ro: "Qui est là? / Qui est-ce qui est là?", ru: 'Кто там?' },
          { ro: "Que fais-tu? / Qu'est-ce que tu fais?", ru: 'Что ты делаешь?' },
          { ro: "Où habitez-vous?", ru: 'Где вы живёте?' },
          { ro: "Quand pars-tu?", ru: 'Когда ты уезжаешь?' },
          { ro: "Comment tu t'appelles?", ru: 'Как тебя зовут?', note: 'разговорное — без инверсии' },
          { ro: "Pourquoi est-ce qu'il est triste?", ru: 'Почему он грустит?' },
        ] },
      { id: 'questions-quel', title: 'Quel/quelle — «какой»', body: 'Quel согласуется в роде и числе с существительным. Может стоять при существительном (прилагательное) или отдельно (местоимение). В восклицаниях — «какой!».',
        table: { headers: ['', 'М.р.', 'Ж.р.', 'М. мн.ч.', 'Ж. мн.ч.'], rows: [['Форма', 'quel', 'quelle', 'quels', 'quelles']] },
        examples: [
          { ro: "Quel livre lis-tu?", ru: 'Какую книгу ты читаешь?' },
          { ro: "Quelle heure est-il?", ru: 'Который час?' },
          { ro: "Quels films tu aimes?", ru: 'Какие фильмы тебе нравятся?' },
          { ro: "De quelle couleur est ta voiture?", ru: 'Какого цвета твоя машина?' },
          { ro: "Quel beau temps!", ru: 'Какая хорошая погода!', note: 'восклицание' },
          { ro: "Quelle surprise!", ru: 'Какой сюрприз!', note: 'восклицание' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 16. ЧИСЛИТЕЛЬНЫЕ
  // ─────────────────────────────────────────────
  {
    id: 'numerals',
    title: 'Числительные',
    icon: '🔢',
    description: 'Особенности 70, 80, 90; порядковые; даты',
    sections: [
      { id: 'numerals-cardinal', title: 'Количественные — особенности 70/80/90 и согласование', body: 'Французская система счёта сложнее из-за 70–99. 70 = soixante-dix (60+10), 80 = quatre-vingts (4×20), 90 = quatre-vingt-dix (4×20+10). Cent и vingt получают -s только когда не за ними нет числа: deux cents, но deux cent cinq.',
        table: { headers: ['Число', 'Французский', 'Число', 'Французский'], rows: [['70', 'soixante-dix', '71', 'soixante-et-onze'], ['80', 'quatre-vingts', '81', 'quatre-vingt-un'], ['90', 'quatre-vingt-dix', '91', 'quatre-vingt-onze'], ['100', 'cent', '200', 'deux cents'], ['1000', 'mille', '1 000 000', 'un million']] },
        examples: [
          { ro: 'soixante-dix, soixante-quinze', ru: '70, 75', note: '60+10, 60+15' },
          { ro: 'quatre-vingts personnes', ru: '80 человек', note: 'quatre-vingts + существ. → -s' },
          { ro: 'quatre-vingt-cinq', ru: '85', note: 'quatre-vingt (без -s) перед числом' },
          { ro: 'deux cents euros / deux cent cinquante euros', ru: '200 евро / 250 евро', note: 'cent: -s только без следующего числа' },
          { ro: 'mille un (не milles)', ru: '1001', note: 'mille никогда не получает -s' },
          { ro: 'vingt et un / vingt-deux', ru: '21 / 22', note: 'et только с un' },
        ] },
      { id: 'numerals-ordinal', title: 'Порядковые: premier, deuxième…', body: 'Порядковые числительные образуются прибавлением -ième к количественному (conjoined с финальной -e опускается). Исключение: premier/première (1-й), unième используется только в составных (vingt et unième). Согласуются в роде и числе.', examples: [
          { ro: 'le premier / la première étage', ru: 'первый этаж', note: 'нерегулярное — premier' },
          { ro: 'le deuxième, le troisième, le quatrième', ru: 'второй, третий, четвёртый' },
          { ro: 'le vingt et unième siècle', ru: '21-й век', note: 'unième в составных' },
          { ro: 'la cinquième symphonie', ru: 'пятая симфония', note: 'cinq → cinqu + ième' },
          { ro: 'Elle est arrivée deuxième.', ru: 'Она финишировала второй.' },
          { ro: 'le premier ministre', ru: 'премьер-министр', note: 'лексикализованное сочетание' },
        ] },
      { id: 'numerals-dates', title: 'Даты', body: 'Дата: le + порядковое (только для 1-го: le premier) или количественное + месяц (строчная буква) + год. Порядок: день → месяц → год. Год читается целиком: 2024 = deux mille vingt-quatre. «В каком году?» — en + год (без артикля).', examples: [
          { ro: "le premier janvier", ru: '1 января', note: 'первый → premier' },
          { ro: "le deux mars / le quinze août", ru: '2 марта / 15 августа', note: 'остальные дни — количественные' },
          { ro: "Nous sommes le vingt mai.", ru: 'Сегодня двадцатое мая.' },
          { ro: "Il est né en dix-neuf cent quatre-vingt-cinq.", ru: 'Он родился в 1985 году.', note: 'en + год' },
          { ro: "Le lundi vingt-trois avril deux mille vingt-quatre.", ru: 'Понедельник, 23 апреля 2024 года.' },
          { ro: "Quel jour sommes-nous? — On est mardi.", ru: 'Какой сегодня день? — Вторник.' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 17. ПРЕДЛОГИ
  // ─────────────────────────────────────────────
  {
    id: 'prepositions',
    title: 'Предлоги',
    icon: '📍',
    description: 'à, de, en, dans, pour, sur, avec и их управление',
    sections: [
      { id: 'prepositions-a-de', title: 'À и de — самые частые', body: 'À — место назначения/нахождения, время, цель, принадлежность («стакан для воды»). De — происхождение, принадлежность, содержание, материал. Оба предлога входят в обязательное управление многих глаголов: parler de, penser à, rêver de.', examples: [
          { ro: 'Je vais à Paris. / Je suis à Paris.', ru: 'Я еду в Париж. / Я в Париже.', note: 'à = в/на (место)' },
          { ro: 'Il vient de Rome. / Le livre de Marie.', ru: 'Он из Рима. / Книга Мари.', note: 'de = из/принадлежность' },
          { ro: 'un verre à vin / un verre de vin', ru: 'бокал для вина / бокал вина', note: 'à = назначение, de = содержание' },
          { ro: 'Je pense à toi. / Il parle de toi.', ru: 'Я думаю о тебе. / Он говорит о тебе.', note: 'управление глагола: penser à, parler de' },
          { ro: 'à midi, à 8h, à Noël', ru: 'в полдень, в 8 часов, на Рождество', note: 'à = время' },
          { ro: 'une robe de soie', ru: 'шёлковое платье', note: 'de = материал' },
        ] },
      { id: 'prepositions-place', title: 'Место: dans, sur, sous, devant, derrière, entre', body: 'Dans — внутри (часто с артиклем). Sur — на поверхности. Sous — под. Devant — перед. Derrière — за/позади. Entre — между. Chez — у кого-то дома/в заведении. À côté de — рядом. En face de — напротив.', examples: [
          { ro: 'Le chat est sous la table.', ru: 'Кот под столом.' },
          { ro: 'Le livre est sur la table.', ru: 'Книга на столе.' },
          { ro: 'Je suis dans la voiture.', ru: 'Я в машине.' },
          { ro: "L'école est en face de la mairie.", ru: 'Школа напротив мэрии.' },
          { ro: 'Il habite chez ses parents.', ru: 'Он живёт у родителей.', note: 'chez = у кого-то' },
          { ro: 'La boulangerie est à côté de la banque.', ru: 'Булочная рядом с банком.' },
        ] },
      { id: 'prepositions-time', title: 'Время: en, dans, pendant, depuis, pour, il y a', body: 'En — за какое время (на что ушло: en deux heures). Dans — через (будущее: dans deux heures = через два часа). Pendant — в течение. Depuis — с какого момента (действие продолжается). Pour — на какой срок. Il y a — тому назад.', examples: [
          { ro: "Il a fait ça en cinq minutes.", ru: 'Он сделал это за пять минут.', note: 'en = за (потраченное время)' },
          { ro: "Je pars dans une heure.", ru: 'Я уезжаю через час.', note: 'dans = через (будущее)' },
          { ro: "Pendant deux ans, il a vécu à Paris.", ru: 'В течение двух лет он жил в Париже.' },
          { ro: "Elle apprend le français depuis trois ans.", ru: 'Она учит французский уже три года.', note: 'depuis + présent = до сих пор' },
          { ro: "Je suis ici pour une semaine.", ru: 'Я здесь на неделю.', note: 'pour = на какой срок' },
          { ro: "Il est parti il y a deux jours.", ru: 'Он уехал два дня назад.', note: 'il y a = тому назад' },
        ] },
      { id: 'prepositions-countries', title: 'Страны и города: en/au/aux/à', body: 'Города — всегда à (à Paris, à Tokyo). Страны: en + ж.р. или начинающиеся на гласную; au + м.р.; aux + мн. число. Направление (в) и нахождение (в) — одна и та же конструкция. Происхождение — de/du/des/de la.', examples: [
          { ro: "Je vis à Paris. / Je vais à Rome.", ru: 'Я живу в Париже. / Я еду в Рим.', note: 'города → à' },
          { ro: "en France, en Italie, en Chine", ru: 'во Франции, в Италии, в Китае', note: 'ж.р. страны → en' },
          { ro: "au Japon, au Canada, au Maroc", ru: 'в Японии, в Канаде, в Марокко', note: 'м.р. → au' },
          { ro: "aux États-Unis, aux Pays-Bas", ru: 'в США, в Нидерландах', note: 'мн. число → aux' },
          { ro: "Je viens de France / du Japon / des États-Unis.", ru: 'Я из Франции / из Японии / из США.', note: 'de/du/des — происхождение' },
          { ro: "en Iran, en Israël", ru: 'в Иране, в Израиле', note: 'страны на гласную → en (даже м.р.)' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 18. СОЮЗЫ И ПРИДАТОЧНЫЕ
  // ─────────────────────────────────────────────
  {
    id: 'conjunctions',
    title: 'Союзы и придаточные',
    icon: '🔗',
    description: 'Сочинительные, подчинительные, относительные',
    sections: [
      { id: 'conj-coordinating', title: 'Сочинительные: et, mais, ou, donc, car, or, ni', body: 'Семь основных сочинительных союзов: et (и), mais (но), ou (или), donc (следовательно/итак), car (потому что — формальнее parce que), or (а между тем), ni (ни). Запомнить по акрониму MAIS OÙ EST DONC CAR NI OR.', examples: [
          { ro: "J'aime le café et le thé.", ru: 'Я люблю кофе и чай.', note: 'et = и' },
          { ro: "C'est cher, mais bon.", ru: 'Это дорого, но вкусно.', note: 'mais = но' },
          { ro: "Tu veux du thé ou du café?", ru: 'Ты хочешь чай или кофе?', note: 'ou = или' },
          { ro: "Il était fatigué, donc il est parti.", ru: 'Он устал, поэтому ушёл.', note: 'donc = поэтому' },
          { ro: "Je reste, car il pleut.", ru: 'Я остаюсь, потому что идёт дождь.', note: 'car = потому что (книжнее)' },
          { ro: "Il ne mange ni viande ni poisson.", ru: 'Он не ест ни мяса, ни рыбы.', note: 'ni...ni = ни...ни' },
        ] },
      { id: 'conj-subordinating', title: 'Подчинительные: que, parce que, si, quand, bien que…', body: 'Подчинительные союзы вводят придаточные. Главный вопрос после каждого: нужен индикатив или субжонктив? Bien que, pour que, avant que, à moins que, quoique → субжонктив. Parce que, quand, si, lorsque, dès que → индикатив.', examples: [
          { ro: "Je sais qu'il viendra.", ru: 'Я знаю, что он придёт.', note: 'que + индикатив (уверенность)' },
          { ro: "Il est parti parce qu'il était fatigué.", ru: 'Он ушёл, потому что устал.', note: 'parce que + индикатив' },
          { ro: "Bien qu'il soit malade, il travaille.", ru: 'Хотя он болен, он работает.', note: 'bien que + субжонктив' },
          { ro: "Appelle-moi quand tu arrives.", ru: 'Позвони мне, когда приедешь.', note: 'quand + présent для будущего' },
          { ro: "Pour qu'elle réussisse, tu dois l'aider.", ru: 'Чтобы она добилась успеха, ты должен ей помочь.', note: 'pour que + субжонктив' },
          { ro: "À moins qu'il ne vienne, je pars.", ru: 'Если только он не придёт, я ухожу.', note: 'à moins que + subj. (с ne expletif)' },
        ] },
      { id: 'conj-si', title: 'Условные с si — три типа', body: 'Три типа условных предложений с si. Тип 1: реальное условие (si + présent → futur/présent/impératif). Тип 2: нереальное настоящее (si + imparfait → conditionnel présent). Тип 3: нереальное прошлое (si + plus-que-parfait → conditionnel passé).',
        table: { headers: ['Тип', 'Si-clause', 'Главное предложение'], rows: [['Реальное', 'présent', 'futur / présent / impératif'], ['Нереальное наст.', 'imparfait', 'conditionnel présent'], ['Нереальное прош.', 'plus-que-parfait', 'conditionnel passé']] },
        examples: [
          { ro: "Si tu travailles, tu réussiras.", ru: 'Если будешь работать, добьёшься успеха.', note: 'тип 1: présent → futur' },
          { ro: "Si j'avais le temps, j'irais au cinéma.", ru: 'Если бы у меня было время, я бы пошёл в кино.', note: 'тип 2: imparfait → conditionnel' },
          { ro: "Si j'avais su, je n'aurais pas accepté.", ru: 'Если бы я знал, я бы не согласился.', note: 'тип 3: PQP → conditionnel passé' },
          { ro: "Si tu as faim, mange quelque chose.", ru: 'Если ты голоден, поешь что-нибудь.', note: 'тип 1 с impératif' },
          { ro: "Si elle était là, elle comprendrait.", ru: 'Если бы она была здесь, она бы поняла.', note: 'тип 2' },
          { ro: "Si tu m'avais appelé, je t'aurais aidé.", ru: 'Если бы ты мне позвонил, я бы помог.', note: 'тип 3' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 19. СПЕЦИФИКА: LIAISON И ÉLISION
  // ─────────────────────────────────────────────
  {
    id: 'liaison-elision',
    title: 'Liaison и élision',
    icon: '🔊',
    description: 'Обязательные и запрещённые связывания, выпадение гласной',
    sections: [
      { id: 'elision', title: 'Élision — выпадение гласной (l\', j\', qu\'…)', body: 'Элизия — обязательная замена конечной гласной апострофом перед словом, начинающимся с гласной или немого h. Список слов с элизией: le, la, je, me, te, se, de, ne, que, ce, si (только si + il/ils → s\'il). Придыхательные h (h aspiré) блокируют элизию.', examples: [
          { ro: "l'ami, l'eau, l'heure", ru: 'друг, вода, час', note: 'le/la → l\'' },
          { ro: "j'ai, j'aime, j'arrive", ru: 'у меня, я люблю, я прихожу', note: 'je → j\'' },
          { ro: "qu'il, qu'elle, qu'on", ru: 'что он, что она, что', note: 'que → qu\'' },
          { ro: "s'il vous plaît, s'il fait beau", ru: 'пожалуйста, если погода хорошая', note: 'si + il → s\'il' },
          { ro: "le hibou (не l'hibou), le hamster", ru: 'сова, хомяк', note: 'h aspiré — нет элизии' },
          { ro: "c'est, c'était, n'est-ce pas", ru: 'это, это было, не так ли', note: 'ce → c\', ne → n\'' },
        ] },
      { id: 'liaison-mandatory', title: 'Обязательный liaison', body: 'Liaison — произношение финального согласного слова (обычно немого) перед следующим словом, начинающимся с гласной. Финальный s/x произносится как [z], d → [t]. Обязателен: артикль+сущ., прилаг.+сущ., местоим.+глагол, наречие+прилаг., после est-ce que.', examples: [
          { ro: "les amis [lez ami]", ru: 'друзья', note: 'артикль + существительное' },
          { ro: "un homme [œ̃n‿ɔm]", ru: 'мужчина', note: 'un + сущ. на гласную' },
          { ro: "ils ont [ilz‿ɔ̃]", ru: 'они имеют', note: 'местоимение + глагол' },
          { ro: "très intéressant [tʁez‿ɛ̃tεʁεsɑ̃]", ru: 'очень интересный', note: 'наречие + прилагательное' },
          { ro: "grand arbre [gʁɑ̃t‿aʁbʁ]", ru: 'большое дерево', note: 'прилаг. до сущ.; d → [t]' },
          { ro: "en avril [ɑ̃n‿avʁil]", ru: 'в апреле', note: 'предлог + гласная' },
        ] },
      { id: 'liaison-forbidden', title: 'Запрещённый liaison', body: 'Liaison запрещён в нескольких позициях: (1) после собственных имён; (2) после et; (3) перед придыхательным h; (4) после вопросительных слов (quand, comment); (5) перед нумерами (onze, huit). Ошибочный liaison — признак гиперкоррекции.', examples: [
          { ro: "et // amis (нет liaison после et)", ru: 'и друзья — после et liaison нет', note: 'et = исключение' },
          { ro: "le hibou [lə ibu] (не [lez ibu])", ru: 'сова — h aspiré блокирует', note: 'h aspiré' },
          { ro: "les / huit livres (нет перед huit)", ru: 'восемь книг', note: 'huit — h aspiré' },
          { ro: "les / onze étudiants (нет перед onze)", ru: 'одиннадцать студентов', note: 'onze — блокирует liaison' },
          { ro: "Paris // est... (нет после имени)", ru: 'Париж — собственное имя', note: 'имя собственное' },
          { ro: "comment // allez-vous (нет после question word)", ru: 'как вы поживаете', note: 'после вопросит. слова' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 20. СПЕЦИФИКА: МЕСТОИМЕНИЕ ON
  // ─────────────────────────────────────────────
  {
    id: 'pronoun-on',
    title: 'Местоимение on',
    icon: '🫂',
    description: 'On = «люди вообще», «мы» в разговорной речи',
    sections: [
      { id: 'on-impersonal', title: 'On как безличное «люди/один»', body: 'On как безличное местоимение обозначает «люди вообще», «кто-то», «один». Используется, когда деятель неизвестен или несущественен. Глагол — форма 3-го л. ед.ч. (как il). В русском часто соответствует безличным оборотам или страдательному залогу.', examples: [
          { ro: "On mange bien en France.", ru: 'Во Франции хорошо едят.' },
          { ro: "On dit que c'est difficile.", ru: 'Говорят, что это трудно.', note: 'on = люди говорят' },
          { ro: "On a volé ma voiture!", ru: 'Кто-то украл мою машину!', note: 'on = кто-то (неизвестный)' },
          { ro: "Comment dit-on «hello» en français?", ru: 'Как по-французски говорят «привет»?' },
          { ro: "On parle français ici.", ru: 'Здесь говорят по-французски.' },
          { ro: "On est prié de ne pas fumer.", ru: 'Просьба не курить.', note: 'официальное пассивное значение' },
        ] },
      { id: 'on-nous', title: 'On вместо nous в разговорной речи', body: 'В разговорной французской речи on вместо nous крайне распространено — это не ошибка, а норма. Глагол по-прежнему в форме 3-го л. ед.ч. Прилагательные и причастия при on в значении nous согласуются во мн. числе.', examples: [
          { ro: "On part demain. (= Nous partons demain.)", ru: 'Мы уезжаем завтра.' },
          { ro: "On est allés au cinéma hier.", ru: 'Мы вчера ходили в кино.', note: 'allés — мн.ч., хотя on' },
          { ro: "— Qu'est-ce qu'on fait ce soir? — On va au resto.", ru: '— Что мы делаем сегодня вечером? — Идём в ресторан.' },
          { ro: "On s'est bien amusés.", ru: 'Мы хорошо повеселились.', note: 'возвратный с être; amusés = мн.ч.' },
          { ro: "On est contents!", ru: 'Мы довольны!', note: 'прилагательное — мн.ч.' },
          { ro: "On a rendez-vous à midi.", ru: 'У нас встреча в полдень.' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 21. СПЕЦИФИКА: FAIRE + INFINITIF
  // ─────────────────────────────────────────────
  {
    id: 'faire-causative',
    title: 'Faire + infinitif',
    icon: '➡️',
    description: 'Каузативная конструкция — «заставить/дать сделать»',
    sections: [
      { id: 'faire-causative-form', title: 'Образование и смысл', body: 'Faire + инфинитив — каузативная конструкция: субъект не выполняет действие сам, а заставляет/даёт кому-то другому. «Лицо-исполнитель» вводится через à (кому приказывают) или par (кем выполняется при прямом объекте). Инфинитив следует сразу за faire без разделения.', examples: [
          { ro: "Je fais réparer ma voiture.", ru: 'Я ремонтирую машину (чужими руками).', note: 'без указания исполнителя' },
          { ro: "Elle fait manger les enfants.", ru: 'Она кормит детей.', note: 'дословно: заставляет детей есть' },
          { ro: "Je fais laver la voiture par le mécanicien.", ru: 'Я заставляю механика помыть машину.', note: 'par = исполнитель' },
          { ro: "Il m'a fait rire.", ru: 'Он заставил меня смеяться.' },
          { ro: "Elle fait construire une maison.", ru: 'Она строит дом (через подрядчика).' },
          { ro: "Le professeur fait répéter les élèves.", ru: 'Учитель заставляет учеников повторять.' },
        ] },
      { id: 'faire-causative-pronouns', title: 'Местоимения при faire + infinitif', body: 'Объектные местоимения при faire + inf. стоят ПЕРЕД faire (не перед инфинитивом). Это отличает каузативную конструкцию от обычного глагола с инфинитивом. Согласование причастия с faire в passé composé — нет (faire invariable в каузативе).', examples: [
          { ro: "Je le fais réparer. (не: Je fais le réparer)", ru: 'Я отдаю это в ремонт.', note: 'le перед faire' },
          { ro: "Il me fait rire.", ru: 'Он смешит меня / заставляет смеяться.' },
          { ro: "Elle les a fait partir.", ru: 'Она заставила их уйти.', note: 'fait без согласования в PC' },
          { ro: "Je vous fais savoir que…", ru: 'Довожу до вашего сведения, что…', note: 'faire savoir = уведомить' },
          { ro: "Il se fait couper les cheveux.", ru: 'Он стрижётся (позволяет себя постричь).' },
          { ro: "Ne me faites pas attendre!", ru: 'Не заставляйте меня ждать!' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 22. КОНСТРУКЦИЯ «НРАВИТСЯ»
  // ─────────────────────────────────────────────
  {
    id: 'like',
    title: 'Конструкция «нравится»',
    icon: '❤️',
    description: 'Plaire vs aimer — структурная разница',
    sections: [
      { id: 'like-aimer', title: 'Aimer — любить, нравиться', body: 'Aimer — прямой глагол: субъект любит объект. Структура как в русском: je + aimer + что/кого. С людьми: aimer = любить (романтически или по-семейному). Aimer bien = нравиться (слабее). Aimer + инфинитив = любить делать что-то.', examples: [
          { ro: "J'aime le chocolat.", ru: 'Я люблю шоколад.' },
          { ro: "Elle aime bien son collègue.", ru: 'Ей нравится её коллега.', note: 'aimer bien = нравиться (не любовь)' },
          { ro: "Tu aimes danser?", ru: 'Ты любишь танцевать?', note: 'aimer + инфинитив' },
          { ro: "J'aime qu'il soit là.", ru: 'Мне нравится, что он здесь.', note: 'aimer que + субжонктив' },
          { ro: "Je n'aime pas le bruit.", ru: 'Мне не нравится шум.' },
          { ro: "Nous aimons nous promener le soir.", ru: 'Нам нравится гулять вечером.' },
        ] },
      { id: 'like-plaire', title: 'Plaire — нравиться (как в румынском/итальянском)', body: 'Plaire работает инвертированно: подлежащее — то, что нравится; косвенное дополнение — кому нравится. Аналог испанского gustar, итальянского piacere. Participé passé — plu. Ça me plaît = это мне нравится.', examples: [
          { ro: "Ce film me plaît.", ru: 'Этот фильм мне нравится.', note: 'ce film = подлежащее; me = кому' },
          { ro: "Ça te plaît ici?", ru: 'Тебе нравится здесь?', note: 'ça = нейтральное подлежащее' },
          { ro: "Ces chaussures lui plaisent.", ru: 'Ей/ему нравятся эти туфли.', note: 'мн.ч. → plaisent' },
          { ro: "Ça m'a beaucoup plu.", ru: 'Мне это очень понравилось.', note: 'plu = неизменяемое причастие' },
          { ro: "S'il vous plaît.", ru: 'Пожалуйста.', note: 'дословно: если вам угодно' },
          { ro: "Tu lui plais!", ru: 'Ты ему/ей нравишься!', note: 'ты = подлежащее; lui = кому' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 23. PASSÉ RÉCENT / VENIR DE
  // ─────────────────────────────────────────────
  {
    id: 'venir-de',
    title: 'Passé récent: venir de',
    icon: '🔄',
    description: 'Только что сделал — venir de + infinitif',
    sections: [
      { id: 'venir-de-formation', title: 'Образование и употребление', body: 'Venir de + инфинитив = «только что сделал». Venir спрягается в présent — значение «только что» (passé récent). Venir де + inf. в imparfait = «только что сделал» в прошлом (действие непосредственно предшествует другому прошедшему).', examples: [
          { ro: "Je viens de manger.", ru: 'Я только что поел.' },
          { ro: "Elle vient d'appeler.", ru: 'Она только что позвонила.' },
          { ro: "Il vient d'arriver.", ru: 'Он только что приехал.' },
          { ro: "Nous venions de partir quand il a appelé.", ru: 'Мы только что ушли, когда он позвонил.', note: 'imparfait = только что в прошлом' },
          { ro: "Le film vient de commencer.", ru: 'Фильм только что начался.' },
          { ro: "Tu viens d'avoir vingt ans!", ru: 'Тебе только что исполнилось двадцать!' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 24. ДНИ, МЕСЯЦЫ, ВРЕМЯ СУТОК
  // ─────────────────────────────────────────────
  {
    id: 'time-calendar',
    title: 'Дни, месяцы, время суток',
    icon: '📅',
    description: 'Названия, предлоги en/à/au, выражения времени',
    sections: [
      { id: 'days', title: 'Дни недели', body: 'Дни недели во французском строчные (не заглавные). «В понедельник» = le lundi (конкретный раз) или le lundi (каждый понедельник — зависит от контекста). Без артикля = сегодняшний день: C\'est lundi. Неделя начинается с понедельника.',
        table: { headers: ['День', 'Французский', 'День', 'Французский'], rows: [['Понедельник', 'lundi', 'Пятница', 'vendredi'], ['Вторник', 'mardi', 'Суббота', 'samedi'], ['Среда', 'mercredi', 'Воскресенье', 'dimanche'], ['Четверг', 'jeudi', '', '']] },
        examples: [
          { ro: "Nous sommes lundi.", ru: 'Сегодня понедельник.' },
          { ro: "Le rendez-vous est jeudi.", ru: 'Встреча в четверг.' },
          { ro: "Il vient le vendredi.", ru: 'Он приходит по пятницам.', note: 'le vendredi = каждую пятницу' },
          { ro: "Le week-end, je me repose.", ru: 'В выходные я отдыхаю.' },
          { ro: "À lundi! / À demain!", ru: 'До понедельника! / До завтра!' },
          { ro: "Avant-hier, hier, aujourd'hui, demain, après-demain.", ru: 'Позавчера, вчера, сегодня, завтра, послезавтра.' },
        ] },
      { id: 'months', title: 'Месяцы', body: 'Месяцы во французском — строчные. «В январе» = en janvier (без артикля). «В этом месяце» = ce mois-ci. «Прошлый месяц» = le mois dernier. Времена года: en été, en automne, en hiver, au printemps (au — только printemps).',
        table: { headers: ['Месяц', 'Французский', 'Месяц', 'Французский'], rows: [['Январь', 'janvier', 'Июль', 'juillet'], ['Февраль', 'février', 'Август', 'août'], ['Март', 'mars', 'Сентябрь', 'septembre'], ['Апрель', 'avril', 'Октябрь', 'octobre'], ['Май', 'mai', 'Ноябрь', 'novembre'], ['Июнь', 'juin', 'Декабрь', 'décembre']] },
        examples: [
          { ro: "en janvier, en mars, en décembre", ru: 'в январе, в марте, в декабре', note: 'en + месяц' },
          { ro: "au printemps, en été, en automne, en hiver", ru: 'весной, летом, осенью, зимой', note: 'au printemps — особый случай' },
          { ro: "le mois prochain, le mois dernier", ru: 'в следующем месяце, в прошлом месяце' },
          { ro: "Il est né en août 1990.", ru: 'Он родился в августе 1990 года.' },
          { ro: "Nous sommes en février.", ru: 'Сейчас февраль.' },
          { ro: "Le festival a lieu au mois de juillet.", ru: 'Фестиваль проходит в июле.', note: 'au mois de + месяц — более полная форма' },
        ] },
      { id: 'time-parts', title: 'Части суток и выражения', body: 'Части суток с артиклем и предлогом le: le matin, l\'après-midi, le soir, la nuit. «В это утро» = ce matin. «Доброе утро» = bonjour (до обеда), bonsoir (вечером). Adieu — окончательное прощание; au revoir — «до свидания».', examples: [
          { ro: "le matin / l'après-midi / le soir / la nuit", ru: 'утром / днём/после обеда / вечером / ночью' },
          { ro: "Bonjour! / Bonsoir! / Bonne nuit!", ru: 'Доброе утро/день! / Добрый вечер! / Спокойной ночи!' },
          { ro: "Ce matin, il a plu.", ru: 'Сегодня утром шёл дождь.' },
          { ro: "Il travaille le soir.", ru: 'Он работает по вечерам.', note: 'le soir = каждый вечер' },
          { ro: "À cette heure-ci, le metro est fermé.", ru: 'В это время метро закрыто.' },
          { ro: "Tôt le matin / tard le soir", ru: 'Рано утром / поздно вечером' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 25. КОТОРЫЙ ЧАС
  // ─────────────────────────────────────────────
  {
    id: 'time-clock',
    title: 'Который час',
    icon: '🕐',
    description: 'Официальный 24-часовой и разговорный варианты',
    sections: [
      { id: 'time-ask', title: 'Quelle heure est-il?', body: 'Вопрос о времени: Quelle heure est-il? (формально) или Il est quelle heure? / T\'as l\'heure? (разговорно). Ответ: Il est + время. Часы — always с l\'heure/les heures. Полдень — midi, полночь — minuit.', examples: [
          { ro: "Quelle heure est-il? — Il est trois heures.", ru: 'Который час? — Три часа.' },
          { ro: "Il est midi. / Il est minuit.", ru: 'Полдень. / Полночь.' },
          { ro: "Il est une heure et demie.", ru: 'Половина второго (1:30).', note: 'demie = половина' },
          { ro: "Il est neuf heures moins le quart.", ru: 'Без четверти девять (8:45).' },
          { ro: "À quelle heure commence le film?", ru: 'Во сколько начинается фильм?' },
          { ro: "T'as l'heure? — Il est à peu près cinq heures.", ru: 'Знаешь который час? — Около пяти.' },
        ] },
      { id: 'time-official', title: 'Официальное время (24 ч.)', body: 'В расписаниях, объявлениях, официальной речи используется 24-часовой формат. Минуты просто добавляются: quatorze heures trente = 14h30. Нет «et quart», «et demie», «moins» — только числа.', examples: [
          { ro: "Le train part à quatorze heures trente.", ru: 'Поезд отправляется в 14:30.', note: 'официальный формат' },
          { ro: "Le musée ouvre à dix heures zéro zéro.", ru: 'Музей открывается в 10:00.' },
          { ro: "À vingt et une heures quinze.", ru: 'В 21:15.' },
          { ro: "Le vol est à six heures cinquante.", ru: 'Рейс в 6:50.' },
          { ro: "Ouvert de neuf à dix-huit heures.", ru: 'Открыто с 9 до 18 часов.' },
          { ro: "À minuit pile. / À midi pile.", ru: 'Ровно в полночь. / Ровно в полдень.', note: 'pile = ровно' },
        ] },
      { id: 'time-colloquial', title: 'Разговорное — et quart, et demie, moins le quart', body: 'В разговорной речи используют: et quart (четверть), et demie (половина), moins le quart (без четверти). До 30 минут — прибавляют к часу (et...), после 30 минут — вычитают от следующего часа (moins...).', examples: [
          { ro: "Il est deux heures et quart.", ru: 'Четверть третьего (2:15).' },
          { ro: "Il est cinq heures et demie.", ru: 'Половина шестого (5:30).' },
          { ro: "Il est huit heures moins le quart.", ru: 'Без четверти восемь (7:45).' },
          { ro: "Il est trois heures vingt.", ru: 'Двадцать минут четвёртого (3:20).' },
          { ro: "Il est dix heures moins cinq.", ru: 'Без пяти десять (9:55).' },
          { ro: "Vers sept heures du soir.", ru: 'Около семи вечера.', note: 'vers = примерно' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 26. ТЕЛО ЧЕЛОВЕКА
  // ─────────────────────────────────────────────
  {
    id: 'body',
    title: 'Тело человека',
    icon: '🫀',
    description: 'Части тела, артикль вместо притяжательного',
    sections: [
      { id: 'body-parts', title: 'Основные части тела', body: 'Части тела во французском, как правило, используются с определённым артиклем, а не с притяжательным. При глаголах восприятия и боли: avoir mal à + артикль + часть тела (не «моя голова болит», а «у меня болит голова»).', examples: [
          { ro: "J'ai mal à la tête / au dos / aux pieds.", ru: 'У меня болит голова / спина / ноги.', note: 'avoir mal à' },
          { ro: "Il se lave les mains.", ru: 'Он моёт руки.', note: 'артикль, не притяжательное' },
          { ro: "la tête, le cou, l'épaule, le bras, la main", ru: 'голова, шея, плечо, рука, кисть' },
          { ro: "la poitrine, le ventre, le dos, la jambe, le pied", ru: 'грудь, живот, спина, нога, стопа' },
          { ro: "le cœur, le poumon, l'estomac", ru: 'сердце, лёгкое, желудок' },
          { ro: "Il a levé la main.", ru: 'Он поднял руку.', note: 'определённый артикль, не sa main' },
        ] },
      { id: 'body-article', title: 'Определённый артикль вместо притяжательного', body: 'В конструкциях с частями тела французский использует определённый артикль вместо притяжательного прилагательного, когда владелец ясен из контекста. Особенно — при возвратных глаголах и глаголах восприятия. Притяжательное допустимо для выделения или уточнения.', examples: [
          { ro: "Il a les yeux bleus. (не ses yeux)", ru: 'У него голубые глаза.', note: 'определённый артикль при описании' },
          { ro: "Elle se brosse les dents. (не ses dents)", ru: 'Она чистит зубы.', note: 'возвратный глагол' },
          { ro: "Il a levé la main. / Elle a hoché la tête.", ru: 'Он поднял руку. / Она кивнула головой.' },
          { ro: "J'ai mal à la gorge.", ru: 'У меня болит горло.', note: 'avoir mal à + арт.' },
          { ro: "Elle m'a touché l'épaule.", ru: 'Она дотронулась до моего плеча.', note: 'косвенный объект уточняет владельца' },
          { ro: "Il a cassé le bras. / Il a cassé son bras.", ru: 'Он сломал руку (свою). / Он сломал свою руку (с акцентом).', note: 'оба варианта возможны' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 27. РАЗГОВОРНЫЕ МЕХАНИКИ
  // ─────────────────────────────────────────────
  {
    id: 'conversation-mechanics',
    title: 'Разговорные механики',
    icon: '🗣️',
    description: 'Заполнители пауз, согласие, переспрос',
    sections: [
      { id: 'conv-fillers', title: 'Заполнители: ben, euh, donc, bon, voilà…', body: 'Французская разговорная речь насыщена дискурсивными маркерами. Ben (= bien произносится «бэ») — раздумье, неуверенность. Euh — пауза при подборе слова. Bon — переход или принятие. Quoi в конце — усиление или неформальная «точка». Voilà — завершение мысли.', examples: [
          { ro: "Ben… je sais pas.", ru: 'Ну… не знаю.', note: 'ben = раздумье' },
          { ro: "Euh, je voulais dire que…", ru: 'Э-э, я хотел сказать, что…', note: 'euh = пауза' },
          { ro: "Bon, allons-y!", ru: 'Ну ладно, пойдём!', note: 'bon = решение/переход' },
          { ro: "C'est bizarre, quoi.", ru: 'Это странно, ну.', note: 'quoi в конце — усиление' },
          { ro: "Voilà, c'est tout.", ru: 'Вот и всё.', note: 'voilà = завершение' },
          { ro: "Donc, comme je disais…", ru: 'Итак, как я говорил…', note: 'donc = возврат к теме' },
        ] },
      { id: 'conv-agree', title: 'Согласие и несогласие', body: 'Согласие: oui (да), bien sûr (конечно), tout à fait (совершенно верно), absolument, d\'accord (согласен/ладно). Несогласие: non, pas du tout (совсем нет), je ne suis pas d\'accord, au contraire (наоборот). Si — особое «да» в ответ на отрицательный вопрос.', examples: [
          { ro: "Tout à fait, je suis d'accord avec vous.", ru: 'Совершенно верно, я с вами согласен.' },
          { ro: "Pas du tout! C'est faux.", ru: 'Совсем нет! Это неверно.' },
          { ro: "— Tu n'aimes pas le café? — Si, j'adore ça!", ru: '— Ты не любишь кофе? — Нет-нет, обожаю!', note: 'si = да в ответ на отрицательный вопрос' },
          { ro: "Au contraire, je pense que…", ru: 'Напротив, я думаю, что…' },
          { ro: "C'est vrai / C'est faux / C'est possible.", ru: 'Это правда / неправда / возможно.' },
          { ro: "Je ne suis pas convaincu(e).", ru: 'Я не убеждён(а).' },
        ] },
      { id: 'conv-clarify', title: 'Переспрос и уточнение', body: 'Просьба повторить или уточнить — важная часть разговорной компетенции. Парdon? — переспрос (нейтрально). Comment? — разговорное «что?». Qu\'est-ce que vous voulez dire? — что вы имеете в виду. Vous pouvez répéter/parler plus lentement? — для изучающих язык.', examples: [
          { ro: "Pardon? Je n'ai pas compris.", ru: 'Простите? Я не понял.' },
          { ro: "Vous pouvez répéter, s'il vous plaît?", ru: 'Не могли бы вы повторить, пожалуйста?' },
          { ro: "Parlez plus lentement, s'il vous plaît.", ru: 'Говорите, пожалуйста, помедленнее.' },
          { ro: "Qu'est-ce que vous voulez dire par là?", ru: 'Что вы имеете в виду?' },
          { ro: "C'est-à-dire… / Autrement dit…", ru: 'То есть… / Иными словами…', note: 'уточнение своих слов' },
          { ro: "Comment dit-on… en français?", ru: 'Как по-французски…?' },
        ] },
      { id: 'conv-reactions', title: 'Устойчивые реакции', body: 'Фразы-реакции — готовые блоки для ответа на новость, удивление, поздравление. Их не строят по правилам — запоминают целиком. C\'est dommage! — жаль; C\'est génial! — отлично; N\'importe quoi! — ерунда/что попало.', examples: [
          { ro: "— J'ai raté l'examen. — C'est dommage! / Quel dommage!", ru: '— Я провалил экзамен. — Жаль! / Как жаль!' },
          { ro: "— J'ai eu le poste! — C'est génial! / Super!", ru: '— Я получил должность! — Отлично! / Супер!' },
          { ro: "N'importe quoi!", ru: 'Ерунда! Что за бред!', note: 'сильное несогласие/раздражение' },
          { ro: "Tant mieux! / Tant pis!", ru: 'Тем лучше! / Тем хуже! (ничего не поделаешь)', note: 'ключевая пара' },
          { ro: "— Je suis désolé. — Ce n'est pas grave / C'est pas grave.", ru: '— Мне жаль. — Ничего страшного.' },
          { ro: "Félicitations! / Bravo! / Chapeau!", ru: 'Поздравляю! / Браво! / Шляпу сниму (молодец)!', note: 'chapeau — разговорное восхищение' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 28. СИТУАТИВНЫЕ ДИАЛОГИ
  // ─────────────────────────────────────────────
  {
    id: 'dialogues',
    title: 'Ситуативные диалоги',
    icon: '💬',
    description: 'Знакомство, кафе, транспорт, магазин, врач, телефон',
    sections: [
      { id: 'dialogues-greetings', title: 'Знакомство и приветствия', body: 'Bonjour — нейтральное приветствие (весь день). Bonsoir — с наступлением вечера. Salut — неформальное. Enchanté(e) — при знакомстве. Vous/tu — важный выбор: vous с незнакомыми/старшими, tu с друзьями и детьми. Переход на tu называется tutoyer.', examples: [
          { ro: "— Bonjour, je m'appelle Marie. — Enchanté(e)!", ru: '— Добрый день, меня зовут Мари. — Приятно познакомиться!' },
          { ro: "— Comment vous appelez-vous? — Je m'appelle Jean.", ru: '— Как вас зовут? — Меня зовут Жан.' },
          { ro: "— Comment allez-vous? — Très bien, merci, et vous?", ru: '— Как вы? — Очень хорошо, спасибо, а вы?' },
          { ro: "— Tu habites où? — J'habite à Lyon.", ru: '— Где ты живёшь? — Я живу в Лионе.' },
          { ro: "Au revoir! / À bientôt! / À tout à l'heure!", ru: 'До свидания! / До скорого! / До встречи!' },
          { ro: "Enchanté de faire votre connaissance.", ru: 'Рад познакомиться с вами.', note: 'формально' },
        ] },
      { id: 'dialogues-cafe', title: 'В кафе и ресторане', body: 'Заказ: Je voudrais... (я бы хотел) или Je vais prendre... (я возьму). Официанта зовут: Excusez-moi! или Monsieur/Mademoiselle. Счёт: L\'addition, s\'il vous plaît. Чаевые не обязательны — сервис включён (service compris).', examples: [
          { ro: "— Que désirez-vous? — Je voudrais un café et un croissant.", ru: '— Что желаете? — Я бы хотел кофе и круассан.' },
          { ro: "Une table pour deux, s'il vous plaît.", ru: 'Столик на двоих, пожалуйста.' },
          { ro: "— C'est libre? — Oui, je vous en prie.", ru: '— Свободно? — Да, пожалуйста.' },
          { ro: "La carte / le menu, s'il vous plaît.", ru: 'Меню, пожалуйста.', note: 'carte = à la carte; menu = menu du jour' },
          { ro: "L'addition, s'il vous plaît.", ru: 'Счёт, пожалуйста.' },
          { ro: "Est-ce que le service est compris?", ru: 'Обслуживание включено?' },
        ] },
      { id: 'dialogues-directions', title: 'Дорога и транспорт', body: 'Спрашивают: Excusez-moi, où se trouve...? / Comment aller à...? Объясняют через: tout droit (прямо), tourner à gauche/droite, prendre (la rue, le bus). Метро — le métro, автобус — le bus, поезд — le train, билет — le billet (компостировать — composter).', examples: [
          { ro: "Excusez-moi, où se trouve la gare?", ru: 'Извините, где находится вокзал?' },
          { ro: "Allez tout droit, puis tournez à gauche.", ru: 'Идите прямо, потом поверните налево.', note: 'allez = vous imperativ' },
          { ro: "C'est loin? — Non, à cinq minutes à pied.", ru: 'Это далеко? — Нет, в пяти минутах пешком.' },
          { ro: "Prenez la ligne 4 direction Montrouge.", ru: 'Садитесь на линию 4 в направлении Монруж.', note: 'метро в Париже' },
          { ro: "Un billet aller-retour pour Lyon, s'il vous plaît.", ru: 'Один билет туда-обратно до Лиона, пожалуйста.' },
          { ro: "À quelle heure part le prochain train?", ru: 'Во сколько отходит следующий поезд?' },
        ] },
      { id: 'dialogues-shopping', title: 'В магазине', body: 'Продавец: Vous désirez? / Je peux vous aider? Покупатель может ответить: Je regarde, merci (просто смотрю). Размер одежды — la taille, обуви — la pointure. Примерочная — la cabine d\'essayage. Скидка — la réduction, распродажа — les soldes.', examples: [
          { ro: "— Je peux vous aider? — Je regarde, merci.", ru: '— Могу помочь? — Просто смотрю, спасибо.' },
          { ro: "Vous avez ça en taille M?", ru: 'У вас есть это в размере M?' },
          { ro: "Est-ce que je peux l'essayer? Où est la cabine?", ru: 'Можно примерить? Где примерочная?' },
          { ro: "Ça coûte combien? / C'est combien?", ru: 'Сколько стоит?' },
          { ro: "Vous faites des réductions? Il y a des soldes?", ru: 'Вы делаете скидки? Идёт распродажа?' },
          { ro: "Je le prends. Vous acceptez la carte bancaire?", ru: 'Беру. Вы принимаете банковскую карту?' },
        ] },
      { id: 'dialogues-health', title: 'У врача и о здоровье', body: 'Боль: j\'ai mal à + артикль + часть тела. Симптомы: avoir de la fièvre (температура), tousser (кашлять), avoir le nez qui coule (насморк). Врач — le médecin, рецепт — l\'ordonnance, аптека — la pharmacie, скорая — le SAMU (15).', examples: [
          { ro: "J'ai mal à la tête et de la fièvre.", ru: 'У меня болит голова и температура.' },
          { ro: "J'ai mal à la gorge depuis trois jours.", ru: 'У меня болит горло уже три дня.' },
          { ro: "Je tousse et j'ai le nez qui coule.", ru: 'Я кашляю и у меня насморк.' },
          { ro: "— Est-ce que j'ai besoin d'une ordonnance? — Oui, je vais vous prescrire quelque chose.", ru: '— Нужен рецепт? — Да, я вам что-нибудь выпишу.' },
          { ro: "Je suis allergique à la pénicilline.", ru: 'У меня аллергия на пенициллин.' },
          { ro: "Je me sens très fatigué(e) et j'ai des vertiges.", ru: 'Я чувствую себя очень усталым/ой, кружится голова.' },
        ] },
      { id: 'dialogues-phone', title: 'По телефону', body: 'Французский телефонный этикет: Allô? (алло) — при ответе. Представляются: c\'est + имя (не «je suis»). Попросить к телефону: puis-je parler à...? / est-ce que ... est là? Попросить перезвонить: pouvez-vous rappeler? Оставить сообщение: laisser un message.', examples: [
          { ro: "— Allô? — Bonjour, c'est Marie, est-ce que Jean est là?", ru: '— Алло? — Добрый день, это Мари, Жан дома?' },
          { ro: "— Je suis désolé, il n'est pas là. — Peut-il rappeler?", ru: '— Извините, его нет. — Он может перезвонить?' },
          { ro: "Voulez-vous laisser un message?", ru: 'Хотите оставить сообщение?' },
          { ro: "Pouvez-vous parler plus lentement, s'il vous plaît?", ru: 'Не могли бы вы говорить помедленнее?' },
          { ro: "La ligne est mauvaise, je vous entends mal.", ru: 'Плохая связь, я вас плохо слышу.' },
          { ro: "Je vous passe M. Dupont.", ru: 'Соединяю вас с господином Дюпоном.' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 29. УСТОЙЧИВЫЕ ВЫРАЖЕНИЯ И ФРАЗЕОЛОГИЯ
  // ─────────────────────────────────────────────
  {
    id: 'phraseology',
    title: 'Устойчивые выражения',
    icon: '🧩',
    description: 'Идиомы, дискурсивные связки, повседневные фразы',
    sections: [
      { id: 'phrase-verbs', title: 'Глагольные устойчивые сочетания', body: 'Французские идиомы строятся на avoir, faire, mettre, prendre, donner. Avoir + существительное часто передаёт ощущения и состояния. Prendre + существительное заменяет самостоятельный глагол: prendre une décision = décider.', examples: [
          { ro: "avoir envie de + inf.", ru: 'хотеть, иметь желание сделать что-то' },
          { ro: "s'en aller / s'en faire", ru: 'уходить / беспокоиться', note: "s'en faire = волноваться" },
          { ro: "prendre une décision / prendre le temps", ru: 'принять решение / взять время' },
          { ro: "se rendre compte de", ru: 'осознавать, отдавать себе отчёт' },
          { ro: "faire semblant de + inf.", ru: 'делать вид, притворяться' },
          { ro: "mettre du temps à / en mettre un coup", ru: 'тратить время на / постараться', note: 'en mettre un coup = поднажать' },
        ] },
      { id: 'phrase-connectors', title: 'Дискурсивные связки', body: 'Связки организуют речь: добавление (de plus, en outre, par ailleurs), противопоставление (cependant, néanmoins, pourtant), следствие (donc, ainsi, par conséquent), уточнение (c\'est-à-dire, autrement dit), итог (en conclusion, bref, en somme).', examples: [
          { ro: "C'est cher; cependant, ça vaut la peine.", ru: 'Это дорого; однако оно того стоит.', note: 'cependant = противопоставление' },
          { ro: "Il n'était pas prêt, donc il a raté l'examen.", ru: 'Он не был готов, поэтому провалил экзамен.', note: 'donc = следствие' },
          { ro: "C'est compliqué, c'est-à-dire difficile à expliquer.", ru: 'Это сложно, то есть трудно объяснить.', note: "c'est-à-dire = уточнение" },
          { ro: "De plus, il faut considérer le contexte.", ru: 'Кроме того, нужно учесть контекст.', note: 'de plus = добавление' },
          { ro: "Bref, je ne sais pas quoi faire.", ru: 'Короче говоря, не знаю, что делать.', note: 'bref = итог' },
          { ro: "Il a travaillé dur; par conséquent, il a réussi.", ru: 'Он работал много; следовательно, добился успеха.' },
        ] },
      { id: 'phrase-everyday', title: 'Повседневные фразы-реакции', body: 'Готовые блоки для реакций в разговоре. Французы часто используют C\'est... как универсальную реакцию. Tant mieux/tant pis — классическая пара принятия исхода. Ça marche / Ça roule — «ок, договорились» в разговорном.', examples: [
          { ro: "— J'ai raté le bus. — C'est pas grave!", ru: '— Я опоздал на автобус. — Ничего страшного!' },
          { ro: "— J'ai eu le job! — Tant mieux!", ru: '— Я получил работу! — Тем лучше! / Отлично!' },
          { ro: "— On se retrouve à midi? — Ça marche!", ru: '— Встречаемся в полдень? — Договорились!' },
          { ro: "Ça m'est égal.", ru: 'Мне всё равно.', note: 'нейтральное безразличие' },
          { ro: "— Merci beaucoup! — De rien! / Il n'y a pas de quoi!", ru: '— Спасибо большое! — Не за что!' },
          { ro: "Bonne chance! / Bon courage! / Bonne continuation!", ru: 'Удачи! / Держись! / Удачи в дальнейшем!' },
        ] },
    ],
  },
]

// ─────────────────────────────────────────────
// 30. GÉRONDIF И PARTICIPE PRÉSENT
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'gerondif',
  title: 'Gérondif et participe présent',
  icon: '🔄',
  description: 'En + participe présent (gérondif) и participe présent как прилагательное — две разные функции',
  sections: [
    {
      id: 'gerondif-formation',
      title: 'Образование participe présent',
      body: 'Participe présent образуется от основы формы «nous» в présent + окончание -ant: nous parlons → parlant, nous finissons → finissant, nous prenons → prenant. Три исключения: être → étant, avoir → ayant, savoir → sachant.',
      examples: [
        { ro: 'parler → parlant', ru: 'говорить → говорящий' },
        { ro: 'finir → finissant', ru: 'заканчивать → заканчивающий' },
        { ro: 'être → étant', ru: 'быть → будучи' },
        { ro: 'avoir → ayant', ru: 'иметь → имея' },
      ],
    },
    {
      id: 'gerondif-use',
      title: 'Gérondif: en + participe présent',
      body: 'Gérondif = en + participe présent. Выражает одновременность, способ или условие. Важно: субъект gérondif и главного глагола должен быть одним и тем же лицом.',
      examples: [
        { ro: 'Il chante en travaillant.', ru: 'Он поёт, работая / пока работает.' },
        { ro: 'Elle apprend le français en regardant des films.', ru: 'Она учит французский, смотря фильмы.' },
        { ro: 'En arrivant, il a vu ses amis.', ru: 'Приехав, он увидел друзей.' },
      ],
    },
    {
      id: 'participe-adjective',
      title: 'Participe présent как прилагательное',
      body: 'Без «en» participe présent функционирует как прилагательное — тогда оно называется «adjectif verbal» и согласуется с существительным в роде и числе.',
      examples: [
        { ro: 'une histoire fascinante', ru: 'захватывающая история', note: 'adjectif verbal — согласуется' },
        { ro: 'un enfant obéissant', ru: 'послушный ребёнок' },
        { ro: 'en lisant (gérondif) vs lisant (participe)', ru: 'читая (действие) vs читающий (определение)', note: 'ключевое различие' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 31. C'EST VS IL EST
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'cest-vs-ilst',
  title: "C'est vs il est",
  icon: '⚖️',
  description: "Одна из самых частых точек ошибок — когда «это» и когда «он/она»",
  sections: [
    {
      id: 'cest-rules',
      title: "Когда c'est",
      body: "C'est используется: (1) перед артиклем + существительным, (2) перед именем собственным, (3) перед местоимением, (4) перед прилагательным, когда оно относится к ситуации в целом, а не к конкретному лицу.",
      examples: [
        { ro: "C'est un médecin.", ru: 'Это врач.', note: 'артикль + существительное' },
        { ro: "C'est Marie.", ru: 'Это Мари.', note: 'имя собственное' },
        { ro: "C'est moi.", ru: 'Это я.', note: 'местоимение' },
        { ro: "C'est intéressant!", ru: 'Это интересно!', note: 'оценка ситуации в целом' },
      ],
    },
    {
      id: 'ilst-rules',
      title: 'Когда il/elle est',
      body: 'Il/elle est используется: (1) перед прилагательным, которое описывает конкретного человека или предмет, (2) перед профессией/национальностью/религией без артикля.',
      examples: [
        { ro: 'Il est médecin.', ru: 'Он — врач.', note: 'профессия без артикля' },
        { ro: 'Elle est française.', ru: 'Она француженка.', note: 'национальность без артикля' },
        { ro: 'Il est grand.', ru: 'Он высокий.', note: 'прилагательное о конкретном человеке' },
        { ro: "Il est médecin. / C'est un bon médecin.", ru: 'Он врач. / Это хороший врач.', note: 'классическая пара' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 32. NE…QUE (ОГРАНИЧИТЕЛЬНОЕ ОТРИЦАНИЕ)
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'ne-que',
  title: 'Ne…que',
  icon: '🎯',
  description: "«Только» — ограничение, не отрицание",
  sections: [
    {
      id: 'ne-que-structure',
      title: 'Структура и смысл',
      body: "Ne…que — не настоящее отрицание, а ограничение: «только». Ne стоит перед глаголом, que — перед тем, что ограничивается. Синоним: seulement. В разговорной речи ne часто опускается: «J'ai que dix euros».",
      examples: [
        { ro: "Je n'ai que dix euros.", ru: 'У меня только десять евро.' },
        { ro: "Il ne mange que des légumes.", ru: 'Он ест только овощи.' },
        { ro: "Elle ne travaille que le lundi.", ru: 'Она работает только по понедельникам.' },
        { ro: "Je n'ai que faire de ça.", ru: 'Мне это совсем не нужно.', note: 'устойчивое выражение' },
      ],
    },
    {
      id: 'ne-que-vs-pas',
      title: 'Ne…que vs ne…pas',
      body: 'Ne…pas — полное отрицание («не»). Ne…que — ограничение («только»). Разница принципиальная: «je ne mange pas de viande» (я не ем мясо) vs «je ne mange que de la viande» (я ем только мясо).',
      examples: [
        { ro: "Je ne mange pas de viande.", ru: 'Я не ем мясо.', note: 'полное отрицание' },
        { ro: "Je ne mange que de la viande.", ru: 'Я ем только мясо.', note: 'ограничение' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 33. КОСВЕННАЯ РЕЧЬ (DISCOURS INDIRECT)
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'reported-speech',
  title: 'Косвенная речь',
  icon: '💬',
  description: 'Discours indirect — согласование времён, трансформации',
  sections: [
    {
      id: 'reported-intro',
      title: 'Трансформации при переводе в косвенную речь',
      body: 'При переводе прямой речи в косвенную меняются: местоимения, указательные слова, наречия времени и — главное — времена глаголов. Глагол введения в прошедшем времени запускает «согласование времён» (concordance des temps).',
      table: {
        headers: ['Прямая речь', 'Косвенная речь (глагол в прош.)'],
        rows: [
          ['présent', 'imparfait'],
          ['passé composé', 'plus-que-parfait'],
          ['futur simple', 'conditionnel présent'],
          ['futur antérieur', 'conditionnel passé'],
          ['imparfait', 'imparfait (без изменений)'],
        ],
      },
      examples: [
        { ro: "Il dit: «Je suis fatigué.» → Il dit qu'il est fatigué.", ru: 'Глагол в наст. — времена не меняются.' },
        { ro: "Il a dit: «Je suis fatigué.» → Il a dit qu'il était fatigué.", ru: 'Глагол в прош. — présent → imparfait.' },
        { ro: "Elle a dit: «Je viendrai.» → Elle a dit qu'elle viendrait.", ru: 'futur → conditionnel.' },
      ],
    },
    {
      id: 'reported-questions',
      title: 'Косвенные вопросы',
      body: 'Общий вопрос вводится через «si» (не «que»), специальный — через вопросительное слово. Порядок слов — прямой (не инверсия).',
      examples: [
        { ro: "Il demande: «Tu viens?» → Il demande si tu viens.", ru: 'si — для вопроса да/нет.' },
        { ro: "Elle demande: «Où habites-tu?» → Elle demande où tu habites.", ru: 'Вопросительное слово — без инверсии.' },
        { ro: "Il a demandé: «Qu'est-ce que tu fais?» → Il a demandé ce que je faisais.", ru: 'que → ce que в косвенном.' },
      ],
    },
    {
      id: 'reported-time-shift',
      title: 'Смена наречий времени и места',
      body: 'При переносе в косвенную речь меняются указательные слова.',
      table: {
        headers: ['Прямая речь', 'Косвенная речь'],
        rows: [
          ['maintenant', 'à ce moment-là'],
          ['aujourd\'hui', 'ce jour-là'],
          ['hier', 'la veille'],
          ['demain', 'le lendemain'],
          ['ici', 'là'],
          ['ce/cet/cette', 'ce/cet/cette…-là'],
        ],
      },
      examples: [
        { ro: "Il a dit: «Je viendrai demain.» → Il a dit qu'il viendrait le lendemain.", ru: 'demain → le lendemain.' },
      ],
    },
  ],
})
