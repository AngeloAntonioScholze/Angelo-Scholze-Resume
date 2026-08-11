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
import { useTheme } from './useTheme';

function DownloadButtons() {
  return (
    <div className="row reveal go">
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
  const { label, cycle } = useTheme();
  return (
    <div className="termbar reveal go">
      <div className="row">
        <div className="termbrand">
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
          <div className="grid reveal go">
            {stats.map((s) => (
              <div key={s.k}>
                <p className="k">{s.k}</p>
                <p className={s.gilt ? 'v gilt' : 'v'}>{s.v}</p>
              </div>
            ))}
          </div>
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
              <div key={e.name} className="entry">
                <div className="toprow reveal go">
                  <span className="name">{e.name}</span>
                  <span className="dates">{e.dates}</span>
                </div>
                <Typed segs={e.body} perChar={PER_CHAR_BODY} />
              </div>
            ))}
          </div>
        </section>

        <section className="skillsec" id="skills">
          <Cmdline text="cat skills.txt" />
          <div className="chips reveal go">
            {skills.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </section>

        <hr className="rule" />

        <section className="close" id="contact">
          <Cmdline text="contact --me" />
          <Typed as="h3" segs={['Get in touch']} perChar={PER_CHAR_HEADER} />
          <div className="contactgrid reveal go">
            {contact.map((c) => (
              <div key={c.k} className="row2">
                <span className="k">{c.k}</span>
                {c.href ? (
                  <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener' } : {})}>
                    {c.label}
                  </a>
                ) : (
                  <span>{c.label}</span>
                )}
              </div>
            ))}
          </div>
          <DownloadButtons />
        </section>

        <footer className="reveal go">
          <span>angelo-scholze v1.0.0</span>
          <span className="ok">process exited 0</span>
        </footer>
      </div>
    </>
  );
}
