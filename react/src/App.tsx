import { EMAIL, NAME, RESUME_URL, content, type Content } from './data';
import { CURRENT, projects } from './projects';
import { Cmdline, PER_CHAR_BODY, PER_CHAR_HEADER, Typed } from './Typed';
import { useLang } from './useLang';
import { useTheme } from './useTheme';

function DownloadButtons({ ui }: { ui: Content['ui'] }) {
  return (
    <div className="row reveal go">
      <a href={RESUME_URL} download>
        <button type="button" className="btn">
          {ui.downloadPdf}
        </button>
      </a>
      <a href={`mailto:${EMAIL}`}>
        <button type="button" className="btn btn-outline">
          {ui.emailMe}
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

function Termbar({ c, langLabel, cycleLang }: { c: Content; langLabel: string; cycleLang: () => void }) {
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
          {c.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
          <a className="dl" href={RESUME_URL} download>
            <button type="button" className="btn">
              {c.ui.download}
            </button>
          </a>
          <button type="button" className="btn btn-ghost" onClick={cycleLang}>
            {langLabel}
          </button>
          <button type="button" className="btn btn-ghost" onClick={cycle}>
            {label}
          </button>
        </nav>
      </div>
    </div>
  );
}

export default function App() {
  const { lang, label: langLabel, cycle: cycleLang } = useLang();
  const c = content[lang];

  return (
    <>
      <Termbar c={c} langLabel={langLabel} cycleLang={cycleLang} />
      <div className="wrap" key={lang}>
        <section className="hero">
          <Cmdline text="whoami" cursor />
          <Typed as="h1" segs={[NAME]} perChar={PER_CHAR_HEADER} />
          <Typed as="p" className="role" segs={[c.hero.role]} perChar={PER_CHAR_HEADER} />
          <Typed as="p" className="sub" segs={c.hero.sub} perChar={PER_CHAR_BODY} />
          <DownloadButtons ui={c.ui} />
        </section>

        <hr className="rule" />

        <section className="status" aria-label="Angelo Scholze, by the numbers">
          <Cmdline text="stat --career" />
          <div className="grid reveal go">
            {c.stats.map((s) => (
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
          <Typed className="note" segs={c.about} perChar={PER_CHAR_BODY} />
        </section>

        <section className="services" id="experience">
          <Cmdline text="ls -la experience/" />
          <div className="list">
            {c.experience.map((e) => (
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
            {c.skills.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </section>

        <hr className="rule" />

        <section className="close" id="contact">
          <Cmdline text="contact --me" />
          <Typed as="h3" segs={[c.ui.getInTouch]} perChar={PER_CHAR_HEADER} />
          <div className="contactgrid reveal go">
            {c.contact.map((ct) => (
              <div key={ct.k} className="row2">
                <span className="k">{ct.k}</span>
                {ct.href ? (
                  <a href={ct.href} {...(ct.external ? { target: '_blank', rel: 'noopener' } : {})}>
                    {ct.label}
                  </a>
                ) : (
                  <span>{ct.label}</span>
                )}
              </div>
            ))}
          </div>
          <DownloadButtons ui={c.ui} />
        </section>

        <footer className="reveal go">
          <span>angelo-scholze v1.0.0</span>
          <span className="ok">process exited 0</span>
        </footer>
      </div>
    </>
  );
}
