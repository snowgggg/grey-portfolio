import DecryptedText from "@/components/DecryptedText";
import MusicPlayer from "@/components/MusicPlayer";

const assets = {
  title: "/assets/daily-needs/01.png",
  hero: "/assets/daily-needs/02.png",
  prizePool: "/assets/daily-needs/03.png",
  teamBonus: "/assets/daily-needs/04.png",
  mobileBonus: "/assets/daily-needs/05.png",
  ecosystem: "/assets/daily-needs/06.png",
  brandPages: "/assets/daily-needs/07.png",
  ticketSystem: "/assets/daily-needs/08.png",
};

function CaseImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return <img alt={alt} className={["block", className].filter(Boolean).join(" ")} src={src} />;
}

function Header() {
  return (
    <div className="px-[clamp(18px,3vw,44px)]">
      <header
        aria-label="Primary navigation"
        className="relative grid h-20 grid-cols-[1fr_auto_auto] items-center gap-x-[clamp(18px,3vw,46px)] font-[Aeonik] text-bone/[0.82] after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-bone/[0.12] after:content-[''] max-md:h-16"
      >
        <a aria-label="Grey home" className="link-underline loco-nav-link brand-link w-max" href="/" data-no-transition="true">
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

function SectionHeading({
  title,
  subtitle,
  years,
}: {
  title: string;
  subtitle: string;
  years: string;
}) {
  return (
    <div className="grid w-full grid-cols-[minmax(0,1fr)_140px] items-end gap-10 max-md:grid-cols-1">
      <div className="flex min-w-0 max-w-[920px] flex-col items-start gap-2.5">
        <h2 className="max-w-[760px] text-[56px] font-medium leading-normal text-white max-md:text-[44px]">
          {title}
        </h2>
        <p className="text-left text-2xl font-medium leading-normal text-[#c3c3c3] max-md:text-xl">
          {subtitle}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1 text-right text-base font-light leading-normal text-[#c3c3c3] max-md:items-start max-md:text-left">
        <span>Product, UX/UI</span>
        <span>{years}</span>
      </div>
    </div>
  );
}

export default function DailyNeedsPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <main className="min-h-screen overflow-x-hidden bg-black font-[Poppins] text-white">
        <div className="mx-auto w-full max-w-[1920px] bg-black">
          <Header />

          <div className="flex w-full flex-col gap-[120px] px-[120px] pb-[188px] pt-[92px] max-2xl:px-[6.25vw] max-md:gap-20 max-md:px-5 max-md:pb-24 max-md:pt-12">
            <section className="w-full shrink-0 overflow-hidden">
              <CaseImage
                alt="Daily Needs title graphic"
                className="h-auto w-full object-cover object-left"
                src={assets.title}
              />
            </section>

            <section className="flex w-full flex-col gap-10">
              <SectionHeading
                title="WCTC S7"
                subtitle="WCTC (World Crypto Trading Competition) is a major global trading competition hosted by Gate."
                years="2025"
              />
              <div className="flex w-full shrink-0 items-end justify-center overflow-hidden rounded-2xl bg-[#05f]">
                <CaseImage
                  alt="WCTC S7 campaign page"
                  className="h-auto w-full object-contain"
                  src={assets.hero}
                />
              </div>
            </section>

            <section className="w-full shrink-0 overflow-hidden rounded-2xl bg-[#1b1b1b] px-16 pt-20">
              <h2 className="mb-[72px] text-[64px] font-bold leading-[1.5] text-white">
                <span className="block text-[#838383]">Highest prize pool</span>
                <span className="block">5,000,000 USDT</span>
              </h2>
              <CaseImage
                alt="WCTC prize pool campaign screens"
                className="h-auto w-full object-contain"
                src={assets.prizePool}
              />
            </section>

            <section className="grid h-[752.182px] w-full grid-cols-2 gap-10 max-md:h-auto max-md:grid-cols-1">
              <article className="relative h-[752.182px] overflow-hidden rounded-[15.273px] bg-[#1b1b1b] max-md:h-auto">
                <div className="absolute left-[61px] top-[61px] flex w-[681px] flex-col items-start gap-[7.636px]">
                  <h3 className="w-full text-[38.182px] font-semibold leading-normal tracking-[-0.3818px] text-white">
                    TOP1 Team Bonus
                  </h3>
                  <p className="w-full text-[19.091px] font-light leading-[2] text-[#fff7e5]">
                    A 2025 Mustang® GT Fastback sports car
                  </p>
                </div>
                <CaseImage
                  alt="TOP1 Team Bonus sports car reward"
                  className="absolute left-[61px] top-[252px] h-[500px] w-[calc(100%-122px)] object-contain"
                  src={assets.teamBonus}
                />
              </article>
              <article className="relative h-[752.182px] overflow-hidden rounded-[15.273px] bg-[#1b1b1b] max-md:h-auto">
                <CaseImage
                  alt="WCTC mobile bonus pages"
                  className="absolute left-1/2 top-0 h-[752.5px] w-[460px] max-w-full -translate-x-1/2 object-contain max-md:static max-md:h-auto max-md:w-full max-md:translate-x-0"
                  src={assets.mobileBonus}
                />
              </article>
            </section>

            <section className="flex w-full flex-col gap-10">
              <SectionHeading
                title="Brand Campaign Pages"
                subtitle="Product marketing pages designed around the Gate brand ecosystem, spanning campaigns, product launches, competition topics, and global operations."
                years="2023-2025"
              />
              <div className="flex w-full shrink-0 flex-col items-center overflow-hidden rounded-2xl bg-[#05f] px-10 pt-20 max-md:px-6 max-md:pt-12">
                <div className="flex w-full max-w-[1280px] flex-col items-start gap-5 text-center text-white">
                  <p className="w-full text-[32px] font-normal leading-[1.6] max-md:text-2xl">
                    Designing for the Gate Ecosystem
                  </p>
                  <h2 className="w-full text-[clamp(36px,2.8125vw,54px)] font-semibold leading-[1.3]">
                    Creating consistent brand experiences across products, campaigns, and global communities.
                  </h2>
                </div>
                <CaseImage
                  alt="Gate ecosystem campaign tags"
                  className="mt-[90px] h-auto w-full object-contain max-md:mt-12"
                  src={assets.ecosystem}
                />
              </div>
            </section>

            <section className="w-full shrink-0 overflow-hidden rounded-2xl bg-[#1b1b1b] p-20">
              <CaseImage
                alt="Gate brand and product promotion pages"
                className="h-auto w-full object-contain"
                src={assets.brandPages}
              />
            </section>

            <section className="w-full shrink-0 overflow-hidden rounded-2xl bg-[#1b1b1b] p-20">
              <div className="flex w-full flex-col items-start gap-[43.429px]">
                <div className="flex h-[101.333px] w-[723.81px] flex-col items-start gap-[21.714px]">
                  <h2 className="w-full text-[36.19px] font-normal capitalize leading-normal text-white">
                    Inter Milan Ticket System
                  </h2>
                  <ul className="w-full list-disc pl-[27.1425px] text-[18.095px] font-light leading-[2] text-[#fff7e5]">
                    <li>0-1 Building a Fiat Product Matrix</li>
                  </ul>
                </div>
                <CaseImage
                  alt="Inter Milan ticket system design"
                  className="h-auto w-full object-contain"
                  src={assets.ticketSystem}
                />
              </div>
            </section>

            <section className="flex h-[76px] w-full flex-col gap-4 text-white">
              <h2 className="text-2xl font-medium leading-normal">
                Thank you for reviewing my case study！
              </h2>
              <p className="text-base font-light leading-[1.5]">
                You are welcome to explore my other work, experiments, and selected projects. For collaboration inquiries, please contact me at grey340611@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
