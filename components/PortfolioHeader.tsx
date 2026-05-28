import DecryptedText from "./DecryptedText";
import MusicPlayer from "./MusicPlayer";

export default function PortfolioHeader() {
  return (
    <div className="px-[clamp(18px,3vw,44px)]">
      <header
        className="relative grid h-20 grid-cols-[1fr_auto_auto] items-center gap-x-[clamp(18px,3vw,46px)] font-[Aeonik] text-bone/[0.82] after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-bone/[0.12] after:content-[''] max-md:h-16"
        aria-label="Primary navigation"
      >
        <a
          className="link-underline loco-nav-link brand-link w-max"
          href="/"
          aria-label="Grey home"
          data-no-transition="true"
          data-transition="none"
        >
          <DecryptedText
            text="@GREY DESIGN PORTFOLIO"
            speed={34}
            maxIterations={12}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@/#$%&"
            className="text-bone/[0.82]"
            encryptedClassName="text-mint"
            parentClassName="decrypt-brand"
            animateOn="hover"
          />
        </a>
        <nav className="flex items-center justify-end gap-[clamp(18px,3vw,46px)]">
            <a className="link-underline loco-nav-link" href="/#work">
              Work
            </a>
            <a className="link-underline loco-nav-link" href="/about">
              About
            </a>
          </nav>
          <MusicPlayer />
      </header>
    </div>
  );
}
