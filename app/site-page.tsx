"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type Lang = "en" | "fi" | "pt";
type Page = "home" | "about" | "alex" | "care" | "organizations" | "hospitality" | "contact";

const TIMMA = "https://varaa.timma.fi/reservation/threearchestmialexmendes";
const EMAIL = "alexmendes@threearches.co";
const WHATSAPP = "https://wa.me/358408093022";
const MAPS = "https://www.google.com/maps/search/?api=1&query=Snellmaninkatu%2029%20C%2C%2000170%20Helsinki%2C%20Finland";
const GOOGLE_PROFILE = "https://www.google.com/maps/search/?api=1&query=Three%20Arches%20Hierontastudio%20-%20Tmi%20Alex%20Mendes";
const REVIEW_LINKS = [
  "https://maps.app.goo.gl/mej33wnFYiEoPtjv5",
  "https://maps.app.goo.gl/USmJfHesz46c4T2H7",
  "https://maps.app.goo.gl/uo9WpMvqF2dNWyQg8",
] as const;

const ui = {
  en: {
    nav: ["Approach", "Individual Care", "Organizations", "Hospitality", "About"],
    book: "Book a Session", back: "Back to home", top: "Back to top", menu: "Menu", close: "Close", contact: "Contact",
    labels: ["Body", "Care", "Relationships"],
  },
  fi: {
    nav: ["Lähestymistapa", "Yksilöllinen hoito", "Organisaatiot", "Vieraanvaraisuus", "Tietoa"],
    book: "Varaa aika", back: "Takaisin etusivulle", top: "Takaisin alkuun", menu: "Valikko", close: "Sulje", contact: "Yhteystiedot",
    labels: ["Keho", "Hoiva", "Suhteet"],
  },
  pt: {
    nav: ["Abordagem", "Cuidado individual", "Organizações", "Hospitalidade", "Sobre"],
    book: "Agendar sessão", back: "Voltar à página inicial", top: "Voltar ao topo", menu: "Menu", close: "Fechar", contact: "Contato",
    labels: ["Corpo", "Cuidado", "Relações"],
  },
} as const;

const reviews = {
  en: {
    label: "Client experiences", title: "Care, experienced and shared", intro: "A few words from people who have encountered the work in practice.",
    items: [
      ["Saara Milton", "Alexandre’s massage has been invaluable to me as a dancer. I feel that my concerns have been heard as a whole.", "Translated from Finnish"],
      ["Kafren MP Olemisen Alkemia", "The treatment with Alex felt deeply welcoming, safe and comforting. I left feeling more centered, present and sincerely grateful.", "Translated from Finnish"],
      ["Jod Moreira", "The treatment has been incredible. It has made a huge difference in my daily life and pain management.", "Original in English"],
    ],
    source: "Read this review on Google", all: "Read all reviews on Google", contactTitle: "Already visited Three Arches?", contactText: "Your experience can help someone else decide whether this care feels right for them.", contactAction: "Visit our Google profile",
  },
  fi: {
    label: "Asiakkaiden kokemuksia", title: "Koettua ja jaettua hoivaa", intro: "Muutama sana ihmisiltä, jotka ovat kohdanneet työn käytännössä.",
    items: [
      ["Saara Milton", "Alexandren hieronta on ollut minulle tanssijana korvaamaton apu. Koen tulleeni kokonaisvaltaisesti kuulluksi vaivoineni.", "Alkuperäinen suomeksi"],
      ["Kafren MP Olemisen Alkemia", "Hoito Alexin kanssa tuntui hyvin vastaanottavalta, turvalliselta ja lohdulliselta. Lähdin pois keskittyneempänä, läsnä olevana ja sydämestäni kiitollisena.", "Alkuperäinen suomeksi"],
      ["Jod Moreira", "Hoito on ollut uskomatonta. Se on vaikuttanut suuresti jokapäiväiseen elämääni ja kivun hallintaan.", "Käännetty englannista"],
    ],
    source: "Lue arvio Google-palvelussa", all: "Lue kaikki arviot Googlesta", contactTitle: "Oletko jo käynyt Three Archesissa?", contactText: "Kokemuksesi voi auttaa toista ihmistä arvioimaan, sopiiko tämä hoito hänelle.", contactAction: "Avaa Google-profiilimme",
  },
  pt: {
    label: "Experiências de clientes", title: "Cuidado vivido e compartilhado", intro: "Algumas palavras de pessoas que encontraram este trabalho na prática.",
    items: [
      ["Saara Milton", "A massagem do Alexandre tem sido uma ajuda inestimável para mim como bailarina. Sinto que minhas necessidades foram compreendidas de forma integral.", "Traduzido do finlandês"],
      ["Kafren MP Olemisen Alkemia", "O tratamento com Alex foi muito acolhedor, seguro e reconfortante. Saí mais centrada, presente e sinceramente grata.", "Traduzido do finlandês"],
      ["Jod Moreira", "O tratamento tem sido incrível. Fez uma enorme diferença na minha vida diária e no controle da dor.", "Traduzido do inglês"],
    ],
    source: "Ler esta avaliação no Google", all: "Ler todas as avaliações no Google", contactTitle: "Você já visitou a Three Arches?", contactText: "Sua experiência pode ajudar outra pessoa a decidir se este cuidado faz sentido para ela.", contactAction: "Visitar nosso perfil no Google",
  },
} as const;

