import DecryptedText from "@/components/DecryptedText";
import MusicPlayer from "@/components/MusicPlayer";

const assets = {
  title: "/assets/color-upgrade/01.png",
  hero: "/assets/color-upgrade/08.png",
  harmony: "/assets/color-upgrade/02.png",
  contrast: "/assets/color-upgrade/03.png",
  brightness: "/assets/color-upgrade/04.png",
  lightness: "/assets/color-upgrade/05.png",
  saturation: "/assets/color-upgrade/06.png",
  coreColor: "/assets/color-upgrade/07.png",
};

const adjustmentCards = [
  {
    title: "Increase background brightness value",
    src: assets.brightness,
  },
  {
    title: "Adjust text brightness value",
    src: assets.lightness,
  },
  {
    title: "Incorporate brand hue",
    src: assets.saturation,
  },
];

function Header() {
  return (
    <div className="px-[clamp(18px,3vw,44px)]">
      <header
        aria-label="Primary navigation"
        className="relative grid h-20 grid-cols-[1fr_auto_auto] items-center gap-x-[clamp(18px,3vw,46px)] font-[Aeonik] text-bone/[0.82] after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-bone/[0.12] after:content-[''] max-md:h-16"
      >
        <a
          aria-label="Grey home"
          className="link-underline loco-nav-link brand-link w-max"
          href="/"
          data-no-transition="true"
        >
          <DecryptedText
            animateOn="hover"
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@/#$%&"
            className="text-bone/[0.82]"
            encryptedClassName="text-mint"
            maxIterations={12}
            parentClassName="decrypt-brand"
            speed={34}
            text="@GREY DESIGN PORTFOLIO"
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
      className={["block h-auto w-full", className].filter(Boolean).join(" ")}
      src={src}
    />
  );
}

export default function ColorUpgradePage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <main className="min-h-screen overflow-x-hidden bg-black font-[Poppins] text-white">
        <Header />

        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-[120px] px-[120px] pb-[188px] pt-[100px] max-2xl:px-[6.25vw] max-lg:gap-20 max-md:px-5 max-md:pb-24 max-md:pt-10">
          <CaseImage
            alt="Color Upgrade title graphic"
            className="h-[300px] object-cover object-left max-md:h-auto"
            src={assets.title}
          />

          <section className="grid grid-cols-2 gap-10 max-xl:grid-cols-1">
            <CaseImage
              alt="More harmonious between multiple colours"
              className="rounded-[32px]"
              src={assets.harmony}
            />
            <CaseImage
              alt="Converge colours while ensuring contrast"
              className="rounded-[32px]"
              src={assets.contrast}
            />
          </section>

          <section className="overflow-hidden rounded-[32px] bg-[#111414] px-[60px] py-20 max-lg:px-8 max-md:rounded-2xl max-md:px-5 max-md:py-10">
            <div className="mb-[72px] flex max-w-[980px] flex-col gap-5 max-md:mb-10">
              <h2 className="text-[40px] font-semibold leading-normal text-white max-md:text-3xl">
                Color adjustment
              </h2>
              <p className="text-[18px] font-light leading-[1.8] text-[#c3c3c3] max-md:text-base">
                Adjust brightness, lightness, and saturation to keep the brand blue clear and stable across product surfaces.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-10 max-md:grid-cols-1">
              {adjustmentCards.map((item) => (
                <article className="flex flex-col gap-3" key={item.title}>
                  <CaseImage
                    alt={item.title}
                    className="rounded-2xl bg-black"
                    src={item.src}
                  />
                  <div className="text-center">
                    <h3 className="text-[20px] font-normal leading-normal text-white">
                      {item.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-[32px] bg-[#111414] px-[60px] py-20 max-lg:px-8 max-md:rounded-2xl max-md:px-5 max-md:py-10">
            <div className="mb-[72px] flex max-w-[980px] flex-col gap-5 max-md:mb-10">
              <h2 className="text-[40px] font-semibold leading-normal text-white max-md:text-3xl">
                Core color
              </h2>
              <p className="text-[18px] font-light leading-[1.8] text-[#c3c3c3] max-md:text-base">
                Establish clear color variables and interaction references for consistent product implementation.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-0 max-md:grid-cols-1">
              <CaseImage
                alt="Core color token table"
                className="bg-[#f1f1f1]"
                src={assets.coreColor}
              />
              <CaseImage
                alt="Gate color picker hero visual"
                className="bg-[#087cf9]"
                src={assets.hero}
              />
            </div>
          </section>

          <section className="flex flex-col gap-4 text-white">
            <h2 className="text-2xl font-medium leading-normal">
              Thank you for reviewing my case study.
            </h2>
            <p className="text-base font-light leading-[1.5] text-[#c3c3c3]">
              You are welcome to explore my other work, experiments, and selected projects. For collaboration inquiries, please contact me at grey340611@gmail.com.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
