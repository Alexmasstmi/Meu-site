"use client";

import { useState } from "react";

type Lang = "en" | "fi" | "pt";

const copy = {
  en: {
    nav: ["Approach", "Experiences", "For organizations", "About"],
    book: "Book a session",
    eyebrow: "Body · care · Relationships",
    titleA: "The body is where",
    titleB: "change begins.",
    intro: "Three Arches creates experiences where movement, care and learning meet — helping people and organizations build healthier, more conscious ways of relating.",
    explore: "Discover the work",
    pathsTitle: "Two paths. One human practice.",
    pathsIntro: "From individual care to collective transformation, every encounter begins by listening to the body.",
    individual: "For you",
    individualTitle: "Come back to your body.",
    individualText: "Personal sessions for regulation, recovery and renewed connection through therapeutic touch and somatic practice.",
    org: "For organizations",
    orgTitle: "Human cultures move differently.",
    orgText: "Embodied learning for teams and leaders who want care, cooperation and sustainable performance to shape how work happens.",
    services: "Our practice",
    serviceList: [
      ["01", "Massage & manual therapy", "Touch that releases tension, supports the nervous system and restores physical and emotional balance."],
      ["02", "Somatic regulation", "A body-based process for recognizing patterns, expanding choice and meeting pressure with more presence."],
      ["03", "Group facilitation", "Creative experiences that strengthen trust, non-verbal communication, cooperation and collective intelligence."],
    ],
    statement: "Care is not separate from how we move, learn or work. It is the ground from which meaningful change becomes possible.",
    founder: "Founded and led by Alex Mendes",
    aboutTitle: "A practice born from encounter.",
    aboutText: "Alex’s work brings together somatics, movement arts, therapeutic touch and collaborative learning. Shaped between communities and organizations, it creates bridges between individual well-being and the relationships that sustain collective life.",
    corporate: "For organizations",
    corporateTitle: "Well-being that becomes culture.",
    corporateText: "Modular programs combine individual care, somatic regulation and group facilitation. Together, they support resilient leadership, healthier collaboration and work cultures in which people can participate fully.",
    outcomes: ["Relational intelligence", "Stress regulation", "Trust & cooperation", "Creative collaboration"],
    talk: "Start a conversation",
    closing: "How would you like to move forward?",
    closingText: "Choose a personal session or tell us what your organization is ready to transform.",
    session: "Book personal care",
    organization: "Talk about your organization",
  },
  fi: {
    nav: ["Lähestymistapa", "Palvelut", "Organisaatioille", "Minusta"],
    book: "Varaa aika",
    eyebrow: "Body · care · Relationships",
    titleA: "Muutos alkaa",
    titleB: "kehosta.",
    intro: "Three Arches luo kokemuksia, joissa liike, hoiva ja oppiminen kohtaavat — auttaen ihmisiä ja organisaatioita rakentamaan terveempiä ja tietoisempia tapoja olla suhteessa.",
    explore: "Tutustu työhön",
    pathsTitle: "Kaksi polkua. Yksi inhimillinen käytäntö.",
    pathsIntro: "Yksilöllisestä hoidosta yhteisölliseen muutokseen jokainen kohtaaminen alkaa kehon kuuntelemisesta.",
    individual: "Sinulle",
    individualTitle: "Palaa kehoosi.",
    individualText: "Henkilökohtaisia tapaamisia säätelyyn, palautumiseen ja yhteyden uudistamiseen terapeuttisen kosketuksen ja somaattisen työskentelyn avulla.",
    org: "Organisaatioille",
    orgTitle: "Inhimilliset kulttuurit liikkuvat toisin.",
    orgText: "Kehollista oppimista tiimeille ja johtajille, jotka haluavat hoivan, yhteistyön ja kestävän suorituskyvyn ohjaavan työn tekemistä.",
    services: "Työskentelymme",
    serviceList: [
      ["01", "Hieronta ja manuaalinen terapia", "Kosketusta, joka vapauttaa jännitystä, tukee hermostoa ja palauttaa fyysistä ja emotionaalista tasapainoa."],
      ["02", "Somaattinen säätely", "Kehollinen prosessi mallien tunnistamiseen, valinnan laajentamiseen ja paineen kohtaamiseen läsnäolevammin."],
      ["03", "Ryhmäfasilitointi", "Luovia kokemuksia, jotka vahvistavat luottamusta, sanatonta viestintää, yhteistyötä ja kollektiivista älykkyyttä."],
    ],
    statement: "Hoiva ei ole erillään siitä, miten liikumme, opimme tai työskentelemme. Se on maaperä, josta merkityksellinen muutos kasvaa.",
    founder: "Perustaja ja ohjaaja Alex Mendes",
    aboutTitle: "Kohtaamisesta syntynyt työ.",
    aboutText: "Alexin työ yhdistää somatiikan, liiketaiteen, terapeuttisen kosketuksen ja yhteistoiminnallisen oppimisen. Yhteisöjen ja organisaatioiden välillä muotoutunut työ rakentaa siltoja yksilön hyvinvoinnin ja yhteistä elämää kannattelevien suhteiden välille.",
    corporate: "Organisaatioille",
    corporateTitle: "Hyvinvointi, josta tulee kulttuuria.",
    corporateText: "Modulaariset ohjelmat yhdistävät yksilöllisen hoivan, somaattisen säätelyn ja ryhmäfasilitoinnin. Ne tukevat kestävää johtajuutta, terveempää yhteistyötä ja työkulttuureja, joissa ihmiset voivat osallistua kokonaisina.",
    outcomes: ["Suhdeälykkyys", "Stressin säätely", "Luottamus ja yhteistyö", "Luova yhteistoiminta"],
    talk: "Aloita keskustelu",
    closing: "Miten haluaisit jatkaa?",
    closingText: "Valitse henkilökohtainen tapaaminen tai kerro, mitä organisaatiosi on valmis muuttamaan.",
    session: "Varaa henkilökohtainen hoito",
    organization: "Keskustele organisaatiostasi",
  },
  pt: {
    nav: ["Abordagem", "Experiências", "Para organizações", "Sobre"],
    book: "Agendar sessão",
    eyebrow: "Body · care · Relationships",
    titleA: "É no corpo que",
    titleB: "a mudança começa.",
    intro: "A Three Arches cria experiências onde movimento, cuidado e aprendizagem se encontram — apoiando pessoas e organizações na construção de relações mais saudáveis e conscientes.",
    explore: "Conhecer o trabalho",
    pathsTitle: "Dois caminhos. Uma prática humana.",
    pathsIntro: "Do cuidado individual à transformação coletiva, cada encontro começa pela escuta do corpo.",
    individual: "Para você",
    individualTitle: "Volte para o seu corpo.",
    individualText: "Sessões pessoais para regulação, recuperação e reconexão por meio do toque terapêutico e de práticas somáticas.",
    org: "Para organizações",
    orgTitle: "Culturas humanas se movem diferente.",
    orgText: "Aprendizagem corporal para equipes e líderes que desejam fazer do cuidado, da cooperação e da sustentabilidade parte da forma de trabalhar.",
    services: "Nossa prática",
    serviceList: [
      ["01", "Massagem e terapia manual", "Um toque que libera tensões, apoia o sistema nervoso e restaura o equilíbrio físico e emocional."],
      ["02", "Regulação somática", "Um processo corporal para reconhecer padrões, ampliar escolhas e atravessar pressões com mais presença."],
      ["03", "Facilitação de grupos", "Experiências criativas que fortalecem confiança, comunicação não verbal, cooperação e inteligência coletiva."],
    ],
    statement: "O cuidado não está separado da forma como nos movemos, aprendemos ou trabalhamos. Ele é o terreno onde mudanças significativas se tornam possíveis.",
    founder: "Fundada e conduzida por Alex Mendes",
    aboutTitle: "Uma prática que nasce do encontro.",
    aboutText: "O trabalho de Alex integra somática, artes do movimento, toque terapêutico e aprendizagem colaborativa. Formado entre comunidades e organizações, cria pontes entre o bem-estar individual e as relações que sustentam a vida coletiva.",
    corporate: "Para organizações",
    corporateTitle: "Bem-estar que se torna cultura.",
    corporateText: "Programas modulares combinam cuidado individual, regulação somática e facilitação de grupos. Juntos, apoiam lideranças resilientes, colaboração saudável e culturas de trabalho onde as pessoas podem participar por inteiro.",
    outcomes: ["Inteligência relacional", "Regulação do estresse", "Confiança e cooperação", "Colaboração criativa"],
    talk: "Começar uma conversa",
    closing: "Como você deseja seguir?",
    closingText: "Escolha uma sessão pessoal ou conte o que sua organização está pronta para transformar.",
    session: "Agendar cuidado pessoal",
    organization: "Conversar sobre sua organização",
  },
} as const;

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];

  return (
    <main className="site-shell">
      <header className="nav-shell">
        <a href="#home" className="brand" aria-label="Three Arches home">
          <img className="brand-symbol" src="/brand/three-arches-symbol.png" alt="" />
        </a>
        <nav aria-label="Main navigation">
          <a href="#approach">{t.nav[0]}</a>
          <a href="#services">{t.nav[1]}</a>
          <a href="#organizations">{t.nav[2]}</a>
          <a href="#about">{t.nav[3]}</a>
        </nav>
        <div className="nav-actions">
          <div className="language" aria-label="Choose language">
            {(["en", "fi", "pt"] as Lang[]).map((code) => (
              <button key={code} onClick={() => setLang(code)} aria-pressed={lang === code}>{code.toUpperCase()}</button>
            ))}
          </div>
          <a className="button button-small" href="#contact">{t.book}</a>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.titleA}<em>{t.titleB}</em></h1>
          <p className="hero-intro">{t.intro}</p>
          <a href="#approach" className="text-link">{t.explore}<span>↘</span></a>
        </div>
        <div className="hero-visual" aria-label="Alex Mendes in movement">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="hero-image"><img src="/images/movement.jpeg" alt="Alex Mendes exploring somatic movement" /></div>
          <div className="floating-note">BODY<br />CARE<br />RELATIONSHIPS</div>
        </div>
        <div className="scroll-note">Scroll to enter <span>↓</span></div>
      </section>

      <section className="pathways" id="approach">
        <div className="section-heading">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2>{t.pathsTitle}</h2>
          <p>{t.pathsIntro}</p>
        </div>
        <div className="path-grid">
          <article className="path path-light">
            <p className="eyebrow">01 — {t.individual}</p>
            <h3>{t.individualTitle}</h3>
            <p>{t.individualText}</p>
            <a href="#services" className="circle-link" aria-label={t.explore}>↘</a>
          </article>
          <article className="path path-dark">
            <p className="eyebrow">02 — {t.org}</p>
            <h3>{t.orgTitle}</h3>
            <p>{t.orgText}</p>
            <a href="#organizations" className="circle-link" aria-label={t.org}>↘</a>
          </article>
        </div>
      </section>

      <section className="services" id="services">
        <div className="services-label"><p className="eyebrow">{t.services}</p><span>03 ways in</span></div>
        <div className="service-list">
          {t.serviceList.map(([number, title, text], index) => (
            <article className="service" key={title}>
              <span className="service-number">{number}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
              <div className={`service-thumb thumb-${index + 1}`}><img src={["/images/massage-room.jpeg", "/images/somatic-hands.jpg", "/images/facilitation.jpg"][index]} alt="" /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="manifesto">
        <p>{t.statement}</p>
        <div className="moving-word" aria-hidden="true">SENSING · LEARNING · RELATING · MOVING ·</div>
      </section>

      <section className="about" id="about">
        <div className="about-image"><img src="/images/alex-portrait.jpeg" alt="Portrait of Alex Mendes" /><span>Rio de Janeiro ↔ Helsinki</span></div>
        <div className="about-copy"><p className="eyebrow">{t.founder}</p><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><div className="signature">Alex Mendes</div></div>
      </section>

      <section className="corporate" id="organizations">
        <div className="corporate-title"><p className="eyebrow">B2B — {t.corporate}</p><h2>{t.corporateTitle}</h2></div>
        <div className="corporate-body"><p>{t.corporateText}</p><div className="outcomes">{t.outcomes.map((item, i) => <span key={item}><b>0{i + 1}</b>{item}</span>)}</div><a className="button button-light" href="#contact">{t.talk}</a></div>
      </section>

      <section className="closing" id="contact">
        <p className="eyebrow">Three Arches · Helsinki</p>
        <h2>{t.closing}</h2><p>{t.closingText}</p>
        <div className="closing-actions">
          <a className="button" href="https://varaa.timma.fi/reservation/threearchestmialexmendes" target="_blank" rel="noreferrer">{t.session}<span>↗</span></a>
          <a className="button button-outline" href="mailto:hello@threearches.co">{t.organization}<span>↗</span></a>
        </div>
      </section>

      <footer><span>© 2026 THREE ARCHES</span><span className="footer-logo-frame"><img className="footer-logo" src="/brand/three-arches-logo-yellow.png" alt="Three Arches" /></span><a href="#home">Back to top ↑</a></footer>
    </main>
  );
}