const home = {
  en: {
    eyebrow: "Body · Care · Relationships",
    title: "Everything begins with the body.",
    intro: "Three Arches brings together bodywork, somatic learning and relational practices—supporting people and organizations in moving through complexity with greater presence, care and trust.",
    primary: "Explore Individual Care", secondary: "Work with Three Arches",
    introTitle: "A human practice across different scales",
    introText: "The body is where we experience tension and ease, protection and openness, stability and change. By beginning with what is already present, Three Arches creates pathways from individual care to embodied learning and healthier ways of relating.",
    archesTitle: "Three expressions of the same philosophy",
    arches: [
      ["Body", "A living way of perceiving, organizing experience and responding to the world.", "The body gives form to how we meet change before words arrive."],
      ["Care", "The support and attention that allow new responses to become possible.", "Care creates enough safety for curiosity, recovery and choice."],
      ["Relationships", "The space where trust, cooperation and meaningful change can emerge.", "Every encounter shapes what becomes possible between us."],
    ],
    philosophy: "Explore our philosophy",
    pathwaysTitle: "Begin where you are",
    pathways: [
      ["Individual Care", "Manual therapy and somatic sessions for pain, tension, recovery, regulation and a renewed connection with your body.", "Explore Individual Care"],
      ["Organizations", "Embodied learning for leaders and teams seeking greater trust, adaptability, collaboration and relational intelligence.", "Explore Organizations"],
      ["Hospitality", "Bodywork and somatic experiences that make care a tangible part of the guest experience.", "Explore Hospitality"],
    ],
    meetLabel: "Meet Alex Mendes", meetTitle: "A practice shaped across disciplines",
    meetText: "Alex Mendes connects concrete knowledge of the body with an understanding of emotional, developmental and relational processes. His work brings together Dance and Somatics, Formative Psychology, Massage Therapy, Contact Improvisation and the study of organizations.",
    meetAction: "Meet Alex Mendes",
    closeTitle: "What might become possible when we begin with what is already here?",
    closeText: "The first step does not require ideal conditions. It requires availability for a first encounter.",
    closePrimary: "Book a Session", closeSecondary: "Start a Conversation",
  },
  fi: {
    eyebrow: "Keho · Hoiva · Suhteet",
    title: "Kaikki alkaa kehosta.",
    intro: "Three Arches yhdistää kehollisen hoidon, somaattisen oppimisen ja relationaaliset käytännöt. Se tukee ihmisiä ja organisaatioita kohtaamaan monimutkaisuutta läsnäolevammin, huolehtivammin ja luottavaisemmin.",
    primary: "Tutustu yksilölliseen hoitoon", secondary: "Työskentele Three Archesin kanssa",
    introTitle: "Inhimillinen käytäntö eri mittakaavoissa",
    introText: "Kehossa koemme jännityksen ja helppouden, suojautumisen ja avoimuuden, vakauden ja muutoksen. Lähtemällä siitä, mikä on jo läsnä, Three Arches avaa polkuja yksilöllisestä hoidosta keholliseen oppimiseen ja terveempiin suhteessa olemisen tapoihin.",
    archesTitle: "Saman filosofian kolme ilmenemismuotoa",
    arches: [
      ["Keho", "Elävä tapa havaita, jäsentää kokemusta ja vastata maailmaan.", "Keho antaa muodon sille, miten kohtaamme muutoksen jo ennen sanoja."],
      ["Hoiva", "Tuki ja huomio, jotka tekevät uudet toimintatavat mahdollisiksi.", "Hoiva luo riittävästi turvaa uteliaisuudelle, palautumiselle ja valinnalle."],
      ["Suhteet", "Tila, jossa luottamus, yhteistyö ja merkityksellinen muutos voivat syntyä.", "Jokainen kohtaaminen muovaa sitä, mikä välillämme tulee mahdolliseksi."],
    ],
    philosophy: "Tutustu filosofiaamme",
    pathwaysTitle: "Aloita siitä, missä olet",
    pathways: [
      ["Yksilöllinen hoito", "Manuaalista terapiaa ja somaattisia tapaamisia kipuun, jännitykseen, palautumiseen, säätelyyn ja yhteyteen oman kehon kanssa.", "Tutustu yksilölliseen hoitoon"],
      ["Organisaatiot", "Kehollista oppimista johtajille ja tiimeille, jotka etsivät lisää luottamusta, sopeutumiskykyä, yhteistyötä ja suhdeälykkyyttä.", "Tutustu organisaatioille suunnattuun työhön"],
      ["Vieraanvaraisuus", "Kehollista hoitoa ja somaattisia kokemuksia, jotka tekevät huolenpidosta konkreettisen osan vieraskokemusta.", "Tutustu vieraanvaraisuuteen"],
    ],
    meetLabel: "Tutustu Alex Mendesiin", meetTitle: "Monien alojen muovaama käytäntö",
    meetText: "Alex Mendes yhdistää konkreettisen tiedon kehosta emotionaalisten, kehityksellisten ja relationaalisten prosessien ymmärtämiseen. Hänen työssään kohtaavat tanssi ja somatiikka, Formative Psychology, hierontaterapia, kontakti-improvisaatio sekä organisaatioiden tutkimus.",
    meetAction: "Tutustu Alex Mendesiin",
    closeTitle: "Mikä voisi tulla mahdolliseksi, kun aloitamme siitä, mikä on jo tässä?",
    closeText: "Ensimmäinen askel ei vaadi ihanteellisia olosuhteita. Se vaatii valmiutta ensimmäiseen kohtaamiseen.",
    closePrimary: "Varaa aika", closeSecondary: "Aloita keskustelu",
  },
  pt: {
    eyebrow: "Corpo · Cuidado · Relações",
    title: "Tudo começa pelo corpo.",
    intro: "A Three Arches reúne trabalho corporal, aprendizagem somática e práticas relacionais, apoiando pessoas e organizações a atravessar a complexidade com mais presença, cuidado e confiança.",
    primary: "Conheça o cuidado individual", secondary: "Trabalhe com a Three Arches",
    introTitle: "Uma prática humana em diferentes escalas",
    introText: "É no corpo que vivemos tensão e facilidade, proteção e abertura, estabilidade e mudança. Partindo do que já está presente, a Three Arches cria caminhos do cuidado individual à aprendizagem incorporada e a formas mais saudáveis de se relacionar.",
    archesTitle: "Três expressões da mesma filosofia",
    arches: [
      ["Corpo", "Uma forma viva de perceber, organizar a experiência e responder ao mundo.", "O corpo dá forma a como encontramos a mudança antes mesmo das palavras."],
      ["Cuidado", "O apoio e a atenção que tornam possíveis novas respostas.", "O cuidado cria segurança suficiente para a curiosidade, a recuperação e a escolha."],
      ["Relações", "O espaço onde confiança, cooperação e mudanças significativas podem emergir.", "Cada encontro molda o que pode se tornar possível entre nós."],
    ],
    philosophy: "Conheça nossa filosofia",
    pathwaysTitle: "Comece de onde você está",
    pathways: [
      ["Cuidado individual", "Terapia manual e sessões somáticas para dor, tensão, recuperação, regulação e uma conexão renovada com o corpo.", "Conheça o cuidado individual"],
      ["Organizações", "Aprendizagem incorporada para líderes e equipes que buscam mais confiança, adaptabilidade, colaboração e inteligência relacional.", "Conheça o trabalho com organizações"],
      ["Hospitalidade", "Trabalho corporal e experiências somáticas que tornam o cuidado uma parte concreta da experiência do hóspede.", "Conheça a hospitalidade"],
    ],
    meetLabel: "Conheça Alex Mendes", meetTitle: "Uma prática formada entre disciplinas",
    meetText: "Alex Mendes conecta o conhecimento concreto do corpo à compreensão de processos emocionais, desenvolvimentais e relacionais. Seu trabalho reúne Dança e Somática, Psicologia Formativa, Massoterapia, Contato Improvisação e o estudo das organizações.",
    meetAction: "Conheça Alex Mendes",
    closeTitle: "O que pode se tornar possível quando começamos pelo que já está aqui?",
    closeText: "O primeiro passo não exige condições ideais. Exige disponibilidade para um primeiro encontro.",
    closePrimary: "Agendar sessão", closeSecondary: "Iniciar uma conversa",
  },
} as const;

