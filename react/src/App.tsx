import {
  EMAIL,
  RESUME_URL,
  about,
  contact,
  experience,
  hero,
  nav,
  skills,
  stats,
} from './data';
import { CURRENT, projects } from './projects';
import { Cmdline, PER_CHAR_BODY, PER_CHAR_HEADER, Typed } from './Typed';
import { useReveal } from './useInView';
import { useTheme } from './useTheme';

function DownloadButtons() {
  const { ref, className } = useReveal<HTMLDivElement>('row');
  return (
    <div ref={ref} className={className}>
      <a href={RESUME_URL} download>
        <button type="button" className="btn">
          download resume.pdf
        </button>
      </a>
      <a href={`mailto:${EMAIL}`}>
        <button type="button" className="btn btn-outline">
          email me
        </button>
      </a>
    </div>
  );
}

function ProjectSwitcher() {
  return (
    <span className="projsw">
      {projects.map((p) =>
        p.id === CURRENT ? (
          <span key={p.id} className="sw is-active" aria-current="page">
            {p.label}
          </span>
        ) : (
          <a key={p.id} className="sw" href={p.href}>
            {p.label}
          </a>
        ),
      )}
    </span>
  );
}

function Termbar() {
  const { ref, className } = useReveal<HTMLDivElement>('termbar');
  const { label, cycle } = useTheme();
  return (
    <div ref={ref} className={className}>
      <div className="row">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="dots">
            <span />
            <span />
            <span />
          </span>
          <span className="termtitle">angelo@scholze:~/resume$</span>
          <ProjectSwitcher />
        </div>
        <nav className="termnav">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
          <a href={RESUME_URL} download>
            <button type="button" className="btn">
              download resume
            </button>
          </a>
          <button type="button" className="btn theme-toggle" onClick={cycle}>
            {label}
          </button>
        </nav>
      </div>
    </div>
  );
}

function Stats() {
  const { ref, className } = useReveal<HTMLDivElement>('grid');
  return (
    <div ref={ref} className={className}>
      {stats.map((s) => (
        <div key={s.k}>
          <p className="k">{s.k}</p>
          <p className={s.gilt ? 'v gilt' : 'v'}>{s.v}</p>
        </div>
      ))}
    </div>
  );
}

function Entry({ name, dates, body }: (typeof experience)[number]) {
  const { ref, className } = useReveal<HTMLDivElement>('toprow');
  return (
    <div className="entry">
      <div ref={ref} className={className}>
        <span className="name">{name}</span>
        <span className="dates">{dates}</span>
      </div>
      <Typed segs={body} perChar={PER_CHAR_BODY} />
    </div>
  );
}

function Skills() {
  const { ref, className } = useReveal<HTMLDivElement>('chips');
  return (
    <div ref={ref} className={className}>
      {skills.map((s) => (
        <span key={s} className="chip">
          {s}
        </span>
      ))}
    </div>
  );
}

function ContactGrid() {
  const { ref, className } = useReveal<HTMLDivElement>('contactgrid');
  return (
    <div ref={ref} className={className}>
      {contact.map((c) => (
        <div key={c.k} className="row2">
          <span className="k">{c.k}</span>
          {c.href ? (
            <a
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noopener' } : {})}
            >
              {c.label}
            </a>
          ) : (
            <span>{c.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function Footer() {
  const { ref, className } = useReveal<HTMLElement>();
  return (
    <footer ref={ref} className={className}>
      <span>angelo-scholze v1.0.0</span>
      <span className="ok">process exited 0</span>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Termbar />
      <div className="wrap">
        <section className="hero">
          <Cmdline text="whoami" cursor />
          <Typed as="h1" segs={[hero.name]} perChar={PER_CHAR_HEADER} />
          <Typed as="p" className="role" segs={[hero.role]} perChar={PER_CHAR_HEADER} />
          <Typed as="p" className="sub" segs={hero.sub} perChar={PER_CHAR_BODY} />
          <DownloadButtons />
        </section>

        <hr className="rule" />

        <section className="status" aria-label="Angelo Scholze, by the numbers">
          <Cmdline text="stat --career" />
          <Stats />
        </section>

        <hr className="rule" />

        <section className="about-full" id="about">
          <Cmdline text="cat about.md" />
          <Typed className="note" segs={about} perChar={PER_CHAR_BODY} />
        </section>

        <section className="services" id="experience">
          <Cmdline text="ls -la experience/" />
          <div className="list">
            {experience.map((e) => (
              <Entry key={e.name} {...e} />
            ))}
          </div>
        </section>

        <section className="skillsec" id="skills">
          <Cmdline text="cat skills.txt" />
          <Skills />
        </section>

        <hr className="rule" />

        <section className="close" id="contact">
          <Cmdline text="contact --me" />
          <Typed as="h3" segs={['Get in touch']} perChar={PER_CHAR_HEADER} />
          <ContactGrid />
          <DownloadButtons />
        </section>

        <Footer />
      </div>
    </>
  );
}
