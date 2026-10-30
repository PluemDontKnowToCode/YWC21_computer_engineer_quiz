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
    title: "Bit operations",
    description: "Practice binary arithmetic, shifts, and number conversions.",
    href: "/bits",
    action: "Explore bit lessons",
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
            <Link className="welcome-quiz-link" href="/quiz">Go to practice quiz <span aria-hidden="true">↗</span></Link>
          </header>

          <section className="welcome-hero" aria-labelledby="welcome-title">
            <p className="welcome-eyebrow"><span aria-hidden="true">✳</span> COMPUTER ENGINEERING, MADE PRACTICAL</p>
            <h1 id="welcome-title">Understand the systems behind the screen.</h1>
            <p className="welcome-intro">
              Build confidence with interactive lessons on memory, cache policies, and bit operations.
              Learn one concept at a time, at your own pace.
            </p>
            <div className="welcome-actions">
              <Link className="welcome-primary-action" href="/cache">Start learning <span aria-hidden="true">→</span></Link>
              <Link className="welcome-secondary-action" href="/quiz">Practice with a quiz</Link>
            </div>
            <p className="welcome-note">No account needed. Your quiz progress stays in this browser.</p>
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
