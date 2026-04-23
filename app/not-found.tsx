import Link from "next/link";
import NotFoundBurst from "./components/NotFoundBurst";
import ThemeToggle from "./components/ThemeToggle";
import "./not-found.css";

export default function NotFound() {
  return (
    <main className="notFoundPage">
      <section className="notFoundShell" aria-labelledby="not-found-title">
        <ThemeToggle />
        <NotFoundBurst />

        <div className="notFoundCard">
          <p className="notFoundEyebrow">404 / Page not found</p>
          <h1 id="not-found-title" className="notFoundTitle">
            This page is no longer here.
          </h1>
          <p className="notFoundDescription">
            If you opened an old case study or project link, it may have changed
            during a site update. The fastest way back is the homepage.
          </p>

          <div className="notFoundActions" aria-label="404 actions">
            <Link href="/" className="notFoundAction notFoundActionPrimary">
              Take me back
            </Link>
            <a href="mailto:me@patrikdinh.com" className="notFoundAction">
              Report a broken link
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