const pages = {
  about: {
    en: {
      label: "About Three Arches", title: "No ideal conditions. Only dispositions.", lead: "Some things can be planned. Others can only happen.",
      sections: [
        ["Availability before control", "An encounter cannot be manufactured, but conditions can be cultivated for it. Availability means staying attentive to what is here without deciding in advance what it must become."],
        ["The real is relational", "Body, care and relationships are not separate territories. They sustain one another: the body senses and responds, care supports new possibilities, and relationships give change a living context."],
        ["Staying with complexity", "Three Arches does not promise predetermined outcomes. It combines intuition and analysis, helping people remain in dialogue with uncertainty while making grounded choices."],
      ],
      actionTitle: "Discover how this philosophy becomes practice", actions: ["Individual Care", "Organizations", "Hospitality"],
    },
    fi: {
      label: "Tietoa Three Archesista", title: "Ei ihanteellisia olosuhteita. Vain valmiuksia.", lead: "Joitakin asioita voi suunnitella. Toiset voivat vain tapahtua.",
      sections: [
        ["Saatavilla oleminen ennen hallintaa", "Kohtaamista ei voi valmistaa, mutta sille voi vaalia olosuhteita. Saatavilla oleminen tarkoittaa tarkkaavaisuutta sille, mikä on tässä, ilman että päätämme etukäteen, mitä siitä pitäisi tulla."],
        ["Todellinen on relationaalista", "Keho, hoiva ja suhteet eivät ole erillisiä alueita. Ne kannattelevat toisiaan: keho aistii ja vastaa, hoiva tukee uusia mahdollisuuksia ja suhteet antavat muutokselle elävän yhteyden."],
        ["Monimutkaisuuden äärellä", "Three Arches ei lupaa ennalta määrättyjä tuloksia. Se yhdistää intuition ja analyysin ja auttaa pysymään vuoropuhelussa epävarmuuden kanssa sekä tekemään maadoittuneita valintoja."],
      ],
      actionTitle: "Katso, miten filosofia muuttuu käytännöksi", actions: ["Yksilöllinen hoito", "Organisaatiot", "Vieraanvaraisuus"],
    },
    pt: {
      label: "Sobre a Three Arches", title: "Sem condições ideais. Apenas disposições.", lead: "Algumas coisas podem ser planejadas. Outras só podem acontecer.",
      sections: [
        ["Disponibilidade antes do controle", "Um encontro não pode ser fabricado, mas suas condições podem ser cultivadas. Disponibilidade é permanecer atento ao que está aqui, sem decidir de antemão o que isso deve se tornar."],
        ["O real é relacional", "Corpo, cuidado e relações não são territórios separados. Sustentam-se mutuamente: o corpo sente e responde, o cuidado apoia novas possibilidades e as relações dão à mudança um contexto vivo."],
        ["Permanecer com a complexidade", "A Three Arches não promete resultados predeterminados. Ela combina intuição e análise, ajudando pessoas a dialogar com a incerteza e fazer escolhas com os pés no chão."],
      ],
      actionTitle: "Descubra como essa filosofia se torna prática", actions: ["Cuidado individual", "Organizações", "Hospitalidade"],
    },
  },
  alex: {
    en: {
      label: "Meet Alex Mendes", title: "A practice formed between bodies, places and disciplines.", lead: "Alex’s path between Brazil and Finland connects clinical care, movement research and relational learning.",
      sections: [
        ["Body and emotional process", "Dance and Somatics, Formative Psychology and Massage Therapy built a concrete understanding of how bodily organization, emotion and development shape one another."],
        ["Relationship as a laboratory", "Contact Improvisation became a practical field for studying attention, trust, boundaries, weight, cooperation and choice in real time."],
        ["From individual to collective", "Studies in the humanities and organizations widened the work toward teams and institutions. Alex is the founder and a practitioner of Three Arches, while the practice remains larger than one personality."],
      ],
      actionTitle: "Explore Alex’s work", actions: ["Book Individual Care", "Work with Organizations", "Hospitality Partnerships"],
    },
    fi: {
      label: "Tutustu Alex Mendesiin", title: "Kehojen, paikkojen ja tieteenalojen välillä muotoutunut käytäntö.", lead: "Alexin polku Brasilian ja Suomen välillä yhdistää kliinisen hoidon, liiketutkimuksen ja relationaalisen oppimisen.",
      sections: [
        ["Keho ja tunneprosessi", "Tanssi ja somatiikka, Formative Psychology sekä hierontaterapia rakensivat konkreettisen ymmärryksen siitä, miten kehon järjestäytyminen, tunteet ja kehitys muovaavat toisiaan."],
        ["Suhde laboratoriona", "Kontakti-improvisaatiosta tuli käytännöllinen kenttä tarkkaavaisuuden, luottamuksen, rajojen, painon, yhteistyön ja valinnan tutkimiseen reaaliajassa."],
        ["Yksilöllisestä kollektiiviseen", "Humanististen tieteiden ja organisaatioiden opinnot laajensivat työn tiimeihin ja instituutioihin. Alex on Three Archesin perustaja ja ammatinharjoittaja, mutta käytäntö on yhtä henkilöä laajempi."],
      ],
      actionTitle: "Tutustu Alexin työhön", actions: ["Varaa yksilöllinen hoito", "Työskentele organisaatioiden kanssa", "Vieraanvaraisuuskumppanuudet"],
    },
    pt: {
      label: "Conheça Alex Mendes", title: "Uma prática formada entre corpos, lugares e disciplinas.", lead: "O percurso de Alex entre Brasil e Finlândia conecta cuidado clínico, pesquisa do movimento e aprendizagem relacional.",
      sections: [
        ["Corpo e processo emocional", "Dança e Somática, Psicologia Formativa e Massoterapia construíram uma compreensão concreta de como organização corporal, emoção e desenvolvimento se moldam mutuamente."],
        ["A relação como laboratório", "O Contato Improvisação tornou-se um campo prático para estudar atenção, confiança, limites, peso, cooperação e escolha em tempo real."],
        ["Do individual ao coletivo", "Estudos em humanidades e organizações ampliaram o trabalho para equipes e instituições. Alex é fundador e praticante da Three Arches, enquanto a prática permanece maior do que uma personalidade."],
      ],
      actionTitle: "Conheça o trabalho de Alex", actions: ["Agendar cuidado individual", "Trabalhar com organizações", "Parcerias em hospitalidade"],
    },
  },
  care: {
    en: {
      label: "Individual Care", title: "Care for what your body is experiencing now.", lead: "Manual therapy and somatic work for pain, muscular tension, fatigue, stress, overload and recovery.",
      sections: [
        ["What a session can support", "Sessions may help ease pain and tension, support nervous-system regulation, restore movement and create a clearer connection with bodily signals. Care is adapted to your present condition."],
        ["What happens", "We begin with a short conversation about what brings you in. The session may include massage, manual therapy, guided awareness and simple movement. You remain informed and in choice throughout."],
        ["Practical information", "Sessions take place in Helsinki and are suitable for adults seeking recovery, regulation or body-based support. Current duration, availability and prices are shown in Timma before you confirm."],
      ],
      actionTitle: "A first session begins with what is here.", actions: ["Book a Session"],
    },
    fi: {
      label: "Yksilöllinen hoito", title: "Hoivaa sille, mitä kehosi kokee juuri nyt.", lead: "Manuaalista terapiaa ja somaattista työskentelyä kipuun, lihasjännitykseen, väsymykseen, stressiin, kuormitukseen ja palautumiseen.",
      sections: [
        ["Mihin tapaaminen voi auttaa", "Tapaaminen voi lievittää kipua ja jännitystä, tukea hermoston säätelyä, palauttaa liikettä ja selkeyttää yhteyttä kehon viesteihin. Hoito mukautetaan tämänhetkiseen tilanteeseesi."],
        ["Mitä tapaamisessa tapahtuu", "Aloitamme lyhyellä keskustelulla siitä, mikä tuo sinut paikalle. Tapaaminen voi sisältää hierontaa, manuaalista terapiaa, ohjattua kehontuntemusta ja yksinkertaista liikettä. Saat tietoa ja säilytät valinnan koko ajan."],
        ["Käytännön tiedot", "Tapaamiset järjestetään Helsingissä ja sopivat aikuisille, jotka etsivät palautumista, säätelyä tai kehollista tukea. Ajantasainen kesto, saatavuus ja hinnat näkyvät Timmassa ennen vahvistamista."],
      ],
      actionTitle: "Ensimmäinen tapaaminen alkaa siitä, mikä on tässä.", actions: ["Varaa aika"],
    },
    pt: {
      label: "Cuidado individual", title: "Cuidado para o que seu corpo vive agora.", lead: "Terapia manual e trabalho somático para dor, tensão muscular, fadiga, estresse, sobrecarga e recuperação.",
      sections: [
        ["Como uma sessão pode ajudar", "As sessões podem aliviar dor e tensão, apoiar a regulação do sistema nervoso, recuperar movimento e esclarecer a conexão com os sinais do corpo. O cuidado se adapta à sua condição presente."],
        ["O que acontece", "Começamos com uma breve conversa sobre o que traz você. A sessão pode incluir massagem, terapia manual, percepção guiada e movimentos simples. Você permanece informado e com poder de escolha o tempo todo."],
        ["Informações práticas", "As sessões acontecem em Helsinque e são indicadas para adultos em busca de recuperação, regulação ou apoio corporal. Duração, disponibilidade e preços atuais aparecem no Timma antes da confirmação."],
      ],
      actionTitle: "A primeira sessão começa pelo que está aqui.", actions: ["Agendar sessão"],
    },
  },
  organizations: {
    en: {
      label: "Organizations", title: "Human realities shape organizational life.", lead: "Embodied and relational learning helps leaders and teams work with trust, pressure, adaptability and collaboration as lived experiences—not abstract indicators.",
      sections: [
        ["Leading within complexity", "Leadership is not only the control of outcomes. It is the capacity to sustain attention, psychological safety and meaningful choice when conditions are uncertain."],
        ["Learning through experience", "Talks, workshops and longer programs use embodied learning and experiential facilitation. Principles from Contact Improvisation are translated responsibly into practices of listening, boundaries, support and cooperation."],
        ["Outcomes without false promises", "Work can support relational intelligence, trust, adaptability and healthier responses to stress. Goals and evaluation are agreed together without guaranteeing predetermined results."],
      ],
      actionTitle: "Start with an exploratory conversation.", actions: ["Start an Organizational Conversation"],
    },
    fi: {
      label: "Organisaatiot", title: "Inhimillinen todellisuus muovaa organisaatioelämää.", lead: "Kehollinen ja relationaalinen oppiminen auttaa johtajia ja tiimejä työskentelemään luottamuksen, paineen, sopeutumiskyvyn ja yhteistyön kanssa elettyinä kokemuksina, ei abstrakteina mittareina.",
      sections: [
        ["Johtaminen monimutkaisuudessa", "Johtaminen ei ole vain tulosten hallintaa. Se on kykyä ylläpitää tarkkaavaisuutta, psykologista turvallisuutta ja merkityksellisiä valintoja epävarmoissa olosuhteissa."],
        ["Oppiminen kokemuksen kautta", "Puheenvuorot, työpajat ja pidemmät ohjelmat hyödyntävät kehollista oppimista ja kokemuksellista fasilitointia. Kontakti-improvisaation periaatteet käännetään vastuullisesti kuuntelemisen, rajojen, tuen ja yhteistyön käytännöiksi."],
        ["Tuloksia ilman katteettomia lupauksia", "Työ voi tukea suhdeälykkyyttä, luottamusta, sopeutumiskykyä ja terveempiä tapoja vastata stressiin. Tavoitteet ja arviointi sovitaan yhdessä ilman ennalta määrättyjen tulosten takaamista."],
      ],
      actionTitle: "Aloita kartoittavalla keskustelulla.", actions: ["Aloita keskustelu organisaatiostasi"],
    },
    pt: {
      label: "Organizações", title: "Realidades humanas moldam a vida organizacional.", lead: "A aprendizagem incorporada e relacional ajuda líderes e equipes a trabalhar confiança, pressão, adaptabilidade e colaboração como experiências vividas, não como indicadores abstratos.",
      sections: [
        ["Liderar dentro da complexidade", "Liderança não é apenas controle de resultados. É a capacidade de sustentar atenção, segurança psicológica e escolhas significativas quando as condições são incertas."],
        ["Aprender pela experiência", "Palestras, oficinas e programas mais longos usam aprendizagem incorporada e facilitação experiencial. Princípios do Contato Improvisação são traduzidos com responsabilidade em práticas de escuta, limites, apoio e cooperação."],
        ["Resultados sem falsas promessas", "O trabalho pode apoiar inteligência relacional, confiança, adaptabilidade e respostas mais saudáveis ao estresse. Objetivos e avaliação são acordados em conjunto, sem garantia de resultados predeterminados."],
      ],
      actionTitle: "Comece com uma conversa exploratória.", actions: ["Iniciar conversa sobre sua organização"],
    },
  },
  hospitality: {
    en: {
      label: "Hospitality", title: "Care can become part of what guests remember.", lead: "Bodywork and somatic experiences help hotels and retreats communicate hospitality through attention, atmosphere, touch and presence.",
      sections: [
        ["A meaningful guest experience", "Care is not an extra wellness slogan. It is felt in the quality of attention, in how guests settle, recover and feel received in a place."],
        ["Adaptable formats", "Offerings can be designed for individual guests, groups, retreats and special programs—from bookable bodywork to guided somatic experiences."],
        ["A workable partnership", "Together we consider schedule, space, guest journey, communication, capacity and safeguarding. The aim is a partnership that is distinctive, responsible and operationally realistic."],
      ],
      actionTitle: "Explore what care could mean in your setting.", actions: ["Discuss a Hospitality Partnership"],
    },
    fi: {
      label: "Vieraanvaraisuus", title: "Hoivasta voi tulla osa sitä, mitä vieraat muistavat.", lead: "Kehollinen hoito ja somaattiset kokemukset auttavat hotelleja ja retriittejä välittämään vieraanvaraisuutta huomion, ilmapiirin, kosketuksen ja läsnäolon kautta.",
      sections: [
        ["Merkityksellinen vieraskokemus", "Hoiva ei ole ylimääräinen hyvinvointilause. Se tuntuu huomion laadussa ja siinä, miten vieras asettuu, palautuu ja kokee tulevansa vastaanotetuksi."],
        ["Mukautuvat muodot", "Tarjonta voidaan suunnitella yksittäisille vieraille, ryhmille, retriiteille ja erityisohjelmiin — varattavasta kehohoidosta ohjattuihin somaattisiin kokemuksiin."],
        ["Toimiva kumppanuus", "Tarkastelemme yhdessä aikataulua, tilaa, vieraan polkua, viestintää, kapasiteettia ja turvallisuutta. Tavoitteena on omaleimainen, vastuullinen ja käytännössä toimiva kumppanuus."],
      ],
      actionTitle: "Tutki, mitä hoiva voisi tarkoittaa ympäristössäsi.", actions: ["Keskustele vieraanvaraisuuskumppanuudesta"],
    },
    pt: {
      label: "Hospitalidade", title: "O cuidado pode fazer parte do que os hóspedes lembram.", lead: "Trabalho corporal e experiências somáticas ajudam hotéis e retiros a comunicar hospitalidade por meio da atenção, atmosfera, toque e presença.",
      sections: [
        ["Uma experiência significativa", "Cuidado não é mais um slogan de bem-estar. Ele é sentido na qualidade da atenção e em como hóspedes se acomodam, se recuperam e se sentem recebidos em um lugar."],
        ["Formatos adaptáveis", "As propostas podem ser desenhadas para hóspedes individuais, grupos, retiros e programas especiais — de sessões corporais agendáveis a experiências somáticas guiadas."],
        ["Uma parceria viável", "Consideramos juntos horários, espaço, jornada do hóspede, comunicação, capacidade e proteção. O objetivo é uma parceria singular, responsável e operacionalmente realista."],
      ],
      actionTitle: "Explore o que o cuidado pode significar no seu espaço.", actions: ["Conversar sobre parceria em hospitalidade"],
    },
  },
  contact: {
    en: {
      label: "First Encounter", title: "Choose the next step that fits.", lead: "You only need to share what is necessary for the route you choose.",
      sections: [
        ["Individual care", "View current times, session lengths and prices, then book securely through Timma."],
        ["Organizations", "Tell us briefly about your team, context and what you would like to explore."],
        ["Hospitality", "Share your venue, guest context and the kind of experience you are considering."],
      ],
      actionTitle: "General contact", actions: ["Email Three Arches"],
    },
    fi: {
      label: "Ensimmäinen kohtaaminen", title: "Valitse sinulle sopiva seuraava askel.", lead: "Sinun tarvitsee kertoa vain valitsemasi reitin kannalta tarpeellinen.",
      sections: [
        ["Yksilöllinen hoito", "Katso vapaat ajat, tapaamisten kestot ja hinnat ja varaa turvallisesti Timman kautta."],
        ["Organisaatiot", "Kerro lyhyesti tiimistäsi, tilanteestanne ja siitä, mitä haluaisitte tutkia."],
        ["Vieraanvaraisuus", "Kerro paikastanne, vieraidenne tilanteesta ja harkitsemastanne kokemuksesta."],
      ],
      actionTitle: "Yleinen yhteydenotto", actions: ["Lähetä sähköpostia"],
    },
    pt: {
      label: "Primeiro encontro", title: "Escolha o próximo passo adequado.", lead: "Você só precisa compartilhar o necessário para o caminho escolhido.",
      sections: [
        ["Cuidado individual", "Veja horários, duração das sessões e preços atuais e agende com segurança pelo Timma."],
        ["Organizações", "Conte brevemente sobre sua equipe, seu contexto e o que gostaria de explorar."],
        ["Hospitalidade", "Compartilhe seu espaço, o contexto dos hóspedes e o tipo de experiência que está considerando."],
      ],
      actionTitle: "Contato geral", actions: ["Enviar e-mail"],
    },
  },
} as const;

