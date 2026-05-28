import DecryptedText from "@/components/DecryptedText";
import MusicPlayer from "@/components/MusicPlayer";

const assets = {
  title: "/assets/icon-upgrade/01.png",
  conceptDoor: "/assets/icon-upgrade/02.png",
  conceptColor: "/assets/icon-upgrade/03.png",
  conceptShape: "/assets/icon-upgrade/04.png",
  conceptGrid: "/assets/icon-upgrade/05.png",
  batchGrid: "/assets/icon-upgrade/06.png",
};

const conceptPanels = [
  {
    src: assets.conceptDoor,
    alt: "Gate icon brand symbol design concept",
    className: "left-px top-[797px] h-[884px] w-[960px]",
  },
  {
    src: assets.conceptColor,
    alt: "Gate icon color design concept",
    className: "left-[961px] top-[797px] h-[884px] w-[960px]",
  },
  {
    src: assets.conceptShape,
    alt: "Gate icon form design concept",
    className: "left-px top-[1681px] h-[884px] w-[960px]",
  },
  {
    src: assets.conceptGrid,
    alt: "Gate icon construction grid concept",
    className: "left-[961px] top-[1681px] h-[884px] w-[960px]",
  },
];

function Header() {
  return (
    <div className="px-[clamp(18px,3vw,44px)]">
      <header
        className="relative grid h-20 grid-cols-[1fr_auto_auto] items-center gap-x-[clamp(18px,3vw,46px)] font-[Aeonik] text-bone/[0.82] after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-bone/[0.12] after:content-[''] max-md:h-16"
        aria-label="Primary navigation"
      >
        <a className="link-underline loco-nav-link brand-link w-max" href="/" aria-label="Grey home" data-no-transition="true">
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

function CaseImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      alt={alt}
      className={["block object-fill", className].filter(Boolean).join(" ")}
      src={src}
    />
  );
}

export default function IconUpgradePage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <main className="min-h-screen overflow-x-hidden bg-black font-[Poppins] text-white">
        <Header />

        <div className="mx-auto w-full max-w-[1920px] overflow-hidden bg-black">
          <CaseImage
            alt="Icon Upgrade"
            className="mx-auto mt-[129px] h-auto w-[min(1680px,calc(100%-240px))] max-md:mt-16 max-md:w-[calc(100%-40px)]"
            src={assets.title}
          />

          <section className="mx-auto mt-40 flex h-[59px] w-[min(1649px,calc(100%-240px))] flex-col items-start max-md:mt-20 max-md:w-[calc(100%-40px)]">
            <h1 className="whitespace-nowrap text-[40px] font-normal capitalize leading-normal text-white">
              Tabbar Design Concept
            </h1>
          </section>

          <section className="mt-[69px] grid w-full grid-cols-2 max-md:grid-cols-1">
            {conceptPanels.map((panel) => (
              <CaseImage
                alt={panel.alt}
                className="w-full"
                key={panel.src}
                src={panel.src}
              />
            ))}
          </section>

          <section className="mx-auto mt-[150px] flex w-[min(1680px,calc(100%-240px))] flex-col items-start gap-5 max-md:w-[calc(100%-40px)]">
            <h2 className="w-full text-[40px] font-normal capitalize leading-none text-white">
              Batch Design
            </h2>
            <p className="w-full text-[18px] font-light leading-none text-white">
              Cumulative number of icons drawn across versions: 2000+
            </p>
          </section>

          <CaseImage
            alt="Batch icon design grid"
            className="mt-12 w-full"
            src={assets.batchGrid}
          />

          <section className="mx-auto mb-40 mt-[120px] flex w-[min(1680px,calc(100%-240px))] flex-col items-start gap-4 text-white max-md:w-[calc(100%-40px)]">
            <h2 className="w-full text-2xl font-medium leading-normal">
              Thank you for reviewing my case study !
            </h2>
            <p className="w-full text-base font-light leading-[1.5]">
              You are welcome to explore my other work, experiments, and selected projects. For collaboration inquiries, please contact me at grey340611@gmail.com.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
