# Hero Section Guide

Research summary and drafting kit for the first screen of the portfolio.
Site copy stays in Spanish; this document is in English per AGENTS.md.

## 1. What the research says

Sources are mostly career blogs and hiring guides, not rigorous studies. Treat
numbers as directional. The advice that repeats across sources:

- The first screen must answer, without scrolling: who you are, what role you
  want, and what to do next.
- Name a specific role. "Developer" or "Ingeniero de Sistemas" alone is weak;
  "Desarrollador Android" or "Desarrollador full stack junior" is stronger.
- Keep it to 2-3 lines of copy plus actions. Recruiters skim in seconds.
- Avoid generic openers ("apasionado por la tecnología", "amante del código").
- Replace adjectives with evidence: shipped app, delivered client system.
- A large share of first visits happen on mobile: the hero must fit 375px.
- Primary action points to work ("Ver proyectos"); secondary to the CV.
- Group skills by category; no proficiency bars.
- For juniors, 3-4 strong projects beat many weak ones.

## 2. Hero anatomy (every field editable in `content/profile.js`)

| Slot       | Purpose                                       | Example                                                                       |
| :--------- | :-------------------------------------------- | :---------------------------------------------------------------------------- |
| `eyebrow`  | Role + context, small text above the headline | Desarrollador Android - Ing. de Sistemas                                      |
| `name`     | Display name                                  | Jean Herrán                                                                   |
| `headline` | One sentence: what you build, with what       | Desarrollo apps Android nativas con Kotlin y Compose.                         |
| `subline`  | Proof + what you are looking for              | Publiqué Vinyls y entregué un sistema a un cliente real. Busco mi primer rol. |
| `facts`    | 2-4 verifiable chips (optional)               | Disponible - [ciudad] / remoto - 4 proyectos                                  |
| `actions`  | 1-2 buttons                                   | Ver proyectos / Descargar CV                                                  |
| `photo`    | Optional headshot                             | `assets/me.avif` or null                                                      |

## 3. Drafts to choose from (pick the role first)

The right draft depends on the job you are applying for. Each claim must be
true and verifiable before publishing (Play Store and public repo pending).

**Draft 1 - Android focus**

- Eyebrow: Desarrollador Android - Ingeniero de Sistemas
- Headline: Desarrollo apps Android nativas con Kotlin y Jetpack Compose.
- Subline: Creé Vinyls, un reproductor HiFi con control desde Wear OS, y
  entregué un sistema de facturación a un cliente real. Busco mi primer rol
  como desarrollador Android.

**Draft 2 - Generalist, delivery as differentiator (CHOSEN by user, 2026-11-02)**

- Eyebrow: Ingeniero de Sistemas - Desarrollador de software
- Headline: Construyo software que llega a usuarios reales.
- Subline: Desde apps Android nativas hasta integraciones en tiempo real con
  APIs de terceros. Recién graduado y buscando mi primer equipo.

**Draft 3 - Integrations / backend focus**

- Eyebrow: Desarrollador backend junior - Ingeniero de Sistemas
- Headline: Conecto sistemas para que los datos lleguen completos y a tiempo.
- Subline: Integré la facturación de una clínica con dos APIs externas en
  tiempo real. También desarrollo apps Android y web.

## 4. Information needed from the user

1. Target role for the job search: answered, generalist (Draft 2).
2. Display name exactly as it should appear.
3. City or "remoto", and availability (inmediata, prácticas, medio tiempo).
4. Which claims can be made public (Play Store, client delivery wording).
5. Photo: yes or no.
6. CV in PDF: ready or pending.
7. LinkedIn URL and any extra contact (email is optional; it attracts spam).

## Sources

- https://templifica.com/blog/7-sections-every-developer-portfolio-needs-to-convert-in-2026
- https://www.codecademy.com/resources/blog/what-to-include-in-a-junior-developer-portfolio
- https://www.dice.com/career-advice/your-first-resume-and-portfolio-what-tech-hiring-managers-really-want-to-see
- https://daily.dev/blog/how-to-build-developer-profile-get-noticed/
- https://www.ilerna.es/blog/como-hacer-portafolio-programador-junior
- https://platzi.com/cursos/portafolio-desarrollo-web/secciones-clave-de-un-portafolio-profesi/