const contactInfo = {
  en: {
    intro: "Choose the channel that feels most practical. Individual sessions are booked through Timma; organizational and hospitality conversations are arranged directly.",
    whatsapp: "WhatsApp Business", whatsappAction: "Open WhatsApp", whatsappMessage: "Hello Three Arches, I would like to start a conversation.",
    email: "Email", emailAction: "Send an email",
    location: "Studio", address: "Snellmaninkatu 29 C · Kruununhaka · 00170 Helsinki", mapsAction: "Open in Google Maps",
    availability: "Availability", availabilityText: "Individual care is available by appointment; current times are shown in Timma. Organizational and hospitality conversations, meetings and projects are arranged according to context and mutual availability.",
  },
  fi: {
    intro: "Valitse sinulle käytännöllisin yhteydenottotapa. Yksilölliset hoitoajat varataan Timmasta; organisaatio- ja vieraanvaraisuuskeskustelut sovitaan suoraan.",
    whatsapp: "WhatsApp Business", whatsappAction: "Avaa WhatsApp", whatsappMessage: "Hei Three Arches, haluaisin aloittaa keskustelun.",
    email: "Sähköposti", emailAction: "Lähetä sähköpostia",
    location: "Studio", address: "Snellmaninkatu 29 C · Kruununhaka · 00170 Helsinki", mapsAction: "Avaa Google Mapsissa",
    availability: "Saatavuus", availabilityText: "Yksilöllinen hoito on saatavilla ajanvarauksella; ajantasaiset ajat näkyvät Timmassa. Organisaatioiden ja vieraanvaraisuuden keskustelut, tapaamiset ja projektit sovitaan tilanteen ja yhteisen saatavuuden mukaan.",
  },
  pt: {
    intro: "Escolha o canal mais prático para você. Os atendimentos individuais são agendados pelo Timma; conversas com organizações e hospitalidade são combinadas diretamente.",
    whatsapp: "WhatsApp Business", whatsappAction: "Abrir WhatsApp", whatsappMessage: "Olá, Three Arches. Gostaria de iniciar uma conversa.",
    email: "E-mail", emailAction: "Enviar e-mail",
    location: "Estúdio", address: "Snellmaninkatu 29 C · Kruununhaka · 00170 Helsinki", mapsAction: "Abrir no Google Maps",
    availability: "Disponibilidade", availabilityText: "O cuidado individual acontece mediante agendamento; os horários atuais estão disponíveis no Timma. Conversas, reuniões e projetos com organizações e hospitalidade são combinados conforme o contexto e a disponibilidade das partes.",
  },
} as const;

