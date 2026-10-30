import Link from "next/link";
import WelcomeLayout from "./components/layout/welcome-layout";

const learningPaths = [
  {
    number: "01",
    title: "Cache policies",
    description: "See how FIFO, LRU, MIN, and LFU choose which page to replace.",
    href: "/cache",
    action: "Explore cache lessons",
  },
  {
    number: "02",
    title: "Bit arithmetic & shifts",
    description: "Practice binary addition, subtraction, and bit shifts.",
    href: "/bits",
    action: "Explore bit lessons",
  },
  {
    number: "03",
    title: "Number conversion",
    description: "Convert values between decimal, hexadecimal, and binary.",
    href: "/bits/convert",
    action: "Open the converter",
  },
];

export default function Home() {
  return (
    <WelcomeLayout>
      <main className="welcome-page">
        <div className="welcome-shell">
          <header className="welcome-header">
            <Link className="welcome-brand" href="/" aria-label="Bytewise home">
              <span className="welcome-brand-mark">CE</span>
              <span>bytewise<small>THE LEARNING LAB</small></span>
            </Link>
          </header>

          <section className="welcome-hero" aria-labelledby="welcome-title">
            <div className="welcome-hero-copy">
              <p className="welcome-eyebrow"><span aria-hidden="true">01 /</span> A PRACTICAL GUIDE TO COMPUTER SYSTEMS</p>
              <h1 id="welcome-title">Understand the systems behind the screen.</h1>
              <p className="welcome-intro">
                Build confidence with interactive lessons on memory, cache policies, and bit operations.
                Learn one concept at a time, at your own pace.
              </p>
              <div className="welcome-actions">
                <Link className="welcome-primary-action" href="/cache">Start learning <span aria-hidden="true">→</span></Link>
              </div>
              <p className="welcome-note">Start with cache memory, then work through binary operations.</p>
            </div>
            <aside className="welcome-field-note" aria-label="About the learning paths">
              <span className="welcome-field-label">INSIDE THE LAB</span>
              <strong>Three topics.<br />One system at a time.</strong>
              <span className="welcome-field-rule" aria-hidden="true" />
              <span className="welcome-field-meta"><b>01</b> Memory &amp; cache</span>
              <span className="welcome-field-meta"><b>02</b> Binary logic &amp; shifts</span>
              <span className="welcome-field-meta"><b>03</b> Number conversion</span>
            </aside>
          </section>

          <section className="welcome-paths" aria-labelledby="paths-title">
            <div className="welcome-paths-heading">
              <div>
                <p className="welcome-eyebrow">PICK A LEARNING PATH</p>
                <h2 id="paths-title">Start with a topic</h2>
              </div>
              <span>Interactive lessons · Free practice</span>
            </div>
            <div className="welcome-path-grid">
              {learningPaths.map((path) => (
                <Link className="welcome-path-card" href={path.href} key={path.number}>
                  <span className="welcome-path-number">{path.number}</span>
                  <h3>{path.title}</h3>
                  <p>{path.description}</p>
                  <span className="welcome-path-action">{path.action} <span aria-hidden="true">→</span></span>
                </Link>
              ))}
            </div>
          </section>

          <footer className="welcome-footer">BYTEWISE <span>·</span> THE LEARNING LAB</footer>
        </div>
      </main>
    </WelcomeLayout>
  );
}
