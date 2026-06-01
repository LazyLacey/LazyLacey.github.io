window.SAMPLE_CARDS_DATA = {
  version: 3,
  exported: new Date().toISOString().slice(0, 10),
  _comment: "Тестовый набор карточек для испанского. Попробуйте промпт: «Создай JSON файл с 20 испанскими словами в формате этого примера».",
  groups: [{ id: 1, name: "Базовые слова" }],
  cards: [
    { id: 1, groupId: 1, ro: "hola", ru: "привет", note: "" },
    { id: 2, groupId: 1, ro: "buenos días", ru: "добрый день", note: "буквально: добрый день (утро)" },
    { id: 3, groupId: 1, ro: "gracias", ru: "спасибо", note: "" },
    { id: 4, groupId: 1, ro: "por favor", ru: "пожалуйста", note: "" },
    { id: 5, groupId: 1, ro: "agua", ru: "вода", note: "ж.р., но el agua (исключение)" },
  ]
};

window.SAMPLE_VERBS_DATA = {
  type: "verbPack",
  name: "Базовые глаголы",
  icon: "🔤",
  _comment: "Пак глаголов для испанского. Три времени: presente, pretérito, futuro. Порядок: yo, tú, él/ella, nosotros, vosotros, ellos/ellas.",
  verbs: [
    {
      id: "ser",
      infinitive: "ser",
      translation: "быть (постоянные характеристики)",
      icon: "🟡",
      forms: {
        presente:  ["soy", "eres", "es", "somos", "sois", "son"],
        pretérito: ["fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron"],
        futuro:    ["seré", "serás", "será", "seremos", "seréis", "serán"],
      }
    },
    {
      id: "estar",
      infinitive: "estar",
      translation: "быть (состояние, местонахождение)",
      icon: "📍",
      forms: {
        presente:  ["estoy", "estás", "está", "estamos", "estáis", "están"],
        pretérito: ["estuve", "estuviste", "estuvo", "estuvimos", "estuvisteis", "estuvieron"],
        futuro:    ["estaré", "estarás", "estará", "estaremos", "estaréis", "estarán"],
      }
    },
    {
      id: "tener",
      infinitive: "tener",
      translation: "иметь",
      icon: "🤲",
      forms: {
        presente:  ["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen"],
        pretérito: ["tuve", "tuviste", "tuvo", "tuvimos", "tuvisteis", "tuvieron"],
        futuro:    ["tendré", "tendrás", "tendrá", "tendremos", "tendréis", "tendrán"],
      }
    },
    {
      id: "ir",
      infinitive: "ir",
      translation: "идти, ехать",
      icon: "🚶",
      forms: {
        presente:  ["voy", "vas", "va", "vamos", "vais", "van"],
        pretérito: ["fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron"],
        futuro:    ["iré", "irás", "irá", "iremos", "iréis", "irán"],
      }
    },
    {
      id: "hacer",
      infinitive: "hacer",
      translation: "делать",
      icon: "🛠️",
      forms: {
        presente:  ["hago", "haces", "hace", "hacemos", "hacéis", "hacen"],
        pretérito: ["hice", "hiciste", "hizo", "hicimos", "hicisteis", "hicieron"],
        futuro:    ["haré", "harás", "hará", "haremos", "haréis", "harán"],
      }
    },
    {
      id: "poder",
      infinitive: "poder",
      translation: "мочь, уметь",
      icon: "💪",
      forms: {
        presente:  ["puedo", "puedes", "puede", "podemos", "podéis", "pueden"],
        pretérito: ["pude", "pudiste", "pudo", "pudimos", "pudisteis", "pudieron"],
        futuro:    ["podré", "podrás", "podrá", "podremos", "podréis", "podrán"],
      }
    },
    {
      id: "querer",
      infinitive: "querer",
      translation: "хотеть, любить",
      icon: "❤️",
      forms: {
        presente:  ["quiero", "quieres", "quiere", "queremos", "queréis", "quieren"],
        pretérito: ["quise", "quisiste", "quiso", "quisimos", "quisisteis", "quisieron"],
        futuro:    ["querré", "querrás", "querrá", "querremos", "querréis", "querrán"],
      }
    },
    {
      id: "venir",
      infinitive: "venir",
      translation: "приходить, приезжать",
      icon: "🏠",
      forms: {
        presente:  ["vengo", "vienes", "viene", "venimos", "venís", "vienen"],
        pretérito: ["vine", "viniste", "vino", "vinimos", "vinisteis", "vinieron"],
        futuro:    ["vendré", "vendrás", "vendrá", "vendremos", "vendréis", "vendrán"],
      }
    },
    {
      id: "saber",
      infinitive: "saber",
      translation: "знать (факты, умения)",
      icon: "🧠",
      forms: {
        presente:  ["sé", "sabes", "sabe", "sabemos", "sabéis", "saben"],
        pretérito: ["supe", "supiste", "supo", "supimos", "supisteis", "supieron"],
        futuro:    ["sabré", "sabrás", "sabrá", "sabremos", "sabréis", "sabrán"],
      }
    },
    {
      id: "hablar",
      infinitive: "hablar",
      translation: "говорить",
      icon: "💬",
      forms: {
        presente:  ["hablo", "hablas", "habla", "hablamos", "habláis", "hablan"],
        pretérito: ["hablé", "hablaste", "habló", "hablamos", "hablasteis", "hablaron"],
        futuro:    ["hablaré", "hablarás", "hablará", "hablaremos", "hablaréis", "hablarán"],
      }
    },
  ]
};

window.SAMPLE_TESTS_DATA = null;