const routes = ["/about", "/individual-care", "/organizations", "/hospitality", "/alex"];
const pageRoutes: Record<Page, string> = { home: "/", about: "/about", alex: "/alex", care: "/individual-care", organizations: "/organizations", hospitality: "/hospitality", contact: "/contact" };

function route(path: string, lang: Lang) {
  return `${path}?lang=${lang}`;
}

function Header({ lang, setLang, page }: { lang: Lang; setLang: (l: Lang) => void; page: Page }) {
  const t = ui[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.classList.remove("menu-is-open"); };
  }, [menuOpen]);
  const menuItems = [
    ["Home", "/"], [t.nav[1], "/individual-care"], [t.nav[2], "/organizations"], [t.nav[3], "/hospitality"], [t.nav[4], "/alex"], [t.contact, "/contact"],
  ];
  return (
    <header className="nav-shell">
      <a href={route("/", lang)} className="brand" aria-label="Three Arches home"><img className="brand-symbol" src="/brand/three-arches-symbol.png" alt="" /></a>
      <nav aria-label="Main navigation">
        <a href={route("/about", lang)}>{t.nav[0]}</a>
        <a href={route("/individual-care", lang)}>{t.nav[1]}</a>
        <a href={route("/organizations", lang)}>{t.nav[2]}</a>
        <a href={route("/hospitality", lang)}>{t.nav[3]}</a>
        <a href={route("/alex", lang)}>{t.nav[4]}</a>
      </nav>
      <div className="nav-actions">
        <div className="language" aria-label="Choose language">{(["en", "fi", "pt"] as Lang[]).map((code) => <button key={code} onClick={() => setLang(code)} aria-pressed={lang === code}>{code.toUpperCase()}</button>)}</div>
        <a className="button button-small" href={TIMMA} target="_blank" rel="noreferrer">{t.book}</a>
        <button className="menu-trigger" type="button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="site-menu"><span>{t.menu}</span><i aria-hidden="true">☰</i></button>
      </div>
      {page !== "home" && <a className="mobile-back" href={route("/", lang)}>← {t.back}</a>}
      <button className={`menu-scrim ${menuOpen ? "is-open" : ""}`} type="button" aria-label={t.close} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1} />
      <aside className={`menu-panel ${menuOpen ? "is-open" : ""}`} id="site-menu" aria-hidden={!menuOpen} aria-label={t.menu}>
        <div className="menu-panel-head"><img src="/brand/three-arches-symbol.png" alt="" /><button type="button" onClick={() => setMenuOpen(false)}>{t.close} <span aria-hidden="true">×</span></button></div>
        <nav aria-label={t.menu}>{menuItems.map(([label, path], index) => <a key={path} href={route(path, lang)} onClick={() => setMenuOpen(false)} style={{"--menu-index": index} as CSSProperties}><span>0{index + 1}</span>{label}</a>)}</nav>
        <a className="button menu-book" href={TIMMA} target="_blank" rel="noreferrer">{t.book}<span>↗</span></a>
      </aside>
    </header>
  );
}

