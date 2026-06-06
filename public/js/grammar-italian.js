// Данные грамматики для итальянского языка.
// Загружается динамически через import() в init() — должен писать на window.

window.grammarTopics = [
  // ─────────────────────────────────────────────
  // 1. РОД И АРТИКЛИ
  // ─────────────────────────────────────────────
  {
    id: 'articles',
    title: 'Род и артикли',
    icon: '🏷️',
    description: 'il/la/lo/l\'/i/gli/le, un/una/un\', слияния del/della/nel/alla и т.д.',
    sections: [
      { id: 'articles-gender', title: 'Два рода', body: 'В итальянском два рода — мужской и женский. Существительные на -o обычно мужского рода, на -a — женского, на -e — любого. Род влияет на форму артикля, прилагательного и причастия. Есть исключения: il problema, la mano.', examples: [
          { ro: 'il libro / la casa', ru: 'книга (м.р.) / дом (ж.р.)' },
          { ro: 'il giorno / la notte', ru: 'день (м.р.) / ночь (ж.р.)' },
          { ro: 'il problema', ru: 'проблема — исключение, мужской род', note: 'слова греч. происхождения на -ma' },
          { ro: 'la mano', ru: 'рука — исключение, женский род', note: 'ожидалось бы мужской (на -o)' },
          { ro: 'il fiore / la fine', ru: 'цветок / конец — оба на -e, разный род' },
          { ro: 'il re / la città', ru: 'король / город — неизменяемые по форме' },
        ] },
      { id: 'articles-definite', title: 'Определённый артикль: il/lo/la/l\'/i/gli/le', body: 'Форма артикля зависит от рода, числа и первого звука следующего слова. lo и gli — перед s+согл., z, ps, gn, x, y; l\' — перед гласной.', table: { headers: ['', 'согл.', 's+согл./z/ps/gn', 'гласная', 'мн. согл.', 'мн. s+согл./гл.'], rows: [['м.р.', 'il', 'lo', "l'", 'i', 'gli'], ['ж.р.', 'la', 'la', "l'", 'le', 'le']] }, examples: [
          { ro: 'il cane, lo studente, l\'amico', ru: 'собака, студент, друг — три формы м.р. ед.ч.' },
          { ro: 'la ragazza, l\'amica', ru: 'девушка, подруга — две формы ж.р. ед.ч.' },
          { ro: 'i cani, gli studenti, gli amici', ru: 'мн.ч. м.р. — i перед согл., gli перед гласной и s+согл.' },
          { ro: 'lo zaino, gli zaini', ru: 'рюкзак — lo/gli перед z' },
          { ro: 'lo psicologo, gli psicologi', ru: 'психолог — lo/gli перед ps' },
          { ro: 'le ragazze, le amiche', ru: 'мн.ч. ж.р. — всегда le' },
        ] },
      { id: 'articles-indefinite', title: 'Неопределённый артикль: un/uno/una/un\'', body: 'Те же правила распределения, что у определённого артикля. Только единственное число — для мн. числа используется партитив (dei/delle) или артикль опускается.', table: { headers: ['', 'согл.', 's+согл./z/ps/gn', 'гласная'], rows: [['м.р.', 'un', 'uno', 'un'], ['ж.р.', 'una', 'una', "un'"]] }, examples: [
          { ro: 'un libro, un amico', ru: 'книга, друг — un для м.р. перед любой согл. и гласной' },
          { ro: 'uno studente, uno zaino', ru: 'студент, рюкзак — uno перед s+согл. и z' },
          { ro: 'una ragazza, un\'amica', ru: 'девушка, подруга — una/un\' для ж.р.' },
          { ro: 'Ho comprato dei libri.', ru: 'Я купил (несколько) книг.', note: 'dei = партитив мн.ч.' },
          { ro: 'uno psicologo', ru: 'психолог — uno перед ps' },
          { ro: 'un\'ora, un\'idea', ru: 'час, идея — un\' перед гласной ж.р.' },
        ] },
      { id: 'articles-contractions', title: 'Слияния: del/della/dei, al/alla/ai, nel/nella/nei, sul…', body: 'Предлоги di, a, in, su, da обязательно сливаются с определённым артиклем. Форма слияния повторяет выбор артикля (il/lo/l\'/la/i/gli/le).', table: { headers: ['Предлог', 'il', 'lo', "l'", 'la', 'i', 'gli', 'le'], rows: [['di', 'del', 'dello', "dell'", 'della', 'dei', 'degli', 'delle'], ['a', 'al', 'allo', "all'", 'alla', 'ai', 'agli', 'alle'], ['in', 'nel', 'nello', "nell'", 'nella', 'nei', 'negli', 'nelle'], ['su', 'sul', 'sullo', "sull'", 'sulla', 'sui', 'sugli', 'sulle'], ['da', 'dal', 'dallo', "dall'", 'dalla', 'dai', 'dagli', 'dalle']] }, examples: [
          { ro: 'il libro del professore', ru: 'книга профессора', note: 'di + il = del' },
          { ro: 'Vado al mercato.', ru: 'Иду на рынок.', note: 'a + il = al' },
          { ro: 'La chiave è sul tavolo.', ru: 'Ключ на столе.', note: 'su + il = sul' },
          { ro: 'negli anni Novanta', ru: 'в девяностые годы', note: 'in + gli = negli' },
          { ro: 'dalla finestra', ru: 'из окна', note: 'da + la = dalla' },
          { ro: 'ai bambini', ru: 'детям', note: 'a + i = ai' },
        ] },
      { id: 'articles-when-omit', title: 'Когда артикль опускается', body: 'Артикль опускается: после essere перед профессией/национальностью без прилагательного; после parlare перед языком; в официальных заголовках и объявлениях; в ряде устойчивых сочетаний. С прилагательным артикль возвращается.', examples: [
          { ro: 'Sono medico.', ru: 'Я врач.', note: 'профессия без прилагательного — без артикля' },
          { ro: 'Sono un bravo medico.', ru: 'Я хороший врач.', note: 'с прилагательным — артикль нужен' },
          { ro: 'Parlo italiano.', ru: 'Я говорю по-итальянски.', note: 'язык после parlare — без артикля' },
          { ro: 'È italiano.', ru: 'Он итальянец.', note: 'национальность без прилагательного' },
          { ro: 'a casa, in ufficio, a scuola', ru: 'дома, в офисе, в школе', note: 'устойчивые предложные сочетания' },
          { ro: 'Ho bisogno di aiuto.', ru: 'Мне нужна помощь.', note: 'после di в некоторых выражениях' },
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
    description: 'Мн. число (-o→-i, -a→-e, -e→-i), исключения',
    sections: [
      { id: 'nouns-plural', title: 'Множественное число', body: 'Три основных модели: -o→-i, -a→-e, -e→-i. Слова на ударную гласную, односложные слова и аббревиатуры не изменяются. Слова муж. рода на -a (греческие заимствования) образуют мн. число на -i.', examples: [
          { ro: 'il libro → i libri', ru: 'книга → книги', note: '-o → -i' },
          { ro: 'la casa → le case', ru: 'дом → дома', note: '-a → -e' },
          { ro: 'il fiore → i fiori', ru: 'цветок → цветы', note: '-e → -i' },
          { ro: 'la città → le città', ru: 'город → города', note: 'ударная -à — не изменяется' },
          { ro: 'il problema → i problemi', ru: 'проблема → проблемы', note: 'м.р. на -a → -i' },
          { ro: 'il caffè → i caffè', ru: 'кофе → (несколько) кофе', note: 'ударная -è — не изменяется' },
        ] },
      { id: 'nouns-irregular', title: 'Нерегулярные и неизменяемые формы', body: 'Ряд существительных имеют супплетивные формы мн. числа. Некоторые слова меняют род во мн. числе: брaccio (м.р. ед.) → le braccia (ж.р. мн.). Это архаичные латинские нейтральные формы.', examples: [
          { ro: 'l\'uomo → gli uomini', ru: 'мужчина → мужчины', note: 'супплетивная форма' },
          { ro: 'la mano → le mani', ru: 'рука → руки', note: 'ж.р., но оканчивается на -o' },
          { ro: 'il braccio → le braccia', ru: 'рука → руки', note: 'м.р. ед. — ж.р. мн.' },
          { ro: 'il ginocchio → le ginocchia', ru: 'колено → колени', note: 'то же явление' },
          { ro: 'l\'uovo → le uova', ru: 'яйцо → яйца', note: 'м.р. ед. → ж.р. мн.' },
          { ro: 'il bue → i buoi', ru: 'бык → быки', note: 'нерегулярная форма' },
        ] },
      { id: 'nouns-gender-hints', title: 'Как угадать род по окончанию', body: 'Окончания -o → почти всегда м.р.; -a → почти всегда ж.р.; -e → может быть любой. Суффиксы -ione, -tà, -tù, -udine → ж.р. Суффикс -ore → м.р. Слова на -ista в ед. числе одинаковы для обоих родов: il/la giornalista.', examples: [
          { ro: 'la nazione, la libertà, la virtù', ru: 'нация, свобода, добродетель', note: '-ione/-tà/-tù → ж.р.' },
          { ro: 'il colore, il dottore, il professore', ru: 'цвет, доктор, профессор', note: '-ore → м.р.' },
          { ro: 'il/la giornalista, il/la pianista', ru: 'журналист(ка), пианист(ка)', note: '-ista — общий род' },
          { ro: 'il clima, il sistema, il tema', ru: 'климат, система, тема', note: 'греч. слова на -ma → м.р.' },
          { ro: 'la radio, la moto, la foto', ru: 'радио, мото, фото', note: 'сокращения ж.р. на -o' },
          { ro: 'il fiore (м.р.), la notte (ж.р.)', ru: 'цветок, ночь', note: '-e — нужно запомнить' },
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
    description: 'Согласование, позиция, bello/buono перед существительным',
    sections: [
      { id: 'adjectives-agreement', title: 'Согласование в роде и числе', body: 'Два типа прилагательных: четырёхформенные (-o/-a/-i/-e: bello/bella/belli/belle) и двухформенные (-e/-i для обоих родов: grande/grandi). Прилагательное согласуется с существительным, к которому относится. Если прилагательное относится к существительным разного рода, стоит м.р. мн.ч.', examples: [
          { ro: 'un libro interessante / una storia interessante', ru: 'интересная книга / история', note: 'двухформенное — -e для обоих родов' },
          { ro: 'un ragazzo alto / una ragazza alta', ru: 'высокий мальчик / высокая девочка', note: 'четырёхформенное' },
          { ro: 'i ragazzi alti / le ragazze alte', ru: 'высокие мальчики / высокие девочки' },
          { ro: 'Marco e Maria sono stanchi.', ru: 'Марко и Мария устали.', note: 'разный род → м.р. мн.ч.' },
          { ro: 'una casa grande, dei libri grandi', ru: 'большой дом, большие книги', note: '-e → -i в мн.ч.' },
          { ro: 'È una persona intelligente.', ru: 'Он/она умный/умная человек.' },
        ] },
      { id: 'adjectives-position', title: 'Позиция: обычно после существительного', body: 'По умолчанию прилагательное стоит после существительного. Перед существительным оно придаёт субъективную, эмоциональную или поэтическую окраску. Некоторые частые прилагательные обычно стоят перед: bello, bravo, buono, brutto, piccolo, grande, vecchio, giovane, nuovo, ultimo, primo, stesso, prossimo.', examples: [
          { ro: 'una macchina veloce', ru: 'быстрая машина', note: 'описательное — после' },
          { ro: 'un bel paesaggio', ru: 'красивый пейзаж', note: 'bello обычно перед' },
          { ro: 'una povera donna / una donna povera', ru: 'бедная (несчастная) / бедная (без денег)', note: 'смысл меняется от позиции' },
          { ro: 'il prossimo treno', ru: 'следующий поезд', note: 'prossimo — всегда перед' },
          { ro: 'un grande uomo / un uomo grande', ru: 'великий человек / большой (рослый) человек', note: 'grande меняет смысл' },
          { ro: 'la prima volta', ru: 'первый раз', note: 'ordinal — всегда перед' },
        ] },
      { id: 'adjectives-bello-buono', title: 'Bello и buono перед существительным', body: 'Стоя перед существительным, bello склоняется как определённый артикль (bel/bello/bell\'/bella/bei/begli/belle), а buono — как неопределённый (buon/buono/buona/buon\'). После глагола essere они используются в полной форме: è bello, è buono.', table: { headers: ['', 'согл.', 's+согл./z', 'гласная', 'ж.р.', 'мн. м.р. согл.', 'мн. м.р. s+согл./гл.', 'мн. ж.р.'], rows: [['bello', 'bel', 'bello', "bell'", 'bella', 'bei', 'begli', 'belle'], ['buono', 'buon', 'buono', "buon'", 'buona', 'buoni', 'buoni', 'buone']] }, examples: [
          { ro: 'un bel ragazzo, un bello zaino, un bell\'uomo', ru: 'красивый парень, рюкзак, мужчина' },
          { ro: 'una bella ragazza, dei bei fiori', ru: 'красивая девушка, красивые цветы' },
          { ro: 'un buon vino, un buono stipendio', ru: 'хорошее вино, хорошая зарплата' },
          { ro: 'È bello questo posto!', ru: 'Это место красивое!', note: 'после essere — полная форма' },
          { ro: 'begli occhi, begli studenti', ru: 'красивые глаза, красивые студенты', note: 'begli перед гласной и s+согл.' },
          { ro: 'una buon\'idea', ru: 'хорошая идея', note: 'buon\' перед гласной ж.р.' },
        ] },
      { id: 'adjectives-comparison', title: 'Степени сравнения: più/meno, il più, нерегулярные', body: 'Сравнительная степень: più/meno + прилаг. + di (перед мест./сущ.) или che (при сравнении двух качеств одного предмета или перед глаголом). Превосходная: il/la/i/le più + прилаг. Нерегулярные: buono→migliore/il migliore, cattivo→peggiore, grande→maggiore, piccolo→minore.', examples: [
          { ro: 'Marco è più alto di Luca.', ru: 'Марко выше Луки.', note: 'di перед существительным' },
          { ro: 'È più facile dirlo che farlo.', ru: 'Легче сказать, чем сделать.', note: 'che перед инфинитивом' },
          { ro: 'il ristorante più caro della città', ru: 'самый дорогой ресторан в городе', note: 'превосходная + della' },
          { ro: 'Questo vino è migliore.', ru: 'Это вино лучше.', note: 'buono → migliore' },
          { ro: 'È il film peggiore che abbia visto.', ru: 'Это худший фильм, который я видел.', note: 'cattivo → peggiore' },
          { ro: 'meno caro ma non meno buono', ru: 'менее дорогой, но не менее хороший' },
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
    description: 'Субъектные (часто опускаются), прямые, косвенные, ci, ne, комбинации',
    sections: [
      { id: 'pronouns-subject', title: 'Субъектные — и почему их опускают', body: 'Субъектные местоимения: io, tu, lui/lei/Lei, noi, voi, loro. Итальянский — язык с нулевым подлежащим: глагольное окончание достаточно указывает на лицо, поэтому местоимение обычно опускается. Используется для эмфазы или контраста. Lei (заглавная) — вежливое «Вы» в 3-м лице.', table: { headers: ['Лицо', 'Местоимение', 'Примечание'], rows: [['1 ед.', 'io', '—'], ['2 ед.', 'tu', 'неформально'], ['3 ед.', 'lui / lei', 'он / она'], ['Вежл.', 'Lei', 'формальное «Вы»'], ['1 мн.', 'noi', '—'], ['2 мн.', 'voi', '—'], ['3 мн.', 'loro', '—']] }, examples: [
          { ro: 'Parlo italiano.', ru: 'Я говорю по-итальянски.', note: 'io опущено — окончание -o указывает на 1 л.' },
          { ro: 'Io parlo italiano, tu parli spagnolo.', ru: 'Я говорю по-итальянски, ты — по-испански.', note: 'контраст — местоимения нужны' },
          { ro: 'Lei come si chiama?', ru: 'Как вас зовут?', note: 'Lei — вежливое обращение' },
          { ro: 'Vieni anche tu?', ru: 'Ты тоже идёшь?', note: 'anche + местоимение — эмфаза' },
          { ro: 'L\'ha fatto lui, non lei.', ru: 'Это сделал он, а не она.', note: 'уточнение лица' },
        ] },
      { id: 'pronouns-direct', title: 'Прямые объектные: mi/ti/lo/la/ci/vi/li/le', body: 'Прямые местоимения заменяют прямое дополнение. Стоят перед спрягаемым глаголом; присоединяются к инфинитиву, герундию, утвердительному императиву. lo/la/li/le согласуются с родом и числом заменяемого существительного.', table: { headers: ['Лицо', 'Ед.ч.', 'Мн.ч.'], rows: [['1', 'mi', 'ci'], ['2', 'ti', 'vi'], ['3 м.р.', 'lo', 'li'], ['3 ж.р.', 'la', 'le']] }, examples: [
          { ro: 'Vedo Marco. → Lo vedo.', ru: 'Вижу Марко. → Вижу его.' },
          { ro: 'Chiamo Maria. → La chiamo.', ru: 'Звоню Марии. → Звоню ей.' },
          { ro: 'Mi aiuti?', ru: 'Ты мне поможешь?', note: 'mi = меня' },
          { ro: 'Voglio vederla.', ru: 'Хочу её увидеть.', note: 'присоединяется к инфинитиву' },
          { ro: 'L\'ho vista ieri.', ru: 'Я видел её вчера.', note: 'la → l\' перед ho; причастие согласуется' },
          { ro: 'Comprali!', ru: 'Купи их!', note: 'li присоединяется к императиву' },
        ] },
      { id: 'pronouns-indirect', title: 'Косвенные: mi/ti/gli/le/ci/vi/gli', body: 'Косвенные местоимения заменяют дополнение с предлогом a (кому/чему). В 3-м лице ед.ч.: gli (ему) и le (ей). В современном итальянском gli используется для обоих родов мн.ч. вместо loro. Позиция — та же, что у прямых.', table: { headers: ['Лицо', 'Ед.ч.', 'Мн.ч.'], rows: [['1', 'mi', 'ci'], ['2', 'ti', 'vi'], ['3 м.р.', 'gli', 'gli (=loro)'], ['3 ж.р.', 'le', 'gli (=loro)']] }, examples: [
          { ro: 'Scrivo a Marco. → Gli scrivo.', ru: 'Пишу Марко. → Пишу ему.' },
          { ro: 'Scrivo a Maria. → Le scrivo.', ru: 'Пишу Марии. → Пишу ей.' },
          { ro: 'Mi ha detto la verità.', ru: 'Он сказал мне правду.', note: 'mi = мне' },
          { ro: 'Gli telefono domani.', ru: 'Позвоню ему (им) завтра.', note: 'gli = ему или им' },
          { ro: 'Ti mando un messaggio.', ru: 'Пришлю тебе сообщение.' },
          { ro: 'Cosa gli hai risposto?', ru: 'Что ты ему ответил?' },
        ] },
      { id: 'pronouns-ci', title: 'Местоимение ci — место и замена групп', body: 'Ci имеет три функции: (1) заменяет a/in + место («там», «туда»); (2) входит в состав устойчивых глаголов (esserci, volerci, metterci, farcela, entrarci); (3) является возвратным местоимением 1-го л. мн.ч. (ci vediamo = видимся). Перед lo/la/li/le/ne трансформируется в ce.', examples: [
          { ro: 'Vai a Roma? — Sì, ci vado domani.', ru: 'Едешь в Рим? — Да, еду туда завтра.', note: 'ci = туда' },
          { ro: 'C\'è un problema.', ru: 'Есть проблема.', note: 'c\'è = ci + è — «имеется»' },
          { ro: 'Ci vogliono due ore.', ru: 'Нужно два часа.', note: 'ci vuole/vogliono = требуется' },
          { ro: 'Ci penso su.', ru: 'Подумаю об этом.', note: 'ci заменяет a + абстрактная идея' },
          { ro: 'Ce la faccio!', ru: 'Я справлюсь!', note: 'farcela — ci → ce перед la' },
          { ro: 'Ci vediamo domani.', ru: 'Увидимся завтра.', note: 'возвратное 1 мн.' },
        ] },
      { id: 'pronouns-ne', title: 'Местоимение ne — замена di + существительное', body: 'Ne заменяет: (1) di + существительное или предложение; (2) партитивное дополнение (количество чего-то). С количеством числительное или наречие остаётся: ne ho tre. Входит в состав verbi pronominali: andarsene, fregarsene. Перед lo/la/li/le трансформируется: ce ne, te ne и т.д.', examples: [
          { ro: 'Hai del pane? — Sì, ne ho.', ru: 'У тебя есть хлеб? — Да, есть (немного).', note: 'ne = партитив' },
          { ro: 'Quante mele vuoi? — Ne voglio due.', ru: 'Сколько яблок хочешь? — Хочу два (из них).', note: 'числительное остаётся' },
          { ro: 'Parli di sport? — Sì, ne parlo spesso.', ru: 'Говоришь о спорте? — Да, часто говорю об этом.', note: 'ne = di + sport' },
          { ro: 'Me ne vado.', ru: 'Я ухожу.', note: 'andarsene — устойчивый глагол' },
          { ro: 'Ne sono contento.', ru: 'Я доволен этим.', note: 'ne = di + ciò' },
          { ro: 'Ce ne sono tanti!', ru: 'Их так много!', note: 'ci + ne → ce ne' },
        ] },
      { id: 'pronouns-combined', title: 'Pronomi combinati: me lo, glielo, te ne…', body: 'Когда косвенное и прямое местоимения стоят рядом, косвенное идёт первым и меняет форму: mi→me, ti→te, ci→ce, vi→ve; gli и le оба становятся glie- и пишутся слитно с прямым. Порядок: косвенное + прямое (+ ne).', table: { headers: ['Косв.', 'lo', 'la', 'li', 'le', 'ne'], rows: [['mi → me', 'me lo', 'me la', 'me li', 'me le', 'me ne'], ['ti → te', 'te lo', 'te la', 'te li', 'te le', 'te ne'], ['gli/le → glie-', 'glielo', 'gliela', 'glieli', 'gliele', 'gliene'], ['ci → ce', 'ce lo', 'ce la', 'ce li', 'ce le', 'ce ne'], ['vi → ve', 've lo', 've la', 've li', 've le', 've ne']] }, examples: [
          { ro: 'Me lo dai?', ru: 'Ты мне это дашь?', note: 'mi + lo → me lo' },
          { ro: 'Te lo mando subito.', ru: 'Сразу тебе пришлю.', note: 'ti + lo → te lo' },
          { ro: 'Glielo ho detto.', ru: 'Я ему/ей это сказал.', note: 'gli/le + lo → glielo' },
          { ro: 'Ce ne sono rimasti pochi.', ru: 'Нас осталось мало.', note: 'ci + ne → ce ne' },
          { ro: 'Portamelo!', ru: 'Принеси мне это!', note: 'mi + lo присоединяется к императиву' },
          { ro: 'Non glielo dire!', ru: 'Не говори ему/ей этого!', note: 'отрицательный импер.: перед глаголом' },
        ] },
      { id: 'pronouns-possessive', title: 'Притяжательные: mio/tua/suo и артикль при них', body: 'Притяжательные местоимения всегда согласуются с родом/числом обладаемого предмета. Обычно употребляются с определённым артиклем. Исключение: перед неизменёнными родственниками ед.ч. артикль опускается (mia madre, tuo padre), но во мн.ч. или с прилагательным артикль возвращается.', table: { headers: ['', 'м.р. ед.', 'ж.р. ед.', 'м.р. мн.', 'ж.р. мн.'], rows: [['мой', 'mio', 'mia', 'miei', 'mie'], ['твой', 'tuo', 'tua', 'tuoi', 'tue'], ['его/её/Ваш', 'suo', 'sua', 'suoi', 'sue'], ['наш', 'nostro', 'nostra', 'nostri', 'nostre'], ['ваш', 'vostro', 'vostra', 'vostri', 'vostre'], ['их', 'loro', 'loro', 'loro', 'loro']] }, examples: [
          { ro: 'il mio libro, la mia casa', ru: 'моя книга, мой дом', note: 'артикль + притяж. + сущ.' },
          { ro: 'mia madre, tuo fratello', ru: 'моя мама, твой брат', note: 'родственники ед.ч. — без артикля' },
          { ro: 'i miei genitori, le mie sorelle', ru: 'мои родители, мои сёстры', note: 'мн.ч. — артикль нужен' },
          { ro: 'la mia cara madre', ru: 'моя дорогая мама', note: 'с прилагательным — артикль нужен' },
          { ro: 'il loro appartamento', ru: 'их квартира', note: 'loro неизменно, артикль всегда' },
          { ro: 'È mio! / È tuo?', ru: 'Это моё! / Это твоё?', note: 'без сущ. — притяж. как сказуемое' },
        ] },
      { id: 'pronouns-demonstrative', title: 'Указательные: questo/quello', body: 'Questo (этот/эта/это/эти) — указывает на близкое. Quello (тот/та/то/те) — на далёкое. Questo склоняется как обычное прилагательное. Quello перед существительным склоняется как определённый артикль (по схеме bello): quel/quello/quell\'/quella/quei/quegli/quelle.', examples: [
          { ro: 'Questo libro è mio, quello è tuo.', ru: 'Эта книга моя, та — твоя.' },
          { ro: 'quel ragazzo, quello studente, quell\'uomo', ru: 'тот парень, тот студент, тот мужчина' },
          { ro: 'quella ragazza, quei ragazzi, quegli studenti', ru: 'та девушка, те парни, те студенты' },
          { ro: 'Questa è una buona idea.', ru: 'Это хорошая идея.' },
          { ro: 'Preferisco quel ristorante.', ru: 'Предпочитаю тот ресторан.' },
          { ro: 'Quello che dici è vero.', ru: 'То, что ты говоришь, правда.', note: 'quello che = то, что' },
        ] },
      { id: 'pronouns-relative', title: 'Относительные: che, cui, il quale', body: 'Che — подлежащее или прямое дополнение, не изменяется. Cui — после любого предлога (di cui, a cui, con cui, su cui). Il quale/la quale и т.д. — более формальный вариант, позволяет избежать двусмысленности. Il cui/la cui — «чей».', examples: [
          { ro: 'Il libro che ho letto è interessante.', ru: 'Книга, которую я прочитал, интересная.', note: 'che = которую (прямое доп.)' },
          { ro: 'La ragazza che parla è mia sorella.', ru: 'Девушка, которая говорит, — моя сестра.', note: 'che = которая (подлежащее)' },
          { ro: 'La città in cui vivo è grande.', ru: 'Город, в котором я живу, большой.', note: 'in + cui' },
          { ro: 'L\'amico di cui ti ho parlato.', ru: 'Друг, о котором я тебе говорил.', note: 'di + cui' },
          { ro: 'Lo scrittore, il cui romanzo ho letto…', ru: 'Писатель, роман которого я читал…', note: 'il cui = чей' },
          { ro: 'La persona con la quale lavoro.', ru: 'Человек, с которым я работаю.', note: 'con + la quale — формальный стиль' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. ГЛАГОЛЫ. PRESENTE
  // ─────────────────────────────────────────────
  {
    id: 'verbs-present',
    title: 'Глаголы. Presente',
    icon: '⚡',
    description: 'Три группы (-are, -ere, -ire), нерегулярные essere/avere/andare/fare',
    sections: [
      { id: 'verbs-are', title: 'Глаголы -are (1-я группа)', body: 'Самая многочисленная группа. Окончания: -o/-i/-a/-iamo/-ate/-ano. Глаголы на -care/-gare добавляют h перед -i (cerchi, paghi). Глаголы на -ciare/-giare не удваивают i: cominci, mangi.', table: { headers: ['', 'parlare (говорить)'], rows: [['io', 'parlo'], ['tu', 'parli'], ['lui/lei', 'parla'], ['noi', 'parliamo'], ['voi', 'parlate'], ['loro', 'parlano']] }, examples: [
          { ro: 'Parlo italiano ogni giorno.', ru: 'Я говорю по-итальянски каждый день.' },
          { ro: 'Mangi la pizza?', ru: 'Ты ешь пиццу?' },
          { ro: 'Lavoriamo insieme.', ru: 'Мы работаем вместе.' },
          { ro: 'Cerchi qualcosa?', ru: 'Ты что-то ищешь?', note: 'cercare: cerco/cerchi/cerca — h перед -i' },
          { ro: 'Cominci a capire.', ru: 'Ты начинаешь понимать.', note: 'cominciare: non-double i' },
          { ro: 'Abitano a Milano.', ru: 'Они живут в Милане.' },
        ] },
      { id: 'verbs-ere', title: 'Глаголы -ere (2-я группа)', body: 'Окончания: -o/-i/-e/-iamo/-ete/-ono. В presente почти нет орфографических сложностей, но многие -ere глаголы нерегулярны. Ударение в 3 л. мн.ч. всегда на корне (vedono, corrono), не на окончании.', table: { headers: ['', 'vedere (видеть)'], rows: [['io', 'vedo'], ['tu', 'vedi'], ['lui/lei', 'vede'], ['noi', 'vediamo'], ['voi', 'vedete'], ['loro', 'vedono']] }, examples: [
          { ro: 'Vedo il mare dalla finestra.', ru: 'Вижу море из окна.' },
          { ro: 'Leggi molto?', ru: 'Ты много читаешь?' },
          { ro: 'Cosa scrivono?', ru: 'Что они пишут?' },
          { ro: 'Prendo un caffè.', ru: 'Возьму кофе.', note: 'prendere — нерегулярный в прош.' },
          { ro: 'Corriamo al parco.', ru: 'Бежим в парк.' },
          { ro: 'Mettono le chiavi qui.', ru: 'Они кладут ключи сюда.' },
        ] },
      { id: 'verbs-ire', title: 'Глаголы -ire (3-я группа, в т.ч. с -isc-)', body: 'Два подтипа. Тип 1 (без расширения): partire, dormire, aprire — окончания -o/-i/-e/-iamo/-ite/-ono. Тип 2 (с инфиксом -isc- в ед.ч. и 3 мн.): finire, capire, preferire, pulire — finisco/finisci/finisce/finiamo/finite/finiscono. Большинство -ire глаголов принадлежат к типу 2.', examples: [
          { ro: 'Parto domani mattina.', ru: 'Уезжаю завтра утром.', note: 'partire — тип 1' },
          { ro: 'Dormi bene?', ru: 'Ты хорошо спишь?', note: 'dormire — тип 1' },
          { ro: 'Finisco il lavoro alle sei.', ru: 'Заканчиваю работу в шесть.', note: 'finire — тип 2, -isc-' },
          { ro: 'Capisce l\'italiano?', ru: 'Вы понимаете итальянский?', note: 'capire — тип 2' },
          { ro: 'Preferiamo restare a casa.', ru: 'Мы предпочитаем остаться дома.', note: 'preferire — -iamo без -isc-' },
          { ro: 'Pulisco la cucina.', ru: 'Убираю кухню.', note: 'pulire — тип 2' },
        ] },
      { id: 'verbs-essere', title: 'Essere (быть)', body: 'Полностью нерегулярный, обязательно учить наизусть. Essere используется как: (1) глагол-связка (sono stanco), (2) вспомогательный глагол для сложных времён (sono andato), (3) для выражения характеристик и состояний.', table: { headers: ['', 'essere'], rows: [['io', 'sono'], ['tu', 'sei'], ['lui/lei', 'è'], ['noi', 'siamo'], ['voi', 'siete'], ['loro', 'sono']] }, examples: [
          { ro: 'Sono italiano.', ru: 'Я итальянец.' },
          { ro: 'Sei stanco?', ru: 'Ты устал?' },
          { ro: 'Roma è la capitale.', ru: 'Рим — столица.' },
          { ro: 'Siamo in ritardo.', ru: 'Мы опаздываем.' },
          { ro: 'Che ore sono? — Sono le tre.', ru: 'Который час? — Три часа.', note: 'время — множественное с sono' },
          { ro: 'Dov\'è il bagno?', ru: 'Где туалет?' },
        ] },
      { id: 'verbs-avere', title: 'Avere (иметь)', body: 'Нерегулярный в 1 ед. (ho), 2 ед. (hai), 3 ед. (ha), 3 мн. (hanno) — h не произносится, но различает написание. Используется: (1) как глагол «иметь», (2) как вспомогательный для переходных глаголов, (3) в выражениях состояния: avere fame/sete/sonno/freddo/caldo/paura/ragione/torto/fretta.', table: { headers: ['', 'avere'], rows: [['io', 'ho'], ['tu', 'hai'], ['lui/lei', 'ha'], ['noi', 'abbiamo'], ['voi', 'avete'], ['loro', 'hanno']] }, examples: [
          { ro: 'Ho un\'idea!', ru: 'У меня есть идея!' },
          { ro: 'Hai fame?', ru: 'Ты голоден?', note: 'avere fame — устойчивое выражение' },
          { ro: 'Ha trent\'anni.', ru: 'Ему тридцать лет.', note: 'avere + anni = возраст' },
          { ro: 'Abbiamo fretta.', ru: 'Мы торопимся.', note: 'avere fretta — спешить' },
          { ro: 'Hai ragione.', ru: 'Ты прав.', note: 'avere ragione — быть правым' },
          { ro: 'Hanno paura del buio.', ru: 'Они боятся темноты.', note: 'avere paura — бояться' },
        ] },
      { id: 'verbs-irregular', title: 'Нерегулярные: andare, fare, dare, stare, dire', body: 'Пять ключевых нерегулярных глаголов presente. Их формы нужно учить как отдельные парадигмы.', table: { headers: ['', 'andare', 'fare', 'dare', 'stare', 'dire'], rows: [['io', 'vado', 'faccio', 'do', 'sto', 'dico'], ['tu', 'vai', 'fai', 'dai', 'stai', 'dici'], ['lui/lei', 'va', 'fa', 'dà', 'sta', 'dice'], ['noi', 'andiamo', 'facciamo', 'diamo', 'stiamo', 'diciamo'], ['voi', 'andate', 'fate', 'date', 'state', 'dite'], ['loro', 'vanno', 'fanno', 'danno', 'stanno', 'dicono']] }, examples: [
          { ro: 'Vado al lavoro in bici.', ru: 'Еду на работу на велосипеде.' },
          { ro: 'Cosa fai questo weekend?', ru: 'Что ты делаешь на этих выходных?' },
          { ro: 'Do un\'occhiata.', ru: 'Брошу взгляд.', note: 'dare un\'occhiata — устойчивое' },
          { ro: 'Come stai? — Sto bene.', ru: 'Как дела? — Хорошо.', note: 'stare — состояние здоровья' },
          { ro: 'Cosa dice?', ru: 'Что он/она говорит?' },
          { ro: 'Vanno in vacanza a luglio.', ru: 'Они едут в отпуск в июле.' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. ВЫБОР ESSERE / AVERE
  // ─────────────────────────────────────────────
  {
    id: 'essere-avere',
    title: 'Essere или avere?',
    icon: '⚖️',
    description: 'Выбор вспомогательного глагола в сложных временах',
    sections: [
      { id: 'essere-avere-rules', title: 'Правила выбора', body: 'Avere — с переходными глаголами (у которых есть прямое дополнение). Essere — с непереходными глаголами движения/изменения состояния, со всеми возвратными глаголами, с безличными конструкциями. С essere причастие согласуется с подлежащим в роде и числе.', examples: [
          { ro: 'Ho mangiato la pizza.', ru: 'Я съел пиццу.', note: 'mangiare переходный → avere' },
          { ro: 'Sono andato al mercato.', ru: 'Я пошёл на рынок.', note: 'andare → essere, причастие м.р.' },
          { ro: 'Maria è andata al mercato.', ru: 'Мария пошла на рынок.', note: 'essere: причастие → ж.р.' },
          { ro: 'Mi sono alzato tardi.', ru: 'Я встал поздно.', note: 'возвратный → всегда essere' },
          { ro: 'Ha telefonato tua madre.', ru: 'Позвонила твоя мать.', note: 'telefonare (a) непереходный → avere' },
          { ro: 'È successo qualcosa?', ru: 'Что-то случилось?', note: 'succedere → essere' },
        ] },
      { id: 'essere-verbs', title: 'Глаголы, требующие essere', body: 'Список глаголов с essere нужно запомнить. Помогает мнемоника ADVENT: Andare/Arrivare, Diventare, Venire/Uscire, Essere/Entrare, Nascere/Morire, Tornare/Partire/Stare/Rimanere. Плюс все возвратные глаголы.', table: { headers: ['Глагол', 'Перевод', 'Глагол', 'Перевод'], rows: [['andare', 'идти', 'venire', 'приходить'], ['arrivare', 'приезжать', 'uscire', 'выходить'], ['partire', 'уезжать', 'entrare', 'входить'], ['tornare', 'возвращаться', 'nascere', 'рождаться'], ['diventare', 'становиться', 'morire', 'умирать'], ['restare/rimanere', 'оставаться', 'succedere', 'случаться']] }, examples: [
          { ro: 'Sono arrivato in ritardo.', ru: 'Я приехал с опозданием.' },
          { ro: 'Maria è partita ieri.', ru: 'Мария уехала вчера.', note: 'ж.р. → -a' },
          { ro: 'Siamo rimasti a casa.', ru: 'Мы остались дома.', note: 'мн.ч. м.р. → -i' },
          { ro: 'È diventato famoso.', ru: 'Он стал известным.' },
          { ro: 'Le ragazze sono uscite.', ru: 'Девушки вышли.', note: 'ж.р. мн. → -e' },
          { ro: 'Cosa è successo?', ru: 'Что случилось?' },
        ] },
      { id: 'essere-avere-both', title: 'Глаголы, меняющие смысл со сменой вспомогательного', body: 'Ряд глаголов принимают avere при переходном употреблении (с прямым дополнением) и essere при непереходном. Смысл или оттенок меняются.', table: { headers: ['Глагол', 'С avere (переходн.)', 'С essere (непереходн.)'], rows: [['salire', 'ho salito le scale (поднялся по лестнице)', 'sono salito in macchina (сел в машину)'], ['scendere', 'ho sceso le scale', 'sono sceso dal treno'], ['correre', 'ho corso i 100 metri', 'sono corso a casa'], ['passare', 'ho passato il sale', 'sono passato dal bar'], ['cambiare', 'ho cambiato idea', 'sono cambiato molto'], ['finire', 'ho finito il lavoro', 'il film è finito']] }, examples: [
          { ro: 'Ho finito la pasta. / La lezione è finita.', ru: 'Я доел пасту. / Урок закончился.' },
          { ro: 'Ho cambiato lavoro. / Sono cambiato.', ru: 'Сменил работу. / Я изменился.' },
          { ro: 'Ho passato l\'estate in montagna.', ru: 'Провёл лето в горах.', note: 'passare время → avere' },
          { ro: 'Sono passato dal supermercato.', ru: 'Заглянул в супермаркет.', note: 'passare место → essere' },
          { ro: 'Ho corso per un\'ora.', ru: 'Бегал час.', note: 'avere — спорт/дистанция' },
          { ro: 'Sono corso al pronto soccorso.', ru: 'Помчался в скорую.', note: 'essere — направление движения' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. ГЛАГОЛЫ. PASSATO PROSSIMO
  // ─────────────────────────────────────────────
  {
    id: 'verbs-passato-prossimo',
    title: 'Глаголы. Passato prossimo',
    icon: '⏮️',
    description: 'avere/essere + participio passato, согласование',
    sections: [
      { id: 'pp-participio', title: 'Образование participio passato', body: 'Правильные: -are→-ato, -ere→-uto, -ire→-ito. Нерегулярные причастия (в основном -ere глаголы) нужно учить отдельно — у них нет общей закономерности.', table: { headers: ['Инфинитив', 'Причастие', 'Перевод'], rows: [['parlare', 'parlato', 'говорить'], ['vedere', 'visto', 'видеть'], ['leggere', 'letto', 'читать'], ['scrivere', 'scritto', 'писать'], ['fare', 'fatto', 'делать'], ['dire', 'detto', 'говорить'], ['aprire', 'aperto', 'открывать'], ['chiudere', 'chiuso', 'закрывать'], ['prendere', 'preso', 'брать'], ['mettere', 'messo', 'класть']] }, examples: [
          { ro: 'ho parlato, ho venduto, ho dormito', ru: 'правильные: -ato/-uto/-ito' },
          { ro: 'ho fatto, ho detto, ho letto', ru: 'нерегулярные: fare/dire/leggere' },
          { ro: 'ho scritto, ho aperto, ho chiuso', ru: 'нерегулярные: scrivere/aprire/chiudere' },
          { ro: 'sono nato, sono morto', ru: 'nascere/morire — essere + причастие', note: 'причастие согласуется' },
          { ro: 'ho visto, ho preso, ho messo', ru: 'нерегулярные: vedere/prendere/mettere' },
          { ro: 'ho risposto, ho scelto, ho perso', ru: 'rispondere/scegliere/perdere' },
        ] },
      { id: 'pp-avere', title: 'Passato prossimo с avere', body: 'avere (ho/hai/ha/abbiamo/avete/hanno) + participio passato. Причастие неизменяемо — кроме случая, когда перед ним стоит прямое объектное местоимение lo/la/li/le (тогда причастие согласуется с местоимением).', examples: [
          { ro: 'Ho mangiato troppo.', ru: 'Я съел слишком много.' },
          { ro: 'Hai visto quel film?', ru: 'Ты видел тот фильм?' },
          { ro: 'Abbiamo lavorato tutto il giorno.', ru: 'Работали весь день.' },
          { ro: 'L\'ho visto ieri.', ru: 'Я видел его вчера.', note: 'lo → l\' + причастие согласуется: visto' },
          { ro: 'Le ho chiamate.', ru: 'Я позвонил им (ж.р. мн.).', note: 'le → причастие -e' },
          { ro: 'Hai letto il libro? — Sì, l\'ho letto.', ru: 'Читал книгу? — Да, читал.' },
        ] },
      { id: 'pp-essere', title: 'Passato prossimo с essere', body: 'essere (sono/sei/è/siamo/siete/sono) + participio passato. Причастие обязательно согласуется с подлежащим в роде и числе: -o (м.р. ед.), -a (ж.р. ед.), -i (м.р. мн.), -e (ж.р. мн.).', examples: [
          { ro: 'Marco è andato al mare.', ru: 'Марко пошёл к морю.', note: 'м.р. ед. → -o' },
          { ro: 'Maria è andata al mare.', ru: 'Мария пошла к морю.', note: 'ж.р. ед. → -a' },
          { ro: 'I ragazzi sono andati al mare.', ru: 'Ребята пошли к морю.', note: 'м.р. мн. → -i' },
          { ro: 'Le ragazze sono andate al mare.', ru: 'Девушки пошли к морю.', note: 'ж.р. мн. → -e' },
          { ro: 'Sono rimasto a casa tutto il giorno.', ru: 'Просидел дома весь день.' },
          { ro: 'Siete arrivati in tempo?', ru: 'Вы приехали вовремя?' },
        ] },
      { id: 'pp-agreement', title: 'Согласование причастия', body: 'С essere — всегда согласуется с подлежащим. С avere — согласуется только если перед ним стоит прямое объектное местоимение (lo/la/li/le) или в относительных придаточных с che. В остальных случаях с avere — неизменяемо.', examples: [
          { ro: 'Ho comprato delle mele. Le ho comprate ieri.', ru: 'Купил яблоки. Купил их вчера.', note: 'le → причастие -e' },
          { ro: 'Quante pizze hai ordinato?', ru: 'Сколько пицц ты заказал?', note: 'нет клитики — нет согласования' },
          { ro: 'La pizza che ho ordinato è buona.', ru: 'Пицца, которую заказал, вкусная.', note: 'che = la pizza → согласование' },
          { ro: 'Maria si è lavata le mani.', ru: 'Мария вымыла руки.', note: 'возвратный → essere → ж.р. ед.' },
          { ro: 'I film che abbiamo visto erano belli.', ru: 'Фильмы, которые мы посмотрели, были хорошими.', note: 'che = i film → -i' },
          { ro: 'L\'ho chiamata ma non ha risposto.', ru: 'Позвонил ей, но она не ответила.', note: 'la → -a; risposto без согласования' },
        ] },
      { id: 'pp-irregular', title: 'Нерегулярные participi passati', body: 'Нерегулярные причастия в основном у -ere глаголов. Часть оканчивается на -so, -sto, -tto, -lto, -rso, -sso — это помогает группировать их.', table: { headers: ['Инфинитив', 'Причастие', 'Инфинитив', 'Причастие'], rows: [['essere', 'stato', 'avere', 'avuto'], ['fare', 'fatto', 'dire', 'detto'], ['vedere', 'visto', 'leggere', 'letto'], ['scrivere', 'scritto', 'aprire', 'aperto'], ['chiudere', 'chiuso', 'prendere', 'preso'], ['mettere', 'messo', 'chiedere', 'chiesto'], ['rispondere', 'risposto', 'scegliere', 'scelto'], ['nascere', 'nato', 'morire', 'morto'], ['venire', 'venuto', 'perdere', 'perso']] }, examples: [
          { ro: 'Ho fatto una passeggiata.', ru: 'Погулял / совершил прогулку.' },
          { ro: 'Hai detto la verità?', ru: 'Ты сказал правду?' },
          { ro: 'Abbiamo letto tutto il libro.', ru: 'Прочитали всю книгу.' },
          { ro: 'Ho scelto il menu fisso.', ru: 'Я выбрал комплексный обед.' },
          { ro: 'È nato a Roma nel 1990.', ru: 'Родился в Риме в 1990 году.' },
          { ro: 'Cosa ti hanno chiesto?', ru: 'О чём тебя спросили?' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. ГЛАГОЛЫ. IMPERFETTO
  // ─────────────────────────────────────────────
  {
    id: 'verbs-imperfetto',
    title: 'Глаголы. Imperfetto',
    icon: '🌅',
    description: 'Описание, фон, повторяющееся прошлое',
    sections: [
      { id: 'imperfetto-formation', title: 'Образование imperfetto', body: 'Все три группы добавляют окончания к основе: -are → -avo/-avi/-ava/-avamo/-avate/-avano; -ere и -ire → -evo/-evi/-eva/-evamo/-evate/-evano / -ivo/-ivi/-iva/-ivamo/-ivate/-ivano. Essere — полностью нерегулярный (ero/eri/era…). Fare→facevo, dire→dicevo, bere→bevevo.', table: { headers: ['', '-are (parlare)', '-ere (vedere)', '-ire (dormire)', 'essere'], rows: [['io', 'parlavo', 'vedevo', 'dormivo', 'ero'], ['tu', 'parlavi', 'vedevi', 'dormivi', 'eri'], ['lui/lei', 'parlava', 'vedeva', 'dormiva', 'era'], ['noi', 'parlavamo', 'vedevamo', 'dormivamo', 'eravamo'], ['voi', 'parlavate', 'vedevate', 'dormivate', 'eravate'], ['loro', 'parlavano', 'vedevano', 'dormivano', 'erano']] }, examples: [
          { ro: 'Da bambino abitavo in campagna.', ru: 'В детстве я жил в деревне.', note: 'описание прошлого' },
          { ro: 'Ogni estate andavamo al mare.', ru: 'Каждое лето мы ехали к морю.', note: 'повторяющееся действие' },
          { ro: 'Era tardi e faceva freddo.', ru: 'Было поздно и холодно.', note: 'фон' },
          { ro: 'Facevo il professore.', ru: 'Я работал учителем.', note: 'fare → facevo' },
          { ro: 'Bevevano molto vino.', ru: 'Они много пили вина.', note: 'bere → bevevano' },
          { ro: 'Non capivo niente.', ru: 'Я ничего не понимал.' },
        ] },
      { id: 'imperfetto-vs-pp', title: 'Imperfetto vs passato prossimo — когда что', body: 'Imperfetto — фон, описание, состояние, привычка, незавершённое действие. Passato prossimo — конкретное завершённое событие, прерывающее действие. Классическая комбинация: stavo + gerundio (imperfetto) + quando + passato prossimo.', examples: [
          { ro: 'Leggevo quando è squillato il telefono.', ru: 'Читал, когда зазвонил телефон.', note: 'imperfetto = фон; PP = событие' },
          { ro: 'Da piccola suonavo il pianoforte.', ru: 'В детстве я играла на пианино.', note: 'привычка — imperfetto' },
          { ro: 'Ieri ho studiato per tre ore.', ru: 'Вчера учился три часа.', note: 'конкретный факт — PP' },
          { ro: 'Aveva sonno, quindi è andato a letto.', ru: 'Хотел спать, поэтому лёг.', note: 'состояние + действие' },
          { ro: 'Mentre mangiavo, è arrivato un messaggio.', ru: 'Пока ел, пришло сообщение.', note: 'mentre + imperfetto' },
          { ro: 'Com\'era il tempo? — Faceva caldo.', ru: 'Какая была погода? — Было жарко.', note: 'описание — imperfetto' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 9. ГЛАГОЛЫ. PASSATO REMOTO
  // ─────────────────────────────────────────────
  {
    id: 'verbs-passato-remoto',
    title: 'Глаголы. Passato remoto',
    icon: '🏛️',
    description: 'Историческое прошлое; региональная разница север/юг',
    sections: [
      { id: 'pr-formation', title: 'Образование', body: 'Правильные -are: parlai/-asti/-ò/-ammo/-aste/-arono. Правильные -ere: vendei (или vendetti)/-esti/-é (или -ette)/-emmo/-este/-erono. Правильные -ire: dormii/-isti/-ì/-immo/-iste/-irono. Многие частые глаголы нерегулярны.', table: { headers: ['', '-are (parlare)', '-ire (dormire)'], rows: [['io', 'parlai', 'dormii'], ['tu', 'parlasti', 'dormisti'], ['lui/lei', 'parlò', 'dormì'], ['noi', 'parlammo', 'dormimmo'], ['voi', 'parlaste', 'dormiste'], ['loro', 'parlarono', 'dormirono']] }, examples: [
          { ro: 'Dante nacque a Firenze nel 1265.', ru: 'Данте родился во Флоренции в 1265 году.' },
          { ro: 'I Romani costruirono molte strade.', ru: 'Римляне построили много дорог.' },
          { ro: 'La guerra finì nel 1945.', ru: 'Война закончилась в 1945 году.' },
          { ro: 'Galileo morì nel 1642.', ru: 'Галилей умер в 1642 году.' },
          { ro: 'Parlai con lui solo una volta.', ru: 'Я разговаривал с ним только раз.', note: 'или passato prossimo на севере' },
          { ro: 'Partirono all\'alba.', ru: 'Они уехали на рассвете.' },
        ] },
      { id: 'pr-irregular', title: 'Нерегулярные формы', body: 'У нерегулярных глаголов особая основа для 1 ед. и 3 ед./мн. (сильные лица), а 2 ед., 1/2 мн. — правильные. Модель: feci/facesti/fece/facemmo/faceste/fecero.', table: { headers: ['Инфинитив', '1 ед.', '3 ед.', '3 мн.'], rows: [['essere', 'fui', 'fu', 'furono'], ['avere', 'ebbi', 'ebbe', 'ebbero'], ['fare', 'feci', 'fece', 'fecero'], ['venire', 'venni', 'venne', 'vennero'], ['vedere', 'vidi', 'vide', 'videro'], ['leggere', 'lessi', 'lesse', 'lessero'], ['scrivere', 'scrissi', 'scrisse', 'scrissero'], ['dire', 'dissi', 'disse', 'dissero'], ['stare', 'stetti', 'stette', 'stettero']] }, examples: [
          { ro: 'Fui molto sorpreso.', ru: 'Я был очень удивлён.', note: 'essere → fui' },
          { ro: 'Non disse nulla.', ru: 'Он ничего не сказал.', note: 'dire → disse' },
          { ro: 'Vennero da tutta Italia.', ru: 'Они приехали со всей Италии.', note: 'venire → vennero' },
          { ro: 'Stetti a letto per una settimana.', ru: 'Провёл неделю в постели.', note: 'stare → stetti' },
          { ro: 'Lesse il discorso.', ru: 'Он прочитал речь.', note: 'leggere → lesse' },
          { ro: 'Videro la luce alla fine del tunnel.', ru: 'Увидели свет в конце тоннеля.' },
        ] },
      { id: 'pr-vs-pp', title: 'Passato remoto vs passato prossimo — регионы и контекст', body: 'Региональное различие: на севере Италии passato prossimo употребляется для всего прошлого. На юге и в центре passato remoto — для далёкого и завершённого прошлого. В письменном литературном языке: passato remoto для исторических событий и нарратива, passato prossimo для личного опыта.', examples: [
          { ro: 'Napoleone nacque in Corsica. (letterario)', ru: 'Наполеон родился на Корсике.', note: 'исторический факт — passato remoto' },
          { ro: 'Stamattina ho perso le chiavi. (nord)', ru: 'Сегодня утром я потерял ключи.', note: 'личный опыт на севере — PP' },
          { ro: 'Stamattina persi le chiavi. (sud)', ru: 'То же самое на юге — passato remoto.', note: 'региональный вариант' },
          { ro: 'Roma fu fondata nell\'VIII secolo a.C.', ru: 'Рим был основан в VIII веке до н.э.', note: 'история → passato remoto везде' },
          { ro: 'Non ho mai capito perché. (nord/centre)', ru: 'Я так и не понял, почему.', note: 'mai с PP — на севере норма' },
          { ro: 'Non capii mai perché. (sud/letterario)', ru: 'То же — на юге или в лит. тексте.' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 10. ГЛАГОЛЫ. TRAPASSATO PROSSIMO
  // ─────────────────────────────────────────────
  {
    id: 'verbs-trapassato',
    title: 'Trapassato prossimo',
    icon: '⏪',
    description: 'Предпрошедшее — действие до другого в прошлом',
    sections: [
      { id: 'trapassato-formation', title: 'Образование', body: 'avevo/ero (imperfetto вспомогательного) + participio passato. Выбор essere/avere по тем же правилам, что в passato prossimo. С essere причастие согласуется с подлежащим.', examples: [
          { ro: 'avevo mangiato, avevi dormito', ru: 'я поел, ты поспал', note: 'avere: причастие неизменяемо' },
          { ro: 'ero andato/andata, eravamo partiti', ru: 'я пошёл(шла), мы уехали', note: 'essere: причастие согласуется' },
          { ro: 'avevo già finito', ru: 'я уже закончил' },
          { ro: 'era appena uscita', ru: 'она только что вышла', note: 'appena — только что' },
          { ro: 'avevano studiato tutta la notte', ru: 'они учились всю ночь' },
          { ro: 'ero rimasto solo', ru: 'я остался один', note: 'rimanere → essere' },
        ] },
      { id: 'trapassato-usage', title: 'Употребление с dopo che, quando, appena', body: 'Trapassato выражает действие, завершившееся до другого прошедшего действия. Типичные союзы: dopo che (после того как), quando (когда), appena (как только), già (уже), non ancora (ещё не).', examples: [
          { ro: 'Dopo che aveva mangiato, uscì.', ru: 'После того как поел, вышел.', note: 'dopo che + trapassato' },
          { ro: 'Quando siamo arrivati, erano già partiti.', ru: 'Когда мы приехали, они уже уехали.', note: 'già подчёркивает предшествование' },
          { ro: 'Appena era entrata, suonò il telefono.', ru: 'Только она вошла, зазвонил телефон.', note: 'appena + trapassato' },
          { ro: 'Non avevo mai visto il mare prima.', ru: 'Я никогда раньше не видел моря.' },
          { ro: 'Avevo già sentito quella storia.', ru: 'Я уже слышал эту историю.' },
          { ro: 'Era dimagrita perché aveva smesso di mangiare.', ru: 'Она похудела, потому что перестала есть.' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 11. ГЛАГОЛЫ. FUTURO
  // ─────────────────────────────────────────────
  {
    id: 'verbs-future',
    title: 'Глаголы. Futuro',
    icon: '⏭️',
    description: 'Futuro semplice и futuro anteriore',
    sections: [
      { id: 'futuro-semplice', title: 'Futuro semplice', body: 'Глаголы -are и -ere теряют финальную -e инфинитива, -are меняет -a- → -e-; добавляются окончания: -ò/-ai/-à/-emo/-ete/-anno. Глаголы -ire: добавляют окончания к основе без изменений. Глаголы на -care/-gare добавляют h: cercherò, pagherò.', table: { headers: ['', 'parlare', 'vedere', 'dormire'], rows: [['io', 'parlerò', 'vedrò', 'dormirò'], ['tu', 'parlerai', 'vedrai', 'dormirai'], ['lui/lei', 'parlerà', 'vedrà', 'dormirà'], ['noi', 'parleremo', 'vedremo', 'dormiremo'], ['voi', 'parlerete', 'vedrete', 'dormirete'], ['loro', 'parleranno', 'vedranno', 'dormiranno']] }, examples: [
          { ro: 'Domani andrò dal medico.', ru: 'Завтра пойду к врачу.' },
          { ro: 'Finirò il progetto entro venerdì.', ru: 'Закончу проект к пятнице.' },
          { ro: 'Verrò appena posso.', ru: 'Приду как только смогу.', note: 'venire → verrò (нерегул.)' },
          { ro: 'Pagherò io.', ru: 'Я заплачу.', note: 'pagare → pagherò (h для сохр. звука)' },
          { ro: 'Saranno le tre.', ru: 'Наверное, сейчас около трёх.', note: 'futuro для предположения' },
          { ro: 'Se studie, supererà l\'esame.', ru: 'Если будет учиться, сдаст экзамен.' },
        ] },
      { id: 'futuro-irregular', title: 'Нерегулярные основы', body: 'Нерегулярные глаголы теряют гласную основы или меняют её; окончания стандартные (-ò/-ai/-à/-emo/-ete/-anno).', table: { headers: ['Инфинитив', 'Основа fut.', 'Инфинитив', 'Основа fut.'], rows: [['essere', 'sar-', 'avere', 'avr-'], ['andare', 'andr-', 'fare', 'far-'], ['dare', 'dar-', 'stare', 'star-'], ['venire', 'verr-', 'volere', 'vorr-'], ['potere', 'potr-', 'dovere', 'dovr-'], ['sapere', 'sapr-', 'vedere', 'vedr-'], ['vivere', 'vivr-', 'rimanere', 'rimarr-'], ['tenere', 'terr-', 'bere', 'berr-']] }, examples: [
          { ro: 'Sarò lì alle nove.', ru: 'Буду там в девять.', note: 'essere → sarò' },
          { ro: 'Avrò bisogno di aiuto.', ru: 'Мне понадобится помощь.', note: 'avere → avrò' },
          { ro: 'Verrò a prenderti.', ru: 'Приеду за тобой.', note: 'venire → verrò' },
          { ro: 'Vorrei un caffè. (condizionale)', ru: 'Я бы хотел кофе.', note: 'volere: cond. vorrei — та же основа' },
          { ro: 'Dovrò studiare di più.', ru: 'Придётся больше учиться.', note: 'dovere → dovrò' },
          { ro: 'Rimarremo qui per sempre.', ru: 'Останемся здесь навсегда.', note: 'rimanere → rimarrò' },
        ] },
      { id: 'futuro-anteriore', title: 'Futuro anteriore — будущее до другого будущего', body: 'avrò/sarò (futuro semplice вспомогательного) + participio passato. Выражает действие, которое завершится до другого будущего. Часто вводится союзами quando, appena, dopo che, se. Также используется для предположений о прошлом.', examples: [
          { ro: 'Quando avrò finito, ti chiamo.', ru: 'Когда закончу, позвоню тебе.', note: 'когда — в итальянском futuro, не presente' },
          { ro: 'Appena sarò arrivato, ti mando un messaggio.', ru: 'Как только приеду, пришлю сообщение.' },
          { ro: 'Dopo che avranno mangiato, usciranno.', ru: 'После того как поедят, выйдут.' },
          { ro: 'Sarà andato a dormire.', ru: 'Наверное, он уже лёг спать.', note: 'futuro ant. = предположение о прошлом' },
          { ro: 'Avrà avuto paura.', ru: 'Наверное, он испугался.' },
          { ro: 'Se avrà studiato, passerà l\'esame.', ru: 'Если (к тому времени) выучит — сдаст.' },
        ] },
      { id: 'futuro-probability', title: 'Futuro для выражения предположения в настоящем', body: 'Futuro semplice может выражать неуверенное предположение о текущей ситуации — аналог русского «наверное, должно быть». Это не будущее время, а модальное употребление. Futuro anteriore — то же самое для недавнего прошлого.', examples: [
          { ro: 'Saranno le tre. (= probabilmente sono le tre)', ru: 'Наверное, сейчас около трёх.' },
          { ro: 'Avrà quarant\'anni.', ru: 'Ему, наверное, лет сорок.' },
          { ro: 'Dove sarà il mio telefono?', ru: 'Куда же подевался мой телефон?' },
          { ro: 'Sarà stanco dopo il viaggio.', ru: 'Наверное, устал после дороги.' },
          { ro: 'Avrà dimenticato.', ru: 'Наверное, забыл.', note: 'futuro anteriore = предположение о прошлом' },
          { ro: 'Chi sarà a quest\'ora?', ru: 'Кто это может быть в такое время?' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 12. ГЛАГОЛЫ. CONDIZIONALE
  // ─────────────────────────────────────────────
  {
    id: 'verbs-condizionale',
    title: 'Condizionale',
    icon: '🤔',
    description: 'Вежливость (vorrei), гипотезы, нереальное прошлое',
    sections: [
      { id: 'cond-presente', title: 'Condizionale presente — образование', body: 'Та же нерегулярная основа, что у futuro; окончания: -ei/-esti/-ebbe/-emmo/-este/-ebbero. Нерегулярные: sarei, avrei, andrei, farei, verrei, vorrei, potrei, dovrei, saprei, vedrei.', table: { headers: ['', 'parlare', 'essere', 'avere'], rows: [['io', 'parlerei', 'sarei', 'avrei'], ['tu', 'parleresti', 'saresti', 'avresti'], ['lui/lei', 'parlerebbe', 'sarebbe', 'avrebbe'], ['noi', 'parleremmo', 'saremmo', 'avremmo'], ['voi', 'parlereste', 'sareste', 'avreste'], ['loro', 'parlerebbero', 'sarebbero', 'avrebbero']] }, examples: [
          { ro: 'Vorrei un caffè, per favore.', ru: 'Я бы хотел кофе, пожалуйста.', note: 'volere: вежливая просьба' },
          { ro: 'Potrei avere il conto?', ru: 'Можно мне счёт?', note: 'potere: вежливый вопрос' },
          { ro: 'Dovresti studiare di più.', ru: 'Тебе стоило бы больше учиться.', note: 'dovere: мягкий совет' },
          { ro: 'Sarebbe bello andare al mare.', ru: 'Было бы здорово поехать к морю.' },
          { ro: 'Mangerei volentieri una pizza.', ru: 'Я бы с удовольствием съел пиццу.' },
          { ro: 'Cosa faresti al mio posto?', ru: 'Что бы ты сделал на моём месте?' },
        ] },
      { id: 'cond-presente-use', title: 'Употребление: вежливость и гипотезы', body: 'Condizionale presente используется: (1) вежливая просьба или предложение (vorrei, potrei, dovrei); (2) гипотетическое следствие (в паре с se + congiuntivo imperfetto); (3) мягкий совет (dovresti); (4) цитирование чужих слов или непроверенных данных.', examples: [
          { ro: 'Verrei, ma sono stanco.', ru: 'Пришёл бы, но я устал.', note: 'гипотеза без явного si' },
          { ro: 'Se avessi soldi, comprerei una casa.', ru: 'Если бы были деньги, купил бы дом.', note: 'se + cong. imperf. → condiz. presente' },
          { ro: 'Potresti aprire la finestra?', ru: 'Не мог бы ты открыть окно?', note: 'вежливая просьба' },
          { ro: 'Secondo i giornali, sarebbe colpevole.', ru: 'По данным газет, он якобы виновен.', note: 'цитирование / непровер. инфо' },
          { ro: 'Io al tuo posto non lo farei.', ru: 'На твоём месте я бы этого не сделал.', note: 'совет / гипотеза' },
          { ro: 'Vorreste qualcosa da bere?', ru: 'Хотите что-нибудь выпить?', note: 'вежливое предложение' },
        ] },
      { id: 'cond-passato', title: 'Condizionale passato — нереальное прошлое', body: 'avrei/sarei (condizionale presente вспомогательного) + participio passato. Выражает действие, которое могло бы произойти в прошлом, но не произошло. В паре с se + congiuntivo trapassato.', examples: [
          { ro: 'Se avessi studiato, avrei superato l\'esame.', ru: 'Если бы учился, сдал бы экзамен.', note: 'нереальное прошлое: cong. trapass. → cond. passato' },
          { ro: 'Avrei voluto venire, ma non potevo.', ru: 'Я хотел бы прийти, но не мог.' },
          { ro: 'Sarei andato al mare, ma ha piovuto.', ru: 'Поехал бы к морю, но шёл дождь.' },
          { ro: 'Avresti dovuto dirmelo prima!', ru: 'Надо было сказать мне раньше!', note: 'упрёк' },
          { ro: 'Chi lo avrebbe detto!', ru: 'Кто бы мог подумать!', note: 'риторическое восклицание' },
          { ro: 'Senza di te non ce l\'avrei fatta.', ru: 'Без тебя я бы не справился.' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 13. ГЛАГОЛЫ. CONGIUNTIVO
  // ─────────────────────────────────────────────
  {
    id: 'verbs-congiuntivo',
    title: 'Congiuntivo',
    icon: '🔀',
    description: 'Presente, passato, imperfetto, trapassato — и когда какой',
    sections: [
      { id: 'cong-presente', title: 'Congiuntivo presente — образование', body: '-are → -i/-i/-i/-iamo/-iate/-ino; -ere → -a/-a/-a/-iamo/-iate/-ano; -ire → -a/-a/-a/-iamo/-iate/-ano (или -isca/-isca/-isca/-iamo/-iate/-iscano для -isc- глаголов). Нерегулярные: sia, abbia, vada, faccia, dica, venga, voglia, possa, sappia, stia.', table: { headers: ['', 'parlare', 'vedere', 'finire'], rows: [['io/tu/lui', 'parli', 'veda', 'finisca'], ['noi', 'parliamo', 'vediamo', 'finiamo'], ['voi', 'parliate', 'vediate', 'finiate'], ['loro', 'parlino', 'vedano', 'finiscano']] }, examples: [
          { ro: 'Spero che tu venga.', ru: 'Надеюсь, что ты придёшь.', note: 'venire → venga' },
          { ro: 'Voglio che tu sia onesto.', ru: 'Хочу, чтобы ты был честным.', note: 'essere → sia' },
          { ro: 'Penso che abbia ragione.', ru: 'Думаю, что он прав.', note: 'avere → abbia' },
          { ro: 'È importante che tu lo sappia.', ru: 'Важно, чтобы ты это знал.', note: 'sapere → sappia' },
          { ro: 'Sebbene faccia freddo, esco lo stesso.', ru: 'Хотя и холодно, всё равно выхожу.', note: 'fare → faccia; sebbene требует congiuntivo' },
          { ro: 'Bisogna che parliate con lui.', ru: 'Нужно, чтобы вы поговорили с ним.' },
        ] },
      { id: 'cong-triggers', title: 'После каких глаголов и выражений', body: 'Congiuntivo требуется после: глаголов мнения (pensare, credere, sperare, dubitare, immaginare); желания/воли (volere, desiderare, preferire — при разных субъектах); эмоции (essere felice/triste che); безличных конструкций (è necessario/possibile/strano/bene che); союзов (sebbene, benché, nonostante, affinché, prima che, a meno che).', examples: [
          { ro: 'Credo che sia tardi.', ru: 'Думаю, что уже поздно.', note: 'credere + congiuntivo' },
          { ro: 'È strano che non abbia chiamato.', ru: 'Странно, что не позвонил.', note: 'безличное + congiuntivo' },
          { ro: 'Nonostante piova, andiamo.', ru: 'Несмотря на дождь, идём.', note: 'nonostante + cong.' },
          { ro: 'Ti dico prima che tu parta.', ru: 'Скажу тебе до твоего отъезда.', note: 'prima che + cong.' },
          { ro: 'Affinché tutto vada bene, prepariamoci.', ru: 'Чтобы всё прошло хорошо, подготовимся.', note: 'affinché + cong.' },
          { ro: 'Sono contento che tu sia qui.', ru: 'Рад, что ты здесь.', note: 'эмоция + congiuntivo' },
        ] },
      { id: 'cong-passato', title: 'Congiuntivo passato', body: 'abbia/sia (congiuntivo presente вспомогательного) + participio passato. Используется когда действие придаточного предшествует действию главного, а глагол в главном стоит в настоящем или будущем.', examples: [
          { ro: 'Credo che abbia già mangiato.', ru: 'Думаю, что он уже поел.', note: 'действие придаточного — раньше' },
          { ro: 'Sono contento che tu sia venuto.', ru: 'Рад, что ты пришёл.' },
          { ro: 'Mi dispiace che non abbiate potuto partecipare.', ru: 'Жаль, что вы не смогли участвовать.' },
          { ro: 'È possibile che sia partita senza salutare.', ru: 'Возможно, она ушла, не попрощавшись.', note: 'partire → essere → sia partita' },
          { ro: 'Dubito che lo abbia fatto apposta.', ru: 'Сомневаюсь, что он сделал это специально.' },
          { ro: 'Benché abbia studiato, non ha capito.', ru: 'Хотя и учился, не понял.' },
        ] },
      { id: 'cong-imperfetto', title: 'Congiuntivo imperfetto', body: 'Окончания: -are → -assi/-assi/-asse/-assimo/-aste/-assero; -ere → -essi/-essi/-esse/-essimo/-este/-essero; -ire → -issi/-issi/-isse/-issimo/-iste/-issero. Essere: fossi/fossi/fosse/fossimo/foste/fossero. Используется в гипотетических конструкциях (se + congiuntivo imperfetto → condizionale presente).', examples: [
          { ro: 'Se avessi tempo, studierei il giapponese.', ru: 'Если бы было время, учил бы японский.', note: 'se + cong. imperf. → condiz. presente' },
          { ro: 'Vorrei che tu fossi qui.', ru: 'Хотел бы, чтобы ты был здесь.', note: 'volere che + cong. (глав. в condiz.)' },
          { ro: 'Sebbene parlasse poco, capiva tutto.', ru: 'Хотя говорил мало, всё понимал.', note: 'sebbene + cong. imperf. (оба действия в прош.)' },
          { ro: 'Credevo che fosse francese.', ru: 'Думал, что он/она француз(ка).', note: 'главный в прош. → cong. imperf.' },
          { ro: 'Speravo che arrivasse in tempo.', ru: 'Надеялся, что приедет вовремя.' },
          { ro: 'Magari potessi restare!', ru: 'Вот если бы мог остаться!', note: 'magari + cong. — желание' },
        ] },
      { id: 'cong-trapassato', title: 'Congiuntivo trapassato', body: 'avessi/fossi (congiuntivo imperfetto вспомогательного) + participio passato. Используется в нереальных прошедших конструкциях: se + congiuntivo trapassato → condizionale passato.', examples: [
          { ro: 'Se avessi studiato, avrei passato l\'esame.', ru: 'Если бы учился, сдал бы экзамен.', note: 'нереальное прошлое' },
          { ro: 'Se fosse partita prima, avrebbe preso il treno.', ru: 'Если бы вышла раньше, успела бы на поезд.', note: 'essere → fossi partita' },
          { ro: 'Credevo che avesse già finito.', ru: 'Думал, что он уже закончил.', note: 'главный в прош. + действие придаточного ещё раньше' },
          { ro: 'Nonostante avesse lavorato tanto, non era soddisfatto.', ru: 'Хотя много работал, не был доволен.' },
          { ro: 'Speravo che fosse già partito.', ru: 'Надеялся, что он уже уехал.' },
          { ro: 'Magari avessi saputo prima!', ru: 'Вот если бы знал раньше!', note: 'magari + cong. trapassato' },
        ] },
      { id: 'cong-sequence', title: 'Согласование времён в congiuntivo', body: 'Выбор времени congiuntivo зависит от времени глагола в главном предложении и от временно́го соотношения действий.', table: { headers: ['Главный глагол', 'Одновременно/после', 'До'], rows: [['наст./буд. (penso che)', 'cong. presente', 'cong. passato'], ['прошедшее (pensavo che)', 'cong. imperfetto', 'cong. trapassato']] }, examples: [
          { ro: 'Penso che venga. / Penso che sia venuto.', ru: 'Думаю, что придёт. / Думаю, что пришёл.' },
          { ro: 'Pensavo che venisse. / Pensavo che fosse venuto.', ru: 'Думал, что придёт. / Думал, что пришёл.' },
          { ro: 'Spero che tu stia bene.', ru: 'Надеюсь, что ты в порядке.', note: 'одновременно с наст. → cong. presente' },
          { ro: 'Speravo che stesse bene.', ru: 'Надеялся, что он в порядке.', note: 'одновременно с прош. → cong. imperf.' },
          { ro: 'È bello che tu sia venuto.', ru: 'Хорошо, что ты пришёл.', note: 'прошедшее относительно наст. → cong. passato' },
          { ro: 'Era bello che fossi venuto.', ru: 'Было хорошо, что ты пришёл.', note: 'прошедшее относительно прошлого → cong. trapassato' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 14. PERIODO IPOTETICO
  // ─────────────────────────────────────────────
  {
    id: 'periodo-ipotetico',
    title: 'Periodo ipotetico',
    icon: '🔮',
    description: 'Три типа условных: реальное, возможное, нереальное',
    sections: [
      { id: 'ipot-reale', title: 'Реальное: se + indicativo', body: 'Условие выполнимо или вероятно. Se + presente indicativo → presente/futuro indicativo. Реальный тип — это просто констатация зависимости между событиями.', examples: [
          { ro: 'Se piove, resto a casa.', ru: 'Если дождь — остаюсь дома.', note: 'presente → presente' },
          { ro: 'Se hai fame, mangia qualcosa.', ru: 'Если голоден — поешь что-нибудь.', note: 'presente → imperativo' },
          { ro: 'Se finisci presto, vieni con noi.', ru: 'Если закончишь рано — иди с нами.' },
          { ro: 'Se studi, passerai l\'esame.', ru: 'Если будешь учиться, сдашь экзамен.', note: 'presente → futuro' },
          { ro: 'Se fa caldo, andiamo al mare.', ru: 'Если жарко — едем к морю.' },
          { ro: 'Se non sai la risposta, chiedi.', ru: 'Если не знаешь ответа — спроси.' },
        ] },
      { id: 'ipot-possibile', title: 'Возможное: se + congiuntivo imperfetto / condizionale', body: 'Условие маловероятно или гипотетично в настоящем/будущем. Se + congiuntivo imperfetto → condizionale presente. Говорящий считает событие возможным, но не ожидаемым.', examples: [
          { ro: 'Se avessi soldi, comprerei una moto.', ru: 'Если бы были деньги, купил бы мотоцикл.', note: 'cong. imperf. + condiz. presente' },
          { ro: 'Se potessi, vivrei in Italia.', ru: 'Если бы мог, жил бы в Италии.' },
          { ro: 'Se parlassi meglio l\'italiano, troverei lavoro.', ru: 'Если бы говорил лучше по-итальянски, нашёл бы работу.' },
          { ro: 'Se fossi in te, chiederei scusa.', ru: 'На твоём месте я попросил бы прощения.', note: 'essere → fossi' },
          { ro: 'Cosa faresti se vincessi alla lotteria?', ru: 'Что бы ты сделал, если бы выиграл в лотерею?' },
          { ro: 'Se non lavorasse tanto, starebbe meglio.', ru: 'Если бы не работал так много, чувствовал бы себя лучше.' },
        ] },
      { id: 'ipot-irreale', title: 'Нереальное прошлое: se + congiuntivo trapassato / condizionale passato', body: 'Условие не выполнилось в прошлом. Se + congiuntivo trapassato → condizionale passato. Выражает сожаление или упрёк о нереализованной возможности.', examples: [
          { ro: 'Se avessi studiato, avrei passato l\'esame.', ru: 'Если бы учился, сдал бы экзамен.', note: 'cong. trapassato + condiz. passato' },
          { ro: 'Se fosse partita prima, non avrebbe perso il treno.', ru: 'Если бы вышла раньше, не опоздала бы на поезд.' },
          { ro: 'Se avesse mangiato, non avrebbe avuto fame.', ru: 'Если бы поел, не был бы голоден.' },
          { ro: 'Se me lo avessi detto, ti avrei aiutato.', ru: 'Если бы сказал мне, я бы помог тебе.' },
          { ro: 'Se non avesse piovuto, saremmo andati al mare.', ru: 'Если бы не шёл дождь, поехали бы к морю.' },
          { ro: 'Avresti dovuto dirmelo! (senza se)', ru: 'Надо было мне сказать!', note: 'condiz. passato без se — упрёк' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 15. ГЛАГОЛЫ. IMPERATIVO
  // ─────────────────────────────────────────────
  {
    id: 'imperative',
    title: 'Imperativo',
    icon: '📢',
    description: 'Tu/voi/Lei, отрицательный (non + infinito для tu)',
    sections: [
      { id: 'imp-formation', title: 'Образование для tu/voi/noi', body: 'Tu: -are → основа без -are (parla!); -ere → основа без -ere (prendi!); -ire → основа без -ire (parti! / finisci!). Voi: форма совпадает с presente indicativo. Noi: форма совпадает с presente indicativo (давайте сделаем). Нерегулярные tu: va\'/vai!, da\'/dai!, fa\'/fai!, sta\'/stai!, di\'!', table: { headers: ['', 'tu', 'voi', 'noi'], rows: [['parlare', 'parla!', 'parlate!', 'parliamo!'], ['vedere', 'vedi!', 'vedete!', 'vediamo!'], ['finire', 'finisci!', 'finite!', 'finiamo!'], ['andare', "va'!/vai!", 'andate!', 'andiamo!'], ['fare', "fa'!/fai!", 'fate!', 'facciamo!'], ['dire', "di'!", 'dite!', 'diciamo!']] }, examples: [
          { ro: 'Parla più lentamente!', ru: 'Говори медленнее!', note: 'tu, -are глагол' },
          { ro: 'Prendete un caffè!', ru: 'Выпейте кофе!', note: 'voi' },
          { ro: 'Andiamo!', ru: 'Пойдём! / Идём!', note: 'noi — приглашение' },
          { ro: 'Dimmi la verità!', ru: 'Скажи мне правду!', note: 'di\' + mi → dimmi' },
          { ro: 'Fai attenzione!', ru: 'Будь внимателен!', note: 'fare внимание — устойчивое' },
          { ro: 'Va\' a casa!', ru: 'Иди домой!', note: 'andare: va\' или vai' },
        ] },
      { id: 'imp-formal', title: 'Вежливое Lei — из congiuntivo', body: 'Императив для вежливого Lei совпадает с congiuntivo presente 3-го лица ед.ч. Для -are глаголов: -i (parli!), для -ere и -ire: -a (prenda!, venga!, finisca!). Нерегулярные: sia!, abbia!, vada!, faccia!, dica!, venga!', examples: [
          { ro: 'Parli più lentamente, per favore.', ru: 'Пожалуйста, говорите медленнее.', note: 'вежл. Lei: parlare → parli' },
          { ro: 'Prenda pure un posto.', ru: 'Садитесь, пожалуйста.', note: 'prendere → prenda; pure = пожалуйста' },
          { ro: 'Venga con me.', ru: 'Пройдите со мной.', note: 'venire → venga' },
          { ro: 'Mi dica.', ru: 'Слушаю вас. / Говорите.', note: 'dire → dica; устойчивое' },
          { ro: 'Aspetti un momento.', ru: 'Подождите минуту.', note: 'aspettare → aspetti' },
          { ro: 'Entri pure!', ru: 'Входите!', note: 'entrare → entri; pure = пожалуйста' },
        ] },
      { id: 'imp-negative', title: 'Отрицательный: non + infinito (tu), non + forma (остальные)', body: 'Для tu отрицательный императив строится через non + инфинитив (не форму!). Для voi, noi, Lei — non + обычная форма императива.', examples: [
          { ro: 'Non parlare così!', ru: 'Не говори так!', note: 'tu: non + infinito' },
          { ro: 'Non andate via!', ru: 'Не уходите!', note: 'voi: non + imperativo' },
          { ro: 'Non facciamo tardi.', ru: 'Не опаздываем. / Не будем опаздывать.', note: 'noi: non + imperativo' },
          { ro: 'Non si preoccupi.', ru: 'Не беспокойтесь.', note: 'Lei: non + congiuntivo' },
          { ro: 'Non dimenticare di chiamare.', ru: 'Не забудь позвонить.', note: 'tu: non + infinito' },
          { ro: 'Non toccare niente!', ru: 'Ничего не трогай!', note: 'tu: non + infinito' },
        ] },
      { id: 'imp-pronouns', title: 'Местоимения при imperativo', body: 'При утвердительном императиве местоимения присоединяются к глаголу в виде суффикса. При односложных формах (va\', da\', fa\', sta\', di\') начальная согласная местоимения удваивается (кроме gli). При отрицательном (non + infinito) местоимение может стоять перед или присоединиться к инфинитиву.', examples: [
          { ro: 'Dimmi la verità!', ru: 'Скажи мне правду!', note: 'di\' + mi → dimmi (удвоение m)' },
          { ro: 'Dallo a me!', ru: 'Дай это мне!', note: 'da\' + lo → dallo (удвоение l)' },
          { ro: 'Facci sapere.', ru: 'Дай нам знать.', note: 'fa\' + ci → facci' },
          { ro: 'Dagli il libro!', ru: 'Дай ему книгу!', note: 'da\' + gli → dagli (gli не удваивается)' },
          { ro: 'Mandamelo! / Non mandarmelo!', ru: 'Пришли мне это! / Не присылай мне это!' },
          { ro: 'Non dirlo! / Non lo dire!', ru: 'Не говори этого!', note: 'два варианта при non + infinito' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 16. ГЛАГОЛЫ. GERUNDIO
  // ─────────────────────────────────────────────
  {
    id: 'gerundio',
    title: 'Gerundio',
    icon: '🔄',
    description: 'Stare + gerundio, деепричастные обороты',
    sections: [
      { id: 'gerundio-formation', title: 'Образование gerundio presente и passato', body: 'Presente: -are → -ando, -ere/-ire → -endo. Нерегулярные: fare→facendo, dire→dicendo, bere→bevendo, porre→ponendo, tradurre→traducendo. Passato: avendo/essendo + participio passato (те же правила выбора essere/avere).', examples: [
          { ro: 'parlando, leggendo, dormendo', ru: 'говоря, читая, спя', note: 'presente: -ando/-endo' },
          { ro: 'facendo, dicendo, bevendo', ru: 'делая, говоря, пья', note: 'нерегулярные' },
          { ro: 'avendo mangiato', ru: 'поев / после того как поел', note: 'passato с avere' },
          { ro: 'essendo arrivato/a', ru: 'приехав / после того как приехал(а)', note: 'passato с essere' },
          { ro: 'avendo studiato tutta la notte', ru: 'проучившись всю ночь' },
          { ro: 'essendo partiti in anticipo', ru: 'уехав заранее', note: 'мн.ч. → particip. согласуется' },
        ] },
      { id: 'gerundio-stare', title: 'Stare + gerundio — действие в процессе', body: 'Stare (спрягается) + gerundio presente = действие, происходящее прямо сейчас или в определённый момент. Аналог русского «я сейчас читаю» (в отличие от «я читаю» = presente). В прошедшем: stavo + gerundio — «я читал в тот момент».', examples: [
          { ro: 'Sto mangiando.', ru: 'Я сейчас ем.', note: 'прямо сейчас' },
          { ro: 'Stai dormendo?', ru: 'Ты спишь? (сейчас)' },
          { ro: 'Stavamo guardando un film quando hai chiamato.', ru: 'Мы смотрели фильм, когда ты позвонил.', note: 'stare imperf. = процесс в прошлом' },
          { ro: 'Cosa stai facendo?', ru: 'Что ты сейчас делаешь?' },
          { ro: 'Sta piovendo.', ru: 'Идёт дождь (прямо сейчас).' },
          { ro: 'Stanno lavorando fino a tardi.', ru: 'Они работают допоздна (сейчас).' },
        ] },
      { id: 'gerundio-uses', title: 'Прочие употребления', body: 'Герундий без stare выражает: способ действия («как»), одновременность, причину, условие. Субъект герундия всегда совпадает с субъектом главного предложения. К герундию могут присоединяться местоимения.', examples: [
          { ro: 'Ho imparato l\'italiano guardando i film.', ru: 'Выучил итальянский, смотря фильмы.', note: 'способ' },
          { ro: 'Essendo stanco, sono andato a dormire.', ru: 'Так как был устал, лёг спать.', note: 'причина' },
          { ro: 'Studiando ogni giorno, migliorerai.', ru: 'Занимаясь каждый день, улучшишься.', note: 'условие' },
          { ro: 'Leggendolo, ho capito tutto.', ru: 'Читая его, я всё понял.', note: 'местоимение к герундию' },
          { ro: 'Pur avendo studiato, non ha capito.', ru: 'Хотя и учился, не понял.', note: 'pur + gerundio = хотя' },
          { ro: 'Sbagliando si impara.', ru: 'На ошибках учатся.', note: 'пословица: герундий = условие' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 17. ВОЗВРАТНЫЕ ГЛАГОЛЫ
  // ─────────────────────────────────────────────
  {
    id: 'reflexive',
    title: 'Возвратные глаголы',
    icon: '🪞',
    description: 'Mi/ti/si/ci/vi/si, в сложных временах — essere',
    sections: [
      { id: 'reflexive-present', title: 'Возвратные в presente', body: 'Возвратные частицы: mi/ti/si/ci/vi/si. Стоят перед спрягаемым глаголом или присоединяются к инфинитиву. Многие итальянские возвратные глаголы соответствуют обычным русским: alzarsi = вставать, svegliarsi = просыпаться.', table: { headers: ['', 'alzarsi (вставать)'], rows: [['io', 'mi alzo'], ['tu', 'ti alzi'], ['lui/lei', 'si alza'], ['noi', 'ci alziamo'], ['voi', 'vi alzate'], ['loro', 'si alzano']] }, examples: [
          { ro: 'Mi sveglio alle sette.', ru: 'Просыпаюсь в семь.' },
          { ro: 'Come ti chiami?', ru: 'Как тебя зовут?', note: 'chiamarsi — называться' },
          { ro: 'Si veste sempre elegante.', ru: 'Он/она всегда одевается элегантно.' },
          { ro: 'Ci vediamo domani.', ru: 'Увидимся завтра.', note: 'взаимное действие' },
          { ro: 'Voglio lavarmi le mani.', ru: 'Хочу помыть руки.', note: 'si → mi при инфинитиве' },
          { ro: 'Si siedono al tavolo.', ru: 'Они садятся за стол.', note: 'sedersi' },
        ] },
      { id: 'reflexive-passe', title: 'В passato prossimo — sempre essere', body: 'Все возвратные глаголы образуют passato prossimo с essere. Причастие согласуется с подлежащим. Возвратная частица стоит перед essere.', examples: [
          { ro: 'Mi sono alzato tardi.', ru: 'Я встал поздно.', note: 'м.р. → -o' },
          { ro: 'Si è svegliata alle sei.', ru: 'Она проснулась в шесть.', note: 'ж.р. → -a' },
          { ro: 'Ci siamo divertiti molto.', ru: 'Мы очень повеселились.', note: 'мн. м.р. → -i' },
          { ro: 'Si sono sposati l\'anno scorso.', ru: 'Они поженились в прошлом году.', note: 'мн. м.р. → -i' },
          { ro: 'Ti sei fatto male?', ru: 'Ты ушибся?', note: 'farsi male — ушибиться' },
          { ro: 'Vi siete incontrati?', ru: 'Вы встретились?', note: 'incontrarsi — встретиться' },
        ] },
      { id: 'reflexive-common', title: 'Частые возвратные глаголы', body: 'Многие итальянские возвратные глаголы обозначают повседневную рутину или эмоциональные состояния. Некоторые существуют только в возвратной форме (innamorarsi, vergognarsi).', table: { headers: ['Глагол', 'Перевод', 'Глагол', 'Перевод'], rows: [['alzarsi', 'вставать', 'svegliarsi', 'просыпаться'], ['vestirsi', 'одеваться', 'lavarsi', 'мыться'], ['pettinarsi', 'причёсываться', 'sedersi', 'садиться'], ['sentirsi', 'чувствовать себя', 'trovarsi', 'находиться'], ['innamorarsi', 'влюбляться', 'arrabbiarsi', 'злиться'], ['annoiarsi', 'скучать', 'divertirsi', 'веселиться'], ['preoccuparsi', 'беспокоиться', 'sbrigarsi', 'торопиться']] }, examples: [
          { ro: 'Mi sono innamorato di lei.', ru: 'Я влюбился в неё.', note: 'innamorarsi di — только возвратный' },
          { ro: 'Non ti arrabbiare!', ru: 'Не злись!', note: 'arrabbiarsi' },
          { ro: 'Mi annoio senza fare nulla.', ru: 'Мне скучно без дела.', note: 'annoiarsi' },
          { ro: 'Sbrigati, siamo in ritardo!', ru: 'Поторопись, мы опаздываем!', note: 'sbrigarsi' },
          { ro: 'Si sente male.', ru: 'Ему/ей плохо.', note: 'sentirsi male — чувствовать себя плохо' },
          { ro: 'Divertitevi!', ru: 'Веселитесь! Отдыхайте!', note: 'divertirsi — imperat. voi' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 18. ПАССИВНЫЙ ЗАЛОГ
  // ─────────────────────────────────────────────
  {
    id: 'passive',
    title: 'Пассивный залог',
    icon: '🔁',
    description: 'Essere + participio passato и si passivante',
    sections: [
      { id: 'passive-essere', title: 'Пассив с essere + participio', body: 'Essere (в нужном времени) + participio passato, согласованный с подлежащим. Агент вводится предлогом da. Конструкция акцентирует результат или состояние, а не действие.', examples: [
          { ro: 'Il romanzo è stato scritto da Calvino.', ru: 'Роман был написан Кальвино.', note: 'essere passato + da' },
          { ro: 'La porta è chiusa.', ru: 'Дверь закрыта.', note: 'stato/risultato — без da' },
          { ro: 'I biglietti vengono venduti online.', ru: 'Билеты продаются онлайн.', note: 'venire — действие в процессе' },
          { ro: 'La lettera è stata spedita ieri.', ru: 'Письмо было отправлено вчера.' },
          { ro: 'Il premio sarà assegnato domani.', ru: 'Премия будет вручена завтра.', note: 'essere nel futuro' },
          { ro: 'Le regole sono rispettate da tutti.', ru: 'Правила соблюдаются всеми.' },
        ] },
      { id: 'passive-si', title: 'Si passivante', body: 'Si + глагол 3-го лица: ед. число при ед. существительном, мн. при мн. Особенность итальянского: глагол согласуется с подлежащим-пациентом (а не фиксированно в 3 ед.). Часто используется в объявлениях, рецептах, инструкциях.', examples: [
          { ro: 'Si vende appartamento.', ru: 'Продаётся квартира.', note: 'ед.ч. → si vende' },
          { ro: 'Si vendono appartamenti.', ru: 'Продаются квартиры.', note: 'мн.ч. → si vendono' },
          { ro: 'Qui si parla italiano.', ru: 'Здесь говорят по-итальянски.', note: 'обобщённое действие' },
          { ro: 'Si aggiunge il sale alla fine.', ru: 'Соль добавляется в конце.', note: 'рецепт' },
          { ro: 'Si accettano carte di credito.', ru: 'Принимаются кредитные карты.', note: 'объявление' },
          { ro: 'Non si sa mai.', ru: 'Никогда не знаешь.', note: 'устойчивое выражение' },
        ] },
      { id: 'passive-venire', title: 'Пассив с venire (действие, не состояние)', body: 'Venire + participio подчёркивает динамичное действие (кто-то что-то делает), в отличие от essere + participio, которое может означать состояние. Venire используется только в простых временах (не в составных).', examples: [
          { ro: 'La porta viene chiusa ogni sera.', ru: 'Дверь закрывают каждый вечер.', note: 'venire = регулярное действие' },
          { ro: 'La porta è chiusa. (stato)', ru: 'Дверь закрыта. (состояние)', note: 'essere = результат/состояние' },
          { ro: 'I compiti vengono corretti dal professore.', ru: 'Домашние работы проверяются профессором.' },
          { ro: 'Il pacco verrà consegnato domani.', ru: 'Посылку доставят завтра.', note: 'futuro с venire' },
          { ro: 'Le leggi vengono rispettate.', ru: 'Законы соблюдаются.', note: 'акцент на действии' },
          { ro: 'Il museo viene visitato da migliaia di turisti.', ru: 'Музей посещают тысячи туристов.' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 19. БЕЗЛИЧНЫЕ КОНСТРУКЦИИ
  // ─────────────────────────────────────────────
  {
    id: 'impersonal',
    title: 'Безличные конструкции',
    icon: '👤',
    description: 'Si impersonale — si + глагол 3 л. ед. ч.',
    sections: [
      { id: 'impersonal-si', title: 'Si impersonale vs si passivante — разница', body: 'Si impersonale: si + глагол 3 ед. всегда, безличное «люди/один». Глагол всегда в ед.ч., прилагательное/причастие в мн.ч. м.р. Si passivante: si + глагол согласуется с подлежащим (ед./мн.). Иногда контекст один, но конструкции различны.', examples: [
          { ro: 'In Italia si mangia bene.', ru: 'В Италии хорошо едят.', note: 'si impersonale — всегда 3 ед.' },
          { ro: 'Quando si è stanchi, si dorme male.', ru: 'Когда устаёшь, плохо спишь.', note: 'si + essere → si è (не si sono)' },
          { ro: 'Si mangiano molte verdure in estate.', ru: 'Летом едят много овощей.', note: 'si passivante — мн.ч. → si mangiano' },
          { ro: 'Si diventa saggi con l\'esperienza.', ru: 'С опытом становишься мудрым.', note: 'impersonale + прилаг. мн.ч. м.р.' },
          { ro: 'Si parla italiano qui.', ru: 'Здесь говорят по-итальянски.', note: 'impersonale: italiano не подлеж.' },
          { ro: 'Si parlano tre lingue.', ru: 'Говорят на трёх языках.', note: 'passivante: tre lingue — подлежащее' },
        ] },
      { id: 'impersonal-bisogna', title: 'Bisogna, basta, è necessario…', body: 'Безличные конструкции + infinito (общее) или + che + congiuntivo (конкретный субъект). Bisogna и basta — простые безличные глаголы без подлежащего. È necessario/importante/possibile — безличные предикативы.', examples: [
          { ro: 'Bisogna studiare ogni giorno.', ru: 'Нужно учиться каждый день.', note: 'bisogna + infinito — обобщённо' },
          { ro: 'Bisogna che tu studi ogni giorno.', ru: 'Тебе нужно учиться каждый день.', note: 'bisogna che + congiuntivo — конкретный субъект' },
          { ro: 'Basta così!', ru: 'Хватит! Достаточно!', note: 'basta — самостоятельно' },
          { ro: 'Basta chiedere.', ru: 'Достаточно попросить.', note: 'basta + infinito' },
          { ro: 'È necessario prenotare in anticipo.', ru: 'Необходимо заранее забронировать.' },
          { ro: 'È vietato fumare.', ru: 'Курить запрещено.', note: 'è vietato — на табличках' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 20. VERBI PRONOMINALI
  // ─────────────────────────────────────────────
  {
    id: 'verbi-pronominali',
    title: 'Verbi pronominali',
    icon: '🧩',
    description: 'Farcela, andarsene, cavarsela — неразложимые глаголы с частицами',
    sections: [
      { id: 'vp-intro', title: 'Что такое verbi pronominali', body: 'Verbi pronominali — глаголы, неотделимо связанные с одной или двумя частицами (ci, ne, si). Частицы меняют или уточняют смысл глагола, образуя единицу с самостоятельным значением. Они спрягаются как возвратные, в passato prossimo — sempre essere.', examples: [
          { ro: 'farcela — ce la faccio', ru: 'справляться — я справляюсь', note: 'fare + ci + la' },
          { ro: 'andarsene — me ne vado', ru: 'уходить — я ухожу', note: 'andare + si + ne' },
          { ro: 'cavarsela — me la cavo', ru: 'выкручиваться — справляюсь как-то', note: 'cavare + si + la' },
          { ro: 'metterci — ci metto', ru: 'тратить время — трачу', note: 'mettere + ci' },
          { ro: 'volerci — ci vuole', ru: 'требоваться — требуется', note: 'volere + ci' },
          { ro: 'Non ce la faccio più!', ru: 'Больше не могу! Нет сил!', note: 'устойчивое выражение' },
        ] },
      { id: 'vp-common', title: 'Самые частые: farcela, andarsene, cavarsela, volerci, metterci', body: 'Каждый из этих глаголов нужно учить как лексическую единицу. Volerci и metterci различаются: volerci — сколько нужно объективно; metterci — сколько тратит конкретный человек.', table: { headers: ['Глагол', 'Значение', 'Пример'], rows: [['farcela', 'справляться, осилить', 'Ce la fai?'], ['andarsene', 'уходить, убираться', 'Me ne vado.'], ['cavarsela', 'выкручиваться, справляться', 'Me la cavo.'], ['volerci', 'требоваться (безлично)', 'Ci vuole un\'ora.'], ['metterci', 'тратить (субъект)', 'Ci metto due ore.'], ['fregarsene', 'наплевать, не волновать', 'Me ne frego.'], ['entrarci', 'иметь отношение', 'Non c\'entra niente.']] }, examples: [
          { ro: 'Non ce la faccio, è troppo difficile.', ru: 'Не справляюсь, слишком трудно.' },
          { ro: 'Me ne vado, è tardi.', ru: 'Ухожу, поздно.' },
          { ro: 'Quanto ci metti per arrivare? — Ci metto venti minuti.', ru: 'Сколько тебе добираться? — Минут двадцать.' },
          { ro: 'Non c\'entra niente con il problema.', ru: 'Это вообще не относится к делу.' },
          { ro: 'Ce la siamo cavata bene.', ru: 'Мы неплохо справились.', note: 'passato prossimo с essere' },
          { ro: 'Se ne sono andati senza salutare.', ru: 'Ушли, не попрощавшись.', note: 'andarsene: мн.ч. → se ne sono andati' },
        ] },
      { id: 'vp-conjugation', title: 'Спряжение и согласование', body: 'Частицы меняются по лицам. В passato prossimo — sempre essere, причастие согласуется с субъектом. При ci vuole/vogliono — согласование с тем, что нужно.', table: { headers: ['Лицо', 'farcela', 'andarsene', 'metterci'], rows: [['io', 'ce la faccio', 'me ne vado', 'ci metto'], ['tu', 'ce la fai', 'te ne vai', 'ci metti'], ['lui/lei', 'ce la fa', 'se ne va', 'ci mette'], ['noi', 'ce la facciamo', 'ce ne andiamo', 'ci mettiamo'], ['voi', 'ce la fate', 've ne andate', 'ci mettete'], ['loro', 'ce la fanno', 'se ne vanno', 'ci mettono']] }, examples: [
          { ro: 'Ce la fai da solo?', ru: 'Справишься сам?' },
          { ro: 'Se ne va sempre troppo presto.', ru: 'Он всегда уходит слишком рано.' },
          { ro: 'Ce la siamo fatta!', ru: 'Мы справились! (ж.р. или смеш.)', note: 'essere: причастие → -a при ж.р. субъекте' },
          { ro: 'Se ne sono andate tutte.', ru: 'Все ушли.', note: 'ж.р. мн. → andate' },
          { ro: 'Ci vogliono tre uova per questa ricetta.', ru: 'Для этого рецепта нужно три яйца.', note: 'volerci: мн. → ci vogliono' },
          { ro: 'Quanto ci avete messo?', ru: 'Сколько вы потратили времени?', note: 'metterci в PP с avere' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 21. КОНСТРУКЦИЯ «НРАВИТСЯ»
  // ─────────────────────────────────────────────
  {
    id: 'like',
    title: 'Конструкция «нравится»',
    icon: '❤️',
    description: 'Piacere — работает как румынский plăcea',
    sections: [
      { id: 'piacere-structure', title: 'Структура: mi piace / mi piacciono', body: 'Piacere работает «наоборот»: тот, кому нравится — косвенное дополнение (mi/ti/gli/le/ci/vi/gli), а то, что нравится — подлежащее. Piace — ед.ч. (существительное ед.ч. или инфинитив), piacciono — мн.ч.', examples: [
          { ro: 'Mi piace la pizza.', ru: 'Мне нравится пицца.', note: 'pizza — подлежащее → piace ед.ч.' },
          { ro: 'Mi piacciono i gatti.', ru: 'Мне нравятся кошки.', note: 'i gatti — мн.ч. → piacciono' },
          { ro: 'Mi piace leggere.', ru: 'Мне нравится читать.', note: 'инфинитив → piace ед.ч.' },
          { ro: 'Ti piace questo film?', ru: 'Тебе нравится этот фильм?' },
          { ro: 'A Marco piace il calcio.', ru: 'Марко нравится футбол.', note: 'a Marco = имя → gli piace' },
          { ro: 'Non mi piace per niente.', ru: 'Мне это совсем не нравится.' },
        ] },
      { id: 'piacere-tenses', title: 'Piacere во всех временах', body: 'В passato prossimo — sempre essere; причастие согласуется с подлежащим (тем, что нравилось). Dispiacere = жалеть, сожалеть, не нравиться — та же конструкция.', examples: [
          { ro: 'Mi è piaciuto il film.', ru: 'Мне понравился фильм.', note: 'essere + piaciuto м.р. ед.' },
          { ro: 'Mi è piaciuta la pizza.', ru: 'Мне понравилась пицца.', note: 'piaciuta ж.р. ед.' },
          { ro: 'Mi sono piaciuti i film.', ru: 'Мне понравились фильмы.', note: 'piaciuti м.р. мн.' },
          { ro: 'Mi piaceva la musica classica da giovane.', ru: 'В молодости мне нравилась классическая музыка.', note: 'imperfetto — привычка' },
          { ro: 'Ti piacerebbe venire con noi?', ru: 'Тебе хотелось бы пойти с нами?', note: 'condizionale — вежливое предложение' },
          { ro: 'Mi dispiace, non posso venire.', ru: 'Мне жаль, не смогу прийти.', note: 'dispiacere — сожаление' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 22. FARE + INFINITO
  // ─────────────────────────────────────────────
  {
    id: 'fare-causative',
    title: 'Fare + infinito',
    icon: '➡️',
    description: 'Каузативная конструкция — «заставить / дать сделать»',
    sections: [
      { id: 'fare-caus-form', title: 'Образование и смысл', body: 'Fare (спрягается) + инфинитив. Два значения: (1) заставлять кого-то сделать (far fare a qualcuno); (2) давать/разрешать что-то сделать (far fare). Агент вводится через a (одушевлённый) или da (когда есть прямое дополнение).', examples: [
          { ro: 'Faccio lavare la macchina.', ru: 'Я отдаю машину помыть.', note: 'без указания агента' },
          { ro: 'Faccio lavare la macchina al meccanico.', ru: 'Отдаю машину механику.', note: 'a + агент' },
          { ro: 'Faccio lavare la macchina dal meccanico.', ru: 'То же — da + агент (есть прямое доп.)', note: 'da употребляется чаще при наличии прямого доп.' },
          { ro: 'Mi fa ridere sempre.', ru: 'Он всегда меня смешит.', note: 'far ridere — смешить' },
          { ro: 'Ho fatto aspettare tutti.', ru: 'Я заставил всех ждать.' },
          { ro: 'Fai vedere la foto!', ru: 'Покажи фото!', note: 'far vedere — показывать' },
        ] },
      { id: 'fare-caus-pronouns', title: 'Местоимения при fare + infinito', body: 'Прямые местоимения (lo/la/li/le) заменяют прямое дополнение и присоединяются к fare или стоят перед ним. Если fare + агент + прямое дополнение — местоимение агента становится косвенным (gli/le), а прямого объекта — прямым (lo/la).', examples: [
          { ro: 'Lo faccio riparare.', ru: 'Я отдаю это починить.', note: 'lo = прямое доп.' },
          { ro: 'Te lo faccio vedere.', ru: 'Покажу тебе это.', note: 'te = тебе, lo = это' },
          { ro: 'Glielo faccio sapere.', ru: 'Дам ему знать об этом.', note: 'gli + lo → glielo' },
          { ro: 'Fallo subito!', ru: 'Сделай это сразу!', note: 'lo присоединяется к fare в императиве' },
          { ro: 'Me lo hai fatto aspettare troppo.', ru: 'Ты заставил меня слишком долго ждать.' },
          { ro: 'L\'ho fatta piangere.', ru: 'Я довёл её до слёз.', note: 'la → l\'; причастие согл. с la' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 23. ОТРИЦАНИЕ
  // ─────────────────────────────────────────────
  {
    id: 'negation',
    title: 'Отрицание',
    icon: '🚫',
    description: 'Non, non…mai, non…niente, non…nessuno, non…ancora',
    sections: [
      { id: 'negation-non', title: 'Non — базовое отрицание', body: 'Non стоит непосредственно перед спрягаемым глаголом. Перед местоимением — non стоит перед местоимением. При инфинитиве — non + инфинитив (не + глагол).', examples: [
          { ro: 'Non capisco.', ru: 'Не понимаю.' },
          { ro: 'Non lo so.', ru: 'Не знаю.', note: 'non перед клитикой lo' },
          { ro: 'Non è vero.', ru: 'Неправда.' },
          { ro: 'Cerco di non pensarci.', ru: 'Стараюсь не думать об этом.', note: 'non + инфинитив' },
          { ro: 'Non abbiamo mangiato.', ru: 'Мы не ели.' },
          { ro: 'Perché non vieni?', ru: 'Почему не приходишь?' },
        ] },
      { id: 'negation-double', title: 'Двойное отрицание: non…mai/niente/nessuno/ancora/più', body: 'В итальянском двойное отрицание грамматически корректно и обязательно: non стоит перед глаголом, отрицательное слово — после. Если отрицательное слово стоит перед глаголом — non опускается.', table: { headers: ['Конструкция', 'Значение', 'Пример'], rows: [['non…mai', 'никогда', 'Non vado mai al cinema.'], ['non…niente/nulla', 'ничего', 'Non ho capito niente.'], ['non…nessuno', 'никто/никакой', 'Non c\'è nessuno.'], ['non…ancora', 'ещё не', 'Non ho ancora mangiato.'], ['non…più', 'больше не', 'Non lavoro più lì.'], ['non…né…né', 'ни…ни', 'Non ho né fame né sete.']] }, examples: [
          { ro: 'Non vado mai a letto tardi.', ru: 'Я никогда не ложусь поздно.' },
          { ro: 'Non ho detto niente.', ru: 'Я ничего не сказал.' },
          { ro: 'Nessuno lo sa. (nessuno перед глаголом → non опускается)', ru: 'Никто не знает.' },
          { ro: 'Non ci vado più.', ru: 'Я туда больше не хожу.' },
          { ro: 'Non ho ancora deciso.', ru: 'Я ещё не решил.' },
          { ro: 'Non mi piace né il caffè né il tè.', ru: 'Мне не нравится ни кофе, ни чай.' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 24. ВОПРОСЫ
  // ─────────────────────────────────────────────
  {
    id: 'questions',
    title: 'Вопросы',
    icon: '❓',
    description: 'Вопросительные слова, интонация, косвенные вопросы',
    sections: [
      { id: 'questions-words', title: 'Chi, cosa, dove, quando, come, perché, quanto, quale', body: 'Вопросительные слова стоят в начале предложения. Cosa/che cosa/che — «что» (взаимозаменяемы в разговорном языке). Quanto согласуется с родом/числом: quanto/quanta/quanti/quante. Quale/quali согласуется с числом.', table: { headers: ['Слово', 'Значение', 'Пример'], rows: [['chi', 'кто', 'Chi sei?'], ['cosa/che cosa', 'что', 'Cosa vuoi?'], ['dove', 'где/куда', 'Dove vai?'], ['quando', 'когда', 'Quando arrivi?'], ['come', 'как', 'Come stai?'], ['perché', 'почему/зачем', 'Perché ridi?'], ['quanto/a/i/e', 'сколько', 'Quanto costa?'], ['quale/i', 'какой', 'Quale preferisci?']] }, examples: [
          { ro: 'Chi ha chiamato?', ru: 'Кто звонил?' },
          { ro: 'Cosa stai facendo?', ru: 'Что ты делаешь?' },
          { ro: 'Dove sei stato?', ru: 'Где ты был?' },
          { ro: 'Quanto costa questo?', ru: 'Сколько это стоит?' },
          { ro: 'Quante persone vengono?', ru: 'Сколько человек придёт?', note: 'quante — ж.р. мн.' },
          { ro: 'Quale preferisci, il rosso o il blu?', ru: 'Какой предпочитаешь, красный или синий?' },
        ] },
      { id: 'questions-yes-no', title: 'Общие вопросы — интонация', body: 'Вопрос да/нет строится только через восходящую интонацию — порядок слов не меняется. На письме ставится знак вопроса. Ответ: sì/no; ответ с противопоставлением: sì/no + ma.', examples: [
          { ro: 'Parli italiano?', ru: 'Ты говоришь по-итальянски?', note: 'тот же порядок слов, интонация вверх' },
          { ro: 'Sei stanco?', ru: 'Ты устал?' },
          { ro: 'Hai mangiato?', ru: 'Ты поел?' },
          { ro: 'Vieni anche tu?', ru: 'Ты тоже придёшь?' },
          { ro: 'No? / Davvero? / Sul serio?', ru: 'Нет? / Правда? / Серьёзно?', note: 'реакции на ответ' },
          { ro: 'Sì, ma non sono sicuro.', ru: 'Да, но не уверен.', note: 'частичный ответ' },
        ] },
      { id: 'questions-indirect', title: 'Косвенные вопросы', body: 'Косвенный вопрос вводится вопросительным словом (где, когда, как) или «se» (если ли, whether) для вопроса да/нет. Порядок слов — прямой (не инверсия). Время глагола согласуется с главным.', examples: [
          { ro: 'Non so dove abita.', ru: 'Не знаю, где он живёт.', note: 'dove — косвенный вопрос' },
          { ro: 'Mi chiedo se verrà.', ru: 'Мне интересно, придёт ли он.', note: 'se — вопрос да/нет' },
          { ro: 'Dimmi come ti chiami.', ru: 'Скажи мне, как тебя зовут.' },
          { ro: 'Non capisco perché sia arrabbiato.', ru: 'Не понимаю, почему он злится.', note: 'congiuntivo в косвенном вопросе (мнение)' },
          { ro: 'Sai quando parte il treno?', ru: 'Знаешь, когда отправляется поезд?' },
          { ro: 'Non ricordo dove ho messo le chiavi.', ru: 'Не помню, куда положил ключи.' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 25. ЧИСЛИТЕЛЬНЫЕ
  // ─────────────────────────────────────────────
  {
    id: 'numerals',
    title: 'Числительные',
    icon: '🔢',
    description: 'Количественные, порядковые, согласование milione/miliardo',
    sections: [
      { id: 'numerals-cardinal', title: 'Количественные — uno/una, согласование', body: 'Uno согласуется с родом: un/uno (м.р., те же правила что у артикля), una/un\' (ж.р.). Числа 21–29 пишутся слитно: ventuno, ventidue (e опускается перед uno и otto: ventuno, ventotto). С 31 — раздельно: trentuno.', table: { headers: ['Число', 'Итальянский', 'Число', 'Итальянский'], rows: [['1', 'uno/una', '11', 'undici'], ['2', 'due', '12', 'dodici'], ['3', 'tre', '13', 'tredici'], ['10', 'dieci', '20', 'venti'], ['21', 'ventuno', '28', 'ventotto'], ['100', 'cento', '1000', 'mille'], ['1 000 000', 'un milione', '2 000 000', 'due milioni']] }, examples: [
          { ro: 'Ho ventuno anni.', ru: 'Мне двадцать один год.', note: 'ventuno — слитно' },
          { ro: 'Sono le tre e ventotto.', ru: 'Три двадцать восемь.', note: 'ventotto — e опускается перед otto' },
          { ro: 'un milione di persone', ru: 'миллион человек', note: 'milione требует di перед сущ.' },
          { ro: 'Ho comprato tre biglietti.', ru: 'Купил три билета.' },
          { ro: 'Ne voglio due.', ru: 'Хочу два (из них).', note: 'ne + числительное' },
          { ro: 'Siamo in trentadue.', ru: 'Нас тридцать два.' },
        ] },
      { id: 'numerals-ordinal', title: 'Порядковые: primo, secondo…', body: 'С 1 по 10 — нерегулярные (primo, secondo, terzo, quarto, quinto, sesto, settimo, ottavo, nono, decimo). С 11 — регулярные: основа числительного + -esimo (undicesimo, dodicesimo…). Согласуются в роде и числе как обычные прилагательные.', examples: [
          { ro: 'il primo piano', ru: 'первый этаж', note: 'primo — нерегулярный' },
          { ro: 'È arrivata seconda.', ru: 'Она пришла второй.', note: 'seconda — ж.р.' },
          { ro: 'il terzo giorno', ru: 'третий день' },
          { ro: 'l\'undicesimo piano', ru: 'одиннадцатый этаж', note: 'undicesimo — регулярный' },
          { ro: 'per la prima volta', ru: 'в первый раз', note: 'prima — всегда перед существительным' },
          { ro: 'il ventesimo secolo', ru: 'двадцатый век' },
        ] },
      { id: 'numerals-milione', title: 'Milione/miliardo — с di перед существительным', body: 'Milione/milioni и miliardo/miliardi требуют предлога di перед существительным. Исключение: если между milione и существительным стоит ещё числительное — di опускается.', examples: [
          { ro: 'un milione di euro', ru: 'миллион евро', note: 'milione + di + существ.' },
          { ro: 'due milioni di persone', ru: 'два миллиона человек', note: 'milioni + di' },
          { ro: 'un miliardo di dollari', ru: 'миллиард долларов', note: 'miliardo + di' },
          { ro: 'tre milioni e mezzo di abitanti', ru: 'три с половиной миллиона жителей' },
          { ro: 'un milione duecentomila euro', ru: 'один миллион двести тысяч евро', note: 'di опускается когда есть ещё число' },
          { ro: 'La popolazione è di 60 milioni di persone.', ru: 'Население — 60 миллионов человек.' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 26. ПРЕДЛОГИ
  // ─────────────────────────────────────────────
  {
    id: 'prepositions',
    title: 'Предлоги',
    icon: '📍',
    description: 'a, di, in, da, per, su, con, tra/fra и их управление',
    sections: [
      { id: 'prepositions-a-di', title: 'A и di — самые частые', body: 'A: место/направление (a Roma, a casa), время (a mezzogiorno, alle tre), цель (a piedi, a voce). Di: принадлежность, материал, происхождение, после превосходной степени, после alcuni/molti/poco.', examples: [
          { ro: 'Vado a scuola a piedi.', ru: 'Иду в школу пешком.', note: 'a + место; a piedi = пешком' },
          { ro: 'il libro di Marco', ru: 'книга Марко', note: 'di = принадлежность' },
          { ro: 'Sono di Napoli.', ru: 'Я из Неаполя.', note: 'di = происхождение' },
          { ro: 'una tazza di caffè', ru: 'чашка кофе', note: 'di = содержимое' },
          { ro: 'il migliore del mondo', ru: 'лучший в мире', note: 'di после превосходной степени' },
          { ro: 'Ha bisogno di aiuto.', ru: 'Ему нужна помощь.', note: 'avere bisogno di — устойчивое' },
        ] },
      { id: 'prepositions-in-da', title: 'In и da — место, происхождение, длительность', body: 'In: нахождение в странах/регионах, в помещениях, средства передвижения (in macchina, in treno), временны́е периоды. Da: исходная точка (от/из), нахождение у кого-то (da Marco = у Марко), длительность с настоящего (da tre anni = три года назад).', examples: [
          { ro: 'Abito in Italia, a Roma.', ru: 'Живу в Италии, в Риме.', note: 'in + страна; a + город' },
          { ro: 'Vado in banca in macchina.', ru: 'Еду в банк на машине.', note: 'in + учреждение; in + транспорт' },
          { ro: 'Studio l\'italiano da due anni.', ru: 'Учу итальянский два года (и сейчас).', note: 'da + период — длит. с прошл. до сейчас' },
          { ro: 'Vengo da Milano.', ru: 'Я из Милана.', note: 'da = происхождение' },
          { ro: 'Vado da Maria.', ru: 'Иду к Марии (к ней домой).', note: 'da + имя = к кому-то' },
          { ro: 'Sono in vacanza da lunedì.', ru: 'В отпуске с понедельника.' },
        ] },
      { id: 'prepositions-per-su', title: 'Per, su, con, tra/fra', body: 'Per: цель/назначение, продолжительность завершённого периода, маршрут. Su: поверхность, тема, приближённость. Con: совместность, инструмент. Tra/fra (синонимы): между, через (время).', examples: [
          { ro: 'Ho studiato per due ore.', ru: 'Учился два часа.', note: 'per = завершённый период' },
          { ro: 'Un regalo per te.', ru: 'Подарок для тебя.', note: 'per = для/назначение' },
          { ro: 'Il libro è sul tavolo.', ru: 'Книга на столе.', note: 'su = на поверхности' },
          { ro: 'un libro sulla storia', ru: 'книга о/по истории', note: 'su = о, про (тема)' },
          { ro: 'Vengo con Marco.', ru: 'Приду с Марко.', note: 'con = вместе' },
          { ro: 'Arrivo tra/fra dieci minuti.', ru: 'Приеду через десять минут.', note: 'tra/fra = через (время)' },
        ] },
      { id: 'prepositions-countries', title: 'Страны и города: in/a/nel', body: 'Города → a (a Roma, a Parigi). Страны ж.р. → in (in Italia, in Francia). Страны м.р. → nel/negli (nel Canada, negli Stati Uniti, nel Giappone). Регионы → in (in Toscana, in Lombardia). Острова → a или in в зависимости от размера.', examples: [
          { ro: 'Vivo a Roma, in Italia.', ru: 'Живу в Риме, в Италии.', note: 'город → a; страна ж.р. → in' },
          { ro: 'Sono stato negli Stati Uniti.', ru: 'Был в США.', note: 'мн.ч. → negli' },
          { ro: 'Vado in Toscana per le vacanze.', ru: 'Еду в Тоскану на каникулы.', note: 'регион → in' },
          { ro: 'Abita nel Lazio.', ru: 'Живёт в Лацио.', note: 'регион м.р. → nel' },
          { ro: 'a Cuba, a Malta', ru: 'на Кубе, на Мальте', note: 'маленькие острова → a' },
          { ro: 'in Sicilia, in Sardegna', ru: 'на Сицилии, на Сардинии', note: 'большие острова → in' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 27. СОЮЗЫ И ПРИДАТОЧНЫЕ
  // ─────────────────────────────────────────────
  {
    id: 'conjunctions',
    title: 'Союзы и придаточные',
    icon: '🔗',
    description: 'Сочинительные, подчинительные, относительные',
    sections: [
      { id: 'conj-coordinating', title: 'Сочинительные: e, ma, o, però, quindi, perché', body: 'Сочинительные союзы соединяют однородные части без изменения наклонения. E (и) перед гласной может стать ed. Ma и però оба «но», però чуть мягче и часто в середине/конце. Quindi/dunque/perciò — следовательно.', examples: [
          { ro: 'Parlo italiano e spagnolo.', ru: 'Говорю по-итальянски и по-испански.' },
          { ro: 'Voglio venire, ma sono stanco.', ru: 'Хочу прийти, но устал.' },
          { ro: 'Vieni o rimani?', ru: 'Придёшь или останешься?' },
          { ro: 'Non studio, quindi non capisco.', ru: 'Не учусь, поэтому не понимаю.', note: 'quindi = следовательно' },
          { ro: 'Non lo so, però posso chiedere.', ru: 'Не знаю, но могу спросить.', note: 'però — мягкий контраст' },
          { ro: 'Non vuole né carne né pesce.', ru: 'Он не хочет ни мяса, ни рыбы.', note: 'né…né — ни…ни' },
        ] },
      { id: 'conj-subordinating', title: 'Подчинительные: che, perché, quando, se, mentre, sebbene…', body: 'Подчинительные союзы вводят придаточное предложение. Часть из них требует congiuntivo: sebbene/benché/nonostante (хотя), affinché/perché (чтобы), prima che (до того как), a meno che non (если только не). Che, quando, se, mentre — с indicativo.', examples: [
          { ro: 'Penso che tu abbia ragione.', ru: 'Думаю, что ты прав.', note: 'che + congiuntivo (мнение)' },
          { ro: 'Sebbene sia tardi, resto.', ru: 'Хотя и поздно, остаюсь.', note: 'sebbene + congiuntivo' },
          { ro: 'Vado perché mi piace.', ru: 'Иду, потому что нравится.', note: 'perché + indicativo = причина' },
          { ro: 'Chiamami quando arrivi.', ru: 'Позвони, когда приедешь.', note: 'quando + presente (не futuro)' },
          { ro: 'Mentre mangiavo, guardavo la TV.', ru: 'Пока ел, смотрел телевизор.', note: 'mentre + imperfetto' },
          { ro: 'Ti aspetto finché non torni.', ru: 'Подожду, пока не вернёшься.', note: 'finché non + congiuntivo' },
        ] },
      { id: 'conj-relative', title: 'Относительные: che, cui, il quale', body: 'Che = подлежащее или прямое дополнение (без предлога). Cui = после любого предлога. Il quale/la quale и т.д. — формальный вариант che/cui, помогает при неоднозначности. Il cui/la cui = «чей».', examples: [
          { ro: 'Il ragazzo che parla è mio fratello.', ru: 'Парень, который говорит — мой брат.', note: 'che = подлежащее' },
          { ro: 'Il libro che ho letto era bellissimo.', ru: 'Книга, которую я прочитал, была прекрасна.', note: 'che = прямое доп.' },
          { ro: 'La città in cui vivo è piccola.', ru: 'Город, в котором живу, маленький.', note: 'in + cui' },
          { ro: 'L\'amico di cui ti ho parlato.', ru: 'Друг, о котором я тебе говорил.', note: 'di + cui' },
          { ro: 'Lo scrittore, il cui romanzo ho letto…', ru: 'Писатель, роман которого я прочитал…', note: 'il cui = чей' },
          { ro: 'La persona con la quale lavoro.', ru: 'Человек, с которым работаю.', note: 'il quale — формально' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 28. ДНИ, МЕСЯЦЫ, ВРЕМЯ СУТОК
  // ─────────────────────────────────────────────
  {
    id: 'time-calendar',
    title: 'Дни, месяцы, время суток',
    icon: '📅',
    description: 'Названия, предлоги di/a/in/il, выражения',
    sections: [
      { id: 'days', title: 'Дни недели', body: 'Дни недели в итальянском пишутся со строчной буквы. Без артикля — конкретный день («в эту пятницу»). С артиклем il/la — привычное повторяющееся действие («по пятницам»). Domenica — ж.р., остальные м.р.', table: { headers: ['День', 'Итальянский', 'День', 'Итальянский'], rows: [['Пн', 'lunedì', 'Пт', 'venerdì'], ['Вт', 'martedì', 'Сб', 'sabato'], ['Ср', 'mercoledì', 'Вс', 'domenica'], ['Чт', 'giovedì', '', '']] }, examples: [
          { ro: 'Ci vediamo lunedì.', ru: 'Увидимся в понедельник.', note: 'конкретный день — без артикля' },
          { ro: 'Il lunedì vado in palestra.', ru: 'По понедельникам хожу в зал.', note: 'привычка — il + день' },
          { ro: 'La domenica resto a casa.', ru: 'По воскресеньям остаюсь дома.', note: 'domenica ж.р. → la' },
          { ro: 'Che giorno è oggi? — È mercoledì.', ru: 'Какой сегодня день? — Среда.' },
          { ro: 'il weekend / il fine settimana', ru: 'выходные', note: 'оба варианта употребляются' },
          { ro: 'giovedì scorso / venerdì prossimo', ru: 'в прошлый четверг / в следующую пятницу' },
        ] },
      { id: 'months', title: 'Месяцы', body: 'Месяцы пишутся со строчной буквы, все мужского рода. С месяцами используется предлог a (а не in): a gennaio. Дата: il + число + mese (il 5 marzo). Год: nel + год (nel 2024) или nel mese di.', table: { headers: ['Месяц', 'Итальянский', 'Месяц', 'Итальянский'], rows: [['Январь', 'gennaio', 'Июль', 'luglio'], ['Февраль', 'febbraio', 'Август', 'agosto'], ['Март', 'marzo', 'Сентябрь', 'settembre'], ['Апрель', 'aprile', 'Октябрь', 'ottobre'], ['Май', 'maggio', 'Ноябрь', 'novembre'], ['Июнь', 'giugno', 'Декабрь', 'dicembre']] }, examples: [
          { ro: 'Sono nato a marzo.', ru: 'Я родился в марте.', note: 'a + месяц' },
          { ro: 'Parto il 15 agosto.', ru: 'Уезжаю 15 августа.', note: 'il + число + месяц' },
          { ro: 'Siamo a giugno.', ru: 'Сейчас июнь.' },
          { ro: 'L\'anno scorso a settembre.', ru: 'В прошлом году в сентябре.' },
          { ro: 'nel mese di dicembre', ru: 'в декабре (формально)', note: 'nel mese di — официальный стиль' },
          { ro: 'È nato nel 1990.', ru: 'Родился в 1990 году.', note: 'nel + год' },
        ] },
      { id: 'time-parts', title: 'Части суток и выражения времени', body: 'Части суток: mattina (утро), pomeriggio (день/полдень), sera (вечер), notte (ночь). Предлоги: di mattina/di sera или la mattina/la sera. Наречия времени не требуют предлога.', table: { headers: ['Выражение', 'Перевод', 'Выражение', 'Перевод'], rows: [['oggi', 'сегодня', 'ieri', 'вчера'], ['domani', 'завтра', 'dopodomani', 'послезавтра'], ['adesso/ora', 'сейчас', 'presto', 'рано/скоро'], ['tardi', 'поздно', 'sempre', 'всегда'], ['spesso', 'часто', 'raramente', 'редко'], ['di mattina', 'утром', 'di sera', 'вечером']] }, examples: [
          { ro: 'Mi sveglio presto di mattina.', ru: 'Встаю рано утром.' },
          { ro: 'Ieri sera sono andato al cinema.', ru: 'Вчера вечером ходил в кино.' },
          { ro: 'Ci vediamo domani pomeriggio.', ru: 'Увидимся завтра во второй половине дня.' },
          { ro: 'Lavoro spesso di notte.', ru: 'Часто работаю ночью.' },
          { ro: 'A quest\'ora di solito dormo.', ru: 'В это время я обычно сплю.' },
          { ro: 'È tardi, devo andare.', ru: 'Поздно, мне нужно идти.' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 29. КОТОРЫЙ ЧАС
  // ─────────────────────────────────────────────
  {
    id: 'time-clock',
    title: 'Который час',
    icon: '🕐',
    description: 'Официальный и разговорный вариант, e un quarto, e mezza',
    sections: [
      { id: 'time-ask', title: 'Che ore sono? / Che ora è?', body: 'Оба вопроса равнозначны. Ответ: È l\'una (1:00) — с è ед.ч.; Sono le due/tre/… — с sono мн.ч. Mezzogiorno (полдень) и mezzanotte (полночь) — с è.', examples: [
          { ro: 'Che ore sono? — Sono le tre.', ru: 'Который час? — Три часа.', note: 'sono + le + число' },
          { ro: 'Che ora è? — È l\'una.', ru: 'Который час? — Час.', note: 'è + l\'una — исключение' },
          { ro: 'È mezzogiorno.', ru: 'Полдень.', note: 'è + mezzogiorno' },
          { ro: 'Sono le sette di mattina.', ru: 'Семь утра.', note: 'di mattina уточняет' },
          { ro: 'A che ora parte il treno?', ru: 'В котором часу отправляется поезд?' },
          { ro: 'Il negozio apre alle nove.', ru: 'Магазин открывается в девять.', note: 'alle = a + le' },
        ] },
      { id: 'time-official', title: 'Официальное время (24 ч.)', body: 'В расписаниях и официальных объявлениях используется 24-часовой формат. Минуты называются через e (и): le quindici e trenta. В официальном варианте разговорные «quarto» и «mezza» реже.', examples: [
          { ro: 'Il treno parte alle tredici e quarantacinque.', ru: 'Поезд отправляется в 13:45.' },
          { ro: 'L\'aereo arriva alle ventuno e trenta.', ru: 'Самолёт прилетает в 21:30.' },
          { ro: 'La farmacia chiude alle diciannove.', ru: 'Аптека закрывается в 19:00.' },
          { ro: 'Alle zero e zero — mezzanotte.', ru: 'В 00:00 — полночь.' },
          { ro: 'Il museo è aperto dalle dieci alle diciotto.', ru: 'Музей открыт с 10 до 18.', note: 'dalle…alle = с…до' },
          { ro: 'Il volo è alle sedici e venti.', ru: 'Рейс в 16:20.' },
        ] },
      { id: 'time-colloquial', title: 'Разговорное: e un quarto, e mezza, meno un quarto', body: 'В разговорной речи используются: e un quarto (15 мин.), e mezza (30 мин.), meno un quarto (45 мин. = «без четверти следующий час»). E mezzo/mezza — согласуется с ora (ж.р.) → e mezza.', examples: [
          { ro: 'Sono le tre e un quarto.', ru: 'Три часа пятнадцать минут.', note: '3:15' },
          { ro: 'Sono le sette e mezza.', ru: 'Половина восьмого.', note: '7:30' },
          { ro: 'Sono le otto meno un quarto.', ru: 'Без четверти восемь.', note: '7:45' },
          { ro: 'È l\'una e venti.', ru: 'Час двадцать.', note: '1:20' },
          { ro: 'Sono quasi le cinque.', ru: 'Почти пять часов.', note: 'quasi = почти' },
          { ro: 'Sono le sei passate.', ru: 'Шесть с чем-то.', note: 'passate = уже прошло' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 30. ТЕЛО ЧЕЛОВЕКА
  // ─────────────────────────────────────────────
  {
    id: 'body',
    title: 'Тело человека',
    icon: '🫀',
    description: 'Части тела, артикль вместо притяжательного, «болит»',
    sections: [
      { id: 'body-parts', title: 'Основные части тела', body: 'Ряд существительных имеет нерегулярный мн.ч. или меняет род: il braccio → le braccia, il ginocchio → le ginocchia, il dito → le dita, la mano → le mani. Il viso и il volto — синонимы (лицо).', table: { headers: ['Часть тела', 'Итальянский', 'Часть тела', 'Итальянский'], rows: [['голова', 'la testa', 'лицо', 'il viso/il volto'], ['глаз', 'l\'occhio (gli occhi)', 'ухо', "l'orecchio (le orecchie)"], ['нос', 'il naso', 'рот', 'la bocca'], ['рука (рука)', 'il braccio (le braccia)', 'рука (кисть)', 'la mano (le mani)'], ['нога', 'la gamba', 'стопа', 'il piede'], ['спина', 'la schiena', 'живот', 'la pancia'], ['сердце', 'il cuore', 'зубы', 'i denti']] }, examples: [
          { ro: 'Ho mal di testa.', ru: 'У меня болит голова.', note: 'mal di + часть тела' },
          { ro: 'Mi fanno male i piedi.', ru: 'У меня болят ноги.', note: 'fare male — болеть' },
          { ro: 'Si è rotto un braccio.', ru: 'Он сломал руку.', note: 'rompersi — сломать' },
          { ro: 'Ho gli occhi stanchi.', ru: 'У меня устали глаза.' },
          { ro: 'Le ginocchia fanno male dopo la corsa.', ru: 'Колени болят после бега.', note: 'le ginocchia — ж.р. мн.' },
          { ro: 'Ha le mani fredde.', ru: 'У него холодные руки.', note: 'le mani — ж.р. мн.' },
        ] },
      { id: 'body-article', title: 'Определённый артикль вместо притяжательного', body: 'При частях тела и личных вещах вместо притяжательного местоимения используется определённый артикль, если понятно, чьё это (обычно — субъект предложения). Принадлежность выражается косвенным местоимением (mi/ti/gli/le).', examples: [
          { ro: 'Mi lavo le mani.', ru: 'Мою руки.', note: 'артикль le, не мои (mie mani)' },
          { ro: 'Si è tagliato il dito.', ru: 'Порезал палец.', note: 'il, а не suo' },
          { ro: 'Gli fanno male le gambe.', ru: 'У него болят ноги.', note: 'gli = ему; le gambe = его ноги' },
          { ro: 'Mi fa male la schiena.', ru: 'У меня болит спина.' },
          { ro: 'Hai i capelli bagnati.', ru: 'У тебя мокрые волосы.', note: 'i capelli = твои волосы' },
          { ro: 'Si è rotta un\'unghia.', ru: 'Она сломала ноготь.', note: 'si è rotta — возвр. с essere' },
        ] },
      { id: 'body-pain', title: 'Конструкции: mi fa male, ho mal di…', body: 'Два способа сказать «болит»: (1) mi fa male + часть тела (ед.ч.) / mi fanno male (мн.ч.); (2) ho mal di + часть тела (без артикля) — только для некоторых частей тела (testa, schiena, denti, stomaco, gola). Также: avere la febbre, sentirsi male.', examples: [
          { ro: 'Mi fa male la testa.', ru: 'У меня болит голова.' },
          { ro: 'Ho mal di testa.', ru: 'У меня головная боль.', note: 'оба варианта эквивалентны' },
          { ro: 'Mi fanno male i denti.', ru: 'У меня болят зубы.', note: 'мн.ч. → fanno' },
          { ro: 'Ho mal di stomaco.', ru: 'У меня болит живот.' },
          { ro: 'Ho la febbre a 38.', ru: 'У меня температура 38.', note: 'avere la febbre' },
          { ro: 'Mi sento male.', ru: 'Мне плохо.', note: 'sentirsi male — общее недомогание' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 31. РАЗГОВОРНЫЕ ЧАСТИЦЫ
  // ─────────────────────────────────────────────
  {
    id: 'conversation-mechanics',
    title: 'Разговорные механики',
    icon: '🗣️',
    description: 'Allora, dunque, insomma, ecco, dai, magari и другие',
    sections: [
      { id: 'conv-fillers', title: 'Заполнители: allora, dunque, insomma, ecco, beh…', body: 'Заполнители — слова без самостоятельного значения, структурирующие речь: дают время подумать, вводят тему, подводят итог. Allora — самый частый итальянский филлер. Ecco — указывает или подтверждает.', table: { headers: ['Слово', 'Значение/функция'], rows: [['allora', 'ну, значит, итак — самый частый филлер'], ['dunque', 'итак, следовательно — чуть формальнее allora'], ['insomma', 'в общем, короче, ну как сказать'], ['ecco', 'вот, именно, готово'], ['beh/bè', 'ну, — пауза или неуверенность'], ['cioè', 'то есть, а точнее'], ['tipo', 'типа, как бы — молодёжный'], ['praticamente', 'практически, в общем']] }, examples: [
          { ro: 'Allora, cominciamo!', ru: 'Итак, начнём!' },
          { ro: 'Insomma, non lo so.', ru: 'В общем, не знаю.' },
          { ro: 'Ecco il problema!', ru: 'Вот в чём проблема!' },
          { ro: 'Beh, dipende...', ru: 'Ну, зависит…', note: 'beh = пауза + неуверенность' },
          { ro: 'Cioè, vuoi dire che...', ru: 'То есть ты хочешь сказать, что…' },
          { ro: 'Dunque, dove eravamo rimasti?', ru: 'Итак, на чём мы остановились?' },
        ] },
      { id: 'conv-particles', title: 'Частицы-реакции: dai, magari, mica, eppure', body: 'Dai — «давай», «ну же», «серьёзно?» (несогласие/удивление). Magari — «хотелось бы», «может быть», «если бы». Mica — усиленное отрицание («совсем не», «разве»). Eppure — «и всё же», «а ведь».', examples: [
          { ro: 'Dai, forza!', ru: 'Давай, вперёд!', note: 'подбадривание' },
          { ro: 'Dai, non ci credo!', ru: 'Да ладно, не верю!', note: 'удивление/скептицизм' },
          { ro: 'Magari vengo anch\'io.', ru: 'Может, и я приду.', note: 'неуверенность' },
          { ro: 'Magari! (esclamazione)', ru: 'Вот бы! Хотелось бы!', note: 'желание' },
          { ro: 'Non è mica stupido.', ru: 'Он совсем не глупый.', note: 'mica усиливает отрицание' },
          { ro: 'Eppure avevo ragione io.', ru: 'А ведь я был прав.', note: 'eppure = неожиданный контраст' },
        ] },
      { id: 'conv-agree', title: 'Согласие и несогласие', body: 'Согласие в итальянском выражается разнообразно — простое sì воспринимается как нейтральное. Esatto, esattamente, precisamente — подтверждение точности. Несогласие смягчается через mah, boh, non proprio.', examples: [
          { ro: 'Esatto! / Esattamente!', ru: 'Точно! Именно так!' },
          { ro: 'Hai ragione.', ru: 'Ты прав.', note: 'avere ragione' },
          { ro: 'Sono d\'accordo.', ru: 'Согласен.', note: 'essere d\'accordo' },
          { ro: 'Non sono d\'accordo.', ru: 'Не согласен.' },
          { ro: 'Mah, non saprei...', ru: 'Ну, не знаю… (скептицизм)', note: 'mah = сомнение' },
          { ro: 'Non è proprio così.', ru: 'Не совсем так.', note: 'мягкое несогласие' },
        ] },
      { id: 'conv-clarify', title: 'Переспрос и уточнение', body: 'Для переспроса используются Come? и Cosa? (вместо Che?). Prego? — вежливый переспрос. Для уточнения: nel senso che (в смысле что), vale a dire (то есть), cioè.', examples: [
          { ro: 'Come? Non ho capito.', ru: 'Что? Не понял.', note: 'Come? — нейтральный переспрос' },
          { ro: 'Prego?', ru: 'Простите?', note: 'Prego? — вежливый переспрос' },
          { ro: 'Puoi ripetere?', ru: 'Можешь повторить?' },
          { ro: 'Cosa intendi dire?', ru: 'Что ты имеешь в виду?', note: 'intendere = подразумевать' },
          { ro: 'Vale a dire che non vieni?', ru: 'То есть ты не придёшь?', note: 'vale a dire = то есть' },
          { ro: 'In che senso?', ru: 'В каком смысле?' },
        ] },
      { id: 'conv-reactions', title: 'Устойчивые реакции', body: 'Реакции-формулы, которые итальянцы произносят автоматически. Figurati/prego — «не за что», meno male — облегчение, in bocca al lupo/crepi — пожелание удачи.', table: { headers: ['Фраза', 'Перевод', 'Когда'], rows: [['Figurati! / Prego!', 'Не за что! Пожалуйста!', 'ответ на grazie'], ['Meno male!', 'Слава богу! Хорошо хоть!', 'облегчение'], ['Che peccato!', 'Как жаль!', 'сочувствие'], ['Per forza!', 'Ещё бы! Само собой!', 'очевидность'], ['In bocca al lupo! — Crepi!', 'Ни пуха! — К чёрту!', 'пожелание удачи'], ['Magari!', 'Вот бы! Хотелось бы!', 'желание']] }, examples: [
          { ro: 'Grazie mille! — Figurati!', ru: 'Большое спасибо! — Не за что!' },
          { ro: 'Non ha piovuto! — Meno male!', ru: 'Не было дождя! — Хорошо хоть!' },
          { ro: 'Non posso venire. — Che peccato!', ru: 'Не смогу прийти. — Как жаль!' },
          { ro: 'In bocca al lupo per l\'esame! — Crepi!', ru: 'Ни пуха на экзамене! — К чёрту!' },
          { ro: 'Ovviamente / Per forza!', ru: 'Очевидно! Само собой!', note: 'ответ на что-то само собой разумеющееся' },
          { ro: 'Che bello! / Che bravo!', ru: 'Как здорово! / Молодец!', note: 'Che + прилаг. — восхищение' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 32. СИТУАТИВНЫЕ ДИАЛОГИ
  // ─────────────────────────────────────────────
  {
    id: 'dialogues',
    title: 'Ситуативные диалоги',
    icon: '💬',
    description: 'Знакомство, кафе, транспорт, магазин, врач, телефон',
    sections: [
      { id: 'dialogues-greetings', title: 'Знакомство и приветствия', body: 'Ciao — неформально (друзья, ровесники). Salve — нейтрально. Buongiorno/buonasera — формально или с незнакомыми. Piacere и Molto lieto/a — при знакомстве. Arrivederci — нейтральное до свидания, a presto — до скорого.', examples: [
          { ro: '— Ciao, come stai? — Bene, grazie, e tu?', ru: '— Привет, как дела? — Хорошо, спасибо, а ты?' },
          { ro: '— Come ti chiami? — Mi chiamo Marco.', ru: '— Как тебя зовут? — Меня зовут Марко.' },
          { ro: '— Di dove sei? — Sono di Roma, e tu?', ru: '— Откуда ты? — Из Рима, а ты?' },
          { ro: '— Piacere! — Piacere mio!', ru: '— Приятно познакомиться! — Мне тоже!' },
          { ro: 'Arrivederci! / A presto! / Ci vediamo!', ru: 'До свидания! / До скорого! / Увидимся!' },
          { ro: 'Buongiorno! Come sta? — Molto bene, grazie.', ru: 'Добрый день! Как вы? — Очень хорошо, спасибо.', note: 'вежливое Lei' },
        ] },
      { id: 'dialogues-cafe', title: 'В кафе и ресторане', body: 'Заказ начинается с Vorrei... (я бы хотел) или Prendo... (я возьму). Официанта подзывают: Scusi! Il conto, per favore — счёт. Al bar кофе пьют стоя у стойки — быстро и дешевле. Prego означает «пожалуйста» в ответ на благодарность и «слушаю вас» при приёме заказа.', examples: [
          { ro: '— Cosa prende? — Vorrei un caffè e un cornetto.', ru: '— Что будете? — Я бы хотел кофе и рогалик.' },
          { ro: 'Un tavolo per due, per favore.', ru: 'Столик на двоих, пожалуйста.' },
          { ro: '— È libero questo posto? — Sì, prego.', ru: '— Это место свободно? — Да, пожалуйста.' },
          { ro: 'Scusi, il menu, per favore!', ru: 'Извините, меню, пожалуйста!' },
          { ro: 'Il conto, per favore. — Subito!', ru: 'Счёт, пожалуйста. — Сейчас!' },
          { ro: 'È incluso il servizio?', ru: 'Обслуживание включено?', note: 'чаевые в Италии не обязательны' },
        ] },
      { id: 'dialogues-directions', title: 'Дорога и транспорт', body: 'Спрашивают: Dov\'è...? / Come si arriva a...? Объясняют через girare (повернуть), andare dritto (идти прямо), prendere (сесть на транспорт). Расстояние указывают в минутах: è a cinque minuti. На общественном транспорте билет — biglietto, его нужно компостировать (obliterare).', examples: [
          { ro: 'Scusi, dov\'è la stazione?', ru: 'Извините, где вокзал?' },
          { ro: 'Vada dritto, poi giri a sinistra.', ru: 'Идите прямо, потом поверните налево.', note: 'imperativo formale' },
          { ro: 'È lontano? — No, è a dieci minuti a piedi.', ru: '— Далеко? — Нет, в десяти минутах пешком.' },
          { ro: 'Devo prendere l\'autobus numero 23.', ru: 'Мне нужно сесть на автобус номер 23.' },
          { ro: 'Dove posso comprare un biglietto?', ru: 'Где можно купить билет?' },
          { ro: 'A che ora parte il treno per Milano?', ru: 'В котором часу отходит поезд в Милан?' },
        ] },
      { id: 'dialogues-shopping', title: 'В магазине', body: 'Продавец спрашивает: Posso aiutarla? / Desidera? Покупатель отвечает: Sto solo guardando (просто смотрю) или Cerco... (ищу...). Размер — taglia (одежда), numero (обувь). Примерочная — camerino. Скидка — sconto, распродажа — saldi.', examples: [
          { ro: '— Posso aiutarla? — Sto solo guardando, grazie.', ru: '— Могу помочь? — Я просто смотрю, спасибо.' },
          { ro: 'Cerco una giacca taglia M.', ru: 'Ищу куртку размера М.' },
          { ro: 'Posso provarlo? Dov\'è il camerino?', ru: 'Можно примерить? Где примерочная?' },
          { ro: 'Quanto costa? / Quanto vengono?', ru: 'Сколько стоит? / Сколько стоят?' },
          { ro: 'C\'è uno sconto? Avete i saldi?', ru: 'Есть скидка? У вас распродажа?' },
          { ro: 'Lo prendo. Posso pagare con carta?', ru: 'Беру. Можно оплатить картой?' },
        ] },
      { id: 'dialogues-health', title: 'У врача и о здоровье', body: 'Mi fa male + часть тела = болит. Ho mal di + часть тела — устойчивые сочетания (mal di testa, di stomaco). Симптомы описывают через avere (febbre, tosse, raffreddore) или sentirsi (male, stanco). Врач — medico/dottore, рецепт — ricetta, аптека — farmacia.', examples: [
          { ro: 'Ho mal di testa e la febbre.', ru: 'У меня болит голова и температура.' },
          { ro: 'Mi fa male la gola da tre giorni.', ru: 'У меня болит горло уже три дня.' },
          { ro: 'Ho la tosse e il raffreddore.', ru: 'У меня кашель и насморк.' },
          { ro: 'Mi sento molto stanco/a.', ru: 'Я чувствую себя очень усталым/ой.' },
          { ro: '— Ho bisogno di una ricetta? — Sì, le prescrivo qualcosa.', ru: '— Мне нужен рецепт? — Да, я вам что-нибудь выпишу.' },
          { ro: 'Sono allergico/a alla penicillina.', ru: 'У меня аллергия на пенициллин.' },
        ] },
      { id: 'dialogues-phone', title: 'По телефону', body: 'Телефонный разговор начинается с Pronto! (аналог «алло»). Представляются: Sono + имя. Чтобы позвать кого-то: C\'è + имя? Если человека нет: Non c\'è / È fuori. Попросить перезвонить: Può richiamare? Оставить сообщение: Vuole lasciare un messaggio?', examples: [
          { ro: '— Pronto? — Sono Marco, c\'è Giulia?', ru: '— Алло? — Это Марко, Джулия дома?' },
          { ro: '— Mi dispiace, è fuori. — Può richiamare più tardi?', ru: '— Извините, её нет. — Она может перезвонить позже?' },
          { ro: 'Vuole lasciare un messaggio?', ru: 'Хотите оставить сообщение?' },
          { ro: 'Può parlare più lentamente, per favore?', ru: 'Вы могли бы говорить помедленнее, пожалуйста?' },
          { ro: 'La linea è disturbata, non sento bene.', ru: 'Плохая связь, я вас плохо слышу.' },
          { ro: 'Le passo il dottor Bianchi.', ru: 'Соединяю вас с доктором Бьянки.', note: 'Le — формальное «вам»' },
        ] },
    ],
  },

  // ─────────────────────────────────────────────
  // 33. УСТОЙЧИВЫЕ ВЫРАЖЕНИЯ И ФРАЗЕОЛОГИЯ
  // ─────────────────────────────────────────────
  {
    id: 'phraseology',
    title: 'Устойчивые выражения',
    icon: '🧩',
    description: 'Идиомы, дискурсивные связки, повседневные фразы',
    sections: [
      { id: 'phrase-verbs', title: 'Глагольные устойчивые сочетания', body: 'Итальянские устойчивые глагольные сочетания строятся на fare, avere, mettere, prendere, dare. Их смысл не выводится из отдельных слов — нужно запоминать как лексические единицы. Fare + существительное заменяет глагол: fare una passeggiata = passeggiare.', examples: [
          { ro: 'fare una passeggiata', ru: 'прогуляться', note: 'fare + сущ. вместо глагола' },
          { ro: 'avere voglia di + inf.', ru: 'хотеть, иметь желание' },
          { ro: 'rendersi conto di', ru: 'осознавать, отдавать себе отчёт' },
          { ro: 'mettere in moto', ru: 'завести (машину), запустить' },
          { ro: 'prendere in giro qualcuno', ru: 'подшучивать над кем-то' },
          { ro: 'dare fastidio', ru: 'раздражать, мешать', note: 'букв. «давать беспокойство»' },
        ] },
      { id: 'phrase-connectors', title: 'Дискурсивные связки', body: 'Дискурсивные связки организуют речь: добавление (inoltre, anche, poi), противопоставление (però, tuttavia, invece), следствие (quindi, perciò, allora), уточнение (cioè, in altre parole), подытоживание (insomma, in conclusione). Делают речь связной и естественной.', examples: [
          { ro: 'Mi piace Roma; però preferisco Firenze.', ru: 'Мне нравится Рим, но я предпочитаю Флоренцию.', note: 'però = противопоставление' },
          { ro: 'Non mi sento bene, quindi resto a casa.', ru: 'Я неважно себя чувствую, поэтому остаюсь дома.', note: 'quindi = следствие' },
          { ro: 'È simpatico, cioè sempre disponibile.', ru: 'Он приятный, то есть всегда готов помочь.', note: 'cioè = уточнение' },
          { ro: 'Inoltre, bisogna considerare il costo.', ru: 'Кроме того, нужно учитывать стоимость.', note: 'inoltre = добавление' },
          { ro: 'Insomma, non so cosa fare.', ru: 'В общем, я не знаю, что делать.', note: 'insomma = подытоживание' },
          { ro: 'Ho lavorato tutto il giorno; invece lui non ha fatto niente.', ru: 'Я работал весь день; а он не сделал ничего.', note: 'invece = контраст' },
        ] },
      { id: 'phrase-everyday', title: 'Повседневные фразы-реакции', body: 'Фразы-реакции — готовые блоки для ответа на новость, согласия, удивления, извинений. Их не конструируют по правилам, а выучивают целиком. Итальянцы активно используют Mamma mia!, Dai!, Figurati! в разговоре.', examples: [
          { ro: '— Ho preso il lavoro! — Meno male! / Che bello!', ru: '— Я получил работу! — Слава богу! / Как здорово!' },
          { ro: '— Mi dispiace. — Non fa niente! / Figurati!', ru: '— Мне жаль. — Ничего! / Не стоит!' },
          { ro: '— Dai, non è possibile!', ru: '— Да ладно, не может быть!', note: 'Dai = выражение неверия/подбадривания' },
          { ro: 'Mamma mia, che caldo oggi!', ru: 'Боже мой, какая жара сегодня!' },
          { ro: '— Ti va di uscire? — Volentieri!', ru: '— Хочешь выйти? — С удовольствием!' },
          { ro: 'Meno male che sei arrivato!', ru: 'Хорошо, что ты пришёл! / Слава богу, что пришёл!' },
        ] },
    ],
  },
]

// ─────────────────────────────────────────────
// 34. CI VUOLE / CI VOGLIONO
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'ci-vuole',
  title: 'Ci vuole / ci vogliono',
  icon: '⏱️',
  description: 'Нужно столько-то времени, штук, усилий',
  sections: [
    {
      id: 'ci-vuole-basics',
      title: 'Структура и смысл',
      body: 'Ci vuole + ед. число; ci vogliono + мн. число. Используется для выражения необходимого количества — времени, денег, предметов. Прямого аналога в других изученных языках нет. Не путать с bisogna (безличное «надо»).',
      examples: [
        { it: 'Ci vuole un\'ora.', ru: 'Нужен час. / На это уходит час.' },
        { it: 'Ci vogliono due ore.', ru: 'Нужно два часа.' },
        { it: 'Ci vuole pazienza.', ru: 'Нужно терпение.' },
        { it: 'Quanto ci vuole per arrivare?', ru: 'Сколько времени нужно, чтобы добраться?' },
        { it: 'Ci vogliono molti soldi.', ru: 'Нужно много денег.' },
      ],
    },
    {
      id: 'ci-vuole-tenses',
      title: 'Во временах',
      body: 'Глагол volere меняется по временам, ci остаётся неизменным.',
      examples: [
        { it: 'Ci voleva più tempo.', ru: 'Нужно было больше времени.', note: 'imperfetto' },
        { it: 'Ci sono volute tre ore.', ru: 'Понадобилось три часа.', note: 'passato prossimo с essere' },
        { it: 'Ci vorrà coraggio.', ru: 'Понадобится смелость.', note: 'futuro' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 35. STARE PER + INFINITO
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'stare-per',
  title: 'Stare per + infinito',
  icon: '⚡',
  description: 'Вот-вот произойдёт — ближайшее будущее',
  sections: [
    {
      id: 'stare-per-basics',
      title: 'Структура и смысл',
      body: 'Stare per + infinito = «вот-вот», «собираться сделать прямо сейчас». Выражает неминуемое ближайшее действие — сильнее, чем просто futuro или andare a. Stare спрягается по лицам.',
      examples: [
        { it: 'Sto per uscire.', ru: 'Я вот-вот выйду. / Я собираюсь выйти прямо сейчас.' },
        { it: 'Il treno sta per partire.', ru: 'Поезд вот-вот отправится.' },
        { it: 'Stavo per chiamarti!', ru: 'Я как раз собирался тебе позвонить!', note: 'imperfetto — прерванное намерение' },
        { it: 'Sta per piovere.', ru: 'Сейчас пойдёт дождь.' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────
// 36. КОСВЕННАЯ РЕЧЬ (DISCORSO INDIRETTO)
// ─────────────────────────────────────────────
grammarTopics.push({
  id: 'reported-speech',
  title: 'Косвенная речь',
  icon: '💬',
  description: 'Discorso indiretto — согласование времён, трансформации',
  sections: [
    {
      id: 'reported-intro',
      title: 'Согласование времён',
      body: 'Если глагол введения стоит в прошедшем времени, запускается согласование времён (concordanza dei tempi). Если глагол в настоящем — времена чаще не меняются.',
      table: {
        headers: ['Прямая речь', 'Косвенная речь (глагол в прош.)'],
        rows: [
          ['presente', 'imperfetto'],
          ['passato prossimo / remoto', 'trapassato prossimo'],
          ['futuro semplice', 'condizionale presente'],
          ['futuro anteriore', 'condizionale passato'],
          ['imperativo', 'congiuntivo imperfetto / di + infinito'],
        ],
      },
      examples: [
        { it: 'Dice: «Sono stanco.» → Dice che è stanco.', ru: 'Глагол в наст. — время не меняется.' },
        { it: 'Ha detto: «Sono stanco.» → Ha detto che era stanco.', ru: 'presente → imperfetto.' },
        { it: 'Ha detto: «Verrò.» → Ha detto che sarebbe venuto.', ru: 'futuro → condizionale passato.' },
      ],
    },
    {
      id: 'reported-questions',
      title: 'Косвенные вопросы',
      body: 'Общий вопрос — «se» (если ли). Специальный — через вопросительное слово. Порядок слов прямой.',
      examples: [
        { it: 'Ha chiesto: «Vieni?» → Ha chiesto se venivo.', ru: 'se — для вопроса да/нет.' },
        { it: 'Ha chiesto: «Dove abiti?» → Ha chiesto dove abitavo.', ru: 'Вопросительное слово без инверсии.' },
        { it: 'Ha chiesto: «Cosa fai?» → Ha chiesto cosa facevo.', ru: 'cosa остаётся.' },
      ],
    },
    {
      id: 'reported-imperative',
      title: 'Косвенный императив',
      body: 'Прямой приказ в косвенной речи передаётся через «di + infinito» (нейтрально) или congiuntivo imperfetto (формально).',
      examples: [
        { it: 'Ha detto: «Vieni!» → Ha detto di venire.', ru: 'di + infinito — стандартно.' },
        { it: 'Ha chiesto: «Per favore, aspetta.» → Ha chiesto di aspettare.', ru: 'просьба → di + infinito.' },
      ],
    },
  ],
})