function Footer({ lang }: { lang: Lang }) {
  return <footer><span>© 2026 THREE ARCHES</span><span className="footer-logo-frame"><img className="footer-logo" src="/brand/three-arches-logo-yellow.png" alt="Three Arches" /></span><a href="#top">{ui[lang].top} ↑</a></footer>;
}

export default function SitePage({ page }: { page: Page }) {
  const [lang, setLang] = useState<Lang>("en");
  const [activeArch, setActiveArch] = useState<number | null>(null);

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("lang");
    if (value === "fi" || value === "pt" || value === "en") setLang(value);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url);
    document.documentElement.lang = lang;
  }, [lang]);

  if (page === "home") {
    const t = home[lang];
    return (
      <main className="site-shell" id="top">
        <Header lang={lang} setLang={setLang} page={page} />
        <section className="home-hero">
          <div className="hero-copy">
            <p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p className="hero-intro">{t.intro}</p>
            <div className="hero-actions"><a className="button" href={route("/individual-care", lang)}>{t.primary}</a><a className="text-link" href={route("/organizations", lang)}>{t.secondary}<span>↘</span></a></div>
          </div>
          <div className="hero-visual"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-image"><img src="/images/movement.jpeg" alt="Alex Mendes exploring somatic movement" /></div><div className="floating-note">BODY · CARE · RELATIONSHIPS</div></div>
        </section>

        <section className="home-intro editorial"><p className="eyebrow">Three Arches</p><h2>{t.introTitle}</h2><p>{t.introText}</p></section>

        <section className="arches-section">
          <div className="section-kicker"><p className="eyebrow">{t.eyebrow}</p><h2>{t.archesTitle}</h2></div>
          <div className="arches-grid">
            {t.arches.map(([title, summary, detail], index) => (
              <button className={`arch-card ${activeArch === index ? "is-active" : ""}`} key={title} onMouseEnter={() => setActiveArch(index)} onMouseLeave={() => setActiveArch(null)} onFocus={() => setActiveArch(index)} onClick={() => setActiveArch(activeArch === index ? null : index)} aria-expanded={activeArch === index}>
                <span className="arch-number">0{index + 1}</span><span className="arch-shape" /><strong>{title}</strong><span className="arch-summary">{summary}</span><span className="arch-detail">{detail}</span>
              </button>
            ))}
          </div>
          <a className="text-link" href={route("/about", lang)}>{t.philosophy}<span>↘</span></a>
        </section>

        <section className="pathway-section">
          <div className="section-kicker"><p className="eyebrow">Three pathways</p><h2>{t.pathwaysTitle}</h2></div>
          <div className="pathway-grid">{t.pathways.map(([title, text, action], index) => <article className="pathway-card" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><a href={route(routes[index + 1], lang)}>{action} ↗</a></article>)}</div>
        </section>

        <section className="meet-section"><div className="meet-image"><img src="/images/alex-portrait.jpeg" alt="Portrait of Alex Mendes" /><span>Rio de Janeiro ↔ Helsinki</span></div><div className="meet-copy"><p className="eyebrow">{t.meetLabel}</p><h2>{t.meetTitle}</h2><p>{t.meetText}</p><a className="text-link" href={route("/alex", lang)}>{t.meetAction}<span>↘</span></a></div></section>

        <section className="reviews-section">
          <div className="reviews-heading"><p className="eyebrow">{reviews[lang].label}</p><h2>{reviews[lang].title}</h2><p>{reviews[lang].intro}</p></div>
          <div className="reviews-track" aria-label={reviews[lang].label}>{reviews[lang].items.map(([author, quote, note], index) => <article className="review-card" key={author}>
            <div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“{quote}”</blockquote><div className="review-meta"><strong>{author}</strong><span>{note} · Google review</span></div><a href={REVIEW_LINKS[index]} target="_blank" rel="noreferrer">{reviews[lang].source} ↗</a>
          </article>)}</div>
          <a className="text-link" href={GOOGLE_PROFILE} target="_blank" rel="noreferrer">{reviews[lang].all}<span>↗</span></a>
        </section>

        <section className="closing"><p className="eyebrow">Three Arches · Helsinki</p><h2>{t.closeTitle}</h2><p>{t.closeText}</p><div className="closing-actions"><a className="button" href={TIMMA} target="_blank" rel="noreferrer">{t.closePrimary}<span>↗</span></a><a className="button button-outline" href={route("/contact", lang)}>{t.closeSecondary}<span>↗</span></a></div></section>
        <Footer lang={lang} />
      </main>
    );
  }

  const t = pages[page][lang];
  const heroImage = page === "alex" ? "/images/alex-portrait.jpeg" : page === "care" ? "/images/massage-room.jpeg" : page === "organizations" ? "/images/facilitation.jpg" : page === "hospitality" ? "/images/somatic-hands.jpg" : "/images/movement.jpeg";
  const actionLinks = page === "about" ? ["/individual-care", "/organizations", "/hospitality"] : page === "alex" ? ["/individual-care", "/organizations", "/hospitality"] : [];

  return (
    <main className={`site-shell internal-page page-${page}`} id="top">
      <Header lang={lang} setLang={setLang} page={page} />
      <section className="internal-hero">
        <div><a className="back-link" href={route("/", lang)}>← {ui[lang].back}</a><p className="eyebrow">{t.label}</p><h1>{t.title}</h1><p className="internal-lead">{t.lead}</p></div>
        <div className="internal-image"><img src={heroImage} alt="" /></div>
      </section>
      <section className="content-strands">
        {t.sections.map(([title, text], i) => <article key={title}><span>0{i + 1}</span><h2>{title}</h2><p>{text}</p>{page === "contact" && <a className="strand-link" href={i === 0 ? TIMMA : `${route("/contact", lang)}#general-contact`} target={i === 0 ? "_blank" : undefined} rel={i === 0 ? "noreferrer" : undefined}>{i === 0 ? ui[lang].book : title} ↗</a>}</article>)}
      </section>
      {page === "contact" ? (() => {
        const c = contactInfo[lang];
        const whatsappHref = `${WHATSAPP}?text=${encodeURIComponent(c.whatsappMessage)}`;
        return <><section className="review-invitation"><div><p className="eyebrow">Google reviews</p><h2>{reviews[lang].contactTitle}</h2><p>{reviews[lang].contactText}</p></div><a className="button button-outline" href={GOOGLE_PROFILE} target="_blank" rel="noreferrer">{reviews[lang].contactAction}<span>↗</span></a></section><section className="contact-panel" id="general-contact">
          <div className="contact-heading"><p className="eyebrow">{t.label}</p><h2>{t.actionTitle}</h2><p>{c.intro}</p></div>
          <div className="contact-grid">
            <article><span>01</span><h3>{c.whatsapp}</h3><p>+358 40 809 3022</p><a href={whatsappHref} target="_blank" rel="noreferrer">{c.whatsappAction} ↗</a></article>
            <article><span>02</span><h3>{c.email}</h3><p>{EMAIL}</p><a href={`mailto:${EMAIL}`}>{c.emailAction} ↗</a></article>
            <article><span>03</span><h3>{c.location}</h3><p>{c.address}</p><a href={MAPS} target="_blank" rel="noreferrer">{c.mapsAction} ↗</a></article>
            <article><span>04</span><h3>{c.availability}</h3><p>{c.availabilityText}</p></article>
          </div>
        </section></>;
      })() : <section className="internal-cta">
        <p className="eyebrow">{t.label}</p><h2>{t.actionTitle}</h2>
        <div className="closing-actions">{t.actions.map((action, i) => {
          const href = actionLinks[i] ? route(actionLinks[i], lang) : page === "care" ? TIMMA : `${route("/contact", lang)}#general-contact`;
          return <a className={`button ${i > 0 ? "button-outline" : ""}`} href={href} key={action} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{action}<span>↗</span></a>;
        })}</div>
      </section>}
      <Footer lang={lang} />
    </main>
  );
}
